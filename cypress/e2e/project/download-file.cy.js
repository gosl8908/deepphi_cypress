const { loginModule, EmailModule } = require('../module/manager.module.js');

describe('Download File Test', () => {
    let testFails = []; // 실패 원인을 저장할 변수
    let screenshots = []; // 스크린샷을 저장할 배열
    let FailTF = false;
    Cypress.on('fail', (err, runnable) => {
        const errMessage = err.message || '알 수 없는 이유로 실패함';
        !testFails.includes(errMessage) && testFails.push(errMessage);
        FailTF = true;
    });
    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId5'), Cypress.env('KangTestPwd'));
    });

    it('Image Project Download File Test', () => {
        /* 이미지 */
        cy.visit('https://modeler.deepphi.ai/modeler/39811');
        cy.get('.list-dropdown-wrap > .btn').click();
        cy.get('.list-dropdown > .ng-star-inserted > button').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 학습 소스 코드
        cy.contains('자동화 데이터셋_2D_CL').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 데이터셋 이미지
        cy.contains('Resize').click();
        cy.get('.bottom__head--control > :nth-child(1)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 프로세싱 파일
        cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 프로세싱 이미지
        cy.contains('DensNet121').click();
        cy.get('.bottom__head--control > :nth-child(1)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 파일
        cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 이미지
        cy.get('.tab-item--result > button').click();
        cy.get('.bottom__head--control > :nth-child(2)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 결과
    });

    it('Image Test Project Download File Test', () => {
        /* 이미지 평가 */
        cy.visit('https://modeler.deepphi.ai/modeler/39811');
        cy.get('.nav-project-left > ul > :nth-child(2) > button').click();
        cy.get('.clear-both > .btn').click();
        cy.get('.btn-primary').click();
        cy.wait(3000);
        cy.get(
            '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .btn > .fas',
        ).click();
        cy.contains('인퍼런스').click();
        cy.get('.modal-button-content > .btn').click();
        cy.get('.btn-primary').click();
        cy.get('#appName').type('IntelTestCode');
        cy.get('.btn-primary').click();
        cy.contains('바로가기', { timeout: 30000 }).should('be.visible'); // 인텔 인퍼런스 소스 코드
        cy.get('.btn-primary').click();
        cy.get(
            '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .btn > .fas',
        ).click();
        cy.contains('인퍼런스').click();
        cy.get('.modal-button-content > .btn').click();
        cy.get('#fileType').select('Inference App_Tensorflow');
        cy.get('.btn-primary').click();
        cy.get('#appName').type('TensorTestCode');
        cy.get('.btn-primary').click();
        cy.contains('바로가기', { timeout: 30000 }).should('be.visible'); // 텐서 인퍼런스 소스 코드
        cy.get('.btn-primary').click();
        cy.contains('자동화 데이터셋_2D_CL').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 데이터셋 이미지
        cy.contains('Resize').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 프로세싱 이미지
        cy.get('.bottom__head--control > :nth-child(1)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 프로세싱 파일
        cy.get('.flow__module--name').contains('DensNet121').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 이미지
        cy.get('.bottom__head--control > :nth-child(1)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 파일
        cy.get('.tab-item--result > button').click();
        cy.get('.bottom__head--control > :nth-child(2)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 결과
    });

    it('Record ProjectDownload File Test', () => {
        /* 레코드 */
        cy.visit('https://modeler.deepphi.ai/modeler/39813');
        cy.get('.flow__module--name').contains('자동화 데이터셋').click();
        cy.get('[placement="bottom"]').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 데이터셋 데이터
        cy.contains('Data Cleansing').click();
        cy.get('[placement="bottom"]').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 프로세싱 데이터
        cy.contains('DNN-Classification').click();
        cy.get('[placement="bottom"]').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 데이터
        cy.get('.tab-item--record-result > button').click();
        cy.get('.bottom__head--control > :nth-child(1)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 결과
    });

    it('Record Test Project Download File Test', () => {
        /* 레코드 평가 */
        cy.visit('https://modeler.deepphi.ai/modeler/39813');
        cy.get('.nav-project-left > ul > :nth-child(2) > button').click();
        cy.get('.clear-both > .btn').click();
        cy.get('.btn-primary').click();
        cy.wait(3000);
        cy.get('.flow__module--name').contains('자동화 데이터셋').click();
        cy.get('[placement="bottom"]').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 데이터셋 데이터
        cy.contains('Data Cleansing').click();
        cy.get('[placement="bottom"]').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 프로세싱 데이터
        cy.get('.flow__module--name').contains('DNN-Classification').click();
        cy.get('[placement="bottom"]').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 데이터
        cy.get('.tab-item--record-result > button').click();
        cy.get('.bottom__head--control > :nth-child(1)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // AI 결과
        cy.get('#site-map__flow-btn').click();
        cy.get('#project-menu-ul > :nth-child(1) > button').click();
    });

    it('Image Download File Check', () => {
        /* 이미지 다운로드 확인 */
        cy.visit(`${Cypress.env('Prod')}my-page/files`);
        cy.get('.cpx-180').select('이미지 데이터');
        cy.get('.search-box > .input-form').type('자동화 데이터셋_2D_CL');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/자동화 데이터셋_2D_CL.*자동화 데이터셋_2D_CL/, { timeout: 10 * 1000 }).should('be.visible'); // 데이터셋 이미지 / 데이터셋 이미지 평가
        cy.get('.cpx-180').select('학습 소스 코드');
        cy.get('.search-box > .input-form').clear();
        cy.get('.search-box > .btn-primary').click();
        cy.contains('Train_code'); // 인퍼런스 소스 코드
        cy.get('.cpx-180').select('인퍼런스 소스 코드');
        cy.contains(/Intel open vino.*Tensor flow/, { timeout: 60 * 1000 }).should('be.visible'); // 학습 소스 코드
        cy.get('.cpx-180').select('엑셀 데이터');
        cy.get('.search-box > .input-form').type('Resize');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/Resize_Files.*Resize_Files/, { timeout: 10 * 1000 }).should('be.visible'); // 이미지 프로세싱 파일 / 이미지 평가 프로세싱 파일
        cy.get('.search-box > .input-form').clear().type('DensNet121');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/DensNet121.*DensNet121.*DensNet121.*DensNet121.*DensNet121.*DensNet121/, {
            timeout: 10 * 1000,
        }).should('be.visible'); // AI 이미지, AI 파일, AI 결과 / 평가 AI 이미지, AI 파일, AI 결과
    });

    it('Record Download File Check', () => {
        /* 레코드 다운로드 확인 */
        cy.visit(`${Cypress.env('Prod')}my-page/files`);
        cy.get('.cpx-180').select('엑셀 데이터');
        cy.get('.search-box > .input-form').type('DNN-Classification');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/DNN-Classification.*DNN-Classification.*DNN-Classification.*DNN-Classification/, {
            timeout: 10 * 1000,
        }).should('be.visible'); // AI 데이터, AI 결과 / 평가 AI 데이터, AI 결과
        cy.get('.search-box > .input-form').clear().type('자동화 데이터셋');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/자동화 데이터셋.*자동화 데이터셋/, { timeout: 10 * 1000 }).should('be.visible'); // 데이터셋 데이터 / 평가 데이터셋 데이터
        cy.get('.search-box > .input-form').clear().type('Data Cleansing');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/Data Cleansing.*Data Cleansing/, { timeout: 10 * 1000 }).should('be.visible'); // 프로세싱 데이터 / 평가 프로세싱 데이터
    });

    afterEach('Status Fail', () => {
        if (FailTF) {
            const screenshotFileName = `Download File/Download File Test ${Cypress.env('DateLabel')}`;
            cy.screenshot(screenshotFileName);
            screenshots.push(screenshotFileName);
            FailTF = false;
        }
    });
    after('Send Email', () => {
        cy.visit(`${Cypress.env('Prod')}my-page/files`);
        cy.wait(1000);
        for (let i = 0; i < 5; i++) {
            // 반복 3번
            cy.get('label > em').invoke('click');
            cy.wait(1000);
            cy.get('.file-item__control-panel > :nth-child(2) > .btn').invoke('click');
            cy.wait(1000);
            cy.get('.modal-button-content > .btn-danger').invoke('click');
            cy.contains('성공적으로 삭제되었습니다.', { timeout: 20000 });
            cy.wait(3000);
        }
        const testRange =
            '1. 레코드 프로젝트 파일 다운로드 2. 레코드 평가 프로젝트 파일 다운로드 3. 이미지 프로젝트 파일 다운로드 4. 이미지 평가 프로젝트 파일 다운로드';

            EmailModule.Email(
            testFails,
            Cypress.env('AdminId'),
            `Download File Test ${Cypress.env('EmailTitle')}`,
            testRange,
            screenshots,
        );
    });
});
