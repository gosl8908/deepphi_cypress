  // API 엔드포인트 및 데이터
  cy.fixture('glass1.jpg').then(fileContent => {
  const apiUrl = 'https://inference.deepphi.ai/aas/1.0/api/prediction';
  const requestData = {
   requestFile : {
     fileContent,
     filePath: 'C:\\my-cypress-project\\cypress\\fixtures\\glass1.jpg',
     fileName: 'glass1.jpg',
     mimeType: 'image/jpeg'
  }};

describe('SignUp Test', () => {

  before(() => {
    cy.setDateToEnv();
    cy.getAllCookies(); // 쿠키 삭제
    cy.getAllLocalStorage(); // 로컬 삭제
    cy.getAllSessionStorage(); // 세션 삭제
    cy.viewport(1920, 1080); // FHD 해상도 설정
  });

  it('User change information', () => {
    cy.visit(Cypress.env('prod')) 
    cy.contains('로그인').click(); // 로그인 클릭
    cy.get('#username').type(Cypress.env('auto_test_id')); // 이메일 입력
    cy.get('#password').type(Cypress.env('password')); // 비밀번호 입력
    cy.get('#kc-login').click() // 로그인 선택
    cy.wait(5000);

    // 마이 인퍼런스 진입
    // cy.get(':nth-child(3) > .left-navigation--sub-navi > li.ng-tns-c1-1 > button.ng-tns-c1-1 > .ng-tns-c1-1').click(); // 마이 인퍼런스
    // cy.wait(5000);
    // cy.get(':nth-child(13) > .btn').click(); // 상세보기
    // cy.wait(5000);
    // cy.get('.default-tab > ul > :nth-child(2) > button').click(); // 예측 이력
    // cy.wait(5000);

    // API 요청 보내기
    cy.request({
      method: 'POST',
      url: apiUrl,
      body: requestData,
      headers: {         // 필요한 헤더를 여기에 추가 (예: Authorization 헤더)
        'Content-Type': 'multipart/form-data', // form-data로 설정
      },
      formData: true, // 파일 업로드를 위해 formData를 사용
      failOnStatusCode: false, // 에러가 발생해도 계속 진행
      timeout: 30000, // 요청 타임아웃 설정
      retryOnNetworkFailure: true, // 네트워크 실패 시 재시도
    }).then((response) => {
      // API 응답 검증 및 테스트
      expect(response.status).to.eq(200); // 성공 상태 코드 확인
      // 다른 응답 데이터 검증

      // 응답에서 필요한 정보 추출
      // response.body를 사용하여 응답 데이터에 접근
    });
  });
});
});