// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const dataTransfer = new DataTransfer();   // dataTransfer 객체 정의

Cypress.Commands.add('ModuleAdd', (select, target, x_coordinate, y_coordinate) => {
  cy.get(select)
    .trigger("dragstart", { dataTransfer, button: 0, force: true })
    .trigger("dragover", { clientX: 100, clientY: 100 })
  cy.get(target)
    .trigger("drop", { dataTransfer , which: 1, pageX: x_coordinate, pageY: y_coordinate, force: true })
})

// 시간 선언

function getCurrentDate(){

    const now = new Date(); // 날짜와 시간을 원하는 형식으로 변환
    const daysOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]; // 숫자 0부터 6까지 요일을 표시하는 배열

    // 한국 표준시(Asia/Seoul)로 시간대를 설정합니다.
    const options = { timeZone: 'Asia/Seoul' };
    const year = now.getFullYear();  // 년도를 얻어옵니다.
    const month = String(now.getMonth() + 1).padStart(2, "0");  // 월을 얻어옵니다. (월은 0부터 시작하므로 1을 더해줍니다.)
    const day = String(now.getDate()).padStart(2, "0");  // 일을 얻어옵니다.
    const hours = String(now.getHours()).padStart(2, "0");  // 시간을 얻어옵니다.
    const minutes = String(now.getMinutes()).padStart(2, "0");  // 분을 얻어옵니다.
    const seconds = String(now.getSeconds()).padStart(2, "0");  // 초를 얻어옵니다.
    const dayOfWeek = daysOfWeek[now.getDay()]; // 요일을 얻어옵니다.
    
        // 지정된 시간대로 날짜와 시간을 형식화합니다.
        const formattedDate = now.toLocaleString('ko-KR', options);
  
    return {  
      Date: `${year}-${month}-${day}`,
        Time: `${hours}:${minutes}:${seconds}`,
        DateLabel: `${year}${month}${day}${hours}${minutes}${seconds}`,
        Onprem: 'https://onprem.deepphi.ai/',
        Stg: 'http://st-home.deepphi.ai/',
        StgAdmin: 'https://st-admin.deepphi.ai/',
        Dev: 'https://dev-home.deepphi.ai/',
        DevAdmin: 'https://dev-admin.deepphi.ai/',
        Prod: 'https://www.deepphi.ai/home',
        ProdAdmin: 'https://admin.deepphi.ai/',
        ProdTest: 'http://st.deepphi.ai/',
        SignupID: `Signup${year}${month}${day}${hours}${minutes}${seconds}`,
        ID: 'gosl8908@deepnoid.com',
        AutoTestID: 'deeptest1@deepnoid.com',
        OnpremId: 'asdasdasd3@ruu.kr',
        Password: 'test123!',
        Nickname: `name${hours}${minutes}${seconds}`,
        ImageDatasetName: `ImageDataset${year}${month}${day}${hours}${minutes}${seconds}`,
        ImageProjectName: `ImageProejct${year}${month}${day}${hours}${minutes}${seconds}`,
        RecordDatasetName: `RecordDataset${year}${month}${day}${hours}${minutes}${seconds}`,
        RecordProjectName: `RecordProejct${year}${month}${day}${hours}${minutes}${seconds}`,
        InferenceName: `Inference${year}${month}${day}${hours}${minutes}${seconds}`,
        EmailTitle: `${year}-${month}-${day} ${dayOfWeek} Cypress 자동화 테스트 결과`,
        EmailBody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다`,
        SignupEmailBody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 회원가입 2. 로그인 3. 프로필 정보 변경 4. 비밀번호 변경 5. DISK 업그레이드`,
        DatasetUploadEmailBody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 이미지 데이터셋 업로드 2. 변환 3. 사용 용도 수정 4. 데이터셋에 파일 포함 5. 레코드 데이터셋 업로드 6. 설정 완료`,
        ImageProjectUploadEmailBody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 이미지 프로젝트 생성 2. 리소스 설정 3. 모듈 추가 4. 모듈 연결 5. 실행`,
        ImageTestProjectUploadEmailBody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 이미지 평가 프로젝트 생성 2. 실행`,
        RecordProjectCreateEmailBody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 레코드 프로젝트 생성 2. 리소스 설정 3. 모듈 추가 4. 모듈 연결 5. 실행`,
        RecordTestProjectUploadEmailBody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 레코드 평가 프로젝트 생성 2. 실행 3. 인퍼런스 서비스 생성 4. 인퍼런스 서비스 실행 5. API 호출 6. 중지 7. 인퍼런스 서비스 삭제`,
        OrganizationCreateEmailBody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 단체 삭제 2. 단체 생성 3. 맴버 초대 4. 그룹 생성 5. 그룹 멤버 초대 6. 그룹 삭제 7. 크레딧 충전 8. 단체 DISK 구독`,
        OrganizationDatasetUploadEmailBody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 단체 이미지 데이터셋 업로드 2. 변환 3. 사용 용도 수정 4. 데이터셋에 파일 포함 5. 단체 레코드 데이터셋 업로드 6. 설정 완료`,
    }
  
  }  
  Cypress.Commands.add('setDateToEnv', () => {
    const currentDate = getCurrentDate();
    Cypress.env('Onprem', currentDate.Onprem);
    Cypress.env('OnpremId', currentDate.OnpremId);
    Cypress.env('Stg', currentDate.Stg);
    Cypress.env('StgAdmin', currentDate.StgAdmin);
    Cypress.env('Dev', currentDate.Dev);
    Cypress.env('DevAdmind', currentDate.DevAdmin);
    Cypress.env('Prod', currentDate.Prod);
    Cypress.env('prodAdmin', currentDate.ProdAdmin);
    Cypress.env('ProdTest', currentDate.ProdTest);
    Cypress.env('Date', currentDate.Date);
    Cypress.env('Time', currentDate.Time);
    Cypress.env('DateLabel', currentDate.DateLabel);
    Cypress.env('SignupID', currentDate.SignupID);
    Cypress.env('ID', currentDate.ID);
    Cypress.env('AutoTestID', currentDate.AutoTestID);
    Cypress.env('Password', currentDate.Password);
    Cypress.env('Nickname', currentDate.Nickname);
    Cypress.env('RecordDatasetName', currentDate.RecordDatasetName);
    Cypress.env('RecordProjectName', currentDate.Record_ProjectName);
    Cypress.env('ImageDatasetName', currentDate.ImageDatasetName);
    Cypress.env('ImageProjectName', currentDate.ImageProjectName);
    Cypress.env('InferenceName', currentDate.InferenceName);
    Cypress.env('EmailTitle', currentDate.EmailTitle);
    Cypress.env('EmailBody', currentDate.EmailBody);
    Cypress.env('SignupEmailBody', currentDate.SignupEmailBody);
    Cypress.env('DatasetUploadEmailBody', currentDate.DatasetUploadEmailBody);
    Cypress.env('ImageProjectUploadEmailBody', currentDate.ImageProjectUploadEmailBody);
    Cypress.env('ImageTestProjectUploadEmailBody', currentDate.ImageTestProjectUploadEmailBody);
    Cypress.env('RecordProjectCreateEmailBody', currentDate.RecordProjectCreateEmailBody);
    Cypress.env('RecordTestProjectUploadEmailBody', currentDate.RecordTestProjectUploadEmailBody);
    Cypress.env('OrganizationCreateEmailBody', currentDate.OrganizationCreateEmailBody);
    Cypress.env('OrganizationDatasetUploadEmailBody', currentDate.OrganizationDatasetUploadEmailBody);
});

  Cypress.on('uncaught:exception', (err, runnable) => {
    // 에러를 무시하고 계속 진행
    return false;
  });