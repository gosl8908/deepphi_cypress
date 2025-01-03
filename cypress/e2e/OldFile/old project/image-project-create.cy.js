const { loginModule, createModule, sendEmailModule } = require('../module/manager.module.js');

describe('Image Project Create', () => {
    beforeEach(() => {
      cy.setDateToEnv();
      cy.getAll();
      loginModule.login(Cypress.env('Prod'), Cypress.env('KangTestId'), Cypress.env('KangTestPwd'));
    });

    it('Image Project Create', () => {

        createModule.createImageProject('ImageProject' + Cypress.env('DateLabel'));
        cy.wait(10000); // 10초 대기

        // 리소스 설정
        cy.get('.modeler__nav > ul > :nth-child(3) > button').click(); // 리소스 탭
        cy.get(
            ':nth-child(5) > dd > .select-row__content > :nth-child(2) > .select-row__item > .radio-item > em',
        ).click({ force: true }); // 데이터 프로세싱 cpu.4
        cy.get('.cpu-gpu--selector > :nth-child(2) > div > .radio-item > em').click(); // 뉴럴 네트워크 CPU
        cy.get(
            ':nth-child(6) > dd > .select-row__content > :nth-child(2) > .select-row__item > .radio-item > em',
        ).click({ force: true }); // 뉴럴 네트워크 cpu.4
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

        /* Resize 모듈 파라미터 수정 */
        cy.get(':nth-child(2) > :nth-child(2) > .input-form').clear().type('128');
        cy.get(':nth-child(3) > :nth-child(2) > .input-form').clear().type('128');
        cy.get('.flex-button-box > .ng-star-inserted > .btn').click();
        cy.contains('성공적으로 저장되었습니다.', {timeout: 10*1000}).should('be.visible')


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

        /* 데이터셋에서 Resize 연결 */
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image').realHover('mouse');
        cy.wait(3000);
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image')
            .realMouseDown()
            .realMouseMove(200, 0)
            .realMouseUp();
        cy.wait(3000);

        /* Resize에서 VGG16 연결 */
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(3) > image').realHover('mouse');
        cy.wait(3000);
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(6) > image')
            .realMouseDown()
            .realMouseMove(200, 0)
            .realMouseUp();
        cy.wait(3000);

        cy.log('프로젝트 실행');
        //프로젝트 Run
        cy.get('.modeler-header__run-action-button > .btn').click();
        cy.contains('중지', { timeout: 30000 }).should('be.visible');

        const testRange = '1. 이미지 프로젝트 생성 2. 리소스 설정 3. 모듈 추가 4. 모듈 연결 5. 실행';

        sendEmailModule.sendEmail(
            undefined,
            Cypress.env('AdminId'),
            'Image Project Create ' + Cypress.env('EmailTitle'),
            testRange,
            undefined,)
    });
});
