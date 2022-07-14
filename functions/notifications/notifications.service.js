
const admin = require('firebase-admin');
const { deleteNotification, addNotification } = require('../../src/backend/notifications-controller');
const moment = require('moment');
const { LANDLORD_ID_STRING, NOTIFICATIONS_STRING, USER_ID_STRING, PROPERTY_COMPLIANCE_DOCUMENTS, documentString } = require('../../src/constants/firebaseConstants');
const { firebase } = require('googleapis/build/src/apis/firebase');
const db = admin.firestore();

export const sendNotifications =async ()=>{

 await  notificationScheduler('epcReport')
 await  notificationScheduler('eicrReport')
 await  notificationScheduler('gasSafetyReport')
}

const notificationScheduler = async (documentType) => {
  const date = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
  const complianceDocumentsSnapshot = await db.collectionGroup(PROPERTY_COMPLIANCE_DOCUMENTS).where('documentType' === documentType).where('issueDate', '<', date).get()

  complianceDocumentsSnapshot.forEach((complianceDocument) => {
    const propertyIdReference = await complianceDocument.ref.parent.parent.get()
    const landlordId = propertyIdReference.data().lanlordId
    const userId = await db.collection(USER_ID_STRING).where(LANDLORD_ID_STRING === landlordId).get()
    const userDoc = await userId.docs[0].ref.collection(NOTIFICATIONS_STRING).where("type" === documentType).get()
    const userDocumentData = userId.docs[0].data()
    const notificationsDoc = userDoc.docs[0]
    const dateDiff = checkDate(new Date(), complianceDocument.data().issueDate)
    if (documentType === 'epcReport') {
      if (complianceDocument.data().rating.toUpperCase() === "D" || complianceDocument.data().rating.toUpperCase() === "F" || complianceDocument.data().rating.toUpperCase() === "G") {
        const notificationMessage = notificationGenerator(userDocumentData.firstName, documentType, null, true)
        await sendCloudMessage(userDocumentData.tokens, notificationMessage)
        return
      }
    } else if (notificationsDoc.exists) {
      const notificationDateDiff = checkDate(notificationsDoc.data().createdDate, complianceDocument.data().issueDate)
      
      await deleteNotification(notificationsDoc.ref)
    } else {
      const notificationMessage = notificationGenerator(userDocumentData.firstName, documentType, dateDiff)
      const data = {
        type: documentType,
        message: notificationMessage,
        link: complianceDocument[documentType]
      }
      await addNotification(userId.docs[0].ref, data)
      await sendCloudMessage(userDocumentData.tokens, notificationMessage)
      return
    }
  })

}

const checkDate = (firstDate, secondDate) => {
  const dateDiff = moment(firstDate).diff(moment(secondDate), 'days')
  return dateDiff
}

const notificationGenerator = (
  firstName,
  documentType,
  dateDiff,
  epdRating,
) => {

  let notification;
  if (epdRating) {
    notification = `Hi ${firstName}, It is a legal requirement for your rental property to have a valid EPC report with a minimum rating of D, please upload a valid report or click this link to arrange for us to help you with this.`;
  } else {
    switch (dateDiff) {
      case dateDiff >= 90 && dateDiff < 30:
        notification = `Hi ${firstName}, the ${documentString[documentType]} for your property expires in ${dateDiff} days. Click this link to arrange for us to help you with this.`;
        break;
      case dateDiff >= 30 && dateDiff <= 0:
        notification = `Hi ${firstName}, the ${documentString[documentType]} for your property expires in ${dateDiff} days. To keep this rental property compliant please upload a updated report. Click this link to arrange for us to help you with this.`;
        break;
      case dateDiff > 0:
        notification = `Hi ${firstName}, Your ${documentString[documentType]} is expired. It is a legal requirement for your rental property to have a valid ${documentString[documentType]}, please upload a valid report or click this link to arrange for us to help you with this.`;
        break;
      case !dateDiff:
        notification = `Hi ${firstName}, You haven't added your ${documentString[documentType]} to your property. This is a legal requirement, please upload a valid report or click this link to arrange for us to help you with this.`;
        break;
      default:
        break;
    }
  }
  return notification;
};

const sendCloudMessage = async (tokens, notificationMessage) => {
  const message = {
    notification: { title: 'Sucasa', body: notificationMessage },
    tokens: tokens,
    data: {
      body: notificationMessage,
    }
  };

  await admin.messaging().sendMulticast(message)

}
