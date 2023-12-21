const { loginModule, emailModule } = require("../Module/moduleManager.js");

describe("Image Test Project Create", () => {
  before(() => {
    cy.setDateToEnv();
    cy.getAllCookies(); // 쿠키 삭제
    cy.getAllLocalStorage(); // 로컬 삭제
    cy.getAllSessionStorage(); // 세션 삭제
  });

  it("Image Test Project Create", () => {
    // 로그인
    loginModule.login(
      Cypress.env("prod"),
      Cypress.env("auto_test_id"),
      Cypress.env("password")
    );

    // 이미지 프로젝트 생성
    cy.get(".search-box > .input-form").type(
      "이미지 평가 프로젝트 자동화 확인용"
    );
    cy.get(".search-box > .btn-primary").click();
    cy.wait(3000);
    cy.get(".title").click();
    cy.wait(5000);

    // 평가 프로젝트 생성
    cy.get(".modeler__nav > ul > :nth-child(2) > button").click(); // 평가 프로젝트 탭
    cy.wait(3000);
    cy.get(".btn-floating > div").click({ force: true }); // 생성
    cy.get(".modal-button-content > .btn").click(); // 확인
    cy.get(".btn-primary").click(); // 확인
    cy.get(".btn-primary").click(); // 확인
    cy.wait(5000);

    cy.log("프로젝트 실행");
    //프로젝트 Run
    cy.get(
      ".as-vertical > .flow > .modeler__status-panner > .modeler-header__run-action-button > .btn"
    ).click({ force: true });
    cy.wait(5000);

    cy.contains("실행"); // 실행 상태 체크
    cy.wait(3000);

    emailModule.email(
      "Image Test Project Cteate Test " + Cypress.env("emailtitle"),
      Cypress.env("image_Test_Project_Upload_emailbody")
    );
  });
});
