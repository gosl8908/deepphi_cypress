const { loginModule, createModule, datasetModule, ApiModule, sendEmailModule, visualizationCreateModule } = require('../module/manager.module.js');
describe('로그인', () => {
  let testFail  = ''; // 실패 원인을 저장할 변수
  let screenshots = []; // 스크린샷을 저장할 배열

  beforeEach(()=>{
    cy.setDateToEnv();
    cy.getAll();
    loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId2'), Cypress.env('KangTestPwd'));
    // Cypress.off('fail');
  });

  it('test', () => {
    cy.contains('이미지 데이터셋').click()
    cy.get('.f', {timeout: 1*1000})
    Cypress.on('fail', (err, runnable) => {
      testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
  });
  });
  it('test2', () => {
    cy.contains('레코드 데이터셋').click()
    cy.get('.a', {timeout: 1*1000})
    Cypress.on('fail', (err, runnable) => {
      testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
  });
  });
  afterEach('Status Fail', () => {
    const isTestFailed  = Boolean(testFail);
    const screenshotFileName = `Login Test ${Cypress.env('DateLabel')}`;
    isTestFailed && cy.screenshot(screenshotFileName); // 첫 번째 스크린샷
    isTestFailed && screenshots.push(screenshotFileName)
});
after('Send Email', () => {
  if (testFail) {
    console.log('전체 테스트 실패 이유:', testFail);
    // 여기서 이메일 등의 추가 작업을 수행할 수 있음
  }
  const testRange = '1. 로그인 '
  const isTestFailed  = Boolean(testFail);

  const EmailBody = `Cypress 자동화 테스트 스위트가 ${isTestFailed ? '실패' : '성공'}하였습니다.
  테스트 실행 시간 : ${Cypress.env('DateLabelWeek')}
  테스트 범위 : ${testRange}
  ${isTestFailed ? `
  테스트 실패 원인 : ${testFail}` : ''}`;

  cy.log('테스트가 성공적으로 완료되었습니다.');

  const sendemail = {
    recipient: Cypress.env('Id'),
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
  // sendEmailModule.sendEmail(
  //     testFail,
  //     Cypress.env('Id'),
  //     `Login Test ${Cypress.env('EmailTitle')}`,
  //     testRange,
  //     screenshots,
  // );
});
});
