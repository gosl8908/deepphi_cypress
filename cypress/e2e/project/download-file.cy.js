const { loginModule, DownloadFlieModule, sendEmailModule } = require('../module/manager.module.js');

describe('Download File Test', () => {
    let testFail = ''; // 실패 원인을 저장할 변수
    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPasswd'));
    });
it('Image Download File Test',()=> {

  DownloadFlieModule.imageDownloadFlie();
  Cypress.on('fail', (err, runnable) => {
    testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
  });
})

it('Record Download File Test',()=> {

  DownloadFlieModule.recordDownloadFlie();
  Cypress.on('fail', (err, runnable) => {
    testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
  });
})

afterEach(()=> {
  cy.visit(`${Cypress.env('Prod')}my-page/files`);
  cy.wait(1000);
  for (let i = 0; i < 5; i++) {
    cy.get('label > em').invoke('click');
    cy.wait(1000);
    cy.get('.file-item__control-panel > :nth-child(2) > .btn').invoke('click');
    cy.wait(1000);
    cy.get('.modal-button-content > .btn-danger').invoke('click');
    cy.contains('성공적으로 삭제되었습니다.', { timeout: 20000 });
    cy.wait(3000);
    
    // Check if the text "다운로드 파일이 없습니다." is visible
    const isTextVisible = cy.contains('다운로드 파일이 없습니다.', {timeout : 10*1000}).should('be.visible').then(() => true).catch(() => false);
  
    // If the text is visible, exit the loop
    if (isTextVisible) {
      break;
    }
  }
})
    after('Send Email', () => {
        const screenshotFileName = `Download File Test/Download File Test ${Cypress.env('DateLabel')}`;
        const isTestFailed = Boolean(testFail);
        const testRange = '1. 레코드 프로젝트 파일 다운로드 2. 레코드 평가 프로젝트 파일 다운로드 3. 이미지 프로젝트 파일 다운로드 4. 이미지 평가 프로젝트 파일 다운로드'

        sendEmailModule.sendEmail(
            isTestFailed,
            Cypress.env('Id'),
            `Download File Test ${Cypress.env('EmailTitle')}`,
            testRange,
            isTestFailed && screenshotFileName,
            testFail,
        );
    });
});
