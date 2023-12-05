const { loginModule , emailModule } = require('../Module/moduleManager.js');

describe('Dataset Upload Test', () => {
    before(()=>{
      cy.setDateToEnv();
      // cy.getAllCookies(); // 쿠키 삭제
      // cy.getAllLocalStorage(); // 로컬 삭제
      // cy.getAllSessionStorage(); // 세션 삭제
    });
    
    it('Dataset Upload test', () => {
   
   loginModule.login( Cypress.env('prod'), Cypress.env('auto_test_id'), Cypress.env('password') );


    /* 데이터셋 업로드 */
    cy.get('#site-map__flow-btn').click(); // 네비게이션
    cy.get('[routerlink="user/image/dataset"] > button').click(); // 이미지 데이터셋
    cy.wait(5000);
    cy.contains('데이터셋 업로드').click(); // 데이터셋 업로드 화면 진입
    cy.wait(3000);

    /* 데이터셋 정보 입력 */
    cy.get('#dataset_name').type(Cypress.env('ImageDatasetName')); // 데이터셋 이름 입력
    cy.get('.note-editable').type(Cypress.env('ImageDatasetName')); // 데이터셋 내용 입력
    cy.get('form.ng-dirty > .create-dataset > .step-content-box > .page-button > .btn').click(); // 다음
    cy.get(':nth-child(1) > dd > ul > :nth-child(1) > .radio-graphic > div > label > em').click(); // 2D 이미지 데이터 선택
    cy.get(':nth-child(2) > dd > ul > :nth-child(1) > .radio-graphic > div > label > em').click(); // 분류 선택
    cy.get(':nth-child(1) > .folder-structure-content > .folder-structure-content__header').click(); // 유형 1 선택
    cy.get('form.ng-untouched > .create-dataset > .step-content-box > .page-button > .btn-primary').click({ force: true }); // 다음
    cy.wait(3000);

   /* 파일 업로드 */
    cy.fixture('자동화용 데이터셋(2D 분류).zip').then(fileContent => {
        cy.get('input[accept=".zip"][type="file"]').attachFile({
            fileContent,
            filePath: 'C:\\my-cypress-project\\cypress\\fixtures\\자동화용 데이터셋(2D 분류).zip',
            fileName: '자동화용 데이터셋(2D 분류).zip',
            mimeType: 'application/zip'
        });
    });
    cy.wait(3000);

    /* 업로드 */
    cy.get('[style=""] > .step-content-box > .page-button > .btn-primary').click({ force: true });
    cy.wait(3000);
    cy.contains('성공'); // 업로드 확인

    /* 데이터셋 매니지먼트 화면 진입 */
    cy.log('첫번째 데이터셋 선택')
    cy.wait(10000);
    cy.get(':nth-child(1) > .dashboard-card__item--body > .title').click(); // 1번째 데이터셋 선택 
    cy.wait(5000);
    cy.get('#DontShowItAgain').click({ force: true }); // 팝업 다시 보지 않기
    cy.get('.text-center > .btn').click(); // 팝업 닫기
    cy.wait(30000);

    /* 변환 */
    cy.get('#convert-btn').click(); // 변환
    cy.get(':nth-child(2) > .list-dropdown > .ng-star-inserted > button').click({ force: true }); // 검색된 모든 파일
    cy.wait(60000); 
    cy.get('.default-tab > ul > :nth-child(2) > button').click({ force: true }); // 변화된 파일 탭
    cy.contains('사용 용도 수정');
    cy.wait(5000);

    /* 사용 용도 수정 */
    cy.get('#btn-edit-usage').click(); // 사용 용도 수정
    cy.get('.right-content > :nth-child(1) > .list-dropdown > :nth-child(1) > button').click(); // 검색된 모든 파일
    cy.get('.modal-button-content > .btn-primary').click(); // 저장
    cy.wait(5000);
    cy.contains(/학습.*검증/); // 사용 용도 확인

    /* 데이터셋에 파일 포함 */
    cy.get('#include-btn').click(); // 데이터셋에 파일 포함
    cy.get(':nth-child(2) > .list-dropdown > .ng-star-inserted > button').click(); // 검색된 모든 파일
    cy.get('.modal-button-content > .btn-primary').click(); // 계속
    cy.wait(5000)

    /* 레코드 데이터셋 업로드 */
   cy.get('.ng-tns-c0-0 > .ng-tns-c0-0 > #site-map__flow-btn > .ng-tns-c0-0 > #sitemap-svg').click(); // 네비게이션
   cy.get('.gnb__site-map__content > #dataset-menu > #dataset-menu-ul > li:nth-child(2) > button').click(); // 레코드 데이터셋
   cy.wait(3000);
   cy.contains('데이터셋 업로드').click(); // 데이터셋 업로드 화면 진입
   cy.wait(3000);

   /* 데이터셋 정보 입력 */
   cy.get('#dataset_name').type(Cypress.env('RecordDatasetName')); // 데이터셋 이름 입력
   cy.get('.note-editable').type(Cypress.env('RecordDatasetName')); // 데이터셋 내용 입력
   cy.get('.page-button > .btn').click(); // 다음

   /* 파일 업로드 */
   cy.fixture('자동화용 데이터셋.csv').then(fileContent => {
     cy.get('input[accept=".csv"][type="file"]').eq(0).attachFile({ // 학습 데이터셋
         fileContent,
         filePath: 'C:\\my-cypress-project\\cypress\\fixtures\\자동화용 데이터셋.csv',
         fileName: '자동화용 데이터셋.csv',
         mimeType: 'text/csv'
 });
   cy.get('input[accept=".csv"][type="file"]').eq(1).attachFile({ // 검증 데이터셋
       fileContent,
       filePath: 'C:\\my-cypress-project\\cypress\\fixtures\\자동화용 데이터셋.csv',
       fileName: '자동화용 데이터셋.csv',
       mimeType: 'text/csv'
});
      cy.get('input[accept=".csv"][type="file"]').eq(2).attachFile({ // 평가 데이터셋
          fileContent,
          filePath: 'C:\\my-cypress-project\\cypress\\fixtures\\자동화용 데이터셋.csv',
          fileName: '자동화용 데이터셋.csv',
          mimeType: 'text/csv'
  });
    });
    cy.wait(3000);

    /* 업로드 */
    cy.get('em').click(); // 자동탐지 체크
    cy.get('.btn-primary').click(); // 다음
    cy.contains('업로드중 중에는 진입이 불가능합니다.'); // 업로드 로딩 체크
    cy.wait(150000); 

    /*  데이터셋 설정 */
    cy.get(':nth-child(1) > .dashboard-card__item--body > .title').click({force: true}); // 데이터셋 매니지먼트 접속
    cy.wait(3000);
    cy.contains('삭제')
    cy.get('.fa-solid.fa-check').eq(1).click({force: true});
    cy.wait(20000); // 20초 대기
    cy.contains('샘플데이터'); // 업로드 정상 체크
   });
        
    emailModule.email('Dataset Upload Test ' + Cypress.env('emailtitle'), Cypress.env('Dataset_Upload_emailbody') );
     }); 