const { loginModule } = require('../module/manager.module.js');

describe('Project Delete', () => {
  before(()=>{
    cy.setDateToEnv();
  });

  it('Project Delete', () => {
    // 로그인
    loginModule.login( Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPasswd') );

    cy.get('.search-box > .input-form').type('2024');
    cy.get('.search-box > .btn-primary').click();

    // DISK 결제 팝업
    // cy.get('.left-content > .radio-graphic > div > label > em').click();
    // cy.get('.right-content > .btn-long-25').click();

    // 인퍼런스 서비스 메뉴
    // cy.get('#site-map__flow-btn').click();
    // cy.get('#inference-menu-ul > li > button').click();

    // 이미지 데이터셋 메뉴
    // cy.get(':nth-child(1) > .left-navigation--sub-navi > :nth-child(1) > button.ng-tns-c1-1 > .ng-tns-c1-1').click();
    
    // 레코드 데이터셋 메뉴
    // cy.get(':nth-child(1) > .left-navigation--sub-navi > :nth-child(2) > button.ng-tns-c1-1 > .ng-tns-c1-1').click();

    // 인퍼런스 삭제
    // cy.get(':nth-child(1) > :nth-child(14) > .btn').click();
    // cy.get('.btn-danger').click();

    // 데이터셋 삭제
    // cy.get(':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .btn > .fas').click();
    // cy.get(':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .list-dropdown > :nth-child(2) > button').click();
    // cy.get('.btn-danger').click();
    // cy.wait(3000);
  });
  after(() => {
    for (let i = 0; i < 100; i++) {
    // 프로젝트 삭제
    cy.get('.list-dropdown-wrap > .btn').click(); // 프로젝트 메뉴 선택
    cy.contains('삭제').click(); 
    cy.get('.btn-danger').click();
    cy.wait(3000);
    };
});
});