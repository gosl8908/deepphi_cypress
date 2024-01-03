// function imageApi() {
//   const filePath = 'image/2D_CL_Case1/glass1.jpg'

//   cy.log("API 호출 성공");

//   cy.fixture(filePath).then((fileContent) => {
//     const formData = new FormData(); // FormData 생성

//     // 파일을 FormData에 추가
//     formData.append(
//       "requestFile",
//       new Blob([fileContent], { type: "image/jpg" }),
//       "image/2D_CL_Case1/glass1.jpg"
//     ); // 첨부할 파일 입력

//     cy.request({
//       method: "POST",
//       url: Cypress.env('endpointText') + Cypress.env('apiText'), // url 입력
//       failOnStatusCode: false,
//       headers: {
//         "Content-Type": "multipart/form-data", // Content-Type을 multipart/form-data로 설정
//       },
//       body: formData, // FormData를 요청 본문으로 사용
//       timeout: 100000, // 타임아웃을 밀리초 단위로 설정
//     }).then((response) => {
//       expect(response.status).to.eq(200); // 기대 응답 코드 200
//     });
//   });
// }

// module.exports = {
//   imageApi: imageApi,
// };
