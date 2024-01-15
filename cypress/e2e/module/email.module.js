function sendEmail(testFail, id, emailTitle, testRange, screenshotFileName) {
  const isTestFailed  = Boolean(testFail);
  isTestFailed && cy.screenshot(screenshotFileName);

  const EmailBody = `Cypress 자동화 테스트 스위트가 ${isTestFailed ? '실패' : '성공'}하였습니다.
  테스트 실행 시간 : ${Cypress.env('DateLabelWeek')}
  테스트 범위 : ${testRange}
  ${isTestFailed ? `
  테스트 실패 원인 : ${testFail}` : ''}`;

  cy.log('테스트가 성공적으로 완료되었습니다.');

  const sendemail = {
    recipient: id,
    subject: emailTitle,
    body: EmailBody,
};

if (isTestFailed) {
  sendemail.screenshotFileName = screenshotFileName + '.png';
}

  cy.task('sendEmail', sendemail).then(success => {
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