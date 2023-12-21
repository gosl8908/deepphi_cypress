function recorddataset(RecordDatasetName, date_label) {
  cy.log("레코드 데이터셋 업로드 성공");

  /* 레코드 데이터셋 업로드 */
  cy.contains("레코드 데이터셋").click(); // 레코드 데이터셋
  cy.wait(5000);
  cy.contains("데이터셋 업로드").click(); // 데이터셋 업로드 화면 진입
  cy.wait(3000);

  /* 데이터셋 정보 입력 */
  cy.get("#dataset_name").type(RecordDatasetName); // 데이터셋 이름 입력
  cy.get(".note-editable").type(date_label); // 데이터셋 내용 입력
  cy.get(".page-button > .btn").click(); // 다음

  /* 파일 업로드 */
  cy.fixture("Record\\visualize_test_1000.csv").then((fileContent) => {
    cy.get('input[accept=".csv"][type="file"]').eq(0).attachFile({
      // 학습 데이터셋
      fileContent,
      filePath:
        "C:\\my-cypress-project\\cypress\\fixtures\\Record\\visualize_test_1000.csv",
      fileName: "visualize_test_1000.csv",
      mimeType: "text/csv",
    });
    cy.get('input[accept=".csv"][type="file"]').eq(1).attachFile({
      // 검증 데이터셋
      fileContent,
      filePath:
        "C:\\my-cypress-project\\cypress\\fixtures\\Record\\visualize_test_1000.csv",
      fileName: "visualize_test_1000.csv",
      mimeType: "text/csv",
    });
    cy.get('input[accept=".csv"][type="file"]').eq(2).attachFile({
      // 평가 데이터셋
      fileContent,
      filePath:
        "C:\\my-cypress-project\\cypress\\fixtures\\Record\\visualize_test_1000.csv",
      fileName: "visualize_test_1000.csv",
      mimeType: "text/csv",
    });
  });
  cy.wait(3000);

  /* 업로드 */
  cy.get("em").click(); // 자동탐지 체크
  cy.get(".btn-primary").click(); // 다음
  cy.contains("업로드중 중에는 진입이 불가능합니다."); // 업로드 로딩 체크
  cy.wait(150000);

  /*  데이터셋 설정 */
  cy.get(":nth-child(1) > .dashboard-card__item--body > .title").click({
    force: true,
  }); // 데이터셋 매니지먼트 접속
  cy.wait(3000);
  cy.contains("삭제");
  cy.get(".fa-solid.fa-check").eq(1).click({ force: true });
  cy.wait(20000); // 20초 대기
  cy.contains("샘플데이터"); // 업로드 정상 체크

  /* 데이터셋 화면 나가기 */
  cy.get(".btn-home").click();
  cy.wait(5000);
}

module.exports = {
  recorddataset: recorddataset,
};
