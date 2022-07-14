const config = require('../config.json');
const jwt = require('jsonwebtoken');
const sendEmail = require('../_helpers/send-email');
const admin = require('firebase-admin');
const db = admin.firestore();

const NOTIFICATIONS_STRING = 'notifications';
const USER_ID_STRING = 'userId';

module.exports = {
  create,
};

function getEmailMessage(invite) {
  switch (invite.type) {
    case 'partner':
      return {
        title: `Partner Invite`,
        subtitle: `${invite.user} has invited you to be his/her partner`,
      };
    case 'landlord':
      return {
        title: `Landlord Invite`,
        subtitle: `${invite.user} has invited you to be his/her landlord`,
      };
    case 'tenant':
      return {
        title: `Tenant Invite`,
        subtitle: `${invite.user} has invited you to be his/her tenant`,
      };
    case 'guarantor':
      return {
        title: `Guarantor Invite`,
        subtitle: `${invite.user} has invited you to be his/her guarantor`,
      };
    default:
      return null;
  }
}

async function create(params, origin) {
  // send email
  await sendInviteEmail(params);
  // return invite
  return params;
}

// helper functions
function generateInviteLink(invite) {
  // create a jwt token containing the invite id that expires in 30 days
  return jwt.sign(invite, config.secret, {expiresIn: '14d'});
}

async function sendInviteEmail(
  invite,
  origin = 'https://sucasa-6c3e7.web.app',
) {
  const {title, subtitle} = getEmailMessage(invite);
  const token = generateInviteLink(invite);
  let message = '';
  if (origin) {
    const inviteUrl = `${origin}/invite/${token}`;
    message = `<p>Please click the below link to continue:</p>
                   <p><a href="${inviteUrl}">Click here</a></p>`;
  }
  try {
    await sendUserNotification(invite, token);
  } catch (error) {
    console.error(error);
  }
  await sendEmail({
    to: invite.email,
    subject: title,
    html: `<h4>${subtitle}</h4>
               ${message}`,
  });
}

async function sendUserNotification(invite, token) {
  const {subtitle} = getEmailMessage(invite);
  const snapshot = await db.collection(USER_ID_STRING).get();
  if (!snapshot.empty) {
    snapshot.forEach(doc => {
      if (doc.data().email === invite.email) {
        db.collection(
          `${USER_ID_STRING}/${doc.id}/${NOTIFICATIONS_STRING}`,
        ).add({
          link: `/invite/${token}`,
          reference: `${USER_ID_STRING}/${doc.id}`,
          type: subtitle,
        });
      }
    });
  }
}
