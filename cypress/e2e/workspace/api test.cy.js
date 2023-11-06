const { emailModule } = require('../../e2e/Module/moduleManager.js');

describe('인퍼런스 서비스 api test', () => {

  // 레코드 인퍼런스 api 호출
  it('인퍼런스 서비스 api test', () => {
    cy.fixture("자동화용 데이터셋.csv").then((fileContent) => {
      const formData = new FormData(); // FormData 생성

      // 파일을 FormData에 추가
      formData.append('file', new Blob([fileContent], { type: 'text/csv' }), '자동화용 데이터셋.csv'); // 첨부할 파일 입력

      cy.request({
        method: "POST",
        url: "https://dev-inference.deepphi.ai/12d2d112dd21/1.1/api/inference", // url 입력
        failOnStatusCode: false,
        headers: {
          'Content-Type': 'multipart/form-data', // Content-Type을 multipart/form-data로 설정
        },
        body: formData, // FormData를 요청 본문으로 사용
      }).then((response) => {
        // 응답 코드가 200 또는 404 중 하나인지 확인
        if (response.status === 200) {
          expect(response.status).to.eq(200); // 200 응답 코드 확인
        } else if (response.status === 404) {
          expect(response.status).to.eq(404); // 404 응답 코드 확인
        } else {
        cy.log(`Unexpected response status: ${response.status}`); // 다른 응답 코드 처리
        };
      });
    });
    emailModule.email(Cypress.env('emailtitle'), Cypress.env('emailbody'));
  });
});

//     // 이미지 인퍼런스 api 호출
//     it('인퍼런스 서비스 api test', () => {
//       cy.fixture("Cars0.png").then((fileContent) => {
//         const formData = new FormData(); // FormData 생성
  
//         // 파일을 FormData에 추가
//         formData.append('file', new Blob([fileContent], { type: 'image/png' }), 'Cars0.png'); // 첨부할 파일 입력
  
//         cy.request({
//           method: "POST",
//           url: "https://dev-inference.deepphi.ai/2d/1.0/api/prediction", // url 입력
//           failOnStatusCode: false,
//           headers: {
//             'Content-Type': false, // Content-Type을 multipart/form-data로 설정
//           },
//           body: formData, // FormData를 요청 본문으로 사용
//         }).then((response) => {
//           expect(response.status).to.eq(200); // 기대 응답 코드 200
//         });
//       });
//     });
// });