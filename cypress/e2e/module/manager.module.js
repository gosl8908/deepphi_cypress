const loginModule = require('./login.module.js');
const createModule = require('./create.module.js');
const modelModule = require('./model.module.js');
const datasetModule = require('./dataset.module.js');
const emailModule = require('./email.module.js');
const apiModule = require('./api.module.js');
const OldApiModule = require('./old.api.module.js');
const ConstantModule = require('./constant.module.js');
const visualizationCreateModule = require('./visualization-create.module.js');
const inferenceserviceModule = require('./inference-service.js');
// 다른 모듈들도 필요한 경우 추가

module.exports = {
    loginModule,
    createModule,
    modelModule,
    datasetModule,
    emailModule,
    ConstantModule,
    OldApiModule,
    apiModule,
    visualizationCreateModule,
    inferenceserviceModule,
    // 다른 모듈들도 필요한 경우 추가
};
