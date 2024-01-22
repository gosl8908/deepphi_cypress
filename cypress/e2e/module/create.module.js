function createImageDataset(dimension, labelType, structure, filename, title, detail = title) {
  // Create Dataset 클릭
  cy.contains('데이터셋 업로드').click({force:true}); // 데이터셋 업로드 화면 진입
  cy.wait(5000);
  // Dataset title 입력
  cy.get('#dataset_name').type(title);
  // Dataset Detail 입력
  cy.get('.note-editable').type(detail);

  // 1단계 Next 버튼 선택
  cy.get('.ng-dirty > .create-dataset > .step-content-box > .page-button > .btn').click();

  // Dimension 선택
  cy.contains(dimension).click();

  // LabelType 선택
  cy.get('.mb10:nth-child(' + labelType + ') > .ng-star-inserted > div > label > span').click();
  // structure 선택
  cy.get(':nth-child(' + structure + ') > .folder-structure-content > .folder-structure-content__header').click();

  // cy.get('.folder-structure-item:nth-child(1) > .folder-structure-content > dl > dt > img').click();
  // 2단계 Next 버튼 선택
  cy.get('.ng-untouched > .create-dataset > .step-content-box > .page-button > .btn-primary').click();

  // 타입별 데이터셋 파일 첨부
  if (labelType == 1) {
    if (structure == 1) {
      // Dataset 파일 첨부
      cy.get('input[accept=".zip"][type="file"]').attachFile({
        // fileContent,
        filePath: 'image/' + filename + '/Dataset.zip',
        fileName: 'Dataset.zip',
        mimeType: 'application/zip',
      });
    } else {
      // Dataset 파일 첨부
      cy.get('input[accept=".zip"][type="file"]').attachFile({
        // fileContent,
        filePath: 'image/' + filename + '/Dataset.zip',
        fileName: 'Dataset.zip',
        mimeType: 'application/zip',
      });

      // Label 파일 첨부
      cy.get('.mb20 > .file-input > .input-wrap > input[accept=".csv"][type="file"]').attachFile({
        // fileContent,
        filePath: 'image/' + filename + '/Label.csv',
        fileName: 'Label.csv',
        mimeType: 'application/csv',
      });
    }
  } else {
    // Dataset 파일 첨부
    cy.get('input[accept=".zip"][type="file"]').attachFile({
      // fileContent,
      filePath: 'image/' + filename + '/Dataset.zip',
      fileName: 'Dataset.zip',
      mimeType: 'application/zip',
    });

    // Label 파일 첨부
    cy.get('.mb20 > .file-input > .input-wrap > input[accept=".zip"][type="file"]').attachFile({
      // fileContent,
      filePath: 'image/' + filename + '/Label.csv',
      fileName: 'Label.zip',
      mimeType: 'application/zip',
    });
  }

  // Upload 버튼 클릭
  cy.get('[style=""] > .step-content-box > .page-button > .btn-primary').click();

  // Dataset 업로드 확인
  cy.contains('성공', {timeout : 30*1000}).should('be.visible')
  cy.contains('압축 해제 중', {timeout : 30*1000}).should('be.visible')
  cy.contains('검증 진행 중', {timeout : 30*1000}).should('be.visible')
  cy.contains('설정을 완료하세요', {timeout : 30*1000}).should('be.visible')
}

function createImageProject(title, detail = title) {
  cy.get('#createBtn').click(); // 프로젝트 생성 버튼 클릭
  cy.get(':nth-child(1) > .create-select-item__container > .create-select-item__content').click(); // Image 선택
  cy.get('.modal-button-content > .btn').click(); // 다음 버튼 클릭
  cy.wait(3*1000);
  cy.get('#project_name').type(title); // 프로젝트 타이틀 입력
  cy.get('.note-editable').type(detail); // 프로젝트 Detail 입력
  cy.get('.modal-button-content > .btn-primary').click(); // 프로젝트 생성 버튼 클릭
}

function createRecordDataset(trainfilename, testfilename, validationfilename, title, detail = title) {
  // Create Dataset 클릭
  cy.contains('데이터셋 업로드').click({force:true}); // 데이터셋 업로드 화면 진입
  cy.wait(5000);
  // Dataset title 입력
  cy.get('#dataset_name').type(title);
  // Dataset Detail 입력
  cy.get('.note-editable').type(detail);
  // 1단계 Next 버튼 선택
  cy.get('.page-button > .btn').click();

        // Dataset 파일 첨부
        cy.get('input[accept=".csv"][type="file"]').eq(0).attachFile({
          // fileContent,
          filePath: 'record/' + trainfilename,
          fileName: trainfilename,
          mimeType: 'text/csv',
        });
        cy.get('input[accept=".csv"][type="file"]').eq(1).attachFile({
          // fileContent,
          filePath: 'record/' + testfilename,
          fileName: testfilename,
          mimeType: 'text/csv',
        });
        cy.get('input[accept=".csv"][type="file"]').eq(2).attachFile({
          // fileContent,
          filePath: 'record/' + validationfilename,
          fileName: validationfilename,
          mimeType: 'text/csv',
        });

  cy.get('em').click(); // 자동탐지 체크

  // 2단계 Next 버튼 선택
  cy.get('.btn-primary').click();

  // Dataset 업로드 확인
  cy.wait(5000);
  cy.contains('업로드중 중에는 진입이 불가능합니다', { timeout: 160*1000 }).should('not.exist');
}

function createRecordProject(title, detail = title) {
  cy.get('#createBtn').click(); // 프로젝트 생성 버튼 클릭
  cy.get(':nth-child(2) > .create-select-item__container > .create-select-item__content').click(); // Record 선택
  cy.get('.modal-button-content > .btn').click(); // 다음 버튼 클릭
  cy.wait(3*1000);
  cy.get('#project_name').type(title); // 프로젝트 타이틀 입력
  cy.get('.note-editable').type(detail); // 프로젝트 Detail 입력
  cy.get('.modal-button-content > .btn-primary').click(); // 프로젝트 생성 버튼 클릭
}

function createTestProject(name) {

  /* 프로젝트 검색 */
  cy.get('.search-box > .input-form').type(name);
  cy.get('.search-box > .btn-primary').click();
  cy.wait(3000);
  cy.get('.title').click();
  cy.wait(5000);

  // 평가 프로젝트 생성
  cy.get('.modeler__nav > ul > :nth-child(2) > button').click(); // 평가 프로젝트 탭
  cy.wait(3000);
  cy.get('.btn-floating > div').click({ force: true }); // 생성
  cy.wait(3000);
  cy.get('.modal-button-content > .btn').click(); // 다음
  cy.wait(1000);
  cy.get('.btn-primary').click(); // 다음
  cy.wait(1000);
  cy.get('.btn-primary').click(); // 확인
  cy.wait(5000);
}
module.exports = {
  createImageProject: createImageProject,
  createTestProject: createTestProject,
  createImageDataset: createImageDataset,
  createRecordProject: createRecordProject,
  createRecordDataset: createRecordDataset,
};
