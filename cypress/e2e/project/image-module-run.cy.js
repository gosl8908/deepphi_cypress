const {
    loginModule,
    createModule,
    modelModule,
    emailModule,
    functionModule: f,
} = require('../module/manager.module.js');

describe('Module Run Test', () => {
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

    /* Process Module Run Test */
    it('2D 프로세싱 모듈 프로젝트 진입 및 실행', { tags: ['first'] }, () => {
        modelModule.visitRun('https://modeler.deepphi.ai/modeler/15977', '2D-Process-Module-Run-Result-', 10000);
        cy.wait(3000);
    });

    it('3D 프로세싱 모듈 프로젝트 진입 및 실행', { tags: ['image'] }, () => {
        modelModule.visitRun('https://modeler.deepphi.ai/modeler/16264', '3D-Process-Module-Run-Result-');
        cy.wait(3000);
    });

    /* AI Module Run Test */

    it('3D 분류 프로젝트 진입 및 실행', { tags: ['image'] }, () => {
        modelModule.visitRun('https://modeler.deepphi.ai/modeler/15990', '3D-Classification-Module-Run-Result-');
        cy.wait(3000);
    });

    it('2D 분할 프로젝트 진입 및 실행', { tags: ['image'] }, () => {
        modelModule.visitRun('https://modeler.deepphi.ai/modeler/15963', '2D-Segmentation-Module-Run-Result-');
        cy.wait(3000);
    });

    it('3D 분할 프로젝트 진입 및 실행', { tags: ['image'] }, () => {
        modelModule.visitRun('https://modeler.deepphi.ai/modeler/15967', '3D-Segmentation-Module-Run-Result-');
        cy.wait(3000);
    });

    it('2D 탐지 프로젝트 진입 및 실행', { tags: ['image'] }, () => {
        modelModule.visitRun('https://modeler.deepphi.ai/modeler/15991', '2D-Detection-Module-Run-Result-');
        cy.wait(3000);
    });

    it('2D 변환 프로젝트 진입 및 실행', { tags: ['image'] }, () => {
        modelModule.visitRun('https://modeler.deepphi.ai/modeler/15965', '2D-Transformation-Module-Run-Result-');
        cy.wait(3000);
    });

    it('3D 변환 프로젝트 진입 및 실행', { tags: ['image'] }, () => {
        modelModule.visitRun('https://modeler.deepphi.ai/modeler/15969', '2D-Transformation-Module-Run-Result-');
        cy.wait(3000);
    });

    /* AI Template Project Run Test */
    it('Auto Test_Sample_Face Mask Segmentation 프로젝트 진입 및 실행', { tags: ['image'] }, () => {
        modelModule.visitRun('https://modeler.deepphi.ai/modeler/16385', 'Auto-Test-Sample-Face-Mask-Segmentation-');
        cy.wait(3000);
    });

    it('Auto Test_Sample_Hippocampus Classification 프로젝트 진입 및 실행', { tags: ['image'] }, () => {
        modelModule.visitRun(
            'https://modeler.deepphi.ai/modeler/16378',
            'Auto-Test-Sample-Chest-Pneumonia-Classification-',
        );
        cy.wait(3000);
    });

    it('Auto Test_Sample_Lung CT Segmentation 프로젝트 진입 및 실행', { tags: ['image'] }, () => {
        modelModule.visitRun('https://modeler.deepphi.ai/modeler/16379', 'Auto-Test-Sample-Lung-CT-Segmentation-');
        cy.wait(3000);
    });

    it('Auto Test_Sample_Whale and Dolphin Classificaion 프로젝트 진입 및 실행', { tags: ['image'] }, () => {
        modelModule.visitRun(
            'https://modeler.deepphi.ai/modeler/16416',
            'Auto-Test-Sample-Whale-and-Dolphin-Classificaion-',
        );
        cy.wait(3000);
    });

    it('Auto Test_Sample_Car Segmentation 프로젝트 진입 및 실행', { tags: ['image'] }, () => {
        modelModule.visitRun('https://modeler.deepphi.ai/modeler/16377', 'Auto-Test-Sample-Car-Segmentation-', 10000);
        cy.wait(3000);
    });

    it('Auto Test_Sample_Brain Hemorrhage Classification 프로젝트 진입 및 실행', { tags: ['image'] }, () => {
        modelModule.visitRun(
            'https://modeler.deepphi.ai/modeler/16381',
            'Auto-Test-Sample-Brain-Hemorrhage-Classification-',
        );
        cy.wait(3000);
    });

    it('Auto Test_Fetal Head Circumference Segmentation 프로젝트 진입 및 실행', { tags: ['image'] }, () => {
        modelModule.visitRun(
            'https://modeler.deepphi.ai/modeler/16383',
            'Auto-Test-Fetal-Head-Circumference-Segmentation-',
        );
        cy.wait(3000);
    });

    afterEach('Status Fail', () => {
        if (Failure) {
            const ScreenshotFileName = `Module Run Test ${Cypress.env('DateLabel')}`;
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
        const TestRange = '1. 모듈 실행';

        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[${Cypress.env('EmailTitle')}][Prod] Module Run`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
