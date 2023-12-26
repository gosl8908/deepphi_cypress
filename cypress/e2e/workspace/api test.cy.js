const { imageApiModule, recordApiModule, sendEmailModule } = require('../module/manager.module.js');

describe('인퍼런스 서비스 api test', () => {

  // 레코드 인퍼런스 api 호출
  it('인퍼런스 서비스 api test', () => {

    imageApiModule.imageApi();

    // recordApiModule.recordApi();

    sendEmailModule.email(Cypress.env('Id'), 'api test ' + Cypress.env('emailtitle'), Cypress.env('date_label'));
  });
});