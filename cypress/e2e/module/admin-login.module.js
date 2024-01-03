function adminLogin(ProdAdmin, Id, Password) {
  cy.log('어드민 로그인');

  /* 어드민 로그인 */
  cy.visit(ProdAdmin, { timeout: 120000 }).then(() => {
    // 페이지 로드가 완료되지 않았을 경우 페이지를 새로고침합니다.
    cy.reload();
});
  cy.get('#username').type(Id); // 이메일 입력
  cy.get('#password').type(KangTestPasswd); // 비밀번호 입력
  cy.get('#kc-login').click({ timeout: 120000 }); // 로그인 선택
  cy.wait(3000);
}

module.exports = {
  adminLogin: adminLogin,
};