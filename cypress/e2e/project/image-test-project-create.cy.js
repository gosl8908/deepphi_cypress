const { loginModule, OldApiModule, EmailModule } = require('../module/manager.module.js');

describe('Image Test Project Create', () => {
  let testFails = []; // 실패 원인을 저장할 변수
  let screenshots = []; // 스크린샷을 저장할 배열
  let FailTF = false;
  Cypress.on('fail', (err, runnable) => {
      const errMessage = err.message || '알 수 없는 이유로 실패함';
      !testFails.includes(errMessage) && testFails.push(errMessage);
      FailTF = true;
      throw err;
  });
    before(() => {
      cy.setDateToEnv();
      cy.getAll();
      loginModule.login(Cypress.env('Prod'), Cypress.env('AutoTestId'), Cypress.env('KangTestPwd'));
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
        cy.get('#inference_service_name2').invoke('text').then((text) => {
          if (!text.trim()) {
            const Inference = `inference${Cypress.env('DateLabel')}`;
            cy.get('#inference_service_name2').type(Inference);
            cy.get('.ng-star-inserted > dd > .flex-display > .ml10 > .btn').click();
          }
        });
        cy.get(':nth-child(3) > dd > .flex-display > .ml10 > .btn').click(); // 버전 체크
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
        OldApiModule.Api();
    });
        afterEach('Status Fail', () => {
          if (FailTF) {
            const screenshotFileName = `Image Test Project Create/Image Test Project Create Test ${Cypress.env(
                'DateLabel',
            )}`;
            cy.screenshot(screenshotFileName);
            screenshots.push(screenshotFileName);
            FailTF = false;
        }
    });
    after('Send Email', () => {
      const testRange = '1. 이미지 평가 프로젝트 생성 2. 실행 3. 인퍼런스 서비스 생성 4. 인퍼런스 서비스 실행 5. API 호출 6. 중지 7. 인퍼런스 서비스 삭제'

      EmailModule.Email(
        testFails,
          Cypress.env('AdminId'),
          `Image Test Project Create Test ${Cypress.env('EmailTitle')}`,
          testRange,
          screenshots,
      );
      });
});
