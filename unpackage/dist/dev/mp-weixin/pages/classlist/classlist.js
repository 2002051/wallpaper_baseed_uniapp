"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classlist",
  setup(__props) {
    const classifyList = common_vendor.ref([]);
    const classId = common_vendor.ref("");
    const pageNum = common_vendor.ref(1);
    const noData = common_vendor.ref(false);
    const getClassifyList = async function(page = 1) {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      let res = await api_apis.apigetClassifyList({
        classid: !!classId.value ? classId.value : "65237031189f860b7613acf4",
        pageNum: page
      });
      if (res.data.length === 0) {
        noData.value = true;
        console.log("最后一次加载");
      }
      classifyList.value = [...classifyList.value, ...res.data];
      common_vendor.index.setStorageSync("storgClassList", classifyList.value);
      common_vendor.index.hideLoading();
    };
    common_vendor.onLoad(function(e) {
      classId.value = e["id"];
      getClassifyList();
      common_vendor.index.setNavigationBarTitle({
        title: e["name"]
      });
    });
    common_vendor.onReachBottom(function(e) {
      if (noData.value)
        return;
      console.log("触底", e);
      pageNum.value += 1;
      getClassifyList(pageNum.value);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !classifyList.value.length && !noData.value
      }, !classifyList.value.length && !noData.value ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        c: common_vendor.f(classifyList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: `/pages/preview/preview?id=${item._id}`,
            c: item._id
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/pages/classlist/classlist.vue"]]);
wx.createPage(MiniProgramPage);
