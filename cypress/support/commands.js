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
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}:${seconds}`,
      date_label: `${year}${month}${day}${hours}${minutes}${seconds}`,
      onprem: 'https://onprem.deepphi.ai/',
      stg: 'http://st-home.deepphi.ai/',
      stgadmin: 'https://st-admin.deepphi.ai/',
      dev: 'https://dev-home.deepphi.ai/',
      devadmin: 'https://dev-admin.deepphi.ai/',
      Prod: 'http://deepphi.ai/',
      prodadmin: 'https://admin.deepphi.ai/',
      prodtest: 'http://st.deepphi.ai/',
      signup_id: `Signup${year}${month}${day}${hours}${minutes}${seconds}`,
      id: 'gosl8908@deepnoid.com',
      auto_test_id: 'deeptest1@deepnoid.com',
      onprem_id: 'asdasdasd3@ruu.kr',
      password: 'test123!',
      Nickname: `name${hours}${minutes}${seconds}`,
      Image_Dataset_name: `ImageDataset${year}${month}${day}${hours}${minutes}${seconds}`,
      Image_Project_name: `ImageProejct${year}${month}${day}${hours}${minutes}${seconds}`,
      Record_Dataset_name: `RecordDataset${year}${month}${day}${hours}${minutes}${seconds}`,
      Record_Project_name: `RecordProejct${year}${month}${day}${hours}${minutes}${seconds}`,
      Inference_name: `Inference${year}${month}${day}${hours}${minutes}${seconds}`,
      emailtitle: `${year}-${month}-${day} ${dayOfWeek} Cypress 자동화 테스트 결과`,
      emailbody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다`,
      SignUp_emailbody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 회원가입 2. 로그인 3. 프로필 정보 변경 4. 비밀번호 변경 5. DISK 업그레이드 6. 이미지 데이터셋 업로드 7. 변환 8. 사용 용도 수정 9. 데이터셋에 파일 포함 10. 레코드 데이터셋 업로드 11. 설정 완료`,
      Dataset_Upload_emailbody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 이미지 데이터셋 업로드 2. 변환 3. 사용 용도 수정 4. 데이터셋에 파일 포함 5. 레코드 데이터셋 업로드 6. 설정 완료`,
      image_Project_Upload_emailbody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 이미지 프로젝트 생성 2. 리소스 설정 3. 모듈 추가 4. 모듈 연결 5. 실행`,
      image_Test_Project_Upload_emailbody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 이미지 평가 프로젝트 생성 2. 실행`,
      Record_Project_Create_emailbody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 레코드 프로젝트 생성 2. 리소스 설정 3. 모듈 추가 4. 모듈 연결 5. 실행`,
      Record_Test_Project_Upload_emailbody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 레코드 평가 프로젝트 생성 2. 실행 3. 인퍼런스 서비스 생성 4. 인퍼런스 서비스 실행 5. API 호출 6. 중지 7. 인퍼런스 서비스 삭제`,
      Organization_Create_emailbody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 단체 삭제 2. 단체 생성 3. 맴버 초대 4. 그룹 생성 5. 그룹 멤버 초대 6. 그룹 삭제 7. 크레딧 충전 8. 단체 DISK 구독`,
      Organization_Dataset_Upload_emailbody: `Cypress 자동화 테스트 스위트가 성공적으로 완료되었습니다\n 테스트 실행 시간 : ${year}-${month}-${day} ${dayOfWeek} ${hours}:${minutes}:${seconds}\n 테스트 범위 : 1. 단체 이미지 데이터셋 업로드 2. 변환 3. 사용 용도 수정 4. 데이터셋에 파일 포함 5. 단체 레코드 데이터셋 업로드 6. 설정 완료`,
    }
  
  }  
  Cypress.Commands.add('setDateToEnv', () => {  
    const currentDate = getCurrentDate();
    Cypress.env('onprem', currentDate.onprem);
    Cypress.env('onprem_id', currentDate.onprem_id);
    Cypress.env('stg', currentDate.stg);
    Cypress.env('stgadmin', currentDate.stgadmin);
    Cypress.env('dev', currentDate.dev);
    Cypress.env('devadmind', currentDate.devadmin);
    Cypress.env('prod', currentDate.Prod);
    Cypress.env('prodadmin', currentDate.prodadmin);
    Cypress.env('prodtest', currentDate.prodtest);
    Cypress.env('date', currentDate.date);
    Cypress.env('time', currentDate.time);
    Cypress.env('date_label', currentDate.date_label);
    Cypress.env('signup_id', currentDate.signup_id);
    Cypress.env('id', currentDate.id);
    Cypress.env('auto_test_id', currentDate.auto_test_id);
    Cypress.env('password', currentDate.password);
    Cypress.env('Nickname', currentDate.Nickname);
    Cypress.env('RecordDatasetName', currentDate.Record_Dataset_name);
    Cypress.env('RecordProjectName', currentDate.Record_Project_name);
    Cypress.env('ImageDatasetName', currentDate.Image_Dataset_name);
    Cypress.env('ImageProjectName', currentDate.Image_Project_name);
    Cypress.env('InferenceName', currentDate.Image_Project_name);
    Cypress.env('emailtitle', currentDate.emailtitle);
    Cypress.env('emailbody', currentDate.emailbody);
    Cypress.env('SignUp_emailbody', currentDate.SignUp_emailbody);
    Cypress.env('Dataset_Upload_emailbody', currentDate.Dataset_Upload_emailbody);
    Cypress.env('image_Project_Upload_emailbody', currentDate.image_Project_Upload_emailbody);
    Cypress.env('image_Test_Project_Upload_emailbody', currentDate.image_Test_Project_Upload_emailbody);
    Cypress.env('Record_Project_Create_emailbody', currentDate.Record_Project_Create_emailbody);
    Cypress.env('Record_Test_Project_Upload_emailbody', currentDate.Record_Test_Project_Upload_emailbody);
    Cypress.env('Organization_Create_emailbody', currentDate.Organization_Create_emailbody);
    Cypress.env('Organization_Dataset_Upload_emailbody', currentDate.Organization_Dataset_Upload_emailbody);
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    // 에러를 무시하고 계속 진행
    return false;
  });