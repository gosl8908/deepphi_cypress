const { loginModule, ApiModule, sendEmailModule } = require('../module/manager.module.js');

describe('Image Test Project Create', () => {
  beforeEach(() => {
      cy.setDateToEnv();
      cy.getAll();
      loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPwd'));
    });

    it('Image Test Project Create', () => {

        // 이미지 프로젝트 검색
        cy.get('.search-box > .input-form').type('이미지 평가 프로젝트 자동화 확인용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3000);
        cy.get('.title').click();
        cy.wait(5000);

        // 평가 프로젝트 생성
        cy.get('.modeler__nav > ul > :nth-child(2) > button').click(); // 평가 프로젝트 탭
        cy.wait(3000);
        cy.get('.btn-floating > div').click({ force: true }); // 생성
        cy.get('.modal-button-content > .btn').click(); // 확인
        cy.get('.btn-primary').click(); // 확인
        cy.get('.btn-primary').click(); // 확인
        cy.wait(5000);

        cy.log('프로젝트 실행');
        //프로젝트 Run
        cy.get('.as-vertical > .flow > .modeler__status-panner > .modeler-header__run-action-button > .btn').click({
            force: true,
        });
        cy.contains('실행', { timeout: 60000 }).should('be.visible');
        cy.contains('완료', { timeout: 360000 }).should('be.visible');

        cy.log('인퍼런스 생성');
        //인퍼런스 생성
        cy.get(
            '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .btn').click({ force: true }); // 메뉴바
            cy.get(
                '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .list-dropdown > :nth-child(2) > button',
            ).click({ force: true }); // 인퍼런스
        cy.wait(3000);
        cy.get(':nth-child(2) > .create-select-item__container > .create-select-item__content > .create-select-item__title').click();
        cy.get('.modal-button-content > .btn').click();
        cy.get('.ml10 > .btn').click(); // 버전 체크
        cy.wait(1000);
        cy.get('.note-editable').type(Cypress.env('DateLabel')); // 설명
        cy.get('.modal-button-content > .btn-primary').click(); // 확인
        cy.contains('바로가기', { timeout: 60000 }).should('be.visible');

        cy.get('.modal-button-content > :nth-child(1)').click(); // 바로가기
        cy.wait(5000);

        cy.log('인퍼런스 실행');
        //인퍼런스 실행
        cy.contains('마이 인퍼런스');
        cy.get(':nth-child(1) > :nth-child(11) > .btn').click(); // 실행
        cy.wait(10000);

        cy.get(':nth-child(1) > :nth-child(13) > .btn').click(); // 상세 조회
        cy.wait(5000);

        // api url 복사
        cy.get('[style="width: calc(100% - 76px);word-break: break-all"]').then(($el) => {
    
            // 텍스트 추출
            const text = $el.text();
        
            Cypress.env('endpointText', text);
            cy.log('확인된 endpointText 값:', Cypress.env('endpointText'));
              });

        cy.get('.documentation-address').then(($el) => {
    
            // 텍스트 추출
            const api = $el.text();
      
            Cypress.env('apiText', api);
            cy.log('확인된 endpointText 값:', Cypress.env('apiText'));
              });

        cy.get('.default-tab > ul > :nth-child(2) > button').click(); // 예측 이력

        cy.log('api 호출');
        // api 호출
        cy.wait(15000);
        ApiModule.Api();
        cy.contains('실패', { timeout: 60000 }).should('be.visible');
        cy.wait(5000);
        cy.screenshot('image_inference_api', 1920, 1080);
        cy.get('.btn-clear-danger').click(); // 중지
        cy.wait(10000);

        cy.log('인퍼런스 삭제');
        // 인퍼런스 삭제
        cy.get('.left-navigation--sub-navi > .current > button.ng-tns-c0-0 > .ng-tns-c0-0').click(); // 마이 인퍼런스
        cy.wait(5000);
        cy.get(':nth-child(1) > :nth-child(14) > .btn').click(); // 삭제
        cy.get('.btn-danger').click(); // 삭제
        cy.contains('image-inference-automation 인퍼런스 서비스가 삭제되었습니다.', { timeout: 60000 }).should('be.visible');

        const testRange = '1. 이미지 평가 프로젝트 생성 2. 실행 3. 인퍼런스 서비스 생성 4. 인퍼런스 서비스 실행 5. API 호출 6. 중지 7. 인퍼런스 서비스 삭제';
      
      sendEmailModule.sendEmail(
        undefined,
          Cypress.env('Id'),
          'Image Test Project Create ' + Cypress.env('EmailTitle'),
          testRange,
          undefined,)
    });
});
