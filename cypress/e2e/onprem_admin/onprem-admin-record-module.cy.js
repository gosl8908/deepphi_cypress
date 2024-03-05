const { loginModule, emailModule, functionModule: f, constantModule: c } = require('../module/manager.module.js');

describe('Admin Record Module Test', () => {
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

    it('Admin Record Module Search', () => {
        cy.get('.nav-button > button').click();
        cy.contains('레코드 전처리 모듈').click();
        cy.wait(3 * 1000);

        cy.get('.search-box__list > li:nth-child(1)').click();
        cy.contains('데이터 클렌징').click();
        cy.get('.search-box__list > li:nth-child(2)').click();
        cy.get(':nth-child(2) > .p-dropdown-item').click();
        cy.get('.search-box__list > li:nth-child(3) > div > div > p-calendar:first').type('2023-06-01');
        cy.get('.search-box__list > li:nth-child(3) > div > div > p-calendar:last').type(Cypress.env('Date'));
        cy.get('.search-box__list > li:nth-child(4)').type('New Column');
        cy.get('.search-box__list > li:nth-child(5)').type(Cypress.env('OnpremAdminId'));

        cy.contains('검색').click();
        cy.wait(3 * 1000);

        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(2)').contains('데이터 클렌징');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(3)').contains('New Column');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(4)').contains('게시');
        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(5)').contains(`${Cypress.env('OnpremAdminId')}`);

        cy.get('.p-datatable-tbody > tr:nth-child(1) > td:nth-child(6) > .btn').click();
        cy.wait(3 * 1000);

        cy.get('.table-view > tbody > tr:nth-child(1) > td:nth-child(2)').contains('New Column');
        cy.get('.table-view > tbody > tr:nth-child(2) > td:nth-child(2)').contains('데이터 클렌징');
        cy.get('.table-view > tbody > tr:nth-child(3) > td:nth-child(2)').contains(
            '지정한 위치, 지정한 타입의 빈 값을 가지는 새로운 column 추가하는 기능',
        );

        cy.contains('수정').click();

        cy.get(
            `.table-view > tbody > tr:nth-child(3) > td:nth-child(2) > div > section:last > 
            .module-info__write > .note-editor > .note-toolbar > .note-misc > .btn-codeview`,
        ).as('CodeView');

        cy.get('@CodeView').click();

        cy.get(
            `.table-view > tbody > tr:nth-child(3) > td:nth-child(2) > div > section:last > 
            .module-info__write > .note-editor > .note-editing-area > .note-codable`,
        )
            .clear()
            .type(
                `<p><b>(1) 설명 :</b></p><p>지정한 위치, 지정한 타입의 빈 값을 가지는 새로운 column 추가하는 기능.</p>`,
            );

        cy.get('@CodeView').click();

        cy.contains('수정 완료').click();
        cy.contains('확인').click();
        cy.wait(0.5 * 1000);
        cy.contains('확인').click();
        cy.wait(0.5 * 1000);

        cy.get('.table-view > tbody > tr:nth-child(3) > td:nth-child(2)').contains(
            '지정한 위치, 지정한 타입의 빈 값을 가지는 새로운 column 추가하는 기능.',
        );

        cy.contains('수정').click();

        cy.get('@CodeView').click();

        cy.get(
            `.table-view > tbody > tr:nth-child(3) > td:nth-child(2) > div > section:last > 
                .module-info__write > .note-editor > .note-editing-area > .note-codable`,
        )
            .clear()
            .type(
                `<p><b>(1) 설명 :</b></p><p>지정한 위치, 지정한 타입의 빈 값을 가지는 새로운 column 추가하는 기능</p>`,
            );

        cy.get('@CodeView').click();

        cy.contains('수정 완료').click();
        cy.contains('확인').click();
        cy.wait(0.5 * 1000);
        cy.contains('확인').click();
        cy.wait(0.5 * 1000);

        cy.contains('목록가기').click();
        cy.wait(3 * 1000);

        cy.contains('레코드 전처리 모듈 조회');
    });

    afterEach('Status Fail', () => {
        if (Failure) {
            const ScreenshotFileName = `Admin Record Module Test ${Cypress.env('DateLabel')}`;
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
        const TestRange = '1. 레코드 전처리 모듈 검색 2. 레코드 전처리 모듈 상세 페이지 3. 상세 설명 수정 및 확인';

        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[${Cypress.env('EmailTitle')}][Onprem][Admin] Record Module`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
