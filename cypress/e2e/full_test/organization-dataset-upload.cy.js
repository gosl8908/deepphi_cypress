const {
    loginModule,
    createModule,
    datasetModule,
    emailModule,
    constantModule: c,
    functionModule: f,
} = require('../module/manager.module.js');

describe('Organization Dataset Upload', () => {
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
        loginModule.login(Cypress.env('Prod'), Cypress.env('AutoTestId'), Cypress.env('KangTestPwd'));
    });

    it('Organization Image Dataset Upload', () => {
        cy.get('dd.ng-tns-c1-1').click();
        cy.get('.organization-changer__opener').click();
        cy.get('.organization-changer__list > ul > .ng-star-inserted').click();
        cy.wait(5 * 1000);

        createModule.createImageDataset({
            Dimension: '2D',
            LabelType: c.CLASSIFICATION,
            Structure: c.CASE1,
            FolderName: '2D_CL_Case1',
            Dataset: 'dataset.zip',
            // Label: 'Label.csv',
            Title: `ImageDataset${Cypress.env('DateLabel')}`,
        });
        datasetModule.settingImageDataset(1, '2D');
    });
    it('Organization Record Dataset Upload', () => {
        cy.get('dd.ng-tns-c1-1').click();
        cy.get('.organization-changer__opener').click();
        cy.get('.organization-changer__list > ul > .ng-star-inserted').click();
        cy.wait(5 * 1000);

        createModule.createRecordDataset({
            TrainFileName: '자동화용 데이터셋.csv',
            TestFileName: '자동화용 데이터셋.csv',
            ValidationFileName: '자동화용 데이터셋.csv',
            Title: `RecordDataset${Cypress.env('DateLabel')}`,
        });
        datasetModule.settingRecordDataset();
    });
    afterEach('Status Fail', () => {
        if (Failure) {
            const ScreenshotFileName = `Organization Dataset Upload/Organization Dataset Upload Test ${Cypress.env('DateLabel')}`;
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
        const TestRange =
            '1. 단체 이미지 데이터셋 업로드 2. 변환 3. 사용 용도 수정 4. 데이터셋에 파일 포함 5. 단체 레코드 데이터셋 업로드 6. 설정 완료';
        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[${Cypress.env('EmailTitle')}][Prod] Organization Dataset Upload`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});