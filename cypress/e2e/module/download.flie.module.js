function downloadFlie() {
    /* 모듈 선택 */
    cy.contains('DNN-Classification').click();
    cy.contains('시각화').click();

        /* 빈도그래프 */
        cy.get('.visualization__item--creat-info > div > .btn').click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get('.ui-dropdown-trigger').click()
        cy.get(':nth-child(1) > .ui-dropdown-item').click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.wait(3*1000)
        cy.get('jhi-record-visualization-graph', {timeout : 60*1000}).should('be.visible');
        // cy.screenshot('빈도그래프');

        /* 삭제 */
        cy.get('.visualization__item--control > div.ng-star-inserted > :nth-child(2)').eq(0).click();
        cy.get('.btn-danger').click();
        cy.wait(3*1000)


        /* 히스토그램 */
        cy.get('.visualization__item--creat-info > div > .btn').click();
        cy.get('dd > .input-form').select('HISTOGRAM');
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get('.ui-dropdown-trigger').click()
        cy.get(':nth-child(3) > .ui-dropdown-item').click();
        cy.get(':nth-child(3) > dd > .input-form').type('100')
        cy.get('.modal-button-content > .btn-primary').click();
        cy.wait(3*1000)
        cy.get('jhi-record-visualization-graph', {timeout : 60*1000}).should('be.visible');
        // cy.screenshot('히스토그램');

        /* 삭제 */
        cy.get('.visualization__item--control > div.ng-star-inserted > :nth-child(2)').eq(0).click();
        cy.get('.btn-danger').click();
        cy.wait(3*1000)

        /* 산점도 */
        cy.get('.visualization__item--creat-info > div > .btn').click();
        cy.get('dd > .input-form').select('SCATTERPLOT');
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get(':nth-child(2) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(2) > .ui-dropdown-item').click();
        cy.get(':nth-child(3) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(2) > .ui-dropdown-item').click();
        cy.get(':nth-child(4) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(1) > .ui-dropdown-item').click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.wait(3*1000)
        cy.get('jhi-record-visualization-graph', {timeout : 60*1000}).should('be.visible');
        cy.get('.visualization-item__screen--control > .btn').click();
        // cy.screenshot('산점도');

        /* 삭제 */
        cy.get('.visualization__item--control > div.ng-star-inserted > :nth-child(2)').eq(0).click();
        cy.get('.btn-danger').click();
        cy.wait(3*1000)

        /* 밀도분포 */
        cy.get('.visualization__item--creat-info > div > .btn').click();
        cy.get('dd > .input-form').select('DENSITYPLOT');
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get(':nth-child(2) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(2) > .ui-dropdown-item').click();
        cy.get(':nth-child(3) > dd > .input-form').type('100');
        cy.get(':nth-child(4) > dd > .input-form').type('1');
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get('jhi-record-visualization-graph', {timeout : 60*1000}).should('be.visible');
        // cy.screenshot('밀도분포');

        /* 삭제 */
        cy.get('.visualization__item--control > div.ng-star-inserted > :nth-child(2)').eq(0).click();
        cy.get('.btn-danger').click();
        cy.wait(3*1000)

        /* 히트맵 */
        cy.get('.visualization__item--creat-info > div > .btn').click();
        cy.get('dd > .input-form').select('HEATMAP');
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get(':nth-child(2) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(1) > .ui-dropdown-item').click();
        cy.get(':nth-child(3) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(2) > .ui-dropdown-item').click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get('jhi-record-visualization-graph', {timeout : 60*1000}).should('be.visible');
        // cy.screenshot('히트맵');

        /* 삭제 */
        cy.get('.visualization__item--control > div.ng-star-inserted > :nth-child(2)').eq(0).click();
        cy.get('.btn-danger').click();
        cy.wait(3*1000)

        /* 상자 수염 그림 */
        cy.get('.visualization__item--creat-info > div > .btn').click();
        cy.get('dd > .input-form').select('BOXPLOT');
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get(':nth-child(2) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(1) > .ui-dropdown-item').click();
        cy.get(':nth-child(3) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(1) > .ui-dropdown-item').click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get('jhi-record-visualization-graph', {timeout : 60*1000}).should('be.visible');
        // cy.screenshot('상자 수염 그림');
}
module.exports = {
  downloadFlie: downloadFlie,
};
