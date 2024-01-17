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
// 레코드
cy.contains('성공', { timeout: 60*1000 }).should('be.visible');
cy.get('.btn-clear-danger').click(); // 중지
cy.wait(15*1000);
cy.get('.left-navigation--sub-navi > .current > button.ng-tns-c0-0').click();
cy.get('.ng-star-inserted')
.eq(0)
.contains('중지', { timeout: 30*1000 }).should('be.visible');

//이미지
cy.contains('실패', { timeout: 60000 }).should('be.visible');
cy.wait(5000);
cy.screenshot('image_inference_api', 1920, 1080);
cy.get('.btn-clear-danger').click(); // 중지
cy.wait(10000);

cy.log('인퍼런스 삭제');
// 인퍼런스 삭제
cy.get('.left-navigation--sub-navi > .current > button.ng-tns-c0-0 > .ng-tns-c0-0').click(); // 마이 인퍼런스
cy.wait(5000);
cy.get(':nth-child(1) > :nth-child(14) > .btn').click(); // 삭제
cy.get('.btn-danger').click(); // 삭제
cy.contains('image-inference-automation 인퍼런스 서비스가 삭제되었습니다.', { timeout: 60000 }).should('be.visible');
};

module.exports = {
    Api: Api,
};
