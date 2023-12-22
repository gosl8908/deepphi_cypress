function image_api() {
  cy.log("API 호출 성공");

  cy.fixture("\\Image\\2D_CL_Case1\\glass1.jpg").then((fileContent) => {
    const formData = new FormData(); // FormData 생성

    // 파일을 FormData에 추가
    formData.append(
      "file",
      new Blob([fileContent], { type: "image/jpg" }),
      "glass1.jpg"
    ); // 첨부할 파일 입력

    cy.request({
      method: "POST",
      url: "https://inference.deepphi.ai/imageinferenceautomation/1.0/api/prediction", // url 입력
      failOnStatusCode: false,
      headers: {
        "Content-Type": false, // Content-Type을 multipart/form-data로 설정
      },
      body: formData, // FormData를 요청 본문으로 사용
    }).then((response) => {
      expect(response.status).to.eq(200); // 기대 응답 코드 200
    });
  });
}

module.exports = {
  image_api: image_api,
};