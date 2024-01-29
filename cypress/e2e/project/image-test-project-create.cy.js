const { loginModule, emailModule, functionModule: f } = require('../module/manager.module.js');

describe('Image Test Project Create', () => {
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
        loginModule.login(Cypress.env('Prod'), Cypress.env('AutoTestId'), Cypress.env('KangTestPwd'));
    });

    it('Image Test Project Create', () => {
        // 이미지 프로젝트 검색
        cy.get('.search-box > .input-form').type('이미지 평가 프로젝트 자동화 확인용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3000);
        cy.get('.title').click();
        cy.wait(5000);

        // 평가 프로젝트 생성
        cy.get('.modeler__nav > ul > :nth-child(2) > button').click(); // 평가 프로젝트 탭
        cy.wait(3000);
        cy.get('.btn-floating > div').click({ force: true }); // 생성
        cy.get('.modal-button-content > .btn').click(); // 확인
        cy.get('.btn-primary').click(); // 확인
        cy.get('.btn-primary').click(); // 확인
        cy.wait(5000);

        cy.log('프로젝트 실행');
        //프로젝트 Run
        cy.get('.as-vertical > .flow > .modeler__status-panner > .modeler-header__run-action-button > .btn').click({
            force: true,
        });
        cy.get('.modeler-header__run-action-button > .btn')
            .contains('중지', { timeout: 30 * 1000 })
            .should('be.visible');
        const Status = cy
            .get('.modeler__status')
            .contains('완료', { timeout: 420 * 1000 })
            .should('be.visible');

        if (Status) {
            cy.get(
                '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .btn',
            ).click();
            cy.get(
                '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .list-dropdown',
            )
                .contains('삭제')
                .click();
            cy.get('.btn-danger').click();
        }
    });
    afterEach('Status Fail', () => {
        if (FailTF) {
            const ScreenshotFileName = `Image Test Project Create/Image Test Project Create Test ${Cypress.env(
                'DateLabel',
            )}`;
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
        const TestRange = '1. 이미지 평가 프로젝트 생성 2. 실행';

        emailModule.Email(
            TestFails,
            `Image Test Project Create Test ${Cypress.env('EmailTitle')}`,
            TestRange,
            Screenshots,
        );
    });
});
