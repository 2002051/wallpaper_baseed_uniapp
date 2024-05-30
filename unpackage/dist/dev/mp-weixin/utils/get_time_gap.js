"use strict";
function calculateTimeAgo(timestamp) {
  const now = /* @__PURE__ */ new Date();
  const targetDate = new Date(timestamp);
  const diff = now - targetDate;
  const secondsAgo = Math.floor(diff / 1e3);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const monthsAgo = Math.floor(daysAgo / 30);
  if (secondsAgo < 60) {
    return `${secondsAgo}秒前`;
  } else if (minutesAgo < 60) {
    return `${minutesAgo}分钟前`;
  } else if (hoursAgo < 24) {
    return `${hoursAgo}小时前`;
  } else if (daysAgo < 30) {
    return `${daysAgo}天前`;
  } else if (monthsAgo < 3) {
    return `${monthsAgo}个月前`;
  } else {
    return `超过三个月前`;
  }
}
exports.calculateTimeAgo = calculateTimeAgo;
