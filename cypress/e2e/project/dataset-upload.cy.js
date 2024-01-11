const { loginModule, createModule, datasetModule, sendEmailModule } = require('../module/manager.module.js');

describe('Dataset Upload Test', () => {
    let testFail = ''; // 실패 원인을 저장할 변수

    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPasswd'));
    });

    it('Image Dataset Upload test', () => {
        cy.contains('이미지 데이터셋').click();
        createModule.createImageDataset('2D', 1, 1, '2D_CL_Case1', 'ImageDataset' + Cypress.env('DateLabel'));
        datasetModule.settingImageDataset(1, '2D');

        Cypress.on('fail', (err, runnable) => {
            testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });

    it('Record Dataset Upload test', () => {
        cy.contains('레코드 데이터셋').click();
        createModule.createRecordDataset('자동화용 데이터셋.csv', 'RecordDataset' + Cypress.env('DateLabel'));
        datasetModule.settingRecordDataset();

        Cypress.on('fail', (err, runnable) => {
            testFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });
    after('Send Email', () => {
        const screenshotFileName = `Dataset Upload Test/Dataset Upload Test ${Cypress.env('DateLabel')}`;
        const isTestFailed = Boolean(testFail);
        const testRange = '1. 이미지 데이터셋 업로드 2. 변환 3. 사용 용도 수정 4. 데이터셋에 파일 포함 5. 레코드 데이터셋 업로드 6. 설정 완료'

        sendEmailModule.sendEmail(
            isTestFailed,
            Cypress.env('Id'),
            `Dataset Upload Test ${Cypress.env('EmailTitle')}`,
            testRange,
            isTestFailed && screenshotFileName, testFail,
        );
    });
});
