function adminlogin(prodadmin, id, password) {
    
    cy.visit(prodadmin, { timeout: 30000 }) 
    cy.get('#username').type(id); // 이메일 입력
    cy.get('#password').type(password); // 비밀번호 입력
    cy.get('#kc-login').click({ timeout: 30000 }) // 로그인 선택
    cy.wait(3000);
}

module.exports ={
    adminlogin: adminlogin,
}