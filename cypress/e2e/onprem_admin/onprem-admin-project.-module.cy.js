const { loginModule, emailModule, functionModule: f, constantModule: c } = require('../module/manager.module.js');

describe('Admin Project Module Test', () => {
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

    it('Admin Project Module Search', () => {
        cy.get('.nav-button > button').click();
        cy.contains('프로젝트 모듈').click();
        cy.wait(3 * 1000);

        cy.get('.search-box__list > li:nth-child(1)').click();
        cy.contains(c.IMAGE).click();
        cy.get('.search-box__list > li:nth-child(2)').click();
        cy.contains('이미지 프로세싱').click();
        cy.get('.search-box__list > li:nth-child(3)').click();
        cy.contains('일반 기능').click();
        cy.get('.search-box__list > li:nth-child(4)').click();
        cy.get(':nth-child(3) > .p-dropdown-item').click();
        cy.get('.search-box__list > li:nth-child(5) > div > div > p-calendar:first').type('2023-06-01');
        cy.get('.search-box__list > li:nth-child(5) > div > div > p-calendar:last').type(Cypress.env('Date'));
        cy.get('.search-box__list > li:nth-child(6)').type('Copy of ㅈㄷㅈㄷ');
        cy.get('.search-box__list > li:nth-child(7)').type(Cypress.env('OnpremAdminId'));

        cy.contains('검색').click();
        cy.wait(3 * 1000);

        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(2)').contains(c.IMAGE);
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(3)').contains('이미지 프로세싱');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(4)').contains('일반 기능');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(5)').contains('Copy of ㅈㄷㅈㄷ');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(6)').contains('비게시');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(7)').contains(`/ ${Cypress.env('OnpremAdminId')}`);

        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(8) > .btn').click();
        cy.wait(3 * 1000);

        cy.get('.table-view > tbody > tr:nth-child(1) > td:nth-child(2)').contains('Copy of ㅈㄷㅈㄷ');
        cy.get('.table-view > tbody > tr:nth-child(2) > td:nth-child(2)').contains(c.IMAGE);
        cy.get('.table-view > tbody > tr:nth-child(3) > td:nth-child(2)').contains('이미지 프로세싱');
        cy.get('.table-view > tbody > tr:nth-child(4) > td:nth-child(2)').contains('일반 기능');

        cy.contains('수정').click();

        cy.get(':nth-child(2) > .module-info__write > .note-editor > .note-editing-area > .note-editable');

        cy.get(
            `.table-view > tbody > tr:nth-child(5) > td:nth-child(2) > div > section:last > 
            .module-info__write > .note-editor > .note-editing-area > .note-editable`,
        )
            .clear()
            .type('eng.');
        cy.contains('수정 완료').click();
        cy.contains('확인').click();
        cy.wait(0.5 * 1000);
        cy.contains('확인').click();
        cy.wait(0.5 * 1000);

        cy.get('.table-view > tbody > tr:nth-child(5) > td:nth-child(2)').contains('eng.');

        cy.contains('수정').click();
        cy.get(
            `.table-view > tbody > tr:nth-child(5) > td:nth-child(2) > div > section:last >
            .module-info__write > .note-editor > .note-editing-area > .note-editable`,
        )
            .clear()
            .type('eng');
        cy.contains('수정 완료').click();
        cy.contains('확인').click();
        cy.wait(0.5 * 1000);
        cy.contains('확인').click();
        cy.wait(0.5 * 1000);

        cy.contains('목록가기').click();
        cy.wait(3 * 1000);

        cy.contains('프로젝트 모듈 조회');
    });

    afterEach('Status Fail', () => {
        if (Failure) {
            const ScreenshotFileName = `Admin Project Module Test ${Cypress.env('DateLabel')}`;
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
        const TestRange = '1. 프로젝트 모듈 검색 2. 프로젝트 모듈 상세 페이지 3. 상세 설명 수정 및 확인';

        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[${Cypress.env('EmailTitle')}][Onprem][Admin] Project Module`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
