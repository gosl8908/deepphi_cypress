const loginModule = require('./login.js');
const adminloginModule = require('./adminlogin.js');
const emailModule = require('./email.js');
const record_apiModule = require('./record_api.js');
// 다른 모듈들도 필요한 경우 추가

module.exports = {
  loginModule,
  adminloginModule,
  emailModule,
  record_apiModule,
  // 다른 모듈들도 필요한 경우 추가
};