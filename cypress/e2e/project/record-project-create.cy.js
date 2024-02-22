const {
    loginModule,
    createModule,
    emailModule,
    constantModule: c,
    functionModule: f,
} = require('../module/manager.module.js');

describe('Record Project Create & Run', () => {
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
        loginModule.login(Cypress.env('Prod'), Cypress.env('Obs2TestId'), Cypress.env('ObsTestPwd'));
    });

    it('Record Project Create & Run', () => {
        createModule.createProject(c.RECORD, 'RecordProject' + Cypress.env('DateLabel'));
        cy.wait(10000); // 10초 대기

        // 리소스 설정
        cy.get('.modeler__nav > ul > :nth-child(3) > button').click(); // 리소스 탭
        cy.get(
            ':nth-child(5) > dd > .select-row__content > :nth-child(2) > .select-row__item > .radio-item > em',
        ).click(); // 데이터 프로세싱 cpu.4
        cy.get(
            '.resource-setting__item-container.mb10 > dd > .select-row__content > :nth-child(2) > .select-row__item > .radio-item > em',
        ).click(); // 머신러닝 cpu.4
        cy.get('.btn-primary').click(); // 저장
        cy.get('.modal-button-content > .btn-primary').click(); // 확인
        cy.contains('성공적으로 저장되었습니다.'); // 저장 확인
        cy.wait(3000);

        /* 모듈 추가 */
        cy.get('.modeler__nav > ul > :nth-child(1) > button').click(); // 모듈 탭
        cy.contains('공개 데이터셋').click();
        cy.contains('영화 흥행 예측').click();

        // 모델러 화면 인식
        cy.get('#graphContainerTrain > svg', { force: true }).should('exist').as('svg');
        cy.wait(3000);

        cy.get('#\\38 558').should('exist').as('Dataset'); // 데이터셋 별 값이 달라 변경 필요
        cy.wait(3000);

        // 데이터셋 모듈 모델러에 추가
        cy.ModuleAdd('@Dataset', '@svg', 500, 300);

        // 프로세싱 모듈 추가
        cy.get('.ImageProcess').click(); // 프로세싱 탭
        cy.contains('데이터 클렌징').click(); // 데이터 클랜징 선택
        cy.contains('데이터 프로세싱').click();
        cy.wait(3000);

        // Cleansing 모듈 인식
        cy.get('#\\31 05').should('exist').as('Cleansing');
        cy.wait(3000);

        // Cleansing 모듈 모델러에 추가
        cy.ModuleAdd('@Cleansing', '@svg', 600, 300);

        // Processing 모듈 인식
        cy.get('#\\31 06').should('exist').as('Processing');
        cy.wait(3000);

        // Processing 모듈 모델러에 추가
        cy.ModuleAdd('@Processing', '@svg', 700, 300);

        // DNN-Classification 모듈 검색
        cy.get('.NeuralNetwork').click();
        cy.get('form.ng-untouched > .search-box > .input-form').type('DNN-Classification');
        cy.get('form.ng-untouched > .search-box > .btn').click();
        cy.wait(3000);

        // DNN-Classification 모듈 인식
        cy.get('#\\36 572').should('exist').as('DNN-Classification');
        cy.wait(3000);

        // DNN-Classification 모듈 모델러에 추가
        cy.ModuleAdd('@DNN-Classification', '@svg', 800, 300);
        cy.wait(3000);

        // Decision Tree Classifier 모듈 검색
        cy.get('.input-form').clear().type('Decision Tree Classifier');
        cy.get('.search-box > .btn').click();
        cy.wait(3000);

        // Decision Tree Classifier 모듈 인식
        cy.get('#\\36 443').should('exist').as('Decision Tree Classifier');
        cy.wait(3000);

        // Decision Tree Classifier 모듈 모델러에 추가
        cy.ModuleAdd('@Decision Tree Classifier', '@svg', 900, 300);
        cy.wait(3000);

        //데이터셋에서 클렌징 연결
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image').realHover('mouse');
        cy.wait(3000);
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image')
            .realMouseDown({ force: true })
            .realMouseMove(100, 0)
            .realMouseUp()
            .realMouseUp();
        cy.wait(3000);

        // 데이터셋 클릭
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image').click();
        cy.wait(1000);

        //클렌징에서 프로세싱 연결
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(3) > image').realHover('mouse');
        cy.wait(3000);
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image')
            .realMouseDown({ force: true })
            .realMouseMove(100, 0)
            .realMouseUp()
            .realMouseUp();
        cy.wait(3000);

        // 데이터셋 클릭
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image').click();
        cy.wait(1000);

        //프로세싱에서 DNN-Classification 연결
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(5) > image').realHover('mouse');
        cy.wait(3000);
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image')
            .realMouseDown({ force: true })
            .realMouseMove(100, 0)
            .realMouseUp()
            .realMouseUp();
        cy.wait(3000);

        // 데이터셋 클릭
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(1) > image').click();
        cy.wait(1000);

        //DNN-Classification에서 Decision Tree Classifier 연결
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(2) > :nth-child(7) > image').realHover('mouse');
        cy.wait(3000);
        cy.get('#graphContainerTrain > svg > :nth-child(1) > :nth-child(3) > :nth-child(3) > image') // 호버 할때 표시되는 이미지 위치 고정
            .realMouseDown({ force: true })
            .realMouseMove(100, 0)
            .realMouseUp()
            .realMouseUp();
        cy.wait(3000);

        //클렌징 모듈 설정
        cy.get('.flow__module--name').contains('Data Cleansing').click();
        cy.wait(3000);
        cy.get('[style="cursor: pointer; visibility: visible;"]').eq(1).click(); // 모듈 더보기
        cy.get('.mxPopupMenu').contains('프로세스 플로우').click();
        cy.wait(3000);
        cy.get('.btn-floating > .fas').click(); // 클렌징 모듈 추가
        cy.contains('Calculation').click(); // Calculation 선택
        cy.get('#\\31 3 > .cdk-drag > .button-list > .btn').click(); // 추가
        cy.wait(3000);

        // Calculation 설정
        cy.get('.nav-project-right > ul > :nth-child(2) > button').click(); // 설정탭 선택
        cy.get(':nth-child(1) > .input-form > .ui-dropdown > .ui-dropdown-trigger > .ui-dropdown-trigger-icon').click(); // 열 선택
        cy.get(':nth-child(1) > .ui-dropdown-item > div.ng-star-inserted > div').click(); // 상영시간 선택
        cy.get('.combination-column-select > .btn').click(); // 추가
        cy.get('.combination-column__button > :nth-child(3)').click(); // + 선택
        cy.get(':nth-child(1) > .input-form > .ui-dropdown > .ui-dropdown-trigger > .ui-dropdown-trigger-icon').click(); // 열 선택
        cy.get(':nth-child(6) > .ui-dropdown-item > div.ng-star-inserted > div').click(); // 관객수
        cy.get('.combination-column-select > .btn').click(); // 추가
        cy.get('.column-form > :nth-child(1) > .input-form').type('열추가'); // 열 이름 입력
        cy.get(
            '.column-form > :nth-child(2) > :nth-child(2) > .input-form > .ui-dropdown > .ui-dropdown-trigger',
        ).click(); // 열 위치
        cy.get(':nth-child(4) > .ui-dropdown-item').click(); // 상영시간
        cy.get('.flex-button-box > :nth-child(2) > .btn').click(); // 저장
        cy.contains('성공적으로 저장하였습니다'); // 저장 확인
        cy.wait(5000);
        cy.get('.title > button > .fa-solid').click(); // 닫기
        cy.get('.right-content > .btn').click(); // 플로우 화면 나가기

        // 프로세싱 모듈 설정
        cy.get('.flow__module--name').contains('Data Processing').click();
        cy.wait(2000);
        cy.get('[style="cursor: pointer; visibility: visible;"]').eq(1).click(); // 모듈 더보기
        cy.get('.mxPopupMenu').contains('프로세스 플로우').click();
        cy.wait(3000);
        cy.get('.btn-floating > .fas').click(); // 프로세싱 모듈 추가
        cy.contains('Scale').click({ force: true }); // Scale 선택
        cy.contains('추가').click();
        cy.wait(3000);

        // Scale 설정
        cy.get('.flow-item-box > .flow-item > .flow-item__name').click(); // Scale 모듈 선택
        cy.get('.nav-project-right > ul > :nth-child(2) > button').click(); // 설정 탭
        cy.get('.ui-multiselect-trigger-icon').click(); // 작업 대상 펼치기
        cy.get(':nth-child(1) > .ui-multiselect-item').click(); // 상영시간 선택
        cy.get('.ui-multiselect-label').click(); // 작업 대상 접기
        cy.get('td > .input-form > .ui-dropdown > .ui-dropdown-trigger').click(); // 처리 방법
        cy.get(':nth-child(1) > .ui-dropdown-item').click(); // 표준화 선택
        cy.get('.flex-button-box > :nth-child(2) > .btn').click(); // 저장
        cy.contains('성공적으로 저장하였습니다'); // 저장 확인
        cy.wait(5000);
        cy.get('.title > button > .fa-solid').click(); // 닫기
        cy.get('.right-content > .btn').click(); // 플로우 화면 나가기

        // DNN-Classification 클릭
        cy.get('.flow__module--name').contains('DNN-Classification').click();
        cy.wait(2000);
        cy.get('.nav-project-right > ul > :nth-child(2) > button').click(); // 변수 설정 탭
        cy.wait(3000);
        cy.get('.ui-multiselect-trigger').click({ force: true }); // 입력변수 설정
        cy.wait(3000);
        cy.get('.ui-multiselect-items-wrapper').contains('상영시간').click({
            force: true,
        }); // 상영시간 체크
        cy.get(
            '.content-scroll > :nth-child(2) > :nth-child(2) > .input-form > .ui-dropdown > .ui-dropdown-trigger',
        ).click({ force: true }); // 목표변수 설정
        cy.get('.ui-dropdown-items-wrapper').contains('감독의영화개수').click(); // 감독의 영화 개수 선택
        cy.get('.input-columns > .btn').click(); // 입력변수 추가
        cy.get('.flex-button-box > :nth-child(2) > .btn').click(); // 저장
        cy.wait(3000);

        // Decision Tree Classifier 클릭
        cy.get('.flow__module--name').contains('Decision Tree Classifier').click();
        cy.wait(2000);
        cy.get('.ui-multiselect-trigger').click({ force: true }); // 입력변수 설정
        cy.wait(3000);
        cy.get(':nth-child(4) > .ui-multiselect-item > .ui-chkbox > .ui-chkbox-box > .ui-chkbox-icon').click({
            force: true,
        }); // 상영시간 체크
        cy.get(
            '.content-scroll > :nth-child(2) > :nth-child(2) > .input-form > .ui-dropdown > .ui-dropdown-trigger',
        ).click({ force: true }); // 목표변수 설정
        cy.get(':nth-child(8) > .ui-dropdown-item').click(); // 감독의 영화 개수 선택
        cy.get('.input-columns > .btn').click(); // 입력변수 추가
        cy.get('.flex-button-box > :nth-child(2) > .btn').click(); // 저장
        cy.wait(3000);

        //프로젝트 Run
        cy.log('프로젝트 실행');
        cy.get('.modeler-header__run-action-button > .btn').click({ force: true });
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
                cy.get('.btn-home').click();
                cy.wait(5 * 1000);
                cy.get('.search-box > .input-form').type(Title);
                cy.get('.search-box > .btn-primary').click();
                cy.get(':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .btn > .fas').click();
                cy.get(':nth-child(1) > .dashboard-card__item--head > .list-dropdown-wrap > .list-dropdown')
                    .contains('삭제')
                    .click();
                cy.get('.btn-danger').click();
                cy.wait(3 * 1000);
                cy.get('.project-list--none')
                    .contains('안녕하세요! DEEP:PHI 플랫폼 운영팀입니다.', { timeout: 10 * 1000 })
                    .should('be.visible');
            });
        }
    });
    afterEach('Status Fail', () => {
        if (FailTF) {
            const ScreenshotFileName = `Record Project Create/Record Project Create Test ${Cypress.env('DateLabel')}`;
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
        const TestRange =
            '1. 레코드 프로젝트 생성 2. 리소스 설정 3. 모듈 추가(Data Cleansing, Data Processing, DNN-Classification, Decision Tree Classifier) 4. 모듈 연결 5. 실행';
        emailModule.Email({
            TestFails: TestFails,
            EmailTitle: `Record Project Cteate Test ${Cypress.env('EmailTitle')}`,
            TestRange: TestRange,
            Screenshots: Screenshots,
        });
    });
});
