function login(site, id, password) {
  cy.visit(site);

  if (site === (Cypress.env('Prod'))) {
      cy.contains('로그인').click();
  } else if (site === (Cypress.env('ProdAdmin'))) {
  }
  cy.get('#username').type(id); // 이메일 입력
  cy.get('#password').type(password); // 비밀번호 입력
  cy.get('#kc-login').click();
  cy.wait(3000);
}
module.exports = {
  login: login,
};
