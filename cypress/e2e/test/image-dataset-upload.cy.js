const { loginModule, createModule, datasetModule, constantModule: c } = require('../module/manager.module.js');

describe('Dataset Upload test', () => {
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
});
