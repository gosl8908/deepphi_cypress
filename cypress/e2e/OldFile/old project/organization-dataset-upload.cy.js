const {
  loginModule,
  imageDatasetModule,
  recordDatasetModule,
  sendEmailModule,
} = require('../module/manager.module.js');

describe('Organization Dataset Upload', () => {
  beforeEach(() => {
    cy.setDateToEnv();
    cy.getAll();
    loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPwd'));
  });

  it('Organization Image Dataset Upload', () => {

      // 단체 이동
      cy.get('.btn__user_info').click(); // 프로필 선택
      cy.get('.organization-changer__opener').click();
      cy.contains('자동화용 단체').click(); // 단체 선택
      cy.wait(5000);
      DatasetUploadModule.imageDataset(Cypress.env('DateLabel'), Cypress.env('DateLabel'));
});

it('Organization Record Dataset Upload', () => {

  // 단체 이동
  cy.get('.btn__user_info').click(); // 프로필 선택
  cy.get('.organization-changer__opener').click();
  cy.contains('자동화용 단체').click(); // 단체 선택
  cy.wait(5000);

  DatasetUploadModule.recordDataset(Cypress.env('DateLabel'), Cypress.env('DateLabel'));

  const testRange = '1. 단체 이미지 데이터셋 업로드 2. 변환 3. 사용 용도 수정 4. 데이터셋에 파일 포함 5. 단체 레코드 데이터셋 업로드 6. 설정 완료';

sendEmailModule.sendEmail(
  undefined,
    Cypress.env('AdminId'),
    'Organization Dataset Upload ' + Cypress.env('EmailTitle'),
    testRange,
    undefined,)
});
});
