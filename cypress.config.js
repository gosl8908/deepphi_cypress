/* cypress.config.js */
const nodemailer = require('nodemailer');
const { defineConfig } = require('cypress');
/* 리포트 추가 */
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

/* Email Account */
const EamilId = process.env.deepphiEmail
const EamilPwd = process.env.deepphiEmailPwd

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

                    /* 스크린샷 있는 경우 첨부 */
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

            /* content */
            EmailBody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다`,
        },
    },
});
