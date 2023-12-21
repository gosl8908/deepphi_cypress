// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

// cypress.config.js
const nodemailer = require("nodemailer");

module.exports = {
  pageLoadTimeout: 60000,
  projectId: "k9i7ip",
  // ...

  e2e: {
    // ...

    setupNodeEvents(on, config) {
      // ...

      on("task", {
        sendEmail({ recipient, subject, body }) {
          const transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
              user: "gosl8908@deepnoid.com",
              pass: "rnrmf0801!",
            },
          });

          const mailOptions = {
            from: "gosl8908@deepnoid.com",
            to: "gosl8908@deepnoid.com",
            subject: subject,
            text: body,
          };

          return transporter
            .sendMail(mailOptions)
            .then((info) => {
              console.log("이메일 성공적으로 전송됨: " + info.response);
              return true;
            })
            .catch((error) => {
              console.error("이메일 전송 실패: " + error);
              return false;
            });
        },
      });
    },
  },
};
