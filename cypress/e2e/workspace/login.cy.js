const { loginModule, sendEmailModule } = require('../module/manager.module.js');

describe('로그인', () => {
  before(()=>{
    cy.setDateToEnv();
  });

  it('인퍼런스 서비스 api test', () => {

    loginModule.login( Cypress.env('Prod'), Cypress.env('AutoTestId'), Cypress.env('Password') );

    const EmailBody = `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${Cypress.env(
      'DateLabelWeek',
  )}\n 테스트 범위 : 1. 로그인`;

    sendEmailModule.sendEmail(Cypress.env('Id'), 'Login Test ' + Cypress.env('EmailTitle'), EmailBody);

  });
});