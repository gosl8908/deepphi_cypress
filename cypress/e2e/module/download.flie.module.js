function recordDownloadFlie() {
 
    /* 레코드 */
    cy.visit('https://modeler.deepphi.ai/modeler/39468');
    cy.get('.flow__module--name').contains('자동화 데이터셋').click();
    cy.get('[placement="bottom"]').click();
    cy.get('.btn-primary').click();
    cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 데이터셋 데이터
    cy.contains('Data Cleansing').click();
    cy.get('[placement="bottom"]').click();
    cy.get('.btn-primary').click();
    cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 프로세싱 데이터
    cy.contains('DNN-Classification').click();
    cy.get('[placement="bottom"]').click();
    cy.get('.btn-primary').click();
    cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 데이터
    cy.get('.tab-item--record-result > button').click();
    cy.get('.bottom__head--control > :nth-child(1)').click();
    cy.get('.btn-primary').click();
    cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 결과

    /* 레코드 평가 */
    cy.get('.nav-project-left > ul > :nth-child(2) > button').click();
    cy.get('.clear-both > .btn').click();
    cy.get('.btn-primary').click();
    cy.wait(3000);
    cy.get('.flow__module--name').contains('자동화 데이터셋').click();
    cy.get('[placement="bottom"]').click();
    cy.get('.btn-primary').click();
    cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 데이터셋 데이터
    cy.contains('Data Cleansing').click();
    cy.get('[placement="bottom"]').click();
    cy.get('.btn-primary').click();
    cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 프로세싱 데이터
    cy.get('.flow__module--name').contains('DNN-Classification').click();
    cy.get('[placement="bottom"]').click();
    cy.get('.btn-primary').click();
    cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 데이터
    cy.get('.tab-item--record-result > button').click();
    cy.get('.bottom__head--control > :nth-child(1)').click();
    cy.get('.btn-primary').click();
    cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 결과
    cy.get('#site-map__flow-btn').click();
    cy.get('#project-menu-ul > :nth-child(1) > button').click();

    /* 레코드 다운로드 확인 */
    cy.visit(`${Cypress.env('Prod')}my-page/files`);
    cy.get('.cpx-180').select('엑셀 데이터');
    cy.get('.search-box > .input-form').type('DNN-Classification');
    cy.get('.search-box > .btn-primary').click();
    cy.contains(/DNN-Classification.*DNN-Classification.*DNN-Classification.*DNN-Classification/); // AI 데이터, AI 결과 / 평가 AI 데이터, AI 결과
    cy.get('.search-box > .input-form').clear().type('자동화 데이터셋');
    cy.get('.search-box > .btn-primary').click();
    cy.contains(/자동화 데이터셋.*자동화 데이터셋/); // 데이터셋 데이터 / 평가 데이터셋 데이터
    cy.get('.search-box > .input-form').clear().type('Data Cleansing');
    cy.get('.search-box > .btn-primary').click();
    cy.contains(/Data Cleansing.*Data Cleansing/); // 프로세싱 데이터 / 평가 프로세싱 데이터
}

function imageDownloadFlie() {
  /* 이미지 */
  cy.visit('https://modeler.deepphi.ai/modeler/39465');
  cy.get('.list-dropdown-wrap > .btn').click();
  cy.get('.list-dropdown > .ng-star-inserted > button').click();
  cy.get('.btn-primary').click();
  cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 학습 소스 코드
  cy.contains('자동화 데이터셋_2D_CL').click();
  cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
  cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
  cy.get('.btn-primary').click();
  cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 데이터셋 이미지
  cy.contains('Resize').click();
  cy.get('.bottom__head--control > :nth-child(1)').click();
  cy.get('.btn-primary').click();
  cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 프로세싱 파일
  cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
  cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
  cy.get('.btn-primary').click();
  cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 프로세싱 이미지
  cy.contains('DensNet121').click();
  cy.get('.bottom__head--control > :nth-child(1)').click();
  cy.get('.btn-primary').click();
  cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 파일
  cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
  cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
  cy.get('.btn-primary').click();
  cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 이미지
  cy.get('.tab-item--result > button').click();
  cy.get('.bottom__head--control > :nth-child(2)').click();
  cy.get('.btn-primary').click();
  cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 결과

  /* 이미지 평가 */
  cy.get('.nav-project-left > ul > :nth-child(2) > button').click();
  cy.get('.clear-both > .btn').click();
  cy.get('.btn-primary').click();
  cy.wait(3000);
  cy.get(
      '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .btn > .fas',
  ).click();
  cy.contains('인퍼런스').click();
  cy.get('.modal-button-content > .btn').click();
  cy.get('.btn-primary').click();
  cy.get('#appName').type('IntelTestCode');
  cy.get('.btn-primary').click();
  cy.contains('바로가기', { timeout: 30000 }).should('be.visible'); // 인텔 인퍼런스 소스 코드
  cy.get('.btn-primary').click();
  cy.get(
      '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .btn > .fas',
  ).click();
  cy.contains('인퍼런스').click();
  cy.get('.modal-button-content > .btn').click();
  cy.get('#fileType').select('Inference App_Tensorflow');
  cy.get('.btn-primary').click();
  cy.get('#appName').type('TensorTestCode');
  cy.get('.btn-primary').click();
  cy.contains('바로가기', { timeout: 30000 }).should('be.visible'); // 텐서 인퍼런스 소스 코드
  cy.get('.btn-primary').click();
  cy.contains('자동화 데이터셋_2D_CL').click();
  cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
  cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
  cy.get('.btn-primary').click();
  cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 데이터셋 이미지
  cy.contains('Resize').click();
  cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
  cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
  cy.get('.btn-primary').click();
  cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 프로세싱 이미지
  cy.get('.bottom__head--control > :nth-child(1)').click();
  cy.get('.btn-primary').click();
  cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 프로세싱 파일
  cy.get('.flow__module--name').contains('DensNet121').click();
  cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
  cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
  cy.get('.btn-primary').click();
  cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 이미지
  cy.get('.bottom__head--control > :nth-child(1)').click();
  cy.get('.btn-primary').click();
  cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 파일
  cy.get('.tab-item--result > button').click();
  cy.get('.bottom__head--control > :nth-child(2)').click();
  cy.get('.btn-primary').click();
  cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 결과

/* 이미지 다운로드 확인 */
  cy.visit(`${Cypress.env('Prod')}my-page/files`);
  cy.get('.cpx-180').select('이미지 데이터');
  cy.get('.search-box > .input-form').type('자동화 데이터셋_2D_CL');
  cy.get('.search-box > .btn-primary').click();
  cy.contains(/자동화 데이터셋_2D_CL.*자동화 데이터셋_2D_CL/); // 데이터셋 이미지 / 데이터셋 이미지 평가
  cy.get('.cpx-180').select('학습 소스 코드');
  cy.get('.search-box > .input-form').clear();
  cy.get('.search-box > .btn-primary').click();
  cy.contains('Train_code'); // 인퍼런스 소스 코드
  cy.get('.cpx-180').select('인퍼런스 소스 코드');
  cy.contains(/IntelTestCode.*TensorTestCode/); // 학습 소스 코드
  cy.get('.cpx-180').select('엑셀 데이터');
  cy.get('.search-box > .input-form').type('Resize');
  cy.get('.search-box > .btn-primary').click();
  cy.contains(/Resize_Files.*Resize_Files/); // 이미지 프로세싱 파일 / 이미지 평가 프로세싱 파일
  cy.get('.search-box > .input-form').clear().type('DensNet121');
  cy.get('.search-box > .btn-primary').click();
  cy.contains(/DensNet121.*DensNet121.*DensNet121.*DensNet121.*DensNet121.*DensNet121/); // AI 이미지, AI 파일, AI 결과 / 평가 AI 이미지, AI 파일, AI 결과
  }

module.exports = {
  recordDownloadFlie: recordDownloadFlie,
  imageDownloadFlie: imageDownloadFlie,
};
