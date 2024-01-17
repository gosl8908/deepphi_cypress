const { loginModule, visualizationCreateModule, sendEmailModule } = require('../module/manager.module.js');

describe('Record Project visualization Create Test', () => {
    let testFail = ''; // 실패 원인을 저장할 변수
    let screenshots = []; // 스크린샷을 저장할 배열
    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId5'), Cypress.env('KangTestPwd'));
    });

    it('Cleansing > Calculation Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39780');
        cy.wait(3*1000);
        cy.get('.flow__module--name').contains('Data Cleansing').click();
        cy.wait(3000);
        cy.get('[style="cursor: pointer; visibility: visible;"]').eq(1).click(); // 모듈 더보기
        cy.get('.mxPopupMenu').contains('프로세스 플로우').click();
        visualizationCreateModule.visualizationCreate('Calculation', '빈도 그래프(Count Plot)')
        Cypress.on('fail', (err, runnable) => {
            testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });
    it('Processing > Scale Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39780');
        cy.wait(3*1000);
        cy.get('.flow__module--name').contains('Data Processing').click();
        cy.wait(3000);
        cy.get('[style="cursor: pointer; visibility: visible;"]').eq(1).click(); // 모듈 더보기
        cy.get('.mxPopupMenu').contains('프로세스 플로우').click();
        visualizationCreateModule.visualizationCreate('Scale', '빈도 그래프(Count Plot)')
        Cypress.on('fail', (err, runnable) => {
            testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });

    it('Cleansing Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39780');
        cy.wait(3*1000);
        visualizationCreateModule.visualizationCreate('Data Cleansing', '빈도 그래프(Count Plot)')
        Cypress.on('fail', (err, runnable) => {
            testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });

    it('Processing Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39780');
        cy.wait(3*1000);
        visualizationCreateModule.visualizationCreate('Data Processing', '빈도 그래프(Count Plot)')
        Cypress.on('fail', (err, runnable) => {
            testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });

        it('DL Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39780');
        cy.wait(3*1000);
        visualizationCreateModule.visualizationCreate('DNN-Classification', '빈도 그래프(Count Plot)')
        Cypress.on('fail', (err, runnable) => {
            testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });

    it('ML Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39780');
        cy.wait(3*1000);
        visualizationCreateModule.visualizationCreate('Decision Tree Classifier', '빈도 그래프(Count Plot)')
        Cypress.on('fail', (err, runnable) => {
            testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });

    
    it('Test Project Cleansing > Calculation Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39780?testId=39783&loadedProjectPage=1');
        cy.wait(3*1000);
        cy.get('.flow__module--name').contains('Data Cleansing').click();
        cy.wait(3000);
        cy.get('[style="cursor: pointer; visibility: visible;"]').eq(1).click(); // 모듈 더보기
        cy.get('.mxPopupMenu').contains('프로세스 플로우').click();
        visualizationCreateModule.visualizationCreate('Calculation', '빈도 그래프(Count Plot)')
        Cypress.on('fail', (err, runnable) => {
            testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });
    it('Test Project Processing > Scale Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39780?testId=39783&loadedProjectPage=1');
        cy.wait(3*1000);
        cy.get('.flow__module--name').contains('Data Processing').click();
        cy.wait(3000);
        cy.get('[style="cursor: pointer; visibility: visible;"]').eq(1).click(); // 모듈 더보기
        cy.get('.mxPopupMenu').contains('프로세스 플로우').click();
        visualizationCreateModule.visualizationCreate('Scale', '빈도 그래프(Count Plot)')
        Cypress.on('fail', (err, runnable) => {
            testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });

    it('Test Project Cleansing Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39780?testId=39783&loadedProjectPage=1');
        cy.wait(3*1000);
        visualizationCreateModule.visualizationCreate('Data Cleansing', '빈도 그래프(Count Plot)')
        Cypress.on('fail', (err, runnable) => {
            testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });

    it('Test Project Processing Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39780?testId=39783&loadedProjectPage=1');
        cy.wait(3*1000);
        visualizationCreateModule.visualizationCreate('Data Processing', '빈도 그래프(Count Plot)')
        Cypress.on('fail', (err, runnable) => {
            testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });

        it('Test Project DL Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39780?testId=39783&loadedProjectPage=1');
        cy.wait(3*1000);
        visualizationCreateModule.visualizationCreate('DNN-Classification', '빈도 그래프(Count Plot)')
        Cypress.on('fail', (err, runnable) => {
            testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });

    it('Test Project ML Module visualization Create Test', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/39780?testId=39783&loadedProjectPage=1');
        cy.wait(3*1000);
        visualizationCreateModule.visualizationCreate('Decision Tree Classifier', '빈도 그래프(Count Plot)')
        Cypress.on('fail', (err, runnable) => {
            testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });
    afterEach('Status Fail', () => {
        const isTestFailed = Boolean(testFail);
        const screenshotFileName = `Record Project Module Visualization Create/Record Project Module Visualization Create Test ${Cypress.env('DateLabel')}`;
        isTestFailed && cy.screenshot(screenshotFileName); // 첫 번째 스크린샷
        isTestFailed && screenshots.push(screenshotFileName);
    });
    after('Send Email', () => {
        const testRange = '1. 클랜징 모듈 시각화 2. 프로세싱 모듈 시각화 3. DL 모듈 시각화 4. ML 모듈 시각화 '

        sendEmailModule.sendEmail(
            testFail,
            Cypress.env('AdminId'),
            `Record Project Module Visualization Create Test ${Cypress.env('EmailTitle')}`,
            testRange,
            screenshots,
        );
    });
});
