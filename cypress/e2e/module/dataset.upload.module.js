function recordDataset(DateLabel) {
  cy.log('레코드 데이터셋 업로드');

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
          filePath: 'record/자동화용 데이터셋.csv',
          fileName: '자동화용 데이터셋.csv',
          mimeType: 'text/csv',
      });
      cy.get('input[accept=".csv"][type="file"]').eq(1).attachFile({
          // 검증 데이터셋
          fileContent,
          filePath: 'record/자동화용 데이터셋.csv',
          fileName: '자동화용 데이터셋.csv',
          mimeType: 'text/csv',
      });
      cy.get('input[accept=".csv"][type="file"]').eq(2).attachFile({
          // 평가 데이터셋
          fileContent,
          filePath: 'record/자동화용 데이터셋.csv',
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

function imageDataset(DateLabel) {
    cy.log('이미지 데이터셋 업로드');
  
    /* 데이터셋 업로드 */
    cy.contains('이미지 데이터셋').click(); // 이미지 데이터셋
    cy.wait(5000);
    cy.contains('데이터셋 업로드').click(); // 데이터셋 업로드 화면 진입
    cy.wait(3000);
  
    /* 데이터셋 정보 입력 */
    cy.get('#dataset_name').type('ImageDataset' + DateLabel); // 데이터셋 이름 입력
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
            filePath:
                'image/2D_CL_Case1/Garbage Classification (2D Classification Case1).zip',
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
    cy.contains('데이터셋 바로가기', { timeout: 60000 }).should('be.visible').click();
    cy.wait(10000);
    cy.contains('파일이 성공적으로 업로드되었습니다', { timeout: 60000 }).should('be.visible');
    cy.get('#DontShowItAgain').click({ force: true }); // 팝업 다시 보지 않기
    cy.get('.text-center > .btn').click(); // 팝업 닫기
    cy.wait(30000);
  
    /* 변환 */
    cy.contains('성공')
    cy.get('#convert-btn').click(); // 변환
    cy.get(':nth-child(2) > .list-dropdown > .ng-star-inserted > button').click({
        force: true,
    }); // 검색된 모든 파일
    cy.wait(30000);
  
    /* 사용 용도 수정 */
    cy.contains('변환된 파일');
    cy.get('.default-tab > ul > :nth-child(2) > button').click({ force: true }); // 변화된 파일 탭
    cy.wait(10000);
    cy.contains('사용 용도 수정');
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
  recordDataset: recordDataset,
  imageDataset: imageDataset,
};
