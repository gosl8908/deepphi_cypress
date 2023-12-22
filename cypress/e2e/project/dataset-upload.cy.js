const {
  loginModule,
  imageDatasetModule,
  recordDatasetModule,
  sendEmailModule,
} = require('../module/manager.module.js');

describe('Dataset Upload Test', () => {
  before(() => {
      cy.setDateToEnv();
      cy.getAllCookies(); // 쿠키 삭제
      cy.getAllLocalStorage(); // 로컬 삭제
      cy.getAllSessionStorage(); // 세션 삭제
  });

  it('Dataset Upload test', () => {
      loginModule.login(Cypress.env('Prod'), Cypress.env('AutoTestID'), Cypress.env('Password'));

      imageDatasetModule.imagedataset(Cypress.env('ImageDatasetName'), Cypress.env('DateLabel'));

      recordDatasetModule.recorddataset(Cypress.env('RecordDatasetName'), Cypress.env('DateLabel'));

      sendEmailModule.email(
          'Dataset Upload Test ' + Cypress.env('EmailTitle'),
          Cypress.env('DatasetUploadEmailBody'),
      );
  });
});
