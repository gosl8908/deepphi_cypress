describe('인퍼런스 서비스 api test', () => {
  it('인퍼런스 서비스 api test', () => {
    cy.fixture("자동화용 데이터셋.csv").then((fileContent) => {
      const formData = new FormData(); // FormData 생성

      // 파일을 FormData에 추가
      formData.append('file', new Blob([fileContent], { type: 'text/csv' }), '자동화용 데이터셋.csv');

      cy.request({
        method: "POST",
        url: "https://dev-inference.deepphi.ai/12d2d112dd21/1.1/api/inference",
        failOnStatusCode: false,
        headers: {
          'Content-Type': 'multipart/form-data', // Content-Type을 multipart/form-data로 설정
        },
        body: formData, // FormData를 요청 본문으로 사용
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});