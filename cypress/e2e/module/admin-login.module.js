function adminlogin(prodadmin, id, password) {
  cy.log("어드민 로그인 성공");

  cy.viewport(1920, 1080); // FHD 해상도 설정
  cy.visit(prodadmin, { timeout: 120000 });
  cy.get("#username").type(id); // 이메일 입력
  cy.get("#password").type(password); // 비밀번호 입력
  cy.get("#kc-login").click({ timeout: 120000 }); // 로그인 선택
  cy.wait(3000);
}

module.exports = {
  adminlogin: adminlogin,
};
