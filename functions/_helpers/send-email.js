const nodemailer = require('nodemailer');
const config = require('../smtp.config');
const {google} = require('googleapis');

module.exports = sendEmail;

const {user, clientId, clientSecret, refreshToken, redirectUri} =
  config.smtpOptions.auth;

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri,
);
oAuth2Client.setCredentials({refreshToken});

async function sendEmail({to, subject, html, from = config.emailFrom}) {
  // const accessToken = await oAuth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user,
      clientId,
      clientSecret,
      refreshToken,
    },
  });
  const result = await transporter.sendMail({from, to, subject, html});
  return result;
}
