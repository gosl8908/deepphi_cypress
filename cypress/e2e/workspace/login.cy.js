const {
    loginModule,
    createModule,
    apiModule,
    emailModule,
    inferenceserviceModule,
    constantModule: c,
} = require('../module/manager.module.js');
describe('로그인', () => {
    let testFails = []; // 실패 원인을 저장할 변수
    let screenshots = []; // 스크린샷을 저장할 배열
    let FailTF = false;
    Cypress.on('fail', (err, runnable) => {
        const errMessage = err.message || '알 수 없는 이유로 실패함';
        !testFails.includes(errMessage) && testFails.push(errMessage);
        FailTF = true;
        throw err;
    });
    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId6'), Cypress.env('KangTestPwd'));
    });

    it('test', () => {
        createModule.createTestProject('이미지 평가 프로젝트 자동화 확인용');

        cy.log('프로젝트 실행');
        /* 프로젝트 Run */
        cy.get('.modeler-header__run-action-button > .btn').click({ force: true });
        cy.get('.modeler__status')
            .contains('실행', { timeout: 10 * 1000 })
            .should('be.visible');
        cy.get('.modeler__status')
            .contains('완료', { timeout: 360 * 1000 })
            .should('be.visible');
        cy.wait(3 * 1000);

        inferenceserviceModule.InferenceCreate();

        inferenceserviceModule.InferenceRun();

        /* 복사 버튼 대신 */
        cy.get('[style="width: calc(100% - 76px);word-break: break-all"]')
            .then($el => {
                return $el.text();
            })
            .then($e2 => {
                cy.get('.default-tab > ul > :nth-child(2) > button').click();
                cy.wait(5 * 1000);
                apiModule.api($e2, c.IMAGE);
                cy.get('.flex-auto').contains('성공', {
                    timeout: 15 * 1000,
                });
            });
    });
    afterEach('Status Fail', () => {
        cy.visit('https://www.deepphi.ai/user/my/inference');
        cy.wait(10000);

        //서비스 실행 중지 & 서비스 삭제
        if (cy.get('.card-content').contains('실행')) {
            cy.get(':nth-child(1) > :nth-child(11) > .btn').realClick();
            cy.wait(15000);
            cy.log('인퍼런스 서비스 - 중지');
            cy.get(':nth-child(1) > :nth-child(14) > .btn > .fa-solid').realClick();
            cy.wait(3000);
            cy.get('.btn-danger > .fa-solid').realClick();
            cy.contains('인퍼런스 서비스가 삭제되었습니다', { timeout: 15000 }).should('be.visible');
            cy.log('인퍼런스 서비스 - 삭제완료');
        } else {
            cy.log('에러 - 삭제할 프로젝트 없음');
        }
        if (FailTF) {
            const screenshotFileName = `Login Test ${Cypress.env('DateLabel')}`;
            cy.screenshot(screenshotFileName);
            screenshots.push(screenshotFileName);
            FailTF = false;
        }
    });
});
// after('Send Email', () => {
//   cy.visit(`${Cypress.env('Prod')}user/my/inference`);
//   cy.wait(5000);

//   /* 인퍼런스 삭제 */
//   cy.get('tr.ng-star-inserted > :nth-child(5)')
//   .eq(0)
//   .invoke('text')
//   .then((text) => {
//     // 텍스트가 "중지" 또는 "대기"인 경우
//     if (text.includes('중지') || text.includes('대기')) {
//       cy.log('현재 상태: 중지, 대기');
//       cy.get(':nth-child(1) > :nth-child(14) > .btn').invoke('click');
//     }
//   else if(text.includes('실행')) {
//       // 텍스트가 "실행"인 경우
//       cy.log('현재 상태: 실행');
//       cy.get(':nth-child(11) > .btn').invoke('click');
//       cy.wait(15000);
//       cy.get(':nth-child(1) > :nth-child(14) > .btn').invoke('click');
//     }
//   });
//   cy.get('.btn-danger').invoke('click'); // 삭제
//   cy.contains('인퍼런스 서비스가 삭제되었습니다.', { timeout: 30*1000 });

//   const testRange = '1. 로그인 ';

//   EmailModule.Email(
//     testFails,
//     `Login Test ${Cypress.env('EmailTitle')}`,
//     testRange,
//     screenshots,
//   );
// });

// createModule.createImageDataset('2D', 1, 1, '2D_CL_Case1', 'ImageDataset' + Cypress.env('DateLabel'));
// createModule.createRecordDataset('자동화용 데이터셋.csv', 'RecordDataset' + Cypress.env('DateLabel'));
// createModule.createRecordProject('RecordDataset' + Cypress.env('DateLabel'));
// datasetModule.settingImageDataset(1, '2D');
// datasetModule.settingRecordDataset();

//   cy.contains('마이 인퍼런스').click();

//   cy.wait(1000);

//   cy.get(':nth-child(1) > :nth-child(11) > .btn').click(); // 실행

//   cy.wait(10000);

//   cy.contains('보기').trigger('click', { force: true });

//   cy.wait(1000);

//   cy.get('[style="width: calc(100% - 76px);word-break: break-all"]').then(($el) => {

//     // 텍스트 추출
//     const text = $el.text();

//     Cypress.env('endpointText', text);
//     cy.log('확인된 endpointText 값:', Cypress.env('endpointText'));

//       });

//   cy.wait(1000);

//   cy.get('.default-tab > ul > :nth-child(2) > button').click(); // 예측 이력

//       // api 호출
//       cy.wait(30000);
//       recordApiModule.recordApi();
//       cy.contains('성공', { timeout: 60000 }).should('be.visible');
//       cy.screenshot('record_inference_api'+ Cypress.env('DateLabel'), 1920, 1080);
//       cy.get('.btn-clear-danger').click(); // 중지
//       cy.wait(10000);
