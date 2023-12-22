function imageDataset(ImageDatasetName, DateLabel) {
  cy.log('이미지 데이터셋 업로드 성공');

  /* 데이터셋 업로드 */
  cy.contains('이미지 데이터셋').click(); // 이미지 데이터셋
  cy.wait(5000);
  cy.contains('데이터셋 업로드').click(); // 데이터셋 업로드 화면 진입
  cy.wait(3000);

  /* 데이터셋 정보 입력 */
  cy.get('#dataset_name').type(ImageDatasetName); // 데이터셋 이름 입력
  cy.get('.note-editable').type(DateLabel); // 데이터셋 내용 입력
  cy.get('form.ng-dirty > .create-dataset > .step-content-box > .page-button > .btn').click(); // 다음
  cy.get(':nth-child(1) > dd > ul > :nth-child(1) > .radio-graphic > div > label > em').click(); // 2D 이미지 데이터 선택
  cy.get(':nth-child(2) > dd > ul > :nth-child(1) > .radio-graphic > div > label > em').click(); // 분류 선택
  cy.get(':nth-child(1) > .folder-structure-content > .folder-structure-content__header').click(); // 유형 1 선택
  cy.get('form.ng-untouched > .create-dataset > .step-content-box > .page-button > .btn-primary').click({
      force: true,
  }); // 다음
  cy.wait(3000);

  /* 파일 업로드 */
  cy.fixture('image/2D_CL_Case1/Garbage Classification (2D Classification Case1).zip').then(fileContent => {
      cy.get('input[accept=".zip"][type="file"]').attachFile({
          fileContent,
          filePath:
              'fixtures/image/2D_CL_Case1/Garbage Classification (2D Classification Case1).zip',
          fileName: 'Garbage Classification (2D Classification Case1).zip',
          mimeType: 'application/zip',
      });
  });
  cy.wait(3000);

  /* 업로드 */
  cy.get('[style=""] > .step-content-box > .page-button > .btn-primary').click({
      force: true,
  });
  cy.wait(3000);
  cy.contains('성공'); // 업로드 확인

  /* 데이터셋 매니지먼트 화면 진입 */
  cy.log('첫번째 데이터셋 선택');
  cy.wait(10000);
  cy.get(':nth-child(1) > .dashboard-card__item--body > .title').click(); // 1번째 데이터셋 선택
  cy.wait(5000);
  cy.get('#DontShowItAgain').click({ force: true }); // 팝업 다시 보지 않기
  cy.get('.text-center > .btn').click(); // 팝업 닫기
  cy.wait(30000);

  /* 변환 */
  cy.get('#convert-btn').click(); // 변환
  cy.get(':nth-child(2) > .list-dropdown > .ng-star-inserted > button').click({
      force: true,
  }); // 검색된 모든 파일
  cy.wait(60000);
  cy.get('.default-tab > ul > :nth-child(2) > button').click({ force: true }); // 변화된 파일 탭
  cy.contains('사용 용도 수정');
  cy.wait(5000);

  /* 사용 용도 수정 */
  cy.get('#btn-edit-usage').click(); // 사용 용도 수정
  cy.get('.right-content > :nth-child(1) > .list-dropdown > :nth-child(1) > button').click(); // 검색된 모든 파일
  cy.get('.modal-button-content > .btn-primary').click(); // 저장
  cy.wait(5000);
  cy.contains(/학습.*검증/); // 사용 용도 확인

  /* 데이터셋에 파일 포함 */
  cy.get('#include-btn').click(); // 데이터셋에 파일 포함
  cy.get(':nth-child(2) > .list-dropdown > .ng-star-inserted > button').click(); // 검색된 모든 파일
  cy.get('.modal-button-content > .btn-primary').click(); // 계속
  cy.wait(5000);

  /* 데이터셋 화면 나가기 */
  cy.get('.btn-home').click();
  cy.wait(5000);
}

module.exports = {
  imageDataset: imageDataset,
};