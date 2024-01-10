const { loginModule, DownloadFlieModule, sendEmailModule } = require('../module/manager.module.js');

describe('Download File Test', () => {
    let RecordDownloadFileTestFail = ''; // 실패 원인을 저장할 변수
    let ImageDownloadFileTestFail = ''; // 실패 원인을 저장할 변수
    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPasswd'));
    });
it('Image Download File Test',()=> {

  DownloadFlieModule.imageDownloadFlie();
  Cypress.on('fail', (err, runnable) => {
    ImageDownloadFileTestFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
  });
})

it('Record Download File Test',()=> {

  DownloadFlieModule.recordDownloadFlie();
  Cypress.on('fail', (err, runnable) => {
    RecordDownloadFileTestFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
  });
})

afterEach(()=> {
  cy.visit(`${Cypress.env('Prod')}my-page/files`);
  cy.wait(1000);
  for (let i = 0; i < 5; i++) {
      // 반복 3번
      cy.get('label > em').invoke('click');
      cy.wait(1000);
      cy.get('.file-item__control-panel > :nth-child(2) > .btn').invoke('click');
      cy.wait(1000);
      cy.get('.modal-button-content > .btn-danger').invoke('click');
      cy.contains('성공적으로 삭제되었습니다.', { timeout: 20000 });
      cy.wait(3000);
  }
})
    after(() => {
        const screenshotFileName = `Download File Test/Download File Test ${Cypress.env('DateLabel')}`;
        const isTestFailed = Boolean(RecordDownloadFileTestFail, ImageDownloadFileTestFail);
        const EmailBody = `Cypress 자동화 테스트 스위트가 ${isTestFailed ? '실패' : '성공'}하였습니다.
        테스트 실행 시간 : ${Cypress.env('DateLabelWeek')}
        테스트 범위 : 1. 레코드 프로젝트 파일 다운로드 2. 레코드 평가 프로젝트 파일 다운로드 3. 이미지 프로젝트 파일 다운로드 4. 이미지 평가 프로젝트 파일 다운로드${
            isTestFailed
                ? `\n
        테스트 실패 원인: 
        ${RecordDownloadFileTestFail ? 'Record Download File Test: ' + RecordDownloadFileTestFail + '\n' : ''}
        ${ImageDownloadFileTestFail ? 'Image Download File Test: ' + ImageDownloadFileTestFail + '\n' : ''}`
                : ''
        }`;
        sendEmailModule.sendEmail(
            isTestFailed,
            Cypress.env('Id'),
            `Download File Test ${Cypress.env('EmailTitle')}`,
            EmailBody,
            isTestFailed && screenshotFileName,
        );
    });
});
