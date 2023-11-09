const { loginModule , emailModule } = require('../../e2e/Module/moduleManager.js');

describe('Test', () => {

  before(() => {
    cy.setDateToEnv();
    cy.getAllCookies(); // 쿠키 삭제
    cy.getAllLocalStorage(); // 로컬 삭제
    cy.getAllSessionStorage(); // 세션 삭제
    cy.viewport(1920, 1080); // FHD 해상도 설정
  });
  
  it('Test', () => {
    loginModule.login( Cypress.env('stg'), Cypress.env('auto_test_id'), Cypress.env('password') );

    // 인퍼런스
    // cy.get(':nth-child(3) > .left-navigation--sub-navi > li.ng-tns-c1-1 > button.ng-tns-c1-1 > .ng-tns-c1-1').click(); 
    // cy.get(':nth-child(11) > .btn').click(); // 실행
    // cy.wait(10000);
    // emailModule.email(Cypress.env('emailtitle'), Cypress.env('emailbody'));
  });
});