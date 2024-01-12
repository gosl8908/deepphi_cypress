function countPlotCreate(module) {

        /* 모듈 선택 */
        cy.contains(module).click();
        cy.contains('시각화').click();
        cy.get('.visualization__item--creat-info > div > .btn').click();

        /* 빈도그래프 */
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get('.mb15 > .label-form > .input-form').type('x축');
        cy.get('.mb20 > .label-form > .input-form').type('y축');
        cy.get('.ui-dropdown-trigger').click();
        cy.get(':nth-child(1) > .ui-dropdown-item').click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.wait(3*1000);
        cy.get('jhi-record-visualization-graph', {timeout : 60*1000}).should('be.visible');
        // cy.screenshot('빈도그래프');

        cy.get('.modeler-bottom__content').then(btn => {
          const loading = btn.text().includes('계속하시겠습니까?');
          if (loading) {
              cy.get('.visualization-item__screen--control > .btn').click();
          }
      });

        /* 삭제 */
        cy.wait(3*1000);
        cy.get('.visualization__item--control > div.ng-star-inserted > :nth-child(2)').eq(0).click();
        cy.get('.btn-danger').click();
        cy.wait(3*1000)
      }
function histogramCreate(module) {

        /* 모듈 선택 */
        cy.contains(module).click();
        cy.contains('시각화').click();
        cy.get('.visualization__item--creat-info > div > .btn').click();

        /* 히스토그램 */
        cy.get('dd > .input-form').select('HISTOGRAM');
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get('.mb15 > .label-form > .input-form').type('x축');
        cy.get('.mb20 > .label-form > .input-form').type('y축');
        cy.get('.ui-dropdown-trigger').click()
        cy.get(':nth-child(3) > .ui-dropdown-item').click();
        cy.get(':nth-child(3) > dd > .input-form').type('100')
        cy.get('.modal-button-content > .btn-primary').click();
        cy.wait(3*1000)
        cy.get('jhi-record-visualization-graph', {timeout : 60*1000}).should('be.visible');
        // cy.screenshot('히스토그램');

        cy.get('.modeler-bottom__content').then(btn => {
          const loading = btn.text().includes('계속하시겠습니까?');
          if (loading) {
              cy.get('.visualization-item__screen--control > .btn').click();
          }
      });

        /* 삭제 */
        cy.wait(3*1000);
        cy.get('.visualization__item--control > div.ng-star-inserted > :nth-child(2)').eq(0).click();
        cy.get('.btn-danger').click();
        cy.wait(3*1000)
      }

function scatterplotCreate(module) {

        /* 모듈 선택 */
        cy.contains(module).click();
        cy.contains('시각화').click();
        cy.get('.visualization__item--creat-info > div > .btn').click();

        /* 산점도 */
        cy.get('dd > .input-form').select('SCATTERPLOT');
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get('.mb15 > .label-form > .input-form').type('x축');
        cy.get('.mb20 > .label-form > .input-form').type('y축');
        cy.get(':nth-child(2) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(2) > .ui-dropdown-item').click();
        cy.get(':nth-child(3) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(2) > .ui-dropdown-item').click();
        cy.get(':nth-child(4) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(1) > .ui-dropdown-item').click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.wait(3*1000)
        cy.get('jhi-record-visualization-graph', {timeout : 60*1000}).should('be.visible');
        // cy.screenshot('산점도');

        cy.get('.modeler-bottom__content').then(btn => {
          const loading = btn.text().includes('계속하시겠습니까?');
          if (loading) {
              cy.get('.visualization-item__screen--control > .btn').click();
          }
      });

        /* 삭제 */
        cy.wait(3*1000);
        cy.get('.visualization__item--control > div.ng-star-inserted > :nth-child(2)').eq(0).click();
        cy.get('.btn-danger').click();
        cy.wait(3*1000)
      }

function densityplotCreate(module) {

        /* 모듈 선택 */
        cy.contains(module).click();
        cy.contains('시각화').click();
        cy.get('.visualization__item--creat-info > div > .btn').click();

        /* 밀도분포 */
        cy.get('dd > .input-form').select('DENSITYPLOT');
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get('.mb15 > .label-form > .input-form').type('x축');
        cy.get('.mb20 > .label-form > .input-form').type('y축');
        cy.get(':nth-child(2) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(2) > .ui-dropdown-item').click();
        cy.get(':nth-child(3) > dd > .input-form').type('100');
        cy.get(':nth-child(4) > dd > .input-form').type('1');
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get('jhi-record-visualization-graph', {timeout : 60*1000}).should('be.visible');
        // cy.screenshot('밀도분포');

        cy.get('.modeler-bottom__content').then(btn => {
          const loading = btn.text().includes('계속하시겠습니까?');
          if (loading) {
              cy.get('.visualization-item__screen--control > .btn').click();
          }
      });

        /* 삭제 */
        cy.wait(3*1000);
        cy.get('.visualization__item--control > div.ng-star-inserted > :nth-child(2)').eq(0).click();
        cy.get('.btn-danger').click();
        cy.wait(3*1000)
      }

function heatmapCreate(module) {

        /* 모듈 선택 */
        cy.contains(module).click();
        cy.contains('시각화').click();
        cy.get('.visualization__item--creat-info > div > .btn').click();

        /* 히트맵 */
        cy.get('dd > .input-form').select('HEATMAP');
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get('.mb15 > .label-form > .input-form').type('x축');
        cy.get('.mb20 > .label-form > .input-form').type('y축');
        cy.get(':nth-child(2) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(1) > .ui-dropdown-item').click();
        cy.get(':nth-child(3) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(2) > .ui-dropdown-item').click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get('jhi-record-visualization-graph', {timeout : 60*1000}).should('be.visible');
        // cy.screenshot('히트맵');

        cy.get('.modeler-bottom__content').then(btn => {
          const loading = btn.text().includes('계속하시겠습니까?');
          if (loading) {
              cy.get('.visualization-item__screen--control > .btn').click();
          }
      });

        /* 삭제 */
        cy.wait(3*1000);
        cy.get('.visualization__item--control > div.ng-star-inserted > :nth-child(2)').eq(0).click();
        cy.get('.btn-danger').click();
        cy.wait(3*1000)
      }

function boxplotCreate(module) {

        /* 모듈 선택 */
        cy.contains(module).click();
        cy.contains('시각화').click();
        cy.get('.visualization__item--creat-info > div > .btn').click();

        /* 상자 수염 그림 */
        cy.get('dd > .input-form').select('BOXPLOT');
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get('.mb15 > .label-form > .input-form').type('x축');
        cy.get('.mb20 > .label-form > .input-form').type('y축');
        cy.get(':nth-child(2) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(1) > .ui-dropdown-item').click();
        cy.get(':nth-child(3) > dd > .input-form > .ui-dropdown').click();
        cy.get(':nth-child(1) > .ui-dropdown-item').click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get('jhi-record-visualization-graph', {timeout : 60*1000}).should('be.visible');
        // cy.screenshot('상자 수염 그림');

        cy.get('.modeler-bottom__content').then(btn => {
          const loading = btn.text().includes('계속하시겠습니까?');
          if (loading) {
              cy.get('.visualization-item__screen--control > .btn').click();
          }
      });

        /* 삭제 */
        cy.wait(3*1000);
        cy.get('.visualization__item--control > div.ng-star-inserted > :nth-child(2)').eq(0).click();
        cy.get('.btn-danger').click();
        cy.wait(3*1000)
      }

module.exports = {
  countPlotCreate: countPlotCreate,
  histogramCreate: histogramCreate,
  scatterplotCreate: scatterplotCreate,
  densityplotCreate: densityplotCreate,
  heatmapCreate: heatmapCreate,
  boxplotCreate: boxplotCreate,
};