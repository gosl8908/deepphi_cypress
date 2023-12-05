const { emailModule } = require('../Module/moduleManager.js');

describe('SignUp', () => {

  before(() => {
    cy.setDateToEnv();
  });

  /* 일회용 이메일 만들기 */
  it('Create email', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://ruu.kr/') // 일회용 이메일 진입

    /* 환경 변수에서 날짜 레이블 가져오기 */
    const dateLabel = Cypress.env('date_label');    
    cy.get('#id')
      .type('test' + dateLabel); // 필요한 곳에서 텍스트 사용  
    cy.get('#mailList').click();  
    cy.wait(5000); // 5초 대기  
    // 조합한 텍스트를 파일에 저장
    const textToWrite = 'test' + dateLabel;
    cy.writeFile('cypress/fixtures/SignupTest.txt', textToWrite);
    cy.wait(3000);
  });

    /* 회원가입 진행 */
    it('SignUp', () => {
      cy.viewport(1920, 1080);
      cy.visit(Cypress.env('prod'))
      cy.wait(5000);
      cy.contains('회원가입').click();
      cy.wait(5000);

    /* 회원가입 페이지 */
      cy.contains('모든 항목에 동의합니다').click() // 모든 항목 동의
      cy.get('.account-button--primary').click(); // 다음
      cy.readFile('cypress/fixtures/SignupTest.txt').then((text) => { // 'SignupTest.txt' 파일 내용 불러오기
      cy.get('#user-id').type(text+'@ruu.kr'); // 파일 내용을 입력 필드에 입력
      cy.get(':nth-child(1) > dd > .form-size > .account-button').click(); // 아이디 중복 검사
      cy.contains('사용 가능한 이메일입니다.'); // 이메일 중복 팝업 확인
      cy.get('.account__modal--footer > .account-button').click(); // 팝업 확인
      cy.get('#user-pw').type('test123!'); // 비밀번호
      cy.get('#user-pw--confirm').type('test123!'); // 비밀번호 확인
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
      cy.wait(3000);

    /* 회원가입 마무리 */
      cy.contains('회원 가입이 마무리됩니다.'); // 회원가입 완료 팝업 확인
      cy.get('.account__modal--footer > .account-button').click(); // 팝업 확인
      cy.wait(3000);
    });
  });

  /* 이메일 인증 확인 */
    it('Check Verify email', () => {
      cy.viewport(1920, 1080);
      cy.readFile('cypress/fixtures/SignupTest.txt').then((text) => {
      cy.visit('http://ruu.kr/') // 일회용 이메일 진입
      cy.wait(5000);

      cy.get('#id').type(text); // 이메일 입력
      cy.wait(30000) // 이메일 30초 대기
      cy.get('#mailList').click(); // 메일 확인
      cy.contains('deepphi@deepnoid.com').click(); // 메일 진입
      cy.contains('Click to Verify Email'); // 이메일 확인
      cy.get(':nth-child(14) > td > a').should('have.attr', 'target', '_blank') // 새창 이동 방지
      .invoke('removeAttr', 'target') // target 속성을 제거합니다.
      .click(); // 이메일 인증 확인
      cy.wait(3000);
    });
  });

  /* 회원가입 완료 확인 */
    it('SignUp Completed Check & User Change Information', () => {
      cy.viewport(1920, 1080);
      cy.readFile('cypress/fixtures/SignupTest.txt').then((text) => {
    cy.visit(Cypress.env('prod'))
    cy.wait(3000);
    cy.contains('로그인').click();
    cy.get('#username').type(text+'@ruu.kr'); // 이메일 입력
    cy.get('#password').type('test123!'); // 비밀번호 입력
    cy.get('#kc-login').click() // 로그인 선택
    cy.wait(5000);


    /* 프로필 정보 변경 확인 */
    cy.get('dd.ng-tns-c1-1').click(); // 프로필 선택
    cy.get('.user-card__footer > .btn-primary').click(); // 마이홈 선택
    cy.get('.my-info__profile-card > .btn').click(); // 프로필 수정 선택
    cy.get('.input-form').type('test123!'); // 비밀번호 입력
    cy.get('.modal-button-content > .btn-primary').click(); // 확인
    cy.get(':nth-child(3) > dd > .flex-display > .input-form').clear().type(Cypress.env('Nickname')); // 닉네임 변경
    cy.wait(3000); // 3초 대기
    cy.get('.flex-display > .btn').click(); // 닉네임 체크
    cy.wait(3000); // 3초 대기
    cy.contains('사용 가능한 닉네임입니다'); // 팝업 확인
    cy.get('.modal-button-content > .btn').click() // 팝업 확인
    cy.get('.col-30').select('병원'); // 기관 변경
    cy.get(':nth-child(1) > dd > .flex-display > .flex-auto').clear().type('기관Change'); // 기관명 변경
    cy.get(':nth-child(3) > dd > .input-form').select('연구원') // 직업 변경
    cy.get('.btn-primary').click(); // 저장
    cy.contains('회원정보가 성공적으로 변경되었습니다.'); // 회원정보 변경 확인
    cy.get('.modal-button-content > .btn').click(); // 팝업 종료

    /* 비밀번호 변경 확인 */
    cy.get('.my-info__profile-card > .btn').click(); // 프로필 수정 선택
    cy.get('.input-form').type('test123!'); // 비밀번호 입력
    cy.get('.modal-button-content > .btn-primary').click(); // 확인
    cy.wait(3000); // 3초 대기
    cy.get('.default-tab > ul > :nth-child(2) > button').click(); // 비밀번호 변경 탭
    cy.get('#New_Password').type('Test123!'); // 새 비밀번호 입력
    cy.get('#Confirm_New_Password').type('Test123!'); // 새 비밀번호 확인 입력
    cy.get('.btn-primary').click(); // 변경 버튼
    cy.contains('비밀번호가 성공적으로 변경되었습니다.'); // 비밀번호 변경 확인
    cy.get('.modal-button-content > .btn').click(); // 팝업 종료

    /* DISK 업그레드 확인 */
    cy.get('.my-info__subscription > .my-info__card--item > .btn').click(); // Disk 업그레이드
    cy.get('.input-form').select('100GB'); // 100GB 선택
    cy.get(':nth-child(1) > div > .radio-item > em').click(); // 정기 결제 동의
    cy.get('.mt3 > div > .radio-item > em').click(); // 이용 제한 동의
    cy.get('.modal-button-content > .btn-primary').click(); // 구독 개시
    cy.contains('상품을 정기결제 하셨습니다.'); // 결제 완료 확인
    cy.get('.modal-button-content > .btn').click(); // 팝업 종료
    cy.contains('이용기간'); // 결제 확인

  emailModule.email('SignUp Test ' + Cypress.env('emailtitle'), Cypress.env('SignUp_emailbody'));

});
});
});