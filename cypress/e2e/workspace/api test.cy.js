const { loginModule, ApiModule, sendEmailModule } = require('../module/manager.module.js');

describe('인퍼런스 서비스 api test', () => {
  beforeEach(()=>{
    cy.setDateToEnv();
    cy.getAll();
    loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPasswd'));
  });
  // 레코드 인퍼런스 api 호출
  it('인퍼런스 서비스 api test', () => {

    cy.get(':nth-child(3) > .left-navigation--sub-navi > li.ng-tns-c1-1 > button.ng-tns-c1-1 > .ng-tns-c1-1').click();

    cy.get(':nth-child(1) > :nth-child(13) > .btn').click(); // 상세 조회
    
    cy.wait(5000);

    // api url 복사
    cy.get('[style="width: calc(100% - 76px);word-break: break-all"]').then(($el) => {

        // 텍스트 추출
        const endpoint = $el.text();

        Cypress.env('endpointText', endpoint);
        cy.log('확인된 endpointText 값:', Cypress.env('endpointText'));
        });

    cy.get('.documentation-address').then(($el) => {

        // 텍스트 추출
        const api = $el.text();

        Cypress.env('apiText', api);
        cy.log('확인된 endpointText 값:', Cypress.env('apiText'));
        });


    cy.get('.default-tab > ul > :nth-child(2) > button').click(); // 예측 이력

    // api 호출
    cy.wait(15000);
    ApiModule.Api();
    cy.contains('성공', { timeout: 60000 }).should('be.visible');
  });
});