"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "https://tea.qingnian8.com/api/bizhi/";
function request(config = {}) {
  let {
    url,
    method = "GET",
    data = {},
    header = {}
  } = config;
  let URL = BASE_URL + url;
  console.log("URL", URL);
  header["access-key"] = "ytw666";
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      // url: "https://tea.qingnian8.com/api/bizhi/homeBanner",
      // header: {
      // 	"access-key": "ytw666"
      // },
      url: URL,
      method,
      // 如果参数名和形参名一样，其实可以之写一个
      header,
      data,
      success: (res) => {
        if (res.data.errCode === 0) {
          resolve(res.data);
        } else if (res.data.errCode === 400) {
          common_vendor.index.showModal({
            title: "错误提示",
            content: res.data.errMsg,
            showCancel: false
          });
        } else {
          common_vendor.index.showToast({
            title: res.data.errMsg,
            icon: "none"
          });
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
exports.request = request;
