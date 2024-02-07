const {
    loginModule,
    createModule,
    datasetModule,
    emailModule,
    constantModule: c,
    functionModule: f,
} = require('../module/manager.module.js');

describe('Dataset Upload Test', () => {
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
        loginModule.login(Cypress.env('Onprem'), Cypress.env('OnpremId'), Cypress.env('KangTestPwd'));
    });

    it('Image Dataset Upload test', () => {
        cy.get('.gnb__nav > ul > :nth-child(1) > button').contains('데이터셋').click();
        cy.wait(3 * 1000);

        /* 이미지 데이터셋 업로드 */
        cy.contains('이미지 데이터셋 업로드').click({ force: true }); // 데이터셋 업로드 화면 진입
        cy.wait(5000);
        createModule.createImageDataset({
            Dimension: '2D',
            LabelType: c.CLASSIFICATION,
            Structure: c.CASE1,
            FolderName: '2D_CL_Case1',
            Dataset: 'dataset.zip',
            // Label: 'Label.csv',
            Title: `ImageDataset${Cypress.env('DateLabel')}`,
        });

        /* 이미지 데이터셋 세팅 */
        datasetModule.settingImageDataset(c.CLASSIFICATION, '2D', 'Onprem');
    });

    it('Record Dataset Upload test', () => {
        cy.get('.gnb__nav > ul > :nth-child(1) > button').contains('데이터셋').click();
        cy.wait(3 * 1000);

        /* 레코드 데이터셋 업로드 */
        cy.contains('레코드 데이터셋 업로드').click({ force: true }); // 데이터셋 업로드 화면 진입
        cy.wait(5000);
        createModule.createRecordDataset({
            TrainFileName: '자동화용 데이터셋.csv',
            TestFileName: '자동화용 데이터셋.csv',
            ValidationFileName: '자동화용 데이터셋.csv',
            Title: `RecordDataset${Cypress.env('DateLabel')}`,
            Site: 'Onprem',
        });

        /* 레코드 데이터셋 세팅 */
        cy.get('.default-tab > ul > :nth-child(2) > button').click();
        datasetModule.settingRecordDataset('Onprem');
    });
    afterEach('Status Check', () => {
        if (FailTF) {
            const ScreenshotFileName = `Dataset Upload Test ${Cypress.env('DateLabel')}`;
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
        const TestRange =
            '1. 이미지 데이터셋 업로드 2. 변환 3. 사용 용도 수정 4. 데이터셋에 파일 포함 5. 레코드 데이터셋 업로드 6. 설정 완료';

        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `Dataset Upload Test ${Cypress.env('EmailTitle')}`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
