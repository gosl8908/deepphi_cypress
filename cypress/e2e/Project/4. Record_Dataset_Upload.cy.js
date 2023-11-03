const { loginModule , emailModule } = require('../../e2e/Module/moduleManager.js');

describe('Record Dataset Upload Test', () => {
  before(()=>{
    cy.setDateToEnv();
    cy.getAllCookies(); // 쿠키 삭제
    cy.getAllLocalStorage(); // 로컬 삭제
    cy.getAllSessionStorage(); // 세션 삭제
    cy.viewport(1920, 1080); // FHD 해상도 설정
  });

  it('Record Dataset Upload', () => {
    loginModule.login( Cypress.env('prod'), Cypress.env('auto_test_id'), Cypress.env('password') );

    cy.contains('레코드 데이터셋').click(); // 데이터셋 화면 진입
    cy.wait(3000);
    cy.contains('데이터셋 업로드').click(); // 데이터셋 업로드 화면 진입
    cy.wait(3000);
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
    cy.contains('업로드중 중에는 진입이 불가능합니다.'); // 업로드 로딩 체크
    cy.screenshot('Record_Dataset_Upload'+ Cypress.env('date_label'));
    cy.wait(120000); // 120초 대기

    cy.get(':nth-child(1) > .dashboard-card__item--body > .title').click(); // 데이터셋 매니지먼트 접속
    cy.get('.page-button > .btn-primary').click(); // 완료
    cy.wait(20000); // 20초 대기
    cy.contains('샘플데이터'); // 업로드 정상 체크

    emailModule.email(emailtitle, emailbody);
  });
});