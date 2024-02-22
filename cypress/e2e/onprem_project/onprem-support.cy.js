const { loginModule, emailModule, functionModule: f } = require('../module/manager.module.js');
describe('Onprem Support Test', () => {
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
        loginModule.login(Cypress.env('Onprem'), Cypress.env('OnpremId3'), Cypress.env('KangTestPwd'));
    });

    it('FaQ Test', () => {
        cy.visit(`${Cypress.env('Onprem')}support/faq`);
        cy.get(':nth-child(1) > .support__faq__head > div > .fas').click();
        cy.get('.support__faq__body').should('be.visible');
    });

    it('Notice Test', () => {
        cy.visit(`${Cypress.env('Onprem')}support/notice`);
        cy.get(':nth-child(4) > .board__subject > .board__subject-content').click();
        cy.get('.board__detail--content').should('be.visible');
    });

    it('Guide Test', () => {
        cy.visit(`${Cypress.env('Onprem')}support/guide`);
        cy.contains('데이터셋 업로드', { timeout: 5 * 1000 }).should('be.visible');
    });

    it('QA Test', () => {
        cy.visit(`${Cypress.env('Onprem')}support/qa`);
        cy.get('.btn-primary').click();
        cy.wait(3 * 1000);
        cy.get('.input-form').type(`자동화 테스트 ${Cypress.env('DateLabel')}`);
        cy.get(':nth-child(5) > .ce-tune-alignment--left > .ce-block__content > .ce-paragraph').type(
            `자동화 테스트 ${Cypress.env('DateLabel')}`,
        );
        cy.get('.pull-right > .btn-primary').click();
        cy.contains('질문이 저장되었습니다.');
        cy.wait(3 * 1000);
        cy.contains('자동화 테스트').click();
        cy.get('.btn-danger').click();
        cy.get('.modal-button-content > .btn-danger').click();
        cy.contains('질문이 삭제되었습니다.');
    });

    afterEach('Status Fail', () => {
        if (FailTF) {
            const ScreenshotFileName = `Support test ${Cypress.env('DateLabel')}`;
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
        const TestRange = '1. 자주 묻는 질문 2. 공지사항 3. 고객지원 4. 질의응답';
        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[Onprem] Support test ${Cypress.env('EmailTitle')}`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});