const { HTTP_OK } = require('./constant.module.js');

function api(Url, Type) {
    cy.log('API 호출 성공');
    cy.log(`HTTP_OK Value : ${HTTP_OK}`);
    cy.log(`Url : ${Url}`);
    cy.log(`Type : ${Type}`);

    const formData = new FormData(); // FormData 생성
    let endPoint = '';

    /* 파일을 FormData에 추가 */
    switch (Type) {
        case '이미지':
            endPoint = `${Url}/api/prediction`;
            cy.log(`endPoint : ${endPoint}`);
            cy.fixture('image/2D_CL_Case1/google_0001.jpg', 'binary')
                .then(Cypress.Blob.binaryStringToBlob)
                .then(fileContent => {
                    // const formData = new FormData();
                    formData.set('requestFile', new File([fileContent], 'google_0001.jpg'));
                    apiRequest(endPoint, formData);
                });

            break;
        case '레코드':
            endPoint = `${Url}/api/inference`;
            cy.log(`endPoint : ${endPoint}`);
            cy.fixture('record/자동화용 데이터셋.csv').then(fileContent => {
                formData.append('file', new Blob([fileContent], { type: 'text/csv' }), '자동화용 데이터셋.csv'); // 첨부할 파일 입력
                apiRequest(endPoint, formData);
            });
            break;
    }
}

function apiRequest(endPoint, formData) {
    cy.log('requset 호출');

    cy.request({
        method: 'POST',
        url: endPoint,
        failOnStatusCode: false,
        maxBodyLength: Infinity,
        headers: {
            'Content-Type': 'multipart/form-data', // Content-Type을 multipart/form-data로 설정
        },
        body: formData, // FormData를 요청 본문으로 사용
        timeout: 100000, // 타임아웃을 밀리초 단위로 설정
    }).then(response => {
        // 응답 코드가 200인 경우만 처리
        cy.log(`Status : ${response.status}`);
        cy.log(`HTTP_OK Value : ${HTTP_OK}`);

        if (response.status === HTTP_OK) {
            const decoder = new TextDecoder('utf-8'); // ArrayBuffer의 데이터를 utf-8 문자열로 디코딩
            const decodedText = decoder.decode(response.body); // ArrayBuffer 디코딩

            cy.log(decodedText); // 디코딩된 데이터 확인

            expect(response.status).to.eq(HTTP_OK); // 200 응답 코드 확인
        }
    });
}

module.exports = {
    api: api,
};
