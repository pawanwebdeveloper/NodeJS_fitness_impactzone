const sgMail = require("@sendgrid/mail");

module.exports = {
  sendEmail: async (email, subject, body) => {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email,
        from: process.env.SMTP_EMAIL,
        subject: `The Impact Zone : ${subject}`,
        html: body,
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  },
};
