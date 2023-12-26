const {
  loginModule,
  imageDatasetModule,
  recordDatasetModule,
  sendEmailModule,
} = require('../module/manager.module.js');

describe('Organization Dataset Upload', () => {
  before(() => {
      cy.setDateToEnv();
      cy.getAllCookies(); // 쿠키 삭제
      cy.getAllLocalStorage(); // 로컬 삭제
      cy.getAllSessionStorage(); // 세션 삭제
  });

  it('Organization Dataset Upload', () => {
      loginModule.login(Cypress.env('Prod'), Cypress.env('AutoTestId'), Cypress.env('Password'));

      // 단체 이동
      cy.get('.btn__user_info').click(); // 프로필 선택
      cy.get('.organization-changer__opener').click();
      cy.contains('자동화용 단체').click(); // 단체 선택
      cy.wait(5000);
      imageDatasetModule.imageDataset(Cypress.env('DateLabel'), Cypress.env('DateLabel'));

      recordDatasetModule.recordDataset(Cypress.env('DateLabel'), Cypress.env('DateLabel'));

      const EmailBody = `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${Cypress.env(
        'DateLabelWeek',
    )}\n 테스트 범위 : 1. 단체 이미지 데이터셋 업로드 2. 변환 3. 사용 용도 수정 4. 데이터셋에 파일 포함 5. 단체 레코드 데이터셋 업로드 6. 설정 완료`;

    sendEmailModule.sendEmail(Cypress.env('Id'), 'Organization Dataset Upload Test ' + Cypress.env('EmailTitle'), EmailBody);
});
});
