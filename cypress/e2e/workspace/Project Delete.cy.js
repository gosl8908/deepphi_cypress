const { loginModule } = require('../Module/moduleManager.js');

describe('Project Delete', () => {
  before(()=>{
    cy.setDateToEnv();
  });

  it('Project Delete', () => {
    // 로그인
    loginModule.login( Cypress.env('stg'), Cypress.env('auto_test_id'), Cypress.env('password') );

    // DISK 결제 팝업
    // cy.get('.left-content > .radio-graphic > div > label > em').click();
    // cy.get('.right-content > .btn-long-25').click();

    // 인퍼런스 서비스 메뉴
    // cy.get('#site-map__flow-btn').click();
    // cy.get('#inference-menu-ul > li > button').click();

    // 이미지 데이터셋 메뉴
    // cy.get(':nth-child(1) > .left-navigation--sub-navi > :nth-child(1) > button.ng-tns-c1-1 > .ng-tns-c1-1').click();
    
    // 레코드 데이터셋 메뉴
    cy.get(':nth-child(1) > .left-navigation--sub-navi > :nth-child(2) > button.ng-tns-c1-1 > .ng-tns-c1-1').click();

    for (let i = 0; i < 100; i++) { // 반복 100번

    // 인퍼런스 삭제
    // cy.get(':nth-child(1) > :nth-child(14) > .btn').click();
    // cy.get('.btn-danger').click();

    // 데이터셋 삭제
    cy.get(':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .btn > .fas').click();
    cy.get(':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .list-dropdown > :nth-child(2) > button').click();
    cy.get('.btn-danger').click();
    cy.wait(3000);

    // 프로젝트 삭제
    // cy.get(':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .btn > .fas').click(); // 프로젝트 메뉴 선택
    // cy.get(':nth-child(4) > button').click(); 
    // cy.get('.btn-danger').click();
    // cy.wait(3000);
    }
  });
});