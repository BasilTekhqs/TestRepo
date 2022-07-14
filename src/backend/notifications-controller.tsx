import {useCallback, useEffect, useState} from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {NOTIFICATIONS_STRING} from '../constants/firebase-constants';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {db} from './firebase-config';
import {firebase} from '@react-native-firebase/firestore';

export const deleteNotification = async (
  documentReferencePath: string | FirebaseFirestoreTypes.DocumentReference,
) => {
  await db.runTransaction(async transaction => {
    const documentReference =
      typeof documentReferencePath === 'string'
        ? db.doc(documentReferencePath)
        : documentReferencePath;
    const notificationDoc = await transaction.get(documentReference);
    if (!notificationDoc.exists) {
      throw 'Document does not exist!';
    } else {
      transaction.delete(documentReference);
    }
  });
};
export const addNotification = async (
  userDocumentReferencePath: string | FirebaseFirestoreTypes.DocumentReference,
  data: Record<string, unknown>,
) => {
  await db.runTransaction(async transaction => {
    const documentReference =
      typeof userDocumentReferencePath === 'string'
        ? db.doc(userDocumentReferencePath)
        : userDocumentReferencePath;
    const notificationReference =
      documentReference.collection(NOTIFICATIONS_STRING);
    transaction.set(notificationReference.doc(), {
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  });
};

const getToken = async () => {
  const token = await messaging().getToken();
  return token;
};
const registerForRemoteMessages = async () => {
  await messaging().registerDeviceForRemoteMessages();
  requestPermissions();
};
const requestPermissions = async () => {
  const status = await messaging().requestPermission();
  return status;
};

const showNotification = (
  notification: FirebaseMessagingTypes.Notification,
) => {
  PushNotification.localNotification({
    title: notification.title,
    message: notification.body!,
  });
};

const handleNotifications = async (
  response: FirebaseMessagingTypes.RemoteMessage,
) => {
  if (Platform.OS === 'ios') {
    await PushNotificationIOS.requestPermissions();
  }
  showNotification(response.notification!);
};

export const usePushNotifications = (): {
  isLoading: boolean;
  token: string | null | undefined;
  serverError: Error | null;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null | undefined>(null);
  const [serverError, setServerError] = useState<Error | null>(null);
  const pushNotificationsHandler = useCallback(async () => {
    if (
      Platform.OS === 'ios' &&
      !messaging().isDeviceRegisteredForRemoteMessages
    ) {
      await registerForRemoteMessages();
    }
    messaging().onMessage(response => {
      handleNotifications(response);
    });
    const token = await getToken();
    setToken(token);
  }, []);

  useEffect(() => {
    try {
      setIsLoading(true);
      pushNotificationsHandler();
      setIsLoading(false);
    } catch (error: any) {
      setServerError(error);
      setIsLoading(false);
    }
  }, [pushNotificationsHandler]);
  return {isLoading, token, serverError};
};
