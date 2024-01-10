const { loginModule, createModule, datasetModule, sendEmailModule } = require('../module/manager.module.js');

describe('Dataset Upload Test', () => {
    let imageDatasetUploadTestFail = ''; // 실패 원인을 저장할 변수
    let recordDatasetUploadTestFail = ''; // 실패 원인을 저장할 변수
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
            imageDatasetUploadTestFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });

    it('Record Dataset Upload test', () => {
        cy.contains('레코드 데이터셋').click();
        createModule.createRecordDataset('자동화용 데이터셋.csv', 'RecordDataset' + Cypress.env('DateLabel'));
        datasetModule.settingRecordDataset();

        Cypress.on('fail', (err, runnable) => {
            recordDatasetUploadTestFail = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });
    after(() => {
        const screenshotFileName = `dataset-upload-failed ${Cypress.env('DateLabel')}`;
        const isTestFailed = Boolean(imageDatasetUploadTestFail, recordDatasetUploadTestFail);

        const EmailBody = `Cypress 자동화 테스트 스위트가 ${isTestFailed ? '실패' : '성공'}하였습니다.
    테스트 실행 시간 : ${Cypress.env('DateLabelWeek')}
    테스트 범위 : 1. 이미지 데이터셋 업로드 2. 변환 3. 사용 용도 수정 4. 데이터셋에 파일 포함 5. 레코드 데이터셋 업로드 6. 설정 완료${
        isTestFailed
            ? `\n
    테스트 실패 원인: 
    ${imageDatasetUploadTestFail ? 'Image Dataset Upload Test: ' + imageDatasetUploadTestFail + '\n' : ''}
    ${recordDatasetUploadTestFail ? 'Record Dataset Upload Test: ' + recordDatasetUploadTestFail + '\n' : ''}`
            : ''
    }`;

        sendEmailModule.sendEmail(
            isTestFailed,
            Cypress.env('Id'),
            `Dataset Upload Test ${Cypress.env('EmailTitle')}`,
            EmailBody,
            isTestFailed && screenshotFileName,
        );
    });
});
