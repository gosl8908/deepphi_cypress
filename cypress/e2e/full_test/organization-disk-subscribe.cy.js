const { loginModule, emailModule, functionModule: f } = require('../module/manager.module.js');

describe('Organization Create', () => {
    let TestFails = []; // 실패 원인을 저장할 변수
    let Screenshots = []; // 스크린샷을 저장할 배열
    let Failure = false;
    Cypress.on('fail', (err, runnable) => {
        const ErrMessage = err.message || '알 수 없는 이유로 실패함';
        !TestFails.includes(ErrMessage) && TestFails.push(ErrMessage);
        Failure = true;
        throw err;
    });
    before(() => {
        cy.setDateToEnv();
        cy.getAll();
        loginModule.login(Cypress.env('Prod'), Cypress.env('AutoTestId'), Cypress.env('KangTestPwd'));
    });

    // 단체 DISK 구독
    it('Organization DISK subscribe', () => {
        cy.get('dd.ng-tns-c1-1').click();
        cy.get('.organization-changer__opener').click();
        cy.get('.organization-changer__list > ul > .ng-star-inserted').click();
        cy.wait(5 * 1000);

        // 크레딧 충전
        cy.get(':nth-child(7) > button').click(); // 크레딧
        cy.wait(5000);
        cy.get('.control-box__button > .btn').eq(0).click(); // 업그레이드
        cy.wait(3000);
        cy.get(':nth-child(1) > div > .radio-item > em').click(); // 필수 체크
        cy.get('.mt3 > div > .radio-item > em').click(); // 필수 체크
        cy.get('.modal-button-content > .btn-primary').click(); // 결제
        cy.wait(3000);
        cy.get('.modal-button-content > .btn').click(); // 확인
        cy.contains('DISK 30GB 정기권'); // 업그레이드 확인
    });
    afterEach('Status Fail', () => {
        if (Failure) {
            const ScreenshotFileName = `Organization DISK Subscribe Test ${Cypress.env('DateLabel')}`;
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
        const TestRange = '1. 단체 DISK 구독';
        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[${Cypress.env('EmailTitle')}][Prod] Organization DISK Subscribe`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
