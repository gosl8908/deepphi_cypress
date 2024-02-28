const { loginModule, emailModule, functionModule: f } = require('../module/manager.module.js');

describe('Onprem Download File Test', () => {
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
        loginModule.login(Cypress.env('Onprem'), Cypress.env('OnpremId7'), Cypress.env('KangTestPwd'));
    });

    it('Image Project Download File Test', () => {
        /* 이미지 */
        cy.visit('https://onprem-modeler.deepphi.ai/modeler/36212');
        cy.wait(10 * 1000);
        cy.get('.list-dropdown-wrap > .btn').click();
        cy.get('.list-dropdown > .ng-star-inserted > button').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // 학습 소스 코드
        cy.wait(3 * 1000);
        cy.contains('자동화 데이터셋_2D_CL').click();
        cy.wait(5 * 1000);
        cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // 데이터셋 이미지
        cy.wait(3 * 1000);
        cy.contains('Resize').click();
        cy.get('.bottom__head--control > :nth-child(1)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // 프로세싱 파일
        cy.wait(3 * 1000);
        cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // 프로세싱 이미지
        cy.wait(3 * 1000);
        cy.contains('DensNet121').click();
        cy.get('.bottom__head--control > :nth-child(1)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // AI 파일
        cy.wait(3 * 1000);
        cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // AI 이미지
        cy.wait(3 * 1000);
        cy.get('.tab-item--result > button').click();
        cy.get('.bottom__head--control > :nth-child(2)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // AI 결과
        cy.wait(5 * 1000);
    });

    it('Image Test Project Download File Test', () => {
        /* 이미지 평가 */
        cy.visit('https://onprem-modeler.deepphi.ai/modeler/36212?testId=36685&loadedProjectPage=1');
        cy.wait(10 * 1000);
        cy.get('.modeler__nav > ul > .ng-star-inserted > button > .fa-diagram-project').click();
        for (let i = 0; i < 6; i++) {
            cy.get('.default-container').then(cardContent => {
                const Card = !cardContent.text().includes('학습 모드로 이동');
                if (Card) {
                    cy.get('[title="Next"]').click();
                    cy.wait(3 * 1000);
                } else {
                    // 특정 텍스트가 발견되면 반복문 종료
                    return false;
                }
            });
        }
        cy.get(
            '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .btn > .fas',
        ).click();
        cy.get(
            '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .list-dropdown',
        )
            .contains('인퍼런스')
            .click();
        cy.get('.modal-button-content > .btn').click();
        cy.get('.btn-primary').click();
        cy.get('#appName').type('IntelTestCode');
        cy.get('.btn-primary').click();
        cy.contains('바로가기', { timeout: 30000 }).should('be.visible'); // 인텔 인퍼런스 소스 코드
        cy.get('.btn-primary').click();
        cy.get(
            '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .btn > .fas',
        ).click();
        cy.get(
            '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .list-dropdown',
        )
            .contains('인퍼런스')
            .click();
        cy.get('.modal-button-content > .btn').click();
        cy.get('#fileType').select('Inference App_Tensorflow');
        cy.get('.btn-primary').click();
        cy.get('#appName').type('TensorTestCode');
        cy.get('.btn-primary').click();
        cy.contains('바로가기', { timeout: 30000 }).should('be.visible'); // 텐서 인퍼런스 소스 코드
        cy.get('.btn-primary').click();
        cy.contains('자동화 데이터셋_2D_CL').click();
        cy.wait(5 * 1000);
        cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // 데이터셋 이미지
        cy.wait(3 * 1000);
        cy.contains('Resize').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // 프로세싱 이미지
        cy.wait(3 * 1000);
        cy.get('.bottom__head--control > :nth-child(1)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // 프로세싱 파일
        cy.wait(3 * 1000);
        cy.get('.flow__module--name').contains('DensNet121').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .btn').click();
        cy.get('.bottom__head--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // AI 이미지
        cy.wait(3 * 1000);
        cy.get('.bottom__head--control > :nth-child(1)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // AI 파일
        cy.wait(3 * 1000);
        cy.get('.tab-item--result > button').click();
        cy.get('.bottom__head--control > :nth-child(2)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // AI 결과
        cy.wait(5 * 1000);
    });

    it('Image Download File Check', () => {
        /* 이미지 다운로드 확인 */
        cy.visit(`${Cypress.env('Onprem')}organization/download-file`, { timeout: 60 * 1000 });
        cy.wait(10 * 1000);
        cy.get('.cpx-180').select('이미지 데이터');
        cy.get('.search-box > .input-form').type('자동화 데이터셋_2D_CL');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/자동화 데이터셋_2D_CL.*자동화 데이터셋_2D_CL/, { timeout: 10 * 1000 }).should('be.visible'); // 데이터셋 이미지 / 데이터셋 이미지 평가
        cy.get('.search-box > .input-form').clear().type('DensNet121');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/DensNet121.*DensNet121/, { timeout: 10 * 1000 }).should('be.visible'); // AI 이미지 / 평가 AI 이미지
        cy.get('.search-box > .input-form').clear().type('DensNet121');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/DensNet121.*DensNet121/, { timeout: 10 * 1000 }).should('be.visible'); // AI 이미지 / 평가 AI 이미지
        cy.get('.cpx-180').select('학습 소스 코드');
        cy.get('.search-box > .input-form').clear();
        cy.get('.search-box > .btn-primary').click();
        cy.contains('Train_code'); // 인퍼런스 소스 코드
        cy.get('.cpx-180').select('인퍼런스 소스 코드');
        cy.contains('IntelTestCode', { timeout: 60 * 1000 }).should('be.visible'); // 학습 소스 코드
        cy.contains('TensorTestCode', { timeout: 60 * 1000 }).should('be.visible'); // 학습 소스 코드
        cy.get('.cpx-180').select('엑셀 데이터');
        cy.get('.search-box > .input-form').type('Resize');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/Resize_Files.*Resize_Files/, { timeout: 10 * 1000 }).should('be.visible'); // 이미지 프로세싱 파일 / 이미지 평가 프로세싱 파일
        cy.get('.search-box > .input-form').clear().type('DensNet121');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/DensNet121.*DensNet121.*DensNet121.*DensNet121/, {}).should('be.visible'); // AI 파일, AI 결과 / AI 파일, AI 결과
        cy.wait(3 * 1000);
    });

    it('Image Download File Delete', () => {
        // 이미지 다운로드 파일 삭제
        cy.visit(`${Cypress.env('Onprem')}organization/download-file`, { timeout: 60 * 1000 });
        cy.wait(10 * 1000);

        for (let i = 0; i < 6; i++) {
            cy.get('.lnb--right-content__container').then(cardContent => {
                const NotFound = !cardContent.text().includes('검색 결과가 없습니다.');
                if (NotFound) {
                    cy.wait(5 * 1000);
                    cy.get('label > em').invoke('click');
                    cy.wait(1000);
                    cy.get('.file-item__control-panel > :nth-child(2) > .btn').invoke('click');
                    cy.wait(1000);
                    cy.get('.modal-button-content > .btn-danger').invoke('click');
                    cy.contains('성공적으로 삭제되었습니다.', { timeout: 20000 });
                    cy.wait(3000);
                } else {
                    // 특정 텍스트가 발견되면 반복문 종료
                    return false;
                }
            });
        }
    });

    it('Record ProjectDownload File Test', () => {
        /* 레코드 */
        cy.visit('https://onprem-modeler.deepphi.ai/modeler/36210');
        cy.wait(10 * 1000);
        cy.get('.flow__module--name').contains('자동화 데이터셋').click();
        cy.wait(5 * 1000);
        cy.get('[placement="bottom"]').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // 데이터셋 데이터
        cy.wait(3 * 1000);
        cy.contains('Data Cleansing').click();
        cy.get('[placement="bottom"]').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // 프로세싱 데이터
        cy.wait(3 * 1000);
        cy.contains('DNN-Classification').click();
        cy.get('[placement="bottom"]').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // AI 데이터
        cy.wait(3 * 1000);
        cy.get('.tab-item--record-result > button').click();
        cy.get('.bottom__head--control > :nth-child(1)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // AI 결과
        cy.wait(5 * 1000);
    });

    it('Record Test Project Download File Test', () => {
        /* 레코드 평가 */
        cy.visit('https://onprem-modeler.deepphi.ai/modeler/36210?testId=36686&loadedProjectPage=1');
        cy.wait(10 * 1000);
        cy.get('.flow__module--name').contains('자동화 데이터셋').click();
        cy.wait(5 * 1000);
        cy.get('[placement="bottom"]').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // 데이터셋 데이터
        cy.wait(3 * 1000);
        cy.contains('Data Cleansing').click();
        cy.get('[placement="bottom"]').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // 프로세싱 데이터
        cy.wait(3 * 1000);
        cy.get('.flow__module--name').contains('DNN-Classification').click();
        cy.get('[placement="bottom"]').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // AI 데이터
        cy.wait(3 * 1000);
        cy.get('.tab-item--record-result > button').click();
        cy.get('.bottom__head--control > :nth-child(1)').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10 * 1000 }).should('be.visible'); // AI 결과
        cy.wait(5 * 1000);
    });

    it('Record Inference Service Download Prediction Results', () => {
        /* 인퍼런스 서비스 예측 이력 다운로드 */
        cy.visit(`${Cypress.env('Onprem')}organization/inference`, { timeout: 60 * 1000 });
        cy.wait(10 * 1000);
        cy.get('.search-box > .input-form').type('prediction-results');
        cy.get('.btn-primary').click();
        cy.get('.table-layout > tbody > .ng-star-inserted:nth-child(1) > td:nth-child(13) > .btn').click();
        cy.wait(5 * 1000);
        cy.get('.clear-box > .default-tab > ul > li:nth-child(2) > button').click();
        cy.wait(5 * 1000);
        cy.contains('보기', { timeout: 10 * 1000 });
        cy.get('.table-layout > tbody > .ng-star-inserted > td > .btn').click();
        cy.wait(5 * 1000);
        cy.get('.lnb--right-content__container > .ng-star-inserted > .flex-display > div > .btn-default').click();
        cy.get('.modal-back > .modal-wrap > .modal-container > .modal-button-content > .btn-primary').click();
        cy.wait(3 * 1000);
    });

    it('Record Download File Check', () => {
        /* 레코드 다운로드 확인 */
        cy.visit(`${Cypress.env('Onprem')}organization/download-file`, { timeout: 60 * 1000 });
        cy.wait(10 * 1000);
        cy.get('.search-box > .input-form').type('prediction-results');
        cy.get('.search-box > .btn-primary').click();
        cy.contains('prediction-results', { timeout: 10 * 1000 }).should('be.visible'); // 인퍼런스 서비스 예측 결과
        cy.get('.ng-star-inserted > .search-box__container > .search-fix > .search-box > .btn:nth-child(3)').click();
        cy.get('.cpx-180').select('엑셀 데이터');
        cy.get('.search-box > .input-form').type('DNN-Classification');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/DNN-Classification.*DNN-Classification.*DNN-Classification.*DNN-Classification/, {
            timeout: 30 * 1000,
        }).should('be.visible'); // AI 데이터, AI 결과 / 평가 AI 데이터, AI 결과
        cy.get('.search-box > .input-form').clear().type('자동화 데이터셋');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/자동화 데이터셋.*자동화 데이터셋/, { timeout: 10 * 1000 }).should('be.visible'); // 데이터셋 데이터 / 평가 데이터셋 데이터
        cy.get('.search-box > .input-form').clear().type('Data Cleansing');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/Data Cleansing.*Data Cleansing/, { timeout: 10 * 1000 }).should('be.visible'); // 프로세싱 데이터 / 평가 프로세싱 데이터
        cy.wait(3 * 1000);
    });

    it('Record Download File Delete', () => {
        // 레코드 다운로드 파일 삭제
        cy.visit(`${Cypress.env('Onprem')}organization/download-file`, { timeout: 60 * 1000 });
        cy.wait(10 * 1000);

        for (let i = 0; i < 6; i++) {
            cy.get('.lnb--right-content__container').then(cardContent => {
                const NotFound = !cardContent.text().includes('검색 결과가 없습니다.');
                if (NotFound) {
                    cy.wait(5 * 1000);
                    cy.get('label > em').invoke('click');
                    cy.wait(1000);
                    cy.get('.file-item__control-panel > :nth-child(2) > .btn').invoke('click');
                    cy.wait(1000);
                    cy.get('.modal-button-content > .btn-danger').invoke('click');
                    cy.contains('성공적으로 삭제되었습니다.', { timeout: 20000 });
                    cy.wait(3000);
                } else {
                    // 특정 텍스트가 발견되면 반복문 종료
                    return false;
                }
            });
        }
    });

    afterEach('Status Fail', () => {
        if (FailTF) {
            const ScreenshotFileName = `Download File Test ${Cypress.env('DateLabel')}`;
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
            '1. 레코드 프로젝트 파일 다운로드 2. 레코드 평가 프로젝트 파일 다운로드 3. 인퍼런스 서비스 예측 이력 다운로드 4. 이미지 프로젝트 파일 다운로드 5. 이미지 평가 프로젝트 파일 다운로드';
        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[Onprem] Download File Test ${Cypress.env('EmailTitle')}`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
