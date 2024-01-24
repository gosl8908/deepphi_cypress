function login(Site, Id, Password) {
    cy.visit(Site);

    if (Site === Cypress.env('Prod')) {
        cy.get('.support__gnb-container > .support__gnb--user > ul > .ng-star-inserted:nth-child(4) > a', {
            timeout: 30000,
        }).click({ force: true });
    }
    cy.get('#username').type(Id); // 이메일 입력
    cy.get('#password').type(Password); // 비밀번호 입력
    cy.get('#kc-login').click();
    cy.wait(3000);
}
module.exports = {
    login: login,
};
