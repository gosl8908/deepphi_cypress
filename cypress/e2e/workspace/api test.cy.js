const { record_apiModule, emailModule } = require('../../e2e/Module/moduleManager.js');

describe('인퍼런스 서비스 api test', () => {

  // 레코드 인퍼런스 api 호출
  it('인퍼런스 서비스 api test', () => {

    record_apiModule.record_api();

    emailModule.email('api test ' + Cypress.env('emailtitle'), Cypress.env('date_label'));
  });
});

    // // 이미지 인퍼런스 api 호출
    // it('인퍼런스 서비스 api test', () => {
    //   cy.fixture("001.png").then((fileContent) => {
    //     const formData = new FormData(); // FormData 생성
  
    //     // 파일을 FormData에 추가
    //     formData.append('file', new Blob([fileContent], { type: 'image/png' }), '001.png'); // 첨부할 파일 입력
  
    //     cy.request({
    //       method: "POST",
    //       url: "https://onprem-inference.deepphi.ai/dssd/1.0/api/prediction", // url 입력
    //       failOnStatusCode: false,
    //       headers: {
    //         'Content-Type': false, // Content-Type을 multipart/form-data로 설정
    //       },
    //       body: formData, // FormData를 요청 본문으로 사용
    //     }).then((response) => {
    //       expect(response.status).to.eq(200); // 기대 응답 코드 200
    //     });
    //   });
    // });
// });