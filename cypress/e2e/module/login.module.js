function login(site, id, password) {
  cy.visit(site);

  if (site === Cypress.env('Prod')) {
      cy.get('.support__gnb-container > .support__gnb--user > ul > .ng-star-inserted:nth-child(4) > a', {
          timeout: 30000,
      })
          .click({ force: true })
          .then(() => {
              // 클릭 후 현재 페이지의 URL 가져오기
              cy.url().then(url => {
                  // 가져온 URL을 이용하여 다시 visit 수행
                  cy.visit(url, { timeout: 60000 });
              });
          });
  } else if (site === Cypress.env('ProdAdmin')) {
  }
  cy.reload();
  cy.get('#username').type(id); // 이메일 입력
  cy.get('#password').type(password); // 비밀번호 입력
  cy.get('#kc-login').click();
  cy.wait(3000);
}
module.exports = {
  login: login,
};
