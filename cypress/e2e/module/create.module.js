function createImageDataset(dimension, labelType, structure, filename, title, detail = title) {
  // Create Dataset 클릭
  cy.get(
    '.lnb--right-content__container > .ng-star-inserted > .dashboard__default-header > .dashboard__header--control > .btn-primary',
  ).click();
  cy.wait(500);
  // Dataset title 입력
  cy.get('#dataset_name').type(title);
  // Dataset Detail 입력
  cy.get('.note-editable').type(detail);

  // cy.writeFile("Image-Dataset.text", ImageDatasetname);
  cy.writeFile('Image-Dataset.text', title);

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
        filePath: 'Image\\' + filename + '\\Dataset.zip',
        fileName: 'Dataset.zip',
        mimeType: 'application/zip',
      });
    } else {
      // Dataset 파일 첨부
      cy.get('input[accept=".zip"][type="file"]').attachFile({
        // fileContent,
        filePath: 'Image\\' + filename + '\\Dataset.zip',
        fileName: 'Dataset.zip',
        mimeType: 'application/zip',
      });

      // Label 파일 첨부
      cy.get('.mb20 > .file-input > .input-wrap > input[accept=".csv"][type="file"]').attachFile({
        // fileContent,
        filePath: 'Image\\' + filename + '\\Label.csv',
        fileName: 'Label.csv',
        mimeType: 'application/csv',
      });
    }
  } else {
    // Dataset 파일 첨부
    cy.get('input[accept=".zip"][type="file"]').attachFile({
      // fileContent,
      filePath: 'Image\\' + filename + '\\Dataset.zip',
      fileName: 'Dataset.zip',
      mimeType: 'application/zip',
    });

    // Label 파일 첨부
    cy.get('.mb20 > .file-input > .input-wrap > input[accept=".zip"][type="file"]').attachFile({
      // fileContent,
      filePath: 'Image\\' + filename + '\\Label.zip',
      fileName: 'Label.zip',
      mimeType: 'application/zip',
    });
  }

  // Upload 버튼 클릭
  cy.get('[style=""] > .step-content-box > .page-button > .btn-primary').click();

  // Dataset 업로드 확인
  cy.contains('성공');
}

function createImageProject(title, detail = title) {
  cy.get('#createBtn').click(); // 프로젝트 생성 버튼 클릭
  cy.get(':nth-child(1) > .create-select-item__container > .create-select-item__content').click(); // Image 선택
  cy.get('.modal-button-content > .btn').click(); // 다음 버튼 클릭
  cy.get('#project_name').type(title); // 프로젝트 타이틀 입력
  cy.get('.note-editable').type(detail); // 프로젝트 Detail 입력
  cy.get('.modal-button-content > .btn-primary').click(); // 프로젝트 생성 버튼 클릭
}

module.exports = {
  createImageProject: createImageProject,
  createImageDataset: createImageDataset,
};
