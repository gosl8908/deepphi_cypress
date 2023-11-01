
describe('Record Dataset Upload Test', () => {
  before(()=>{
    cy.setDateToEnv();
    cy.viewport(1920, 1080); // FHD 해상도 설정
    cy.clearCookies(); // 모든 쿠키 지우기
  });

  it('Record Dataset Upload', () => {
    cy.visit(Cypress.env('prod')) 
    cy.contains('로그인').click(); // 로그인 클릭
    cy.get('#username').type(Cypress.env('auto_test_id')); // 이메일 입력
    cy.get('#password').type(Cypress.env('Password')); // 비밀번호 입력
    cy.get('#kc-login').click() // 로그인 선택
    cy.wait(5000);

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
          filePath: 'C:\\cypress\\cypress\\fixtures\\자동화용 데이터셋.csv',
          fileName: '자동화용 데이터셋.csv',
          mimeType: 'text/csv'
  });
    cy.get('input[accept=".csv"][type="file"]').eq(1).attachFile({ // 검증 데이터셋
        fileContent,
        filePath: 'C:\\cypress\\cypress\\fixtures\\자동화용 데이터셋.csv',
        fileName: '자동화용 데이터셋.csv',
        mimeType: 'text/csv'
});
      cy.get('input[accept=".csv"][type="file"]').eq(2).attachFile({ // 평가 데이터셋
          fileContent,
          filePath: 'C:\\cypress\\cypress\\fixtures\\자동화용 데이터셋.csv',
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

        // 테스트 결과 이메일 전송
    
        // 테스트 결과를 로그로 기록합니다
        cy.log("테스트가 성공적으로 완료되었습니다.");

        // 테스트 결과를 포함한 이메일을 보냅니다
        const emailSubject = "Cypress Record Dataset Upload 테스트 결과";
        const emailBody = "Cypress Record Dataset Upload 테스트 스위트(학습, 검증, 평가 데이터셋)가 성공적으로 완료되었습니다.";
    
        cy.task("sendEmail", {
          recipient: "gosl8908@deepnoid.com, js_lee@deepnoid.com",
          subject: emailSubject,
          body: emailBody,
        }).then((success) => {
          if (success) {
            cy.log("이메일 전송 성공.");
          } else {
            cy.log("이메일 전송 실패.");
          }
        });
  });
});