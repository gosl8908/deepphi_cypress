const { loginModule, sendEmailModule } = require('../module/manager.module.js');

describe('로그인', () => {
  before(()=>{
    cy.setDateToEnv();
  });

  it('인퍼런스 서비스 api test', () => {

    loginModule.login( Cypress.env('Prod'), Cypress.env('AutoTestID'), Cypress.env('Password') );

    sendEmailModule.sendEmail('SignUp Test ' + Cypress.env('EmailTitle'), Cypress.env('SignupEmailBody'));

  });
});