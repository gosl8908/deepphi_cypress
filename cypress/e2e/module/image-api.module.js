function image_api() {
  cy.log("API 호출 성공");

  cy.fixture("image/2D_CL_Case1/glass1.jpg").then((fileContent) => {
    const formData = new FormData(); // FormData 생성

    // 파일을 FormData에 추가
    formData.append(
      "requestFile",
      new Blob([fileContent], { type: "image/jpg" }),
      "image/2D_CL_Case1/glass1.jpg"
    ); // 첨부할 파일 입력

    cy.request({
      method: "POST",
      url: "https://inference.deepphi.ai/image-inference-automation/1.0/api/prediction", // url 입력
      failOnStatusCode: false,
      headers: {
        "Content-Type": "multipart/form-data", // Content-Type을 multipart/form-data로 설정
      },
      body: formData, // FormData를 요청 본문으로 사용
      timeout: 100000, // 타임아웃을 밀리초 단위로 설정
    }).then((response) => {
      expect(response.status).to.eq(200); // 기대 응답 코드 200
    });
  });
}

module.exports = {
  image_api: image_api,
};
