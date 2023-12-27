function login(Prod, KangTestId, KangTestPw) {
  cy.log('로그인 성공');

  /* 로그인 */
  cy.visit(Prod, { timeout: 120000 }).then(() => {
    // 페이지 로드가 완료되지 않았을 경우 페이지를 새로고침합니다.
    cy.reload();
});
  cy.contains('로그인').click({ timeout: 60000 }); // 로그인 클릭
  cy.get('#username').type(KangTestId); // 이메일 입력
  cy.get('#password').type(KangTestPasswd); // 비밀번호 입력
  cy.get('#kc-login').click({ timeout: 60000 }); // 로그인 선택
  cy.wait(3000);
}

module.exports = {
  login: login,
};
