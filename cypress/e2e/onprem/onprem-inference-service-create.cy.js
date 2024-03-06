const {
    loginModule,
    createModule,
    apiModule,
    emailModule,
    inferenceServiceModule,
    constantModule: c,
    functionModule: f,
} = require('../module/manager.module.js');

describe('Onprem Inference Service Create', () => {
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
        loginModule.login(Cypress.env('Onprem'), Cypress.env('OnpremId6'), Cypress.env('KangTestPwd'));
    });

    it('Image Inference Service Create Test', () => {
        cy.get('.gnb__nav > ul > :nth-child(2) > button', { timeout: 10 * 1000 }).click();
        createModule.createTestProject('이미지 평가 프로젝트 자동화 확인용', c.ONPREM);
        cy.get('.btn__floating--exit > .btn__flow-floating').contains('학습', { timeout: 30 * 1000 });

        cy.log('리소스 설정');
        /* 리소스 설정 */
        cy.get('.modeler__nav > ul > :nth-child(3) > button').click();
        cy.get(':nth-child(4) > .select-row__item > .radio-item > em').eq(0).click(); // cpu.2
        cy.contains('gpu.16G').click(); // gpu.16
        cy.get('.btn-primary').click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.contains('성공적으로 저장되었습니다.');

        cy.log('프로젝트 실행');
        /* 프로젝트 Run */
        cy.get('.modeler-header__run-action-button > .btn').click({ force: true });
        cy.get('.modeler__status')
            .contains('실행', { timeout: 10 * 1000 })
            .should('be.visible');
        cy.get('.modeler__status')
            .contains('완료', { timeout: 360 * 1000 })
            .should('be.visible');
        cy.wait(3 * 1000);

        cy.get('.modeler__nav > ul > :nth-child(2) > button').click();
        inferenceServiceModule.inferenceCreate();

        inferenceServiceModule.inferenceRun(c.ONPREM);

        // api url 복사
        cy.get('[style="width: calc(100% - 76px);word-break: break-all"]').then($url => {
            // 텍스트 추출
            const Endpoint = $url.text().trim();

            cy.log('확인된 endpointText 값:', Endpoint);

            cy.get('.default-tab > ul > :nth-child(2) > button').click(); // 에측 이력
            cy.wait(5 * 1000);
            apiModule.api(Endpoint, c.IMAGE);
            cy.get('.flex-auto').contains('성공', {
                timeout: 15 * 1000,
            });
        });
    });

    it('Record Inference Service Create Test', () => {
        cy.get('.gnb__nav > ul > :nth-child(2) > button', { timeout: 10 * 1000 }).click();
        createModule.createTestProject('레코드 평가 프로젝트 자동화 확인용', c.ONPREM);

        cy.log('리소스 설정');
        /* 리소스 설정 */
        cy.get('.modeler__nav > ul > :nth-child(3) > button').click();
        cy.get(':nth-child(5) > dd > .select-row__content > :nth-child(4) > .select-row__item').click(); // cpu.2
        cy.get(
            '.resource-setting__item-container.mb10 > dd > .select-row__content > :nth-child(4) > .select-row__item',
        ).click();
        cy.contains('gpu.16G').click(); // gpu.16
        cy.get('.btn-primary').click();
        cy.get('.modal-button-content > .btn-primary').click();
        cy.contains('성공적으로 저장되었습니다.');

        cy.log('프로젝트 실행');
        /* 프로젝트 Run */
        cy.get('.modeler-header__run-action-button > .btn').click({ force: true });
        cy.get('.modeler__status')
            .contains('실행', { timeout: 10 * 1000 })
            .should('be.visible');
        cy.get('.modeler__status')
            .contains('완료', { timeout: 360 * 1000 })
            .should('be.visible');
        cy.wait(3 * 1000);

        cy.get('.modeler__nav > ul > :nth-child(2) > button').click();

        inferenceServiceModule.inferenceCreate();

        inferenceServiceModule.inferenceRun(c.ONPREM);

        // api url 복사
        cy.get('[style="width: calc(100% - 76px);word-break: break-all"]').then($url => {
            // 텍스트 추출
            const Endpoint = $url.text().trim();

            cy.log('확인된 endpointText 값:', Endpoint);

            cy.get('.default-tab > ul > :nth-child(2) > button').click(); // 에측 이력
            cy.wait(30 * 1000);
            apiModule.api(Endpoint, c.RECORD);
            cy.get('.flex-auto').contains('성공', {
                timeout: 30 * 1000,
            });
        });
    });

    afterEach('Status Fail', () => {
        cy.visit(`${Cypress.env('Onprem')}organization/inference`);
        cy.wait(10 * 1000);
        cy.get('h2').contains('인퍼런스', { timeout: 10 * 1000 });

        /* 인퍼런스 삭제 */
        cy.get('body')
            .invoke('text')
            .then(text => {
                if (text.includes('내용 없음')) {
                    return false;
                }
                // 인퍼런스 제목 복사
                cy.get('tr.ng-star-inserted > :nth-child(4)')
                    .eq(0)
                    .invoke('text')
                    .then(Title => {
                        cy.log(Title);

                        cy.get('tr.ng-star-inserted > :nth-child(5)')
                            .eq(0)
                            .invoke('text')
                            .then(text => {
                                // 텍스트가 "중지" 또는 "대기"인 경우
                                if (text.includes('중지') || text.includes('대기')) {
                                    cy.log('현재 상태: 중지, 대기');
                                    cy.get(':nth-child(1) > :nth-child(14) > .btn').invoke('click');
                                } else if (text.includes('실행')) {
                                    // 텍스트가 "실행"인 경우
                                    cy.log('현재 상태: 실행');
                                    cy.get(':nth-child(11) > .btn').invoke('click');
                                    cy.get('tr.ng-star-inserted > :nth-child(5)')
                                        .eq(0)
                                        .contains('중지', { timeout: 30 * 1000 });
                                    cy.get(':nth-child(1) > :nth-child(14) > .btn').invoke('click');
                                }
                            });
                        cy.get('.btn-danger').invoke('click'); // 삭제
                        cy.contains('인퍼런스 서비스가 삭제되었습니다.', { timeout: 30 * 1000 });

                        /* 평가 프로젝트 삭제 */
                        cy.get('.gnb__nav > ul > :nth-child(2) > button').invoke('click');
                        cy.contains('내 프로젝트만 보기', { timeout: 20 * 1000 });
                        /* 프로젝트 검색 */
                        cy.get('.search-box > .input-form').type(Title);
                        cy.get('.search-box > .btn-primary').invoke('click');
                        cy.wait(3000);
                        cy.get('.dashboard-card__name > button').eq(0).invoke('click');
                        cy.get('.modeler__nav > ul > :nth-child(2) > button').invoke('click');
                        cy.get('.clear-both > .btn').invoke('click');
                        cy.get('.btn-primary').invoke('click');
                        cy.wait(5 * 1000);
                        cy.get('body').then(cardContent => {
                            const NotProject = !cardContent.text().includes('평가 프로젝트를 생성할 수 있습니다.');
                            if (NotProject) {
                                cy.get(
                                    '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .btn',
                                ).click();
                                cy.get(
                                    '.current > .test-project__item--header > .test-project__item--control > .list-dropdown-wrap > .list-dropdown',
                                )
                                    .contains('삭제')
                                    .click();
                                cy.get('.btn-danger').click();
                                cy.wait(5 * 1000);
                            } else {
                                // 특정 텍스트가 발견되면 반복문 종료
                                return false;
                            }
                        });
                    });
            });
        if (Failure) {
            const ScreenshotFileName = `Inference Service Create Test ${Cypress.env('DateLabel')}`;
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
            '1. 평가 프로젝트 생성 2. 실행 3. 인퍼런스 서비스 생성 4. 실행 5. API 호출 6. 결과 조회 7. 중지 8. 삭제 ';
        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[${Cypress.env('EmailTitle')}][Onprem] Inference Service Create`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
