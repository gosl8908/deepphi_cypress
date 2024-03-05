const {
    loginModule,
    createModule,
    modelModule,
    emailModule,
    functionModule: f,
} = require('../module/manager.module.js');

describe('2D Classification Module Check Test', () => {
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
        loginModule.login(Cypress.env('Prod'), Cypress.env('AutoEmail'), Cypress.env('AutoPwd'));
        cy.wait(3000);
    });

    it('2D 분류 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/18296', '2D-Classification-Module-Check-Result-');
        cy.wait(3000);
    });

    it('Auto Test_Sample_Hippocampus Detection 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/16382', 'Auto-Test-Sample-Hippocampus-Detection-');
        cy.wait(3000);
    });

    it('Auto Test_Sample_Lung X-ray Segmentation 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/16386', 'Auto-Test-Sample-Lung-X-ray-Segmentation-');
        cy.wait(3000);
    });

    it('Auto Test_Sample_MRI Contrast Transformation 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck(
            'https://modeler.deepphi.ai/modeler/16384',
            'Auto-Test-Sample-MRI-Contrast-Transformation-',
        );
        cy.wait(3000);
    });

    it('Auto-TestProject_Garbage Classification 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/25542', 'Auto-TestProject-Garbage-Classification-');
        cy.wait(3000);
    });

    afterEach('Status Fail', () => {
        if (Failure) {
            const ScreenshotFileName = `Module Check Test ${Cypress.env('DateLabel')}`;
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
        const TestRange = '1. 2D 분류 프로젝트 모듈 실행 확인';

        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[${Cypress.env('EmailTitle')}][Prod] Fail Module Check`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
