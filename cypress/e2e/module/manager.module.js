const loginModule = require('./login.module.js');
const createModule = require('./create.module.js');
const modelModule = require('./model.module.js');
const datasetModule = require('./dataset.module.js');
const adminLoginModule = require('./admin-login.module.js');
const sendEmailModule = require('./email.module.js');
const imageApiModule = require('./image-api.module.js');
const recordApiModule = require('./record-api.module.js');
const imageDatasetModule = require('./image-dataset.module.js');
const recordDatasetModule = require('./record-dataset.module.js');
// 다른 모듈들도 필요한 경우 추가

module.exports = {
    loginModule,
    createModule,
    modelModule,
    datasetModule,
    adminLoginModule,
    sendEmailModule,
    imageApiModule,
    recordApiModule,
    imageDatasetModule,
    recordDatasetModule,
    // 다른 모듈들도 필요한 경우 추가
};

