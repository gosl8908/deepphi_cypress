const {
  loginModule,
  imageDatasetModule,
  recordDatasetModule,
  sendEmailModule,
} = require('../module/manager.module.js');

describe('Organization Dataset Upload', () => {
  before(() => {
      cy.setDateToEnv();
      cy.getAllCookies(); // 쿠키 삭제
      cy.getAllLocalStorage(); // 로컬 삭제
      cy.getAllSessionStorage(); // 세션 삭제
  });

  it('Organization Dataset Upload', () => {
      loginModule.login(Cypress.env('Prod'), Cypress.env('AutoTestID'), Cypress.env('Password'));

      // 단체 이동
      cy.get('.btn__user_info').click(); // 프로필 선택
      cy.get('.organization-changer__opener').click();
      cy.contains('자동화용 단체').click(); // 단체 선택
      cy.wait(5000);

      imageDatasetModule.imagedataset(Cypress.env('ImageDatasetName'), Cypress.env('DateLabel'));

      recordDatasetModule.recorddataset(Cypress.env('RecordDatasetName'), Cypress.env('DateLabel'));

      sendEmailModule.email(
          'Organization Dataset Upload ' + Cypress.env('EmailTitle'),
          Cypress.env('OrganizationDatasetUploadEmailBody'),
      );
  });
});
