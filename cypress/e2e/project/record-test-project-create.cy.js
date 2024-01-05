const { loginModule, sendEmailModule, recordApiModule } = require('../module/manager.module.js');

describe('Record Test Project Create', () => {
    let testFailureReason = ''; // 실패 원인을 저장할 변수
    before(() => {
        cy.setDateToEnv();
        cy.getAllCookies(); // 쿠키 삭제
        cy.getAllLocalStorage(); // 로컬 삭제
        cy.getAllSessionStorage(); // 세션 삭제
    });

    it('Record Test Project Create', () => {
        // 로그인
        loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPasswd'));

        // 레코드 프로젝트 검색
        cy.get('.search-box > .input-form').type('레코드 평가 프로젝트 자동화 확인용');
        cy.get('.search-box > .btn-primary').click();
        cy.wait(3000);
        cy.get('.title').click();
        cy.wait(5000);

        // 평가 프로젝트 생성
        cy.get('.modeler__nav > ul > :nth-child(2) > button').click(); // 평가 프로젝트 탭
        cy.wait(3000);
        cy.get('.btn-floating > div').click({ force: true }); // 생성
        cy.wait(3000);
        cy.get('.modal-button-content > .btn').click(); // 다음
        cy.wait(1000);
        cy.get('.btn-primary').click(); // 다음
        cy.wait(1000);
        cy.get('.btn-primary').click(); // 확인
        cy.wait(5000);

        cy.log('프로젝트 실행');
        //프로젝트 Run
        cy.get('.modeler-header__run-action-button > .btn').click({ force: true });
        cy.contains('실행', { timeout: 10*1000 }).should('be.visible');
        cy.contains('완료', { timeout: 360*1000 }).should('be.visible');

        cy.log('인퍼런스 생성');
        //인퍼런스 생성
        cy.get(
            '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .btn',
        ).click({ force: true }); // 메뉴바
        cy.get(
            '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .list-dropdown > :nth-child(2) > button',
        ).click(); // 인퍼런스
        cy.wait(3000);
        // cy.get('#inference_version').clear().type('1.0');
        cy.get('.ml10 > .btn').click(); // 버전 체크
        cy.wait(1000);
        cy.get('.note-editable').type(Cypress.env('DateLabel')); // 설명
        cy.get('.modal-button-content > .btn').click(); // 확인
        cy.contains('바로가기', { timeout: 30*1000 }).should('be.visible');

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
            const endpoint = $el.text();
      
            Cypress.env('endpointText', endpoint);
            cy.log('확인된 endpointText 값:', Cypress.env('endpointText'));
            });

        cy.get('.documentation-address').then(($el) => {
    
            // 텍스트 추출
            const api = $el.text();
      
            Cypress.env('apiText', api);
            cy.log('확인된 endpointText 값:', Cypress.env('apiText'));
            });


        cy.get('.default-tab > ul > :nth-child(2) > button').click(); // 예측 이력

        // api 호출
        cy.wait(15*1000);
        recordApiModule.recordApi()
        cy.contains('성공', { timeout: 60*1000 }).should('be.visible');
        cy.screenshot('record_inference_api'+ Cypress.env('DateLabel'), 1920, 1080);
        cy.get('.btn-clear-danger').click(); // 중지
        cy.wait(15*1000);
        cy.get('.left-navigation--sub-navi > .current > button.ng-tns-c0-0').click();
        cy.get('.ng-star-inserted')
        .eq(0)
        .contains('중지', { timeout: 30*1000 }).should('be.visible');
        Cypress.on('fail', (err, runnable) => {
            testFailureReason = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
          });
    });

    after(() => {
        cy.visit('https://www.deepphi.ai/user/my/inference');
        cy.wait(5000);

        /* 인퍼런스 삭제 */
        cy.get('.ng-star-inserted')
        .eq(0)
        .invoke('text')
        .then((text) => {
          // 텍스트가 "중지" 또는 "대기"인 경우
          if (text.includes('중지') || text.includes('대기')) {
            cy.log('현재 상태: 중지, 대기');
            cy.get(':nth-child(1) > :nth-child(14) > .btn').invoke('click');
          }
        else if(text.includes('실행')) {
            // 텍스트가 "실행"인 경우
            cy.log('현재 상태: 실행');
            cy.get(':nth-child(11) > .btn').invoke('click');
            cy.wait(15000);
            cy.get(':nth-child(1) > :nth-child(14) > .btn').invoke('click');
          }
        });
        cy.get('.btn-danger').invoke('click'); // 삭제
        cy.contains('인퍼런스 서비스가 삭제되었습니다.', { timeout: 30*1000 });

        let screenshotFileName = `record-test-project-create-failed-test ${Cypress.env('DateLabel')}`;
            if (testFailureReason) {
                // 테스트 실패 시 스크린샷 찍기
                cy.screenshot(screenshotFileName)
                // 테스트 실패 시 이메일 전송
                const EmailBody = `Cypress 자동화 테스트 스위트가 실패하였습니다\n 테스트 실행 시간 : ${Cypress.env(
                  'DateLabelWeek',
                )}\n 테스트 범위 : 1. 레코드 평가 프로젝트 생성 2. 실행 3. 인퍼런스 서비스 생성 4. 인퍼런스 서비스 실행 5. API 호출 6. 중지 7. 인퍼런스 서비스 삭제\n\n테스트 실패 원인: ${testFailureReason}`;
                sendEmailModule.sendEmail(Cypress.env('Id'), 'Record Test Project Create Test ' + Cypress.env('EmailTitle'), EmailBody, screenshotFileName);
            } else {
              // 테스트가 성공했을 때 이메일 전송
              const EmailBody = `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${Cypress.env(
                'DateLabelWeek',
              )}\n 테스트 범위 : 1. 레코드 평가 프로젝트 생성 2. 실행 3. 인퍼런스 서비스 생성 4. 인퍼런스 서비스 실행 5. API 호출 6. 중지 7. 인퍼런스 서비스 삭제`;
              sendEmailModule.sendEmail(Cypress.env('Id'), 'Record Test Project Create Test ' + Cypress.env('EmailTitle'), EmailBody);
            }
  });
});
