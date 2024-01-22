const { HTTP_OK, IMAGE, RECORD } = require('./constant.module.js');

function api(Url, Type) {


    const formData = new FormData(); // FormData 생성
    let endPoint = '';

    /* 파일을 FormData에 추가 */
    switch (Type) {
        case IMAGE:
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
        case RECORD:
            endPoint = `${Url}/api/inference`;
            cy.log(`endPoint : ${endPoint}`);
            cy.fixture('record/자동화용 데이터셋.csv').then(fileContent => {
                formData.append('file', new Blob([fileContent], { type: 'text/csv' }), '자동화용 데이터셋.csv'); // 첨부할 파일 입력
                apiRequest(endPoint, formData);
            });
            break;
    }
}
module.exports = {
    api: api,
};
