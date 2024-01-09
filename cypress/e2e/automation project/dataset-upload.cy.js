const { loginModule, DatasetUploadModule, sendEmailModule } = require('../module/manager.module.js');

describe('Dataset Upload Test', () => {
    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPasswd'));
    });

    it('Image Dataset Upload test', () => {
        DatasetUploadModule.imageDataset(Cypress.env('DateLabel'), Cypress.env('DateLabel'));
    });

    it('Record Dataset Upload test', () => {
        DatasetUploadModule.recordDataset(Cypress.env('DateLabel'), Cypress.env('DateLabel'));

        const EmailBody = `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${Cypress.env(
            'DateLabelWeek',
        )}\n 테스트 범위 : 1. 이미지 데이터셋 업로드 2. 레코드 데이터셋 업로드`;

        sendEmailModule.sendEmail(
            undefined,
            Cypress.env('Id'),
            'Dataset Upload ' + Cypress.env('EmailTitle'),
            EmailBody,
            undefined,)
    });
});
