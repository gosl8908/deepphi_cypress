function login(Site, Id, Password) {
    cy.visit(Site, { timeout: 60 * 1000 });

    if (Site === Cypress.env('Prod')) {
        cy.get('.support__gnb-container > .support__gnb--user > ul > .ng-star-inserted:nth-child(4) > a', {
            timeout: 30 * 1000,
        }).click({ force: true });
    }
    cy.get('#username', { timeout: 20 * 1000 }).type(Id); // 이메일 입력
    cy.get('#password', { timeout: 20 * 1000 }).type(Password); // 비밀번호 입력
    cy.get('#kc-login', { timeout: 20 * 1000 }).click();
    cy.wait(3 * 1000);
    cy.log('로그인 성공');
}
module.exports = {
    login: login,
};
