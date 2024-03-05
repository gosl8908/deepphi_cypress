const {
    loginModule,
    createModule,
    datasetModule,
    emailModule,
    constantModule: c,
} = require('../module/manager.module.js');

describe('Dataset Upload test', () => {
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
        cy.log('로그인');
        loginModule.login(Cypress.env('Prod'), Cypress.env('Obs4TestId'), Cypress.env('ObsTestPwd'));
        cy.wait(3000);
    });

    it('2D_CL_Case1 Dataset Upload test', () => {
        // Image Dataset 업로드
        cy.log('Image Dataset 업로드');
        createModule.createImageDataset({
            Dimension: '2D',
            LabelType: c.CLASSIFICATION,
            Structure: c.CASE1,
            FolderName: '2D_CL_Case1',
            Dataset: 'Dataset.zip',
            Title: `2D_CL_Case1-${Cypress.env('DateLabel')}`,
        });
        cy.wait(5000);

        datasetModule.settingImageDataset(c.CLASSIFICATION, `2D_CL_Case1-${Cypress.env('DateLabel')}`);
    });

    it('2D_CL_Case2 Dataset Upload test', () => {
        // Image Dataset 업로드
        cy.log('Image Dataset 업로드');
        createModule.createImageDataset({
            Dimension: '2D',
            LabelType: c.CLASSIFICATION,
            Structure: c.CASE2,
            FolderName: '2D_CL_Case2',
            Dataset: 'Dataset.zip',
            Label: 'Label.csv',
            Title: `2D_CL_Case2-${Cypress.env('DateLabel')}`,
        });
        cy.wait(5000);

        datasetModule.settingImageDataset(c.CLASSIFICATION, `2D_CL_Case2-${Cypress.env('DateLabel')}`);
    });

    it('3D_CL_Case1 Dataset Upload test', () => {
        // Image Dataset 업로드
        cy.log('Image Dataset 업로드');
        createModule.createImageDataset({
            Dimension: '3D',
            LabelType: c.CLASSIFICATION,
            Structure: c.CASE1,
            FolderName: '3D_CL_Case1',
            Dataset: 'Dataset.zip',
            Title: `3D_CL_Case1-${Cypress.env('DateLabel')}`,
        });
        cy.wait(5000);

        datasetModule.settingImageDataset(c.CLASSIFICATION, `3D_CL_Case1-${Cypress.env('DateLabel')}`);
    });

    it('3D_CL_Case2 Dataset Upload test', () => {
        // Image Dataset 업로드
        cy.log('Image Dataset 업로드');
        createModule.createImageDataset({
            Dimension: '3D',
            LabelType: c.CLASSIFICATION,
            Structure: c.CASE2,
            FolderName: '3D_CL_Case2',
            Dataset: 'Dataset.zip',
            Label: 'Label.csv',
            Title: `3D_CL_Case2-${Cypress.env('DateLabel')}`,
        });
        cy.wait(5000);

        datasetModule.settingImageDataset(c.CLASSIFICATION, `3D_CL_Case2-${Cypress.env('DateLabel')}`);
    });

    it('2D_SE_Case1 Dataset Upload test', () => {
        // Image Dataset 업로드
        cy.log('Image Dataset 업로드');
        createModule.createImageDataset({
            Dimension: '2D',
            LabelType: c.SEGMENTATION,
            Structure: c.CASE1,
            FolderName: '2D_SE_Case1',
            Dataset: 'Dataset.zip',
            Label: 'Label.zip',
            Title: `2D_SE_Case1-${Cypress.env('DateLabel')}`,
        });
        cy.wait(5000);

        datasetModule.settingImageDataset(c.SEGMENTATION, `2D_SE_Case1-${Cypress.env('DateLabel')}`);
    });

    it('2D_SE_Case2 Dataset Upload test', () => {
        // Image Dataset 업로드
        cy.log('Image Dataset 업로드');
        createModule.createImageDataset({
            Dimension: '2D',
            LabelType: c.SEGMENTATION,
            Structure: c.CASE2,
            FolderName: '2D_SE_Case2',
            Dataset: 'Dataset.zip',
            Label: 'Label.zip',
            Title: `2D_SE_Case2-${Cypress.env('DateLabel')}`,
        });
        cy.wait(5000);

        datasetModule.settingImageDataset(c.SEGMENTATION, `2D_SE_Case2-${Cypress.env('DateLabel')}`);
    });

    it('3D_SE_Case1 Dataset Upload test', () => {
        // Image Dataset 업로드
        cy.log('Image Dataset 업로드');
        createModule.createImageDataset({
            Dimension: '3D',
            LabelType: c.SEGMENTATION,
            Structure: c.CASE1,
            FolderName: '3D_SE_Case1',
            Dataset: 'Dataset.zip',
            Label: 'Label.zip',
            Title: `3D_SE_Case1-${Cypress.env('DateLabel')}`,
        });
        cy.wait(5000);

        datasetModule.settingImageDataset(c.SEGMENTATION, `3D_SE_Case1-${Cypress.env('DateLabel')}`);
    });

    it('3D_SE_Case2 Dataset Upload test', () => {
        // Image Dataset 업로드
        cy.log('Image Dataset 업로드');
        createModule.createImageDataset({
            Dimension: '3D',
            LabelType: c.SEGMENTATION,
            Structure: c.CASE2,
            FolderName: '3D_SE_Case2',
            Dataset: 'Dataset.zip',
            Label: 'Label.zip',
            Title: `3D_SE_Case2-${Cypress.env('DateLabel')}`,
        });
        cy.wait(5000);

        datasetModule.settingImageDataset(c.SEGMENTATION, `3D_SE_Case2-${Cypress.env('DateLabel')}`);
    });

    it('2D_DE_Case1 Dataset Upload test', () => {
        // Image Dataset 업로드
        cy.log('Image Dataset 업로드');
        createModule.createImageDataset({
            Dimension: '2D',
            LabelType: c.DETECTION,
            Structure: c.CASE1,
            FolderName: '2D_DE_Case1',
            Dataset: 'Dataset.zip',
            Label: 'Label.zip',
            Title: `2D_DE_Case1-${Cypress.env('DateLabel')}`,
        });
        cy.wait(5000);

        datasetModule.settingImageDataset(c.DETECTION, `2D_DE_Case1-${Cypress.env('DateLabel')}`);
    });

    it('2D_TR_Case1 Dataset Upload test', () => {
        // Image Dataset 업로드
        cy.log('Image Dataset 업로드');
        createModule.createImageDataset({
            Dimension: '2D',
            LabelType: c.TRANSFORMATION,
            Structure: c.CASE1,
            FolderName: '2D_TR_Case1',
            Dataset: 'Dataset.zip',
            Label: 'Label.zip',
            Title: `2D_TR_Case1-${Cypress.env('DateLabel')}`,
        });
        cy.wait(5000);

        datasetModule.settingImageDataset(c.TRANSFORMATION, `2D_TR_Case1-${Cypress.env('DateLabel')}`);
    });

    it('2D_TR_Case2 Dataset Upload test', () => {
        // Image Dataset 업로드
        cy.log('Image Dataset 업로드');
        createModule.createImageDataset({
            Dimension: '2D',
            LabelType: c.TRANSFORMATION,
            Structure: c.CASE2,
            FolderName: '2D_TR_Case2',
            Dataset: 'Dataset.zip',
            Label: 'Label.zip',
            Title: `2D_TR_Case2-${Cypress.env('DateLabel')}`,
        });
        cy.wait(5000);

        datasetModule.settingImageDataset(c.TRANSFORMATION, `2D_TR_Case2-${Cypress.env('DateLabel')}`);
    });

    it('3D_TR_Case1 Dataset Upload test', () => {
        // Image Dataset 업로드
        cy.log('Image Dataset 업로드');
        createModule.createImageDataset({
            Dimension: '3D',
            LabelType: c.TRANSFORMATION,
            Structure: c.CASE1,
            FolderName: '3D_TR_Case1',
            Dataset: 'Dataset.zip',
            Label: 'Label.zip',
            Title: `3D_TR_Case1-${Cypress.env('DateLabel')}`,
        });
        cy.wait(5000);

        datasetModule.settingImageDataset(c.TRANSFORMATION, `3D_TR_Case1-${Cypress.env('DateLabel')}`);
    });

    it('3D_TR_Case2 Dataset Upload test', () => {
        // Image Dataset 업로드
        cy.log('Image Dataset 업로드');
        createModule.createImageDataset({
            Dimension: '3D',
            LabelType: c.TRANSFORMATION,
            Structure: c.CASE2,
            FolderName: '3D_TR_Case2',
            Dataset: 'Dataset.zip',
            Label: 'Label.zip',
            Title: `3D_TR_Case2-${Cypress.env('DateLabel')}`,
        });
        cy.wait(5000);

        datasetModule.settingImageDataset(c.TRANSFORMATION, `3D_TR_Case2-${Cypress.env('DateLabel')}`);
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
