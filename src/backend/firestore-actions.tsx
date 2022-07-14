import {db, storage} from './firebase-config';
import {addNotification} from './notifications-controller';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {
  USER_ID_STRING,
  kycFields,
  NOTIFICATIONS_STRING,
  LANDLORD_ID_STRING,
  LANDLORD_STRING,
  GUARANTOR_ID_STRING,
  TENANT_ID_STRING,
} from '../constants/firebase-constants';
import {
  MISSING_PERSONAL_DETAILS_STRING,
  MISSING_PAYMENT_METHOD_STRING,
} from '../constants/notifcations-constants';
import {firebase} from '@react-native-firebase/firestore';

export const addUserNotifications = async (
  documentFieldName: string,
  Id: string,
  data: Record<string, unknown>,
): Promise<void> => {
  const documentReference = await db
    .collection(USER_ID_STRING)
    .where(documentFieldName, '==', Id);
  const userSnap = await documentReference.get();
  if (!userSnap.empty) {
    userSnap.forEach(async document => {
      addNotification(document.ref.path, data);
    });
  }
};

export const getUserSnap = async (
  userId: string,
): Promise<
  FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
> => {
  const documentReference = await db.collection(USER_ID_STRING).doc(userId);
  const userSnap = await documentReference.get();
  return userSnap;
};

export const getUserDoc = async (
  userId: string,
): Promise<FirebaseFirestoreTypes.DocumentData | null | undefined> => {
  const documentReference = await db.collection(USER_ID_STRING).doc(userId);

  const userSnap = await documentReference.get();
  if (userSnap.exists) {
    return userSnap.data();
  }
  return null;
};

export const getDocumentSnap = async (
  documentId: string,
  collectionId: string,
): Promise<
  FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
> => {
  const documentReference = await db.collection(collectionId).doc(documentId);
  const userSnap = await documentReference.get();
  return userSnap;
};

const notificationCheck = async (
  notificationReference: FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>,
  data: {type: string; link: string; createdDate: any; reference: string},
  userSnap: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
): Promise<void> => {
  const notificationsSnap = await notificationReference.where(
    'type',
    '==',
    data.type,
  );
  const notificationDocuments = await notificationsSnap.get();
  if (!notificationDocuments.empty) {
    notificationDocuments.forEach(async notificationDocument => {
      if (notificationDocument.exists) {
        return;
      } else {
        await addNotification(userSnap.ref, data);
      }
    });
  } else if (notificationDocuments.empty) {
    await addNotification(userSnap.ref, data);
  }
};
export const checkUserProfile = async (
  userId: string,
  setIsLandLord: any,
): Promise<void> => {
  const userSnap = await getUserSnap(userId);
  const {matches, documentFieldKeys} = await checkDocumentFields(
    userSnap.ref,
    kycFields,
  );
  const notificationReference = userSnap.ref.collection(NOTIFICATIONS_STRING);
  if (Object.keys(matches).length === 0) {
    for (const key of documentFieldKeys) {
      if (!matches[key]) {
        const data = {
          type: '',
          link: '',
          createdDate: new Date(),
          reference: userSnap.ref.path,
        };
        switch (key) {
          case 'userId':
          case 'email':
          case 'firstName':
          case 'surname':
            data.link = '/personal-details';
            data.type = MISSING_PERSONAL_DETAILS_STRING;
            await notificationCheck(notificationReference, data, userSnap);
            break;
          case 'moblieNumber':
            data.link = '/personal-details';
            data.type = 'TODO KYC check needs to be finished';
            await notificationCheck(notificationReference, data, userSnap);
            break;
          case 'paymentMethods':
            data.link = '/add-payment-method';
            data.type = MISSING_PAYMENT_METHOD_STRING;
            await notificationCheck(notificationReference, data, userSnap);
            break;
          case LANDLORD_ID_STRING:
            setIsLandLord(false);
            break;
          default:
            break;
        }
      }
    }
  }
};

export const checkDocumentFields = async (
  documentReference: FirebaseFirestoreTypes.DocumentReference,
  documentFields: {[key: string]: unknown} | Array<string>,
): Promise<{
  matches: {
    [key: string]: boolean;
  };
  documentFieldKeys: string[];
}> => {
  const matches: {[key: string]: boolean} = {};
  const documentFieldKeys = Array.isArray(documentFields)
    ? documentFields
    : Object.keys(documentFields);
  const snap = await documentReference.get();
  if (snap.exists) {
    const documentData = snap.data();
    if (documentData) {
      const documentDataKeys = Object.keys(documentData);
      for (let i = 0; i < documentFieldKeys.length; i++) {
        matches[documentFieldKeys[i]] = false;
        for (let j = 0; j < documentDataKeys.length; j++) {
          if (documentFieldKeys[i] == documentDataKeys[j]) {
            matches[documentFieldKeys[i]] = true;
          }
        }
      }
    }
  }
  return {matches, documentFieldKeys};
};
export const checkCollection = async (
  collectionReference: FirebaseFirestoreTypes.CollectionReference,
  documentNames: {[key: string]: unknown} | Array<string>,
): Promise<{
  [key: string]: FirebaseFirestoreTypes.DocumentData;
}> => {
  const matches: {[key: string]: FirebaseFirestoreTypes.DocumentData} = {};
  const documentFieldKeys = Array.isArray(documentNames)
    ? documentNames
    : Object.keys(documentNames);
  const snap = await collectionReference.get();
  snap.docs.forEach(document => {
    documentFieldKeys.forEach(key => {
      if (key == document.id) {
        matches[key] = document.data();
      }
    });
  });
  return matches;
};

export const filterObjectFields = (
  obj: Record<string, unknown>,
): Record<string, unknown> => {
  for (const [key] of Object.entries(obj)) {
    if (obj[key] == null || obj[key] == '') delete obj[key];
  }
  return obj;
};

export const docIdGenerator = async (userType: string): Promise<string> => {
  if (userType === LANDLORD_STRING) {
    const landlordDoc = await db.collection(LANDLORD_ID_STRING).add({});
    return landlordDoc.id;
  } else if (userType === GUARANTOR_ID_STRING) {
    const guarantorDoc = await db.collection(GUARANTOR_ID_STRING).add({});
    return guarantorDoc.id;
  } else {
    const tenantDoc = await db.collection(TENANT_ID_STRING).add({});
    return tenantDoc.id;
  }
};

export const saveDataWithDocumentName = async (
  documentId: string,
  collectionReference: FirebaseFirestoreTypes.CollectionReference,
  data: Record<string, unknown>,
  isDocumentType?: boolean,
): Promise<void> => {
  const documentData = isDocumentType
    ? {...data, documentType: documentId}
    : data;
  await collectionReference.doc(documentId).set(documentData, {merge: true});
};

export const checkLoginData = async (
  userId: string,
  link: any,
): Promise<any> => {
  const userDocSnap = await getUserSnap(userId);
  if (userDocSnap) {
    const {matches} = await checkDocumentFields(userDocSnap.ref, {userId});
    if (matches.userId) {
      return link('/App');
    }
  }
  return link('/onboarding');
};

export const saveTokenToDatabase = async (token: string, userId: string) => {
  await db
    .collection(USER_ID_STRING)
    .doc(userId)
    .update({
      tokens: firebase.firestore.FieldValue.arrayUnion(token),
    });
};
