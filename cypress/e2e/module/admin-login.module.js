function adminLogin(ProdAdmin, Id, Password) {
  cy.log('어드민 로그인 성공');

  /* 어드민 로그인 */
  cy.visit(ProdAdmin, { timeout: 120000 });
  cy.get('#username').type(Id); // 이메일 입력
  cy.get('#password').type(Password); // 비밀번호 입력
  cy.get('#kc-login').click({ timeout: 120000 }); // 로그인 선택
  cy.wait(3000);
}

module.exports = {
  adminLogin: adminLogin,
};