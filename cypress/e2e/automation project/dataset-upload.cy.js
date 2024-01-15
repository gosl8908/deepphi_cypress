const { loginModule, createModule, datasetModule, sendEmailModule } = require('../module/manager.module.js');

describe('Dataset Upload Test', () => {
    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPwd'));
    });

    it('Image Dataset Upload test', () => {
        cy.contains('이미지 데이터셋').click();
        cy.wait(3000);
            createModule.createImageDataset('2D', 1, 1, '2D_CL_Case1', 'ImageDataset' + Cypress.env('DateLabel'));
                datasetModule.settingImageDataset(1, '2D');
    });

    it('Record Dataset Upload test', () => {
        cy.contains('레코드 데이터셋').click();
        cy.wait(3000);
            createModule.createRecordDataset('자동화용 데이터셋.csv', '자동화용 데이터셋.csv', '자동화용 데이터셋.csv', 'RecordDataset' + Cypress.env('DateLabel'));
                datasetModule.settingRecordDataset();

                const testRange = '1. 이미지 데이터셋 업로드 2. 레코드 데이터셋 업로드';

        sendEmailModule.sendEmail(
            undefined,
            Cypress.env('Id'),
            'Dataset Upload ' + Cypress.env('EmailTitle'),
            testRange,
            undefined,
            undefined,)
    });
});
