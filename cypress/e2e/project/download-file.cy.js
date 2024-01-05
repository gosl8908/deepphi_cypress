const { loginModule, sendEmailModule } = require('../module/manager.module.js');

describe('Download File Test', () => {
    let testFailureReason = ''; // 실패 원인을 저장할 변수
    before(() => {
        cy.setDateToEnv();
        cy.getAllCookies(); // 쿠키 삭제
        cy.getAllLocalStorage(); // 로컬 삭제
        cy.getAllSessionStorage(); // 세션 삭제
    });

    it('Download File Test', () => {
        loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPasswd'));

        /* 레코드 */
        cy.get('.search-box > .input-form').type('레코드 평가 프로젝트 자동화 확인용');
        cy.get('.search-box > .btn-primary').click();
        cy.get(':nth-child(1) > .dashboard-card__item--body > .title').click();
        cy.get('.flow__module--name').contains('자동화 데이터셋').click();
        cy.get('[placement="bottom"]').click();
        cy.get('.btn-primary').click();
        cy.contains('파일 압축이 완료되었습니다.', { timeout: 10000 }).should('be.visible'); // 데이터셋 데이터
        cy.contains('Data Cleansing2').click();
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

        /* 레코드 평가 */
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

        /* 이미지 */
        cy.get('.search-box > .input-form').type('이미지 평가 프로젝트 자동화 확인용');
        cy.get('.search-box > .btn-primary').click();
        cy.get(':nth-child(1) > .dashboard-card__item--body > .title').click();
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

        /* 이미지 평가 */
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
        cy.contains('바로가기', { timeout: 30000 }).should('be.visible');  // 인텔 인퍼런스 소스 코드
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

        /* 이미지 다운로드 확인 */
        cy.get('#site-map__flow-btn').click();
        cy.get('#my-page-menu-ul > :nth-child(4) > button').click();
        cy.get('.cpx-180').select('이미지 데이터');
        cy.get('.search-box > .input-form').type('자동화');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/자동화 데이터셋_2D_CL.*자동화 데이터셋_2D_CL/); // 데이터셋 이미지 / 데이터셋 이미지 평가
        cy.get('.cpx-180').select('학습 소스 코드');
        cy.get('.search-box > .input-form').clear();
        cy.get('.search-box > .btn-primary').click();
        cy.contains('Train_code'); // 인퍼런스 소스 코드
        cy.get('.cpx-180').select('인퍼런스 소스 코드');
        cy.contains(/IntelTestCode.*TensorTestCode/); // 학습 소스 코드
        cy.get('.cpx-180').select('엑셀 데이터');
        cy.get('.search-box > .input-form').type('Resize');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/Resize_Files.*Resize_Files/); // 이미지 프로세싱 파일 / 이미지 평가 프로세싱 파일
        cy.get('.search-box > .input-form').clear().type('DensNet121');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/DensNet121.*DensNet121.*DensNet121.*DensNet121.*DensNet121.*DensNet121/); // AI 이미지, AI 파일, AI 결과 / 평가 AI 이미지, AI 파일, AI 결과

        /* 레코드 다운로드 확인 */
        cy.get('.search-box > .input-form').clear().type('DNN-Classification');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/DNN-Classification.*DNN-Classification.*DNN-Classification.*DNN-Classification/); // AI 데이터, AI 결과 / 평가 AI 데이터, AI 결과
        cy.get('.search-box > .input-form').clear().type('레코드 평가 프로젝트');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/레코드 평가 프로젝트.*레코드 평가 프로젝트/); // 데이터셋 데이터 / 평가 데이터셋 데이터
        cy.get('.search-box > .input-form').clear().type('Data Cleansing');
        cy.get('.search-box > .btn-primary').click();
        cy.contains(/Data Cleansing.*Data Cleansing/); // 프로세싱 데이터 / 평가 프로세싱 데이터

        Cypress.on('fail', (err, runnable) => {
            testFailureReason = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
          });
    });
    after(() => {
        cy.visit('https://www.deepphi.ai/my-page/files');
        cy.wait(1000);
        for (let i = 0; i < 3; i++) {
            // 반복 3번
            cy.get('label > em').invoke('click');
            cy.wait(1000);
            cy.get('.file-item__control-panel > :nth-child(2) > .btn').invoke('click');
            cy.wait(1000);
            cy.get('.modal-button-content > .btn-danger').invoke('click');
            cy.contains('성공적으로 삭제되었습니다.', { timeout: 10000 });
            cy.wait(3000);
        };
        let screenshotFileName = `download-file-failed-test ${Cypress.env('DateLabel')}`;
            if (testFailureReason) {
                // 테스트 실패 시 스크린샷 찍기
                cy.screenshot(screenshotFileName)
                // 테스트 실패 시 이메일 전송
                const EmailBody = `Cypress 자동화 테스트 스위트가 실패하였습니다\n 테스트 실행 시간 : ${Cypress.env(
                  'DateLabelWeek',
                )}\n 테스트 범위 : 1. 레코드 프로젝트 파일 다운로드 2. 레코드 평가 프로젝트 파일 다운로드 3. 이미지 프로젝트 파일 다운로드 4. 이미지 평가 프로젝트 파일 다운로드\n\n테스트 실패 원인: ${testFailureReason}`;
                sendEmailModule.sendEmail(Cypress.env('Id'), 'Download File Test ' + Cypress.env('EmailTitle'), EmailBody, screenshotFileName);
            } else {
              // 테스트가 성공했을 때 이메일 전송
              const EmailBody = `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${Cypress.env(
                'DateLabelWeek',
              )}\n 테스트 범위 : 1. 레코드 프로젝트 파일 다운로드 2. 레코드 평가 프로젝트 파일 다운로드 3. 이미지 프로젝트 파일 다운로드 4. 이미지 평가 프로젝트 파일 다운로드`;
              sendEmailModule.sendEmail(Cypress.env('Id'), 'Download File Test ' + Cypress.env('EmailTitle'), EmailBody);
            }
  });
});
