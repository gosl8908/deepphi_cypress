const {
  loginModule,
  imagedatasetModule,
  recorddatasetModule,
  emailModule,
} = require("../Module/moduleManager.js");

describe("Dataset Upload Test", () => {
  before(() => {
    cy.setDateToEnv();
    cy.getAllCookies(); // 쿠키 삭제
    cy.getAllLocalStorage(); // 로컬 삭제
    cy.getAllSessionStorage(); // 세션 삭제
  });

  it("Dataset Upload test", () => {
    loginModule.login(
      Cypress.env("prod"),
      Cypress.env("auto_test_id"),
      Cypress.env("password")
    );

    imagedatasetModule.imagedataset(
      Cypress.env("ImageDatasetName"),
      Cypress.env("date_label")
    );

    recorddatasetModule.recorddataset(
      Cypress.env("RecordDatasetName"),
      Cypress.env("date_label")
    );

    emailModule.email(
      "Dataset Upload Test " + Cypress.env("emailtitle"),
      Cypress.env("Dataset_Upload_emailbody")
    );
  });
});
