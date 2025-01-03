const { CLASSIFICATION, SEGMENTATION, DETECTION, TRANSFORMATION, CASE1, CASE2, ONPREM } = require('./constant.module');

function settingImageDataset(LabelType, Content, Site = undefined) {
    // 첫번째 데이터셋 선택
    cy.log('첫번째 데이터셋 선택');
    if (Site === ONPREM) {
        cy.get(':nth-child(2) > .dashboard-card > .dashboard-card__name > button').click();
    } else {
        cy.get(':nth-child(1) > .dashboard-card__item--body > .title').click({ timeout: 70000 });
    }

    // 타입별 기다리는 시간 조정 => 이후 오류시 일정 시간으로 통일 및 조정 필요
    if (LabelType == SEGMENTATION) {
        cy.wait(70000);
    } else if (LabelType == DETECTION) {
        cy.wait(90000);
    } else {
        cy.wait(60000);
    }

    // 다시 보지 않기 클릭
    cy.get('#DontShowItAgain').check();
    // cy.get('.checkbox').click();
    cy.get('.text-center > .btn').click();
    cy.get('#convert-btn').click({ timeout: 30000 });
    cy.get(':nth-child(2) > .list-dropdown > .ng-star-inserted > button').click();
    cy.wait(500);
    // 분류 레이블 입력
    if (LabelType == SEGMENTATION) {
        if (Content.includes('3D') && Content.includes('Case1')) {
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
    cy.contains(/학습.*검증/); // 사용 용도 확인
    cy.get('#include-btn').click();
    cy.get(':nth-child(2) > .list-dropdown > .ng-star-inserted > button').click();
    cy.get('.modal-button-content > .btn-primary').click();
    cy.wait(3000);

    cy.get('.dataset-management__lnb--content > :nth-child(1) > button.ng-tns-c0-0').click();
    cy.wait(1000);
    cy.get('.right-content > .btn').click();
    const ModifiedContent = Content.replace(/:/g, '') + 'c';
    cy.wait(4000);
    cy.get('#module_name').type(ModifiedContent);
    cy.get('.modal-button-content > .btn-primary').click();
    cy.wait(2500);
    cy.contains(ModifiedContent);
    cy.get('#dataset-menu-btn').click();
    cy.get('.list-dropdown > li.ng-tns-c0-0 > .ng-tns-c0-0').click();
    cy.contains('삭제');
    cy.get('.btn-danger').click();
    cy.wait(10000);
    if (Site === ONPREM) {
        cy.contains('최근 공유된 데이터셋', { timeout: 10 * 1000 });
    } else {
        cy.contains('데이터를 업로드하여 연구용 데이터셋을 만들 수 있습니다.', { timeout: 10 * 1000 });
    }
}

function settingRecordDataset(Site = undefined) {
    // 첫번째 데이터셋 선택
    cy.log('첫번째 데이터셋 선택');
    if (Site === ONPREM) {
        cy.get(':nth-child(2) > .dashboard-card > .dashboard-card__name > button').click();
    } else {
        cy.get(':nth-child(1) > .dashboard-card__item--body > .title').click();
    }

    cy.wait(3000);
    cy.contains('삭제', { timeout: 10000 });
    cy.get('.fa-solid.fa-check', { timeout: 10000 }).eq(1).click({ force: true });
    cy.contains('샘플데이터', { timeout: 60000 }).should('be.visible');

    /* 데이터셋 정보 변경 & 삭제 */
    if (Site === ONPREM) {
        cy.get('.gnb__container > .gnb--logo').click();
        cy.wait(5000);
        cy.get('.gnb__nav > ul > :nth-child(1) > button').click();
        cy.wait(3000);
        cy.get('.default-tab > ul > :nth-child(2) > button').click();
        cy.wait(3000);
        cy.get(':nth-child(2) > .dashboard-card > .dashboard-card__control > .btn').click();
        cy.get(':nth-child(2) > .dashboard-card > .dashboard-card__control > .list-dropdown').contains('삭제').click();
    } else {
        cy.get('.btn-home').click();
        cy.wait(5000);
        cy.get(':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .btn').click();
        cy.get(
            ':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button',
        ).click();
        cy.get('.project-info__control > .btn').click();
        cy.get('#dataset_name')
            .clear()
            .type(`Change${Cypress.env('DateLabel')}`);
        cy.get('.modal-button-content > .btn-primary').click();

        cy.get(':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .btn').click();
        cy.get(
            ':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .list-dropdown > :nth-child(2) > button',
        ).click();
    }
    cy.get('.btn-danger').click();
    cy.wait(1000);
    cy.contains('성공적으로 삭제되었습니다.').should('be.visible');
}
module.exports = {
    settingImageDataset: settingImageDataset,
    settingRecordDataset: settingRecordDataset,
};
