
describe('Organization Create', () => {

  before(() => {
    cy.setDateToEnv();
    cy.viewport(1920, 1080); // FHD 해상도 설정
    cy.clearCookies(); // 모든 쿠키 지우기
    
  });

  it('Organization Create', () => {
    cy.visit(Cypress.env('prod')) 
    cy.contains('로그인').click(); // 로그인 클릭
    cy.get('#username').type(Cypress.env('auto_test_id')); // 이메일 입력
    cy.get('#password').type(Cypress.env('Password')); // 비밀번호 입력
    cy.get('#kc-login').click() // 로그인 선택
    cy.wait(3000);

    // 마이홈 이동
    cy.get('.btn__user_info').click(); // 프로필 선택
    cy.get('.user-card__footer > .btn-primary').click(); // 마이홈 선택

    // 단체 삭제
    cy.get(':nth-child(8) > .btn').click(); // 단체 삭제
    cy.get('#organization_confirm').type('단체'); // 단체명 입력
    cy.get('.modal-button-content > .btn-danger').click(); // 삭제

    // 단체 생성
    cy.get('.flex-display > :nth-child(2) > .btn').click(); // 단체 생성   
    cy.get('#organization_select').select('기타'); // 분류 선택
    cy.get('#organization_name').type('자동화용 단체'); // 단체명 입력
    cy.get('.flex-display > .btn-wrap > .btn').click(); // 체크
    cy.get('.modal-button-content > .btn-primary').click(); // 생성
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

  it('Organization Credit Charge', () => {
    cy.visit(Cypress.env('prodadmin')) 
    cy.get('#username').type(Cypress.env('id')); // 이메일 입력
    cy.get('#password').type(Cypress.env('Password')); // 비밀번호 입력
    cy.get('#kc-login').click() // 로그인 선택
    cy.wait(3000);

    cy.get(':nth-child(8) > a > span').click(); // 단체관리
    cy.get('.p-panelmenu-header-link > .p-menuitem-text').click(); // 단체 리스트
    cy.wait(3000);
    cy.get(':nth-child(2) > .form-control').type('자동화용 단체') // 단체명 입력
    cy.get('.btn-navy').click(); // 검색
    cy.get(':nth-child(1) > :nth-child(7) > .btn').click();
    cy.get('.btn-blue > span').click();
    cy.get(':nth-child(1) > .text-left > .display-block > .p-dropdown > .p-dropdown-label').click(); // 크레딧 타입
    cy.get(':nth-child(1) > .p-dropdown-item').click(); // 유료
    cy.get(':nth-child(2) > .text-left > .display-block > .p-dropdown > .p-dropdown-label').click(); // 사유
    cy.get(':nth-child(1) > .p-dropdown-item').click(); // 리워드 적립
    cy.get('.text-right > .display-block').type('100000'); // 금액 입력
    cy.get('.wrap--input-and-button > .p-calendar__width__custom > .p-calendar > .p-inputtext').click(); // 유효기간
    cy.get('.p-datepicker-today').click(); // 31일
    cy.get('.text-left > .ng-untouched').type('test'); // 메모
    cy.get('.modal--btn-area > .btn-navy').click(); // 충전
    cy.get('.modal--btn-area > .btn-danger').click(); // 예
    cy.wait(3000);
    cy.contains('정상 충전되었습니다.'); // 충전 확인
    cy.get('admin-credit-alert-modal.ng-star-inserted > .modal--wrap > .modal--btn-area > .btn').click(); // 확인
  });

    
  it('Organization DISK subscribe', () => {
    cy.visit(Cypress.env('prod')) 
    cy.contains('로그인').click(); // 로그인 클릭
    cy.get('#username').type(Cypress.env('auto_test_id')); // 이메일 입력
    cy.get('#password').type(Cypress.env('Password')); // 비밀번호 입력
    cy.get('#kc-login').click() // 로그인 선택
    cy.wait(3000);

    // 마이홈 이동
    cy.get('.btn__user_info').click(); // 프로필 선택
    cy.get('.organization-changer__opener').click(); 
    cy.get('ul > .ng-star-inserted').click(); // 단체 선택
    cy.wait(3000);
    cy.get(':nth-child(7) > button').click(); // 크레딧
    cy.get('.control-box__button > .btn').click(); // 업그레이드
    cy.get(':nth-child(1) > div > .radio-item > em').click(); // 필수 체크
    cy.get('.mt3 > div > .radio-item > em').click(); // 필수 체크
    cy.get('.modal-button-content > .btn-primary').click(); // 결제
    cy.get('.modal-button-content > .btn').click(); // 확인
    cy.contains('DISK 30GB 정기권'); // 업그레이드 확인
    

        // 테스트 결과 이메일 전송
    
        // 테스트 결과를 로그로 기록합니다
        cy.log("테스트가 성공적으로 완료되었습니다.");

        // 테스트 결과를 포함한 이메일을 보냅니다
        const emailSubject = "Cypress Organization Create 테스트 결과";
        const emailBody = "Cypress Organization Create 테스트 스위트(단체 생성, 단체 삭제, 멤버 초대, 그룹 생성, 그룹 삭제, 크레딧 충전, 디스크 구독)가 성공적으로 완료되었습니다.";
    
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