"use strict";
const utils_request = require("../utils/request.js");
function apiGetBanner() {
  return utils_request.request({ url: "homeBanner", method: "POST" });
}
function apigetDayRandom() {
  return utils_request.request({ url: "randomWall" });
}
function apigetNotice(data = {}) {
  console.log("data", data);
  return utils_request.request({ url: "wallNewsList", data });
}
function apigetClassify(data = {}) {
  return utils_request.request({
    url: "classify",
    data
  });
}
function apigetClassifyList(data = {}) {
  return utils_request.request({
    url: "wallList",
    data
  });
}
function apiSetupScore(data = {}) {
  return utils_request.request({
    url: "setupScore",
    data
  });
}
exports.apiGetBanner = apiGetBanner;
exports.apiSetupScore = apiSetupScore;
exports.apigetClassify = apigetClassify;
exports.apigetClassifyList = apigetClassifyList;
exports.apigetDayRandom = apigetDayRandom;
exports.apigetNotice = apigetNotice;
