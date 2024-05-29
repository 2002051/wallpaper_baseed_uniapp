"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const maskState = common_vendor.ref(true);
    const value = common_vendor.ref(4.5);
    const infoPopup = common_vendor.ref(null);
    const scorePopup = common_vendor.ref(null);
    const userScore = common_vendor.ref(0);
    function clickInfo() {
      infoPopup.value.open();
    }
    function maskChange() {
      maskState.value = !maskState.value;
    }
    function clickInfoClose() {
      infoPopup.value.close();
    }
    function clickscorePopup() {
      scorePopup.value.open();
    }
    function clickscoreClose() {
      scorePopup.value.close();
    }
    function submitScore() {
      console.log("评分了，评了：", userScore.value);
    }
    function goBack() {
      common_vendor.index.navigateBack();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(5, (item, k0, i0) => {
          return {};
        }),
        b: common_vendor.o(maskChange),
        c: common_assets._imports_0$1,
        d: maskState.value
      }, maskState.value ? {
        e: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        f: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        g: common_vendor.o(goBack),
        h: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        i: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM日dd月"
        }),
        j: common_vendor.p({
          type: "info",
          size: "23"
        }),
        k: common_vendor.o(clickInfo),
        l: common_vendor.p({
          type: "star",
          size: "23"
        }),
        m: common_vendor.o(clickscorePopup),
        n: common_vendor.p({
          type: "download",
          size: "23"
        })
      } : {}, {
        o: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        p: common_vendor.o(clickInfoClose),
        q: common_vendor.o(($event) => value.value = $event),
        r: common_vendor.p({
          touchable: true,
          readonly: true,
          modelValue: value.value
        }),
        s: common_vendor.f(3, (item, k0, i0) => {
          return {};
        }),
        t: common_vendor.sr(infoPopup, "64f942e8-6", {
          "k": "infoPopup"
        }),
        v: common_vendor.p({
          type: "bottom"
        }),
        w: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        x: common_vendor.o(clickscoreClose),
        y: common_vendor.o(_ctx.onchange),
        z: common_vendor.o(($event) => userScore.value = $event),
        A: common_vendor.p({
          ["allow-half"]: true,
          modelValue: userScore.value
        }),
        B: common_vendor.t(userScore.value),
        C: common_vendor.o(submitScore),
        D: !userScore.value,
        E: common_vendor.sr(scorePopup, "64f942e8-9", {
          "k": "scorePopup"
        }),
        F: common_vendor.p({
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/pages/preview/preview.vue"]]);
wx.createPage(MiniProgramPage);
