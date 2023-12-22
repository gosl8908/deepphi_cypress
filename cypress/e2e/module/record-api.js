function record_api() {
  cy.log('API 호출 성공');

  // 레코드 인퍼런스 API 호출
  cy.fixture('record/자동화용 데이터셋.csv').then(fileContent => {
      const formData = new FormData(); // FormData 생성

      // 파일을 FormData에 추가
      formData.append('file', new Blob([fileContent], { type: 'text/csv' }), '자동화용 데이터셋.csv'); // 첨부할 파일 입력

      cy.request({
          method: 'POST',
          url: 'https://inference.deepphi.ai/recordinferenceautomation/1.0/api/inference', // url 입력
          failOnStatusCode: false,
          headers: {
              'Content-Type': 'multipart/form-data', // Content-Type을 multipart/form-data로 설정
          },
          body: formData, // FormData를 요청 본문으로 사용
          timeout: 100000, // 타임아웃을 밀리초 단위로 설정
      }).then(response => {
          // 응답 코드가 200인 경우만 처리
          if (response.status === 200) {
              expect(response.status).to.eq(200); // 200 응답 코드 확인
          }
      });
  });
}

module.exports = {
  record_api: record_api,
};
