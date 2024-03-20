const { loginModule, emailModule, functionModule: f } = require('../module/manager.module.js');

describe('Onprem Dashboard Test', () => {
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
        loginModule.login(Cypress.env('Onprem'), Cypress.env('OnpremId10'), Cypress.env('KangTestPwd'));
    });

    it('Dashboard Test', () => {
        /* 최근 공유된 데이터셋 진입 */
        cy.get(':nth-child(1) > .sharing-dataset-card__title > .tag-name > dt').then($element => {
            const DatasetName = $element.text();
            cy.get(':nth-child(1) > .sharing-dataset-card__title > .tag-name > dt').click();
            cy.contains(DatasetName);
        });
        cy.go('back'); //뒤로가기
        cy.contains(
            '현재 연구에 이용할 수 있는 데이터셋이 존재하지 않습니다. 데이터셋을 등록해 연구에 활용 해보세요.',
            { timeout: 10 * 1000 },
        );

        /* 공지사항 진입 */
        cy.get('.notice-container > :nth-child(1) > dl > dt').then($element => {
            const Notice = $element.text();
            cy.get('.notice-container > :nth-child(1) > dl > dt').click();
            cy.contains(Notice);
        });
        cy.go('back');
        cy.contains(
            '현재 연구에 이용할 수 있는 데이터셋이 존재하지 않습니다. 데이터셋을 등록해 연구에 활용 해보세요.',
            { timeout: 10 * 1000 },
        );

        /* 이미지 데이터셋 생성 화면 이동 */
        cy.get('.info-card-banner > section > div > :nth-child(1)').click();
        cy.go('back');
        cy.contains(
            '현재 연구에 이용할 수 있는 데이터셋이 존재하지 않습니다. 데이터셋을 등록해 연구에 활용 해보세요.',
            { timeout: 10 * 1000 },
        );

        /* 레코드 데이터셋 생성 화면 이동 */
        cy.get('.info-card-banner > section > div > :nth-child(2)').click();
        cy.go('back');
        cy.contains(
            '현재 연구에 이용할 수 있는 데이터셋이 존재하지 않습니다. 데이터셋을 등록해 연구에 활용 해보세요.',
            { timeout: 10 * 1000 },
        );

        // 프로젝트 진입
        cy.get('.ng-star-inserted')
            .find('.dashboard-card__sort')
            .contains('프로젝트')
            .closest('.ng-star-inserted')
            .find('.dashboard-card__name > button')
            .eq(0)
            .then($element => {
                const ProjectName = $element.text();
                cy.get('.ng-star-inserted')
                    .find('.dashboard-card__sort')
                    .contains('프로젝트')
                    .closest('.ng-star-inserted')
                    .find('.dashboard-card__into .btn.btn-clear-default.btn-padding-0')
                    .eq(0)
                    .click();
                // 프로젝트 이름 확인
                cy.contains(ProjectName);
            });
        cy.go('back');
        cy.contains(
            '현재 연구에 이용할 수 있는 데이터셋이 존재하지 않습니다. 데이터셋을 등록해 연구에 활용 해보세요.',
            { timeout: 10 * 1000 },
        );

        // 데이터셋 진입
        cy.get('.ng-star-inserted')
            .find('.dashboard-card__sort')
            .contains('데이터셋')
            .closest('.ng-star-inserted')
            .find('.dashboard-card__name > button')
            .eq(0)
            .then($element => {
                const DatasetName = $element.text();
                cy.get('.ng-star-inserted')
                    .find('.dashboard-card__sort')
                    .contains('데이터셋')
                    .closest('.ng-star-inserted')
                    .find('.dashboard-card__into .btn.btn-clear-default.btn-padding-0')
                    .eq(0)
                    .click();
                // 데이터셋 이름 확인
                cy.contains(DatasetName);
            });
        cy.go('back');
        cy.contains(
            '현재 연구에 이용할 수 있는 데이터셋이 존재하지 않습니다. 데이터셋을 등록해 연구에 활용 해보세요.',
            { timeout: 10 * 1000 },
        );
    });

    afterEach('Status Check', () => {
        if (Failure) {
            const ScreenshotFileName = `Dashboard Test ${Cypress.env('DateLabel')}`;
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
        const TestRange =
            '1. 최근 공유된 데이터셋 진입 2. 공지사항 진입 3. 공유된 데이터셋 진입 4. 공유된 프로젝트 진입';
        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[${Cypress.env('EmailTitle')}][Onprem] Dashboard`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
