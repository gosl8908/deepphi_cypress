function login(Prod, AutoTestId, Password) {
  cy.log('로그인 성공');

  /* 로그인 */
  cy.visit(Prod, { timeout: 120000 });
  cy.contains('로그인').click({ timeout: 60000 }); // 로그인 클릭
  cy.get('#username').type(AutoTestId); // 이메일 입력
  cy.get('#password').type(Password); // 비밀번호 입력
  cy.get('#kc-login').click({ timeout: 60000 }); // 로그인 선택
  cy.wait(3000);
}

module.exports = {
  login: login,
};
