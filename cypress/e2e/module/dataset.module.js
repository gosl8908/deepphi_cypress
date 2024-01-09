function settingDataset(labelType, content) {
  // 첫번째 데이터셋 선택
  cy.log('첫번째 데이터셋 선택');
  cy.get(':nth-child(1) > .dashboard-card__item--body > .title').click();

  // 타입별 기다리는 시간 조정 => 이후 오류시 일정 시간으로 통일 및 조정 필요
  if (labelType == 2) {
    cy.wait(40000);
  } else if (labelType == 3) {
    cy.wait(60000);
  } else {
    cy.wait(30000);
  }

  // 다시 보지 않기 클릭
  cy.get('#DontShowItAgain').check();
  // cy.get('.checkbox').click();
  cy.get('.text-center > .btn').click();
  cy.get('#convert-btn').click();
  cy.get(':nth-child(2) > .list-dropdown > .ng-star-inserted > button').click();
  cy.wait(500);
  // 분류 레이블 입력
  if (labelType == 2) {
    if (content.includes('3D') && content.includes('Case1')) {
      cy.get(':nth-child(2) > .text-left').type('1');
      cy.get(':nth-child(3) > .text-left').type('2');
      cy.get(':nth-child(4) > .text-left').type('3');
      cy.get(':nth-child(5) > .text-left').type('4');
      cy.get(':nth-child(6) > .text-left').type('5');
      cy.get(':nth-child(7) > .text-left').type('6');
    } else {
      cy.get('.text-left > .input-form').type('1');
    }
    // 레이블 입력 팝업 닫기
    cy.get('.modal-button-content > .btn-primary').click();
  }
  cy.get('header.clear-box > .default-tab > ul > :nth-child(2) > button').click();
  cy.wait(30000);
  cy.get('#btn-edit-usage').click();
  cy.get('.right-content > :nth-child(1) > .list-dropdown > :nth-child(1) > button').click();
  cy.get('.modal-button-content > .btn-primary').click();
  cy.contains('학습');
  cy.contains('검증');
  cy.get('#include-btn').click();
  cy.get(':nth-child(2) > .list-dropdown > .ng-star-inserted > button').click();
  cy.get('.modal-button-content > .btn-primary').click();
  cy.get('.dataset-management__lnb--content > :nth-child(1) > button.ng-tns-c0-0').click();
  cy.get('.right-content > .btn').click();
  const modifiedContent = content.replace(/:/g, '') + 'c';
  cy.get('#module_name').type(modifiedContent);
  cy.get('.modal-button-content > .btn-primary').click();
  cy.wait(1000);
  cy.contains(modifiedContent);
  cy.get('#dataset-menu-btn').click();
  cy.get('.list-dropdown > li.ng-tns-c0-0 > .ng-tns-c0-0').click();
  cy.contains('삭제');
  cy.get('.btn-danger').click();
  cy.wait(10000);
  cy.contains('데이터를 업로드하여 연구용 데이터셋을 만들 수 있습니다.');
}

module.exports = {
  setDataset: settingDataset,
};
