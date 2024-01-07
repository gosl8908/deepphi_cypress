const { loginModule, recordApiModule, sendEmailModule } = require('../module/manager.module.js');
describe('로그인', () => {
  let testFailureReason = ''; // 실패 원인을 저장할 변수
  
  before(()=>{

    cy.setDateToEnv();
  });

  it('test', () => {

    loginModule.login(Cypress.env('Prod'), Cypress.env('Id'), Cypress.env('KangTestPasswd'));

    cy.get('.f')

    Cypress.on('fail', (err, runnable) => {
      testFailureReason = err.message || '알 수 없는 이유로 실패함'; // 실패 원인을 저장
    });
  });
  after(() => {
    let screenshotFileName = `login.cy.js/login test ${Cypress.env('DateLabel')}.png`;
    if (testFailureReason) {
        // 테스트 실패 시 스크린샷 찍기
        cy.screenshot(screenshotFileName)
        // 테스트 실패 시 이메일 전송
        const EmailBody = `Cypress 자동화 테스트 스위트가 실패하였습니다\n 테스트 실행 시간 : ${Cypress.env(
          'DateLabelWeek',
        )}\n 테스트 범위 : 1. 로그인\n\n테스트 실패 원인: ${testFailureReason}`;
        sendEmailModule.sendEmail(Cypress.env('Id'), 'Login test ' + Cypress.env('EmailTitle'), EmailBody, screenshotFileName);
    } else {
      // 테스트가 성공했을 때 이메일 전송
      const EmailBody = `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${Cypress.env(
        'DateLabelWeek',
      )}\n 테스트 범위 : 1. 로그인`;
      sendEmailModule.sendEmail(Cypress.env('Id'), 'Login test ' + Cypress.env('EmailTitle'), EmailBody);
    }
  });
  });



  //   cy.contains('마이 인퍼런스').click();

  //   cy.wait(1000);

  //   cy.get(':nth-child(1) > :nth-child(11) > .btn').click(); // 실행

  //   cy.wait(10000);

  //   cy.contains('보기').trigger('click', { force: true });

  //   cy.wait(1000);

  //   cy.get('[style="width: calc(100% - 76px);word-break: break-all"]').then(($el) => {
    
  //     // 텍스트 추출
  //     const text = $el.text();

  //     Cypress.env('endpointText', text);
  //     cy.log('확인된 endpointText 값:', Cypress.env('endpointText'));
      
  //       });

  //   cy.wait(1000);

  //   cy.get('.default-tab > ul > :nth-child(2) > button').click(); // 예측 이력

  //       // api 호출
  //       cy.wait(30000);
  //       recordApiModule.recordApi();
  //       cy.contains('성공', { timeout: 60000 }).should('be.visible');
  //       cy.screenshot('record_inference_api'+ Cypress.env('DateLabel'), 1920, 1080);
  //       cy.get('.btn-clear-danger').click(); // 중지
  //       cy.wait(10000);