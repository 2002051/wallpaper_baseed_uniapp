"use strict";
const common_vendor = require("../common/vendor.js");
let SYSTEM = common_vendor.index.getSystemInfoSync();
const getStatusBarHeight = () => SYSTEM.statusBarHeight || 15;
const getTitleBarHeight = () => {
  if (common_vendor.index.getMenuButtonBoundingClientRect) {
    let {
      top,
      height
    } = common_vendor.index.getMenuButtonBoundingClientRect();
    let titleBarHeight = height + (top - getStatusBarHeight()) * 2;
    return titleBarHeight;
  } else {
    return 40;
  }
};
const getnavBarHeight = () => getStatusBarHeight() + getTitleBarHeight();
const getLeftIcon = () => {
  return 0;
};
exports.getLeftIcon = getLeftIcon;
exports.getStatusBarHeight = getStatusBarHeight;
exports.getTitleBarHeight = getTitleBarHeight;
exports.getnavBarHeight = getnavBarHeight;
