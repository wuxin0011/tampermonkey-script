// ==UserScript==
// @name         0x3f-problem-solution
// @namespace    https://greasyfork.org/zh-CN/scripts/501134-0x3f-problem-solution
// @version      0.0.5.0
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

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const e=document.createElement("style");e.textContent=t,document.head.append(e)})(" h2[data-v-96f24e8f]{color:#000;margin:10px 0}em[data-v-96f24e8f]{color:red}h2[data-v-a8cfbf3e]{color:#000;margin:10px 0}p[data-v-a8cfbf3e]{text-decoration:underline;font-size:14px}em[data-v-a8cfbf3e]{color:red}.m-setting-button[data-v-2f60b425]{position:fixed;top:200px;right:0;z-index:100000}.m-button[data-v-2f60b425]{margin-left:16px!important;padding:5px!important;font-size:14px!important}.processs-flex[data-v-2f60b425]{display:flex;justify-content:center;align-items:center}.m-setting-button[data-v-6868725a]{position:fixed;top:200px;right:0;z-index:100000}.m-button[data-v-6868725a]{margin-left:16px!important;padding:5px!important;font-size:14px!important}.processs-flex[data-v-6868725a]{display:flex;justify-content:center;align-items:center} ");

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
  const isHttp = (url) => /^https?:\/\/.*$/.test(url);
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
    "__0x3f_problmes_ac_version__": "__0x3f_problmes_ac_version__",
    // TODO ac key version
    "__0x3f_problmes_all_problems__": "__0x3f_problmes_all_problems__",
    // all problems
    "__0x3f_problmes_random_problems_key__": "__0x3f_problmes_random_problems_key__",
    //随机题目快捷键
    "__0x3f_problmes_random_problems__": "__0x3f_problmes_random_problems__"
    //随机题目
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
    hiddenAc: false,
    showAcConfig: true
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
    for (let i = 0, u = null; Array.isArray(saveUrls) && i < saveUrls.length; i++) {
      try {
        u = saveUrls[i];
        if (u["select"] == void 0) u.select = true;
        if (u["title"] == void 0 || u["link"] == void 0) continue;
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
    if (deleteOk) {
      for (let i = 0; i < saveUrls[i]; i++) {
        delete saveUrls[i];
      }
      for (let info of infos) {
        saveUrls.push(info);
      }
    }
    return infos;
  }
  const initUrls = () => {
    let saveUrls = Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_update__"], true, Boolean.name) ? Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_urls__"], true, Array.name) : defaultUrls;
    return computeAcInfo(saveUrls);
  };
  const initObj = () => {
    let obj = Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_solution__"]) ? Object.assign(defaultObj, Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_solution__"])) : defaultObj;
    if (obj["showAcConfig"] == null || obj["showAcConfig"] == void 0) {
      obj.showAcConfig = true;
    }
    return obj;
  };
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
    { "title": "数学算法（数论/组合/概率期望/博弈/计算几何/随机算法", "link": "https://leetcode.cn/circle/discuss/IYT3ss/", "tot": 0, "ac": 0, "id": 1, "disabled": false, "select": true },
    { "title": "常用数据结构（前缀和/差分/栈/队列/堆/字典树/并查集/树状数组/线段树）", "link": "https://leetcode.cn/circle/discuss/mOr1u6/", "tot": 0, "ac": 0, "id": 2, "disabled": false, "select": true },
    { "title": "动态规划（入门/背包/状态机/划分/区间/状压/数位/树形/数据结构优化）", "link": "https://leetcode.cn/circle/discuss/tXLS3i/", "tot": 0, "ac": 0, "id": 3, "disabled": false, "select": true },
    { "title": "图论算法（DFS/BFS/拓扑排序/最短路/最小生成树/二分图/基环树/欧拉路径）", "link": "https://leetcode.cn/circle/discuss/01LUak/", "tot": 0, "ac": 0, "id": 4, "disabled": false, "select": true },
    { "title": "位运算（基础/性质/拆位/试填/恒等式/贪心/脑筋急转弯）", "link": "https://leetcode.cn/circle/discuss/dHn9Vk/", "tot": 0, "ac": 0, "id": 5, "disabled": false, "select": true },
    { "title": "网格图（DFS/BFS/综合应用)", "link": "https://leetcode.cn/circle/discuss/YiXPXW/", "tot": 0, "ac": 0, "id": 6, "disabled": false, "select": true },
    { "title": "单调栈（矩形面积/贡献法/最小字典序", "link": "https://leetcode.cn/circle/discuss/9oZFK9/", "tot": 0, "ac": 0, "id": 7, "disabled": false, "select": true },
    { "title": "二分算法（二分答案/最小化最大值/最大化最小值/第K小", "link": "https://leetcode.cn/circle/discuss/SqopEo/", "tot": 0, "ac": 0, "id": 8, "disabled": true, "select": true },
    { "title": "滑动窗口（定长/不定长/多指针", "link": "https://leetcode.cn/circle/discuss/0viNMK/", "tot": 0, "ac": 0, "id": 9, "disabled": false, "select": true },
    { "title": "贪心算法（基本贪心策略/反悔/区间/字典序/数学/思维/构造）", "link": "https://leetcode.cn/circle/discuss/g6KTKL/", "tot": 0, "ac": 0, "id": 10, "disabled": false, "select": true },
    { "title": "链表、二叉树与一般树（前后指针/快慢指针/DFS/BFS/直径/LCA）", "link": "https://leetcode.cn/circle/discuss/K0n2gO/", "tot": 0, "ac": 0, "id": 11, "disabled": false, "select": true },
    { "title": "字符串（KMP/Z函数/Manacher/字符串哈希/AC自动机/后缀数组/子序列自动机）", "link": "https://leetcode.cn/circle/discuss/SJFwQI/", "tot": 0, "ac": 0, "id": 12, "disabled": false, "select": true }
    // { 'title': '灵茶题单完成情况', 'link': 'https://leetcode.cn/u/endlesscheng/', 'tot': 0, 'ac': 0, 'id': 0x3f3f3f3f,'disabled':true,'select':false },
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
              {
                console.log("save local status :", cache[ID], "status = ", status, "get local status :", Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_ac_key__"])[ID]);
              }
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
    let uid = 0;
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
        uid++;
        createStatus(status, cur);
      }
    }
    {
      console.log("cache num :", uid, ",tot:", A.length);
    }
    getProcess();
    if (reload) {
      let cnt = 10;
      let timeId = setInterval(() => {
        Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_ac_key__"], cache);
        getProcess();
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
      {
        console.log("ID:", ID, "query status: ", cache[ID]);
      }
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
    {
      console.log("update", thisLink, "status", status);
    }
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
  function deleteAllACCountKeys() {
    let urls = initUrls();
    let keys = [];
    for (let urlInfo of urls) {
      let key = getAcCountKey(urlInfo.link);
      Cache$1.remove(key);
      keys.push(key);
    }
    Cache$1.remove(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_ac_key__"]);
    return keys;
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
  function getRandomInfo(array) {
    if (!Array.isArray(array)) return [];
    return array[Math.floor(Math.random() * array.length)];
  }
  async function randomProblem() {
    let allProbmems = Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_all_problems__"], true, Array.name);
    if (!Array.isArray(allProbmems) || allProbmems.length == 0) {
      let response = await getProblemsJSON();
      if (Array.isArray(response)) {
        allProbmems = [...response];
        Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_all_problems__"], [...response]);
      }
    }
    let config = initObj();
    let urlsData = initUrls();
    let set = /* @__PURE__ */ new Set();
    for (let info of urlsData) {
      if (info.link && info.select) {
        set.add(info.link);
      }
    }
    let infos = [];
    let acMap = Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_ac_key__"], true, Object.name);
    {
      console.log("config and set", config, set);
    }
    for (let info of allProbmems) {
      if (set.has(info == null ? void 0 : info.problemUrl)) {
        {
          console.log("info=>", info.problemUrl, info.title);
        }
        for (let i = 0; Array.isArray(info.problems) && i < info.problems.length; i++) {
          try {
            let { title, url, member, score, titleSlug } = info.problems[i];
            if (!config.showAcConfig && acMap[url] == "ac") {
              continue;
            }
            console.log("config.visiableMember && member", !config.visiableMember && member, config.visiableMember, member);
            if (!config.visiableMember && member) {
              continue;
            }
            if (score != 0 && (score < config.min || score > config.max)) {
              continue;
            }
            infos.push({ title, url, member, score, titleSlug });
          } catch (e) {
            console.log("error", e);
          }
        }
      }
    }
    {
      console.log("filter infos = ", infos);
    }
    let data = getRandomInfo(infos);
    {
      console.log("randomInfo : ", data);
    }
    if ((data == null ? void 0 : data.url) && (data == null ? void 0 : data.title)) {
      ElementPlus.ElMessage({
        dangerouslyUseHTMLString: true,
        type: "success",
        message: `<div>随机题目☕：&nbsp;<a href="${data.url}" target="_blank" style="color:#5d99f2;">${data.title}</a> ${(data == null ? void 0 : data.score) && (data == null ? void 0 : data.score) > 0 ? `&nbsp;分值${data.score}` : ""}</div>`,
        duration: 6e3
      });
    } else {
      ElementPlus.ElMessage({
        type: "error",
        message: `没有符合条件的题目，请重新配置条件`,
        duration: 3e3
      });
    }
  }
  async function GetHubJSONInfo(url) {
    return fetch(url, {
      method: "get",
      mode: "cors"
    }).then((res) => res.json());
  }
  async function getProblemsJSON() {
    return GetHubJSONInfo("https://raw.githubusercontent.com/wuxin0011/tampermonkey-script/main/0x3f-leetcode/0x3f.json");
  }
  async function PostLeetCodeApi(data) {
    return fetch("https://leetcode.cn/graphql/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((res) => res.json());
  }
  async function getProblemAcInfo(titleSlug) {
    return PostLeetCodeApi(postData(titleSlug));
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$1 = {};
  const _hoisted_1$1 = /* @__PURE__ */ vue.createStaticVNode("<h2 data-v-96f24e8f> 1. 为什么部分题单出现统计数量为 <em data-v-96f24e8f> 0 </em> 情况 ? </h2><p data-v-96f24e8f>防止一次性访问题单太多，对服务器产生压力，所以采用单个题单访问然后保存状态 , 这样避免访问量问题</p><p data-v-96f24e8f>默认情况下会缓存访问的题单情况，对于没有访问的题单，可以手动在对应题单中同步</p><h2 data-v-96f24e8f> 2、题单有时候会出现不同步 </h2><p data-v-96f24e8f>这个没啥问题，题目状态根据用户提交题目情况会实时更新，只会在提交访问一次</p><h2 data-v-96f24e8f> 3、 如何使用随机题目？ </h2><p data-v-96f24e8f>这个可以根据自己喜好来配置，配置好之后，可以使用 <em data-v-96f24e8f> ctrl + alt + j </em> 触发 </p><h2 data-v-96f24e8f> 4、反馈 </h2>", 8);
  function _sfc_render(_ctx, _cache) {
    const _component_el_link = vue.resolveComponent("el-link");
    return vue.openBlock(), vue.createElementBlock("div", null, [
      _hoisted_1$1,
      vue.createElementVNode("p", null, [
        vue.createTextVNode("你可以"),
        vue.createVNode(_component_el_link, {
          underline: false,
          href: "https://greasyfork.org/zh-CN/scripts/501134-0x3f-problem-solution/feedback",
          type: "primary",
          target: "_blank"
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode("点击")
          ]),
          _: 1
        }),
        vue.createTextVNode("这里反馈 ，或者访问 github 提一个 "),
        vue.createVNode(_component_el_link, {
          target: "_blank",
          underline: false,
          href: "https://github.com/wuxin0011/tampermonkey-script/issues",
          type: "primary"
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode("issues")
          ]),
          _: 1
        })
      ])
    ]);
  }
  const Q1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-96f24e8f"]]);
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
  const _hoisted_1 = { class: "dialog-footer" };
  const _hoisted_2 = { class: "processs-flex" };
  const _hoisted_3 = { style: { "text-align": "center", "color": "#121212" } };
  const TARGET_URL = "https://leetcode.cn/u/endlesscheng/";
  const formLabelWidth = "44px";
  const _sfc_main = {
    __name: "App",
    setup(__props) {
      const sortType = vue.ref(0);
      const tableButtonSize = vue.ref("default");
      let tableData = vue.reactive(initUrls());
      const keywords = vue.ref("");
      const dialogTableVisible = vue.ref(false);
      const showAddLocalButton = vue.computed(() => isLeetCodeCircleUrl());
      let urlsData = vue.computed(() => {
        let infos = tableData.filter((info2) => info2 && (info2.title && info2.title.indexOf(keywords.value) != -1 || info2.link && info2.link.indexOf(keywords.value) != -1));
        let tot = 0, ac = 0;
        for (let i = 0, c = info.length; i < infos.length; i++) {
          let info2 = infos[i];
          if (info2["ac"] && info2["tot"]) {
            tot += info2["tot"];
            ac += info2["ac"];
          }
          if (!info2["id"]) {
            info2["id"] = c + 1;
            c++;
          }
        }
        let type = sortType.value;
        if (type == 0) {
          infos.sort((info1, info2) => info2.id - info1.id);
        } else if (type == 1) {
          infos.sort((info1, info2) => info2.tot - info1.tot);
        } else if (type == 2) {
          infos.sort((info1, info2) => info2.ac - info1.ac);
        } else if (type == 3) {
          infos.sort((info1, info2) => computeProcess(info2.ac, info2.tot) - computeProcess(info1.ac, info1.tot));
        }
        infos.unshift({ "title": "灵茶题单完成情况", "link": TARGET_URL, "tot": tot, "ac": ac, "id": 67108863 });
        return infos;
      });
      const rowIsDisabled = vue.computed(() => (info2) => info2 && info2.link == TARGET_URL);
      const isDisabbled = vue.computed(() => !!tableData.find((v) => (v == null ? void 0 : v.link) && (v == null ? void 0 : v.link.indexOf(window.location.href)) != -1));
      const dialogFormVisible = vue.ref(false);
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
      const processColors = [
        { color: "#f56c6c", percentage: 20 },
        { color: "#1989fa", percentage: 40 },
        { color: "#e6a23c", percentage: 60 },
        { color: "#6f7ad3", percentage: 80 },
        { color: "#67c23a", percentage: 100 }
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
        tableData.unshift({ title: document.title, link: window.location.href, "ac": cur, "tot": tot, "id": tableData.length + 10 });
      };
      const updateIndex = vue.ref(-1);
      const handlerProblems = (status, updateInfo = { title: "", link: "", id: 0 }, index = -1) => {
        dialogFormVisible.value = true;
        info.status = status;
        updateIndex.value = updateInfo.id;
        Object.assign(info, updateInfo);
      };
      const handlerMessage = (u, title, link) => {
        const a = u ? "添加" : "修改";
        const error = !(!!title && isHttp(link));
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
          tableData.unshift({ title: info.title, link: info.link, "ac": 0, "tot": 0, "id": tableData.length + 10 });
        } else {
          let id = updateIndex.value;
          for (let i = 0; i < tableData.length; i++) {
            if (tableData[i]["id"] == id) {
              tableData[i]["title"] = info.title;
              tableData[i]["link"] = info.link;
              break;
            }
          }
        }
        dialogFormVisible.value = false;
      };
      const deleteProblems = (id) => {
        for (let i = 0; i < tableData.length; i++) {
          if (tableData[i]["id"] == id) {
            delete tableData[i];
            break;
          }
        }
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
        }
        window.addEventListener("storage", (e) => {
          watchLinkStatusUpdate(e);
        });
      });
      _GM_registerMenuCommand(`题单配置信息🛠`, () => {
        dialogTableVisible.value = !dialogTableVisible.value;
      }, { title: "AC标记安装位置，默认左侧，刷新生效" });
      const selectHandlerChange = (row) => {
        let infos = [];
        for (let i = 0; i < urlsData.value.length; i++) {
          if (urlsData.value[i]["link"] == TARGET_URL) continue;
          infos.push(vue.toRaw(Object.assign({}, urlsData.value[i])));
        }
        for (let i = 0; i < tableData.length; i++) {
          if (row.id == tableData[i].id) {
            tableData[i].select = row.select;
            break;
          }
        }
        Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_urls__"], infos);
      };
      const asyncButtonLoad = vue.ref(false);
      const showProcess = vue.ref(false);
      const allProblemNum = vue.ref(0);
      const asyncProblemNum = vue.ref(0);
      const asyncVisableDialog = vue.ref(false);
      const showProblemsProcessInfo = vue.reactive({
        title: "",
        link: "",
        cnt: "",
        ac: "",
        id: "",
        select: true
      });
      const showProblemsInfo = (info2 = {}) => {
        asyncVisableDialog.value = !asyncVisableDialog.value;
        Object.assign(showProblemsProcessInfo, info2);
      };
      const loadProcess = vue.computed(() => computeProcess(asyncProblemNum.value, allProblemNum.value));
      const asyncProblemStatus = async (row = {}) => {
        if (!(row == null ? void 0 : row.link)) return;
        let callback = async () => {
          var _a, _b, _c;
          let rowData = void 0;
          let asyncAll = (row == null ? void 0 : row.link) == TARGET_URL;
          let cache = Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_ac_key__"], true, Object.name);
          let map = /* @__PURE__ */ new Map();
          try {
            for (let info2 of tableData) {
              if (rowData == void 0 && info2.id == row.id) {
                rowData = info2;
              }
              map.set(info2.link, info2);
            }
            if (rowData) {
              rowData.loading = true;
            }
            asyncButtonLoad.value = true;
            allProblemNum.value = 0;
            asyncProblemNum.value = 0;
            showProcess.value = true;
            let jsonInfo = await getProblemsJSON();
            if (!Array.isArray(jsonInfo)) {
              jsonInfo = Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_all_problems__"], true, Array.name);
            } else {
              Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_all_problems__"], jsonInfo);
            }
            let datas = [];
            for (let i = 0; Array.isArray(jsonInfo) && i < jsonInfo.length; i++) {
              let key = `${jsonInfo[i].problemUrl}`;
              let origin = map.get(key);
              if (asyncAll) {
                for (let p of jsonInfo[i].problems) {
                  datas.push(Object.assign({ "origin": jsonInfo[i].problemUrl }, p));
                }
                if (origin) {
                  origin.tot = Math.max(jsonInfo[i].problems.length, (origin == null ? void 0 : origin.tot) ?? 0);
                  origin.ac = 0;
                }
              } else if (jsonInfo[i].problemUrl == row.link) {
                for (let p of jsonInfo[i].problems) {
                  datas.push(Object.assign({ "origin": jsonInfo[i].problemUrl }, p));
                }
                if (origin) {
                  origin.tot = Math.max(jsonInfo[i].problems.length, (origin == null ? void 0 : origin.tot) ?? 0);
                  origin.ac = 0;
                }
                break;
              }
            }
            if (Array.isArray(datas) && datas.length > 0) {
              allProblemNum.value = datas.length;
              asyncProblemNum.value = 0;
              for (let info2 of datas) {
                let ID = info2.titleSlug;
                let key = `${info2.origin}`;
                let origin = map.get(key);
                if (cache[ID] != "ac") {
                  let response = await getProblemAcInfo(ID);
                  const status = (_b = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.question) == null ? void 0 : _b.status;
                  cache[ID] = status == null ? "null" : status;
                }
                if (origin) {
                  if (cache[ID] == "ac") {
                    origin.ac = origin.ac + 1;
                  }
                }
                asyncProblemNum.value += 1;
              }
            }
          } catch (e) {
            console.log("error", e);
          } finally {
            if (rowData) {
              rowData.loading = false;
            }
            asyncButtonLoad.value = false;
            for (let i = 0; i < tableData.length; i++) {
              if (getAcCountKey((_c = tableData[i]) == null ? void 0 : _c.link)) {
                Cache$1.set(getAcCountKey(tableData[i].link), { "tot": tableData[i].tot, "ac": tableData[i].ac });
              }
            }
            Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_urls__"], vue.toRaw(tableData));
            Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_ac_key__"], Object.assign({}, cache));
            ElementPlus.ElMessage({
              type: "success",
              message: `同步完成🥰`,
              duration: 3e3
            });
            setTimeout(() => {
              allProblemNum.value = 0;
              asyncProblemNum.value = 0;
              showProcess.value = false;
            }, 5e3);
          }
        };
        if (row.link == TARGET_URL) {
          Message("该操作将同步所有题单，耗时可能较长 确认操作?", callback);
        } else {
          callback();
        }
      };
      const q1 = vue.ref(false);
      vue.ref(false);
      return (_ctx, _cache) => {
        const _component_el_dialog = vue.resolveComponent("el-dialog");
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_form_item = vue.resolveComponent("el-form-item");
        const _component_el_form = vue.resolveComponent("el-form");
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_progress = vue.resolveComponent("el-progress");
        const _component_el_col = vue.resolveComponent("el-col");
        const _component_el_option = vue.resolveComponent("el-option");
        const _component_el_select = vue.resolveComponent("el-select");
        const _component_el_tooltip = vue.resolveComponent("el-tooltip");
        const _component_el_row = vue.resolveComponent("el-row");
        const _component_el_table_column = vue.resolveComponent("el-table-column");
        const _component_el_link = vue.resolveComponent("el-link");
        const _component_el_switch = vue.resolveComponent("el-switch");
        const _component_el_table = vue.resolveComponent("el-table");
        return vue.openBlock(), vue.createElementBlock("div", null, [
          vue.createVNode(_component_el_dialog, {
            modelValue: q1.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => q1.value = $event)
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(Q1)
            ]),
            _: 1
          }, 8, ["modelValue"]),
          vue.createVNode(_component_el_dialog, {
            modelValue: dialogFormVisible.value,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => dialogFormVisible.value = $event),
            title: `${info.status == "add" ? "添加" : "编辑"}`,
            width: "400"
          }, {
            footer: vue.withCtx(() => [
              vue.createElementVNode("div", _hoisted_1, [
                vue.createVNode(_component_el_button, {
                  onClick: _cache[3] || (_cache[3] = ($event) => dialogFormVisible.value = false)
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("取消")
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_el_button, { onClick: addOrUpdate }, {
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
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => info.title = $event),
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
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => info.link = $event),
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
          }, 8, ["modelValue", "title"]),
          vue.createVNode(_component_el_dialog, {
            modelValue: dialogTableVisible.value,
            "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => dialogTableVisible.value = $event),
            title: showProcess.value ? loadProcess.value < 100 ? `统计中...${asyncProblemNum.value}/${allProblemNum.value}` : "统计完成" : "题单信息",
            width: "60%"
          }, {
            default: vue.withCtx(() => [
              showProcess.value ? (vue.openBlock(), vue.createBlock(_component_el_progress, {
                key: 0,
                color: processColors,
                percentage: loadProcess.value,
                "stroke-width": 15,
                striped: "",
                "striped-flow": "",
                style: { "margin-bottom": "20px" },
                status: `${loadProcess.value == 100 ? "success" : ""}`
              }, null, 8, ["percentage", "status"])) : vue.createCommentVNode("", true),
              vue.createVNode(_component_el_row, { gutter: 10 }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_col, { span: 4 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_input, {
                        modelValue: keywords.value,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => keywords.value = $event),
                        placeholder: "请输入关键词过滤",
                        clearable: ""
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_col, { span: 20 }, {
                    default: vue.withCtx(() => [
                      showAddLocalButton.value ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                        key: 0,
                        plain: "",
                        onClick: addlocal,
                        disabled: isDisabbled.value,
                        size: tableButtonSize.value
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(" 添加本页 ")
                        ]),
                        _: 1
                      }, 8, ["disabled", "size"])) : vue.createCommentVNode("", true),
                      showAddLocalButton.value ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                        key: 1,
                        plain: "",
                        onClick: _cache[6] || (_cache[6] = ($event) => handlerProblems("add")),
                        size: tableButtonSize.value
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(" 自定义 ")
                        ]),
                        _: 1
                      }, 8, ["size"])) : vue.createCommentVNode("", true),
                      vue.createVNode(_component_el_select, {
                        modelValue: sortType.value,
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => sortType.value = $event),
                        style: { "margin": "0 5px", "width": "100px" },
                        disabled: asyncButtonLoad.value
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_option, {
                            label: "默认排序",
                            value: 0
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("默认排序")
                            ]),
                            _: 1
                          }),
                          vue.createVNode(_component_el_option, {
                            label: "题目数量",
                            value: 1
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("题目数量")
                            ]),
                            _: 1
                          }),
                          vue.createVNode(_component_el_option, {
                            label: "AC数量",
                            value: 2
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("AC数量")
                            ]),
                            _: 1
                          }),
                          vue.createVNode(_component_el_option, {
                            label: "完成度",
                            value: 3
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("完成度")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "disabled"]),
                      vue.createVNode(_component_el_tooltip, { content: "同步所有题单" }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_button, {
                            type: "danger",
                            onClick: _cache[8] || (_cache[8] = ($event) => asyncProblemStatus({ "link": "https://leetcode.cn/u/endlesscheng/" })),
                            size: tableButtonSize.value,
                            loading: asyncButtonLoad.value
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(vue.toDisplayString(asyncButtonLoad.value ? "同步中" : "同步题单"), 1)
                            ]),
                            _: 1
                          }, 8, ["size", "loading"])
                        ]),
                        _: 1
                      }),
                      vue.createVNode(_component_el_tooltip, { content: "随机一道灵茶题单中题目,快捷键 Ctrl + Alt + J 可以触发" }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_button, {
                            type: "primary",
                            text: "",
                            onClick: vue.unref(randomProblem),
                            size: tableButtonSize.value
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(" 随机题目 ")
                            ]),
                            _: 1
                          }, 8, ["onClick", "size"])
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
                  vue.createVNode(_component_el_table_column, { type: "index" }),
                  vue.createVNode(_component_el_table_column, {
                    label: "标题",
                    width: "auto",
                    align: "center"
                  }, {
                    default: vue.withCtx((scope) => [
                      vue.createVNode(_component_el_link, {
                        disabled: rowIsDisabled.value(scope.row),
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
                    label: "随机",
                    width: "70",
                    align: "center"
                  }, {
                    default: vue.withCtx((scope) => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: scope.row.select,
                        "onUpdate:modelValue": ($event) => scope.row.select = $event,
                        onChange: ($event) => selectHandlerChange(scope.row),
                        disabled: rowIsDisabled.value(scope.row),
                        size: "small"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange", "disabled"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_table_column, {
                    label: "AC",
                    width: "70",
                    align: "center"
                  }, {
                    default: vue.withCtx((scope) => [
                      vue.createVNode(_component_el_link, {
                        type: "success",
                        underline: false,
                        onClick: ($event) => showProblemsInfo(scope.row)
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(vue.toDisplayString(isNaN(scope.row.ac) ? 0 : scope.row.ac), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_table_column, {
                    label: "Total",
                    width: "70",
                    align: "center"
                  }, {
                    default: vue.withCtx((scope) => [
                      vue.createVNode(_component_el_link, {
                        type: "primary",
                        underline: false,
                        onClick: ($event) => showProblemsInfo(scope.row)
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(vue.toDisplayString(isNaN(scope.row.tot) ? 0 : scope.row.tot), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_table_column, {
                    label: "进度",
                    width: "70",
                    align: "center"
                  }, {
                    default: vue.withCtx((scope) => [
                      vue.createVNode(_component_el_link, {
                        onClick: ($event) => showProblemsInfo(scope.row),
                        type: "warning",
                        underline: false
                      }, {
                        default: vue.withCtx(() => {
                          var _a, _b, _c;
                          return [
                            vue.createTextVNode(vue.toDisplayString(((_a = scope == null ? void 0 : scope.row) == null ? void 0 : _a.tot) == 0 ? 0 : `${computeProcess((_b = scope == null ? void 0 : scope.row) == null ? void 0 : _b.ac, (_c = scope == null ? void 0 : scope.row) == null ? void 0 : _c.tot)}%`), 1)
                          ];
                        }),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_table_column, {
                    label: "操作",
                    width: "200px",
                    align: "center"
                  }, {
                    default: vue.withCtx((scope) => [
                      vue.createVNode(_component_el_button, {
                        loading: scope.row.loading,
                        onClick: ($event) => asyncProblemStatus(scope.row),
                        size: "small",
                        type: "success",
                        disabled: rowIsDisabled.value(scope.row),
                        link: ""
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("同步")
                        ]),
                        _: 2
                      }, 1032, ["loading", "onClick", "disabled"]),
                      vue.createVNode(_component_el_button, {
                        onClick: ($event) => handlerProblems("update", scope.row, scope.$index),
                        size: "small",
                        type: "primary",
                        disabled: rowIsDisabled.value(scope.row),
                        link: ""
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("编辑")
                        ]),
                        _: 2
                      }, 1032, ["onClick", "disabled"]),
                      vue.createVNode(_component_el_button, {
                        onClick: ($event) => deleteProblems(scope.row.id),
                        size: "small",
                        type: "danger",
                        link: "",
                        disabled: rowIsDisabled.value(scope.row)
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode("删除")
                        ]),
                        _: 2
                      }, 1032, ["onClick", "disabled"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["data"]),
              vue.createVNode(_component_el_row, {
                gutter: 10,
                style: { "margin": "10px 0" }
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_col, { span: 6 }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(" 会员  "),
                      vue.createVNode(_component_el_tooltip, { content: "过滤会员题目，会员题不会出现在随机题目中，默认过滤" }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_switch, {
                            modelValue: fromData.visiableMember,
                            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => fromData.visiableMember = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      vue.createTextVNode(" ac  "),
                      vue.createVNode(_component_el_tooltip, { content: "过滤AC的题目,AC题目出现在随机题目中，默认不过滤" }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_switch, {
                            modelValue: fromData.showAcConfig,
                            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => fromData.showAcConfig = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_col, { span: 10 }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("   "),
                      vue.createVNode(_component_el_tooltip, { content: "随机题目将会随机在这个区间中的题目" }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_link, {
                            underline: false,
                            type: "primary"
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode("分数区间")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      vue.createTextVNode("   "),
                      vue.createVNode(_component_el_input, {
                        modelValue: fromData.min,
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => fromData.min = $event),
                        "aria-placeholder": "",
                        placeholder: " min  ",
                        style: { "width": "60px" }
                      }, null, 8, ["modelValue"]),
                      vue.createTextVNode("- "),
                      vue.createVNode(_component_el_input, {
                        modelValue: fromData.max,
                        "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => fromData.max = $event),
                        "aria-placeholder": "",
                        placeholder: " max",
                        style: { "width": "60px" }
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_col, { span: 8 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_tooltip, { content: "重置题单" }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_button, {
                            plain: "",
                            onClick: handlerDefault,
                            size: tableButtonSize.value,
                            disabled: showProcess.value
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(" 默认 ")
                            ]),
                            _: 1
                          }, 8, ["size", "disabled"])
                        ]),
                        _: 1
                      }),
                      showAddLocalButton.value ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                        key: 0,
                        plain: "",
                        onClick: _cache[13] || (_cache[13] = ($event) => q1.value = !q1.value),
                        size: tableButtonSize.value
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(" 使用说明 ")
                        ]),
                        _: 1
                      }, 8, ["size"])) : vue.createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue", "title"]),
          vue.createVNode(_component_el_dialog, {
            modelValue: asyncVisableDialog.value,
            "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => asyncVisableDialog.value = $event),
            width: "35%"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("p", null, [
                vue.createVNode(_component_el_link, {
                  href: showProblemsProcessInfo.link,
                  type: "info",
                  underline: false
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(showProblemsProcessInfo.title), 1)
                  ]),
                  _: 1
                }, 8, ["href"])
              ]),
              vue.createElementVNode("div", _hoisted_2, [
                vue.createVNode(_component_el_progress, {
                  type: "circle",
                  percentage: computeProcess(showProblemsProcessInfo.ac, showProblemsProcessInfo.tot),
                  color: processColors
                }, {
                  default: vue.withCtx(({ percentage }) => [
                    vue.createElementVNode("p", null, vue.toDisplayString(percentage) + "%", 1)
                  ]),
                  _: 1
                }, 8, ["percentage"])
              ]),
              vue.createElementVNode("p", _hoisted_3, vue.toDisplayString(showProblemsProcessInfo.ac) + " / " + vue.toDisplayString(showProblemsProcessInfo.tot), 1)
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]);
      };
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2f60b425"]]);
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
  function watchDom(dom2) {
    if (!(dom2 instanceof HTMLElement)) {
      return;
    }
    let m = new MutationObserver(() => {
      if (submitCnt % 2 == 1) {
        submitProblems(local_url);
      }
      submitCnt++;
    });
    m.observe(dom2, {
      childList: true,
      attributes: true
    });
  }
  const randomProblemKey = () => Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_random_problems_key__"]) == void 0 ? true : Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_random_problems_key__"]);
  let Container = null;
  Cache$1.get(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_button_is_none__"], true, Boolean.name);
  const start = () => {
    Container = document.createElement("div");
    const body = document.querySelector("body");
    body.append(Container);
    Container.style.display = "block";
    return Container;
  };
  let dom = start();
  const VueApp = vue.createApp(App);
  VueApp.use(ElementPlus).mount(dom);
  if (isProblem() || isLeetCodeCircleUrl()) {
    _GM_registerMenuCommand(`随机一道题 ☕`, randomProblem, { title: "随机一道题目，你可以通过ctrl+atl+j显示一道题目" });
    _GM_registerMenuCommand(`${randomProblemKey() ? "关闭" : "启用"} 随机题目快捷键 ☕`, () => {
      Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_random_problems_key__"], !randomProblemKey());
      window.location.reload();
    }, { title: "该功能是随机一道题的快捷键，你可以通过ctrl+atl+j显示一道题目" });
    if (randomProblemKey()) {
      document.addEventListener("keydown", async function(event) {
        if (event.ctrlKey && event.altKey && event.key === "j") {
          randomProblem();
        }
      });
    }
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
      _GM_registerMenuCommand(`安装到${install_pos() ? "右侧" : "左侧"} 🎁`, () => {
        Cache$1.set(__0X3F_PROBLEM_KEYS__["__0x3f_problmes_insert_pos__"], install_pos());
        window.location.reload();
      }, { title: "AC标记安装位置，默认左侧，刷新生效" });
      _GM_registerMenuCommand(`清空题目状态缓存 🚀`, () => {
        Message("确认清空题目状态缓存", () => {
          deleteAllACCountKeys();
          window.location.reload();
        });
      }, { title: "如果题目状态出现问题，可以试试,一般情况下不建议使用" });
      _GM_registerMenuCommand(`同步题目状态 🚀`, () => {
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
        let ok = false;
        let url = window.location.href;
        for (let info of urls) {
          if (!info || !(info == null ? void 0 : info.link)) {
            continue;
          }
          if (info.link.indexOf(url) != -1) {
            ok = true;
            break;
          }
        }
        if (ok) {
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
    }
  }
  run();
  startStopRanking();

})(Vue, ElementPlus);