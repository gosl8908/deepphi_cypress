describe('인퍼런스 서비스 api test', () => {

  before(() => {
    // cy.setDateToEnv();
    // cy.getAllCookies(); // 쿠키 삭제
    // cy.getAllLocalStorage(); // 로컬 삭제
    // cy.getAllSessionStorage(); // 세션 삭제
    // cy.viewport(1920, 1080); // FHD 해상도 설정
  });

  

  it('인퍼런스 서비스 api test', () => {
    let decodedFileContent; // decodedFileContent 변수를 선언

    cy.fixture("dfgfdgdf_sample_20231103_163450.csv").then((fileContent) => {
      cy.request({
        method: "POST",
        url: "https://dev-inference.deepphi.ai/dfgfdgdf/1.3/api/inference",
        failOnStatusCode: false, // 실패 상태 코드 무시
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept-Encoding": "gzip, deflate, br",
          "User-Agent": "Chrome/91.0.4472.124", // 원하는 User-Agent 문자열 사용
          "Connection": "keep-alive", // Connection 헤더 추가
        },
        form: true, // form 데이터를 사용할 것임을 명시
        
        body: {
          file: {
            value: decodedFileContent, // 디코딩된 파일 내용 사용
            options: {
              filename: 'dfgfdgdf_sample_20231103_163450.csv',
              mimeType: 'text/csv',
          },
        },
      },
      }).then((response) => {
        // 여기에서 API 응답을 검사하고 원하는 테스트를 수행
        
        expect(response.status).to.eq(200); // 예상되는 HTTP 상태 코드
      });
    });
  });
});