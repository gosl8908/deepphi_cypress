function sendEmail(isTestFailed, Id, EmailTitle, EmailBody, screenshotFileName) {


  cy.log('테스트가 성공적으로 완료되었습니다.');
  isTestFailed && cy.screenshot(screenshotFileName);
  const v = {
    recipient: Id,
    subject: EmailTitle,
    body: EmailBody,
};

if (screenshotFileName) {
  v.screenshotFileName = screenshotFileName + '.png';
}

  cy.task('sendEmail', v).then(success => {
      if (success) {
          cy.log('이메일 전송 성공.');
      } else {
          cy.log('이메일 전송 실패.');
      }
  });
}

module.exports = {
  sendEmail: sendEmail,
};
