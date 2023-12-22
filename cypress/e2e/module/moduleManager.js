const loginModule = require("./login.js");
const adminloginModule = require("./admin-login.js");
const emailModule = require("./email.js");
const record_apiModule = require("./record-api.js");
const image_apiModule = require("./image-api.js");
const imagedatasetModule = require("./image-dataset.js");
const recorddatasetModule = require("./record-dataset.js");
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
