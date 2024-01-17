const { loginModule, sendEmailModule } = require('../module/manager.module.js');

describe('Organization Create', () => {
    let testFails = []; // 실패 원인을 저장할 변수
    let screenshots = []; // 스크린샷을 저장할 배열
    let FailTF = false;
    Cypress.on('fail', (err, runnable) => {
        const errMessage = err.message || '알 수 없는 이유로 실패함';
        !testFails.includes(errMessage) && testFails.push(errMessage);
        FailTF = true;
    });
    before(() => {
        cy.setDateToEnv();
        cy.getAll();
    });

    it('Organization Create', () => {
        // 로그인
        loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPwd'));

        // 마이홈 이동
        cy.get('.btn__user_info').click(); // 프로필 선택
        cy.get('.user-card__footer > .btn-primary').click(); // 마이홈 선택

        // 단체 삭제
        cy.get(':nth-child(8) > .btn').click(); // 단체 삭제
        cy.get('#organization_confirm').type('자동화용 단체'); // 단체명 입력
        cy.get('.modal-button-content > .btn-danger').click(); // 삭제
        cy.wait(3000);

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
        // cy.contains('그룹2').click(); // 그룹2 선택
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

    // 단체 크레딧 충전
    it('Organization Credit Charge', () => {
        loginModule.login(Cypress.env('ProdAdmin'), Cypress.env('Id'), Cypress.env('KangTestPwd'));

        /* 크레딧 충전 */
        cy.get(':nth-child(8) > a > span').click(); // 단체관리
        cy.get('.p-panelmenu-header-link > .p-menuitem-text').click(); // 단체 리스트
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

    // 단체 DISK 구독
    it('Organization DISK subscribe', () => {
        loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPwd'));

        // 크레딧 충전
        cy.get('.btn__user_info').click(); // 프로필 선택
        cy.get('.organization-changer__opener').click();
        cy.get(
            '.ng-star-inserted > .organization-changer__list-item > .organization-changer__list-item--info > dt',
        ).click({ force: true }); // 단체 선택
        cy.wait(3000);
        cy.get(':nth-child(7) > button').click(); // 크레딧
        cy.wait(5000);
        cy.get('.control-box__button > .btn').eq(0).click(); // 업그레이드
        cy.wait(3000);
        cy.get(':nth-child(1) > div > .radio-item > em').click(); // 필수 체크
        cy.get('.mt3 > div > .radio-item > em').click(); // 필수 체크
        cy.get('.modal-button-content > .btn-primary').click(); // 결제
        cy.wait(3000);
        cy.get('.modal-button-content > .btn').click(); // 확인
        cy.contains('DISK 30GB 정기권'); // 업그레이드 확인
    });
    afterEach('Status Fail', () => {
        if (FailTF) {
            const screenshotFileName = `Organization Create/Organization Create Test ${Cypress.env('DateLabel')}`;
            cy.screenshot(screenshotFileName);
            screenshots.push(screenshotFileName);
            FailTF = false;
        }
    });
    after('Send Email', () => {
        const testRange =
            '1. 단체 삭제 2. 단체 생성 3. 맴버 초대 4. 그룹 생성 5. 그룹 멤버 초대 6. 그룹 삭제 7. 크레딧 충전 8. 단체 DISK 구독';

        sendEmailModule.sendEmail(
            testFails,
            Cypress.env('AdminId'),
            `Organization Create Test ${Cypress.env('EmailTitle')}`,
            testRange,
            screenshots,
        );
    });
});
