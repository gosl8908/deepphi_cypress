const { loginModule, emailModule, functionModule: f } = require('../module/manager.module.js');

describe('Record Test Project Create', () => {
    let TestFails = []; // 실패 원인을 저장할 변수
    let Screenshots = []; // 스크린샷을 저장할 배열
    let FailTF = false;
    Cypress.on('fail', (err, runnable) => {
        const errMessage = err.message || '알 수 없는 이유로 실패함';
        !TestFails.includes(errMessage) && TestFails.push(errMessage);
        FailTF = true;
        throw err;
    });
    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('Prod'), Cypress.env('AutoTestId'), Cypress.env('KangTestPwd'));
    });

    it('Record Test Project Create', () => {
        // 레코드 프로젝트 검색
        cy.get('.search-box > .input-form').type('레코드 평가 프로젝트 자동화 확인용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3000);
        cy.get('.title').click();
        cy.wait(5000);

        // 평가 프로젝트 생성
        cy.get('.modeler__nav > ul > :nth-child(2) > button').click(); // 평가 프로젝트 탭
        cy.wait(3000);
        cy.get('.btn-floating > div').click({ force: true }); // 생성
        cy.wait(3000);
        cy.get('.modal-button-content > .btn').click(); // 다음
        cy.wait(1000);
        cy.get('.btn-primary').click(); // 다음
        cy.wait(1000);
        cy.get('.btn-primary').click(); // 확인
        cy.wait(5000);

        cy.log('프로젝트 실행');
        //프로젝트 Run
        cy.get('.modeler-header__run-action-button > .btn').click({ force: true });
        cy.contains('실행', { timeout: 10 * 1000 }).should('be.visible');
    });
    afterEach('Status Fail', () => {
        if (FailTF) {
            const screenshotFileName = `Record Test Project Create/Record Test Project Create Test ${Cypress.env(
                'DateLabel',
            )}`;
            cy.screenshot(screenshotFileName);
            if (!Cypress.platform.includes('win')) {
                const currentFile = f.getFileName(__filename);
                Screenshots.push(`${currentFile}/${screenshotFileName}`);
            } else {
                Screenshots.push(`${screenshotFileName}`);
            }
            FailTF = false;
        }
    });
    after('Send Email', () => {
        const testRange = '1. 레코드 평가 프로젝트 생성 2. 실행';

        emailModule.Email(
            TestFails,
            `Record Test Project Create Test ${Cypress.env('EmailTitle')}`,
            testRange,
            Screenshots,
        );
    });
});
