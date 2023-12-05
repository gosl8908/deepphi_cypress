function login(prod, auto_test_id, password) {
    
    cy.viewport(1920, 1080); // FHD 해상도 설정
    cy.visit(prod, { timeout: 120000 });
    cy.contains('로그인').click({ timeout: 60000 }); // 로그인 클릭
    cy.get('#username').type(auto_test_id); // 이메일 입력
    cy.get('#password').type(password); // 비밀번호 입력
    cy.get('#kc-login').click({ timeout: 60000 }) // 로그인 선택
    cy.wait(3000);
}

module.exports ={
    login: login,
}