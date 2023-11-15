const { loginModule , emailModule } = require('../../e2e/Module/moduleManager.js');

describe('Image Dataset Upload Test', () => {
    before(()=>{
      cy.setDateToEnv();
      cy.getAllCookies(); // 쿠키 삭제
      cy.getAllLocalStorage(); // 로컬 삭제
      cy.getAllSessionStorage(); // 세션 삭제
    });
    
    it('Image Dataset Upload test', () => {
      // 로그인
      loginModule.login( Cypress.env('prod'), Cypress.env('auto_test_id'), Cypress.env('password') );

        // 이미지 데이터셋 생성
        cy.contains('이미지 데이터셋').click(); // 데이터셋 화면 진입
        cy.wait(5000);
        cy.contains('데이터셋 업로드').click(); // 데이터셋 업로드 화면 진입
        cy.wait(3000);
        cy.get('#dataset_name').type(Cypress.env('ImageDatasetName')); // 데이터셋 이름 입력
        cy.get('.note-editable').type(Cypress.env('ImageDatasetName')); // 데이터셋 내용 입력
        cy.get('form.ng-dirty > .create-dataset > .step-content-box > .page-button > .btn').click(); // 다음
        cy.get(':nth-child(1) > dd > ul > :nth-child(1) > .radio-graphic > div > label > em').click(); // 2D 이미지 데이터 선택
        cy.get(':nth-child(2) > dd > ul > :nth-child(1) > .radio-graphic > div > label > em').click(); // 분류 선택
        cy.get(':nth-child(1) > .folder-structure-content > .folder-structure-content__header').click(); // 유형 1 선택
        cy.get('form.ng-untouched > .create-dataset > .step-content-box > .page-button > .btn-primary').click(); // 다음

        // 파일 첨부
        cy.fixture('자동화용 데이터셋(2D 분류).zip').then(fileContent => {
            cy.get('input[accept=".zip"][type="file"]').attachFile({
                fileContent,
                filePath: 'C:\\my-cypress-project\\cypress\\fixtures\\자동화용 데이터셋(2D 분류).zip',
                fileName: '자동화용 데이터셋(2D 분류).zip',
                mimeType: 'application/zip'
        });

        // 업로드
        cy.get('[style=""] > .step-content-box > .page-button > .btn-primary').click();
        cy.wait(3000);
        cy.contains('성공'); // 업로드 확인
        cy.screenshot('Image_Dataset_Upload' + Cypress.env('date+label'));


        // 데이터셋 매니지먼트 화면 진입
        cy.log('첫번째 데이터셋 선택')
        cy.get(':nth-child(1) > .dashboard-card__item--body > .title').click(); // 1번째 데이터셋 선택 
        cy.get('#DontShowItAgain').click(); // 팝업 다시 보지 않기
        cy.get('.text-center > .btn').click(); // 팝업 닫기
        cy.wait(50000);

        // 변환
        cy.get('#convert-btn').click(); // 변환
        cy.get(':nth-child(2) > .list-dropdown > .ng-star-inserted > button').click(); // 검색된 모든 파일
        cy.wait(60000); 
        cy.get('.default-tab > ul > :nth-child(2) > button').click(); // 변화된 파일 탭
        cy.contains('사용 용도 수정');
        cy.wait(60000);

        // 사용 용도 수정
        cy.get('#btn-edit-usage').click(); // 사용 용도 수정
        cy.get('.right-content > :nth-child(1) > .list-dropdown > :nth-child(1) > button').click(); // 검색된 모든 파일
        cy.get('.modal-button-content > .btn-primary').click(); // 저장
        cy.wait(5000);
        cy.contains(/학습.*검증/); // 사용 용도 확인

        // 데이터셋에 파일 포함
        cy.get('#include-btn').click(); // 데이터셋에 파일 포함
        cy.get(':nth-child(2) > .list-dropdown > .ng-star-inserted > button').click(); // 검색된 모든 파일
        cy.get('.modal-button-content > .btn-primary').click(); // 계속
        cy.wait(5000)
        cy.contains('DatasetUpload');

        // 데이터셋 이름 변경
        cy.get('.dataset-management__lnb--content > :nth-child(1) > button.ng-tns-c0-0').click(); // 인사이트 탭
        cy.get('.right-content > .btn').click(); // 수정
        cy.wait(3000);
        cy.get("#module_name").eq(1).type('DatasetNameChange'); // 이름 수정
        cy.get('.modal-button-content > .btn-primary').click(); // 저장
        cy.wait(1000);

        // 데이터셋 삭제
        cy.get('#dataset-menu-btn').click(); // 메뉴 선택
        cy.get('.list-dropdown > li.ng-tns-c0-0 > .ng-tns-c0-0').click(); // 데이터셋 삭제
        cy.contains('삭제'); // 삭제 확인 
        cy.get('.btn-danger').click(); // 삭제 버튼
        cy.wait(10000);
        cy.contains('데이터를 업로드하여 연구용 데이터셋을 만들 수 있습니다.'); // 데이터셋 삭제 확인
        
        emailModule.email( Cypress.env('emailtitle'), Cypress.env('image_Dataset_Upload_emailbody') );
  });
    });
});