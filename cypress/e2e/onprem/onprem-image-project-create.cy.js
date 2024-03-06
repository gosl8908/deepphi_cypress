const {
    loginModule,
    createModule,
    emailModule,
    constantModule: c,
    functionModule: f,
} = require('../module/manager.module.js');

describe('Image Project Create', () => {
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
        loginModule.login(Cypress.env('Onprem'), Cypress.env('OnpremId3'), Cypress.env('KangTestPwd'));
    });

    it('Image Project Create', () => {
        cy.get('.gnb__nav > ul > :nth-child(2) > button').click();
        createModule.createProject(c.IMAGE, 'ImageProject' + Cypress.env('DateLabel'));
        cy.wait(20 * 1000);
        cy.contains('마이 데이터셋', { timeout: 30 * 1000 });

        // 리소스 설정
        cy.get('.modeler__nav > ul > :nth-child(3) > button').click(); // 리소스 탭
        cy.contains('cpu.4').click({ force: true }); // 데이터 프로세싱 cpu.4
        cy.contains('gpu.16G').click();
        cy.get('.btn-primary').click(); // 저장
        cy.get('.modal-button-content > .btn-primary').click(); // 확인
        cy.contains('성공적으로 저장되었습니다.'); // 저장 확인
        cy.wait(3000);

        cy.log('모델러 구성');
        // 모델러 화면 인식
        cy.get('.modeler__nav > ul > :nth-child(1) > button').click(); // 모듈 탭 선택
        cy.get('#graphContainerTrain > svg', { force: true }).should('exist').as('svg');
        cy.wait(3000);

        // 데이터셋 모듈 검색
        cy.get('form.ng-untouched > .search-box > .input-form').type('Dataset');
        cy.get('.search-box > .btn').click();
        cy.wait(3000);

        // 데이터셋 모듈 인식
        cy.get('#\\31 7589').should('exist').as('Dataset'); // 데이터셋 별 값이 달라 변경 필요
        cy.wait(3000);

        // 데이터셋 모듈 모델러에 추가
        cy.ModuleAdd('@Dataset', '@svg', 600, 400);

        // Resize 모듈 검색
        cy.get('.ImageProcess').click();
        cy.get('form.ng-untouched > .search-box > .input-form').type('resize');
        cy.get('form.ng-untouched > .search-box > .btn').click();
        cy.wait(3000);

        // Resize 모듈 인식
        cy.get('#\\31 390').should('exist').as('resize');
        cy.wait(3000);

        // Resize 모듈 모델러에 추가
        cy.ModuleAdd('@resize', '@svg', 800, 400);

        /* Resize 모듈 파라미터 수정 */
        cy.get(':nth-child(2) > :nth-child(2) > .input-form').clear().type('128');
        cy.get(':nth-child(3) > :nth-child(2) > .input-form').clear().type('128');
        cy.get('.flex-button-box > .ng-star-inserted > .btn').click();
        cy.contains('성공적으로 저장되었습니다.', { timeout: 10 * 1000 }).should('be.visible');

        /* VGG16 모듈 검색 */
        cy.get('.NeuralNetwork').click();
        cy.get('form.ng-untouched > .search-box > .input-form').type('vgg16');
        cy.get('form.ng-untouched > .search-box > .btn').click();
        cy.wait(3000);

        /* VGG16 모듈 인식 */
        cy.get('#\\34 7').should('exist').as('vgg16');
        cy.wait(3000);

        /* VGG16 모듈 모델러에 추가 */
        cy.ModuleAdd('@vgg16', '@svg', 1000, 400);

        cy.wait(3000);

        // 데이터셋 클릭
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image').click();
        cy.wait(1000);

        /* 데이터셋에서 Resize 연결 */
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image').realHover('mouse');
        cy.wait(3000);
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image')
            .realMouseDown()
            .realMouseMove(200, 0)
            .realMouseUp({ position: 'center' });
        cy.wait(3000);

        // 데이터셋 클릭
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image').click();
        cy.wait(1000);

        /* Resize에서 VGG16 연결 */
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(3) > image').realHover('mouse');
        cy.wait(3000);
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image')
            .realMouseDown()
            .realMouseMove(200, 0)
            .realMouseUp({ position: 'center' });
        cy.wait(3000);

        cy.log('프로젝트 실행');
        //프로젝트 Run
        cy.get('.modeler-header__run-action-button > .btn').click();
        cy.get('.modeler-header__run-action-button > .btn')
            .contains('중지', { timeout: 30 * 1000 })
            .should('be.visible');
        const Status = cy
            .get('.modeler__status')
            .contains('완료', { timeout: 420 * 1000 })
            .should('be.visible');

        if (Status) {
            cy.get('dt > p').then($url => {
                // 텍스트 추출
                const Title = $url.text();
                cy.go('back');
                cy.wait(5 * 1000);
                cy.get('.search-box > .input-form').type(Title);
                cy.get('.search-box > .btn-primary').click();
                cy.get('.dashboard-card__control > .btn').click();
                cy.get('.list-dropdown').contains('삭제').click();
                cy.get('.btn-danger').click();
                cy.wait(20 * 1000);
                cy.get('.cover__no-contents', { timeout: 30 * 1000 })
                    .contains('검색 결과가 없습니다.', { timeout: 10 * 1000 })
                    .should('be.visible');
            });
        }
    });
    afterEach('Status Fail', () => {
        if (FailTF) {
            const ScreenshotFileName = `Image Project Create Test ${Cypress.env('DateLabel')}`;
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
        const TestRange = '1. 이미지 프로젝트 생성 2. 리소스 설정 3. 모듈 추가 4. 모듈 연결 5. 실행';
        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `[Onprem] Image Project Create Test ${Cypress.env('EmailTitle')}`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
