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
    env: {
      Onprem: 'https://onprem.deepphi.ai/',
      Stg: 'http://st-home.deepphi.ai/',
      StgAdmin: 'https://st-admin.deepphi.ai/',
      Dev: 'https://dev-home.deepphi.ai/',
      DevAdmin: 'https://dev-admin.deepphi.ai/',
      Prod: 'https://www.deepphi.ai/home',
      ProdAdmin: 'https://admin.deepphi.ai/',
      ProdTest: 'http://st.deepphi.ai/',
      Id: 'gosl8908@deepnoid.com',
      AutoTestId: 'deeptest1@deepnoid.com',
      OnpremId: 'asdasdasd3@ruu.kr',
      Password: 'test123!',
      email: 'ckdeo1211@deepnoid.com',
      // 형식
      classification: 1,
      segmentation: 2,
      detection: 3,
      transformation: 4,
      // 케이스
      case1: 1,
      case2: 2,
  },

  },
};
