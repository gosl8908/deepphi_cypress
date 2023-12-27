function recordDataset(DateLabel) {
  cy.log('레코드 데이터셋 업로드 성공');

  /* 레코드 데이터셋 업로드 */
  cy.contains('레코드 데이터셋').click(); // 레코드 데이터셋
  cy.wait(5000);
  cy.contains('데이터셋 업로드').click(); // 데이터셋 업로드 화면 진입
  cy.wait(3000);

  /* 데이터셋 정보 입력 */
  cy.get('#dataset_name').type('RecordDataset' + DateLabel); // 데이터셋 이름 입력
  cy.get('.note-editable').type(DateLabel); // 데이터셋 내용 입력
  cy.get('.page-button > .btn').click(); // 다음

  /* 파일 업로드 */
  cy.fixture('record/자동화용 데이터셋.csv').then(fileContent => {
      cy.get('input[accept=".csv"][type="file"]').eq(0).attachFile({
          // 학습 데이터셋
          fileContent,
          filePath: 'fixtures/record/자동화용 데이터셋.csv',
          fileName: '자동화용 데이터셋.csv',
          mimeType: 'text/csv',
      });
      cy.get('input[accept=".csv"][type="file"]').eq(1).attachFile({
          // 검증 데이터셋
          fileContent,
          filePath: 'fixtures/record/자동화용 데이터셋.csv',
          fileName: '자동화용 데이터셋.csv',
          mimeType: 'text/csv',
      });
      cy.get('input[accept=".csv"][type="file"]').eq(2).attachFile({
          // 평가 데이터셋
          fileContent,
          filePath: 'fixtures/record/자동화용 데이터셋.csv',
          fileName: '자동화용 데이터셋.csv',
          mimeType: 'text/csv',
      });
  });
  cy.wait(3000);

  /* 업로드 */
  cy.get('em').click(); // 자동탐지 체크
  cy.get('.btn-primary').click(); // 다음
  cy.wait(5000);
  cy.contains('업로드중 중에는 진입이 불가능합니다', { timeout: 160000 }).should('not.exist');

  /*  데이터셋 설정 */
  cy.get(':nth-child(1) > .dashboard-card__item--body > .title').click({
      force: true,
  }); // 데이터셋 매니지먼트 접속
  cy.wait(3000);
  cy.contains('삭제', { timeout: 10000 });
  cy.get('.fa-solid.fa-check', { timeout: 10000 }).eq(1).click({ force: true });
  cy.contains('샘플데이터', { timeout: 60000 }).should('be.visible');

  /* 데이터셋 화면 나가기 */
  cy.get('.btn-home').click();
  cy.wait(5000);
}

module.exports = {
  recordDataset: recordDataset,
};
