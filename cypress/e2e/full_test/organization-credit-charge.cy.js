const { loginModule, emailModule, functionModule: f } = require('../module/manager.module.js');

describe('Organization Create', () => {
    let TestFails = []; // 실패 원인을 저장할 변수
    let Screenshots = []; // 스크린샷을 저장할 배열
    let Failure = false;
    Cypress.on('fail', (err, runnable) => {
        const ErrMessage = err.message || '알 수 없는 이유로 실패함';
        !TestFails.includes(ErrMessage) && TestFails.push(ErrMessage);
        Failure = true;
        throw err;
    });
    before(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('ProdAdmin'), Cypress.env('AdminId'), Cypress.env('AdminPwd'));
    });

    // 단체 크레딧 충전
    it('Organization Credit Charge', () => {
        cy.visit('https://admin.deepphi.ai/organization-management', { timeout: 30 * 1000 });
        /* 크레딧 충전 */
        cy.wait(3000);
        cy.get(':nth-child(2) > .form-control').type('자동화용 단체'); // 단체명 입력
        cy.get('.btn-navy').click(); // 검색
        cy.get(':nth-child(1) > :nth-child(7) > .btn').click(); // 충전
        cy.wait(5000); // 파라미터 값 불러오기
        cy.get('.btn-blue > span').click();
        cy.get(':nth-child(1) > .text-left > .display-block > .p-dropdown > .p-dropdown-label').click(); // 크레딧 타입
        cy.get(':nth-child(1) > .p-dropdown-item').click(); // 유료
        cy.get(':nth-child(2) > .text-left > .display-block > .p-dropdown > .p-dropdown-label').click(); // 사유
        cy.get(':nth-child(1) > .p-dropdown-item').click(); // 리워드 적립
        cy.get('.text-right > .display-block').type('100000'); // 금액 입력
        cy.get('.wrap--input-and-button > .p-calendar__width__custom > .p-calendar > .p-inputtext').click(); // 유효기간
        cy.get('.p-datepicker-today').click(); // Today
        cy.get('.text-left > .ng-untouched').type('test'); // 메모
        cy.get('.modal--btn-area > .btn-navy').click(); // 충전
        cy.get('.modal--btn-area > .btn-danger').click(); // 예
        cy.wait(3000);
        cy.contains('정상 충전되었습니다.'); // 충전 확인
        cy.get('admin-credit-alert-modal.ng-star-inserted > .modal--wrap > .modal--btn-area > .btn').click(); // 확인
        cy.wait(3000);
    });
    afterEach('Status Fail', () => {
        if (Failure) {
            const ScreenshotFileName = `Organization Credit Charge ${Cypress.env('DateLabel')}`;
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
        const TestRange = '1. 단체 크레딧 충전';
        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[${Cypress.env('EmailTitle')}][Prod] Organization Credit Charge`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
