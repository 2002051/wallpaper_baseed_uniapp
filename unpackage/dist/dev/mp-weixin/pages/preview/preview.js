"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
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
    common_vendor.ref(4.5);
    const infoPopup = common_vendor.ref(null);
    const scorePopup = common_vendor.ref(null);
    const userScore = common_vendor.ref(0);
    const classList = common_vendor.ref([]);
    const currentId = common_vendor.ref(null);
    const currentIndex = common_vendor.ref(0);
    const storgClassList = common_vendor.index.getStorageSync("storgClassList") || [];
    const readImgs = common_vendor.ref([]);
    const currentInfo = common_vendor.ref(null);
    const isScore = common_vendor.ref(false);
    classList.value = storgClassList.map((x) => {
      return {
        ...x,
        picurl: x.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
    console.log("storgClassList", classList.value);
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
      if (currentInfo.value.userScore) {
        isScore.value = true;
        userScore.value = currentInfo.value.userScore;
      }
      scorePopup.value.open();
    }
    function clickscoreClose() {
      scorePopup.value.close();
      isScore.value = false;
      userScore.value = 0;
    }
    async function submitScore() {
      common_vendor.index.showLoading({
        title: "提交评分中..."
      });
      let {
        classid,
        _id: wallId
      } = currentInfo.value;
      let res = await api_apis.apiSetupScore({
        classid,
        wallId,
        userScore: userScore.value
      });
      if (res.errCode === 0) {
        common_vendor.index.showToast({
          title: "评分成功"
        });
        common_vendor.index.hideLoading();
        classList.value[currentIndex.value].userScore = userScore.value;
        common_vendor.index.setStorageSync("storgClassList", classList.value);
        userScore.value = 0;
        scorePopup.value.close();
      }
    }
    function goBack() {
      common_vendor.index.navigateBack();
    }
    common_vendor.onLoad(function(e) {
      currentId.value = e.id;
      let index = classList.value.findIndex((item) => {
        return item._id == currentId.value;
      });
      currentIndex.value = index;
      currentInfo.value = classList.value[currentIndex.value];
      readImgs.value.push(
        index <= 0 ? classList.value.length - 1 : index - 1,
        index,
        index >= classList.value.length - 1 ? 0 : index + 1
      );
    });
    function doChange(e) {
      currentIndex.value = e.detail.current;
      console.log("e.detail.current", e.detail.current, classList.length - 1);
      currentInfo.value = classList.value[currentIndex.value];
      readImgs.value.push(
        e.detail.current <= 0 ? classList.value.length - 1 : e.detail.current - 1,
        e.detail.current,
        e.detail.current >= classList.value.length - 1 ? 0 : e.detail.current + 1
      );
    }
    function clickDownLoad() {
      common_vendor.index.getImageInfo({
        src: currentInfo.value.picurl,
        success: (res) => {
          common_vendor.index.showLoading({
            title: "下载中",
            mask: true
          });
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: res.path,
            success: (x) => {
              console.log("x!!!!!!", x);
            },
            fail: (err) => {
              console.log(err);
              if (err.errMsg === "saveImageToPhotosAlbum:fail cancel") {
                common_vendor.index.showToast({
                  title: "保存失败，请点击重新下载",
                  icon: "none"
                });
                return;
              }
              common_vendor.index.showModal({
                title: "提示",
                content: "需要授权保存相册",
                success: (res2) => {
                  if (res2.confirm) {
                    common_vendor.index.openSetting({
                      success: (setting) => {
                        console.log(setting);
                        if (setting.authSetting["scope.writePhotosAlbum"]) {
                          common_vendor.index.showToast({
                            title: "授权成功",
                            icon: "none"
                          });
                        } else {
                          common_vendor.index.showToast({
                            title: "获取授权失败",
                            icon: "none"
                          });
                        }
                      }
                    });
                  }
                }
              });
            },
            complete() {
              common_vendor.index.hideLoading();
            }
          });
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(classList.value, (item, index, i0) => {
          return common_vendor.e({
            a: readImgs.value.includes(index)
          }, readImgs.value.includes(index) ? {
            b: common_vendor.o(maskChange, item._id),
            c: item.picurl
          } : {}, {
            d: item._id
          });
        }),
        b: currentIndex.value,
        c: common_vendor.o(doChange),
        d: maskState.value
      }, maskState.value ? {
        e: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        f: common_vendor.unref(utils_system.getStatusBarHeight)() + "px",
        g: common_vendor.o(goBack),
        h: common_vendor.t(currentIndex.value + 1),
        i: common_vendor.t(classList.value.length),
        j: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        k: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM日dd月"
        }),
        l: common_vendor.p({
          type: "info",
          size: "23"
        }),
        m: common_vendor.o(clickInfo),
        n: common_vendor.p({
          type: "star",
          size: "23"
        }),
        o: common_vendor.t(currentInfo.value.score),
        p: common_vendor.o(clickscorePopup),
        q: common_vendor.p({
          type: "download",
          size: "23"
        }),
        r: common_vendor.o(clickDownLoad)
      } : {}, {
        s: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        t: common_vendor.o(clickInfoClose),
        v: common_vendor.t(currentInfo.value._id),
        w: common_vendor.t(currentInfo.value.nickname),
        x: common_vendor.o(($event) => currentInfo.value.score = $event),
        y: common_vendor.p({
          touchable: true,
          readonly: true,
          modelValue: currentInfo.value.score
        }),
        z: common_vendor.t(currentInfo.value.score),
        A: common_vendor.t(currentInfo.value.description),
        B: common_vendor.f(currentInfo.value.tabs, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab)
          };
        }),
        C: common_vendor.sr(infoPopup, "64f942e8-6", {
          "k": "infoPopup"
        }),
        D: common_vendor.p({
          type: "bottom"
        }),
        E: common_vendor.t(isScore.value ? "已评分..." : "壁纸评分"),
        F: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        G: common_vendor.o(clickscoreClose),
        H: common_vendor.o(_ctx.onchange),
        I: common_vendor.o(($event) => userScore.value = $event),
        J: common_vendor.p({
          ["allow-half"]: true,
          modelValue: userScore.value
        }),
        K: common_vendor.t(userScore.value),
        L: !isScore.value
      }, !isScore.value ? {
        M: common_vendor.o(submitScore),
        N: !userScore.value
      } : {}, {
        O: common_vendor.sr(scorePopup, "64f942e8-9", {
          "k": "scorePopup"
        }),
        P: common_vendor.p({
          ["is-mask-click"]: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/pages/preview/preview.vue"]]);
wx.createPage(MiniProgramPage);
