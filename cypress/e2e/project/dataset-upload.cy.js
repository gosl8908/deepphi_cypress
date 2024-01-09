const { loginModule, DatasetUploadModule, sendEmailModule } = require('../module/manager.module.js');

describe('Dataset Upload Test', () => {
    let testFailureReason = ''; // 실패 원인을 저장할 변수
    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPasswd'));
    });

    it('Image Dataset Upload test', () => {
        DatasetUploadModule.imageDataset(Cypress.env('DateLabel'), Cypress.env('DateLabel'));

        Cypress.on('fail', (err, runnable) => {
            testFailureReason = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });

    it('Record Dataset Upload test', () => {
        DatasetUploadModule.recordDataset(Cypress.env('DateLabel'), Cypress.env('DateLabel'));

        Cypress.on('fail', (err, runnable) => {
            testFailureReason = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
        });
    });
    after(() => {
        const screenshotFileName = `dataset-upload-failed ${Cypress.env('DateLabel')}`;
        const isTestFailed = Boolean(testFailureReason);

        const EmailBody = `Cypress 자동화 테스트 스위트가 ${isTestFailed ? '실패' : '성공'}하였습니다.
    테스트 실행 시간 : ${Cypress.env('DateLabelWeek')}
    테스트 범위 : 1. 이미지 데이터셋 업로드 2. 변환 3. 사용 용도 수정 4. 데이터셋에 파일 포함 5. 레코드 데이터셋 업로드 6. 설정 완료${
        isTestFailed
            ? `\n
    테스트 실패 원인: ${testFailureReason}`
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
