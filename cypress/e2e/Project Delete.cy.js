
describe('Record Project Create', () => {

  before(() => {
    cy.setDateToEnv();
    cy.viewport(1920, 1080); // FHD 해상도 설정
    cy.clearCookies(); // 모든 쿠키 지우기
    
  });

  it('Record Project Create', () => {
    cy.visit(Cypress.env('prod')) 
    cy.contains('로그인').click(); // 로그인 클릭
    cy.get('#username').type(Cypress.env('auto_test_id')); // 이메일 입력
    cy.get('#password').type(Cypress.env('Password')); // 비밀번호 입력
    cy.get('#kc-login').click() // 로그인 선택
    cy.wait(3000);

    
    for (let i = 0; i < 100; i++) { // 반복 100번
    cy.get(':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .btn').click(); // 프로젝트 메뉴 선택
    cy.get(':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .list-dropdown > :nth-child(4) > button').click(); // 삭제 선택
    cy.get('.btn-danger').click(); // 삭제 선택
    cy.wait(3000);
    }
  });
});