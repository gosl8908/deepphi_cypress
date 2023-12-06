const { loginModule } = require('../../e2e/Module/moduleManager.js');

describe('로그인', () => {
  before(()=>{
    cy.setDateToEnv();
  });

  it('인퍼런스 서비스 api test', () => {

    loginModule.login( Cypress.env('prod'), Cypress.env('auto_test_id'), Cypress.env('password') );

  });
});