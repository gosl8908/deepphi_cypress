const { HTTP_OK, IMAGE, RECORD } = require('./constant.module.js');

function api(Url, Type) {
    const FormDataset = new FormData(); // FormData 생성
    // EndPoint 변수를 빈 문자열로 초기화합니다.
    let EndPoint = '';

    /* 파일을 FormData에 추가 */
    // Type 변수에 따라 다른 작업을 수행합니다.
    switch (Type) {
        // Type이 IMAGE인 경우:
        case IMAGE:
            // 이미지 업로드를 위한 엔드포인트 URL을 설정합니다.
            EndPoint = `${Url}/api/prediction`;
            // 엔드포인트 URL을 로그로 출력합니다.
            cy.log(`EndPoint : ${EndPoint}`);
            // 이미지 파일을 이진(binary) 형식으로 읽어옵니다.
            cy.fixture('image/2D_CL_Case1/google_0001.jpg', 'binary')
                // 바이너리 스트링을 Blob으로 변환합니다.
                .then(Cypress.Blob.binaryStringToBlob)
                // Blob 객체를 생성하여 FormData에 추가합니다.
                .then(fileContent => {
                    // FormData에 'requestFile'이라는 이름으로 파일을 설정합니다.
                    FormDataset.set('requestFile', new File([fileContent], 'google_0001.jpg'));
                    // API 요청을 수행합니다.
                    apiRequest(EndPoint, FormDataset);
                });
            break;

        // Type이 RECORD인 경우:
        case RECORD:
            // 레코드 업로드를 위한 엔드포인트 URL을 설정합니다.
            EndPoint = `${Url}/api/inference`;
            // 엔드포인트 URL을 로그로 출력합니다.
            cy.log(`EndPoint : ${EndPoint}`);
            // 레코드 파일을 읽어옵니다.
            cy.fixture('record/자동화용 데이터셋.csv').then(fileContent => {
                // Blob 객체를 생성하여 FormData에 추가합니다.
                FormDataset.append('file', new Blob([fileContent], { type: 'text/csv' }), '자동화용 데이터셋.csv'); // 첨부할 파일 입력
                // API 요청을 수행합니다.
                apiRequest(EndPoint, FormDataset);
            });
            break;
    }
}

function apiRequest(EndPoint, FormDataset) {
    cy.log('requset 호출');

    cy.log(EndPoint);

    cy.request({
        // HTTP 요청 방법을 지정합니다. 이 경우 POST 요청을 사용합니다.
        method: 'POST',

        // 인코딩 방식을 지정합니다. 주로 UTF-8을 사용합니다.
        encoding: 'utf-8',

        // 요청을 보낼 URL을 지정합니다. EndPoint 변수에 저장된 값으로 지정됩니다.
        url: EndPoint,

        // 상태 코드가 실패해도 테스트를 중지하지 않고 계속 진행하도록 설정합니다.
        failOnStatusCode: false,

        // 요청 본문의 최대 길이를 무제한으로 설정합니다.
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
