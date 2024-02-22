const { loginModule, emailModule, functionModule: f } = require('../module/manager.module.js');

describe('Onprem Project invite Test', () => {
    let TestFails = []; // 실패 원인을 저장할 변수
    let Screenshots = []; // 스크린샷을 저장할 배열
    let FailTF = false;
    Cypress.on('fail', (err, runnable) => {
        const ErrMessage = err.message || '알 수 없는 이유로 실패함';
        !TestFails.includes(ErrMessage) && TestFails.push(ErrMessage);
        FailTF = true;
        throw err;
    });
    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
    });

    it('Project invite', () => {
        loginModule.login(Cypress.env('Onprem'), Cypress.env('OnpremId7'), Cypress.env('KangTestPwd'));

        cy.get('.gnb__nav > ul > :nth-child(2) > button').click();

        /* 프로젝트 검색 */
        cy.get('.search-box > .input-form').type('이미지 평가 프로젝트 자동화 확인용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3 * 1000);
        cy.get('.dashboard-card__name > button').click();

        /* 프로젝트 초대 */
        cy.wait(5 * 1000);
        cy.get('jhi-members > .user-info__list-box > .ng-star-inserted > .logo > img').eq(0).click();
        cy.get('.mb10 > .btn').click();
        cy.get('#invite_email').type(`${Cypress.env('OnpremId3')}`);
        cy.get('#invite_role').select('관리자');
        cy.get('.btn-primary').click();
        cy.get(
            'jhi-confirm-alert.ng-star-inserted > .modal-back > .modal-wrap > .modal-container > .modal-button-content > .btn-primary',
        ).click();
        cy.contains('초대를 수락하면 프로젝트의 멤버가 됩니다.', { timeout: 10 * 1000 });
        cy.get('.modal-button-content > .btn').click();
        cy.contains('(미수락)', { timeout: 5 * 1000 });

        cy.get('.mb10 > .btn').click();
        cy.get('#invite_email').type(`${Cypress.env('OnpremId8')}`);
        cy.get('#invite_role').select('관리자');
        cy.get('.btn-primary').click();
        cy.get(
            'jhi-confirm-alert.ng-star-inserted > .modal-back > .modal-wrap > .modal-container > .modal-button-content > .btn-primary',
        ).click();
        cy.contains('초대를 수락하면 프로젝트의 멤버가 됩니다.', { timeout: 10 * 1000 });
        cy.get('.modal-button-content > .btn').click();
        cy.contains('(미수락)', { timeout: 5 * 1000 });
        cy.get('.btn-primary').click();
    });

    it('Project invite accept', () => {
        loginModule.login(Cypress.env('Onprem'), Cypress.env('OnpremId3'), Cypress.env('KangTestPwd'));
        cy.get('#invite-bell > .fa-regular').click();
        cy.get('.invite-popup').contains('수락').click();
        cy.wait(10 * 1000);

        cy.get('.gnb__nav > ul > :nth-child(2) > button').click();

        /* 프로젝트 검색 */
        cy.get('.search-box > .input-form').type('이미지 평가 프로젝트 자동화 확인용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3 * 1000);

        cy.get('.ng-star-inserted')
            .find('.dashboard-card__owner')
            .contains('asd7')
            .closest('.ng-star-inserted')
            .find('.dashboard-card__control > .btn')
            .eq(0)
            .click();
        cy.get('.list-dropdown').contains('멤버 탈퇴').click();
        cy.get('.modal-back > .modal-wrap > .modal-container > .modal-button-content > .btn-primary').click();
        cy.get('.front-body > .overlay-container > #toast-container > .toast-info').contains(
            '프로젝트에서 나갔습니다.',
            { timeout: 5 * 1000 },
        );
    });

    it('Project invite decline', () => {
        loginModule.login(Cypress.env('Onprem'), Cypress.env('OnpremId8'), Cypress.env('KangTestPwd'));
        cy.get('#invite-bell > .fa-regular').click();
        cy.get('.invite-popup').contains('거절').click();
    });
    afterEach('Status Check', () => {
        if (FailTF) {
            const ScreenshotFileName = `Project invit Test ${Cypress.env('DateLabel')}`;
            cy.screenshot(ScreenshotFileName);
            if (!Cypress.platform.includes('win')) {
                const CurrentFile = f.getFileName(__filename);
                Screenshots.push(`${CurrentFile}/${ScreenshotFileName}`);
            } else {
                Screenshots.push(`${ScreenshotFileName}`);
            }
            FailTF = false;
        }
    });
    after('Send Email', () => {
        const TestRange = '1. 프로젝트 초대 2. 수락 3. 거절';

        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[Onprem] Project invit Test ${Cypress.env('EmailTitle')}`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
