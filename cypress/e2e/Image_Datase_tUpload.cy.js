
describe('Image Dataset Upload Test', () => {
    before(()=>{
      cy.setDateToEnv();
      cy.viewport(1920, 1080); // FHD 해상도 설정
      cy.getAllCookies(); // 쿠키 삭제
      cy.getAllLocalStorage(); // 로컬 삭제
      cy.getAllSessionStorage(); // 세션 삭제
    });
    
    it('Dataset Upload test', () => {
        cy.visit(Cypress.env('prod')) 
        cy.contains('로그인').click(); // 로그인 클릭
        cy.get('#username').type(Cypress.env('auto_test_id')); // 이메일 입력
        cy.get('#password').type(Cypress.env('Password')); // 비밀번호 입력
        cy.get('#kc-login').click() // 로그인 선택
        cy.wait(3000);

        // 이미지 데이터셋 생성
        cy.contains('이미지 데이터셋').click(); // 데이터셋 화면 진입
        cy.contains('데이터셋 업로드').click(); // 데이터셋 업로드 화면 진입
        cy.wait(3000);
        cy.get('#dataset_name').type(Cypress.env('ImageDatasetName')); // 데이터셋 이름 입력
        cy.get('.note-editable').type(Cypress.env('ImageDatasetName')); // 데이터셋 내용 입력
        cy.get('form.ng-dirty > .create-dataset > .step-content-box > .page-button > .btn').click(); // 다음
        cy.get(':nth-child(1) > dd > ul > :nth-child(1) > .radio-graphic > div > label > em').click(); // 2D 이미지 데이터 선택
        cy.get(':nth-child(2) > dd > ul > :nth-child(1) > .radio-graphic > div > label > em').click(); // 분류 선택
        cy.get(':nth-child(1) > .folder-structure-content > .folder-structure-content__header').click(); // 유형 1 선택
        cy.get('form.ng-untouched > .create-dataset > .step-content-box > .page-button > .btn-primary').click(); // 다음
        cy.fixture('자동화용 데이터셋(2D 분류).zip').then(fileContent => {
            cy.get('input[accept=".zip"][type="file"]').attachFile({
                fileContent,
                filePath: 'C:\\my-cypress-project\\cypress\\fixtures\\자동화용 데이터셋(2D 분류).zip',
                fileName: '자동화용 데이터셋(2D 분류).zip',
                mimeType: 'application/zip'
        });
        cy.get('[style=""] > .step-content-box > .page-button > .btn-primary').click(); // 업로드
        cy.wait(3000);
        cy.contains('성공'); // 업로드 확인
        cy.screenshot('Image_Dataset_Upload' + Cypress.env('date+label'));


        // 데이터셋 매니지먼트 화면 진입
        cy.log('첫번째 데이터셋 선택')
        cy.get(':nth-child(1) > .dashboard-card__item--body > .title').click(); // 1번째 데이터셋 선택 
        cy.get('#DontShowItAgain').click(); // 팝업 다시 보지 않기
        cy.get('.text-center > .btn').click(); // 팝업 닫기
        cy.wait(10000);

        // 변환
        cy.get('#convert-btn').click(); // 변환
        cy.get(':nth-child(2) > .list-dropdown > .ng-star-inserted > button').click(); // 검색된 모든 파일
        cy.wait(5000); 
        cy.get('.default-tab > ul > .current > button').click(); // 변화된 파일 탭
        cy.wait(10000);

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

        // 데이터셋 이름 변경
        cy.get('.dataset-management__lnb--content > :nth-child(1) > button.ng-tns-c0-0').click(); // 인사이트 탭
        cy.get('.right-content > .btn').click(); // 수정
        cy.get("#module_name").type('DatasetNameChange'); // 이름 수정
        cy.get('.modal-button-content > .btn-primary').click(); // 저장
        cy.wait(1000);
        cy.contains('DatasetNameChang'); // 이름 수정 확인

        // 데이터셋 삭제
        cy.get('#dataset-menu-btn').click(); // 메뉴 선택
        cy.get('.list-dropdown > li.ng-tns-c0-0 > .ng-tns-c0-0').click(); // 데이터셋 삭제
        cy.contains('삭제'); // 삭제 확인 
        cy.get('.btn-danger').click(); // 삭제 버튼
        cy.wait(10000);
        cy.contains('데이터를 업로드하여 연구용 데이터셋을 만들 수 있습니다.'); // 데이터셋 삭제 확인
        
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
});