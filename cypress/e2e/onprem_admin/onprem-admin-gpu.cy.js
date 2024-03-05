const { loginModule, emailModule, functionModule: f, constantModule: c } = require('../module/manager.module.js');

describe('Module Run Test', () => {
    let TestFails = []; // 실패 원인을 저장할 변수
    let Screenshots = []; // 스크린샷을 저장할 배열
    let Failure = false;
    Cypress.on('fail', (err, runnable) => {
        const ErrMessage = err.message || '알 수 없는 이유로 실패함';
        !TestFails.includes(ErrMessage) && TestFails.push(ErrMessage);
        Failure = true;
        throw err;
    });

    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('Onprem'), Cypress.env('OnpremAdminId'), Cypress.env('OnpremAdminPwd'));
        cy.wait(3000);

        /* 관리자 페이지 진입 */
        cy.get('.gnb__sub-nav > .ng-star-inserted > button').click();
        cy.wait(3 * 1000);
    });

    it('GPU Management Search', () => {
        cy.get('.nav-button > button').click();
        cy.contains('GPU 관리').click();
        cy.wait(5 * 1000);

        cy.get('.search-box__list > li:nth-child(1) > div > div > p-calendar:first')
            .type('{selectall}{backspace}')
            .type('2023-02-01');
        cy.get('.search-box__list > li:nth-child(1) > div > div > p-calendar:last')
            .type('{selectall}{backspace}')
            .type(Cypress.env('Date'));
        cy.get('.search-box__list > li:nth-child(2) > div > div > p-calendar:first').type('2023-02-01');
        cy.get('.search-box__list > li:nth-child(2) > div > div > p-calendar:last').type(Cypress.env('Date'));
        cy.get('.search-box__list > li:nth-child(3) > div > div > p-calendar:first').type('2023-02-01');
        cy.get('.search-box__list > li:nth-child(3) > div > div > p-calendar:last').type(Cypress.env('Date'));
        cy.get('.search-box__list > li:nth-child(4)').click();
        cy.contains('AMPERE_16G').click();
        cy.get('.search-box__list > li:nth-child(5)').click();
        cy.contains('COMPLETED').click();
        cy.get('.search-box__list > li:nth-child(6)').type('36338');
        cy.get('.search-box__list > li:nth-child(7)').type('img240109');
        cy.get('.search-box__list > li:nth-child(8)').type('DensNet121');
        cy.get('.search-box__list > li:nth-child(9)').type(Cypress.env('OnpremAdminId'));
        cy.get('.search-box__list > li:nth-child(10)').type('onprem240109@ruu.kr');

        cy.contains('검색').click();
        cy.wait(3 * 1000);

        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(2)').contains('AMPERE_16G');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(3)').contains('1');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(4)').contains('36338');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(5)').contains('img240109');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(1)').contains('TRAIN');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(2)').contains('DensNet121');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(3)').contains('COMPLETED');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(4)').contains('2024-01-09');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(5)').contains('2024-01-09');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(6)').contains('2024-01-09');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(7)').contains('00:06:34');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(8)').contains('00:06:34');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(9)').contains('396 / 0.02 GB');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(10)').contains(`${Cypress.env('OnpremAdminId')}`);
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(11)').contains(`onprem240109@ruu.kr`);
    });

    afterEach('Status Fail', () => {
        if (Failure) {
            const ScreenshotFileName = `layer Module Test ${Cypress.env('DateLabel')}`;
            cy.screenshot(ScreenshotFileName);
            if (!Cypress.platform.includes('win')) {
                const CurrentFile = f.getFileName(__filename);
                Screenshots.push(`${CurrentFile}/${ScreenshotFileName}`);
            } else {
                Screenshots.push(`${ScreenshotFileName}`);
            }
            Failure = false;
        }
    });

    after('Send Email', () => {
        const TestRange = '1. GPU 관리 검색';

        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[${Cypress.env('EmailTitle')}][Onprem][Admin] GPU Management`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
