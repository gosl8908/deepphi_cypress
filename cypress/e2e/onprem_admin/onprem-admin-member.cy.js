const { loginModule, emailModule, functionModule: f } = require('../module/manager.module.js');

describe('Member Test', () => {
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
        loginModule.login(Cypress.env('Onprem'), Cypress.env('OnpremAdminId'), Cypress.env('OnpremAdminPwd'));
        cy.wait(3000);

        /* 관리자 페이지 진입 */
        cy.get('.gnb__sub-nav > .ng-star-inserted > button').click();
        cy.wait(3 * 1000);
    });

    it('Member Search', () => {
        cy.get('.nav-button > button').click();
        cy.contains(/^멤버$/).click();
        cy.wait(3 * 1000);

        cy.get('.search-box__list > li:nth-child(1)').click();
        cy.contains('강제탈퇴').click();
        cy.get('.search-box__list > li:nth-child(2)').click();
        cy.contains('일반회원').click();
        cy.get('.search-box__list > li:nth-child(3)').click();
        cy.contains('그룹 관리자').click();
        cy.get('.search-box__list > li:nth-child(4)').type('0117');
        cy.get('.search-box__list > li:nth-child(5)').type('onprem240117@ruu.kr');
        cy.get('.search-box__list > li:nth-child(6)').type('add');

        cy.contains('검색').click();
        cy.wait(3 * 1000);

        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(2)').contains('강제탈퇴');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(3)').contains('일반회원');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(4)').contains('그룹 관리자');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(5)').contains('qwer');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(6)').contains('onprem240117@ruu.kr');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(7)').contains('0117');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(8)').contains('add');

        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(9) > .btn').click();

        cy.contains('뒤로').click();
        cy.contains('멤버 등록');
    });

    it('Member Add And Sign Off On', () => {
        const IdText = `optest_${Cypress.env('DateLabel')}`;

        cy.get('.nav-button > button').click();
        cy.contains(/^멤버$/).click();
        cy.wait(3 * 1000);

        cy.contains('멤버 등록').click();

        cy.get('#member-id').type(`${IdText}@ruu.kr`, { force: true });
        cy.wait(5 * 1000);
        cy.get(':nth-child(1) > :nth-child(2) > .flex-form > .btn').click(); // 아이디 중복 검사
        cy.contains('사용 가능한 이메일입니다.'); // 이메일 중복 팝업 확인
        cy.get('.alert-popup__button > .btn').click(); // 팝업 확인
        cy.get('#member-pw').type(Cypress.env('OnpremTestPwd'));
        cy.get('#member-pw-confirm').type(Cypress.env('OnpremTestPwd'));
        cy.get('#member-name').type(IdText);
        cy.get('#member-nickname').type(IdText);
        cy.wait(5 * 1000);
        cy.get(':nth-child(5) > :nth-child(2) > .flex-form > .btn').click(); // 닉네임 중복 검사
        cy.contains('사용 가능한 닉네임입니다.'); // 닉네임 중복 팝업 확인
        cy.get('.alert-popup__button > .btn').click(); // 팝업 확인
        cy.wait(3 * 1000);

        cy.get('.modal__button > .btn').click();
        cy.wait(3 * 1000);

        cy.get('.nav-button > button').click();
        cy.contains('멤버 승인').click();
        cy.wait(3 * 1000);

        cy.contains(IdText);

        cy.get(':nth-child(1) > :nth-child(5) > .btn-gray').click();
        cy.contains('거절이 완료되었습니다.', { timeout: 3 * 1000 });

        cy.get('.nav-button > button').click();
        cy.contains(/^멤버$/).click();
        cy.wait(3 * 1000);

        cy.get('.search-box__list > li:nth-child(5)').type(`${IdText}@ruu.kr`);
        cy.contains('검색').click();
        cy.wait(3 * 1000);

        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(9) > .btn').click();
        cy.wait(3 * 1000);

        cy.get(':nth-child(1) > :nth-child(2) > .display-block > .p-dropdown > .p-dropdown-label').click();
        cy.contains('승인대기').click();
        cy.contains('저장').click();

        cy.contains('변경 내역이 저장됐습니다.', { timeout: 3 * 1000 });

        cy.get('.nav-button > button').click();
        cy.contains('멤버 승인').click();
        cy.wait(3 * 1000);

        cy.get(':nth-child(1) > :nth-child(5) > .btn-primary').click();
        cy.contains('승인이 완료되었습니다.', { timeout: 3 * 1000 });

        cy.get('.nav-button > button').click();
        cy.contains(/^멤버$/).click();
        cy.wait(3 * 1000);

        cy.get('.search-box__list > li:nth-child(5)').type(`${IdText}@ruu.kr`);
        cy.contains('검색').click();
        cy.wait(3 * 1000);

        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(2)').contains('활동중');

        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(9) > .btn').click();
        cy.wait(3 * 1000);

        cy.get(':nth-child(1) > :nth-child(2) > .display-block > .p-dropdown > .p-dropdown-label').click();
        cy.contains('강제탈퇴').click();
        cy.contains('저장').click();

        cy.contains('변경 내역이 저장됐습니다.', { timeout: 3 * 1000 });

        cy.contains('뒤로').click();

        // cy.get('.search-box__list > li:nth-child(5)').type(`${IdText}@ruu.kr`);
        // cy.contains('검색').click();
        cy.wait(3 * 1000);

        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(2)').contains('강제탈퇴');
    });

    afterEach('Status Fail', () => {
        if (Failure) {
            const ScreenshotFileName = `Admin Member Test ${Cypress.env('DateLabel')}`;
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
        const TestRange = '1. 멤버 검색 2. 멤버 상세 페이지 3. 멤버 추가 4. 멤버 거절 5. 멤버 승인';

        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[${Cypress.env('EmailTitle')}][Onprem][Admin] Member`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
