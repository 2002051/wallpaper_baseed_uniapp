"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_common_title2 = common_vendor.resolveComponent("common-title");
  const _easycom_theme_item2 = common_vendor.resolveComponent("theme-item");
  (_easycom_custom_nav_bar2 + _easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_common_title2 + _easycom_theme_item2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_common_title = () => "../../components/common-title/common-title.js";
const _easycom_theme_item = () => "../../components/theme-item/theme-item.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_uni_icons + _easycom_uni_dateformat + _easycom_common_title + _easycom_theme_item)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const bannerList = common_vendor.ref([]);
    const randomList = common_vendor.ref([]);
    const noticeList = common_vendor.ref([]);
    const getBanner = async function() {
      let res = await common_vendor.index.request({
        // 阻塞等待网络请求返回结果
        url: "https://tea.qingnian8.com/api/bizhi/homeBanner",
        header: {
          "access-key": "ytw666"
        }
      });
      if (res.data.errCode === 0) {
        bannerList.value = res.data.data;
      }
    };
    getBanner();
    const getDay = async function() {
      let res = await common_vendor.index.request({
        url: "	https://tea.qingnian8.com/api/bizhi/randomWall",
        header: {
          "access-key": "ytw666"
        }
      });
      randomList.value = res.data.data;
    };
    getDay();
    const getNotice = async function() {
      let res = await common_vendor.index.request({
        // 阻塞等待网络请求返回结果
        url: "https://tea.qingnian8.com/api/bizhi/wallNewsList",
        header: {
          "access-key": "ytw666"
        },
        data: {
          "id": "653507c6466d417a3718e94b"
        }
      });
      if (res.data.errCode === 0) {
        noticeList.value = res.data.data;
      }
      console.log("res", res);
    };
    getNotice();
    function gotoPreview() {
      common_vendor.index.navigateTo({
        url: "/pages/preview/preview"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "推荐"
        }),
        b: common_vendor.f(bannerList.value, (item, k0, i0) => {
          return {
            a: item.picurl,
            b: item._id
          };
        }),
        c: common_vendor.p({
          type: "sound-filled",
          size: "20"
        }),
        d: common_vendor.f(noticeList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item._id
          };
        }),
        e: common_vendor.p({
          type: "right",
          size: "16",
          color: "#333"
        }),
        f: common_vendor.p({
          type: "calendar",
          size: "20",
          color: "$uni-color-theme"
        }),
        g: common_vendor.p({
          date: Date.now(),
          format: "dd号"
        }),
        h: common_vendor.f(randomList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: common_vendor.o(gotoPreview, item._id),
            c: item._id
          };
        }),
        i: common_vendor.f(8, (item, k0, i0) => {
          return {
            a: "1cf27b2a-7-" + i0
          };
        }),
        j: common_vendor.p({
          isMore: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
