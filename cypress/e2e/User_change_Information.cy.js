
describe('User change information', () => {
  
  before(()=>{
    cy.setDateToEnv();
    cy.viewport(1920, 1080); // FHD 해상도 설정
    cy.clearCookies(); // 모든 쿠키 지우기
  });


  it('User change information', () => {
    cy.readFile('cypress/fixtures/SignupTest.txt').then((text) => {
    cy.visit(Cypress.env('prod')) 
    cy.contains('로그인').click(); // 로그인 클릭
    cy.get('#username').type(text+'@ruu.kr'); // 이메일 입력
    cy.get('#password').type('test123!'); // 비밀번호 입력
    cy.get('#kc-login').click() // 로그인 선택
    cy.wait(5000);

    // 프로필 정보 변경 확인
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

    // 비밀번호 변경 확인
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

    // DISK 업그레드 확인
    cy.get('.my-info__subscription > .my-info__card--item > .btn').click(); // Disk 업그레이드
    cy.get('.input-form').select('100GB'); // 100GB 선택
    cy.get(':nth-child(1) > div > .radio-item > em').click(); // 정기 결제 동의
    cy.get('.mt3 > div > .radio-item > em').click(); // 이용 제한 동의
    cy.get('.modal-button-content > .btn-primary').click(); // 구독 개시
    cy.contains('상품을 정기결제 하셨습니다.'); // 결제 완료 확인
    cy.get('.modal-button-content > .btn').click(); // 팝업 종료
    cy.contains('이용기간'); // 결제 확인

        // 테스트 결과 이메일 전송
    
        // 테스트 결과를 로그로 기록합니다
        cy.log("테스트가 성공적으로 완료되었습니다.");

        // 테스트 결과를 포함한 이메일을 보냅니다
        const emailSubject = "Cypress User Change Information 테스트 결과";
        const emailBody = "Cypress User Change Information 테스트 스위트(프로필 정보 변경, 비밀번호 변경, DISK 업그레이드)가 성공적으로 완료되었습니다.";
    
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