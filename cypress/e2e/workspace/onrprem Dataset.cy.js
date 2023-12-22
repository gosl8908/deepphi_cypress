const { loginModule } = require('../module/manager.module.js');

describe('Test', () => {
  before(()=>{
    cy.setDateToEnv();
    cy.getAllCookies(); // 쿠키 삭제
    cy.getAllLocalStorage(); // 로컬 삭제
    cy.getAllSessionStorage(); // 세션 삭제
  });

  it('test', () => {
    // 로그인
    loginModule.login( Cypress.env('onprem'), Cypress.env('onprem_id'), Cypress.env('password') );

    cy.get('.gnb__nav > :nth-child(1) > button').click(); // 데이터셋
    cy.get('.dashboard__header--control > .list-dropdown-wrap > .btn').click(); // 업로드

    //이미지
    cy.get('.dashboard__header--control > .list-dropdown-wrap > .list-dropdown > :nth-child(1) > button').click(); //이미지

    // 데이터셋 정보 입력
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
    cy.wait(10000);

    // 데이터셋 매니지먼트 화면 진입
    cy.log('첫번째 데이터셋 선택')
    cy.get(':nth-child(2) > .dashboard-card > .dashboard-card__name > button').click(); // 1번째 데이터셋 선택 
    cy.wait(5000);
    cy.get('#DontShowItAgain').click({ force: true }); // 팝업 다시 보지 않기
    cy.get('.text-center > .btn').click(); // 팝업 닫기
    cy.wait(10000);

    // 변환
    cy.get('#convert-btn').click(); // 변환
    cy.get(':nth-child(2) > .list-dropdown > .ng-star-inserted > button').click({ force: true }); // 검색된 모든 파일
    cy.wait(60000); 
    cy.get('.default-tab > ul > :nth-child(2) > button').click({ force: true }); // 변화된 파일 탭
    cy.contains('사용 용도 수정');
    cy.wait(5000);

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

    // 레코드
    cy.get('.gnb__nav > :nth-child(1) > button').click(); // 데이터셋
    cy.get('.dashboard__header--control > .list-dropdown-wrap > .btn').click(); // 업로드

    // 레코드
    cy.get('.dashboard__header--control > .list-dropdown-wrap > .list-dropdown > :nth-child(2) > button').click(); // 레코드

    // 데이터셋 정보 입력
    cy.get('#dataset_name').type(Cypress.env('RecordDatasetName')); // 데이터셋 이름 입력
    cy.get('.note-editable').type(Cypress.env('RecordDatasetName')); // 데이터셋 내용 입력
    cy.get('.page-button > .btn').click(); // 다음
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
    cy.get('em').click(); // 자동탐지 체크
    cy.get('.btn-primary').click(); // 다음
    cy.get('.default-tab > ul > :nth-child(2) > button').click(); // 레코드 데이터셋 탭
    cy.contains('업로드중에는 진입이 불가능합니다.'); // 업로드 로딩 체크
    cy.wait(150000);

    cy.get(':nth-child(2) > .dashboard-card > .dashboard-card__name > button').click({force: true}); // 데이터셋 매니지먼트 접속
    cy.get('.main-content__wrap > .create-dataset > .clear-box > .page-button > .btn:nth-child(2)').click({force: true}); // 완료
    cy.wait(20000); // 20초 대기
    cy.contains('샘플데이터'); // 업로드 정상 체크
});
  });
});