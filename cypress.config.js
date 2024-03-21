/* cypress.config.js */
const nodemailer = require('nodemailer');
const { defineConfig } = require('cypress');
/* 리포트 추가 */
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

/* Email Account */
const EamilId = 'gosl8908@deepnoid.com';
const EamilPwd = 'gotjd0215!';

module.exports = defineConfig({
    viewportWidth: 1920,
    viewportHeight: 1080,
    pageLoadTimeout: 60000,
    experimentalStudio: true,
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
            // implement node event listeners here
            require('cypress-mochawesome-reporter/plugin')(on);

            on('task', {
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
                        host: 'smtp.office365.com',
                        port: 587,
                        secure: false,
                        auth: {
                            user: EamilId,
                            pass: EamilPwd,
                        },
                    });
                    const mailOptions = {
                        from: EamilId,
                        to: 'gosl8908@deepnoid.com',
                        subject: subject,
                        text: body,
                        attachments: attachments,
                    };
                    return transporter
                        .sendMail(mailOptions)
                        .then(info => {
                            console.log('이메일 성공적으로 전송됨: ' + info.response);
                            return true;
                        })
                        .catch(error => {
                            console.error('이메일 전송 실패: ' + error);
                            return false;
                        });
                },
            });
        },

        env: {
            /* Site */
            Onprem: 'https://onprem.deepphi.ai/',
            Stg: 'http://st-home.deepphi.ai/',
            StgAdmin: 'https://st-admin.deepphi.ai/',
            Dev: 'https://dev-home.deepphi.ai/',
            DevAdmin: 'https://dev-admin.deepphi.ai/',
            Prod: 'https://www.deepphi.ai/',
            ProdAdmin: 'https://admin.deepphi.ai/',
            ProdTest: 'http://st.deepphi.ai/',
            DisposableEmail: 'https://ruu.kr/',

            /* Id */
            AdminId: 'admin@deepnoid.com',
            AutoTestId: 'deeptest1@deepnoid.com',
            KangTestId2: 'deepphi.auto2@ruu.kr',
            KangTestId3: 'deepphi.auto3@ruu.kr',
            KangTestId4: 'deepphi.auto4@ruu.kr',
            KangTestId5: 'deepphi.auto5@ruu.kr',
            KangTestId6: 'deepphi.auto6@ruu.kr',
            KangTestId7: 'deepphi.auto7@ruu.kr',
            DeepPhiAutoId: 'deepphi.auto2@ruu.kr',
            OnpremId3: 'asdasdasd3@ruu.kr',
            OnpremId4: 'asdasdasd4@ruu.kr',
            OnpremId5: 'asdasdasd5@ruu.kr',
            OnpremId6: 'asdasdasd6@ruu.kr',
            OnpremId7: 'asdasdasd7@ruu.kr',
            OnpremId8: 'asdasdasd8@ruu.kr',
            OnpremId9: 'asdasdasd9@ruu.kr',
            OnpremId10: 'asdasdasd10@ruu.kr',
            TestEmail: 'ckdeo1211@deepnoid.com',
            AutoEmail: 'deepphi.auto@gmail.com',
            ObsTestId: 'obskorea@ruu.kr',
            Obs2TestId: 'obskorea2@ruu.kr',
            Obs3TestId: 'obskorea3@ruu.kr',
            Obs4TestId: 'obskorea4@ruu.kr',
            Test1Id: 'qa1214@deepnoid.com',
            Supporttest: 'supporttest@ruu.kr',
            AdminPwd: 'deep1004!!',
            supporttest: 'supporttest@ruu.kr',
            OnpremAdminId: 'admin@deepnoid.com',

            /* Password */
            ObsTestPwd: 'P@ssw0rd',
            KangTestPwd: 'test123!',
            TestPwd: 'deepp@ssw0rd',
            AutoPwd: '12sqec34!',
            Test1Pwd: 'qwe123..',
            OnpremAdminPwd: 'deep1004!!',
            OnpremTestPwd: 'qwe123##',

            /* content */
            EmailBody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다`,
        },
    },
});
