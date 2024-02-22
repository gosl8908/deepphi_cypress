const { loginModule, emailModule, functionModule: f } = require('../module/manager.module.js');
describe('Onprem Group Managrement Test', () => {
    let TestFails = []; // 실패 원인을 저장할 변수
    let Screenshots = []; // 스크린샷을 저장할 배열
    let FailTF = false;
    Cypress.on('fail', (err, runnable) => {
        const ErrMessage = err.message || '알 수 없는 이유로 실패함';
        !TestFails.includes(ErrMessage) && TestFails.push(ErrMessage);
        FailTF = true;
        throw err;
    });
    beforeEach(() => {
        cy.setDateToEnv();
        cy.getAll();
    });

    it('Group Create Test', () => {
        loginModule.login(Cypress.env('Onprem'), Cypress.env('AdminId'), Cypress.env('AdminPwd'));

        /* 그룹 생성 */
        cy.get('.gnb__container').contains('그룹 관리').click();
        cy.get('.dashboard__header--control > .btn').click();
        cy.get('#group_name').type(`Group${Cypress.env('DateLabel')}`);
        cy.get(':nth-child(2) > dd > .flex-display > .btn').click();
        cy.get('#group_manager_email').type(Cypress.env('OnpremId9'));
        cy.get(':nth-child(3) > dd > .flex-display > .btn').click();
        cy.wait(1 * 1000);

        cy.get('.vertical-label-list').then(btn => {
            const Group = btn.text().includes('다른 그룹의 그룹 관리자로 지정된 회원입니다.');
            if (Group) {
                cy.get('.btn-close > .fa-solid').click();
                cy.get('.ng-star-inserted')
                    .contains('asd9')
                    .closest('.ng-star-inserted')
                    .find('.text-left')
                    .invoke('text')
                    .then(text => {
                        cy.log(text);
                        cy.get('.ng-star-inserted')
                            .contains('asd9')
                            .closest('.ng-star-inserted')
                            .find('.btn-danger')
                            .click();
                        cy.get('#group_delete_check').type(text);
                        cy.get('.modal-button-content > .btn-danger').click();
                        cy.wait(3 * 1000);
                        cy.get('.dashboard__header--control > .btn').click();
                        cy.get('#group_name').type(`Group${Cypress.env('DateLabel')}`);
                        cy.get(':nth-child(2) > dd > .flex-display > .btn').click();
                        cy.get('#group_manager_email').type(Cypress.env('OnpremId9'));
                        cy.get(':nth-child(3) > dd > .flex-display > .btn').click();
                        cy.get('.modal-button-content > .btn-primary').click();
                    });
            } else {
                cy.get('.modal-button-content > .btn-primary').click();
                cy.get('jhi-group-management.ng-star-inserted > article').contains(`Group${Cypress.env('DateLabel')}`);
            }
        });
    });

    it('Group invite Test', () => {
        loginModule.login(Cypress.env('Onprem'), Cypress.env('OnpremId9'), Cypress.env('KangTestPwd'));

        /* 그룹 초대 */
        cy.get('.gnb__container').contains('그룹').click();
        cy.get('.dashboard__header--control > .btn').click();
        cy.wait(3 * 1000);
        cy.get('#group_new_manager_email').type(Cypress.env('OnpremId10'));
        cy.get('.flex-display > .btn-primary').click();
        cy.get('.page-button > .btn-primary').click();
        cy.get('.btn-close > .fa-solid').click();
        cy.wait(3 * 1000);
        cy.contains('asd10');
    });

    it('Group Manager Change & Group Delete Test', () => {
        loginModule.login(Cypress.env('Onprem'), Cypress.env('AdminId'), Cypress.env('AdminPwd'));

        /* 관리자 변경 */
        cy.get('.gnb__container').contains('그룹 관리').click();
        cy.get(':nth-child(1) > :nth-child(6) > .flex-display > .btn-default').click();
        cy.get('#group_new_manager_email').type(Cypress.env('OnpremId10'));
        cy.get('.modal-button-content > .btn-primary').click();
        cy.get('.vertical-label-list').then(btn => {
            const Group = btn.text().includes('다른 그룹의 그룹 관리자로 지정된 회원입니다.');
            if (Group) {
                cy.get('.btn-close > .fa-solid').click();
                cy.get('.ng-star-inserted')
                    .contains('asd10')
                    .closest('.ng-star-inserted')
                    .find('.text-left')
                    .invoke('text')
                    .then(text => {
                        cy.log(text);
                        cy.get('.ng-star-inserted')
                            .contains('asd10')
                            .closest('.ng-star-inserted')
                            .find('.btn-danger')
                            .click();
                        cy.get('#group_delete_check').type(text);
                    });
                cy.get('.modal-button-content > .btn-danger').click();
                cy.wait(3 * 1000);
                cy.get(':nth-child(1) > :nth-child(6) > .flex-display > .btn-default').click();
                cy.get('#group_new_manager_email').type(Cypress.env('OnpremId10'));
                cy.get('.modal-button-content > .btn-primary').click();
            }
            cy.wait(5 * 1000);

            /* 그룹 삭제 */
            cy.get(':nth-child(1) > :nth-child(6) > .flex-display > .btn-danger').click();
            cy.get('.ng-star-inserted')
                .contains('asd10')
                .closest('.ng-star-inserted')
                .find('.text-left')
                .invoke('text')
                .then(text => {
                    cy.log(text);
                    cy.get('#group_delete_check').type(text);
                    cy.get('.modal-button-content > .btn-danger').click();
                    cy.wait(3 * 1000);
                });
        });
    });

    afterEach('Status Fail', () => {
        if (FailTF) {
            const ScreenshotFileName = `Group Managrement test ${Cypress.env('DateLabel')}`;
            cy.screenshot(ScreenshotFileName);
            if (!Cypress.platform.includes('win')) {
                const CurrentFile = f.getFileName(__filename);
                Screenshots.push(`${CurrentFile}/${ScreenshotFileName}`);
            } else {
                Screenshots.push(`${ScreenshotFileName}`);
            }
            FailTF = false;
        }
    });
    after('Send Email', () => {
        const TestRange = '1. 그룹 생성 2. 그룹 초대 3. 그룹 관리자 변경 4. 그룹 삭제';
        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[Onprem] Group Managrement test ${Cypress.env('EmailTitle')}`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
