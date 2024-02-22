const {
    loginModule,
    createModule,
    modelModule,
    emailModule,
    functionModule: f,
} = require('../module/manager.module.js');

describe('Module Check Test', () => {
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
        loginModule.login(Cypress.env('Prod'), Cypress.env('AutoEmail'), Cypress.env('AutoPwd'));
        cy.wait(3000);
    });

    /* Process Module Check Test */
    it('2D 프로세싱 모듈 프로젝트 진입 및 확인', { tags: ['first'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/15977', '2D-Process-Module-Check-Result-', 20000);
        cy.wait(3000);
    });

    it('3D 프로세싱 모듈 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/16264', '3D-Process-Module-Check-Result-');
        cy.wait(3000);
    });

    /* AI Module Check Test */
    it('2D 분류 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/18296', '2D-Classification-Module-Check-Result-');
        cy.wait(3000);
    });

    it('3D 분류 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/15990', '3D-Classification-Module-Check-Result-');
        cy.wait(3000);
    });

    it('2D 분할 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/15963', '2D-Segmentation-Module-Check-Result-');
        cy.wait(3000);
    });

    it('3D 분할 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/15967', '3D-Segmentation-Module-Check-Result-');
        cy.wait(3000);
    });

    it('2D 탐지 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/15991', '2D-Detection-Module-Check-Result-');
        cy.wait(3000);
    });

    it('2D 변환 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/15965', '2D-Transformation-Module-Check-Result-');
        cy.wait(3000);
    });

    it('3D 변환 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/15969', '2D-Transformation-Module-Check-Result-');
        cy.wait(3000);
    });

    /* AI Template Project Check Test */
    it('Auto Test_Sample_Face Mask Segmentation 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/16385', 'Auto-Test-Sample-Face-Mask-Segmentation-');
        cy.wait(3000);
    });

    it('Auto Test_Sample_Hippocampus Detection 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/16382', 'Auto-Test-Sample-Hippocampus-Detection-');
        cy.wait(3000);
    });

    it('Auto Test_Sample_Hippocampus Detection 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck(
            'https://modeler.deepphi.ai/modeler/16378',
            'Auto-Test-Sample-Chest-Pneumonia-Classification-',
        );
        cy.wait(3000);
    });

    it('Auto Test_Sample_Lung CT Segmentation 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/16379', 'Auto-Test-Sample-Lung-CT-Segmentation-');
        cy.wait(3000);
    });

    it('Auto Test_Sample_Garbage Classification_분리수거 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck(
            'https://modeler.deepphi.ai/modeler/16380',
            'Auto-Test-Sample-Garbage-Classification-분리수거-',
        );
        cy.wait(3000);
    });

    it('Auto Test_Sample_Whale and Dolphin Classificaion 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck(
            'https://modeler.deepphi.ai/modeler/16416',
            'Auto-Test-Sample-Whale-and-Dolphin-Classificaion-',
        );
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

    it('Auto Test_Sample_Car Segmentation 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/16377', 'Auto-Test-Sample-Car-Segmentation-');
        cy.wait(3000);
    });

    it('Auto Test_Sample_Brain Hemorrhage Classification 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck(
            'https://modeler.deepphi.ai/modeler/16381',
            'Auto-Test-Sample-Brain-Hemorrhage-Classification-',
        );
        cy.wait(3000);
    });

    it('Auto-TestProject_Garbage Classification 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck('https://modeler.deepphi.ai/modeler/25542', 'Auto-TestProject-Garbage-Classification-');
        cy.wait(3000);
    });

    it('Auto Test_Fetal Head Circumference Segmentation 프로젝트 진입 및 확인', { tags: ['Second'] }, () => {
        modelModule.visitCheck(
            'https://modeler.deepphi.ai/modeler/16383',
            'Auto-Test-Fetal-Head-Circumference-Segmentation-',
        );
        cy.wait(3000);
    });

    afterEach('Status Fail', () => {
        if (FailTF) {
            const ScreenshotFileName = `Module Check Test ${Cypress.env('DateLabel')}`;
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
        const TestRange = '1. 모듈 실행 확인';

        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `Module Check Test ${Cypress.env('EmailTitle')}`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
