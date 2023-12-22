const loginModule = require("./login.module.js");
const adminloginModule = require("./admin-login.module.js");
const emailModule = require("./email.module.js");
const record_apiModule = require("./record-api.module.js");
const image_apiModule = require("./image-api.module.js");
const imagedatasetModule = require("./image-dataset.module.js");
const recorddatasetModule = require("./record-dataset.module.js");
// 다른 모듈들도 필요한 경우 추가

module.exports = {
  loginModule,
  adminloginModule,
  emailModule,
  record_apiModule,
  image_apiModule,
  imagedatasetModule,
  recorddatasetModule,
  // 다른 모듈들도 필요한 경우 추가
};
