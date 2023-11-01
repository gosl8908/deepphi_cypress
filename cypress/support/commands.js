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
import 'cypress-file-upload';


function getCurrentDate(){

    const now = new Date(); // 날짜와 시간을 원하는 형식으로 변환
    const year = now.getFullYear();  
    const month = String(now.getMonth() + 1).padStart(2, "0");  
    const day = String(now.getDate()).padStart(2, "0");  
    const hours = String(now.getHours()).padStart(2, "0");  
    const minutes = String(now.getMinutes()).padStart(2, "0");  
    const seconds = String(now.getSeconds()).padStart(2, "0");
  
    return {  
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}:${seconds}`,
      date_label: `${year}${month}${day}${hours}${minutes}${seconds}`,
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
      password: 'test123!',
      Nickname: `name${hours}${minutes}${seconds}`,
      Image_Dataset_name: `ImageDataset${year}${month}${day}${hours}${minutes}${seconds}`,
      Image_Project_name: `ImageProejct${year}${month}${day}${hours}${minutes}${seconds}`,
      Record_Dataset_name: `RecordDataset${year}${month}${day}${hours}${minutes}${seconds}`,
      Record_Project_name: `RecordProejct${year}${month}${day}${hours}${minutes}${seconds}`,
      Inference_name: `Inference${year}${month}${day}${hours}${minutes}${seconds}`
    }
  
  }  
  Cypress.Commands.add('setDateToEnv', () => {  
    const currentDate = getCurrentDate();
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
    Cypress.env('Password', currentDate.password);
    Cypress.env('Nickname', currentDate.Nickname);
    Cypress.env('RecordDatasetName', currentDate.Record_Dataset_name);
    Cypress.env('RecordProjectName', currentDate.Record_Project_name);
    Cypress.env('ImageDatasetName', currentDate.Image_Dataset_name);
    Cypress.env('ImageProjectName', currentDate.Image_Project_name);
    Cypress.env('InferenceName', currentDate.Image_Project_name);
  });