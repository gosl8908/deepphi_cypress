const { HTTP_OK, IMAGE, RECORD } = require('./constant.module.js');

function api(Url, Type) {
    const FormDataset = new FormData(); // FormData 생성
    let EndPoint = '';

    /* 파일을 FormData에 추가 */
    switch (Type) {
        case IMAGE:
            EndPoint = `${Url}/api/prediction`;
            cy.log(`EndPoint : ${EndPoint}`);
            cy.fixture('image/2D_CL_Case1/google_0001.jpg', 'binary')
                .then(Cypress.Blob.binaryStringToBlob)
                .then(fileContent => {
                    FormDataset.set('requestFile', new File([fileContent], 'google_0001.jpg'));
                    apiRequest(EndPoint, FormDataset);
                });

            break;
        case RECORD:
            EndPoint = `${Url}/api/inference`;
            cy.log(`EndPoint : ${EndPoint}`);
            cy.fixture('record/자동화용 데이터셋.csv').then(fileContent => {
                FormDataset.append('file', new Blob([fileContent], { type: 'text/csv' }), '자동화용 데이터셋.csv'); // 첨부할 파일 입력
                apiRequest(EndPoint, FormDataset);
            });
            break;
    }
}

function apiRequest(EndPoint, FormDataset) {
    cy.log('requset 호출');

    cy.log(EndPoint);

    cy.request({
        method: 'POST',
        encoding: 'utf-8',
        url: EndPoint,
        failOnStatusCode: false,
        maxBodyLength: Infinity,
        headers: {
            'Content-Type': 'multipart/form-data', // Content-Type을 multipart/form-data로 설정
        },
        body: FormDataset, // FormData를 요청 본문으로 사용
        timeout: 100000, // 타임아웃을 밀리초 단위로 설정
    }).then(response => {
        // 응답 코드가 200인 경우만 처리
        cy.log(`Status : ${response.status}`);
        cy.log(`HTTP_OK Value : ${HTTP_OK}`);

        if (response.status === HTTP_OK) {
            const Decoder = new TextDecoder('utf-8'); // ArrayBuffer의 데이터를 utf-8 문자열로 디코딩
            const DecodedText = Decoder.decode(response.body); // ArrayBuffer 디코딩

            cy.log(DecodedText); // 디코딩된 데이터 확인

            expect(response.status).to.eq(HTTP_OK); // 200 응답 코드 확인
        }
    });
}

module.exports = {
    api: api,
};
