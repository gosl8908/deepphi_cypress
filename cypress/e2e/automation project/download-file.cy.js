const { loginModule, DownloadFlieModule, sendEmailModule } = require('../module/manager.module.js');

describe('Download File Test', () => {
    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPwd'));
    });
it('Image Download File Test',()=> {

  DownloadFlieModule.imageDownloadFlie();
})

it('Record Download File Test',()=> {

  DownloadFlieModule.recordDownloadFlie();

  const testRange = '1. 레코드 프로젝트 파일 다운로드 2. 레코드 평가 프로젝트 파일 다운로드 3. 이미지 프로젝트 파일 다운로드 4. 이미지 평가 프로젝트 파일 다운로드';
  
sendEmailModule.sendEmail(
  undefined,
    Cypress.env('Id'),
    'Download File ' + Cypress.env('EmailTitle'),
    testRange,
    undefined,)
})

after(()=> {
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
});
