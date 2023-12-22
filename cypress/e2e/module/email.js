function email(emailtitle, emailbody) {
  cy.log("테스트가 성공적으로 완료되었습니다.");

  cy.task("sendEmail", {
    recipient: "gosl8908@deepnoid.com",
    subject: emailtitle,
    body: emailbody,
  }).then((success) => {
    if (success) {
      cy.log("이메일 전송 성공.");
    } else {
      cy.log("이메일 전송 실패.");
    }
  });
}

module.exports = {
  email: email,
};