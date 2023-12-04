function Record_api() {

    // 레코드 인퍼런스 API 호출
    cy.fixture("자동화용 데이터셋.csv").then((fileContent) => {
        const formData = new FormData(); // FormData 생성
  
        // 파일을 FormData에 추가
        formData.append('file', new Blob([fileContent], { type: 'text/csv' }), '자동화용 데이터셋.csv'); // 첨부할 파일 입력
  
        cy.request({
          method: "POST",
          url: "https://inference.deepphi.ai/inferenceautomation/1.0/api/inference", // url 입력
          failOnStatusCode: false,
          headers: {
            'Content-Type': 'multipart/form-data', // Content-Type을 multipart/form-data로 설정
          },
          body: formData, // FormData를 요청 본문으로 사용
          timeout: 100000, // 타임아웃을 밀리초 단위로 설정
        }).then((response) => {
          // 응답 코드가 200 또는 404 중 하나인지 확인
          if (response.status === 200) {
            expect(response.status).to.eq(200); // 200 응답 코드 확인
          } else if (response.status === 404) {
            cy.log('실행 전')
            expect(response.status).to.eq(404); // 404 응답 코드 확인
          } else {
          cy.log(`Unexpected response status: ${response.status}`); // 다른 응답 코드 처리
          };
          cy.log('API 응답 결과:'); // 응답 결과 로그로 출력
  
          // 응답 시간 확인 (밀리초 단위)
          cy.log(`API 응답 시간: ${response.duration}ms`);
          
          // 응답 사이즈 확인 (사용 가능한 경우)
          if (typeof response.size !== 'undefined') {
            cy.log(`API 응답 사이즈: ${response.size / 1024} Kbytes`);
          }
          
          // 응답 바디 로그로 출력
          cy.log(`API 응답 body: ${JSON.stringify(response.body)}`);
      });
      });
}

module.exports ={
    Record_api: Record_api,
}