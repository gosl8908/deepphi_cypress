function visitAndRun(SiteUrl, Title, Time = 3000) {
    cy.visit(SiteUrl);
    cy.wait(Time);

    cy.log('프로젝트 상태 확인');
    cy.get('.modeler__status')
        .contains('완료')
        .then(project_status => {
            cy.log(project_status);
            //프로젝트 Run
            cy.log('프로젝트 RUN');
            cy.get('.modeler-header__run-action-button > .btn').click();
            cy.wait(3000);

            //초기화 확인버튼 클릭
            cy.get('.btn-primary').click();

            // Running 상태 체크
            cy.log('Running 상태 체크');
            cy.wait(Time);
            cy.get('.modeler__status').contains('실행');
            cy.wait(3000);

            // 스크린샷
            cy.screenshot(Title + Cypress.env('date_label'));
        });
}

function visitAndCheck(SiteUrl, Title, Time = 3000) {
    cy.visit(SiteUrl);
    cy.wait(Time);

    cy.log('프로젝트 상태 확인');
    cy.get('.modeler__status').contains('완료');

    // 스크린샷
    cy.screenshot(Title + Cypress.env('date_label'));
}

module.exports = {
    visitRun: visitAndRun,
    visitCheck: visitAndCheck,
};
