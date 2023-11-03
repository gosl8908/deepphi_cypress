describe('SignUp Test', () => {

  before(() => {
    // cy.setDateToEnv();
    // cy.getAllCookies(); // 쿠키 삭제
    // cy.getAllLocalStorage(); // 로컬 삭제
    // cy.getAllSessionStorage(); // 세션 삭제
    // cy.viewport(1920, 1080); // FHD 해상도 설정
  });

  

  it('User change information', () => {
    cy.fixture("glass1.jpg").as('imageFile').then((fileContent) => {
      cy.request({
        method: "POST",
        url: "https://inference.deepphi.ai/aas/1.0/api/prediction",
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept-Encoding": "gzip, deflate, br",
          "User-Agent": "Chrome/91.0.4472.124", // 원하는 User-Agent 문자열 사용
          "Connection": "keep-alive", // Connection 헤더 추가
        },
        form: true, // form 데이터를 사용할 것임을 명시
        body: {
          requestFile: {
            value: {
              fileContent,
                filePath: 'C:\\my-cypress-project\\cypress\\fixtures\\glass1.jpg',
                fileName: 'glass1.jpg',
                mimeType: 'image/jpeg'
              // filename: "glass1.jpg",
              // mimeType: "image/jpeg",
            },
            formData: true, // 파일 업로드를 위해 formData를 사용
            failOnStatusCode: false, // 에러가 발생해도 계속 진행
            timeout: 10000, // 요청 타임아웃 설정
            retryOnNetworkFailure: true, // 네트워크 실패 시 재시도
          },
        },
      }).then((response) => {
        // 여기에서 API 응답을 검사하고 원하는 테스트를 수행
        expect(response.status).to.eq(200); // HTTP 상태 코드
      });
    });
  });
});