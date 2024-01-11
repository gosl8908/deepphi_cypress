const {
  loginModule,
  createModule, datasetModule,
  sendEmailModule,
} = require('../module/manager.module.js');

describe('Organization Dataset Upload', () => {
  let testFail = ''; // 실패 원인을 저장할 변수
  before(() => {
    cy.setDateToEnv();
    cy.getAll();
  });

  it('Organization Image Dataset Upload', () => {
    loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPwd'));

      // 단체 이동
      cy.get('.btn__user_info').click(); // 프로필 선택
      cy.get('.organization-changer__opener').click();
      cy.contains('자동화용 단체').click(); // 단체 선택
      cy.wait(5000);
      createModule.createImageDataset('2D', 1, 1, '2D_CL_Case1', 'ImageDataset' + Cypress.env('DateLabel'));
      datasetModule.settingImageDataset(1, '2D');

      Cypress.on('fail', (err, runnable) => {
        testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
      });
});
it('Organization Record Dataset Upload', () => {
  loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPwd'));

    // 단체 이동
    cy.get('.btn__user_info').click(); // 프로필 선택
    cy.get('.organization-changer__opener').click();
    cy.contains('자동화용 단체').click(); // 단체 선택
    cy.wait(5000);

    createModule.createRecordDataset('자동화용 데이터셋.csv', 'RecordDataset' + Cypress.env('DateLabel'));
    datasetModule.settingRecordDataset();
    Cypress.on('fail', (err, runnable) => {
      testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
    });
});
after('Send Email', () => {
  const screenshotFileName = `Organization Dataset Upload Test/Organization Dataset Upload Test ${Cypress.env('DateLabel')}`;
  const testRange = '1. 단체 이미지 데이터셋 업로드 2. 변환 3. 사용 용도 수정 4. 데이터셋에 파일 포함 5. 단체 레코드 데이터셋 업로드 6. 설정 완료'

  sendEmailModule.sendEmail(
    testFail,
      Cypress.env('Id'),
      `Organization Dataset Upload Test ${Cypress.env('EmailTitle')}`,
      testRange,
      testFail && screenshotFileName,
  );
  });
});
