const { loginModule, createModule, datasetModule, ApiModule, sendEmailModule, visualizationCreateModule } = require('../module/manager.module.js');
describe('로그인', () => {
  let testFail  = ''; // 실패 원인을 저장할 변수

  beforeEach(()=>{
    cy.setDateToEnv();
    cy.getAll();
    loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId2'), Cypress.env('KangTestPwd'));
  });

  it('test', () => {
    cy.get('.f');
  });
    it('test', () => {
    cy.get('.f');
  });
  afterEach('Status Fail', () => {
    Cypress.on('fail', (err, runnable) => {
        testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
    });
});
after('Send Email', () => {
  const screenshotFileName = `Login Test ${Cypress.env('DateLabel')}`;
  const testRange = '1. 로그인 '

  // [파일명1, 파일명2, ...]

  sendEmailModule.sendEmail(
      testFail,
      Cypress.env('Id'),
      `Login Test ${Cypress.env('EmailTitle')}`,
      testRange,
      testFail && screenshotFileName,
  );
});
});

    // createModule.createImageDataset('2D', 1, 1, '2D_CL_Case1', 'ImageDataset' + Cypress.env('DateLabel'));
    // createModule.createRecordDataset('자동화용 데이터셋.csv', 'RecordDataset' + Cypress.env('DateLabel'));
    // createModule.createRecordProject('RecordDataset' + Cypress.env('DateLabel'));
    // datasetModule.settingImageDataset(1, '2D');
    // datasetModule.settingRecordDataset();

  //   cy.contains('마이 인퍼런스').click();

  //   cy.wait(1000);

  //   cy.get(':nth-child(1) > :nth-child(11) > .btn').click(); // 실행

  //   cy.wait(10000);

  //   cy.contains('보기').trigger('click', { force: true });

  //   cy.wait(1000);

  //   cy.get('[style="width: calc(100% - 76px);word-break: break-all"]').then(($el) => {
    
  //     // 텍스트 추출
  //     const text = $el.text();

  //     Cypress.env('endpointText', text);
  //     cy.log('확인된 endpointText 값:', Cypress.env('endpointText'));
      
  //       });

  //   cy.wait(1000);

  //   cy.get('.default-tab > ul > :nth-child(2) > button').click(); // 예측 이력

  //       // api 호출
  //       cy.wait(30000);
  //       recordApiModule.recordApi();
  //       cy.contains('성공', { timeout: 60000 }).should('be.visible');
  //       cy.screenshot('record_inference_api'+ Cypress.env('DateLabel'), 1920, 1080);
  //       cy.get('.btn-clear-danger').click(); // 중지
  //       cy.wait(10000);