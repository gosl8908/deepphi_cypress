const { loginModule, emailModule, functionModule: f, constantModule: c } = require('../module/manager.module.js');

describe('Admin Project Management Test', () => {
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

    it('Admin Project Management Search', () => {
        cy.get('.nav-button > button').click();
        cy.contains('프로젝트 관리').click();
        cy.wait(3 * 1000);

        cy.get('.search-box__list > li:nth-child(1)').type('record');
        cy.get('.search-box__list > li:nth-child(2)').type('36402');
        cy.get('.search-box__list > li:nth-child(3)').type(Cypress.env('OnpremAdminId'));
        cy.get('.search-box__list > li:nth-child(4) > div > div > p-calendar:first').clear().type('2024-01-01');
        cy.get('.search-box__list > li:nth-child(4) > div > div > p-calendar:last').clear().type('2024-01-31');

        cy.contains('검색').click();
        cy.wait(3 * 1000);

        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(2)').contains('2024-01-19 00:15:22');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(3)').contains(c.RECORD);
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(4)').contains('record');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(5)').contains('36402');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(6)').contains(Cypress.env('OnpremAdminId'));
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(7)').contains('X');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(8)').contains('딥노이드');

        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(9) > .btn').click();
        cy.wait(3 * 1000);

        cy.get('.table-view > tbody > tr:nth-child(1) > td:nth-child(2)').contains('record');
        cy.get('.table-view > tbody > tr:nth-child(1) > td:nth-child(4)').contains('2024-01-19 / 2024-02-01');
        cy.get('.table-view > tbody > tr:nth-child(2) > td:nth-child(2)').contains(Cypress.env('OnpremAdminId'));
        cy.get('.table-view > tbody > tr:nth-child(2) > td:nth-child(4)').contains('DEEPNOID');
        cy.get('.table-view > tbody > tr:nth-child(3) > td:nth-child(2)').contains('-');
        cy.get('.table-view > tbody > tr:nth-child(3) > td:nth-child(4)').contains(c.RECORD);
        cy.get('.table-view > tbody > tr:nth-child(4) > td:nth-child(2)').contains('0GB');
        cy.get('.table-view > tbody > tr:nth-child(4) > td:nth-child(4)').contains('X');

        cy.contains('뒤로').click();
        cy.wait(3 * 1000);

        cy.contains('프로젝트 내역');
    });

    afterEach('Status Fail', () => {
        if (Failure) {
            const ScreenshotFileName = `Admin Project Management Test ${Cypress.env('DateLabel')}`;
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
        const TestRange = '1. 프로젝트 검색 2. 프로젝트 상세 페이지';

        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[${Cypress.env('EmailTitle')}][Onprem][Admin] Project Management`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
