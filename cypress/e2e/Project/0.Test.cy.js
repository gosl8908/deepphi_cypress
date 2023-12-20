const { loginModule , imagedatasetModule , recorddatasetModule , record_apiModule, emailModule } = require('../Module/moduleManager.js');

describe('Dataset Upload Test', () => {
    before(()=>{
      cy.setDateToEnv();
      cy.getAllCookies(); // 쿠키 삭제
      cy.getAllLocalStorage(); // 로컬 삭제
      cy.getAllSessionStorage(); // 세션 삭제
    });
    
    it('Dataset Upload test', () => {
   
   loginModule.login( Cypress.env('prod'), Cypress.env('auto_test_id'), Cypress.env('password') );

   imagedatasetModule.imagedataset( Cypress.env('ImageDatasetName'), Cypress.env('date_label') );

   recorddatasetModule.recorddataset( Cypress.env('RecordDatasetName'), Cypress.env('date_label') );

   emailModule.email('Dataset Upload Test ' + Cypress.env('emailtitle'), Cypress.env('Dataset_Upload_emailbody') );

    cy.get(':nth-child(2) > .left-navigation--sub-navi > :nth-child(1) > button.ng-tns-c0-0 > .ng-tns-c0-0').click();

    cy.wait(5000);

     // 프로젝트 생성
     cy.get('#createBtn').click(); // 프로젝트 생성 버튼 클릭
     cy.get(':nth-child(1) > .create-select-item__container > .create-select-item__content').click(); // Image 선택
     cy.get('.modal-button-content > .btn').click(); // 다음 버튼 클릭
     cy.wait(1000);

     // 프로젝트 정보 입력
     cy.get('#project_name').type(Cypress.env('ImageProjectName')); // 프로젝트 타이틀 입력
     cy.get('.note-editable').type(Cypress.env('ImageProjectName')); // 프로젝트 Detail 입력
     cy.get('.modal-button-content > .btn-primary').click(); // 프로젝트 생성 버튼 클릭
     cy.wait(5000);

     // 리소스 설정
     cy.get('.modeler__nav > ul > :nth-child(3) > button').click(); // 리소스 탭
     cy.get(':nth-child(5) > dd > .select-row__content > :nth-child(2) > .select-row__item > .radio-item > em')
     .click(); // 데이터 프로세싱 cpu.4
     // cy.get(':nth-child(5) > dd > .select-row__content > :nth-child(2) > .select-row__item > .form-item > .label-form > .input-form').type('2');
     cy.get('.cpu-gpu--selector > :nth-child(2) > div > .radio-item > em').click(); // 뉴럴 네트워크 CPU
     cy.get(':nth-child(6) > dd > .select-row__content > :nth-child(2) > .select-row__item > .radio-item > em')
     .click(); // 뉴럴 네트워크 cpu.4
     // cy.get(':nth-child(6) > dd > .select-row__content > :nth-child(2) > .select-row__item > .form-item > .label-form > .input-form').type('2');
     cy.get('.btn-primary').click(); // 저장
     cy.get('.modal-button-content > .btn-primary').click(); // 확인
     cy.contains('성공적으로 저장되었습니다.'); // 저장 확인
     cy.wait(3000);
  
     cy.log('모델러 구성')
     // 모델러 화면 인식
     cy.get('.modeler__nav > ul > :nth-child(1) > button').click(); // 모듈 탭 선택
     cy.get("#graphContainerTrain > svg", { force: true }).should('exist').as('svg');
     cy.wait(3000);
     
     // 데이터셋 모듈 검색
     cy.get('form.ng-untouched > .search-box > .input-form').type('Class');
     cy.get('.search-box > .btn').click();
     cy.wait(3000);
  
     // 데이터셋 모듈 인식
     cy.get('#\\39 104').should('exist').as('Dataset'); // 데이터셋 별 값이 달라 변경 필요
     cy.wait(3000);
  
     // 데이터셋 모듈 모델러에 추가
     cy.ModuleAdd('@Dataset', '@svg', 600, 400);
  
     // Resize 모듈 검색
     cy.get('.ImageProcess').click();
     cy.get('form.ng-untouched > .search-box > .input-form').type('resize');
     cy.get('form.ng-untouched > .search-box > .btn').click();
     cy.wait(3000);
  
     // Resize 모듈 인식
     cy.get('#\\31 390').should('exist').as('resize');
     cy.wait(3000);
  
     // Resize 모듈 모델러에 추가
     cy.ModuleAdd('@resize', '@svg', 800, 400);
  
      // VGG16 모듈 검색
     cy.get('.NeuralNetwork').click();
     cy.get('form.ng-untouched > .search-box > .input-form').type('vgg16');
     cy.get('form.ng-untouched > .search-box > .btn').click();
     cy.wait(3000);
  
     // VGG16 모듈 인식
     cy.get('#\\34 7').should('exist').as('vgg16');
     cy.wait(3000);
  
     // VGG16 모듈 모델러에 추가
     cy.ModuleAdd('@vgg16', '@svg', 1000, 400);
  
     cy.wait(3000);
  
     //데이터셋에서 Resize 연결
     cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image").realHover('mouse');
     cy.wait(3000);
     cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image")
     .realMouseDown().realMouseMove(200, 0, ).realMouseUp();
     cy.wait(3000);
  
     // 데이터셋 클릭
     cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image").click();
     cy.wait(1000);
       
     //Resize에서 VGG16 연결
     cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(3) > image").realHover('mouse');  
     cy.wait(3000);
     cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image")
     .realMouseDown().realMouseMove(200, 0).realMouseUp();
     cy.wait(3000);
  
     cy.log('프로젝트 실행')
     //프로젝트 Run
     cy.get('.modeler-header__run-action-button > .btn').click();
     cy.wait(3000);
  
     cy.contains('실행'); // 실행 상태 체크
     cy.wait(3000);

     emailModule.email('Image Project Create Test ' + Cypress.env('emailtitle'), Cypress.env('image_Project_Upload_emailbody'));

     cy.get('#site-map__flow-btn').click();

     cy.get('#project-menu-ul > :nth-child(1) > button').click();
     
     cy.wait(5000);
         
        // 이미지 프로젝트 생성
        cy.get('.search-box > .input-form').type('이미지 평가 프로젝트 자동화 확인용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3000);
        cy.get('.title').click();
        cy.wait(5000);

        // 평가 프로젝트 생성
        cy.get('.modeler__nav > ul > :nth-child(2) > button').click(); // 평가 프로젝트 탭
        cy.wait(3000);
        cy.get('.btn-floating > div').click({force: true}); // 생성
        cy.get('.modal-button-content > .btn').click(); // 확인
        cy.get('.btn-primary').click(); // 확인
        cy.get('.btn-primary').click(); // 확인
        cy.wait(5000);

        cy.log('프로젝트 실행')
        //프로젝트 Run
        cy.get('.as-vertical > .flow > .modeler__status-panner > .modeler-header__run-action-button > .btn')
        .click({force: true});
        cy.wait(5000);
    
        cy.contains('실행'); // 실행 상태 체크
        cy.wait(3000);

        emailModule.email('Image Test Project Cteate Test ' + Cypress.env('emailtitle'), Cypress.env('image_Test_Project_Upload_emailbody'));

        cy.get('#site-map__flow-btn').click();

        cy.get('#project-menu-ul > :nth-child(1) > button').click();
        
        cy.wait(5000);

    // 프로젝트 생성
    cy.contains('프로젝트 생성').click(); // 프로젝트 생성 
    cy.get(':nth-child(2) > .create-select-item__container > .create-select-item__content').click(); // 레코드 선택
    cy.get('.modal-button-content > .btn').click(); // 다음
    cy.wait(1000);

    // 프로젝트 정보 입력
    cy.get('#project_name').type(Cypress.env('RecordProjectName')); // 프로젝트 제목
    cy.get('.note-editable').type(Cypress.env('RecordProjectName')); // 프로젝트 내용
    cy.get('.modal-button-content > .btn-primary').click(); // 완료
    cy.wait(10000); // 10초 대기

    // 리소스 설정
    cy.get('.modeler__nav > ul > :nth-child(3) > button').click(); // 리소스 탭
    cy.get(':nth-child(5) > dd > .select-row__content > :nth-child(2) > .select-row__item > .radio-item > em')
    .click(); // 데이터 프로세싱 cpu.4
    cy.get('.resource-setting__item-container.mb10 > dd > .select-row__content > :nth-child(2) > .select-row__item > .radio-item > em')
    .click(); // 머신러닝 cpu.4
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

    // DNN-Classification 모듈 검색
    cy.get('.NeuralNetwork').click();
    cy.get('form.ng-untouched > .search-box > .input-form').type('DNN-Classification');
    cy.get('form.ng-untouched > .search-box > .btn').click();
    cy.wait(3000);

    // DNN-Classification 모듈 인식
    cy.get('#\\36 572').should('exist').as('DNN-Classification');
    cy.wait(3000);
    
    // DNN-Classification 모듈 모델러에 추가
    cy.ModuleAdd('@DNN-Classification', '@svg', 700, 300);
    cy.wait(3000);

    // Decision Tree Classifier 모듈 검색
    cy.get('.input-form').clear().type('Decision Tree Classifier');
    cy.get('.search-box > .btn').click();
    cy.wait(3000);

    // Decision Tree Classifier 모듈 인식
    cy.get('#\\36 443').should('exist').as('Decision Tree Classifier');
    cy.wait(3000);
    
    // Decision Tree Classifier 모듈 모델러에 추가
    cy.ModuleAdd('@Decision Tree Classifier', '@svg', 800, 300);
    cy.wait(3000);

    
    // 데이터셋 클릭
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image").click();
    cy.wait(2000);

    //데이터셋에서 클렌징 연결

    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image").realHover('mouse');
    cy.wait(3000);
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image")
    .realMouseDown({ force: true }).realMouseMove(100, 0).realMouseUp().realMouseUp();
    cy.wait(3000);

    // 데이터셋 클릭
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image").click();
    cy.wait(2000);

    //프로세싱에서 DNN-Classification 연결
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(3) > image").realHover('mouse');  
    cy.wait(3000);
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image")
    .realMouseDown({ force: true }).realMouseMove(100, 0).realMouseUp().realMouseUp();
    cy.wait(3000);

    // 데이터셋 클릭
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image").click();
    cy.wait(2000);

    //DNN-Classification에서 Decision Tree Classifier 연결
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(5) > image").realHover('mouse');  
    cy.wait(3000);
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image")
    .realMouseDown({ force: true }).realMouseMove(100, 0).realMouseUp().realMouseUp();
    cy.wait(3000);

    //클렌징 모듈 설정
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(3) > image").click(); // 클렌징 모듈 선택
    cy.wait(3000)
    cy.get(':nth-child(3) > :nth-child(2) > image').click(); // 모듈 더보기
    cy.get(':nth-child(3) > [align="left"]').click(); // 프로세스 플로우 진입
    cy.wait(3000);
    cy.get('.btn-floating > .fas').click(); // 클렌징 모듈 추가
    cy.contains('Calculation').click(); // Calculation 선택
    cy.get('#\\31 3 > .cdk-drag > .button-list > .btn').click(); // 추가
    cy.wait(3000);

    // Calculation 설정
    cy.get('.nav-project-right > ul > :nth-child(2) > button').click(); // 설정탭 선택
    cy.get(':nth-child(1) > .input-form > .ui-dropdown > .ui-dropdown-trigger > .ui-dropdown-trigger-icon')
    .click(); // 열 선택
    cy.get(':nth-child(1) > .ui-dropdown-item > div.ng-star-inserted > div').click(); // 상영시간 선택
    cy.get('.combination-column-select > .btn').click(); // 추가
    cy.get('.combination-column__button > :nth-child(3)').click(); // + 선택
    cy.get(':nth-child(1) > .input-form > .ui-dropdown > .ui-dropdown-trigger > .ui-dropdown-trigger-icon')
    .click(); // 열 선택
    cy.get(':nth-child(6) > .ui-dropdown-item > div.ng-star-inserted > div').click(); // 관객수
    cy.get('.combination-column-select > .btn').click(); // 추가
    cy.get('.column-form > :nth-child(1) > .input-form').type('열추가') // 열 이름 입력
    cy.get('.column-form > :nth-child(2) > :nth-child(2) > .input-form > .ui-dropdown > .ui-dropdown-trigger')
    .click(); // 열 위치 
    cy.get(':nth-child(4) > .ui-dropdown-item').click(); // 상영시간
    cy.get('.flex-button-box > :nth-child(2) > .btn').click(); // 저장
    cy.contains('성공적으로 저장하였습니다'); // 저장 확인
    cy.wait(5000);
    cy.get('.title > button > .fa-solid').click(); // 닫기
    cy.get('.right-content > .btn').click(); // 플로우 화면 나가기

    // DNN-Classification 클릭
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(8) > image")
    .click({ force: true }); // DNN-Classification 모델러 선택
    cy.wait(2000);
    cy.get('.nav-project-right > ul > :nth-child(2) > button').click(); // 변수 설정 탭
    cy.wait(3000);
    cy.get('.ui-multiselect-trigger').click({ force: true }); // 입력변수 설정
    cy.wait(3000);
    cy.get(':nth-child(4) > .ui-multiselect-item > .ui-chkbox > .ui-chkbox-box > .ui-chkbox-icon')
    .click({ force: true }); // 상영시간 체크
    cy.get('.content-scroll > :nth-child(2) > :nth-child(2) > .input-form > .ui-dropdown > .ui-dropdown-trigger')
    .click(); // 목표변수 설정
    cy.get(':nth-child(8) > .ui-dropdown-item').click(); // 감독의 영화 개수 선택
    cy.get('.input-columns > .btn').click(); // 입력변수 추가
    cy.get('.flex-button-box > :nth-child(2) > .btn').click(); // 저장
    cy.wait(3000);

    // Decision Tree Classifier 클릭
    cy.get("#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(10) > image")
    .click({ force: true }); // Decision Tree Classifier 모델러 선택
    cy.wait(2000);
    cy.get('.ui-multiselect-trigger').click(); // 입력변수 설정
    cy.wait(3000);
    cy.get(':nth-child(4) > .ui-multiselect-item > .ui-chkbox > .ui-chkbox-box > .ui-chkbox-icon')
    .click({ force: true }); // 상영시간 체크
    cy.get('.content-scroll > :nth-child(2) > :nth-child(2) > .input-form > .ui-dropdown > .ui-dropdown-trigger')
    .click(); // 목표변수 설정
    cy.get(':nth-child(8) > .ui-dropdown-item').click(); // 감독의 영화 개수 선택
    cy.get('.input-columns > .btn').click(); // 입력변수 추가
    cy.get('.flex-button-box > :nth-child(2) > .btn').click(); // 저장
    cy.wait(3000);

    //프로젝트 Run
    cy.log('프로젝트 실행')
    cy.get('.modeler-header__run-action-button > .btn').click({ force: true });

    cy.wait(3000);
    cy.contains('실행'); // 실행 상태 체크

    emailModule.email('Record Project Cteate Test ' + Cypress.env('emailtitle'), Cypress.env('Record_Project_Create_emailbody'));

    cy.get('#site-map__flow-btn').click();

    cy.get('#project-menu-ul > :nth-child(1) > button').click();
    
    cy.wait(5000);

    // 레코드 프로젝트 검색
    cy.get('.search-box > .input-form').type('레코드 평가 프로젝트 자동화 확인용');
    cy.get('.search-box > .btn-primary').click();
    cy.wait(3000);
    cy.get('.title').click();
    cy.wait(5000);

    // 평가 프로젝트 생성
    cy.get('.modeler__nav > ul > :nth-child(2) > button').click(); // 평가 프로젝트 탭
    cy.wait(3000);
    cy.get('.btn-floating > div').click({force: true}); // 생성
    cy.wait(3000);
    cy.get('input-form input-lg display-block ng-pristine ng-valid ng-touched').clear().type(Cypress.env('date_label'));
    cy.wait(1000);
    cy.get('.modal-button-content > .btn').click(); // 다음
    cy.wait(1000);
    cy.get('.btn-primary').click(); // 다음
    cy.wait(1000);
    cy.get('.btn-primary').click(); // 확인
    cy.wait(5000);


    cy.log('프로젝트 실행')
    //프로젝트 Run
    cy.get('.modeler-header__run-action-button > .btn').click({force: true});
    cy.wait(5000);
    
    cy.contains('실행'); // 실행 상태 체크
    cy.wait(360000); // 6분 대기

    cy.contains('완료');


    cy.log('인퍼런스 생성')
    //인퍼런스 생성
    cy.get('.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .btn')
    .click({force: true}); // 메뉴바
    cy.get('.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .list-dropdown > :nth-child(2) > button')
    .click(); // 인퍼런스
    cy.wait(3000);
    cy.get('#inference_version').clear().type('1.0')
    cy.get('.ml10 > .btn').click(); // 버전 체크
    cy.wait(1000);
    cy.get('.note-editable').type(Cypress.env('date_label')); // 설명
    cy.get('.modal-button-content > .btn').click(); // 확인
    cy.wait(5000);

    cy.get('.modal-button-content > :nth-child(1)').click(); // 바로가기
    cy.wait(5000);


    cy.log('인퍼런스 실행')
    //인퍼런스 실행
    cy.contains('마이 인퍼런스')
    cy.get(':nth-child(1) > :nth-child(11) > .btn').click(); // 실행
    cy.wait(10000);

    cy.get(':nth-child(1) > :nth-child(13) > .btn').click(); // 상세 조회
    cy.wait(5000);

    cy.get('.default-tab > ul > :nth-child(2) > button').click(); // 예측 이력


    cy.log('api 호출')
    // api 호출
    cy.wait(30000);
    record_apiModule.record_api();
    cy.wait(30000);
    cy.contains('성공');
    cy.wait(3000);
    cy.screenshot('record_inference_api', 1920, 1080);
    cy.get('.btn-clear-danger').click(); // 중지
    cy.wait(10000);


    cy.log('인퍼런스 삭제')
    // 인퍼런스 삭제
    cy.get('.left-navigation--sub-navi > .current > button.ng-tns-c0-0 > .ng-tns-c0-0')
    .click(); // 마이 인퍼런스
    cy.wait(5000);
    cy.get(':nth-child(1) > :nth-child(14) > .btn').click(); // 삭제
    cy.get('.btn-danger').click(); // 삭제
    cy.wait(3000);
    cy.contains('inferenceautomation 인퍼런스 서비스가 삭제되었습니다.');

    emailModule.email('Record Test Project Create Test ' + Cypress.env('emailtitle'), Cypress.env('Record_Test_Project_Upload_emailbody'));

   });
}); 