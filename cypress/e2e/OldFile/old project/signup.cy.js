const { loginModule, sendEmailModule } = require('../module/manager.module.js');

describe('SignUp', () => {
    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
    });

    /* 일회용 이메일 만들기 */
    it('Create email', () => {
        cy.visit(Cypress.env('DisposableEmail')); // 일회용 이메일 진입
        /* 환경 변수에서 날짜 레이블 가져오기 */
        cy.get('#id').type('test' + Cypress.env('DateLabel')); // 필요한 곳에서 텍스트 사용
        cy.get('#mailList').click();
        cy.wait(5000); // 5초 대기
        // 조합한 텍스트를 파일에 저장
        const textToWrite = 'test' + Cypress.env('DateLabel');
        cy.writeFile('cypress/fixtures/SignupTest.txt', textToWrite);
        cy.wait(3000);
    });

    /* 회원가입 진행 */
    it('SignUp', () => {
        cy.visit(Cypress.env('Prod'));
        cy.wait(5000);
        cy.contains('회원가입').click();
        cy.wait(5000);
        /* 회원가입 페이지 */
        cy.contains('모든 항목에 동의합니다').click(); // 모든 항목 동의
        cy.get('.account-button--primary').click(); // 다음
        cy.readFile('cypress/fixtures/SignupTest.txt').then(text => {
            cy.get('#user-id').type(text + '@ruu.kr'); // 파일 내용을 입력 필드에 입력
            cy.get(':nth-child(1) > dd > .form-size > .account-button').click(); // 아이디 중복 검사
            cy.contains('사용 가능한 이메일입니다.'); // 이메일 중복 팝업 확인
            cy.get('.account__modal--footer > .account-button').click(); // 팝업 확인
            cy.get('#user-pw').type(Cypress.env('KangTestPwd')); // 비밀번호
            cy.get('#user-pw--confirm').type(Cypress.env('KangTestPwd')); // 비밀번호 확인
            cy.get('#user-name').type(text); // 이름
            cy.get('#user-nickname').type(text); // 닉네임
            cy.get(':nth-child(5) > dd > .form-size > .account-button').click(); // 닉네임 중복 검사
            cy.contains('사용 가능한 닉네임입니다.'); // 닉네임 중복 팝업 확인
            cy.get('.account__modal--footer > .account-button').click(); // 팝업 확인
            cy.contains('다음').click(); // 다음
            cy.get('#institution').select('기업'); // 기관 선택
            cy.get('#institution-name').type('deepnoid'); // 기관명 입력
            cy.get('#position').select('의사'); // 직업 선택
            cy.get('.account-button--primary').click(); // 등록

            /* 회원가입 마무리 */
            cy.contains('회원 가입이 마무리됩니다.', { timeout: 10000 }).should('be.visible').click();
            cy.get('.account__modal--footer > .account-button').click(); // 팝업 확인
            cy.wait(3000);
        });
    });

    /* 이메일 인증 확인 */
    it('Check Verify email', () => {
        cy.readFile('cypress/fixtures/SignupTest.txt').then(text => {
            cy.visit(Cypress.env('DisposableEmail')); // 일회용 이메일 진입
            cy.wait(5000);
            cy.get('#id').type(text); // 이메일 입력
        });
            cy.contains('(Notice) Verify your email for DEEP:PHI', { timeout: 10000 }).should('be.visible').click();
            cy.get('#mailList').click(); // 메일 확인
            cy.contains('deepphi@deepnoid.com').click(); // 메일 진입
            cy.contains('Click to Verify Email'); // 이메일 확인
            cy.get(':nth-child(14) > td > a')
                .should('have.attr', 'target', '_blank') // 새창 이동 방지
                .invoke('removeAttr', 'target') // target 속성을 제거합니다.
                .click(); // 이메일 인증 확인
            cy.wait(3000);
    });

    /* 회원가입 완료 확인 */
    it('SignUp Completed Check & User Change Information', () => {
        cy.readFile('cypress/fixtures/SignupTest.txt').then(text => {
            loginModule.login(Cypress.env('Prod'), text + '@ruu.kr', Cypress.env('KangTestPwd'));
            cy.wait(5000);
        });
        /* 프로필 정보 변경 확인 */
        cy.get('.btn__user_info').click(); // 프로필 선택
        cy.get('.user-card__footer > .btn-primary').click(); // 마이홈 선택
        cy.get('.my-info__profile-card > .btn').click(); // 프로필 수정 선택
        cy.get('.input-form').type(Cypress.env('KangTestPwd')); // 비밀번호 입력
        cy.get('.modal-button-content > .btn-primary').click(); // 확인
        cy.get(':nth-child(3) > dd > .flex-display > .input-form')
            .clear()
            .type('name' + Cypress.env('Time')); // 닉네임 변경
        cy.wait(3000); // 3초 대기
        cy.get('.flex-display > .btn').click(); // 닉네임 체크
        cy.contains('사용 가능한 닉네임입니다', { timeout: 10000 }).should('be.visible'); // 데이터셋 데이터
        cy.get('.modal-button-content > .btn').click(); // 팝업 확인
        cy.get('.col-30').select('병원'); // 기관 변경
        cy.get(':nth-child(1) > dd > .flex-display > .flex-auto').clear().type('기관Change'); // 기관명 변경
        cy.get(':nth-child(3) > dd > .input-form').select('연구원'); // 직업 변경
        cy.get('.btn-primary').click(); // 저장
        cy.contains('회원정보가 성공적으로 변경되었습니다.', { timeout: 10000 }).should('be.visible'); // 데이터셋 데이터
        cy.get('.modal-button-content > .btn').click(); // 팝업 종료

        /* 비밀번호 변경 확인 */
        cy.get('.my-info__profile-card > .btn').click(); // 프로필 수정 선택
        cy.get('.input-form').type(Cypress.env('KangTestPwd')); // 비밀번호 입력
        cy.get('.modal-button-content > .btn-primary').click(); // 확인
        cy.wait(3000); // 3초 대기
        cy.get('.default-tab > ul > :nth-child(2) > button').click(); // 비밀번호 변경 탭
        cy.get('#New_Password').type('Test123!'); // 새 비밀번호 입력
        cy.get('#Confirm_New_Password').type('Test123!'); // 새 비밀번호 확인 입력
        cy.get('.btn-primary').click(); // 변경 버튼
        cy.contains('비밀번호가 성공적으로 변경되었습니다.', { timeout: 10000 }).should('be.visible'); // 데이터셋 데이터
        cy.get('.modal-button-content > .btn').click(); // 팝업 종료

        /* DISK 업그레드 확인 */
        cy.get('.my-info__subscription > .my-info__card--item > .btn').click(); // Disk 업그레이드
        cy.get('.input-form').select('100GB'); // 100GB 선택
        cy.get(':nth-child(1) > div > .radio-item > em').click(); // 정기 결제 동의
        cy.get('.mt3 > div > .radio-item > em').click(); // 이용 제한 동의
        cy.get('.modal-button-content > .btn-primary').click(); // 구독 개시
        cy.contains('상품을 정기결제 하셨습니다.', { timeout: 10000 }).should('be.visible'); // 데이터셋 데이터
        cy.get('.modal-button-content > .btn').click(); // 팝업 종료
        cy.contains('이용기간', { timeout: 10000 }).should('be.visible'); // 데이터셋 데이터

        const testRange = '1. 회원가입 2. 로그인 3. 프로필 정보 변경 4. 비밀번호 변경 5. DISK 업그레이드';

        sendEmailModule.sendEmail(undefined,
            Cypress.env('AdminId'),
            'SignUp ' + Cypress.env('EmailTitle'),
            testRange,
            undefined,)
    });
});
