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
        loginModule.login(Cypress.env('Prod'), Cypress.env('AutoTestId'), Cypress.env('KangTestPwd'));
    });

    it('Organization Create', () => {
        cy.visit('https://www.deepphi.ai/my-page/profile', { timeout: 30 * 1000 });
        cy.wait(5 * 1000);

        cy.get('.card-content').then(btn => {
            const Delete = btn.text().includes('단체삭제');
            if (Delete) {
                cy.get(':nth-child(8) > .btn').click(); // 단체 삭제
                cy.get('#organization_confirm').type('자동화용 단체'); // 단체명 입력
                cy.get('.modal-button-content > .btn-danger').click(); // 삭제
                cy.wait(3000);
            }
        });

        // 단체 생성
        cy.get('.flex-display > :nth-child(2) > .btn').click(); // 단체 생성
        cy.get('#organization_select').select('기타'); // 분류 선택
        cy.get('#organization_name').type('자동화용 단체'); // 단체명 입력
        cy.get('.flex-display > .btn-wrap > .btn').click(); // 체크
        cy.get('.modal-button-content > .btn-primary').click(); // 생성
        cy.wait(3000);
        cy.contains('단체 생성이 완료되었습니다.'); // 단체 생성 완료 확인
        cy.get('.modal-button-content > .btn').click(); // 확인
        cy.wait(5000);

        // 멤버 초대
        cy.get(':nth-child(6) > button').click(); // 멤버
        cy.get('.dashboard__header--control > .btn').click(); // 초대
        cy.get('#group_new_manager_email').type('deeptest2@deepnoid.com'); // 이메일 입력
        cy.get('.flex-display > .btn-primary').click(); // 추가
        cy.get('.page-button > .btn-primary').click(); // 초대
        cy.get('.btn-close > .fa-solid').click(); // 완료 팝업 X

        // 그룹 생성
        cy.get(':nth-child(2) > .left-navigation--sub-navi > :nth-child(1) > button > span').click(); // 그룹 관리
        cy.get('.dashboard__header--control > .btn').click(); // 그룹 생성
        cy.get('#group_name').type('그룹2'); // 그룹명 입력
        cy.get(':nth-child(2) > dd > .flex-display > .btn').click(); // 그룹명 체크
        cy.get('#group_manager_email').type('deeptest2@deepnoid.com'); // 그룹 관리자 입력
        cy.get(':nth-child(3) > dd > .flex-display > .btn').click(); // 그룹 관리자 체크
        cy.get('.modal-button-content > .btn-primary').click(); // 생성
        cy.wait(3000);

        // 그룹 멤버 초대
        cy.get(':nth-child(6) > button').eq(0).click(); // 멤버
        cy.get('.dashboard__header--control > .btn').click(); // 초대
        cy.get('#group_new_manager_email').type('deeptest3@deepnoid.com'); // 이메일 입력
        cy.get('.flex-display > .btn-primary').click(); // 추가
        cy.get(':nth-child(2) > .input-form').select('그룹2'); // 그룹 선택
        cy.get('.page-button > .btn-primary').click(); // 초대
        cy.get('.btn-close > .fa-solid').click(); // 완료 팝업 X

        // 그룹 관리자 변경
        cy.get(':nth-child(2) > .left-navigation--sub-navi > :nth-child(1) > button > span').click(); // 그룹 관리
        cy.get(':nth-child(7) > .btn').click(); // 관리자 변경
        cy.get('#group_new_manager_email').type('deeptest3@deepnoid.com'); // 새로운 그룹 관리자 입력
        cy.get('.modal-button-content > .btn-primary').click(); // 확인
        cy.contains('deeptest3'); // 관리자 변경 확인

        // 그룹 삭제
        cy.get(':nth-child(8) > .btn').click(); // 삭제 선택
        cy.get('#group_delete_check').type('그룹2'); // 그룹명 입력
        cy.get('.modal-button-content > .btn-danger').click(); // 삭제

        // 멤버 탈퇴
        cy.get(':nth-child(6) > button').eq(0).click(); // 멤버
        cy.get(':nth-child(1) > :nth-child(8) > .btn').click(); // 강제 탈퇴
        cy.get('.modal-button-content > .btn-danger').click(); // 탈퇴
    });
    afterEach('Status Fail', () => {
        if (Failure) {
            const ScreenshotFileName = `Organization Create Test ${Cypress.env('DateLabel')}`;
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
        const TestRange = '1. 단체 삭제 2. 단체 생성 3. 맴버 초대 4. 그룹 생성 5. 그룹 멤버 초대 6. 그룹 삭제';
        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[${Cypress.env('EmailTitle')}][Prod] Organization Create`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
