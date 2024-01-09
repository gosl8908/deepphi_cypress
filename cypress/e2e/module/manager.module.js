const loginModule = require('./login.module.js');
const createModule = require('./create.module.js');
const modelModule = require('./model.module.js');
const datasetModule = require('./dataset.module.js');
const sendEmailModule = require('./email.module.js');
const ApiModule = require('./api.module.js');
const DatasetUploadModule = require('./dataset.upload.module.js');
const DownloadFlieModule = require('./download.flie.module.js');
// 다른 모듈들도 필요한 경우 추가

module.exports = {
    loginModule,
    createModule,
    modelModule,
    datasetModule,
    sendEmailModule,
    ApiModule,
    DatasetUploadModule,
    DownloadFlieModule,
    // 다른 모듈들도 필요한 경우 추가
};

