const {
  loginModule,
  imageDatasetModule,
  recordDatasetModule,
  sendEmailModule,
} = require('../module/manager.module.js');

describe('Dataset Upload Test', () => {
  let testFailureReason = ''; // 실패 원인을 저장할 변수
  before(() => {
      cy.setDateToEnv();
      cy.getAllCookies(); // 쿠키 삭제
      cy.getAllLocalStorage(); // 로컬 삭제
      cy.getAllSessionStorage(); // 세션 삭제
  });

  it('Dataset Upload test', () => {
      loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPasswd'));

      imageDatasetModule.imageDataset(Cypress.env('DateLabel'), Cypress.env('DateLabel'));

      recordDatasetModule.recordDataset(Cypress.env('DateLabel'), Cypress.env('DateLabel'));

      Cypress.on('fail', (err, runnable) => {
        testFailureReason = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
      });
});
after(() => {
  let screenshotFileName = `dataset-upload-failed-test ${Cypress.env('DateLabel')}`;
  if (testFailureReason) {
      // 테스트 실패 시 스크린샷 찍기
      cy.screenshot(screenshotFileName)
      // 테스트 실패 시 이메일 전송
      const EmailBody = `Cypress 자동화 테스트 스위트가 실패하였습니다\n 테스트 실행 시간 : ${Cypress.env(
        'DateLabelWeek',
      )}\n 테스트 범위 : 1. 이미지 데이터셋 업로드 2. 변환 3. 사용 용도 수정 4. 데이터셋에 파일 포함 5. 레코드 데이터셋 업로드 6. 설정 완료\n\n테스트 실패 원인: ${testFailureReason}`;
      sendEmailModule.sendEmail(Cypress.env('Id'), 'Dataset Upload Test ' + Cypress.env('EmailTitle'), EmailBody, screenshotFileName);
  } else {
    // 테스트가 성공했을 때 이메일 전송
    const EmailBody = `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${Cypress.env(
      'DateLabelWeek',
    )}\n 테스트 범위 : 1. 이미지 데이터셋 업로드 2. 변환 3. 사용 용도 수정 4. 데이터셋에 파일 포함 5. 레코드 데이터셋 업로드 6. 설정 완료`;
    sendEmailModule.sendEmail(Cypress.env('Id'), 'Dataset Upload Test ' + Cypress.env('EmailTitle'), EmailBody);
  }
});
});
