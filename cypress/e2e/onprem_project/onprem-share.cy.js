const { loginModule, emailModule, functionModule: f } = require('../module/manager.module.js');
describe('Onprem Share Test', () => {
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

    it('Share Test', () => {
        loginModule.login(Cypress.env('Onprem'), Cypress.env('OnpremId4'), Cypress.env('KangTestPwd'));

        /* 이미지 데이터셋 공유 */
        cy.get('.gnb__container').contains('데이터셋').click();
        cy.get('.search-box > .input-form').type('이미지 데이터셋 공유용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3 * 1000);
        cy.get('.dashboard-card__control > .btn').click();
        cy.get('.dashboard-card__control > .list-dropdown')
            .contains(/공유.*/)
            .click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.contains('성공적으로 공유되었습니다.', { timeout: 5 * 1000 });

        /* 레코드 데이터셋 공유 */
        cy.get('.default-tab > ul > :nth-child(2) > button').click();
        cy.get('.search-box > .input-form').type('레코드 데이터셋 공유용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3 * 1000);
        cy.get('.dashboard-card__control > .btn').click();
        cy.get('.dashboard-card__control > .list-dropdown')
            .contains(/공유.*/)
            .click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.contains('성공적으로 공유되었습니다.', { timeout: 5 * 1000 });

        /* 이미지 프로젝트 공유 */
        cy.get('.gnb__container').contains('프로젝트').click();
        cy.get('.search-box > .input-form').type('이미지 프로젝트 공유용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3 * 1000);
        cy.get('.dashboard-card__control > .btn').click();
        cy.get('.dashboard-card__control > .list-dropdown')
            .contains(/공유.*/)
            .click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.contains('성공적으로 공유되었습니다.', { timeout: 5 * 1000 });

        /* 레코드 프로젝트 공유 */
        cy.get('.search-box > :nth-child(3)').click();
        cy.get('.search-box > .input-form').type('레코드 프로젝트 공유용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3 * 1000);
        cy.get('.dashboard-card__control > .btn').click();
        cy.get('.dashboard-card__control > .list-dropdown')
            .contains(/공유.*/)
            .click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.contains('성공적으로 공유되었습니다.', { timeout: 5 * 1000 });
    });

    it('Share Check Test', () => {
        loginModule.login(Cypress.env('Onprem'), Cypress.env('OnpremId5'), Cypress.env('KangTestPwd'));

        /* 이미지 데이터셋 공유 확인*/
        cy.get('.gnb__container').contains('데이터셋').click();
        cy.wait(10 * 1000);
        cy.get('.search-box > .input-form').type('이미지 데이터셋 공유용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3 * 1000);
        cy.get('.dashboard-card__name > button').click();
        cy.contains('데이터셋 포함된 파일', { timeout: 20 * 1000 }).should('be.visible');

        /* 레코드 데이터셋 공유 확인*/
        cy.get('.gnb__container').contains('데이터셋').click();
        cy.wait(10 * 1000);
        cy.get('.default-tab > ul > :nth-child(2) > button').click();
        cy.get('.search-box > .input-form').type('레코드 데이터셋 공유용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3 * 1000);
        cy.get('.dashboard-card__name > button').click();
        cy.contains('샘플데이터', { timeout: 20 * 1000 }).should('be.visible');

        /* 이미지 프로젝트 공유 확인*/
        cy.get('.gnb__container').contains('프로젝트').click();
        cy.wait(10 * 1000);
        cy.get('.search-box > .input-form').type('이미지 프로젝트 공유용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3 * 1000);
        cy.get('.dashboard-card__name > button').click();
        cy.contains('이미지 프로젝트 공유용', { timeout: 20 * 1000 }).should('be.visible');

        /* 레코드 프로젝트 공유 확인*/
        cy.get('.gnb__container').contains('프로젝트').click();
        cy.wait(10 * 1000);
        cy.get('.search-box > :nth-child(3)', { timeout: 10 * 1000 }).click();
        cy.get('.search-box > .input-form').type('레코드 프로젝트 공유용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3 * 1000);
        cy.get('.dashboard-card__name > button').click();
        cy.contains('레코드 프로젝트 공유용', { timeout: 20 * 1000 }).should('be.visible');
    });

    it('Share Cancel Test', () => {
        loginModule.login(Cypress.env('Onprem'), Cypress.env('OnpremId4'), Cypress.env('KangTestPwd'));

        /* 이미지 데이터셋 공유 취소*/
        cy.get('.gnb__container').contains('데이터셋').click();
        cy.get('.search-box > .input-form').type('이미지 데이터셋 공유용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3 * 1000);
        cy.get('.dashboard-card__control > .btn').click();
        cy.get('.dashboard-card__control > .list-dropdown').contains('공유 취소').click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.contains('공유를 취소하였습니다.', { timeout: 5 * 1000 });

        /* 레코드 데이터셋 공유 취소*/
        cy.get('.default-tab > ul > :nth-child(2) > button').click();
        cy.get('.search-box > .input-form').type('레코드 데이터셋 공유용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3 * 1000);
        cy.get('.dashboard-card__control > .btn').click();
        cy.get('.dashboard-card__control > .list-dropdown').contains('공유 취소').click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.contains('공유를 취소하였습니다.', { timeout: 5 * 1000 });

        /* 이미지 프로젝트 공유 취소*/
        cy.get('.gnb__container').contains('프로젝트').click();
        cy.get('.search-box > .input-form').type('이미지 프로젝트 공유용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3 * 1000);
        cy.get('.dashboard-card__control > .btn').click();
        cy.get('.dashboard-card__control > .list-dropdown').contains('공유 취소').click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.contains('프로젝트 공유가 취소되었습니다.', { timeout: 5 * 1000 });

        /* 레코드 프로젝트 공유 취소*/
        cy.get('.search-box > :nth-child(3)').click();
        cy.get('.search-box > .input-form').type('레코드 프로젝트 공유용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3 * 1000);
        cy.get('.dashboard-card__control > .btn').click();
        cy.get('.dashboard-card__control > .list-dropdown').contains('공유 취소').click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.contains('프로젝트 공유가 취소되었습니다.', { timeout: 5 * 1000 });
    });

    afterEach('Status Fail', () => {
        if (FailTF) {
            const ScreenshotFileName = `Share test ${Cypress.env('DateLabel')}`;
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
        const TestRange =
            '1. 이미지 데이터셋 공유 2. 레코드 데이터셋 공유 3. 이미지 프로젝트 공유 4. 레코드 프로젝트 공유';
        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[Onprem] Share test ${Cypress.env('EmailTitle')}`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
