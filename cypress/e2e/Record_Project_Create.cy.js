
describe('Record Project Create & Run', () => {

  before(() => {
    cy.setDateToEnv();
    cy.viewport(1920, 1080); // FHD 해상도 설정
    cy.clearCookies(); // 모든 쿠키 지우기
    
  });

  it('Record Project Create & Run', () => {
    cy.visit(Cypress.env('prod')) 
    cy.contains('로그인').click(); // 로그인 클릭
    cy.get('#username').type(Cypress.env('auto_test_id')); // 이메일 입력
    cy.get('#password').type(Cypress.env('Password')); // 비밀번호 입력
    cy.get('#kc-login').click() // 로그인 선택
    cy.wait(3000);

    // 프로젝트 생성
    cy.contains('프로젝트 생성').click(); // 프로젝트 생성 
    cy.get(':nth-child(2) > .create-select-item__container > .create-select-item__content').click(); // 레코드 선택
    cy.get('.modal-button-content > .btn').click(); // 다음
    cy.get('#project_name').type(Cypress.env('RecordProjectName')); // 프로젝트 제목
    cy.get('.note-editable').type(Cypress.env('RecordProjectName')); // 프로젝트 내용
    cy.get('.modal-button-content > .btn-primary').click(); // 완료
    cy.wait(10000); // 10초 대기

    // 리소스 설정
    cy.get('.modeler__nav > ul > :nth-child(3) > button').click(); // 리소스 탭
    cy.get(':nth-child(5) > dd > .select-row__content > :nth-child(2) > .select-row__item > .radio-item > em').click(); // 데이터 프로세싱 cpu.4
    cy.get(':nth-child(5) > dd > .select-row__content > :nth-child(2) > .select-row__item > .form-item > .label-form > .input-form').type('2');
    cy.get('.resource-setting__item-container.mb10 > dd > .select-row__content > :nth-child(2) > .select-row__item > .radio-item > em').click(); // 머신러닝 cpu.4
    cy.get('.resource-setting__item-container.mb10 > dd > .select-row__content > :nth-child(2) > .select-row__item > .form-item > .label-form > .input-form').type('2');
    // cy.get('.cpu-gpu--selector > :nth-child(2) > div > .radio-item > em').click(); // 뉴럴 네트워크 CPU
    // cy.get(':nth-child(7) > dd > .select-row__content > :nth-child(2) > .select-row__item > .radio-item > em').click(); // 뉴럴 네트워크 cpu.4
    // cy.get(':nth-child(7) > dd > .select-row__content > :nth-child(2) > .select-row__item > .form-item > .label-form > .input-form').type('2');
    cy.get('.btn-primary').click(); // 저장
    cy.get('.modal-button-content > .btn-primary').click(); // 확인
    cy.contains('성공적으로 저장되었습니다.'); // 저장 확인
    cy.wait(3000);

    // 모듈 추가
    cy.get('.modeler__nav > ul > :nth-child(1) > button').click(); // 모듈 탭
    cy.contains('공개 데이터셋').click();
    cy.contains('영화 흥행 예측').click();

    // 모델러 화면 인식
    cy.get("#graphContainerTrain > svg", { force: true }).should('exist').as('svg');
    cy.wait(3000);

    cy.get('#\\38 558').should('exist').as('Dataset'); // 데이터셋 별 값이 달라 변경 필요
    cy.wait(3000);

    // 데이터셋 모듈 모델러에 추가
    cy.ModuleAdd('@Dataset', '@svg', 500, 300);

    // 프로세싱 모듈 추가
    cy.get('.ImageProcess').click(); // 프로세싱 탭
    cy.contains('데이터 클렌징').click(); // 데이터 클랜징 선택
    cy.contains('데이터 프로세싱').click();
    cy.wait(3000);

    // Cleansing 모듈 인식
    cy.get('#\\31 05').should('exist').as('Cleansing');
    cy.wait(3000);

    // Cleansing 모듈 모델러에 추가
    cy.ModuleAdd('@Cleansing', '@svg', 600, 300);

    // Processing 모듈 인식
    cy.get('#\\31 06').should('exist').as('Processing');
    cy.wait(3000);

    // Processing 모듈 모델러에 추가
    cy.ModuleAdd('@Processing', '@svg', 700, 300);

    // DNN-Classification 모듈 검색
    cy.get('.NeuralNetwork').click();
    cy.get('form.ng-untouched > .search-box > .input-form').type('DNN-Classification');
    cy.get('form.ng-untouched > .search-box > .btn').click();
    cy.wait(3000);

    // DNN-Classification 모듈 인식
    cy.get('#\\36 572').should('exist').as('DNN-Classification');
    cy.wait(3000);
    
    // DNN-Classification 모듈 모델러에 추가
    cy.ModuleAdd('@DNN-Classification', '@svg', 800, 300);

    // Decision Tree Classifier 모듈 검색
    cy.get('.input-form').clear().type('Decision Tree Classifier');
    cy.get('.search-box > .btn').click();
    cy.wait(3000);

    // Decision Tree Classifier 모듈 인식
    cy.get('#\\36 443').should('exist').as('Decision Tree Classifier');
    cy.wait(3000);
    
    // Decision Tree Classifier 모듈 모델러에 추가
    cy.ModuleAdd('@Decision Tree Classifier', '@svg', 900, 300);
    cy.wait(3000);

    
    // 데이터셋 클릭
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image").click();
    cy.wait(2000);

    //데이터셋에서 클렌징 연결

    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image").realHover('mouse');
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image").realMouseDown().realMouseMove(100, 0).realMouseUp().realMouseUp();
    cy.wait(3000);

    // 데이터셋 클릭
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image").click();
    cy.wait(2000);
      
    //클렌징에서 프로세싱 연결
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(3) > image").realHover('mouse');  
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image").realMouseDown().realMouseMove(100, 0).realMouseUp().realMouseUp();
    cy.wait(3000);

    // 데이터셋 클릭
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image").click();
    cy.wait(2000);

    //프로세싱에서 DNN-Classification 연결
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(5) > image").realHover('mouse');  
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image").realMouseDown().realMouseMove(100, 0).realMouseUp().realMouseUp();
    cy.wait(3000);

    // 데이터셋 클릭
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image").click();
    cy.wait(2000);

    //DNN-Classification에서 Decision Tree Classifier 연결
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(7) > image").realHover('mouse');  
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image").realMouseDown().realMouseMove(100, 0).realMouseUp().realMouseUp();
    cy.wait(3000);

    //클렌징 모듈 설정
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(3) > image").click(); // 클렌징 모듈 선택
    cy.get(':nth-child(3) > :nth-child(2) > image').click(); // 모듈 더보기
    cy.get(':nth-child(3) > [align="left"]').click(); // 프로세스 플로우 진입
    cy.wait(3000);
    cy.get('.btn-floating > .fas').click(); // 클렌징 모듈 추가
    cy.contains('Text Column Categorize').click(); // Text Column Categorize 선택
    cy.get("#\\31 1 > .cdk-drag > .button-list > .btn").click(); // 추가
    cy.wait(3000);
    cy.contains('Calculation').click(); // Calculation 선택
    cy.get('#\\31 3 > .cdk-drag > .button-list > .btn').click(); // 추가
    cy.wait(3000);

    // Text Column Categorize 설정
    cy.get('[value="2"] > .flow-item > .flow-item__name').click(); 
    cy.get('.nav-project-right > ul > :nth-child(2) > button').click(); // 설정 탭
    cy.get('.ui-multiselect-label').click(); // 대상 선택
    cy.get(':nth-child(1) > .ui-multiselect-item > .bullet-text').click(); // 대상 선택
    cy.get('.flex-button-box > :nth-child(2) > .btn').click(); // 저장
    cy.contains('성공적으로 저장하였습니다'); // 저장 확인
    cy.wait(5000);

    // Calculation 설정
    cy.get('[value="3"] > .flow-item > .flow-item__name').click(); // Calculation 선택
    cy.get(':nth-child(1) > .input-form > .ui-dropdown > .ui-dropdown-trigger > .ui-dropdown-trigger-icon').click(); // 열 선택
    cy.get(':nth-child(1) > .ui-dropdown-item > div.ng-star-inserted > div').click(); // 상영시간 선택
    cy.get('.combination-column-select > .btn').click(); // 추가
    cy.get('.combination-column__button > :nth-child(3)').click(); // + 선택
    cy.get(':nth-child(1) > .input-form > .ui-dropdown > .ui-dropdown-trigger > .ui-dropdown-trigger-icon').click(); // 열 선택
    cy.get(':nth-child(6) > .ui-dropdown-item > div.ng-star-inserted > div').click(); // 관객수
    cy.get('.combination-column-select > .btn').click(); // 추가
    cy.get('.column-form > :nth-child(1) > .input-form').type('열추가') // 열 이름 입력
    cy.get('.column-form > :nth-child(2) > :nth-child(2) > .input-form > .ui-dropdown > .ui-dropdown-trigger').click(); // 열 위치 
    cy.get(':nth-child(4) > .ui-dropdown-item').click(); // 상영시간
    cy.get('.flex-button-box > :nth-child(2) > .btn').click(); // 저장
    cy.contains('성공적으로 저장하였습니다'); // 저장 확인
    cy.wait(5000);
    cy.get('.title > button > .fa-solid').click(); // 닫기
    cy.get('.right-content > .btn').click(); // 플로우 화면 나가기

    // 프로세싱 모듈 설정
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(9) > image").click(); // 프로세싱 모듈 선택
    cy.wait(2000);
    cy.get(':nth-child(3) > :nth-child(2) > image').click(); // 모듈 더보기
    cy.get(':nth-child(3) > [align="left"]').click(); // 프로세스 플로우 진입
    cy.wait(3000);
    cy.get('.btn-floating > .fas').click(); // 프로세싱 모듈 추가
    cy.contains('Scale').click(); // Scale 선택
    cy.contains('추가').click();
    cy.wait(3000);

    // Scale 설정
    cy.get('.flow-item-box > .flow-item > .flow-item__name').click(); // Scale 모듈 선택
    cy.get('.nav-project-right > ul > :nth-child(2) > button').click(); // 설정 탭
    cy.get('.ui-multiselect-trigger-icon').click(); // 작업 대상 펼치기
    cy.get(':nth-child(1) > .ui-multiselect-item').click(); // 상영시간 선택
    cy.get('.ui-multiselect-trigger').click(); // 작업 대상 접기
    // cy.get('.flex-button-box > :nth-child(2) > .btn').click(); // 저장
    // cy.contains('성공적으로 저장하였습니다'); // 저장 확인
    cy.get('td > .input-form > .ui-dropdown > .ui-dropdown-trigger').click(); // 처리 방법
    cy.get(':nth-child(1) > .ui-dropdown-item').click(); // 표준화 선택
    cy.get('.flex-button-box > :nth-child(2) > .btn').click(); // 저장
    cy.contains('성공적으로 저장하였습니다'); // 저장 확인
    cy.wait(5000);
    cy.get('.title > button > .fa-solid').click(); // 닫기
    cy.get('.right-content > .btn').click(); // 플로우 화면 나가기

    // DNN-Classification 클릭
    cy.get(":nth-child(11) > image").click(); // DNN-Classification 모델러 선택
    cy.wait(2000);
    cy.get('.nav-project-right > ul > :nth-child(2) > button').click(); // 변수 설정 탭
    cy.get('.ui-multiselect-trigger').click(); // 입력변수 설정
    cy.get(':nth-child(4) > .ui-multiselect-item > .ui-chkbox > .ui-chkbox-box > .ui-chkbox-icon').click(); // 상영시간 체크
    cy.get('.content-scroll > :nth-child(2) > :nth-child(2) > .input-form > .ui-dropdown > .ui-dropdown-trigger').click(); // 목표변수 설정
    cy.get(':nth-child(8) > .ui-dropdown-item').click(); // 감독의 영화 개수 선택
    cy.get('.input-columns > .btn').click(); // 입력변수 추가
    cy.get('.flex-button-box > :nth-child(2) > .btn').click(); // 저장
    cy.wait(3000);

    // Decision Tree Classifier 클릭
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(13) > image").click(); // Decision Tree Classifier 모델러 선택
    cy.wait(2000);
    cy.get('.ui-multiselect-trigger').click(); // 입력변수 설정
    cy.get(':nth-child(4) > .ui-multiselect-item > .ui-chkbox > .ui-chkbox-box > .ui-chkbox-icon').click(); // 상영시간 체크
    cy.get('.content-scroll > :nth-child(2) > :nth-child(2) > .input-form > .ui-dropdown > .ui-dropdown-trigger').click(); // 목표변수 설정
    cy.get(':nth-child(8) > .ui-dropdown-item').click(); // 감독의 영화 개수 선택
    cy.get('.input-columns > .btn').click(); // 입력변수 추가
    cy.get('.flex-button-box > :nth-child(2) > .btn').click(); // 저장
    cy.wait(3000);

    //프로젝트 Run
    cy.log('프로젝트 실행')
    cy.get('.modeler-header__run-action-button > .btn').click();
    cy.wait(3000);
    cy.contains('실행'); // 실행 상태 체크
    cy.contains('빈도 그래프'); // 생성 확인
    cy.screenshot('Record_Project_Run'+ Cypress.env('date_label'));
    cy.wait(400000); // 5분 대기

    cy.contains('완료'); // 실행 완료 상태 체크
    cy.screenshot('Record_Project_Completed'+ Cypress.env('date_label'));

    // 시각화 생성 & 삭제
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(13) > image").click(); // Decision Tree Classifier 모델러 선택
    cy.get('.tab-item--visualization > button').click(); // 시각화 탭 선택
    cy.get('.visualization__item--creat-info > div > .btn').click(); // 생성 버튼
    cy.wait(3000);
    cy.get('.modal-button-content > .btn-primary').click(); // 다음
    cy.get('.mb15 > .label-form > .input-form').type('x'); // x축 제목
    cy.get('.mb20 > .label-form > .input-form').type('y'); // y축 제목
    cy.get('dd > .input-form > .ui-dropdown > .ui-dropdown-trigger').click(); // x축 열
    cy.get(':nth-child(7) > .ui-dropdown-item').click(); // 열 선택
    cy.get('.modal-button-content > .btn-primary').click(); // 완료
    cy.wait(60000); // 60초 대기
    cy.contains('빈도 그래프'); // 생성 확인
    cy.screenshot('Record_Project_visualization'+ Cypress.env('date_label'));
    cy.get('.visualization__item--control > div.ng-star-inserted > :nth-child(2)').click(); // 삭제 클릭
    cy.get('.btn-danger').click(); // 삭제 클릭
    cy.wait(3000);
    cy.contains('그래프를 생성해보세요.') // 삭제 확인

// 테스트 결과 이메일 전송

    // 테스트 결과를 로그로 기록합니다
    cy.log("테스트가 성공적으로 완료되었습니다.");

    // 테스트 결과를 포함한 이메일을 보냅니다
    const emailSubject = "Cypress Record Project Create, Run 테스트 결과";
    const emailBody = "Cypress Record Project Create, Run 테스트 스위트가 성공적으로 완료되었습니다.";

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