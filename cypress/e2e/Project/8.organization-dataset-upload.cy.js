const { loginModule , imagedatasetModule , recorddatasetModule , emailModule } = require('../Module/moduleManager.js');

describe('Organization Dataset Upload', () => {

  before(() => {
    cy.setDateToEnv();
    cy.getAllCookies(); // 쿠키 삭제
    cy.getAllLocalStorage(); // 로컬 삭제
    cy.getAllSessionStorage(); // 세션 삭제
  });

  it('Organization Dataset Upload', () => {

    loginModule.login( Cypress.env('prod'), Cypress.env('auto_test_id'), Cypress.env('password') );

    // 단체 이동
    cy.get('.btn__user_info').click(); // 프로필 선택
    cy.get('.organization-changer__opener').click(); 
    cy.contains('자동화용 단체').click(); // 단체 선택
    cy.wait(5000);

    imagedatasetModule.imagedataset( Cypress.env('ImageDatasetName'), Cypress.env('date_label') );

    recorddatasetModule.recorddataset( Cypress.env('RecordDatasetName'), Cypress.env('date_label') );

    emailModule.email('Organization Dataset Upload ' + Cypress.env('emailtitle'), Cypress.env('Organization_Dataset_Upload_emailbody'));
  });
});