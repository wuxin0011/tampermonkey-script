// ==UserScript==
// @name         0x3f-problem-solution
// @namespace    https://greasyfork.org/zh-CN/scripts/501134-0x3f-problem-solution
// @version      0.0.4.5
// @author       wuxin0011
// @description  自定义分数区间显示题目 标记题目状态 配合灵茶山艾府题单解题
// @license      MIT
// @icon         https://assets.leetcode.cn/aliyun-lc-upload/users/endlesscheng/avatar_1690721039.png
// @source       https://github.com/wuxin0011/tampermonkey-script/tree/main/0x3f-leetcode
// @supportURL   https://greasyfork.org/zh-CN/scripts/501134-0x3f-problem-solution/feedback
// @downloadURL  https://greasyfork.org/zh-CN/scripts/501134-0x3f-problem-solution
// @updateURL    https://greasyfork.org/zh-CN/scripts/501134-0x3f-problem-solution
// @match        https://leetcode.cn/circle/discuss/*
// @match        https://leetcode.cn/problems/*
// @match        https://leetcode.cn/contest/weekly-contest-*/problems/*
// @match        https://leetcode.cn/contest/biweekly-contest-*/problems/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.4.31/dist/vue.global.prod.js
// @require      data:application/javascript,%3Bwindow.Vue%3DVue%3B
// @require      https://unpkg.com/element-plus@2.7.6/dist/index.full.js
// @resource     elementPlusCss  https://unpkg.com/element-plus@2.7.6/dist/index.css
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// ==/UserScript==

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const e=document.createElement("style");e.textContent=t,document.head.append(e)})(" h2[data-v-a8cfbf3e]{color:#000;margin:10px 0}p[data-v-a8cfbf3e]{text-decoration:underline;font-size:14px}em[data-v-a8cfbf3e]{color:red}.m-setting-button[data-v-f382fe90]{position:fixed;top:200px;right:0;z-index:100000}.m-button[data-v-f382fe90]{margin-left:16px!important;padding:5px!important;font-size:14px!important}.processs-flex[data-v-f382fe90]{display:flex;justify-content:center;align-items:center}.m-setting-button[data-v-6868725a]{position:fixed;top:200px;right:0;z-index:100000}.m-button[data-v-6868725a]{margin-left:16px!important;padding:5px!important;font-size:14px!important}.processs-flex[data-v-6868725a]{display:flex;justify-content:center;align-items:center} ");

(function (vue, ElementPlus) {
  'use strict';

  var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  class Cache {
    set(k, v) {
      _GM_setValue(k, v);
    }
    get(k, parse = true, name = String.name) {
      try {
        let v = _GM_getValue(k);
        switch (name) {
          case String.name:
            if (v == null) {
              return "null";
            }
            return v;
          case Object.name:
            if (v == null || v == void 0 || typeof v != "object") {
              return {};
            }
            return v;
          case Boolean.name:
            if (v === null || v == void 0) {
              return false;
            }
            if (v == false || v == "false" || v == "" || v == "null") {
              return false;
            }
            return v;
          case Array.name:
            if (v === null || v == void 0 || !Array.isArray(v)) {
              return [];
            }
            return v;
          default:
            return v;
        }
      } catch (E) {
        return null;
      }
    }
    remove(k) {
      _GM_deleteValue(k);
    }
  }
  const Cache$1 = new Cache();
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$2 = {};
  const _hoisted_1$2 = /* @__PURE__ */ vue.createElementVNode("p", null, " 1. 本人目前测试过，没有封号，但是对于查询过题目会缓存在本地，因此尽量不要清空浏览器缓存 ", -1);
  const _hoisted_2$2 = /* @__PURE__ */ vue.createElementVNode("p", null, " 2. 脚本会监控题做题提交状态 ，当题目提交时候会缓存题目状态，如果题单中有这个题目，会直接从缓存中获取 ", -1);
  const _hoisted_3$2 = [
    _hoisted_1$2,
    _hoisted_2$2
  ];
  function _sfc_render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", null, _hoisted_3$2);
  }
  const Q1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);
  const _sfc_main$1 = {};
  const _withScopeId = (n) => (vue.pushScopeId("data-v-a8cfbf3e"), n = n(), vue.popScopeId(), n);
  const _hoisted_1$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("h2", null, [
    /* @__PURE__ */ vue.createTextVNode(" 1. 为什么部分题单出现统计数量为 "),
    /* @__PURE__ */ vue.createElementVNode("em", null, " 0 "),
    /* @__PURE__ */ vue.createTextVNode(" 情况 ? ")
  ], -1));
  const _hoisted_2$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("p", null, "防止一次性访问题单太多，对服务器产生压力，所以采用单个题单访问然后保存状态 , 这样避免访问量问题", -1));
  const _hoisted_3$1 = [
    _hoisted_1$1,
    _hoisted_2$1
  ];
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", null, _hoisted_3$1);
  }
  const Q2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-a8cfbf3e"]]);
  function Message(title = "确认操作", callback = () => {
  }, canlcelCallback = () => {
  }) {
    ElementPlus.ElMessageBox.confirm(
      `${title} ?`,
      "警告",
      {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }
    ).then(() => {
      callback();
    }).catch(() => {
      ElementPlus.ElMessage({
        type: "info",
        message: "已取消"
      });
      canlcelCallback();
    });
  }
  const isLeetCodeCircleUrl = (url = window.location.href) => url && url.indexOf("https://leetcode.cn/circle") != -1;
  const isProblem = (url = window.location.href) => /^https?:\/\/leetcode.cn\/problems\/.*/i.test(url);
  const isContest = (url = window.location.href) => url.indexOf("https://leetcode.cn/contest/weekly-contest") != -1 || url.indexOf("https://leetcode.cn/contest/biweekly-contest") != -1;
  const width = 14;
  const height = 14;
  const problemFinsh = () => `

<svg width="${width}px" height="${height}px" status="ac" viewBox="0 0 1024 1024"  version="1.1"
xmlns="http://www.w3.org/2000/svg">
<path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#4CAF50" />
<path
    d="M738.133333 311.466667L448 601.6l-119.466667-119.466667-59.733333 59.733334 179.2 179.2 349.866667-349.866667z"
    fill="#CCFF90" />
</svg>

`;
  const problemsTry = () => `
<svg width="${width}px" height="${height}px" status="notac" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#FEDEA1;" d="M256,12.8C121.899,12.8,12.8,121.899,12.8,256S121.899,499.2,256,499.2S499.2,390.101,499.2,256
S390.101,12.8,256,12.8z" />
<g>
    <path style="fill:#573A32;" d="M256,115.2c-49.271,0-92.561,25.353-117.726,63.676l18.859,18.859
C177.178,163.806,213.734,140.8,256,140.8c63.625,0,115.2,51.567,115.2,115.2h-38.4l51.2,51.2l51.2-51.2h-38.4
C396.8,178.244,333.764,115.2,256,115.2z" />
    <path style="fill:#573A32;" d="M256,0C114.62,0,0,114.62,0,256s114.62,256,256,256s256-114.62,256-256S397.38,0,256,0z M256,486.4
C128.956,486.4,25.6,383.044,25.6,256S128.956,25.6,256,25.6S486.4,128.956,486.4,256S383.044,486.4,256,486.4z" />
    <path style="fill:#573A32;" d="M256,371.2c-63.625,0-115.2-51.567-115.2-115.2h38.4L128,204.8L76.8,256h38.4
c0,77.756,63.036,140.8,140.8,140.8c49.272,0,92.561-25.353,117.726-63.676l-18.859-18.859
C334.822,348.194,298.266,371.2,256,371.2z" />
</g>
</svg>

`;
  const problemsNo = () => install_pos() ? `
<svg width="${width}px" height="${height}px" status="null" viewBox="0 0 24 24" id="meteor-icon-kit__regular-circle" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z" fill="#758CA3"/></svg>
` : ``;
  const createStatus = (status, link) => {
    let node;
    if (!link) {
      return;
    }
    node = link instanceof HTMLAnchorElement ? link.parentElement : link;
    if (node) {
      node.status = status;
    }
    let installSVG = "";
    if (status == STATUS["AC"]) {
      installSVG = problemFinsh();
    } else if (status == STATUS["notac"]) {
      installSVG = problemsTry();
    } else if (status == STATUS["NO"]) {
      installSVG = problemsNo();
    } else {
      installSVG = "";
    }
    let svg = node.querySelector("svg");
    if (svg) {
      if (svg.getAttribute("status") == status || svg.getAttribute("status") == STATUS["AC"]) {
        return false;
      }
      svg.remove();
    }
    node.innerHTML = install_pos() ? installSVG + node.innerHTML : node.innerHTML + installSVG;
    return true;
  };
  const inf = 4e3;
  const mi = 1e3;
  const __0X3F_PROBLEM_KEYS__ = {
    "__0x3f_problmes_solution__": "__0x3f_problmes_solution__",
    // 基本信息
    "__0x3f_problmes_urls__": "__0x3f_problmes_urls__",
    // 题单key
    "__0x3f_problmes_update__": "__0x3f_problmes_update__",
    // 是否修改了默认题单key
    "__0x3f_problmes_button_is_none__": "__is_none_0x3f_problmes_button__",
    // 是否隐藏设置按钮
    "__0x3f_problmes_insert_pos__": "__0x3f_problmes_insert_pos__",
    // 安装位置
    "__0x3f_problmes_status_update__": "__0x3f_problmes_status_update__",
    "__0x3f_problmes_plugin_load_ok__": "__0x3f_problmes_plugin_load_ok__",
    // 是否使用插件
    "__0x3f_problmes_add_cur__": "__0x3f_problmes_add_cur__",
    // 添加 url
    "__0x3f_problmes_ac_key__": "__local_ok_problem_key__",
    // ac key
    "__0x3f_problmes_ac_version__": "__0x3f_problmes_ac_version__"
    // TODO ac key version
  };
  const STATUS = {
    "AC": "ac",
    "NO": "null",
    "notac": "notac"
  };
  const defaultObj = {
    min: mi,
    max: inf,
    visiableMember: true,
    onlyUrls: false,
    useDefaultSetting: true,
    hiddenAc: false
  };
  function install_pos() {
    return !Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_insert_pos__"], false, Boolean.name);
  }
  function isShow(text, min, max) {
    if (!text) {
      return true;
    }
    let res = text.match(/\d+/ig);
    if (!res) {
      return true;
    }
    if (Array.isArray(res) && res.length < 2) {
      return true;
    }
    let s = 0;
    for (let i = res.length - 1; i >= 0; i--) {
      s = res[i];
      if (s >= mi && s <= inf) {
        return s >= min && s <= max;
      }
    }
    return true;
  }
  let A = void 0;
  const linkCssSelector = `#lc-content [class*="CollapsibleMarkdownContent"] [class*="MarkdownContent"] li>a`;
  const queryProblem = () => Array.from(document.querySelectorAll(linkCssSelector)).filter((item) => item && item instanceof HTMLAnchorElement && isProblem(item.href));
  function loadProblems() {
    A = queryProblem();
    return A;
  }
  function handlerProblem(data) {
    var _a;
    try {
      loadProblems();
      let { min, max, visiableMember, useDefaultSetting, onlyUrls, hiddenAc } = data;
      if (isNaN(min) || isNaN(max)) {
        min = mi;
        max = inf;
      }
      if (min < mi) {
        min = mi;
      }
      if (max < min) {
        max = inf;
      }
      min = Number(min);
      max = Number(max);
      data.min = min;
      data.max = max;
      Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_solution__"], data);
      for (let i = 0; i < A.length; i++) {
        if (!(A[i] instanceof HTMLAnchorElement)) {
          continue;
        }
        let d = (_a = A[i]) == null ? void 0 : _a.parentNode;
        if (!d) {
          continue;
        }
        let none = false;
        let Nohidden = isShow(d.textContent, min, max);
        d.style.display = Nohidden ? "" : "none";
        if (!Nohidden) {
          continue;
        }
        if (hiddenAc) {
          const svg = d.querySelector("svg");
          if (svg && svg.getAttribute("status")) {
            d.style.display = svg.getAttribute("status") == STATUS["AC"] ? "none" : "";
          }
        } else {
          d.style.display = "";
        }
        let c = d.textContent && d.textContent.indexOf("会员") != -1;
        if (!c) {
          continue;
        }
        d.style.display = visiableMember ? "" : "none";
      }
    } catch (e) {
      console.log("error", e);
    }
  }
  function computeAcInfo(saveUrls = [], deleteOk = true) {
    let infos = [];
    console.log("saveUrls", saveUrls);
    for (let i = 0, u = null; Array.isArray(saveUrls) && i < saveUrls.length; i++) {
      try {
        u = saveUrls[i];
        if (!u || !(u == null ? void 0 : u.link)) continue;
        let s = Object.values(u).join("");
        if (s == "null" || !Cache$1.get(u.link) || !getAcCountKey(u.link) || !Cache$1.get(getAcCountKey(u.link))) {
          continue;
        }
        let o = Cache$1.get(getAcCountKey(u.link));
        u["ac"] = isNaN(o["ac"]) ? 0 : parseInt(o["ac"]);
        u["tot"] = isNaN(o["tot"]) ? 0 : parseInt(o["tot"]);
      } catch (e) {
      }
      infos.push(Object.assign({}, u));
    }
    return infos;
  }
  const initUrls = () => {
    let saveUrls = Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_update__"], true, Boolean.name) ? Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_urls__"], true, Array.name) : defaultUrls;
    return computeAcInfo(saveUrls);
  };
  const initObj = () => Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_solution__"]) ? Object.assign(defaultObj, Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_solution__"])) : defaultObj;
  const support_plugins = () => {
    const u = initObj();
    if (!u || !u.onlyUrls) return true;
    let url = window.location.href;
    if (isLeetCodeCircleUrl(url) && url.indexOf("view") != -1) {
      try {
        url = url.split("view")[0];
      } catch (e) {
        url = window.location.href;
      }
    }
    const urls = initUrls();
    for (let info of urls) {
      if (!info || !(info == null ? void 0 : info.link)) {
        continue;
      }
      if (info.link.indexOf(url) != -1) {
        return true;
      }
    }
    return false;
  };
  const defaultUrls = [
    {
      title: "字符串（KMP/Z函数/Manacher/字符串哈希/AC自动机/后缀数组/子序列自动机）",
      link: "https://leetcode.cn/circle/discuss/SJFwQI/",
      cnt: 0,
      ac: 0
    },
    {
      title: "链表、二叉树与一般树（前后指针/快慢指针/DFS/BFS/直径/LCA）",
      link: "https://leetcode.cn/circle/discuss/K0n2gO/",
      cnt: 0,
      ac: 0
    },
    {
      title: "贪心算法（基本贪心策略/反悔/区间/字典序/数学/思维/构造）",
      link: "https://leetcode.cn/circle/discuss/g6KTKL/",
      cnt: 0,
      ac: 0
    },
    {
      title: "滑动窗口（定长/不定长/多指针）",
      link: "https://leetcode.cn/circle/discuss/0viNMK/"
    },
    {
      title: "二分算法（二分答案/最小化最大值/最大化最小值/第K小）",
      link: "https://leetcode.cn/circle/discuss/SqopEo/",
      cnt: 0,
      ac: 0
    },
    {
      title: "单调栈（矩形面积/贡献法/最小字典序）",
      link: "https://leetcode.cn/circle/discuss/9oZFK9/",
      cnt: 0,
      ac: 0
    },
    {
      title: "网格图（DFS/BFS/综合应用）",
      link: "https://leetcode.cn/circle/discuss/YiXPXW/",
      cnt: 0,
      ac: 0
    },
    {
      title: "位运算（基础/性质/拆位/试填/恒等式/贪心/脑筋急转弯）",
      link: "https://leetcode.cn/circle/discuss/dHn9Vk/",
      cnt: 0,
      ac: 0
    },
    {
      title: "图论算法（DFS/BFS/拓扑排序/最短路/最小生成树/二分图/基环树/欧拉路径）",
      link: "https://leetcode.cn/circle/discuss/01LUak/",
      cnt: 0,
      ac: 0
    },
    {
      title: "动态规划（入门/背包/状态机/划分/区间/状压/数位/树形/数据结构优化）",
      link: "https://leetcode.cn/circle/discuss/tXLS3i/",
      cnt: 0,
      ac: 0
    },
    {
      title: "常用数据结构（前缀和/差分/栈/队列/堆/字典树/并查集/树状数组/线段树）",
      link: "https://leetcode.cn/circle/discuss/mOr1u6/",
      cnt: 0,
      ac: 0
    },
    {
      title: "数学算法（数论/组合/概率期望/博弈/计算几何/随机算法）",
      link: "https://leetcode.cn/circle/discuss/IYT3ss/",
      cnt: 0,
      ac: 0
    }
  ];
  function getId(problemUrl) {
    if (isContest(problemUrl) || isProblem(problemUrl)) {
      try {
        return problemUrl.split("problems")[1].split("/")[1];
      } catch (e) {
        return "";
      }
    }
    return "";
  }
  function postData(ID) {
    return {
      "query": "\n    query userQuestionStatus($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    status\n  }\n}\n    ",
      "variables": {
        "titleSlug": ID
      },
      "operationName": "userQuestionStatus"
    };
  }
  function queryStatus(ID = "", cache = {}, cur = void 0, watch2 = false) {
    if (!ID) {
      return;
    }
    if (cache[ID] == void 0 || cache[ID] != STATUS["AC"]) {
      fetch("https://leetcode.cn/graphql/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData(ID))
      }).then((res) => res.json()).then((response) => {
        var _a, _b, _c;
        if ((_a = response == null ? void 0 : response.data) == null ? void 0 : _a.question) {
          const status = (_c = (_b = response == null ? void 0 : response.data) == null ? void 0 : _b.question) == null ? void 0 : _c.status;
          if (cache[ID] == void 0 || cache[ID] != status) {
            cache[ID] = status == null ? "null" : status;
            if (watch2) {
              Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_ac_key__"], cache);
              window.localStorage.setItem(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_status_update__"], JSON.stringify({
                "id": ID,
                "status": cache[ID]
              }));
            }
            createStatus(cache[ID], cur);
          }
        } else {
          console.log("query result is undefined");
        }
      }).catch((ignore) => {
        console.error("query status error : ", ignore);
      });
    }
  }
  function addProcess(reload = true, doms = void 0, asyncAc = false) {
    var _a;
    let problems_doms = Array.isArray(doms) ? doms : loadProblems();
    const cache = getLocalProblemStatus();
    for (let i = 0; i < problems_doms.length; i++) {
      let cur = problems_doms[i].parentElement;
      if (!(cur instanceof HTMLElement)) {
        continue;
      }
      const ID = getId((_a = problems_doms[i]) == null ? void 0 : _a.href);
      if (!ID) {
        continue;
      }
      if (install_pos()) {
        cur.style.listStyleType = "none";
      }
      if (!cache[ID] || cache[ID] != STATUS["AC"] && asyncAc) {
        queryStatus(ID, cache, cur, false);
      } else {
        let status = cache[ID];
        createStatus(status, cur);
      }
    }
    if (reload) {
      let cnt = 10;
      let timeId = setInterval(() => {
        Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_ac_key__"], cache);
        cnt--;
        if (cnt == 0) {
          window.clearInterval(timeId);
        }
      }, 3e3);
    }
  }
  const submitProblems = (url = window.location.href, timeout = 500) => {
    const ID = getId(url);
    if (!ID) {
      return;
    }
    setTimeout(() => {
      const cache = getLocalProblemStatus();
      queryStatus(ID, cache, void 0, true);
    }, timeout);
  };
  const watchLinkStatusUpdate = (e) => {
    var _a;
    if (e.key != __0X3F_PROBLEM_KEYS__["__0x3f_problmes_status_update__"]) {
      return;
    }
    let { id, status } = JSON.parse(e.newValue);
    if (!id || !status) {
      return;
    }
    let thisLink = `https://leetcode.cn/problems/${id}`;
    let link = document.querySelector(`${linkCssSelector}[href^="https://leetcode.cn/problems/${id}"]`);
    if (!link || !(link == null ? void 0 : link.parentElement)) {
      let doms = loadProblems();
      for (let i = 0; i < doms.length; i++) {
        if (!doms[i] || !((_a = doms[i]) == null ? void 0 : _a.parentElement)) {
          continue;
        }
        if (doms[i].href.indexOf(thisLink) != -1) {
          link = doms[i];
          break;
        }
      }
    }
    createStatus(status, link);
  };
  function getAcCountKey(k) {
    if (!k) return "";
    return `0x3f_ac_key_${k}`;
  }
  function getProcess() {
    loadProblems();
    const cache = getLocalProblemStatus();
    let cnt = 0;
    for (let i = 0; i < A.length; i++) {
      let ID = getId(A[i].href);
      if (ID && cache[ID] == STATUS["AC"]) {
        cnt++;
      }
    }
    let url = window.location.href;
    Cache$1.set(getAcCountKey(url), { "tot": A.length, "ac": cnt });
    return [cnt, A.length];
  }
  function getLocalProblemStatus() {
    return Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_ac_key__"], true, Object.name);
  }
  const _hoisted_1 = { class: "processs-flex" };
  const _hoisted_2 = { style: { "text-align": "center", "color": "#121212" } };
  const _hoisted_3 = { class: "dialog-footer" };
  const formLabelWidth = "44px";
  const _sfc_main = {
    __name: "App",
    setup(__props) {
      let tableData = vue.reactive(initUrls());
      const keywords = vue.ref("");
      const dialogTableVisible = vue.ref(false);
      let urlsData = vue.computed(() => {
        let infos = computeAcInfo(tableData, false);
        let tot = 0, ac = 0;
        for (let info2 of infos) {
          if (info2["ac"] && info2["tot"]) {
            tot += info2["tot"];
            ac += info2["ac"];
          }
        }
        infos.unshift({ "title": "灵茶题单完成情况", "link": "https://leetcode.cn/u/endlesscheng/", "tot": tot, "ac": ac });
        return infos;
      });
      const isDisabbled = vue.computed(() => !!tableData.find((v) => (v == null ? void 0 : v.link) && (v == null ? void 0 : v.link.indexOf(window.location.href)) != -1));
      const dialogFormVisible = vue.ref(false);
      let totProblem = vue.ref(0);
      let finishProblem = vue.ref(0);
      const drawer = vue.ref(false);
      const viewSetting = () => {
        drawer.value = !drawer.value;
        let [cur, tot] = getProcess();
        finishProblem.value = cur;
        totProblem.value = tot;
        let url = window.location.href;
        let pos = tableData.findIndex((u) => !!u && u.link && u.link.indexOf(url) != -1);
        if (url && pos != -1 && tableData[pos]) {
          tableData[pos]["ac"] = cur;
          tableData[pos]["tot"] = tot;
        }
      };
      const computeProcess = (ac = 0, tot = 0) => {
        if (isNaN(ac) || isNaN(tot)) return 0;
        if (tot == 0) return 0;
        let p = 0;
        try {
          const s = String(ac / tot);
          let x1 = s.split(".")[1].padEnd(3).substring(0, 3);
          p = Math.min(100, Number(x1) / 10);
        } catch (e) {
          p = (ac / tot).toFixed(3) * 100;
        }
        return isNaN(p) ? 0 : p;
      };
      const finishProcess = vue.computed(() => computeProcess(finishProblem.value, totProblem.value));
      const processColors = [
        { color: "#f56c6c", percentage: 20 },
        { color: "#1989fa", percentage: 40 },
        { color: "#e6a23c", percentage: 60 },
        { color: "#6f7ad3", percentage: 80 },
        { color: "#5cb87a", percentage: 100 }
      ];
      const fromData = vue.reactive(initObj());
      vue.watch(fromData, () => {
        handlerProblem(vue.toRaw(Object.assign({}, fromData)));
      });
      const info = vue.reactive({
        title: "",
        link: "",
        status: "add"
      });
      const addlocal = () => {
        if (!isDisabbled) {
          return;
        }
        let [cur, tot] = getProcess();
        tableData.unshift({ title: document.title, link: window.location.href, "ac": cur, "tot": tot });
      };
      const updateIndex = vue.ref(-1);
      const showProblems = () => {
        dialogTableVisible.value = true;
        let o = Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_add_cur__"]) == "true" || Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_add_cur__"]) == true;
        if (o) {
          addlocal();
        }
      };
      const handlerProblems = (status, updateInfo = { title: "", link: "" }, index = -1) => {
        dialogFormVisible.value = true;
        info.status = status;
        updateIndex.value = index;
        Object.assign(info, updateInfo);
      };
      const handlerMessage = (u, title, link) => {
        const a = u ? "添加" : "修改";
        const error = !title || !/https?:\/\/.*/.test(link);
        if (error) {
          ElementPlus.ElMessage.error(`${a} 失败 请保证标题或者链接有效 `);
        } else {
          ElementPlus.ElMessage.success(`${a} 成功 `);
        }
        return !error;
      };
      const addOrUpdate = () => {
        if (!handlerMessage(info.status == "add", info.title, info.link)) {
          return;
        }
        if (info.status == "add") {
          tableData.unshift({ title: info.title, link: info.link, "ac": 0, "tot": 0 });
        } else {
          let index = updateIndex.value;
          if (index != -1 && index < tableData.length) {
            tableData[index].link = info.link;
            tableData[index].title = info.title;
          }
        }
        dialogFormVisible.value = false;
      };
      const deleteProblems = (index) => {
        tableData.splice(index, 1);
        Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_urls__"], vue.toRaw(tableData));
      };
      const handlerDefault = () => {
        Message("确认使用默认题单，将会重置题单", () => {
          for (let i = 0; i < tableData.length; i++) {
            delete tableData[i];
          }
          let infos = computeAcInfo(defaultUrls);
          for (let item of infos) {
            tableData.unshift(item);
          }
          ElementPlus.ElMessage({
            type: "success",
            message: "重置成功"
          });
        });
      };
      const asyncLocalStatus = () => {
        Message("确认同步题单", () => {
          addProcess(true, void 0, true);
        });
      };
      window.addEventListener("beforeunload", () => {
        Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_urls__"], vue.toRaw(tableData).filter((u) => u != null && u != void 0));
        Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_update__"], true);
        Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_add_cur__"], false);
      });
      vue.onMounted(() => {
        if (support_plugins()) {
          let times = 30;
          let loadTimeId = setInterval(() => {
            let a = queryProblem();
            times--;
            if (Array.isArray(a) && a.length > 0) {
              handlerProblem(vue.toRaw(Object.assign({}, fromData)));
              addProcess();
              window.clearInterval(loadTimeId);
            }
            if (times == 0) {
              window.clearInterval(loadTimeId);
            }
          }, 200);
          window.addEventListener("storage", (e) => {
            watchLinkStatusUpdate(e);
          });
        }
      });
      const q1 = vue.ref(false);
      const q2 = vue.ref(false);
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_progress = vue.resolveComponent("el-progress");
        const _component_el_divider = vue.resolveComponent("el-divider");
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_col = vue.resolveComponent("el-col");
        const _component_el_form_item = vue.resolveComponent("el-form-item");
        const _component_el_switch = vue.resolveComponent("el-switch");
        const _component_el_tooltip = vue.resolveComponent("el-tooltip");
        const _component_el_form = vue.resolveComponent("el-form");
        const _component_el_dialog = vue.resolveComponent("el-dialog");
        const _component_el_row = vue.resolveComponent("el-row");
        const _component_el_link = vue.resolveComponent("el-link");
        const _component_el_table_column = vue.resolveComponent("el-table-column");
        const _component_el_table = vue.resolveComponent("el-table");
        const _component_el_drawer = vue.resolveComponent("el-drawer");
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(_component_el_button, {
            type: "primary",
            style: {},
            onClick: viewSetting,
            class: "m-setting-button m-button",
            circle: "",
            size: "large"
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode(" 0X3F ")
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_drawer, {
            modelValue: drawer.value,
            "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => drawer.value = $event),
            size: "30%",
            "with-header": false,
            style: { "position": "fixed !important" },
            direction: "rtl"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", _hoisted_1, [
                vue.createVNode(_component_el_progress, {
                  type: "circle",
                  percentage: finishProcess.value,
                  color: processColors
                }, {
                  default: vue.withCtx(({ percentage }) => [
                    vue.createElementVNode("p", null, vue.toDisplayString(percentage) + "%", 1)
                  ]),
                  _: 1
                }, 8, ["percentage"])
              ]),
              vue.createElementVNode("p", _hoisted_2, vue.toDisplayString(vue.unref(finishProblem)) + " / " + vue.toDisplayString(vue.unref(totProblem)), 1),
              vue.createCommentVNode("", true),
              vue.createVNode(_component_el_divider),
              vue.createVNode(_component_el_form, {
                "label-position": "left",
                "label-width": "auto",
                model: fromData,
                style: { "max-width": "600px" }
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_form_item, { label: "分数区间" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_col, { span: 10 }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_input, {
                            modelValue: fromData.min,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => fromData.min = $event),
                            "aria-placeholder": "",
                            placeholder: " min  "
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_el_col, {
                        class: "text-center",
                        span: 1,
                        style: { "margin": "0 0.5rem" }
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("-")
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_el_col, { span: 10 }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_input, {
                            modelValue: fromData.max,
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => fromData.max = $event),
                            "aria-placeholder": "",
                            placeholder: " max"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "显示会员题" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: fromData.visiableMember,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => fromData.visiableMember = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "隐藏AC题目" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: fromData.hiddenAc,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => fromData.hiddenAc = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "收藏题单中生效" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_tooltip, {
                        content: "插件只在收藏题单中生效，刷新生效 ",
                        placement: "bottom-end"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_switch, {
                            modelValue: fromData.onlyUrls,
                            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => fromData.onlyUrls = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, { label: "使用题单" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: fromData.useDefaultSetting,
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => fromData.useDefaultSetting = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"]),
              fromData.useDefaultSetting ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                vue.createVNode(_component_el_divider),
                vue.createVNode(_component_el_button, {
                  plain: "",
                  onClick: asyncLocalStatus
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(" 同步本页题目状态 ")
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_el_button, {
                  plain: "",
                  onClick: showProblems
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(" 查看收藏的题单 ")
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_el_divider)
              ], 64)) : vue.createCommentVNode("", true),
              vue.createVNode(_component_el_button, {
                plain: "",
                onClick: _cache[8] || (_cache[8] = ($event) => q1.value = !q1.value)
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(" 问题1 ")
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_tooltip, { content: "此功能是为了多刷题单，重置题目状态，敬请期待!" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_button, {
                    plain: "",
                    type: "warning",
                    disabled: true
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(" 题单重置 ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_dialog, {
                modelValue: q1.value,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => q1.value = $event),
                title: "关于查询状态会不会被封号 ？"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(Q1)
                ]),
                _: 1
              }, 8, ["modelValue"]),
              vue.createVNode(_component_el_dialog, {
                modelValue: q2.value,
                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => q2.value = $event),
                title: "相关问题 ？"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(Q2)
                ]),
                _: 1
              }, 8, ["modelValue"]),
              vue.createVNode(_component_el_dialog, {
                modelValue: dialogTableVisible.value,
                "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => dialogTableVisible.value = $event),
                title: "题单"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_row, { gutter: 10 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_col, { span: 8 }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_input, {
                            modelValue: keywords.value,
                            "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => keywords.value = $event),
                            placeholder: "请输入关键词过滤",
                            clearable: ""
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_el_col, { span: 16 }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_button, {
                            plain: "",
                            onClick: addlocal,
                            disabled: isDisabbled.value
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(" 添加本页 ")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          vue.createVNode(_component_el_button, {
                            plain: "",
                            onClick: _cache[12] || (_cache[12] = ($event) => handlerProblems("add"))
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(" 自定义 ")
                            ]),
                            _: 1
                          }),
                          vue.createVNode(_component_el_button, {
                            plain: "",
                            onClick: handlerDefault
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(" 默认 ")
                            ]),
                            _: 1
                          }),
                          vue.createVNode(_component_el_button, {
                            plain: "",
                            onClick: _cache[13] || (_cache[13] = ($event) => q2.value = !q2.value)
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(" 相关问题 ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_table, {
                    data: vue.unref(urlsData),
                    height: "300",
                    style: { "width": "100%", "margin-top": "10px" }
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_table_column, {
                        label: "标题",
                        width: "auto",
                        align: "center"
                      }, {
                        default: vue.withCtx((scope) => [
                          vue.createVNode(_component_el_link, {
                            disabled: scope.row.link == "https://leetcode.cn/u/endlesscheng/",
                            href: scope.row.link,
                            target: "_blank",
                            type: "default"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(vue.toDisplayString(scope.row.title), 1)
                            ]),
                            _: 2
                          }, 1032, ["disabled", "href"])
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_el_table_column, {
                        label: "AC",
                        width: "80",
                        align: "center"
                      }, {
                        default: vue.withCtx((scope) => [
                          vue.createTextVNode(vue.toDisplayString(isNaN(scope.row.ac) ? 0 : scope.row.ac), 1)
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_el_table_column, {
                        label: "Total",
                        width: "80",
                        align: "center"
                      }, {
                        default: vue.withCtx((scope) => [
                          vue.createTextVNode(vue.toDisplayString(isNaN(scope.row.tot) ? 0 : scope.row.tot), 1)
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_el_table_column, {
                        label: "process",
                        width: "80",
                        align: "center"
                      }, {
                        default: vue.withCtx((scope) => {
                          var _a, _b, _c;
                          return [
                            vue.createTextVNode(vue.toDisplayString(((_a = scope == null ? void 0 : scope.row) == null ? void 0 : _a.tot) == 0 ? 0 : `${computeProcess((_b = scope == null ? void 0 : scope.row) == null ? void 0 : _b.ac, (_c = scope == null ? void 0 : scope.row) == null ? void 0 : _c.tot)}%`), 1)
                          ];
                        }),
                        _: 1
                      }),
                      vue.createVNode(_component_el_table_column, {
                        label: "操作",
                        width: "150",
                        align: "center"
                      }, {
                        default: vue.withCtx((scope) => [
                          vue.createVNode(_component_el_button, {
                            type: "primary",
                            size: "small",
                            disabled: scope.row.link == "https://leetcode.cn/u/endlesscheng/",
                            onClick: ($event) => handlerProblems("update", scope.row, scope.$index)
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("编辑")
                            ]),
                            _: 2
                          }, 1032, ["disabled", "onClick"]),
                          vue.createVNode(_component_el_button, {
                            disabled: scope.row.link == "https://leetcode.cn/u/endlesscheng/",
                            type: "danger",
                            size: "small",
                            onClick: ($event) => deleteProblems(scope.$index)
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("删除")
                            ]),
                            _: 2
                          }, 1032, ["disabled", "onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["data"])
                ]),
                _: 1
              }, 8, ["modelValue"]),
              vue.createVNode(_component_el_dialog, {
                modelValue: dialogFormVisible.value,
                "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => dialogFormVisible.value = $event),
                title: `${info.status == "add" ? "添加" : "编辑"}`,
                width: "400"
              }, {
                footer: vue.withCtx(() => [
                  vue.createElementVNode("div", _hoisted_3, [
                    vue.createVNode(_component_el_button, {
                      onClick: _cache[17] || (_cache[17] = ($event) => dialogFormVisible.value = false)
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode("取消")
                      ]),
                      _: 1
                    }),
                    vue.createVNode(_component_el_button, {
                      type: "primary",
                      onClick: addOrUpdate
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(" 确认 ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_form, null, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_form_item, {
                        label: "标题",
                        "label-width": formLabelWidth
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_input, {
                            modelValue: info.title,
                            "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => info.title = $event),
                            autocomplete: "off"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_el_form_item, {
                        label: "链接",
                        "label-width": formLabelWidth
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_input, {
                            modelValue: info.link,
                            "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => info.link = $event),
                            autocomplete: "off"
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "title"])
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]);
      };
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f382fe90"]]);
  const cssLoader = (e) => {
    const t = GM_getResourceText(e);
    return GM_addStyle(t), t;
  };
  cssLoader("elementPlusCss");
  const stopRankingKey = "__is_stop_rating_ranking__";
  let conetstTimeId = null;
  function run$1() {
    const container = document.querySelector(".contest-question-info .list-group");
    if (!container) return;
    const ls = Array.from(container.querySelectorAll(".list-group-item .pull-right"));
    for (let i = 0; i < 4; i++) {
      if (i >= ls.length) {
        break;
      }
      if (ls[i] instanceof HTMLElement) {
        ls[i].textContent = "0";
      }
    }
    window.clearInterval(conetstTimeId);
  }
  function startStopRanking() {
    if (!isContest(window.location.href)) {
      return;
    }
    const isNext = !!document.querySelector("#__next");
    if (isNext) {
      return;
    }
    const use = Cache$1.get(stopRankingKey);
    if (use) {
      conetstTimeId = setInterval(() => {
        run$1();
      }, 10);
    }
    _GM_registerMenuCommand(`${use ? "使用" : "关闭"} 排行榜`, () => {
      Cache$1.set(stopRankingKey, !use);
      window.location.reload();
    }, { title: "对于不想看到排行榜的可以使用此功能 默认开启" });
  }
  const local_url = window.location.href;
  let loadID = 0;
  let submitCnt = 0;
  function watchDom(dom) {
    if (!(dom instanceof HTMLElement)) {
      return;
    }
    let m = new MutationObserver(() => {
      if (submitCnt % 2 == 1) {
        submitProblems(local_url);
      }
      submitCnt++;
    });
    m.observe(dom, {
      childList: true,
      attributes: true
    });
  }
  function run() {
    loadID++;
    if (isProblem(local_url) || isContest(local_url)) {
      if (isProblem(local_url) && loadID == 1) {
        submitProblems(local_url);
      }
      setTimeout(() => {
        let submitbutton = null;
        const isNext = !!document.querySelector("#__next");
        if (isProblem(local_url) || isNext) {
          submitbutton = document.querySelector("div [data-e2e-locator=console-submit-button]");
        } else {
          let buttons = Array.from(document.querySelectorAll(".question-detail-bottom  .pull-right button"));
          for (let i = buttons.length - 1; i >= 0; i--) {
            if (buttons[i].textContent.indexOf("提交解答") != -1) {
              submitbutton = buttons[i];
              break;
            }
          }
        }
        if (submitbutton) {
          submitbutton.addEventListener("click", () => {
            submitProblems(local_url, 10 * 1e3);
          });
          watchDom(submitbutton);
        } else if (loadID < 10) {
          run();
        }
      }, 3e3);
    } else if (isLeetCodeCircleUrl(local_url)) {
      let Container = null;
      let ok = Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_button_is_none__"], true, Boolean.name);
      const start = () => {
        Container = document.createElement("div");
        const body = document.querySelector("body");
        body.append(Container);
        Container.style.display = ok && support_plugins() ? "block" : "none";
        return Container;
      };
      let dom = start();
      const VueApp = vue.createApp(App);
      _GM_registerMenuCommand(`${ok ? "隐藏按钮" : "显示按钮"}`, () => {
        ok = !ok;
        Container.style.display = ok ? "block" : "none";
        Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_button_is_none__"], ok);
      }, { title: "可以手动关闭或者显示按钮 默认显示 刷新生效" });
      _GM_registerMenuCommand(`安装到${install_pos() ? "右侧" : "左侧"}`, () => {
        Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_insert_pos__"], install_pos());
        window.location.reload();
      }, { title: "AC标记安装位置，默认左侧，刷新生效" });
      _GM_registerMenuCommand(`清空题目状态缓存`, () => {
        Message("确认清空题目状态缓存", () => {
          Cache$1.remove(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_ac_key__"]);
          window.location.reload();
        });
      }, { title: "如果题目状态出现问题，可以试试,一般情况下不建议使用" });
      _GM_registerMenuCommand(`同步题目状态`, () => {
        Message("确认同步题目状态", () => {
          addProcess(true, void 0, true);
        });
      }, { title: "如果不在同一个浏览器答题，会出现ac题目状态没有及时同步，可以使用此功能" });
      _GM_registerMenuCommand(`${initObj().onlyUrls ? "仅在收藏题单页面生效" : "所有题单生效"}`, () => {
        const u = initObj();
        u.onlyUrls = !u.onlyUrls;
        Container.style.display = support_plugins() ? "block" : "none";
        Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_solution__"], u);
      }, { title: "插件默认会在所有讨论发布页生效，如果只想在收藏链接生效，可以使用此功能" });
      _GM_registerMenuCommand(`添加本页`, () => {
        const urls = initUrls();
        let ok2 = false;
        let url = window.location.href;
        for (let info of urls) {
          if (!info || !(info == null ? void 0 : info.link)) {
            continue;
          }
          if (info.link.indexOf(url) != -1) {
            ok2 = true;
            break;
          }
        }
        if (ok2) {
          ElementPlus.ElMessage({
            message: "收藏失败,链接已经存在！",
            type: "error"
          });
        } else {
          if (isLeetCodeCircleUrl(url) && url.indexOf("view") != -1) {
            try {
              url = url.split("view")[0];
            } catch (e) {
              url = window.location.href;
            }
          }
          urls.unshift({
            title: document.title,
            link: url
          });
          Container.style.display = "block";
          Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_urls__"], urls);
          Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_update__"], true);
          Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_add_cur__"], true);
          ElementPlus.ElMessage({
            message: "收藏成功！刷新生效",
            type: "success"
          });
        }
      });
      VueApp.use(ElementPlus).mount(dom);
    }
  }
  run();
  startStopRanking();

})(Vue, ElementPlus);