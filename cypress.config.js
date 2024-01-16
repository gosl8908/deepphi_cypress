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
const fs = require('fs');
const { defineConfig } = require('cypress');
// 리포트 추가
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  pageLoadTimeout: 60*1000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  screenshotFolder: "cypress/screenshots",
  screenshotOnRunFailure: true,
  projectId: 'scq3m9',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
      charts: true,
      reportPageTitle: 'custom-title',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on("task", {
        sendEmail({ recipient, subject, body, screenshotFileNames }) {
        const attachments = [];

        if (screenshotFileNames && screenshotFileNames.length > 0) {
          screenshotFileNames.forEach(screenshotFileName => {
            const path = `./cypress/screenshots/${screenshotFileName}`;
            attachments.push({
              filename: screenshotFileName,
              encoding: 'base64',
              path: path,
            });
          });
        }
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
            attachments: attachments,
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
      // url
      Onprem: 'https://onprem.deepphi.ai/',
      Stg: 'http://st-home.deepphi.ai/',
      StgAdmin: 'https://st-admin.deepphi.ai/',
      Dev: 'https://dev-home.deepphi.ai/',
      DevAdmin: 'https://dev-admin.deepphi.ai/',
      Prod: 'https://www.deepphi.ai/',
      ProdAdmin: 'https://admin.deepphi.ai/',
      ProdTest: 'http://st.deepphi.ai/',
      DisposableEmail: 'https://ruu.kr/',
      // 계정
      Id: 'gosl8908@deepnoid.com',
      KangTestId2: 'deepphi.auto2@ruu.kr',
      KangTestId3: 'deepphi.auto3@ruu.kr',
      KangTestId4: 'deepphi.auto4@ruu.kr',
      KangTestId5: 'deepphi.auto5@ruu.kr',
      AutoTestId: 'deeptest1@deepnoid.com',
      OnpremId: 'asdasdasd3@ruu.kr',
      KangTestPwd: 'test123!',
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
});