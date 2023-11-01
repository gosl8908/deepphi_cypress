
describe('SignUp Test', () => {

  before(() => {
    cy.setDateToEnv();
    cy.viewport(1920, 1080); // FHD 해상도 설정
    cy.getAllCookies(); // 쿠키 삭제
    cy.getAllLocalStorage(); // 로컬 삭제
    cy.getAllSessionStorage(); // 세션 삭제
    
  });

  // 일회용 이메일 만들기
  it('SignUp1', () => {
    cy.visit('http://ruu.kr/') // 일회용 이메일 진입

    // 환경 변수에서 날짜 레이블 가져오기
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

  // 회원가입 진행
  it('SignUp2', () => {
    cy.visit(Cypress.env('prod'))
    cy.contains('회원가입').click();
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
    cy.contains('회원 가입이 마무리됩니다.'); // 회원가입 완료 팝업 확인
    cy.get('.account__modal--footer > .account-button').click(); // 팝업 확인
    cy.wait(3000);
  });
  });

  // 이메일 인증 확인
  it('SignUp3', () => {
    cy.readFile('cypress/fixtures/SignupTest.txt').then((text) => {
    cy.visit('http://ruu.kr/') // 일회용 이메일 진입
    cy.get('#id').type(text); // 이메일 입력
    cy.wait(30000) // 이메일 10초 대기
    cy.get('#mailList').click(); // 메일 확인
    cy.contains('deepphi@deepnoid.com').click(); // 메일 진입
    cy.contains('Click to Verify Email'); // 이메일 확인
    cy.get(':nth-child(14) > td > a').should('have.attr', 'target', '_blank') // 새창 이동 방지
    .invoke('removeAttr', 'target') // target 속성을 제거합니다.
    .click(); // 이메일 인증 확인
    cy.wait(3000);
  });
});

  // 회원가입 완료 확인
  it('SignUp4', () => {
    cy.readFile('cypress/fixtures/SignupTest.txt').then((text) => {
  cy.visit(Cypress.env('prod'))
  cy.contains('로그인').click();
  cy.get('#username').type(text+'@ruu.kr'); // 이메일 입력
  cy.get('#password').type('test123!'); // 비밀번호 입력
  cy.get('#kc-login').click() // 로그인 선택
  cy.wait(5000);
  cy.screenshot('SignUp_Completed' + Cypress.env('date+label'));


      // 테스트 결과 이메일 전송
    
        // 테스트 결과를 로그로 기록합니다
        cy.log("테스트가 성공적으로 완료되었습니다.");

        // 테스트 결과를 포함한 이메일을 보냅니다
        const emailSubject = "Cypress SignUp 테스트 결과";
        const emailBody = "Cypress SignUp 테스트 스위트가 성공적으로 완료되었습니다.";
    
        cy.task("sendEmail", {
          recipient: "gosl8908@deepnoid.com, js_lee@deepnoid.com",
          subject: emailSubject,
          body: emailBody,
        }).then((success) => {
          if (success) {
            cy.log("이메일 전송 성공.");
          } else {
            cy.log("이메일 전송 실패.");
          }
        });
});
});
});