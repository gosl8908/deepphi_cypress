const { loginModule, createModule, EmailModule, functionModule: f } = require('../module/manager.module.js');

describe('Create Project Test', () => {
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
        loginModule.login(Cypress.env('Prod'), Cypress.env('ObsTestId'), Cypress.env('ObsTestPwd'));
    });

    it('Create Project Test', () => {
        cy.wait(3000);

        // 이미지 프로젝트 생성
        cy.log('이미지 프로젝트 생성');
        createModule.createImageProject('2D_CL_Case1 ' + Cypress.env('date_label'));
        cy.wait(3000);

        cy.log('모델러 구성');
        // 모델러 화면 인식
        cy.get('#graphContainerTrain > svg', { force: true }).should('exist').as('svg');
        cy.wait(3000);

        // 데이터셋 모듈 검색
        cy.get('form.ng-untouched > .search-box > .input-form').type('Class');
        cy.get('.search-box > .btn').click();
        cy.wait(3000);

        // 데이터셋 모듈 인식
        cy.get('#\\39 104').should('exist').as('Dataset'); // 데이터셋 별 값이 달라 변경 필요
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

        // VGG16 모듈 검색
        cy.get('.NeuralNetwork').click();
        cy.get('form.ng-untouched > .search-box > .input-form').type('vgg16');
        cy.get('form.ng-untouched > .search-box > .btn').click();
        cy.wait(3000);

        // VGG16 모듈 인식
        cy.get('#\\34 7').should('exist').as('vgg16');
        cy.wait(3000);

        // VGG16 모듈 모델러에 추가
        cy.ModuleAdd('@vgg16', '@svg', 1000, 400);

        cy.wait(3000);

        //데이터셋에서 Resize 연결

        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image').realHover('mouse');
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image')
            .realMouseDown()
            .realMouseMove(200, 0)
            .realMouseUp();
        cy.wait(3000);

        // 데이터셋 클릭
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image').click();
        cy.wait(1000);

        //Resize에서 VGG16 연결
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(3) > image').realHover('mouse');
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image')
            .realMouseDown()
            .realMouseMove(200, 0)
            .realMouseUp();
        cy.wait(3000);

        cy.log('프로젝트 실행');
        //프로젝트 Run
        cy.get('.modeler-header__run-action-button > .btn').click();
        cy.wait(3000);

        cy.contains('실행'); // Running 상태 체크
        cy.wait(3000);

        cy.screenshot('Project-Run-Result-' + Cypress.env('date_label'), { capture: 'fullPage' });
    });

    afterEach('Status Check', () => {
        if (FailTF) {
            const ScreenshotFileName = `Create Image Project ${Cypress.env('DateLabel')}`;
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
        const TestRange = '1. 이미지 프로젝트 생성 2. 모듈 추가(resize, VGG16) 3. 모듈 연결 4. 실행';

        EmailModule.Email({
            TestFails: TestFails,
            EmailTitle: `Create Image Project ${Cypress.env('EmailTitle')}`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
