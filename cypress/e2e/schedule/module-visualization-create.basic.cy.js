const { loginModule, visualizationModule, emailModule, functionModule: f } = require('../module/manager.module.js');

describe('Record Project visualization Create Test', () => {
    let TestFails = []; // 실패 원인을 저장할 변수
    let Screenshots = []; // 스크린샷을 저장할 배열
    let Failure = false;
    Cypress.on('fail', (err, runnable) => {
        const ErrMessage = err.message || '알 수 없는 이유로 실패함';
        !TestFails.includes(ErrMessage) && TestFails.push(ErrMessage);
        Failure = true;
        throw err;
    });
    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId7'), Cypress.env('KangTestPwd'));
    });

    // it('Cleansing > Calculation Module visualization Create Test', () => {
    //     cy.visit('https://modeler.deepphi.ai/modeler/40167');
    //     cy.wait(3 * 1000);
    //     cy.get('.flow__module--name').contains('Data Cleansing').click();
    //     cy.wait(3 * 1000);
    //     cy.get('[style="cursor: pointer; visibility: visible;"]').eq(1).click(); // 모듈 더보기
    //     cy.get('.mxPopupMenu').contains('프로세스 플로우').click();
    //     visualizationModule.visualizationCreate('Calculation', '빈도 그래프(Count Plot)');
    // });
    // it('Processing > Scale Module visualization Create Test', () => {
    //     cy.visit('https://modeler.deepphi.ai/modeler/40167');
    //     cy.wait(3 * 1000);
    //     cy.get('.flow__module--name').contains('Data Processing').click();
    //     cy.wait(3000);
    //     cy.get('[style="cursor: pointer; visibility: visible;"]').eq(1).click(); // 모듈 더보기
    //     cy.get('.mxPopupMenu').contains('프로세스 플로우').click();
    //     visualizationModule.visualizationCreate('Scale', '빈도 그래프(Count Plot)');
    // });
    // it('Cleansing Module visualization Create Test', () => {
    //     cy.visit('https://modeler.deepphi.ai/modeler/40167');
    //     cy.wait(3 * 1000);
    //     visualizationModule.visualizationCreate('Data Cleansing', '빈도 그래프(Count Plot)');
    // });
    // it('Processing Module visualization Create Test', () => {
    //     cy.visit('https://modeler.deepphi.ai/modeler/40167');
    //     cy.wait(3 * 1000);
    //     visualizationModule.visualizationCreate('Data Processing', '빈도 그래프(Count Plot)');
    // });
    // it('DL Module visualization Create Test', () => {
    //     cy.visit('https://modeler.deepphi.ai/modeler/40167');
    //     cy.wait(3 * 1000);
    //     visualizationModule.visualizationCreate('DNN-Classification', '빈도 그래프(Count Plot)');
    // });
    // it('ML Module visualization Create Test', () => {
    //     cy.visit('https://modeler.deepphi.ai/modeler/40167');
    //     cy.wait(3 * 1000);
    //     visualizationModule.visualizationCreate('Decision Tree Classifier', '빈도 그래프(Count Plot)');
    // });
    it('Test Project Cleansing > Calculation Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/40167?testId=40169&loadedProjectPage=1');
        cy.wait(3 * 1000);
        cy.contains('평가 자동화 프로젝트', { timeout: 20 * 1000 });
        cy.get('.flow__module--name').contains('Data Cleansing').click();
        cy.wait(3000);

        cy.get('[style="cursor: pointer; visibility: visible;"]', { timeout: 10 * 1000 })
            .eq(1)
            .click(); // 모듈 더보기
        cy.get('.mxPopupMenu').contains('프로세스 플로우').click();
        cy.contains('프로세스 플로우', { timeout: 20 * 1000 });
        visualizationModule.visualizationCreate('Calculation', '빈도 그래프(Count Plot)');
    });
    it('Test Project Processing > Scale Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/40167?testId=40169&loadedProjectPage=1');
        cy.wait(15 * 1000);
        cy.contains('평가 자동화 프로젝트', { timeout: 20 * 1000 });
        cy.get('.flow__module--name').contains('Data Processing').click();
        cy.wait(3000);
        cy.get('[style="cursor: pointer; visibility: visible;"]', { timeout: 10 * 1000 })
            .eq(1)
            .click(); // 모듈 더보기
        cy.get('.mxPopupMenu').contains('프로세스 플로우').click();
        cy.contains('프로세스 플로우', { timeout: 20 * 1000 });
        visualizationModule.visualizationCreate('Scale', '빈도 그래프(Count Plot)');
    });
    it('Test Project Cleansing Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/40167?testId=40169&loadedProjectPage=1');
        cy.wait(3 * 1000);
        cy.contains('평가 자동화 프로젝트', { timeout: 20 * 1000 });
        visualizationModule.visualizationCreate('Data Cleansing', '빈도 그래프(Count Plot)');
    });
    it('Test Project Processing Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/40167?testId=40169&loadedProjectPage=1');
        cy.wait(3 * 1000);
        cy.contains('평가 자동화 프로젝트', { timeout: 20 * 1000 });
        visualizationModule.visualizationCreate('Data Processing', '빈도 그래프(Count Plot)');
    });
    it('Test Project DL Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/40167?testId=40169&loadedProjectPage=1');
        cy.wait(3 * 1000);
        cy.contains('평가 자동화 프로젝트', { timeout: 20 * 1000 });
        visualizationModule.visualizationCreate('DNN-Classification', '빈도 그래프(Count Plot)');
    });
    it('Test Project ML Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/40167?testId=40169&loadedProjectPage=1');
        cy.wait(3 * 1000);
        cy.contains('평가 자동화 프로젝트', { timeout: 20 * 1000 });
        visualizationModule.visualizationCreate('Decision Tree Classifier', '빈도 그래프(Count Plot)');
    });

    afterEach('Status Check', () => {
        if (Failure) {
            const ScreenshotFileName = `Record Project Module Visualization Create Test ${Cypress.env('DateLabel')}`;
            cy.screenshot(ScreenshotFileName);
            if (!Cypress.platform.includes('win')) {
                const CurrentFile = f.getFileName(__filename);
                Screenshots.push(`${CurrentFile}/${ScreenshotFileName}`);
            } else {
                Screenshots.push(`${ScreenshotFileName}`);
            }
            Failure = false;
        }
    });

    after('Send Email', () => {
        const TestRange = '1. 클랜징 모듈 시각화 2. 프로세싱 모듈 시각화 3. DL 모듈 시각화 4. ML 모듈 시각화 ';
        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[${Cypress.env('EmailTitle')}][Prod] Record Project Module Visualization Create`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
