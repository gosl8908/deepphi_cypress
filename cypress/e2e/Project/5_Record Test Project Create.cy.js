const { loginModule , emailModule , apiModule} = require('../Module/moduleManager.js');

describe('Record Test Project Create', () => {

  before(() => {
    cy.setDateToEnv();
    // cy.getAllCookies(); // 쿠키 삭제
    // cy.getAllLocalStorage(); // 로컬 삭제
    // cy.getAllSessionStorage(); // 세션 삭제
  });

  it('Record Test Project Create', () => {
    // 로그인  
    loginModule.login( Cypress.env('prod'), Cypress.env('auto_test_id'), Cypress.env('password') );
    
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
        cy.get('.modal-button-content > .btn').click(); // 확인
        cy.get('.btn-primary').click(); // 다음
        cy.get('.btn-primary').click(); // 확인
        cy.wait(5000);


        cy.log('프로젝트 실행')
        //프로젝트 Run
        cy.get('.modeler-header__run-action-button > .btn').click({force: true});
        cy.wait(5000);
    
        cy.contains('실행'); // 실행 상태 체크
        cy.wait(300000); // 5분 대기

        cy.contains('완료');


        cy.log('인퍼런스 생성')
        //인퍼런스 생성
        cy.get('.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .btn').click({force: true}); // 메뉴바
        cy.get('.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .list-dropdown > :nth-child(2) > button').click(); // 인퍼런스
        cy.wait(3000);
        cy.get('#inference_version').clear().type('1.0')
        cy.get('.ml10 > .btn').click(); // 버전 체크
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
        apiModule.api();
        cy.wait(30000);
        cy.contains('성공');
        cy.wait(3000);
        cy.get('.btn-clear-danger').click(); // 중지
        cy.wait(10000);


        cy.log('인퍼런스 삭제')
        // 인퍼런스 삭제
        cy.get('.left-navigation--sub-navi > .current > button.ng-tns-c0-0 > .ng-tns-c0-0').click(); // 마이 인퍼런스
        cy.wait(5000);
        cy.get(':nth-child(1) > :nth-child(14) > .btn').click(); // 삭제
        cy.get('.btn-danger').click(); // 삭제
        cy.wait(3000);
        cy.contains('inferenceautomation 인퍼런스 서비스가 삭제되었습니다.');



    emailModule.email('Record Test Project Create Test ' + Cypress.env('emailtitle'), Cypress.env('Record_Test_Project_Upload_emailbody'));
  });
});