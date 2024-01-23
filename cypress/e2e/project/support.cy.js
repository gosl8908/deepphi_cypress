const { loginModule, emailModule } = require('../module/manager.module.js');
describe('Support Test', () => {
    let testFails = []; // 실패 원인을 저장할 변수
    let screenshots = []; // 스크린샷을 저장할 배열
    let FailTF = false;
    Cypress.on('fail', (err, runnable) => {
        const errMessage = err.message || '알 수 없는 이유로 실패함';
        !testFails.includes(errMessage) && testFails.push(errMessage);
        FailTF = true;
        throw err;
    });
    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('Prod'), Cypress.env('supporttest'), Cypress.env('KangTestPwd'));
    });

    it('FaQ Test', () => {
        cy.visit(`${Cypress.env('Prod')}support/faq`);
        cy.get(':nth-child(1) > .support__faq__head > div > .fas').click();
        cy.get('.display--inline-block').should('be.visible');
    });

    it('Notice Test', () => {
        cy.visit(`${Cypress.env('Prod')}support/notice`);
        cy.get(':nth-child(4) > .board__subject > .board__subject-content').click();
        cy.get('.board__detail--content').should('be.visible');
    });

    it('Guide Test', () => {
        cy.visit(`${Cypress.env('Prod')}support/guide`);
        cy.get(':nth-child(4) > .board__subject > .board__subject-content').click();
        cy.get('.user-guide__container > :nth-child(2)').should('be.visible');
    });

    it('QA Test', () => {
        cy.visit(`${Cypress.env('Prod')}support/qa`);
        cy.get('.btn-primary').click();
        cy.get('.input-form').type(`자동화 테스트 ${Cypress.env('DateLabel')}`);
        cy.get('.note-editable > :nth-child(10)').type(`자동화 테스트 ${Cypress.env('DateLabel')}`);
        cy.get('.pull-right > .btn-primary').click();
        cy.contains('질문이 저장되었습니다.');
        cy.contains('자동화 테스트').click();
        cy.get('.btn-danger').click();
        cy.get('.modal-button-content > .btn-danger').click();
        cy.contains('질문이 삭제되었습니다.');
    });
    afterEach('Status Fail', () => {
        if (FailTF) {
            const screenshotFileName = `Support test ${Cypress.env('DateLabel')}`;
            cy.screenshot(screenshotFileName);
            screenshots.push(screenshotFileName);
            FailTF = false;
        }
    });
    after('Send Email', () => {
        const testRange = '1. 자주 묻는 질문 2. 공지사항 3. 고객지원 4. 질의응답';

        emailModule.Email(testFails, `Support test ${Cypress.env('EmailTitle')}`, testRange, screenshots);
    });
});
