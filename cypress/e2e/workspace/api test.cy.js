const { image_apiModule, record_apiModule, emailModule } = require('../module/manager.module.js');

describe('인퍼런스 서비스 api test', () => {

  // 레코드 인퍼런스 api 호출
  it('인퍼런스 서비스 api test', () => {

    image_apiModule.image_api();

    // record_apiModule.record_api();

    emailModule.email('api test ' + Cypress.env('emailtitle'), Cypress.env('date_label'));
  });
});