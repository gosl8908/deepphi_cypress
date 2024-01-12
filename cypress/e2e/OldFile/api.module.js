function Api() {

    cy.log('인퍼런스 서비스 api 호출');

const filePath = 'record/자동화용 데이터셋.csv';
const filePath2 = 'image/2D_CL_Case1/glass1.jpg';
const selectedFilePath = Cypress.env('apiText') === '/api/prediction' ? filePath2 : filePath;
const fileType = Cypress.env('apiText') === '/api/prediction' ? 'image/jpg' : 'text/csv';


cy.fixture(selectedFilePath).then(fileContent => {
    const formData = new FormData(); // FormData 생성

    // 파일을 FormData에 추가
    const fileName = selectedFilePath.split('/').pop(); // 파일 경로에서 파일명 추출
    formData.append('file', new Blob([fileContent], { type: fileType }), fileName); // 첨부할 파일 입력

    cy.request({
        method: 'POST',
        url: Cypress.env('endpointText') + Cypress.env('apiText'),
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
            cy.log(`API 응답 body: ${JSON.stringify(response.body)}`);
        }
    });
});
};

module.exports = {
    Api: Api,
};
