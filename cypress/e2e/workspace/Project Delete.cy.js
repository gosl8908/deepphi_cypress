// const { loginModule } = require('./Module/moduleManager.js');

// describe('Project Delete', () => {

//   before(() => {
//     cy.setDateToEnv();
//     cy.viewport(1920, 1080); // FHD 해상도 설정
//     cy.clearCookies(); // 모든 쿠키 지우기
    
//   });

//   it('Project Delete', () => {
//     loginModule.login( Cypress.env('prod'), Cypress.env('auto_test_id'), Cypress.env('password') );

    
//     for (let i = 0; i < 100; i++) { // 반복 100번
//     cy.get(':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .btn').click(); // 프로젝트 메뉴 선택
//     cy.get(':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .list-dropdown > :nth-child(4) > button').click(); // 삭제 선택
//     cy.get('.btn-danger').click(); // 삭제 선택
//     cy.wait(3000);
//     }
//   });
// });