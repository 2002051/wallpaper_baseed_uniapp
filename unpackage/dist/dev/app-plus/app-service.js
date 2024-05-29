if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$g = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$a], ["__scopeId", "data-v-d31e1c47"], ["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  let SYSTEM = uni.getSystemInfoSync();
  const getStatusBarHeight = () => SYSTEM.statusBarHeight || 15;
  const getTitleBarHeight = () => {
    if (uni.getMenuButtonBoundingClientRect) {
      let {
        top,
        height
      } = uni.getMenuButtonBoundingClientRect();
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
  const _sfc_main$f = {
    __name: "custom-nav-bar",
    props: {
      title: {
        type: String,
        default: "壁纸"
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "layout" }, [
          vue.createElementVNode("view", { class: "navbar" }, [
            vue.createElementVNode(
              "view",
              {
                class: "stateBar",
                style: vue.normalizeStyle({ height: vue.unref(getStatusBarHeight)() + "px" })
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode(
              "view",
              {
                class: "titleBar",
                style: vue.normalizeStyle({ height: vue.unref(getTitleBarHeight)() + "px", marginLeft: vue.unref(getLeftIcon)() + "px" })
              },
              [
                vue.createElementVNode(
                  "view",
                  { class: "title" },
                  vue.toDisplayString(__props.title),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "search" }, [
                  vue.createVNode(_component_uni_icons, {
                    class: "icon",
                    type: "search",
                    color: "#888",
                    size: "18"
                  }),
                  vue.createElementVNode("text", { class: "text" }, "搜索")
                ])
              ],
              4
              /* STYLE */
            )
          ]),
          vue.createCommentVNode(" {height:statusBarHeight+titelBarheight+'px'} "),
          vue.createElementVNode(
            "view",
            {
              class: "fill",
              style: vue.normalizeStyle({ height: vue.unref(getnavBarHeight)() + "px" })
            },
            null,
            4
            /* STYLE */
          )
        ]);
      };
    }
  };
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-412fc155"], ["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/components/custom-nav-bar/custom-nav-bar.vue"]]);
  function pad(str, length = 2) {
    str += "";
    while (str.length < length) {
      str = "0" + str;
    }
    return str.slice(-length);
  }
  const parser = {
    yyyy: (dateObj) => {
      return pad(dateObj.year, 4);
    },
    yy: (dateObj) => {
      return pad(dateObj.year);
    },
    MM: (dateObj) => {
      return pad(dateObj.month);
    },
    M: (dateObj) => {
      return dateObj.month;
    },
    dd: (dateObj) => {
      return pad(dateObj.day);
    },
    d: (dateObj) => {
      return dateObj.day;
    },
    hh: (dateObj) => {
      return pad(dateObj.hour);
    },
    h: (dateObj) => {
      return dateObj.hour;
    },
    mm: (dateObj) => {
      return pad(dateObj.minute);
    },
    m: (dateObj) => {
      return dateObj.minute;
    },
    ss: (dateObj) => {
      return pad(dateObj.second);
    },
    s: (dateObj) => {
      return dateObj.second;
    },
    SSS: (dateObj) => {
      return pad(dateObj.millisecond, 3);
    },
    S: (dateObj) => {
      return dateObj.millisecond;
    }
  };
  function getDate(time) {
    if (time instanceof Date) {
      return time;
    }
    switch (typeof time) {
      case "string": {
        if (time.indexOf("T") > -1) {
          return new Date(time);
        }
        return new Date(time.replace(/-/g, "/"));
      }
      default:
        return new Date(time);
    }
  }
  function formatDate(date, format = "yyyy/MM/dd hh:mm:ss") {
    if (!date && date !== 0) {
      return "";
    }
    date = getDate(date);
    const dateObj = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
      millisecond: date.getMilliseconds()
    };
    const tokenRegExp = /yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s|SSS|SS|S/;
    let flag = true;
    let result = format;
    while (flag) {
      flag = false;
      result = result.replace(tokenRegExp, function(matched) {
        flag = true;
        return parser[matched](dateObj);
      });
    }
    return result;
  }
  function friendlyDate(time, {
    locale = "zh",
    threshold = [6e4, 36e5],
    format = "yyyy/MM/dd hh:mm:ss"
  }) {
    if (time === "-") {
      return time;
    }
    if (!time && time !== 0) {
      return "";
    }
    const localeText = {
      zh: {
        year: "年",
        month: "月",
        day: "天",
        hour: "小时",
        minute: "分钟",
        second: "秒",
        ago: "前",
        later: "后",
        justNow: "刚刚",
        soon: "马上",
        template: "{num}{unit}{suffix}"
      },
      en: {
        year: "year",
        month: "month",
        day: "day",
        hour: "hour",
        minute: "minute",
        second: "second",
        ago: "ago",
        later: "later",
        justNow: "just now",
        soon: "soon",
        template: "{num} {unit} {suffix}"
      }
    };
    const text = localeText[locale] || localeText.zh;
    let date = getDate(time);
    let ms = date.getTime() - Date.now();
    let absMs = Math.abs(ms);
    if (absMs < threshold[0]) {
      return ms < 0 ? text.justNow : text.soon;
    }
    if (absMs >= threshold[1]) {
      return formatDate(date, format);
    }
    let num;
    let unit;
    let suffix = text.later;
    if (ms < 0) {
      suffix = text.ago;
      ms = -ms;
    }
    const seconds = Math.floor(ms / 1e3);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    switch (true) {
      case years > 0:
        num = years;
        unit = text.year;
        break;
      case months > 0:
        num = months;
        unit = text.month;
        break;
      case days > 0:
        num = days;
        unit = text.day;
        break;
      case hours > 0:
        num = hours;
        unit = text.hour;
        break;
      case minutes > 0:
        num = minutes;
        unit = text.minute;
        break;
      default:
        num = seconds;
        unit = text.second;
        break;
    }
    if (locale === "en") {
      if (num === 1) {
        num = "a";
      } else {
        unit += "s";
      }
    }
    return text.template.replace(/{\s*num\s*}/g, num + "").replace(/{\s*unit\s*}/g, unit).replace(
      /{\s*suffix\s*}/g,
      suffix
    );
  }
  const _sfc_main$e = {
    name: "uniDateformat",
    props: {
      date: {
        type: [Object, String, Number],
        default() {
          return "-";
        }
      },
      locale: {
        type: String,
        default: "zh"
      },
      threshold: {
        type: Array,
        default() {
          return [0, 0];
        }
      },
      format: {
        type: String,
        default: "yyyy/MM/dd hh:mm:ss"
      },
      // refreshRate使用不当可能导致性能问题，谨慎使用
      refreshRate: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        refreshMark: 0
      };
    },
    computed: {
      dateShow() {
        this.refreshMark;
        return friendlyDate(this.date, {
          locale: this.locale,
          threshold: this.threshold,
          format: this.format
        });
      }
    },
    watch: {
      refreshRate: {
        handler() {
          this.setAutoRefresh();
        },
        immediate: true
      }
    },
    methods: {
      refresh() {
        this.refreshMark++;
      },
      setAutoRefresh() {
        clearInterval(this.refreshInterval);
        if (this.refreshRate) {
          this.refreshInterval = setInterval(() => {
            this.refresh();
          }, parseInt(this.refreshRate));
        }
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      null,
      vue.toDisplayString($options.dateShow),
      1
      /* TEXT */
    );
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$9], ["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.vue"]]);
  const _sfc_main$d = {};
  function _sfc_render$8(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "common-title" }, [
      vue.createElementVNode("view", { class: "name" }, [
        vue.renderSlot(_ctx.$slots, "name", {}, () => [
          vue.createCommentVNode(" 插槽标题 ")
        ], true)
      ]),
      vue.createElementVNode("view", { class: "custom" }, [
        vue.renderSlot(_ctx.$slots, "custom", {}, () => [
          vue.createCommentVNode(" 左侧内容 ")
        ], true)
      ])
    ]);
  }
  const __easycom_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$8], ["__scopeId", "data-v-43a5d97b"], ["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/components/common-title/common-title.vue"]]);
  const _imports_0$2 = "/assets/classify1.810018b6.jpg";
  const _imports_1 = "/assets/more.14a1a72b.jpg";
  const _sfc_main$c = {
    __name: "theme-item",
    props: {
      isMore: { type: Boolean, default: false }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "themeItem" }, [
          !__props.isMore ? (vue.openBlock(), vue.createElementBlock("navigator", {
            key: 0,
            url: "/pages/classlist/classlist",
            "open-type": "reLaunch",
            class: "box"
          }, [
            vue.createElementVNode("image", {
              src: _imports_0$2,
              mode: "aspectFill",
              class: "pic"
            }),
            vue.createElementVNode("view", { class: "mask" }, " 明星美女 "),
            vue.createElementVNode("view", { class: "tab" }, " 3天前更新 ")
          ])) : vue.createCommentVNode("v-if", true),
          __props.isMore ? (vue.openBlock(), vue.createElementBlock("navigator", {
            key: 1,
            url: "/pages/classlist/classlist",
            class: "box more"
          }, [
            vue.createElementVNode("image", {
              src: _imports_1,
              mode: "aspectFill",
              class: "pic"
            }),
            vue.createElementVNode("view", { class: "mask" }, [
              vue.createVNode(_component_uni_icons, {
                type: "more-filled",
                size: "34",
                color: "#fff"
              }),
              vue.createElementVNode("view", { class: "text" }, " 更多 ")
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  };
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-f4eafbca"], ["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/components/theme-item/theme-item.vue"]]);
  const _sfc_main$b = {
    __name: "index",
    setup(__props) {
      const bannerList = vue.ref([]);
      const randomList = vue.ref([]);
      const getBanner = async function() {
        let res = await uni.request({
          // 阻塞等待网络请求返回结果
          url: "https://tea.qingnian8.com/api/bizhi/homeBanner",
          header: {
            "access-key": "ytw666"
          }
        });
        if (res.data.errCode === 0) {
          bannerList.value = res.data.data;
        }
        formatAppLog("log", "at pages/index/index.vue:100", "bannerList", bannerList.value);
      };
      getBanner();
      const getDay = async function() {
        let res = await uni.request({
          url: "	https://tea.qingnian8.com/api/bizhi/randomWall",
          header: {
            "access-key": "ytw666"
          }
        });
        randomList.value = res.data.data;
        formatAppLog("log", "at pages/index/index.vue:115", "randomList.value", randomList.value);
      };
      getDay();
      function gotoPreview() {
        uni.navigateTo({
          url: "/pages/preview/preview"
        });
      }
      return (_ctx, _cache) => {
        const _component_custom_nav_bar = resolveEasycom(vue.resolveDynamicComponent("custom-nav-bar"), __easycom_0$2);
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
        const _component_uni_dateformat = resolveEasycom(vue.resolveDynamicComponent("uni-dateformat"), __easycom_1$1);
        const _component_common_title = resolveEasycom(vue.resolveDynamicComponent("common-title"), __easycom_3$1);
        const _component_theme_item = resolveEasycom(vue.resolveDynamicComponent("theme-item"), __easycom_1);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "homeLayout pageBg" }, [
              vue.createVNode(_component_custom_nav_bar, { title: "推荐" }),
              vue.createElementVNode("view", { class: "banner" }, [
                vue.createElementVNode("swiper", {
                  circular: "",
                  "indicator-dots": "",
                  "indicator-color": "rgba(0, 0, 0, 0.5)",
                  "indicator-active-color": "rgba(255, 255, 255, 0.5)"
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(bannerList.value, (item) => {
                      return vue.openBlock(), vue.createElementBlock("swiper-item", { autoplay: "" }, [
                        vue.createCommentVNode(' <image :src="`../../static/images/banner${item}.jpg`" mode="aspectFill"></image> '),
                        vue.createElementVNode("image", {
                          src: item.picurl,
                          mode: "aspectFill"
                        }, null, 8, ["src"])
                      ]);
                    }),
                    256
                    /* UNKEYED_FRAGMENT */
                  ))
                ])
              ])
            ]),
            vue.createCommentVNode(" 公告区域 "),
            vue.createElementVNode("view", { class: "notice" }, [
              vue.createElementVNode("view", { class: "left" }, [
                vue.createCommentVNode(' <uni-icons type="sound-filled" size="20" color="#28B389"></uni-icons> '),
                vue.createVNode(_component_uni_icons, {
                  type: "sound-filled",
                  size: "20"
                }),
                vue.createElementVNode("text", { class: "text" }, "公告")
              ]),
              vue.createElementVNode("view", { class: "center" }, [
                vue.createElementVNode("swiper", {
                  vertical: "",
                  autoplay: "",
                  interval: "1500",
                  duration: "300",
                  circular: ""
                }, [
                  (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(5, (item) => {
                      return vue.createElementVNode("swiper-item", null, [
                        vue.createElementVNode("navigator", { url: "/pages/notice/noticedetail" }, " overflow: hidden; 是一种 CSS 样式，用于控制容器中溢出内容的显示方式。当容器中的内容超出容器尺寸时，设置 overflow: hidden; 会将超出部分隐藏起来，不显示在页面上，而是被裁剪掉。这样可以保持页面的整洁和美观，避免溢出内容影响布局和排版。")
                      ]);
                    }),
                    64
                    /* STABLE_FRAGMENT */
                  ))
                ])
              ]),
              vue.createElementVNode("view", { class: "right" }, [
                vue.createVNode(_component_uni_icons, {
                  type: "right",
                  size: "16",
                  color: "#333"
                })
              ])
            ]),
            vue.createCommentVNode(" 每日精选区域 "),
            vue.createElementVNode("view", { class: "select" }, [
              vue.createVNode(_component_common_title, null, {
                name: vue.withCtx(() => [
                  vue.createTextVNode("每日推荐")
                ]),
                custom: vue.withCtx(() => [
                  vue.createElementVNode("view", { class: "date" }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "calendar",
                      size: "20",
                      color: "$uni-color-theme"
                    }),
                    vue.createElementVNode("view", { class: "text" }, [
                      vue.createVNode(_component_uni_dateformat, {
                        date: Date.now(),
                        format: "dd号"
                      }, null, 8, ["date"])
                    ])
                  ])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createElementVNode("view", { class: "content" }, [
                vue.createElementVNode("scroll-view", { "scroll-x": "" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(randomList.value, (item) => {
                      return vue.openBlock(), vue.createElementBlock("view", { class: "box" }, [
                        vue.createCommentVNode(' <navigator url="/pages/preview/preview"></navigator> '),
                        vue.createElementVNode("image", {
                          src: item.smallPicurl,
                          mode: "aspectFill",
                          onClick: gotoPreview
                        }, null, 8, ["src"])
                      ]);
                    }),
                    256
                    /* UNKEYED_FRAGMENT */
                  ))
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "theme" }, [
              vue.createVNode(_component_common_title, null, {
                name: vue.withCtx(() => [
                  vue.createTextVNode("专题精选")
                ]),
                custom: vue.withCtx(() => [
                  vue.createElementVNode("navigator", {
                    url: "",
                    class: "more"
                  }, "More+")
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createElementVNode("view", { class: "content" }, [
                (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(8, (item) => {
                    return vue.createVNode(_component_theme_item, null, {
                      default: vue.withCtx(() => [
                        vue.createCommentVNode(" 专题精选组件 ")
                      ]),
                      _: 1
                      /* STABLE */
                    });
                  }),
                  64
                  /* STABLE_FRAGMENT */
                )),
                vue.createVNode(_component_theme_item, { isMore: true })
              ])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/pages/index/index.vue"]]);
  const _sfc_main$a = {};
  function _sfc_render$7(_ctx, _cache) {
    const _component_custom_nav_bar = resolveEasycom(vue.resolveDynamicComponent("custom-nav-bar"), __easycom_0$2);
    const _component_theme_item = resolveEasycom(vue.resolveDynamicComponent("theme-item"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "classlayout" }, [
      vue.createVNode(_component_custom_nav_bar, { title: "分类" }),
      vue.createElementVNode("view", { class: "classify" }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(15, (item) => {
            return vue.createVNode(_component_theme_item);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesClassifyClassify = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$7], ["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/pages/classify/classify.vue"]]);
  const _sfc_main$9 = {
    __name: "user",
    setup(__props) {
      function clickcontent() {
        uni.makePhoneCall({
          phoneNumber: "17879765153"
        });
      }
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "userLayout pageBg" }, [
          vue.createElementVNode("view", { class: "userInfo" }, [
            vue.createElementVNode(
              "view",
              {
                class: "fill",
                style: vue.normalizeStyle({ height: vue.unref(getnavBarHeight)() + "px" })
              },
              null,
              4
              /* STYLE */
            ),
            vue.createElementVNode("view", { class: "avator" }, [
              vue.createCommentVNode(" 头像区域 "),
              vue.createElementVNode("image", {
                src: "/static/logo.png",
                mode: "aspectFill"
              })
            ]),
            vue.createElementVNode("view", { class: "ip" }, " 100.100.222.222 "),
            vue.createElementVNode("view", { class: "address" }, " 来自于：浙江 ")
          ]),
          vue.createElementVNode("view", { class: "section" }, [
            vue.createElementVNode("view", { class: "list" }, [
              vue.createElementVNode("navigator", {
                url: "/pages/classify/classify",
                "open-type": "reLaunch"
              }, [
                vue.createElementVNode("view", { class: "row" }, [
                  vue.createElementVNode("view", { class: "left" }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "download-filled",
                      size: "20"
                    }),
                    vue.createElementVNode("view", { class: "text" }, "我的下载")
                  ]),
                  vue.createElementVNode("view", { class: "right" }, [
                    vue.createElementVNode("view", { class: "text" }, "33"),
                    vue.createVNode(_component_uni_icons, {
                      type: "right",
                      size: "15",
                      color: "#aaa"
                    })
                  ])
                ])
              ]),
              vue.createElementVNode("navigator", {
                url: "/pages/classify/classify",
                "open-type": "reLaunch"
              }, [
                vue.createElementVNode("view", { class: "row" }, [
                  vue.createElementVNode("view", { class: "left" }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "star-filled",
                      size: "20"
                    }),
                    vue.createElementVNode("view", { class: "text" }, "我的收藏")
                  ]),
                  vue.createElementVNode("view", { class: "right" }, [
                    vue.createElementVNode("view", { class: "text" }, "33"),
                    vue.createVNode(_component_uni_icons, {
                      type: "right",
                      size: "15",
                      color: "#aaa"
                    })
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "row" }, [
                vue.createElementVNode("view", { class: "left" }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "phone-filled",
                    size: "20"
                  }),
                  vue.createElementVNode("view", { class: "text" }, "联系客服")
                ]),
                vue.createCommentVNode(" 环境不是小程序端的时候就会执行下面的编译内容 "),
                vue.createElementVNode("button", { onClick: clickcontent }, "拨打电话"),
                vue.createElementVNode("view", { class: "right" }, [
                  vue.createElementVNode("view", { class: "text" }),
                  vue.createVNode(_component_uni_icons, {
                    type: "right",
                    size: "15",
                    color: "#aaa"
                  })
                ])
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "section" }, [
            vue.createElementVNode("view", { class: "list" }, [
              vue.createElementVNode("view", { class: "row" }, [
                vue.createElementVNode("view", { class: "left" }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "notification-filled",
                    size: "20"
                  }),
                  vue.createElementVNode("view", { class: "text" }, "订阅更新")
                ]),
                vue.createElementVNode("view", { class: "right" }, [
                  vue.createElementVNode("view", { class: "text" }),
                  vue.createVNode(_component_uni_icons, {
                    type: "right",
                    size: "20"
                  })
                ])
              ]),
              vue.createElementVNode("view", { class: "row" }, [
                vue.createElementVNode("view", { class: "left" }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "help-filled",
                    size: "20"
                  }),
                  vue.createElementVNode("view", { class: "text" }, "常见问题")
                ]),
                vue.createElementVNode("view", { class: "right" }, [
                  vue.createElementVNode("view", { class: "text" }),
                  vue.createVNode(_component_uni_icons, {
                    type: "right",
                    size: "20"
                  })
                ])
              ])
            ])
          ])
        ]);
      };
    }
  };
  const PagesUserUser = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/pages/user/user.vue"]]);
  const _imports_0$1 = "/assets/preview2.bcea3632.jpg";
  const _sfc_main$8 = {};
  function _sfc_render$6(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "classlist" }, [
      vue.createElementVNode("view", { class: "content" }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList(10, (item) => {
            return vue.createElementVNode("navigator", {
              url: "/pages/preview/preview",
              class: "item"
            }, [
              vue.createElementVNode("image", {
                src: _imports_0$1,
                mode: "aspectFill"
              })
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesClasslistClasslist = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$6], ["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/pages/classlist/classlist.vue"]]);
  const _sfc_main$7 = {
    name: "UniRate",
    props: {
      isFill: {
        // 星星的类型，是否镂空
        type: [Boolean, String],
        default: true
      },
      color: {
        // 星星未选中的颜色
        type: String,
        default: "#ececec"
      },
      activeColor: {
        // 星星选中状态颜色
        type: String,
        default: "#ffca3e"
      },
      disabledColor: {
        // 星星禁用状态颜色
        type: String,
        default: "#c0c0c0"
      },
      size: {
        // 星星的大小
        type: [Number, String],
        default: 24
      },
      value: {
        // 当前评分
        type: [Number, String],
        default: 0
      },
      modelValue: {
        // 当前评分
        type: [Number, String],
        default: 0
      },
      max: {
        // 最大评分
        type: [Number, String],
        default: 5
      },
      margin: {
        // 星星的间距
        type: [Number, String],
        default: 0
      },
      disabled: {
        // 是否可点击
        type: [Boolean, String],
        default: false
      },
      readonly: {
        // 是否只读
        type: [Boolean, String],
        default: false
      },
      allowHalf: {
        // 是否显示半星
        type: [Boolean, String],
        default: false
      },
      touchable: {
        // 是否支持滑动手势
        type: [Boolean, String],
        default: true
      }
    },
    data() {
      return {
        valueSync: "",
        userMouseFristMove: true,
        userRated: false,
        userLastRate: 1
      };
    },
    watch: {
      value(newVal) {
        this.valueSync = Number(newVal);
      },
      modelValue(newVal) {
        this.valueSync = Number(newVal);
      }
    },
    computed: {
      stars() {
        const value = this.valueSync ? this.valueSync : 0;
        const starList = [];
        const floorValue = Math.floor(value);
        const ceilValue = Math.ceil(value);
        for (let i = 0; i < this.max; i++) {
          if (floorValue > i) {
            starList.push({
              activeWitch: "100%"
            });
          } else if (ceilValue - 1 === i) {
            starList.push({
              activeWitch: (value - floorValue) * 100 + "%"
            });
          } else {
            starList.push({
              activeWitch: "0"
            });
          }
        }
        return starList;
      },
      marginNumber() {
        return Number(this.margin);
      }
    },
    created() {
      this.valueSync = Number(this.value || this.modelValue);
      this._rateBoxLeft = 0;
      this._oldValue = null;
    },
    mounted() {
      setTimeout(() => {
        this._getSize();
      }, 100);
    },
    methods: {
      touchstart(e) {
        if (this.readonly || this.disabled)
          return;
        const {
          clientX,
          screenX
        } = e.changedTouches[0];
        this._getRateCount(clientX || screenX);
      },
      touchmove(e) {
        if (this.readonly || this.disabled || !this.touchable)
          return;
        const {
          clientX,
          screenX
        } = e.changedTouches[0];
        this._getRateCount(clientX || screenX);
      },
      /**
       * 兼容 PC @tian
       */
      mousedown(e) {
      },
      mousemove(e) {
      },
      mouseleave(e) {
      },
      /**
       * 获取星星个数
       */
      _getRateCount(clientX) {
        this._getSize();
        const size = Number(this.size);
        if (isNaN(size)) {
          return new Error("size 属性只能设置为数字");
        }
        const rateMoveRange = clientX - this._rateBoxLeft;
        let index = parseInt(rateMoveRange / (size + this.marginNumber));
        index = index < 0 ? 0 : index;
        index = index > this.max ? this.max : index;
        const range = parseInt(rateMoveRange - (size + this.marginNumber) * index);
        let value = 0;
        if (this._oldValue === index && !this.PC)
          return;
        this._oldValue = index;
        if (this.allowHalf) {
          if (range > size / 2) {
            value = index + 1;
          } else {
            value = index + 0.5;
          }
        } else {
          value = index + 1;
        }
        value = Math.max(0.5, Math.min(value, this.max));
        this.valueSync = value;
        this._onChange();
      },
      /**
       * 触发动态修改
       */
      _onChange() {
        this.$emit("input", this.valueSync);
        this.$emit("update:modelValue", this.valueSync);
        this.$emit("change", {
          value: this.valueSync
        });
      },
      /**
       * 获取星星距离屏幕左侧距离
       */
      _getSize() {
        uni.createSelectorQuery().in(this).select(".uni-rate").boundingClientRect().exec((ret) => {
          if (ret) {
            this._rateBoxLeft = ret[0].left;
          }
        });
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode(
        "view",
        {
          ref: "uni-rate",
          class: "uni-rate"
        },
        [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($options.stars, (star, index) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  class: vue.normalizeClass(["uni-rate__icon", { "uni-cursor-not-allowed": $props.disabled }]),
                  style: vue.normalizeStyle({ "margin-right": $options.marginNumber + "px" }),
                  key: index,
                  onTouchstart: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.touchstart && $options.touchstart(...args), ["stop"])),
                  onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.touchmove && $options.touchmove(...args), ["stop"])),
                  onMousedown: _cache[2] || (_cache[2] = vue.withModifiers((...args) => $options.mousedown && $options.mousedown(...args), ["stop"])),
                  onMousemove: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $options.mousemove && $options.mousemove(...args), ["stop"])),
                  onMouseleave: _cache[4] || (_cache[4] = (...args) => $options.mouseleave && $options.mouseleave(...args))
                },
                [
                  vue.createVNode(_component_uni_icons, {
                    color: $props.color,
                    size: $props.size,
                    type: $props.isFill ? "star-filled" : "star"
                  }, null, 8, ["color", "size", "type"]),
                  vue.createElementVNode(
                    "view",
                    {
                      style: vue.normalizeStyle({ width: star.activeWitch }),
                      class: "uni-rate__icon-on"
                    },
                    [
                      vue.createVNode(_component_uni_icons, {
                        color: $props.disabled ? $props.disabledColor : $props.activeColor,
                        size: $props.size,
                        type: "star-filled"
                      }, null, 8, ["color", "size"])
                    ],
                    4
                    /* STYLE */
                  )
                ],
                38
                /* CLASS, STYLE, NEED_HYDRATION */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$5], ["__scopeId", "data-v-5c8fbdf3"], ["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/uni_modules/uni-rate/components/uni-rate/uni-rate.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$6 = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i in styles) {
          let line = this.toLine(i);
          transform += line + ":" + styles[i] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:148", `方法 ${i} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 0 : 1,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$4], ["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$5 = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      },
      borderRadius: {
        type: String
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          backgroundColor: "transparent",
          borderRadius: this.borderRadius || "0",
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: "top"
      };
    },
    computed: {
      getStyles() {
        let res = { backgroundColor: this.bg };
        if (this.borderRadius || "0") {
          res = Object.assign(res, { borderRadius: this.borderRadius });
        }
        return res;
      },
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    activated() {
      this.setH5Visible(!this.showPopup);
    },
    deactivated() {
      this.setH5Visible(true);
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible(visible = true) {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:298", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$1);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle($options.getStyles),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* NEED_HYDRATION */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$3], ["__scopeId", "data-v-4dd3c44b"], ["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const _imports_0 = "/assets/classify2.a7a768ab.jpg";
  const _sfc_main$4 = {
    __name: "preview",
    setup(__props) {
      const maskState = vue.ref(true);
      const value = vue.ref(4.5);
      const infoPopup = vue.ref(null);
      const scorePopup = vue.ref(null);
      const userScore = vue.ref(0);
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
        formatAppLog("log", "at pages/preview/preview.vue:185", "评分了，评了：", userScore.value);
      }
      function goBack() {
        uni.navigateBack();
      }
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$3);
        const _component_uni_dateformat = resolveEasycom(vue.resolveDynamicComponent("uni-dateformat"), __easycom_1$1);
        const _component_uni_rate = resolveEasycom(vue.resolveDynamicComponent("uni-rate"), __easycom_2);
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 预览页 "),
            vue.createElementVNode("view", { class: "preview" }, [
              vue.createElementVNode("swiper", { circular: "" }, [
                (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(5, (item) => {
                    return vue.createElementVNode("swiper-item", null, [
                      vue.createElementVNode("image", {
                        onClick: maskChange,
                        src: _imports_0,
                        mode: "aspec"
                      })
                    ]);
                  }),
                  64
                  /* STABLE_FRAGMENT */
                ))
              ]),
              maskState.value ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "mask"
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "goBack",
                    style: vue.normalizeStyle({ top: vue.unref(getStatusBarHeight)() + "px" }),
                    onClick: goBack
                  },
                  [
                    vue.createVNode(_component_uni_icons, {
                      type: "back",
                      color: "#fff",
                      size: "20"
                    })
                  ],
                  4
                  /* STYLE */
                ),
                vue.createElementVNode("view", { class: "count" }, " 3 / 9 "),
                vue.createElementVNode("view", { class: "time" }, [
                  vue.createVNode(_component_uni_dateformat, {
                    date: /* @__PURE__ */ new Date(),
                    format: "hh:mm"
                  }, null, 8, ["date"])
                ]),
                vue.createElementVNode("view", { class: "date" }, [
                  vue.createVNode(_component_uni_dateformat, {
                    date: /* @__PURE__ */ new Date(),
                    format: "MM日dd月"
                  }, null, 8, ["date"])
                ]),
                vue.createElementVNode("view", { class: "footer" }, [
                  vue.createElementVNode("view", {
                    class: "box",
                    onClick: clickInfo
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "info",
                      size: "23"
                    }),
                    vue.createElementVNode("view", { class: "text" }, " 信息 ")
                  ]),
                  vue.createElementVNode("view", {
                    class: "box",
                    onClick: clickscorePopup
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "star",
                      size: "23"
                    }),
                    vue.createElementVNode("view", { class: "text" }, " 分数 ")
                  ]),
                  vue.createElementVNode("view", { class: "box" }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "download",
                      size: "23"
                    }),
                    vue.createElementVNode("view", { class: "text" }, " 下载 ")
                  ])
                ])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createVNode(
                _component_uni_popup,
                {
                  ref_key: "infoPopup",
                  ref: infoPopup,
                  type: "bottom"
                },
                {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "infoPopup" }, [
                      vue.createElementVNode("view", { class: "popHeader" }, [
                        vue.createElementVNode("view", { class: "" }),
                        vue.createElementVNode("view", { class: "title" }, " 壁纸信息 "),
                        vue.createElementVNode("view", {
                          class: "close",
                          onClick: clickInfoClose
                        }, [
                          vue.createVNode(_component_uni_icons, {
                            type: "closeempty",
                            size: "18",
                            color: "#999"
                          })
                        ])
                      ]),
                      vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
                        vue.createElementVNode("view", { class: "content" }, [
                          vue.createElementVNode("view", { class: "row" }, [
                            vue.createElementVNode("view", { class: "label" }, " 壁纸ID: "),
                            vue.createElementVNode("text", { selectable: "" }, "999900019209910")
                          ]),
                          vue.createElementVNode("view", { class: "row" }, [
                            vue.createElementVNode("view", { class: "label" }, " 壁纸分类： "),
                            vue.createElementVNode("text", { selectable: "" }, "美女壁纸")
                          ]),
                          vue.createElementVNode("view", { class: "row" }, [
                            vue.createElementVNode("view", { class: "label" }, " 发布者： "),
                            vue.createElementVNode("text", { selectable: "" }, "余天王")
                          ]),
                          vue.createElementVNode("view", { class: "row" }, [
                            vue.createElementVNode("view", { class: "label" }, " 评分： "),
                            vue.createVNode(_component_uni_rate, {
                              modelValue: value.value,
                              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
                              touchable: "",
                              readonly: ""
                            }, null, 8, ["modelValue"]),
                            vue.createElementVNode("text", { selectable: "" }, " 5分 ")
                          ]),
                          vue.createElementVNode("view", { class: "row" }, [
                            vue.createElementVNode("view", { class: "label" }, " 标签： "),
                            vue.createElementVNode("view", { class: "value tabs" }, [
                              (vue.openBlock(), vue.createElementBlock(
                                vue.Fragment,
                                null,
                                vue.renderList(3, (item) => {
                                  return vue.createElementVNode("view", { class: "tab" }, " 标签名 ");
                                }),
                                64
                                /* STABLE_FRAGMENT */
                              ))
                            ])
                          ]),
                          vue.createElementVNode("view", { class: "copyright" }, " 声明：本图片来自用户投稿，非商业使用，用于免费学习交流，如果侵权，可以拷贝被指ID举报到平台，管理将删除对应壁纸，维护您的权益 ")
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              ),
              vue.createCommentVNode(" 评分弹窗 "),
              vue.createVNode(
                _component_uni_popup,
                {
                  ref_key: "scorePopup",
                  ref: scorePopup,
                  "is-mask-click": false
                },
                {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "scorePopup" }, [
                      vue.createElementVNode("view", { class: "popHeader" }, [
                        vue.createElementVNode("view", { class: "title" }, " 壁纸评分 "),
                        vue.createElementVNode("view", {
                          class: "close",
                          onClick: clickscoreClose
                        }, [
                          vue.createVNode(_component_uni_icons, {
                            type: "closeempty",
                            size: "18",
                            color: "#999"
                          })
                        ])
                      ]),
                      vue.createElementVNode("view", { class: "content" }, [
                        vue.createVNode(_component_uni_rate, {
                          modelValue: userScore.value,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => userScore.value = $event),
                          onChange: _ctx.onchange,
                          "allow-half": ""
                        }, null, 8, ["modelValue", "onChange"]),
                        vue.createElementVNode(
                          "text",
                          { class: "text" },
                          vue.toDisplayString(userScore.value) + "分",
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "footer" }, [
                        vue.createElementVNode("button", {
                          onClick: submitScore,
                          type: "default",
                          size: "mini",
                          plain: "",
                          disabled: !userScore.value
                        }, "确认评分", 8, ["disabled"])
                      ])
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              )
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const PagesPreviewPreview = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/pages/preview/preview.vue"]]);
  const _sfc_main$3 = {};
  function _sfc_render$2(_ctx, _cache) {
    return null;
  }
  const PagesNoticeNotice = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/pages/notice/notice.vue"]]);
  const _sfc_main$2 = {
    name: "UniTag",
    emits: ["click"],
    props: {
      type: {
        // 标签类型default、primary、success、warning、error、royal
        type: String,
        default: "default"
      },
      size: {
        // 标签大小 normal, small
        type: String,
        default: "normal"
      },
      // 标签内容
      text: {
        type: String,
        default: ""
      },
      disabled: {
        // 是否为禁用状态
        type: [Boolean, String],
        default: false
      },
      inverted: {
        // 是否为空心
        type: [Boolean, String],
        default: false
      },
      circle: {
        // 是否为圆角样式
        type: [Boolean, String],
        default: false
      },
      mark: {
        // 是否为标记样式
        type: [Boolean, String],
        default: false
      },
      customStyle: {
        type: String,
        default: ""
      }
    },
    computed: {
      classes() {
        const {
          type,
          disabled,
          inverted,
          circle,
          mark,
          size,
          isTrue
        } = this;
        const classArr = [
          "uni-tag--" + type,
          "uni-tag--" + size,
          isTrue(disabled) ? "uni-tag--disabled" : "",
          isTrue(inverted) ? "uni-tag--" + type + "--inverted" : "",
          isTrue(circle) ? "uni-tag--circle" : "",
          isTrue(mark) ? "uni-tag--mark" : "",
          // type === 'default' ? 'uni-tag--default' : 'uni-tag-text',
          isTrue(inverted) ? "uni-tag--inverted uni-tag-text--" + type : "",
          size === "small" ? "uni-tag-text--small" : ""
        ];
        return classArr.join(" ");
      }
    },
    methods: {
      isTrue(value) {
        return value === true || value === "true";
      },
      onClick() {
        if (this.isTrue(this.disabled))
          return;
        this.$emit("click");
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.text ? (vue.openBlock(), vue.createElementBlock(
      "text",
      {
        key: 0,
        class: vue.normalizeClass(["uni-tag", $options.classes]),
        style: vue.normalizeStyle($props.customStyle),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
      },
      vue.toDisplayString($props.text),
      7
      /* TEXT, CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-1f94d070"], ["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/uni_modules/uni-tag/components/uni-tag/uni-tag.vue"]]);
  const _sfc_main$1 = {};
  function _sfc_render(_ctx, _cache) {
    const _component_uni_tag = resolveEasycom(vue.resolveDynamicComponent("uni-tag"), __easycom_0);
    const _component_uni_dateformat = resolveEasycom(vue.resolveDynamicComponent("uni-dateformat"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 公告详情 "),
        vue.createElementVNode("view", { class: "noticelayout" }, [
          vue.createElementVNode("view", { class: "title" }, [
            vue.createElementVNode("view", { class: "tag" }, [
              vue.createVNode(_component_uni_tag, {
                inverted: true,
                text: "置顶",
                type: "error"
              }),
              vue.createTextVNode(" 这个区域填写标题 ")
            ]),
            vue.createCommentVNode(' 		<view class="uniui-font">\r\n			\r\n			</view> '),
            vue.createElementVNode("view", { class: "info" }, [
              vue.createElementVNode("view", { class: "item" }, " ytw "),
              vue.createElementVNode("view", { class: "item" }, [
                vue.createVNode(_component_uni_dateformat, {
                  date: Date.now(),
                  format: "yyyy-MM-dd hh:mm:ss"
                }, null, 8, ["date"])
              ])
            ]),
            vue.createElementVNode("view", { class: "content" }, " 内容区域 ")
          ])
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesNoticeNoticedetail = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-d58db105"], ["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/pages/notice/noticedetail.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/classify/classify", PagesClassifyClassify);
  __definePage("pages/user/user", PagesUserUser);
  __definePage("pages/classlist/classlist", PagesClasslistClasslist);
  __definePage("pages/preview/preview", PagesPreviewPreview);
  __definePage("pages/notice/notice", PagesNoticeNotice);
  __definePage("pages/notice/noticedetail", PagesNoticeNoticedetail);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/uniapp_learning/demo1/wallpaper-ytw/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
