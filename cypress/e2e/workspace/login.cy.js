const { loginModule, createModule, datasetModule, ApiModule, sendEmailModule, visualizationCreateModule } = require('../module/manager.module.js');
describe('로그인', () => {
  let testFails  = []; // 실패 원인을 저장할 변수
  let screenshots = []; // 스크린샷을 저장할 배열

  beforeEach(()=>{
    cy.setDateToEnv();
    cy.getAll();
    loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId2'), Cypress.env('KangTestPwd'));

  });

  it('test', () => {
    cy.contains('이미지 데이터셋f', {timeout: 1*1000});
    Cypress.on('fail', (err, runnable) => {
      testFails.push(err.message || '알 수 없는 이유로 실패함'); // 실패 원인을 저장

  });
  });
  it('test2', () => {
    cy.contains('이미지 데이터셋f', {timeout: 1*1000});
    Cypress.on('fail', (err, runnable) => {
      testFails.push(err.message || '알 수 없는 이유로 실패함'); // 실패 원인을 저장

  });
  });
  afterEach('Status Fail', () => {
    const screenshotFileName = `Login/Login Test ${Cypress.env('DateLabel')}`;
    testFails.forEach((fail) => {
      Boolean(fail) && (cy.screenshot(screenshotFileName), screenshots.push(screenshotFileName));
    });
  });

  after('Send Email', () => {
    const testRange = '1. 로그인 ';
    const isTestFailed = testFails.length > 0;
    const EmailBody = `Cypress 자동화 테스트 스위트가 ${isTestFailed ? '실패' : '성공'}하였습니다.
    테스트 실행 시간 : ${Cypress.env('DateLabelWeek')}
    테스트 범위 : ${testRange}
    ${isTestFailed ? `
    테스트 실패 원인 : ${testFails.join('\n')}` : ''}`;
  
    cy.log('테스트가 성공적으로 완료되었습니다.');
  
    const sendemail = {
      recipient: Cypress.env('AdminId'),
      subject: `Login Test ${Cypress.env('EmailTitle')}`,
      body: EmailBody,
      screenshotFileNames: screenshots.map(name => name + '.png'), // 스크린샷 파일 이름들을 추가
    };
  
  
    cy.task('sendEmail', sendemail).then(success => {
        if (success) {
            cy.log('이메일 전송 성공.');
        } else {
            cy.log('이메일 전송 실패.');
        }
    });
  });
});
    // sendEmailModule.sendEmail(
    //   testFails.join('\n'),
    //   Cypress.env('AdminId'),
    //   `Login Test ${Cypress.env('EmailTitle')}`,
    //   testRange,
    //   screenshots,
    // );

//   afterEach('Status Fail', () => {
//     const screenshotFileName = `Login/Login Test ${Cypress.env('DateLabel')}`;
//     Boolean(testFail) && (cy.screenshot(screenshotFileName), screenshots.push(screenshotFileName));
// });
// after('Send Email', () => {
//   const testRange = '1. 로그인 '

//   sendEmailModule.sendEmail(
//       testFail,
//       Cypress.env('Id'),
//       `Login Test ${Cypress.env('EmailTitle')}`,
//       testRange,
//       screenshots,
//   );
// });
// });

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