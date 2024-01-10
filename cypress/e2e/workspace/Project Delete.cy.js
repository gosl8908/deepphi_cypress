const { loginModule } = require('../module/manager.module.js');

describe('Project Delete', () => {
  beforeEach(()=>{
    cy.setDateToEnv();
    loginModule.login( Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPasswd') );
  });

  it('Project Delete', () => {

    cy.visit(`${Cypress.env('Prod')}my-page/files`);
    cy.wait(1000);
    for (let i = 0; i < 5; i++) {
        // 반복 3번
        cy.get('label > em').click();
        cy.wait(1000);
        cy.get('.file-item__control-panel > :nth-child(2) > .btn').click();
        cy.wait(1000);
        cy.get('.modal-button-content > .btn-danger').click();
        cy.contains('성공적으로 삭제되었습니다.', { timeout: 20000 });
        cy.wait(3000);
    }

  //   cy.get('.search-box > .input-form').type('2024');
  //   cy.get('.search-box > .btn-primary').click();

  //   // DISK 결제 팝업
  //   // cy.get('.left-content > .radio-graphic > div > label > em').click();
  //   // cy.get('.right-content > .btn-long-25').click();

  //   // 인퍼런스 서비스 메뉴
  //   // cy.get('#site-map__flow-btn').click();
  //   // cy.get('#inference-menu-ul > li > button').click();

  //   // 이미지 데이터셋 메뉴
  //   // cy.get(':nth-child(1) > .left-navigation--sub-navi > :nth-child(1) > button.ng-tns-c1-1 > .ng-tns-c1-1').click();
    
  //   // 레코드 데이터셋 메뉴
  //   // cy.get(':nth-child(1) > .left-navigation--sub-navi > :nth-child(2) > button.ng-tns-c1-1 > .ng-tns-c1-1').click();

  //   // 인퍼런스 삭제
  //   // cy.get(':nth-child(1) > :nth-child(14) > .btn').click();
  //   // cy.get('.btn-danger').click();
    
  //   for (let i = 0; i < 100; i++) {
  //     cy.get(':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .btn').click(); // 프로젝트 메뉴 선택
  //     cy.get(':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .list-dropdown > :nth-child(4) > button').click();
  //     cy.get('.btn-danger').click()
  //     cy.wait(3000);
  // };
  });
});