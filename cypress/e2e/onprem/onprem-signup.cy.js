const { loginModule, emailModule, functionModule: f } = require('../module/manager.module.js');
describe('Onprem SignUp', () => {
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
    });

    it('Create email', () => {
        const SignUpId = 'test' + Cypress.env('DateLabel');
        cy.visit(Cypress.env('DisposableEmail')); // 일회용 이메일 진입
        /* 환경 변수에서 날짜 레이블 가져오기 */
        cy.get('#id').type(SignUpId); // 필요한 곳에서 텍스트 사용
        cy.get('#mailList').click();
        cy.wait(5000); // 5초 대기
        // 조합한 텍스트를 파일에 저장
        cy.writeFile('cypress/fixtures/SignupTest.txt', SignUpId);
        cy.wait(3000);
    });

    /* 회원가입 진행 */
    it('SignUp', () => {
        cy.visit(Cypress.env('Onprem'));
        cy.wait(5000);
        cy.contains('Sign up now').click();
        cy.wait(5000);

        /* 회원가입 페이지 */
        cy.readFile('cypress/fixtures/SignupTest.txt').then(text => {
            cy.get('#user-id').type(text + '@ruu.kr'); // 파일 내용을 입력 필드에 입력
            cy.get(':nth-child(1) > dd > .form-size > .account-button').click(); // 아이디 중복 검사
            cy.contains('사용 가능한 이메일입니다.'); // 이메일 중복 팝업 확인
            cy.get('.btn').contains('닫기').click(); // 팝업 확인
            cy.get('#user-pw').type(Cypress.env('KangTestPwd')); // 비밀번호
            cy.get('#user-pw--confirm').type(Cypress.env('KangTestPwd')); // 비밀번호 확인
            cy.get('#user-name').type(text); // 이름
            cy.get('#user-nickname').type(text); // 닉네임
            cy.get(':nth-child(5) > dd > .form-size > .account-button').click(); // 닉네임 중복 검사
            cy.contains('사용 가능한 닉네임입니다.'); // 닉네임 중복 팝업 확인
            cy.get('.btn').contains('닫기').click(); // 팝업 확인
            cy.contains('등록').click(); // 다음

            /* 회원가입 마무리 */
            cy.get('.account__modal--container', { timeout: 10 * 1000 }).should('be.visible');
            cy.get('.account__modal--footer > .account-button').click(); // 팝업 확인
            cy.wait(3000);
        });
    });
    /* 어드민 회원가입 승인 */
    it('Admin Signup Check', () => {
        loginModule.login(Cypress.env('Onprem'), Cypress.env('AdminId'), Cypress.env('AdminPwd'));
        cy.get('.ng-star-inserted > button > .fa-regular').click();
        cy.wait(5 * 1000);
        cy.readFile('cypress/fixtures/SignupTest.txt').then(text => {
            cy.get('.col-8').contains(text + '@ruu.kr', { timeout: 5 * 1000 });
        });
        cy.get(':nth-child(1) > :nth-child(5) > .btn-primary').click();
        cy.contains('승인이 완료되었습니다.');
    });

    /* 회원가입 완료 확인 & 비밀번호 변경 */
    it('SignUp Completed Check & Password Change', () => {
        cy.readFile('cypress/fixtures/SignupTest.txt').then(text => {
            cy.log(text);
            loginModule.login(Cypress.env('Onprem'), text + '@ruu.kr', Cypress.env('KangTestPwd'));
            cy.wait(5000);

            /* 비밀번호 변경 */
            cy.get('.btn__user_info > dl > dd').click();
            cy.get('.btn').contains('수정').click();
            cy.get('.input-form').type(Cypress.env('KangTestPwd'));
            cy.get('.btn-primary').click();
            cy.wait(3000); // 3초 대기
            cy.get('.default-tab > ul > :nth-child(2) > button').click(); // 비밀번호 변경 탭
            cy.get('#New_Password').type('Test123!'); // 새 비밀번호 입력
            cy.get('#Confirm_New_Password').type('Test123!'); // 새 비밀번호 확인 입력
            cy.get('.btn-primary').click(); // 변경 버튼
            cy.contains('비밀번호가 성공적으로 변경되었습니다.', { timeout: 20 * 1000 }).should('be.visible'); // 데이터셋 데이터
            cy.get('.modal-button-content > .btn').click(); // 팝업 종료
        });
    });

    it('Forgot Password', () => {
        cy.visit(Cypress.env('Onprem'), { timeout: 60 * 1000 });
        cy.get(':nth-child(1) > a', { timeout: 30 * 1000 }).click();
        cy.readFile('cypress/fixtures/SignupTest.txt').then(text => {
            cy.get('#username').type(text + '@ruu.kr');
            cy.get('#reset-password-btn').click();
            cy.contains('You will receive an email shortly with further instructions.', { timeout: 10 * 1000 });
            cy.wait(5 * 1000);
            cy.get('#account__modal-close-btn').click();
        });
    });

    it('Forgot Password email Check', () => {
        cy.visit(Cypress.env('DisposableEmail'), { timeout: 60 * 1000 });
        cy.readFile('cypress/fixtures/SignupTest.txt').then(text => {
            cy.get('#id').type(text); // 이메일 입력
        });
        cy.contains('메일확인').click();
        cy.contains('(Notice) Reset your password for DEEP:PHI', { timeout: 20 * 1000 })
            .should('be.visible')
            .click();
        cy.contains('Click To Reset Password');
        cy.get(':nth-child(14) > td > a')
            .invoke('attr', 'href')
            .then(link => {
                cy.log(link);
                cy.writeFile('cypress/fixtures/PasswordLink.txt', link);
            });
    });

    it('Change Password', () => {
        cy.readFile('cypress/fixtures/PasswordLink.txt').then(link => {
            cy.log(link);
            cy.visit(link, { timeout: 30 * 1000 });
        });
        cy.get('#account__modal-close-btn').click();
        cy.get('#password-new').type(Cypress.env('KangTestPwd'));
        cy.get('#password-confirm').type(Cypress.env('KangTestPwd'));
        cy.get('.account__button-box > .account-button').click();
        cy.get('#client-base-url-redirect-btn').contains('Start DEEP:PHI').click();
        cy.wait(3 * 1000);
        cy.readFile('cypress/fixtures/SignupTest.txt').then(text => {
            cy.get('#username').type(text + '@ruu.kr'); // 이메일 입력
        });
        cy.get('#password').type(Cypress.env('KangTestPwd')); // 비밀번호 입력
        cy.get('#kc-login').click();
        cy.wait(3 * 1000);
    });

    afterEach('Status Check', () => {
        if (FailTF) {
            const ScreenshotFileName = `SignUp Test ${Cypress.env('DateLabel')}`;
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
        const TestRange = '1. 회원가입 2. 어드민 회원가입 승인 3. 비밀번호 변경 4. 비밀번호 찾기';

        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[Onprem] SignUp Test ${Cypress.env('EmailTitle')}`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
