const { loginModule, createModule, modelModule } = require('../module/manager.module.js');

beforeEach(() => {
    cy.setDateToEnv();
    cy.log('로그인');
    loginModule.login(Cypress.env('deepphi'), Cypress.env('auto_email'), Cypress.env('auto_password'));
    cy.wait(3000);
});

describe('template spec', () => {
    it('passes', () => {
        cy.visit('https://modeler.deepphi.ai/modeler/18296');

        cy.wait(3000);
        cy.get('.NeuralNetwork').click();
        cy.get('.btn-floating > div').click();
        cy.get('.modal-button-content > .btn').click();
        cy.get('#module_name').clear();
        cy.get('#module_name').type('test');
        cy.get('#module_category').select('75');
        cy.get('.note-editable').click();
        cy.get('.modal-button-content > .btn-primary').click();
    });
});
