const loginModule = require('./login.module.js');
const createModule = require('./create.module.js');
const modelModule = require('./model.module.js');
const datasetModule = require('./dataset.module.js');
const EmailModule = require('./email.module.js');
const ApiModule = require('./api.module.js');
const OldApiModule = require('./old.api.module.js');
const ConstantModule = require('./constant.module.js');
const visualizationCreateModule = require('./visualization-create.module.js');
const InferenceServiceModule = require('./inference-service.js');
// 다른 모듈들도 필요한 경우 추가

module.exports = {
    loginModule,
    createModule,
    modelModule,
    datasetModule,
    EmailModule,
    ConstantModule,
    OldApiModule,
    ApiModule,
    visualizationCreateModule,
    InferenceServiceModule,
    // 다른 모듈들도 필요한 경우 추가
};

