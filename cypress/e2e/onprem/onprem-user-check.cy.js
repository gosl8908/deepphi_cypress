const { loginModule, emailModule, functionModule: f } = require('../module/manager.module.js');

describe('Onprem User Check Test', () => {
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
        loginModule.login(Cypress.env('Onprem'), Cypress.env('AdminId'), Cypress.env('AdminPwd'));
    });

    it('User search', () => {
        cy.contains('멤버').click();

        /* 멤버 검색 */
        cy.log('멤버 검색');
        cy.get('.search-box > .input-form').type('asdasdasd');
        cy.get('.btn-primary').click();
        cy.get('jhi-organization-member.ng-star-inserted > :nth-child(1) > article.ng-star-inserted').contains(
            'asdasdasd',
        );

        /* 변경이력 조회 */
        cy.log('멤버 변경이력 조회');
        cy.get(':nth-child(1) > .text-right > .flex-display > .btn').contains('변경이력').click();
        cy.get('.title').contains('변경이력');
        cy.get('.btn-close > .fa-solid').click();

        /* 강제탈퇴 */
        cy.log('멤버 강제탈퇴');
        cy.get('.search-box > :nth-child(3)').click();
        cy.get('.organization-status > .input-form').select('활동 중');
        cy.get('.search-box > .input-form').type('test2024');
        cy.get('.btn-primary').click();
        cy.get('jhi-organization-member.ng-star-inserted > :nth-child(1) > article.ng-star-inserted').contains(
            '강제 탈퇴',
        );
        cy.get(':nth-child(1) > .text-right > .flex-display > .btn-danger').click();
        cy.get('.modal-button-content > .btn-danger').click();
        cy.get('jhi-organization-member.ng-star-inserted > :nth-child(1) > article.ng-star-inserted')
            .contains('test2024')
            .should('exist');
    });

    afterEach('Status Check', () => {
        if (FailTF) {
            const ScreenshotFileName = `User Check Test ${Cypress.env('DateLabel')}`;
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
        const TestRange = '1. 멤버 검색 2. 멤버 강제 탈퇴 3. 변경이력 조회';
        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[Onprem] User Check Test ${Cypress.env('EmailTitle')}`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
