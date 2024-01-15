function visualizationCreate(module, type) {
  /* 모듈 선택 */
  cy.contains(module).click();
  cy.contains('시각화').click();
  cy.get('.visualization__item--creat-info > div > .btn').click();

  cy.get('dd > .input-form').select(type);
  cy.get('.modal-button-content > .btn-primary').click();
  cy.get('.mb15 > .label-form > .input-form').type('x축');
  cy.get('.mb20 > .label-form > .input-form').type('y축');

  switch (type) {
      case '빈도 그래프(Count Plot)':
          cy.get('.ui-dropdown-trigger').click();
          cy.get(':nth-child(1) > .ui-dropdown-item').click();
          break;
      case '히스토그램(Histogram)':
          cy.get('.ui-dropdown-trigger').click();
          cy.get(':nth-child(3) > .ui-dropdown-item').click();
          cy.get(':nth-child(3) > dd > .input-form').type('100');
          break;
      case '산점도(Scatter Plot)':
          cy.get(':nth-child(2) > dd > .input-form > .ui-dropdown').click();
          cy.get(':nth-child(2) > .ui-dropdown-item').click();
          cy.get(':nth-child(3) > dd > .input-form > .ui-dropdown').click();
          cy.get(':nth-child(2) > .ui-dropdown-item').click();
          cy.get(':nth-child(4) > dd > .input-form > .ui-dropdown').click();
          cy.get(':nth-child(1) > .ui-dropdown-item').click();
          break;
      case '밀도분포(Density Plot)':
          cy.get(':nth-child(2) > dd > .input-form > .ui-dropdown').click();
          cy.get(':nth-child(2) > .ui-dropdown-item').click();
          cy.get(':nth-child(3) > dd > .input-form').type('100');
          cy.get(':nth-child(4) > dd > .input-form').type('1');
          break;
      case '히트맵(Heat Map)':
          cy.get(':nth-child(2) > dd > .input-form > .ui-dropdown').click();
          cy.get(':nth-child(1) > .ui-dropdown-item').click();
          cy.get(':nth-child(3) > dd > .input-form > .ui-dropdown').click();
          cy.get(':nth-child(2) > .ui-dropdown-item').click();
          break;
      case '상자 수염 그림(Box Plot)':
          cy.get(':nth-child(2) > dd > .input-form > .ui-dropdown').click();
          cy.get(':nth-child(1) > .ui-dropdown-item').click();
          cy.get(':nth-child(3) > dd > .input-form > .ui-dropdown').click();
          cy.get(':nth-child(1) > .ui-dropdown-item').click();
          break;
  }

  cy.get('.modal-button-content > .btn-primary').click();
  cy.wait(3 * 1000);
  cy.get('jhi-record-visualization-graph', { timeout: 60 * 1000 }).should('be.visible');

  cy.get('jhi-record-visualization-graph').then(btn => {
      const loading = btn.text().includes('계속하시겠습니까?');
      if (loading) {
          cy.get('.visualization-item__screen--control > .btn').click();
      }
  });

  /* 삭제 */
  cy.wait(3 * 1000);
  cy.get('.visualization__item--control > div.ng-star-inserted > :nth-child(2)').eq(0).click();
  cy.get('.btn-danger').click();
  cy.wait(3 * 1000);
}

module.exports = {
  visualizationCreate: visualizationCreate,
};
