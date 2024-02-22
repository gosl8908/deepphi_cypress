const { ONPREM } = require('./constant.module');

function inferenceCreate() {
    cy.log('인퍼런스 생성');
    /* 인퍼런스 생성 */
    cy.get('.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .btn').click({
        force: true,
    }); // 메뉴바
    cy.get(
        '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .list-dropdown > :nth-child(2) > button',
    ).click({ force: true }); // 인퍼런스

    /* 이미지 프로젝트인 경우 */
    cy.get('.modal-content').then(btn => {
        const Body = btn.text().includes('생성할 인퍼런스 유형을 선택하세요');
        if (Body) {
            cy.get(
                ':nth-child(2) > .create-select-item__container > .create-select-item__content > .create-select-item__title',
            ).click();
            cy.get('.modal-button-content > .btn').click();
        }
    });
    cy.wait(3000);
    /* 인퍼런스명 없는 경우 */
    cy.get('.modal-container').then(btn => {
        const Body = btn.text().includes('인퍼런스 서비스명을 입력하세요.');
        if (Body) {
            const Inference = `inference-${Cypress.env('DateLabel')}`;
            cy.get('#inference_service_name2').type(Inference);
            cy.get('.ng-star-inserted > dd > .flex-display > .ml10 > .btn').click();
        }
    });

    cy.get(':nth-child(3) > dd > .flex-display > .ml10 > .btn').click(); // 버전 체크
    cy.wait(1000);
    cy.get('.note-editable').type(Cypress.env('DateLabel')); // 설명
    cy.get('.modal-button-content > .btn-primary').click(); // 확인
    cy.contains('바로가기', { timeout: 30 * 1000 }).should('be.visible');
    cy.get('.modal-button-content > :nth-child(1)').click(); // 바로가기
    cy.wait(5000);
}

function inferenceRun(Site = undefined) {
    if (Site === ONPREM) {
        cy.visit(`${Cypress.env('Onprem')}organization/inference`);
    } else {
        cy.visit(`${Cypress.env('Prod')}/user/my/inference`);
    }

    cy.get(':nth-child(1) > :nth-child(13) > .btn').click();
    cy.get('jhi-inference-instance-details.ng-star-inserted').contains('인퍼런스 서비스 상세 조회');

    cy.wait(3 * 1000);
    cy.get(':nth-child(2) > .table-layout > tbody > :nth-child(5) > td').then(cardContent => {
        const Resource = !cardContent.text().includes('cpu.2');

        if (Resource) {
            cy.contains('리소스 변경').click();
            cy.contains('cpu.2').click();
            cy.get('.modal-button-content > .btn-primary').click();
            cy.get(':nth-child(2) > .table-layout > tbody > :nth-child(5) > td').contains('cpu.2', {
                timeout: 5 * 1000,
            });
        }
    });

    // 인퍼런스 서비스 '대기' or '중지'상태일 때, 실행 및 실행 상태 확인
    cy.get(':nth-child(2) > .table-layout > tbody > :nth-child(4) > td').then(status => {
        const Waiting = status.text().includes('대기');
        const Stop = status.text().includes('중지');
        if (Waiting || Stop) {
            cy.get('.btn-primary').click();
            cy.get(':nth-child(2) > .table-layout > tbody > :nth-child(4) > td').contains('실행', {
                timeout: 30 * 1000,
            });
            cy.log('인퍼런스 서비스 - 실행완료');
            cy.wait(3 * 1000);
        }
    });
}

module.exports = {
    inferenceCreate: inferenceCreate,
    inferenceRun: inferenceRun,
};
