const { loginModule, visualizationModule, emailModule } = require('../module/manager.module.js');

describe('Record Project visualization Create Test', () => {
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

    it('Cleansing > Calculation Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39812');
        cy.wait(3 * 1000);
        cy.get('.flow__module--name').contains('Data Cleansing').click();
        cy.wait(3000);
        cy.get('[style="cursor: pointer; visibility: visible;"]').eq(1).click(); // 모듈 더보기
        cy.get('.mxPopupMenu').contains('프로세스 플로우').click();
        visualizationModule.visualizationCreate('Calculation', '빈도 그래프(Count Plot)');
    });
    it('Processing > Scale Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39812');
        cy.wait(3 * 1000);
        cy.get('.flow__module--name').contains('Data Processing').click();
        cy.wait(3000);
        cy.get('[style="cursor: pointer; visibility: visible;"]').eq(1).click(); // 모듈 더보기
        cy.get('.mxPopupMenu').contains('프로세스 플로우').click();
        visualizationModule.visualizationCreate('Scale', '빈도 그래프(Count Plot)');
    });
    it('Cleansing Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39812');
        cy.wait(3 * 1000);
        visualizationModule.visualizationCreate('Data Cleansing', '빈도 그래프(Count Plot)');
    });
    it('Processing Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39812');
        cy.wait(3 * 1000);
        visualizationModule.visualizationCreate('Data Processing', '빈도 그래프(Count Plot)');
    });
    it('DL Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39812');
        cy.wait(3 * 1000);
        visualizationModule.visualizationCreate('DNN-Classification', '빈도 그래프(Count Plot)');
    });
    it('ML Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39812');
        cy.wait(3 * 1000);
        visualizationModule.visualizationCreate('Decision Tree Classifier', '빈도 그래프(Count Plot)');
    });
    it('Test Project Cleansing > Calculation Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39812?testId=39815&loadedProjectPage=1');
        cy.wait(3 * 1000);
        cy.get('.flow__module--name').contains('Data Cleansing').click();
        cy.wait(3000);
        cy.get('[style="cursor: pointer; visibility: visible;"]').eq(1).click(); // 모듈 더보기
        cy.get('.mxPopupMenu').contains('프로세스 플로우').click();
        visualizationModule.visualizationCreate('Calculation', '빈도 그래프(Count Plot)');
    });
    it('Test Project Processing > Scale Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39812?testId=39815&loadedProjectPage=1');
        cy.wait(3 * 1000);
        cy.get('.flow__module--name').contains('Data Processing').click();
        cy.wait(3000);
        cy.get('[style="cursor: pointer; visibility: visible;"]').eq(1).click(); // 모듈 더보기
        cy.get('.mxPopupMenu').contains('프로세스 플로우').click();
        visualizationModule.visualizationCreate('Scale', '빈도 그래프(Count Plot)');
    });
    it('Test Project Cleansing Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39812?testId=39815&loadedProjectPage=1');
        cy.wait(3 * 1000);
        visualizationModule.visualizationCreate('Data Cleansing', '빈도 그래프(Count Plot)');
    });
    it('Test Project Processing Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39812?testId=39815&loadedProjectPage=1');
        cy.wait(3 * 1000);
        visualizationModule.visualizationCreate('Data Processing', '빈도 그래프(Count Plot)');
    });
    it('Test Project DL Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39812?testId=39815&loadedProjectPage=1');
        cy.wait(3 * 1000);
        visualizationModule.visualizationCreate('DNN-Classification', '빈도 그래프(Count Plot)');
    });
    it('Test Project ML Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39812?testId=39815&loadedProjectPage=1');
        cy.wait(3 * 1000);
        visualizationModule.visualizationCreate('Decision Tree Classifier', '빈도 그래프(Count Plot)');
    });
    afterEach('Status Fail', () => {
        if (FailTF) {
            const ScreenshotFileName = `Record Project Module Visualization Create(basic)/Record Project Module Visualization Create Test ${Cypress.env(
                'DateLabel',
            )}`;
            cy.screenshot(ScreenshotFileName);
            Screenshots.push(ScreenshotFileName);
            FailTF = false;
        }
    });
    after('Send Email', () => {
        const TestRange = '1. 클랜징 모듈 시각화 2. 프로세싱 모듈 시각화 3. DL 모듈 시각화 4. ML 모듈 시각화 ';
        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `Record Project Module Visualization Create Test ${Cypress.env('EmailTitle')}`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
