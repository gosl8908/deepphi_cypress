const loginModule = require('./login.module.js');
const createModule = require('./create.module.js');
const modelModule = require('./model.module.js');
const datasetModule = require('./dataset.module.js');
const apiModule = require('./api.module.js');
const constantModule = require('./constant.module.js');
const emailModule = require('./email.module.js');
const visualizationModule = require('./visualization.module.js');
const inferenceServiceModule = require('./inference.service.js');
const functionModule = require('./function.module.js');
// 다른 모듈들도 필요한 경우 추가

module.exports = {
    loginModule,
    createModule,
    modelModule,
    datasetModule,
    apiModule,
    constantModule,
    emailModule,
    visualizationModule,
    inferenceServiceModule,
    functionModule,
    // 다른 모듈들도 필요한 경우 추가
};
