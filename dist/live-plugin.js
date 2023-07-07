// ==UserScript==
// @name         直播插件
// @namespace    https://github.com/wuxin0011/huya-live
// @version      4.0.2
// @author       wuxin0011
// @description  虎牙、斗鱼，哔哩哔哩 页面简化，屏蔽主播
// @license      MIT
// @icon         https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/picgo/icon.png
// @source       https://github.com/wuxin0011/huya-live
// @supportURL   https://github.com/wuxin0011/huya-live/issues
// @match        https://*.douyu.com/*
// @match        https://*.huya.com/*
// @match        https://*.bilibili.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  const douyu_address_pattern = /^https:\/\/.*\.douyu\.((com)|(cn)).*/;
  const bilibili_address_pattern = /^https:\/\/.*\.bilibili\..*/;
  const huya_address_pattern = /^https:\/\/.*\.huya\.((com)|(cn)).*/;
  const localhost = /^http:\/\/127\.0\.0\.1\.*|^http:\/\/localhost.*/;
  const local_url = window.location.href;
  const is_huya = huya_address_pattern.test(local_url);
  const is_douyu = douyu_address_pattern.test(local_url);
  const is_bilibili = bilibili_address_pattern.test(local_url);
  const is_localhost = localhost.test(local_url);
  const wd = window.document;
  const wls = window.localStorage;
  const download_plugin_url = "https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD";
  const source_code_url = "https://github.com/wuxin0011/huya-live";
  const isImage = (file) => /.*(\.(png|jpg|jpeg|apng|avif|bmp|gif|ico|cur|svg|tiff|webp))$/.test(file);
  const querySelector = (el, sel) => !!el && el instanceof HTMLElement ? el.querySelector(sel) : wd.querySelector(el);
  const querySelectorAll = (el, sel) => !!el && el instanceof HTMLElement ? el.querySelectorAll(sel) : wd.querySelectorAll(el);
  const addEventListener = (el, type, callback) => !!el && el instanceof HTMLElement && type && typeof callback === "function" && el.addEventListener(type, callback, false);
  const createElement = (tag) => !!tag && wd.createElement(tag);
  const appendChild = (el1, el2) => !!el1 && !!el2 && el1 instanceof HTMLElement && el2 instanceof HTMLElement && el1.appendChild(el2);
  const insertChild = (el1, el2) => !!el1 && !!el2 && el1 instanceof HTMLElement && el2 instanceof HTMLElement && el1.insertBefore(el2, el1.firstChild);
  const addStyle = (str) => {
    if ((window == null ? void 0 : window.GM_addStyle) && typeof window.GM_addStyle == "function") {
      window.GM_addStyle(str);
    } else {
      let head = querySelector("head");
      let style = createElement("style");
      style.innerText = str;
      head.appendChild(style);
    }
  };
  const removeDOM = (element, realRemove = false) => {
    try {
      if (!(element instanceof HTMLElement)) {
        element = querySelector(element);
      }
      if (element instanceof HTMLElement) {
        element.style.display = "none";
        if (realRemove) {
          element.remove();
        }
      }
    } catch (e) {
      log(e, "error");
    }
  };
  const s2d = (string) => new DOMParser().parseFromString(string, "text/html").body.childNodes[0];
  const isArray = (a) => a && (a == null ? void 0 : a.length) > 0;
  const timeoutSelectorAll = (selector, callback, time = 0) => {
    setTimeout(() => {
      const nodes = querySelectorAll(selector);
      if (isArray(nodes) && typeof callback === "function") {
        callback(nodes);
      }
    }, time);
  };
  const timeoutSelector = (selector, callback, time = 0) => {
    setTimeout(() => {
      const logoNode = querySelector(selector);
      if (logoNode && typeof callback === "function") {
        callback(logoNode);
      }
    }, time);
  };
  const getLocalStore = (k, type = Array.name, isParse = true) => {
    let obj = wls.getItem(k);
    if (type === Array.name) {
      if (isParse && obj) {
        obj = JSON.parse(obj);
      }
      return Array.isArray(obj) ? obj : [];
    }
    if (type === Object.name) {
      if (isParse && obj) {
        obj = JSON.parse(obj);
      }
      return obj ? obj : {};
    }
    if (type === String.name) {
      return obj ? obj : "";
    }
    if (type === Boolean.name) {
      return obj === "true" || obj === true;
    }
    return obj;
  };
  const addLocalStore = (k, v = [], type = Array.name, isParse = true) => (type == Object.name || type == Array.name) && isParse ? wls.setItem(k, JSON.stringify(v)) : wls.setItem(k, v);
  const removeVideo = (selector, time1 = 100, maxCount = 1e3) => {
    let count = 0;
    let video_timer = setInterval(() => {
      try {
        const video = querySelector(selector);
        if (video && video instanceof HTMLVideoElement) {
          video.pause();
        }
        removeDOM(video, false);
        if (count >= maxCount) {
          clearInterval(video_timer);
        }
        count = count + 1;
      } catch (e) {
      }
    }, time1);
  };
  const throttle = (wait, func, ...args) => {
    let pre = Date.now();
    return () => {
      if (Date.now() - pre > wait) {
        func(...args);
        pre = Date.now();
      }
    };
  };
  const intervalRemoveElement = (selectors, time = 160, maxCount = 1e3) => {
    if (!isArray(selectors)) {
      log(`selectors 必须是数组 : ${selectors}`, "warn");
      return;
    }
    let count = 0;
    let timer = setInterval(() => {
      selectors.forEach((sel) => {
        removeDOM(sel, true);
      });
      if (count >= maxCount) {
        clearInterval(timer);
        return;
      }
      count = count + 1;
    }, time);
  };
  const loopDo = (callback, count = 100, wait = 100) => {
    let timer = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(timer);
      } else {
        callback(timer);
      }
    }, wait);
  };
  const backgroundNone = (element, selectors = [".layout-Main"], time = 100, maxCount = 500) => {
    if (!(element instanceof HTMLElement) || !isArray(selectors)) {
      return;
    }
    let count = 0;
    let timer = setInterval(() => {
      selectors.forEach((sel) => {
        let b = querySelector(element, sel);
        if (!(b instanceof HTMLElement)) {
          return;
        }
        b.style.backgroundImage = "none";
      });
      if (count >= maxCount) {
        clearInterval(timer);
        return;
      }
      count = count + 1;
    }, time);
  };
  const hasVideo = (element, selector = ".layout-Main") => !!querySelector(element, selector);
  const uploadImage = (file, callback) => {
    try {
      if (!isImage(file == null ? void 0 : file.name)) {
        return alert("图片格式不正确！");
      }
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onerror = (e) => {
        return alert("图片解析失败！" + JSON.stringify(e));
      };
      fileReader.onload = (e) => {
        let base64 = e.target.result;
        let str = base64.slice(base64.indexOf(",") + 1);
        if (atob) {
          str = atob(str);
          let bytes = str.length;
          const size = (bytes / (1024 * 1024)).toFixed(2);
          if (size > 5) {
            if (confirm("图片保存失败，浏览器最大只能保存5MB大小图片，确认查看原因？")) {
              window.location.href = "https://developer.mozilla.org/zh-CN/docs/Web/API/File_and_Directory_Entries_API/Introduction";
            }
            return;
          }
          callback(base64);
        } else {
          alert("保存失败，当前浏览器不支持！");
        }
      };
    } catch (e) {
      alert("图片解析失败！");
    }
  };
  const findFullSreenButton = (sel = "body", key = "full_screen_button_class_or_id", text = "全屏", tagName = "div") => {
    var _a, _b;
    const container = querySelector(sel);
    if (container) {
      const nodes = querySelectorAll(container, tagName);
      if (isArray(nodes)) {
        for (let i = 0; i < nodes.length; i++) {
          if (((_a = nodes[i]) == null ? void 0 : _a.title) === text || ((_b = nodes[i]) == null ? void 0 : _b.textContent) === text) {
            let classId = `${sel} ${nodes[i].id ? nodes[i].id : nodes[i].class}`;
            addLocalStore(key, classId, String.name, false);
            return classId;
          }
        }
      }
    }
    return null;
  };
  const log = (msg, level = "log") => {
    const pre = "[ live-plugin tips ] :";
    msg = pre + msg;
    if (level === "info") {
      console.info(msg);
    } else if (level === "warn") {
      console.warn(msg);
    } else if (level === "error") {
      console.error(msg);
    } else {
      console.log(msg);
    }
  };
  class HostUser {
    constructor(roomId, name) {
      this.roomId = roomId;
      this.name = name;
    }
  }
  const getHtmlStr = (show1, show2, show3, show4, show5) => {
    if (is_bilibili || is_localhost) {
      return `<div class="m-container">
        <div class="m-container-box  m-type-container m-ani-left-is-active" id="m-container-box1">
          <div class="m-type-operation">
            <div class="m-type-item">
              <div class="m-type-item-left">
                <div class="m-select-option-container m-ani-left-is-active" id="m-select-option">
                  <div class="m-select">
                    <div class="m-select-item">
                      <input type="text" class="" placeholder="输入关键词过滤">
                    </div>
                    <div class="m-select-item">
                      <select class="m-tag-select">
                        <option value="" class="m-option-default">选择分类</option>
                        <option value="option1">选项1</option>
                      </select>
                    </div>
                    <div class="m-select-item">
                      <button class="btn btn-primary">
                        &check;
                      </button>
                    </div>
                    <div class="m-select-item">
                      <select class="m-tag-select" id="select-video-tag">
                        <option value="" class="m-option-default">选择标签</option>
                        <option value="option1">选项1</option>
                      </select>
                    </div>
                    <div class="m-select-item">
                      <button class="btn btn-primary">
                        &check;
                      </button>
                    </div>
                    <div class="m-select-item">
                      <button class="btn btn-warning" id="m-select-input-address">
                        &rightarrow;
                      </button>
                    </div>
                  </div>
                </div>
                <div class="m-select-input-container m-ani-right-is-close" id="m-select-input">
                  <div class="m-category-input-item">
                    <input type="text" class="m-category-input" placeholder="输入视频地址或者自定义类型">
                    <button class="btn btn-success">
                      搜索
                    </button>
                    <button class="btn btn-primary"> &check;</button>
                    <button class="btn btn-warning" id="m-select-input-select"> &leftarrow;</button>
                  </div>
                </div>
              </div>
              <div class="m-type-item-right">
                <button class="btn btn-danger" id="m-change-box1">房间</button>
                <button class="btn btn-info" id="m-close-button1">关闭</button>
              </div>
            </div>
            <div class="m-search-result">
              <!-- <span class="m-search-msg">分类:游戏 视频标签: 二次元 、原神</span> -->
            </div>
          </div>
          <table>
            <thead>
              <th>序号</th>
              <th>分类</th>
              <th>标签</th>
              <th>操作</th>
            </thead>
            <tbody>
  
            </tbody>
          </table>
        </div>
        <div class="m-container-box m-ani-right-is-close" id="m-container-box2">
          <div class="operation">
            <input type="text" placeholder="房间号或者名称...">
            <button class="btn btn-danger" id="m-change-box2">分类</button>
            <button class="btn btn-primary add-room" title="复制地址栏房间号，手动添加房间">添加</button>
            <button class="btn btn-success clear-room" title="重置表格数据">重置</button>
            <button class="btn btn-warning bg-btn" title="上传背景图">背景</button>
            <input type="file" id="file">
            <input type="checkbox" id="checkbox1" ${show1 ? "checked" : ""} class="checkbox" title="是否显示背景" />背景
            <input type="checkbox" id="checkbox2" ${show2 ? "checked" : ""} class="checkbox" title="是否显示左侧菜单" />菜单
            <input type="checkbox" id="checkbox3" ${show3 ? "checked" : ""} class="checkbox" title="自动全屏" />全屏
            <input type="checkbox" id="checkbox4" ${show4 ? "checked" : ""} class="checkbox" title="是否开启礼物" />礼物
            <input type="checkbox" id="checkbox5" ${show5 ? "checked" : ""} class="checkbox" title="关闭或者显示插件Logo" />logo
            <a class="m-link" href="https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD"
              target="_blank" title="更新、反馈">更新</a>
            <button class="btn btn-info btn-close-container" title="点击关闭">关闭</button>
          </div>
          <table>
            <thead>
              <th>序号</th>
              <th>名称</th>
              <th>房间号</th>
              <th>操作</th>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>`;
    } else {
      return `<div class="m-container">
        <div class="m-container-box" id="m-container-box2">
            <div class="operation">
                <input type="text" placeholder="房间号或者名称...">
                <button class="btn btn-primary add-room" title="复制地址栏房间号，手动添加房间">添加</button>
                <button class="btn btn-success clear-room" title="重置表格数据">重置</button>
                <button class="btn btn-warning bg-btn" title="上传背景图">背景</button>
                <input type="file" id="file">
                <input type="checkbox" id="checkbox1" ${show1 ? "checked" : ""} class="checkbox" title="是否显示背景" />背景
                <input type="checkbox" id="checkbox2" ${show2 ? "checked" : ""} class="checkbox" title="是否显示左侧菜单"/>菜单
                <input type="checkbox" id="checkbox3" ${show3 ? "checked" : ""} class="checkbox" title="自动全屏"/>全屏
                <input type="checkbox" id="checkbox4" ${show4 ? "checked" : ""} class="checkbox" title="显示礼物栏"/>礼物
                <input type="checkbox" id="checkbox5" ${show5 ? "checked" : ""} class="checkbox" title="关闭或者显示插件Logo"/>logo
                <a class="m-link" href="https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD" target="_blank" title="更新、反馈">更新</a>
                <button class="btn btn-info btn-close-container" title="关闭" >关闭</button>
            </div>
            <table>
                <thead>
                    <th>序号</th>
                    <th>名称</th>
                    <th>房间号</th>
                    <th>操作</th>
                </thead>
                <tbody>
                </tbody>
            </table>
            </div>
     </div>`;
    }
  };
  class LivePlugin {
    constructor() {
      this.key = "key";
      this.bg_key = "bg_key";
      this.video_player_container = ".room-player-wrap";
      this.bg_show_key = "bg_show_key";
      this.menu_show_key = "menu_show_key";
      this.full_screen_key = "full_screen_key";
      this.full_screen_class_or_id = "full_screen_button_class_or_id";
      this.full_button_tag_name = "div";
      this.full_screen_button = getLocalStore(this.full_screen_class_or_id, String.name, false);
      this.fullScreenText = "全屏";
      this.cancelFullText = "退出全屏";
      this.baseUrl = "http://127.0.0.1:8080";
      this.defaultBackgroundImage = "https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/picgo/bg5.jpg";
      this.users = getLocalStore(this.key, Array.name, true);
      this.menu = null;
      this.tbody = null;
      this.m_container = null;
      this.gift_key = this.key + "_gift";
      this.giftTool = null;
      this.logo_btn = null;
      this.logo_show_key = this.key + "_logo_show";
      this.header_logo = "none";
      this.buttonName = "";
      if (is_localhost) {
        this.init();
      }
    }
    // 初始化操作方法，子类可以继承该类，实现该类中空方法，参考此操作,初始化构造器实调用该方法就可以了。。。
    init() {
      if (!this.removeRoom()) {
        this.detail();
        this.common();
        this.index();
        this.category();
        this.create_container();
        this.isFullScreen();
        this.isShowLeftMenu();
        this.isShowGift();
      }
      this.settingBackgroundImage();
    }
    /*********************************建议下面操作方法必须重写的,并且参考此步骤*****************************/
    /**
     * 公共
     */
    common() {
    }
    /**
     * 首页
     */
    index() {
    }
    /**
     * 分类
     */
    category() {
    }
    /**
     * 详情
     */
    detail() {
    }
    /**
     * 点击房间名称操作
     */
    removeRoomByClickRoomName() {
    }
    /**
     * 通过房间号获取名称
     * @param roomId 房间号
     * @returns {null} name
     */
    getNameByRoomId(roomId) {
      alert("该操作未实现！");
      return null;
    }
    /**
     * 通过一个地址获取房间号
     * @param url 地址
     * @returns {null} 房间号
     */
    getRoomIdByUrl(url) {
      return null;
    }
    /*********************************子类继承无需修改的方法******************************/
    /**
     * 容器，所有操作容器均在此容器中，
     */
    create_container() {
      let that = this;
      let body = querySelector("body") ?? createElement("body");
      that.users = getLocalStore(that.key, Array.name);
      let show1 = getLocalStore(that.bg_show_key, Boolean.name);
      let show2 = getLocalStore(that.menu_show_key, Boolean.name);
      let show3 = getLocalStore(that.full_screen_key, Boolean.name);
      let show4 = getLocalStore(that.gift_key, Boolean.name);
      let show5 = getLocalStore(that.logo_show_key, Boolean.name);
      that.m_container = s2d(getHtmlStr(show1, show2, show3, show4, show5));
      appendChild(body, that.m_container);
      that.tbody = querySelector(that.m_container, "#m-container-box2 table tbody");
      that.operationDOMButton();
      that.createRoomItem(that.users);
      that.createButton();
    }
    /**
     * 通过用户列表构建列表
     * @param {Object} arr  用户列表
     */
    createRoomItem(arr) {
      if (!isArray(arr)) {
        return;
      }
      let that = this;
      arr.forEach((item, index) => {
        let tr = createElement("tr");
        tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.roomId}</td>
                <td><button class="btn btn-danger" room-id="${item.roomId}">删除</button></td>
                `;
        appendChild(that.tbody, tr);
        addEventListener(querySelector(tr, "button"), "click", function(e) {
          let roomId = e.target.getAttribute("room-id");
          that.userDelete(roomId);
          if (that.getRoomIdByUrl(local_url) === roomId) {
            window.location.reload();
          }
          removeDOM(tr, true);
        });
      });
    }
    /**
     * 绘制表格
     * @param {Object} arr 表格数据
     */
    resetTbody(arr) {
      if (!this.tbody) {
        return;
      }
      querySelectorAll(this.tbody, "tr").forEach((item) => removeDOM(item, true));
      this.createRoomItem(arr);
    }
    /**
     * 操作框容器
     */
    operationDOMButton() {
      let that = this;
      if (!that.m_container) {
        return;
      }
      const container = that.m_container;
      const inputValue = querySelector(container, ".operation input");
      addEventListener(inputValue, "input", () => {
        let arr = that.users.filter((item) => item.roomId && item.roomId.indexOf(inputValue.value) != -1 || item.name && item.name.indexOf(inputValue.value) != -1);
        that.resetTbody(arr);
      });
      const addRoomBtn = querySelector(container, ".operation button.add-room");
      addEventListener(addRoomBtn, "click", function() {
        const keywords = inputValue.value.trim();
        if (!keywords) {
          return alert("请输入房间号！");
        }
        if (!that.userIsExist(keywords)) {
          const name = that.getNameByRoomId(keywords);
          if (name) {
            that.addUser(keywords, name);
            inputValue.value = "";
          } else {
            if (confirm(`房间号为${keywords}的主播不存在！确定添加？`)) {
              that.addUser(keywords, keywords);
              inputValue.value = "";
            }
          }
        } else {
          alert("该主播已添加！");
        }
      });
      const clearRoomBtn = querySelector(container, ".operation button.clear-room");
      addEventListener(clearRoomBtn, "click", function() {
        if (confirm("确认重置？")) {
          that.users = [];
          for (let item of [that.key, that.bg_key, that.menu_show_key, that.gift_key, that.logo_show_key, that.full_screen_key]) {
            wls.removeItem(item);
          }
          that.resetTbody(that.users);
          window.location.reload();
        }
      });
      const uploadButton = querySelector(container, ".operation #file");
      addEventListener(uploadButton, "change", function(e) {
        const file = uploadButton.files[0] || null;
        uploadImage(file, (base64) => {
          addLocalStore(that.bg_key, base64, String.name, false);
          that.settingBackgroundImage(e.target.result);
        });
      });
      const upload = querySelector(container, ".operation .bg-btn");
      addEventListener(upload, "click", function(e) {
        uploadButton.click();
      });
      const close_container = querySelector(container, ".operation .btn-close-container");
      addEventListener(close_container, "click", function(e) {
        that.isShowContainer();
      });
      const close_container2 = querySelector(container, ".operation #m-close-button1");
      addEventListener(close_container2, "click", function(e) {
        that.isShowContainer();
      });
      const checkbox = querySelector(container, ".operation #checkbox1");
      addEventListener(checkbox, "change", function(e) {
        addLocalStore(that.bg_show_key, e.target.checked, Boolean.name);
        that.settingBackgroundImage();
      });
      const menu = querySelector(container, ".operation #checkbox2");
      addEventListener(menu, "change", function(e) {
        that.getLeftMenu(e.target.checked);
      });
      const full_screen_btn = querySelector(container, ".operation #checkbox3");
      addEventListener(full_screen_btn, "change", function(e) {
        addLocalStore(that.full_screen_key, e.target.checked, Boolean.name);
        that.isFullScreen(true);
      });
      const show_gitf = querySelector(container, ".operation #checkbox4");
      addEventListener(show_gitf, "change", function(e) {
        addLocalStore(that.gift_key, e.target.checked, Boolean.name);
        that.isShowGift();
      });
      const show_logo_btn = querySelector(container, ".operation #checkbox5");
      addEventListener(show_logo_btn, "change", function(e) {
        e.preventDefault();
        if (!that.logo_btn) {
          return alert("获取不到logo");
        }
        if (that.logo_btn.style.display === "block") {
          if (confirm("确认隐藏Logo？隐藏之后不再显示哦!如需显示logo，点击直播头部Logo即可显示")) {
            that.logo_btn.style.display = "none";
            addLocalStore(that.logo_show_key, false, Boolean.name);
          }
        } else {
          that.logo_btn.style.display = "block";
          addLocalStore(that.logo_show_key, true, Boolean.name);
        }
      });
      let box1 = querySelector(container, "#m-container-box1");
      let box2 = querySelector(container, "#m-container-box2");
      let change1 = querySelector(container, "#m-change-box1");
      let change2 = querySelector(container, "#m-change-box2");
      let select1 = querySelector(
        container,
        ".m-type-item-left .m-select-option-container #m-select-input-address"
      );
      let select2 = querySelector(
        ".m-type-item-left .m-select-input-container #m-select-input-select"
      );
      let select1_box1 = querySelector(container, ".m-type-item-left #m-select-option");
      let select2_box2 = querySelector(container, ".m-type-item-left #m-select-input");
      addEventListener(change1, "click", () => {
        box1.classList.add("m-ani-left-is-close");
        box1.classList.remove("m-ani-left-is-active");
        box2.classList.add("m-ani-right-is-active");
        box2.classList.remove("m-ani-right-is-close");
      });
      addEventListener(change2, "click", () => {
        box1.classList.add("m-ani-left-is-active");
        box1.classList.remove("m-ani-left-is-close");
        box2.classList.add("m-ani-right-is-close");
        box2.classList.remove("m-ani-right-is-active");
      });
      addEventListener(select1, "click", () => {
        select1_box1.classList.remove("m-ani-left-is-active");
        select1_box1.classList.add("m-ani-left-is-close");
        select2_box2.classList.remove("m-ani-right-is-close");
        select2_box2.classList.add("m-ani-right-is-active");
      });
      addEventListener(select2, "click", () => {
        select1_box1.classList.add("m-ani-left-is-active");
        select1_box1.classList.remove("m-ani-left-is-close");
        select2_box2.classList.add("m-ani-right-is-close");
        select2_box2.classList.remove("m-ani-right-is-active");
      });
    }
    /**
     * 右侧操作按钮
     * @param text 指定按钮文本，默认是小虎牙或者是小鱼丸
     */
    createButton() {
      let that = this;
      if (!!that.logo_btn) {
        return;
      }
      let text = this.buttonName;
      let backgroundColor = is_bilibili ? "255,102,102" : "255, 93, 35";
      const btn = createElement("button");
      btn.style.cursor = "pointer";
      btn.style.position = "fixed";
      btn.style.top = "300px";
      btn.style.right = "0px";
      btn.style.padding = "5px 10px";
      btn.style.backgroundColor = `rgb(${backgroundColor})`;
      btn.style.border = "none";
      btn.style.outline = "none";
      btn.style.borderRadius = "20px";
      btn.style.fontSize = "12px";
      btn.style.color = "#fff";
      btn.style.zIndex = 999999999999;
      btn.textContent = text ? text : is_huya ? "小虎牙" : is_douyu ? "小鱼丸" : is_bilibili ? "小B" : "默认";
      addEventListener(btn, "click", function() {
        that.isShowContainer();
      });
      addEventListener(btn, "mouseenter", function() {
        btn.style.backgroundColor = `rgba(${backgroundColor},0.6)`;
      });
      let flag = false;
      let x, y;
      const mouse_key = that.key + "_mouse_key";
      let { mouse_left, mouse_top } = getLocalStore(mouse_key, Object.name);
      if (mouse_left || mouse_top) {
        btn.style.left = mouse_left + "px";
        btn.style.top = mouse_top + "px";
        btn.style.right = "auto";
      }
      addEventListener(btn, "mousedown", (event) => {
        x = event.offsetX;
        y = event.offsetY;
        flag = true;
        addEventListener(wd, "mousemove", move);
      });
      addEventListener(btn, "mouseup", () => {
        flag = false;
        wd.onmousemove = null;
      });
      addEventListener(btn, "mouseleave", () => {
        flag = false;
        btn.style.backgroundColor = `rgba(${backgroundColor},1)`;
        wd.onmousemove = null;
      });
      function move(e) {
        e.preventDefault();
        if (!flag) {
          return;
        }
        let btn_top = Math.min(Math.max(0, e.clientY - y), window.innerHeight - btn.offsetHeight);
        let btn_left = Math.min(Math.max(0, e.clientX - x), window.innerWidth - btn.offsetWidth);
        btn.style.left = btn_left + "px";
        btn.style.top = btn_top + "px";
        btn.style.right = "auto";
        addLocalStore(mouse_key, { "mouse_left": btn_left, "mouse_top": btn_top }, Object.name);
      }
      btn.style.display = is_bilibili || getLocalStore(that.logo_show_key, Boolean.name) ? "block" : "none";
      that.logo_btn = btn;
      appendChild(querySelector("body"), that.logo_btn);
    }
    /**
     * 该房间是否已改被删除
     * @param url 房间链接地址 默认 window.location.href
     */
    removeRoom(url = local_url) {
      if (!this.isRemove(url)) {
        return false;
      }
      this.roomIsNeedRemove();
      return true;
    }
    /**
     * 房间已被删除之后操作
     * @param url 房间链接地址 默认 window.location.href
     */
    roomAlreadyRemove() {
      let that = this;
      removeDOM(querySelector("body"), true);
      const h2 = createElement("h3");
      let html = querySelector("html");
      let body = querySelector("body") ?? createElement("body");
      body.style.display = "flex";
      body.style.flexDirection = "column";
      body.style.justifyContent = "center";
      body.style.alignItems = "center";
      let name = this.getUser(this.getRoomIdByUrl(local_url)) ? this.getUser(this.getRoomIdByUrl(
        local_url
      )).name : "";
      const a = createElement("a");
      a.textContent = "点击解锁";
      a.style.display = "block";
      a.style.cursor = "pointer";
      a.style.fontSize = "20px";
      a.onclick = (e) => {
        e.preventDefault();
        that.userDelete(that.getRoomIdByUrl(local_url));
        window.location.reload();
      };
      h2.style.fontSize = "36px";
      h2.textContent = `主播【${name}】已被你屏蔽`;
      let title = querySelector("title");
      if (!title) {
        title = createElement("title");
      }
      title.textContent = `主播【${name}】已被你屏蔽`;
      html.appendChild(body);
      body.appendChild(h2);
      body.appendChild(a);
      let logo_show = getLocalStore(that.logo_show_key, Boolean.name);
      if (logo_show) {
        let logo = createElement("a");
        logo.textContent = "显示logo";
        logo.style.display = "block";
        logo.style.cursor = "pointer";
        logo.style.fontSize = "20px";
        logo.onclick = (e) => {
          e.preventDefault();
          logo.style.display = "none";
          addLocalStore(that.logo_show_key, false, Boolean.name);
          that.createButton();
        };
        body.appendChild(logo);
      }
      removeDOM(this.m_container, true);
      this.m_container = null;
      this.create_container();
    }
    /**
     * 判断链接是否应该被删除
     * @param href 房间链接地址 默认 window.location.href
     */
    isRemove(href) {
      return this.userIsExist(this.getRoomIdByUrl(href));
    }
    /**
     * 设置背景图
     * @param url 背景图地址 默认 是默认地址
     */
    settingBackgroundImage(url, container) {
      if (is_bilibili) {
        container = querySelector("#app");
      } else {
        container = querySelector("body");
      }
      if (!container) {
        return;
      }
      if (getLocalStore(this.bg_show_key, Boolean.name)) {
        url = !!url ? url : wls.getItem(this.bg_key) ? wls.getItem(this.bg_key) : this.defaultBackgroundImage;
        container.style.backgroundSize = "cover";
        container.style.backgroundRepeat = "no-repeat ";
        container.style.backgroundAttachment = "fixed";
        container.style.backgroundImage = `url(${url})`;
      } else {
        container.style.backgroundImage = "none";
      }
    }
    /**
     * 通过房间名称或者id判断房间是否已经保存到本地
     * @param keywords 房间名或者id
     * @param list 本地缓存数据，默认是本地缓存用户数据
     */
    userIsExist(keywords, list = this.users) {
      return !!this.getUser(keywords, list);
    }
    /**
     * 通过房间名称或者id判断房间是否已经保存到本地
     * @param keywords 房间名或者id
     * @param list 本地缓存数据，默认是本地缓存用户数据
     */
    getUser(keywords, list = this.users) {
      if (!keywords) {
        return null;
      }
      for (let i = 0; i < list.length; i++) {
        if (list[i].name && list[i].name === keywords || list[i].roomId && list[i].roomId === keywords) {
          return list[i];
        }
      }
      return null;
    }
    /**
     * 通过房间id或者房间名删除本地缓存的数据
     * @param keywords 房间名或者id
     */
    userDelete(keywords) {
      let that = this;
      if (!isArray(that.users)) {
        return;
      }
      that.users.forEach((item, index) => {
        if (keywords == item.name || keywords == item.roomId) {
          that.users.splice(index, 1);
        }
      });
      addLocalStore(this.key, this.users);
    }
    /**
     * 添加并保存直播间
     * @param id, 房间id
     * @param name 房间名
     */
    addUser(id, name) {
      if (this.userIsExist(id) || this.userIsExist(name)) {
        alert("该房间已存在！");
        return;
      }
      if (!isArray(this.users)) {
        this.users = [];
      }
      const newUser = new HostUser(id, name);
      this.users.unshift(newUser);
      addLocalStore(this.key, this.users);
      this.resetTbody(this.users);
      if (id === this.getRoomIdByUrl(local_url)) {
        this.roomIsNeedRemove(local_url);
      }
    }
    /**
     * @param selector video
     */
    roomIsNeedRemove(selector = querySelector("video")) {
      this.roomAlreadyRemove();
      removeVideo(selector);
      this.settingBackgroundImage();
    }
    /*
     * 操作左侧导航栏，需要传入选择器，和修改值 建议放到公共方法下执行！
     * @param {selector}  = [选择器]
     * @param {value}  = [要修改的值]
     */
    getLeftMenu(value = false) {
      let menu = querySelector(this.menu);
      if (!menu) {
        return alert("获取不到导航菜单，操作失败！");
      }
      addLocalStore(this.menu_show_key, value, Boolean.name, false);
      menu.style.display = value ? "block" : "none";
    }
    /*
     * 操作左侧导航栏，需要传入选择器，和修改值 建议放到公共方法下执行！
     */
    isShowLeftMenu() {
      let menu = querySelector(this.menu);
      if (menu) {
        menu.style.display = getLocalStore(this.menu_show_key, Boolean.name, false) ? "block" : "none";
      }
    }
    /**
     * 检查是否能找到全屏按钮
     * @param {全屏} fullScreenText 
     * @returns 
     */
    checkFullScreenButton(fullScreen) {
      if (!fullScreen) {
        let classId = findFullSreenButton(this.video_player_container, this.full_screen_class_or_id, this.fullScreenText, this.full_button_tag_name);
        if (!classId) {
          return;
        }
        this.full_screen_button = classId;
      }
    }
    /*
    * 是否全屏
    */
    isFullScreen(isClickFull = false) {
      let fullScreenText = this.fullScreenText;
      let cancelFullText = this.cancelFullText;
      let show3 = getLocalStore(this.full_screen_key, Boolean.name);
      let fullScreen = querySelector(this.full_screen_button);
      this.checkFullScreenButton(fullScreen);
      let isClick = fullScreen.isClick;
      if (isClickFull && (fullScreen == null ? void 0 : fullScreen.title) === fullScreenText) {
        this.isShowContainer();
        fullScreen.click();
      } else {
        loopDo((timer) => {
          fullScreen = querySelector(this.full_screen_button);
          this.checkFullScreenButton(fullScreen);
          isClick = fullScreen == null ? void 0 : fullScreen.isClick;
          if (fullScreen) {
            if (isClick) {
              clearInterval(timer);
              return;
            }
            if (!isClick && show3 && ((fullScreen == null ? void 0 : fullScreen.title) === fullScreenText || fullScreen.textContent === fullScreenText)) {
              fullScreen.isClick = true;
              fullScreen.click();
            } else if ((fullScreen == null ? void 0 : fullScreen.title) === cancelFullText || (fullScreen == null ? void 0 : fullScreen.textContent) === cancelFullText) {
              fullScreen.click();
            }
          }
        }, 30, 500);
      }
    }
    /**
     * 是否显示礼物
     */
    isShowGift() {
      let gift = querySelector(this.giftTool);
      if (gift) {
        gift.style.display = getLocalStore(this.gift_key, Boolean.name) ? "inline-block" : "none";
      }
    }
    /**
     * 是否显示容器
     */
    isShowContainer() {
      if (this.m_container) {
        if (this.m_container.classList.contains("m-container-is-active")) {
          this.m_container.classList.remove("m-container-is-active");
        } else {
          this.m_container.classList.add("m-container-is-active");
        }
      }
    }
    /**
     *  点击 直播平台 Logo 显示 操作面板
     */
    clickLogoShowContainer() {
      if (this.header_logo === "none") {
        return;
      }
      let that = this;
      timeoutSelector(that.header_logo, (a) => {
        a.href = "javascript:;void(0)";
        a.title = "点击Logo，显示插件配置";
        addEventListener(a, "click", (e) => {
          that.isShowContainer();
        });
      }, 5e3);
    }
    /**
     * 创建一个占位符显示可以操作按钮
     * @param {*} container 房间容器ID
     * @param {*} place 需要添加文本地方
     * @param {*} id 房间号ID
     * @param {*} name 房间名或者up名
     * @param message 消息内容
     * @param remove 是确认移除
     * @returns
     */
    createSpan(container, place, id, name = id, message = "确认屏蔽up主 ", remove = true) {
      if (!container || !place || !id || !name) {
        return;
      }
      const span = createElement("span");
      span.classList = "m-span-text";
      appendChild(place, span);
      addEventListener(span, "click", () => {
        if (confirm(message + name + " ?")) {
          if (remove) {
            removeDOM(container, true);
          }
          this.addUser(id, name);
          this.removeRoom(local_url);
        }
      });
    }
  }
  class TriggerLive extends LivePlugin {
    constructor() {
      super();
      this.key = "huyazhibo";
      this.bg_key = "huyazhibo_bg";
      this.bg_show_key = "huyazhibo_bg_show";
      this.menu_show_key = "huyazhibo_menu_show_key";
      this.full_screen_key = "huyazhibo_full_screen_key";
      this.video_player_container = ".room-player-wrap";
      this.full_screen_button = ".room-player-wrap .player-fullscreen-btn";
      this.full_button_tag_name = "span";
      this.defaultBackgroundImage = "https://livewebbs2.msstatic.com/huya_1682329462_content.jpg";
      this.baseUrl = "https://www.huya.com/";
      this.menu = ".mod-sidebar";
      this.header_logo = "#duya-header #duya-header-logo a";
      this.giftTool = ".room-core .player-gift-wrap";
      this.tbody = null;
      this.m_container = null;
      this.init();
    }
    // 首页操作
    index() {
      if (local_url === this.baseUrl || /https:\/\/.*\.huya\.*\/\?/.test(local_url)) {
        removeVideo(".mod-index-main video");
        const banner_close = querySelector(".mod-index-wrap #banner i");
        if (banner_close) {
          banner_close.click();
        }
        loopDo((timer) => {
          let pauseBtn = querySelector(".player-pause-btn");
          if (pauseBtn) {
            pauseBtn.click();
          }
        }, 10, 300);
      }
    }
    // 分类页操作
    category() {
      if (new RegExp(/^https:\/\/.*\.huya\.((com)|(cn))\/g(\/.*)$/).test(local_url)) {
        let that = this;
        timeoutSelectorAll(".live-list-nav dd", (nodes) => {
          for (let node of nodes) {
            addEventListener(node, "click", () => {
              setTimeout(() => {
                that.removeRoomByClickRoomName();
              }, 2e3);
            });
          }
        });
      }
    }
    // 公共部分操作
    common() {
      this.removeRoomByClickRoomName();
      this.clickLogoShowContainer();
    }
    // 详情操作
    detail() {
      if (new RegExp(/^https:\/\/www\.huya\.com(\/\w+)$/).test(local_url)) {
        let that = this;
        const hostName = querySelector(".host-name");
        hostName.title = `点击屏蔽主播【${hostName.textContent}】`;
        addEventListener(hostName, "click", () => {
          if (confirm(`确认屏蔽主播 ${hostName.textContent}？`)) {
            that.addUser(that.getRoomIdByUrl(local_url), hostName.textContent);
          }
        });
        let ads = [
          ".main-wrap .room-mod-ggTop",
          "#chatRoom .room-gg-chat",
          "#huya-ab"
        ];
        intervalRemoveElement(ads, 500, 20);
      }
    }
    // 通过地址获取房间号
    getRoomIdByUrl(url = local_url) {
      return url.match(/https:\/\/www\.huya\.com\/(.*)/)[1];
    }
    // 通过房间号查找名称
    getNameByRoomId(roomId) {
      let that = this;
      let hostName = querySelector(".host-name");
      if (!hostName) {
        return "";
      }
      const rooms = querySelectorAll(".game-live-item");
      if (!isArray(rooms)) {
        return "";
      }
      for (let room of rooms) {
        const a = querySelector(room, "a");
        if (a && a.href) {
          const id = that.getRoomIdByUrl(a.href);
          const user = querySelector(room, ".txt i");
          if (id === roomId) {
            hostName = user;
          }
        }
      }
      return (hostName == null ? void 0 : hostName.textContent) || "";
    }
    // 通过点击直播间名称删除直播间
    removeRoomByClickRoomName() {
      const that = this;
      timeoutSelectorAll(".game-live-item", (rooms) => {
        for (let li of rooms) {
          let isMark = li.getAttribute("mark");
          if (!isMark) {
            li.setAttribute("mark", true);
            const a = querySelector(li, "a");
            const url = a.href;
            const user = querySelector(li, ".txt i");
            const name = user.textContent || "";
            addEventListener(user, "click", () => {
              if (confirm(`确认禁用 ${name}？`)) {
                that.addUser(that.getRoomIdByUrl(url), name);
                removeDOM(li);
              }
            });
            if (that.isRemove(url)) {
              removeDOM(li);
            }
          }
        }
      }, 500);
    }
  }
  const getInfo = async (roomId = local_url) => {
    if (douyu_address_pattern.test(roomId)) {
      roomId = FishLive.prototype.getRoomIdByUrl(roomId);
    }
    return await fetch(`https://www.douyu.com/betard/${roomId}`, {
      mode: "cors",
      cache: "default",
      method: "GET"
    }).then((res) => res.json());
  };
  class FishLive extends LivePlugin {
    constructor() {
      super();
      this.key = "douyuzhibo";
      this.bg_key = "douyuzhibo_bg";
      this.bg_show_key = "douyuzhibo_show";
      this.menu_show_key = "douyuzhibo_menu_show_key";
      this.full_screen_key = "douyuzhibo_full_screen_key";
      this.video_player_container = "#room-html5-player";
      this.baseUrl = "https://www.douyu.com/";
      this.defaultBackgroundImage = "https://sta-op.douyucdn.cn/dylamr/2022/11/07/1e10382d9a430b4a04245e5427e892c8.jpg";
      this.menu = "#js-aside";
      this.giftTool = ".layout-Player-main #js-player-toolbar";
      this.header_logo = "#js-header .Header-left .Header-logo";
      this.tbody = null;
      this.m_container = null;
      setTimeout(() => {
        this.init();
      }, 500);
    }
    // 公共部分页面操作
    common() {
      this.clickLogoShowContainer();
    }
    //首页操作
    index() {
      let that = this;
      if (window.location.href === that.baseUrl || new RegExp(/https:\/\/www\.douyu\.com\/\?.*/).test(local_url)) {
        window.scroll(0, 0);
        removeVideo(".layout-Slide-player video");
        const vbox = querySelector("#room-html5-player");
        if (vbox) {
          const divs = querySelectorAll(vbox, "div");
          if (isArray(divs)) {
            for (let div of divs) {
              if ((div == null ? void 0 : div.title) === "暂停") {
                div.click();
              }
            }
          }
        }
        that.removeRoomByClickRoomName();
        window.onscroll = throttle(500, () => {
          that.removeRoomByClickRoomName();
        });
        let topBtn = querySelector(".layout-Main .ToTopBtn");
        if (topBtn) {
          topBtn.style.display = "block";
        }
      }
    }
    // 分类页面操作
    category() {
      let that = this;
      if (new RegExp(/https:\/\/www.douyu.com(\/((directory.*)|(g_.*)))$/).test(local_url)) {
        that.removeRoomByClickRoomName();
        const labels = querySelectorAll(".layout-Module-filter .layout-Module-label");
        if (isArray(labels)) {
          for (let label of labels) {
            addEventListener(label, "click", (e) => {
              e.preventDefault();
              let to_link = label && label.href ? label.href : null;
              if (to_link) {
                window.location.href = to_link;
              } else {
                window.location.href = "https://www.douyu.com/g_" + local_url.match(RegExp(
                  /subCate\/.*/g
                ))[0].replace("subCate", "").match(new RegExp(
                  /\w+/g
                ))[0];
              }
            });
          }
        }
      }
    }
    // 详情页操作
    detail() {
      let that = this;
      if (!new RegExp(/.*douyu.*(\/((.*rid=\d+)|(\d+)).*)$/).test(local_url)) {
        return;
      }
      setTimeout(() => {
        const hostName = querySelector(".Title-roomInfo h2.Title-anchorNameH2");
        hostName.title = `点击屏蔽主播【${hostName == null ? void 0 : hostName.textContent}】`;
        addEventListener(hostName, "click", () => {
          if (confirm(`确认屏蔽主播【${hostName == null ? void 0 : hostName.textContent}】？`)) {
            that.addUser(that.getRoomIdByUrl(local_url), hostName.textContent);
          }
        });
      }, 4e3);
      if (new RegExp(/.*douyu.*\/topic(\/(.*rid=\d+).*)/).test(local_url)) {
        let divs = querySelectorAll("#root>div");
        let backgroundNones = [".wm-general-wrapper.bc-wrapper.bc-wrapper-player", ".wm-general-bgblur"];
        if (isArray(divs)) {
          for (let element of divs) {
            if (hasVideo(element, ".layout-Main")) {
              backgroundNone(element, backgroundNones);
            } else {
              removeDOM(element, true);
            }
          }
        }
      }
      if (new RegExp(/.*douyu.*(\/(\d+)).*/).test(local_url)) {
        loopDo((timer) => {
          const closeBtn = querySelector(".roomSmallPlayerFloatLayout-closeBtn");
          const isClick = closeBtn.getAttribute("isClick");
          if (closeBtn && !isClick) {
            closeBtn.click();
            closeBtn.setAttribute("isClick", true);
          }
          if (isClick) {
            clearInterval(timer);
          }
        }, 100, 500);
        removeDOM(".layout-Main .ToTopBtn", true);
      }
    }
    // 通过点击直播间名称删除直播间
    removeRoomByClickRoomName() {
      let that = this;
      if (this.baseUrl === local_url || new RegExp(/https:\/\/www\.douyu\.com\/\?.*/).test(local_url)) {
        timeoutSelectorAll(".layout-List-item", (rooms) => {
          for (let li of rooms) {
            setTimeout(() => {
              let isMark = li.getAttribute("mark");
              if (!isMark) {
                try {
                  li.setAttribute("mark", true);
                  const a = querySelector(li, ".DyCover");
                  const url = a.href || "";
                  const user = querySelector(li, ".DyCover-user");
                  const name = (user == null ? void 0 : user.textContent) || "";
                  a.setAttribute("href", "javascript:;void(0)");
                  addEventListener(user, "click", () => {
                    if (confirm(`确认禁用 ${name}`)) {
                      that.addUser(that.getRoomIdByUrl(url), name);
                      removeDOM(li);
                    }
                  });
                  if (that.isRemove(url) || that.userIsExist(name)) {
                    removeDOM(li);
                  }
                } catch (e) {
                }
              }
            }, 100);
          }
        }, 100);
      }
      if (new RegExp(/https:\/\/www.douyu.com(\/((directory)|(g_)).*)/).test(local_url)) {
        timeoutSelectorAll(".layout-Cover-item", (rooms) => {
          for (let li of rooms) {
            try {
              let isMark = li.getAttribute("mark");
              if (!isMark) {
                li.setAttribute("mark", true);
                const link = querySelector(li, "a.DyListCover-wrap");
                if (link) {
                  const url = (link == null ? void 0 : link.href) || "";
                  link.setAttribute("href", "javascript:;void(0)");
                  const user = querySelector(link, "div.DyListCover-userName");
                  const name = user.textContent || "";
                  if (that.isRemove(url) || that.userIsExist(name)) {
                    removeDOM(li, true);
                  } else {
                    addEventListener(user, "click", (e) => {
                      if (confirm(`确认禁用 ${name}？`)) {
                        const id = that.getRoomIdByUrl(url);
                        that.addUser(id, name);
                        removeDOM(li);
                      }
                      e.preventDefault();
                    });
                    addEventListener(li, "mouseenter", (e) => {
                      const a = querySelector(e.target, "a.DyListCover-wrap.is-hover");
                      const url2 = a.href;
                      a.setAttribute("href", "javascript:;void(0)");
                      const user2 = querySelector(a, ".DyListCover-userName");
                      const name2 = user2.textContent || "";
                      addEventListener(user2, "click", () => {
                        if (confirm(`确认禁用 ${name2}？`)) {
                          const id = that.getRoomIdByUrl(url2);
                          that.addUser(id, name2);
                          removeDOM(li);
                        }
                      });
                    });
                  }
                }
              }
            } catch (e) {
            }
          }
        }, 0);
      }
    }
    // 通过房间号获取直播间name
    async getNameByRoomId(keywords) {
      var _a;
      let that = this;
      var result = await getInfo(keywords);
      if ((result == null ? void 0 : result.room) && ((_a = result == null ? void 0 : result.room) == null ? void 0 : _a.nickname)) {
        return result.room.nickname;
      }
      let hostName = querySelector(".Title-blockInline .Title-anchorName h2");
      let rooms = null;
      if (!hostName) {
        rooms = querySelectorAll(".layout-List-item");
        if (isArray(rooms)) {
          for (let room of rooms) {
            const id = that.getRoomIdByUrl(querySelector(room, "a").href);
            const user = querySelector(room, ".DyCover-user");
            if (id === keywords) {
              hostName = user;
            }
          }
        }
        if (!hostName) {
          rooms = querySelectorAll(".layout-Cover-item");
          if (isArray(rooms)) {
            for (let room of rooms) {
              const id = that.getRoomIdByUrl(querySelector(room, "a").href);
              const user = querySelector(room, ".DyListCover-userName");
              if (id === keywords) {
                hostName = user;
              }
            }
          }
        }
      }
      return (hostName == null ? void 0 : hostName.textContent) || "";
    }
    // 通过房间地址获取房间号
    getRoomIdByUrl(url = local_url) {
      try {
        if (new RegExp(/.*rid=(\d+).*/).test(url)) {
          return url.match(new RegExp(/rid=(\d+)/))[1];
        }
        if (/https:\/\/www\.douyu\.com\/(\d+).*/.test(url)) {
          return url.match(new RegExp(/https:\/\/www\.douyu\.com\/(\d+)/))[1];
        }
        return null;
      } catch (e) {
        return null;
      }
    }
  }
  const getBiliBiliInfoByVideoID = async (url = window.location.href) => {
    if (!url) {
      return;
    }
    let videoBVId = "BV";
    if (/.*\/BV(.*)/.test(url)) {
      videoBVId += /.*\/BV(.*)\/.*/.test(url) ? url.match(/.*\/BV(.*)/)[1].match(/(.*)\/{1}.*/)[1] : url.match(/.*\/BV(.*)/)[1];
    } else {
      videoBVId = url;
    }
    return await fetch(`https://api.bilibili.com/x/web-interface/wbi/view?bvid=${videoBVId}`, {
      method: "get",
      mode: "cors"
    }).then((res) => res.json());
  };
  class BiliBili extends LivePlugin {
    constructor() {
      super();
      this.header_logo = ".bili-header .bili-header__bar ul>li>a";
      this.video_player_container = "#bilibili-player";
      this.fullScreenText = "进入全屏 (f)";
      this.init();
    }
    /**
     * 重写 button
     * @returns
     */
    createButton() {
      let that = this;
      if (!!that.logo_btn) {
        return;
      }
      let buttonBoxs = querySelector(".palette-button-wrap .storage-box .storable-items");
      let btn = createElement("button");
      btn.className = "primary-btn";
      btn.style.fontSize = "16px";
      if (!buttonBoxs) {
        buttonBoxs = querySelector("div.fixed-sidenav-storage");
        if (!buttonBoxs) {
          console.log("暂不支持...");
          return;
        }
        btn = createElement("div");
        btn.style.display = "none";
        btn.className = "m-bilibili-btn";
        window.onscroll = () => {
          if (window.scrollY >= 500) {
            btn.style.display = "block";
          } else {
            btn.style.display = "none";
          }
        };
      }
      btn.title = "点击显示";
      btn.innerHTML = `<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2753" width="24" height="24"><path d="M306.005333 117.632L444.330667 256h135.296l138.368-138.325333a42.666667 42.666667 0 0 1 60.373333 60.373333L700.330667 256H789.333333A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334a149.333333 149.333333 0 0 1-149.333334 149.333333h-554.666666A149.333333 149.333333 0 0 1 85.333333 746.666667v-341.333334A149.333333 149.333333 0 0 1 234.666667 256h88.96L245.632 177.962667a42.666667 42.666667 0 0 1 60.373333-60.373334zM789.333333 341.333333h-554.666666a64 64 0 0 0-63.701334 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.701333L234.666667 810.666667h554.666666a64 64 0 0 0 63.701334-57.856L853.333333 746.666667v-341.333334A64 64 0 0 0 789.333333 341.333333zM341.333333 469.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666666-42.666667z m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z" p-id="2754" fill="currentColor"></path></svg>`;
      that.logo_btn = btn;
      addEventListener(btn, "click", function() {
        that.isShowContainer();
      });
      insertChild(buttonBoxs, that.logo_btn);
    }
    async getRoomIdByUrl(href) {
      var _a, _b;
      try {
        if (/https:\/\/www.bilibili.com\/video\/.*/.test(local_url)) {
          let result = await getBiliBiliInfoByVideoID(local_url);
          if (result.code === 0 && ((_a = result == null ? void 0 : result.owner) == null ? void 0 : _a.mid)) {
            return (_b = result == null ? void 0 : result.owner) == null ? void 0 : _b.mid;
          }
        }
        if (/https:\/\/space\.bilibili\.com\/(\d+).*/.test(href)) {
          return href.match(/https:\/\/space\.bilibili\.com\/(\d+)/)[1];
        }
      } catch (error) {
      }
      return this.getBilibiliRoomId(href);
    }
    getBilibiliRoomId(href) {
      return !!href && href.replace(/https:\/\/.*\.bilibili.com\/(.*?)/, "$1").replace(/\//ig, "");
    }
    // 添加删除按钮
    addDeleteRoomButton(time = 1e3) {
      timeoutSelectorAll(".feed-card", (divs) => {
        var _a, _b;
        for (let feed of divs) {
          const isMark = !!querySelector(feed, ".m-span-text");
          if (!isMark) {
            let item = querySelector(feed, "div.bili-video-card__info--bottom");
            const name = (_a = querySelector(item, "span.bili-video-card__info--author")) == null ? void 0 : _a.textContent;
            const href = (_b = querySelector(item, ".bili-video-card__info--owner")) == null ? void 0 : _b.href;
            const id = this.getBilibiliRoomId(href);
            if (this.userIsExist(id) || this.userIsExist(name)) {
              removeDOM(feed, true);
            } else if (id && name) {
              this.createSpan(feed, item, id, name);
            }
          }
        }
      }, time);
      window.onscroll = throttle(500, () => {
        timeoutSelectorAll(".bili-video-card", (divs) => {
          var _a, _b, _c, _d;
          for (let feed of divs) {
            const isMark = !!querySelector(feed, ".m-span-text");
            if (!isMark) {
              let item = querySelector(feed, "div.bili-video-card__info--bottom");
              let isLive = false;
              if (!item) {
                isLive = true;
                item = querySelector(feed, ".bili-live-card__info--text");
              }
              const name = !isLive ? (_a = querySelector(item, "span.bili-video-card__info--author")) == null ? void 0 : _a.textContent : (_b = querySelector(item, "a.bili-live-card__info--uname span")) == null ? void 0 : _b.textContent;
              const href = !isLive ? (_c = querySelector(item, ".bili-video-card__info--owner")) == null ? void 0 : _c.href : (_d = querySelector(item, "a.bili-live-card__info--uname")) == null ? void 0 : _d.href;
              const id = this.getBilibiliRoomId(href);
              if (this.userIsExist(name) || this.userIsExist(id)) {
                removeDOM(feed, true);
              } else if (id && name) {
                this.createSpan(feed, item, id, name);
              }
            }
          }
        }, time);
      });
    }
    clickLogoShowContainer() {
      let that = this;
      super.clickLogoShowContainer();
      window.onscroll = () => {
        if (parseInt(window.scrollY) > 90) {
          operationLogo();
        } else {
          super.clickLogoShowContainer();
        }
      };
      function operationLogo() {
        log("logo");
        that = this;
        let logo = querySelector(that.header_logo);
        let isMark = logo.getAttribute("isMark");
        if (!isMark) {
          logo.setAttribute("isMark", "true");
          logo.setAttribute("href", "javascript:;void(0)");
          logo.setAttribute("title", "点击Logo，显示插件配置");
          addEventListener(logo, "click", (e) => {
            that.isShowContainer();
          });
        }
      }
    }
    common() {
      this.clickLogoShowContainer();
      let that = this;
      that.addDeleteRoomButton(1e3);
      setTimeout(() => {
        const refreshButton = querySelector(".feed-roll-btn .primary-btn");
        addEventListener(refreshButton, "click", () => {
          that.addDeleteRoomButton(200);
        });
      }, 3e3);
    }
    index() {
    }
    detailLeftVideoList(time = 1e3, sel = ".video-page-card-small") {
      timeoutSelectorAll(sel, (videoList) => {
        var _a;
        for (let videoDom of videoList) {
          const isMark = !!videoDom.getAttribute("mark");
          videoDom.setAttribute("mark", true);
          const playinfo = querySelector(videoDom, ".playinfo");
          const link = querySelector(videoDom, ".upname a");
          const id = !!link && (link == null ? void 0 : link.href) && this.getBilibiliRoomId(link.href);
          const name = (_a = querySelector(videoDom, ".upname .name")) == null ? void 0 : _a.textContent;
          if (this.userIsExist(id) || this.userIsExist(name)) {
            removeDOM(videoDom, true);
          } else if (!isMark && id && name) {
            const span = createElement("span");
            span.classList = "m-span-text";
            addEventListener(span, "click", () => {
              if (confirm("确认删除up主 " + name + " ?")) {
                removeDOM(videoDom, true);
                this.addUser(id, name);
                this.detailLeftVideoList(0);
              }
            });
            appendChild(playinfo, span);
          }
        }
      }, time);
    }
    async detail() {
      var _a, _b;
      if (new RegExp(/https:\/\/www\.bilibili\.com\/video\/(.*)/).test(local_url)) {
        this.detailLeftVideoList(100, ".video-page-operator-card-small");
        this.detailLeftVideoList();
        const nextBtn = querySelector(".rec-footer");
        addEventListener(nextBtn, "click", () => {
          this.detailLeftVideoList(0);
        });
      }
      if (/https:\/\/www.bilibili.com\/video\/.*/.test(local_url) && false) {
        const userContainer = querySelector(".right-container-inner .up-info-container");
        const place = querySelector(userContainer, ".up-detail-top");
        const link = querySelector(userContainer, ".up-detail-top>a");
        const name = link.textContent;
        const id = this.getRoomIdByUrl(link.href);
        const span = createElement("span");
        span.classList = "m-span-text";
        appendChild(place, span);
        addEventListener(span, "click", () => {
          if (confirm("确认屏蔽up主" + name + " ?")) {
            this.addUser(id, name);
          }
        });
      }
      if (/https:\/\/www.bilibili.com\/video\/.*/.test(local_url)) {
        let result = await getBiliBiliInfoByVideoID(local_url);
        console.log("视频查询结果详情:", result);
        if (result.code === 0 && this.userIsExist((_a = result == null ? void 0 : result.owner) == null ? void 0 : _a.mid) || this.userIsExist((_b = result == null ? void 0 : result.owner) == null ? void 0 : _b.name)) {
          this.roomIsNeedRemove();
        }
      }
    }
    async getNameByRoomId(bvId) {
      var _a, _b;
      let result = await getBiliBiliInfoByVideoID(bvId);
      if (result.code === 0) {
        return (_b = (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.owner) == null ? void 0 : _b.name;
      }
    }
  }
  addStyle(`
.m-container,
.m-container .btn,
.m-container table,
.m-container table tbody,
.m-container table thead,
.m-container table tr {
  margin: 0 !important;
  padding: 0 !important;
  border: none;
  outline: none;
}

.m-container {
  --m-font-color: #fff;
  --m-container-backgournd-color: #fff;
  --m-container-width: 700px;
  --m-container-height: 400px;
  --m-container-operation-right-width: 150px;
  --m-container-input-width: 150px;
  --m-container-box-transition: all 0.4s ease-in-out;
  --m-container-select-width: var(--m-container-input-width);
  --m-container-input-outline: 1px solid rgba(8, 125, 235, 0.6) !important;
}

.m-container {
  box-sizing: border-box !important;
  position: fixed !important;
  flex-direction: column !important;
  width: var(--m-container-width) !important;
  height: var(--m-container-height) !important;
  top: 100px !important;
  left: 50% !important;
  border-radius: 10px !important;
  overflow: hidden !important;
  background-color: var(--m-container-backgournd-color) !important;
  z-index: 100000000 !important;
  padding: 15px !important;
  transition: var(--m-container-box-transition) !important;
  box-shadow: 20px 20px 10px rgba(0, 0, 0, 0.1),
    -1px -2px 18px rgba(0, 0, 0, 0.1) !important;

  opacity: 0;
  transform: translate(-50%, -150%);
}

.m-container-is-active {
  opacity: 1;
  transform: translate(-50%, 0%);
  z-index:100000000 !important;
}

.m-container-box {
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  height: 100% !important;
}

.m-container .operation {
  box-sizing: border-box !important;
  height: auto !important;
  justify-content: start !important;
}


.m-container input[type="text"] {
  width: var(--m-container-input-width) !important;
  box-sizing: border-box !important;
  border: 1px solid rgba(8, 125, 235, 0.6) !important;
  outline: none !important;
  padding: 5px 10px !important;
  border-radius: 20px !important;
  transition: var(--m-container-box-transition);
}

.m-container input:focus {
  border: 1px solid rgba(8, 125, 235, 1) !important;
}

.m-container .operation input[type="checkbox"] {
  display: inline !important;
}

.m-container .operation input[type="file"] {
  display: none !important;
}

.m-container table {
  position: relative !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  text-align: left !important;
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
}

.m-container table tr {
  margin: 5px 0 !important;
  display: flex !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4) !important;
  justify-content: space-between;
}

.m-container table tr td:nth-child(1),
.m-container table thead th:nth-child(1) {
  width: 50px;
  text-align: center !important;
}

.m-container table tr td:nth-child(2),
.m-container table tr td:nth-child(3),
.m-container table tr td:nth-child(4),
.m-container table thead th:nth-child(2),
.m-container table thead th:nth-child(3),
.m-container table thead th:nth-child(4) {
  flex: 1 !important;
  text-align: center !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.m-container table tbody {
  flex: 1 !important;
  overflow: auto !important;
}

.m-container table th,
.m-container table td {
  padding: 10px !important;
}

.m-container table tbody tr:nth-child(1) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.4) !important;
}

.m-container .m-link,
.m-container .m-link:visited {
  color: blnk !important;
}

.m-container .m-link:hover {
  color: blue !important;
  text-decoration: underline !important;
}

.m-container .btn {
  cursor: pointer !important;
  padding: 5px 8px !important;
  border: none !important;
  max-width:50px !important;
  color: var(--m-font-color) !important;
  font-size: 1rem !important;
  border-radius: 20px !important;
  margin: 0 !important;
  background-color: rgba(166, 169, 173, 1) !important;
  z-index: 1000 !important;
  outline: none !important;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4), 0px 0px 1px rgba(0, 0, 0, 0.4) !important;
}

.m-container .btn:hover {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1) !important;
}

.m-container .btn:hover {
  background-color: rgba(166, 169, 173, 0.6) !important;
}

.m-container .btn-primary {
  background-color: rgba(64, 158, 255, 1) !important;
}

.m-container .btn-primary:hover {
  background-color: rgba(64, 158, 255, 0.6) !important;
}

.m-container .btn-success {
  background-color: rgba(103, 194, 58, 1) !important;
}

.m-container .btn-success:hover {
  background-color: rgba(103, 194, 58, 0.6) !important;
}

.m-container .btn-info {
  background-color: rgba(119, 119, 119, 1) !important;
}

.m-container .btn-info:hover {
  background-color: rgba(119, 119, 119, 0.6) !important;
}

.m-container .btn-warning {
  background-color: rgba(230, 162, 60, 1) !important;
}

.m-container .btn-warning:hover {
  background-color: rgba(230, 162, 60, 0.6) !important;
}

.m-container .btn-danger {
  background-color: rgba(245, 108, 108, 1) !important;
}

.m-container .btn-danger:hover {
  background-color: rgba(245, 108, 108, 0.6) !important;
}

#m-container-box1 {
  position: absolute !important;
  z-index: 10000000 !important;
  transition: var(--m-container-box-transition) !important;
  width: 100% !important;
  height: 100% !important;
}

#m-container-box2 {
  position: absolute !important;
  z-index: 9999 !important;
  transition: var(--m-container-box-transition) !important;
  ;
  width: 100% !important;
  height: 100% !important;
}

.m-ani-left-is-active {
  transform: translateX(0) !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.m-ani-left-is-close {
  transform: translateX(-100%) !important;
  visibility: hidden !important;
  opacity: 0 !important;
}

.m-ani-right-is-active {
  transform: translateX(0) !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.m-ani-right-is-close {
  transform: translateX(100%) !important;
  visibility: hidden !important;
  opacity: 0 !important;
}

.m-type-container .m-type-item {
  display: flex !important;
  height: 30px !important;
}

.m-type-container .m-type-item .m-type-item-left {
  flex: 1 !important;
  position: relative !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
}

.m-type-container .m-type-item .m-type-item-right {
  width: var(--m-container-operation-right-width);
  text-align: center !important;
}

.m-type-container .m-type-item .m-type-item-left .m-select-option-container,
.m-type-container .m-type-item .m-type-item-left .m-select-input-container {
  transition: var(--m-container-box-transition) !important;
  position: absolute !important;
  width: 100% !important;
}

.m-type-container .m-select {
  display: flex !important;
}

.m-type-container .m-select .m-select-item {
  margin-right: 10px !important;
}

.m-type-container .m-select .m-select-item:last-child {
  margin-right: 0 !important;
}

.m-type-container .m-select select {
  width: 100px !important;
  color: rgba(119, 119, 119, 0.9) !important;
}

.m-type-container .m-select select::placeholder {
  color: rgba(119, 119, 119, 0.9) !important;
}

.m-type-container .m-tag-select {
  width: calc(var(--m-container-select-width)/2) !important;
  ;
  outline: none !important;
  border: 1px solid rgba(8, 125, 235, 0.6) !important;
  padding: 5px 8px !important;
  padding: 5px 10px !important;
}

.m-container select {
  border: 1px solid rgba(8, 125, 235, 1) !important;
}


.m-type-container .m-select .m-option-default {
  color: rgba(119, 119, 119, 0.6) !important;
}

.m-type-container input[type="text"] {
  width: 350px !important;
}

.m-type-container .m-select input {
  width: var(--m-container-input-width) !important;
}

.m-type-container .m-search-msg {
  color: red !important;
}

    .m-span-text {
        transition: all 0.3s ease;
        cursor: pointer !important;
        opacity: 0;
        float:right;
        display:inline-block;
        margin:0 10px;
        transform: scale(0.5);
        font-size:20px;
        position:relative;
    }

    .m-span-text::before{
        content:"🧹";
        cursor: pointer !important;
    }


   /***************************************************斗鱼直播***************************************************************************/
   .game-live-item i,.host-name {
       cursor:pointer;
   }
   .game-live-item .txt i:hover,.host-name:hover {
       color:rgb(255, 135, 0);
   }
   .layout-List-item .DyCover-content .DyCover-user,.layout-Cover-item .DyListCover-userName,.Title-blockInline .Title-anchorName h2{
       cursor:pointer !important;
   }
   .layout-List-item .DyCover-content .DyCover-user:hover,.layout-Cover-item .DyListCover-userName:hover,.Title-blockInline .Title-anchorName h2:hover {
       color:rgb(255, 135, 0) !important;
    }

   .layout-Section.layout-Slide .layout-Slide-player,
  .layout-Slide-bannerInner,
   #lazyModule3,
   #lazyModule4,
   #lazyModule5,
   #lazyModule6,
   #lazyModule7,
   #lazyModule8,
   #lazyModule23,
   #lazyModule24,
   #js-room-activity,
   #js-right-nav,
   #js-bottom,
   #js-header .Header .HeaderNav,
   #js-header .Header .HeaderGif-left,
   #js-header .Header .HeaderGif-right,
   .Header-download-wrap,
   .AnchorInterToolsUser,
   .RechangeJulyPopups,
   #js-room-activity,
   #js-right-nav,
   #js-bottom,
   li.Header-menu-link,
   .layout-Main .layout-Customize,
   .HeaderCell-label-wrap,
   .Title-AnchorLevel,.RoomVipSysTitle,
   .Aside-nav .Aside-nav-item,
   .Title-roomInfo .Title-row,
   #player-marvel-controller+div,
   .layout-Player-main .GuessGameMiniPanelB-wrapper,
   #js-player-asideMain #layout-Player-aside .FirePower,
   .layout-Player-video .layout-Player-videoAbove .ChargeTask-closeBg,
    #bc4-bgblur,
   .Baby-image.is-achievement,
   .multiBitRate-da4b60{
       display:none !important;
   }


    li.Header-menu-link:nth-child(1),
    li.Header-menu-link:nth-child(2),
    li.Header-menu-link:nth-child(3),
    .Aside-nav .Aside-nav-item:nth-child(1)
   {
       display:inline-block !important;
   }

   .layout-Player-aside .layout-Player-chat,.layout-Player-aside .layout-Player-chat .ChatToolBar {
     display:block !important;
   }


   .Barrage-main  .UserLevel,
   .Barrage-main  .js-user-level,
   .Barrage-main  .Barrage-icon,
   .Barrage-main  .Motor,
   .Barrage-main  .Motor-flag,
   .Barrage-main  .Barrage-hiIcon,
   .Barrage-main  .UserGameDataMedal,
   .Barrage-main  .ChatAchievement,
   .Barrage-main  .Barrage-notice,
   .layout-Player .layout-Player-announce,
   .layout-Player .layout-Player-rank,
   .MatchSystemTeamMedal,
    #js-player-video .ScreenBannerAd,
  .layout-Main #layout-Player-aside .BarrageSuspendedBallAd,
  .layout-Main #layout-Player-aside .SignBarrage,
   #js-player-video-case .VRTips~div,
   .layout-Main .Title-roomInfo .Title-row:nth-child(2) .Title-col.is-normal:last-child,
   .layout-Main .ToTopBtn,
   .Header-right .public-DropMenu-drop .DropPane-ad,
   .Header-right .CloudGameLink,
   .Header-menu-wrap .DropMenuList-ad,
   .public-DropMenu-drop-main div.Header-UserPane-top~div,
   #js-player-dialog .LiveRoomLoopVideo,
   .Header-search-wrap .Search  label,
   .Barrage .Barrage-userEnter{
     display:none !important;
   }

   /* 一般禁用模式 */
   .layout-Player-main #js-player-toolbar{
     display:block;
   }
   #root div.layout-Main{
       margin-top:70px !important;
       display:block !important;
       width:auto !important;
       max-width:auto !important;
   }
   #root>div,
   #root>div .wm-general-bgblur
   {
     background-image:none !important;
   }

    .Title-roomInfo .Title-row:nth-child(1),
    .Title-roomInfo .Title-row:nth-child(2) {
      display:block !important;
    }


   .Barrage-main .Barrage-content {
    color:#333 !important;
   }
   .Barrage-main .Barrage-nickName{
    color:#2b94ff !important;
   }
   .Barrage-listItem{
     color: #333 !important;
     background-color: #f2f5f6 !important;
   }
   .layout-Player-barrage{
       position: absolute !important;
       top: 0 !important;
    }

    .Header-search-wrap input#header-search-input::placeholder {
        color: transparent !important;
        opacity:0 !important;
    }


 /***************************************************虎牙直播***************************************************************************/
   .helperbar-root--12hgWk_4zOxrdJ73vtf1YI,
   .mod-index-wrap .mod-index-main .main-bd,
   .mod-index-wrap .mod-index-main .main-hd,
   .mod-index-wrap #js-main,
   .mod-index-wrap #banner,
   .mod-index-wrap .mod-game-type,
   .mod-index-wrap .mod-actlist,
   .mod-index-wrap .mod-news-section,
   .mod-index-wrap .mod-index-list .live-box #J_adBnM,
   .mod-index-wrap .mod-index-recommend,
   .mod-index-wrap .mod-news-section,
   .mod-index-wrap .recommend-wrap,
   .RoomPublicMessage--n3v61Bk0DehYuR0xEQ9S1,
   #huya-ab-fixed,
   #huya-ab,
   .liveList-header-r,
   .room-footer,
   .J_roomSideHd,
    #J_roomSideHd,
    #match-cms-content,
    #matchComponent2,
   .hy-nav-item,
   .list-adx,
   .layout-Banner,
    #J_duyaHeaderRight>div>div>div,
    .nav-expand-list .third-clickstat,
    #main_col .special-bg,
    .player-recommend.recommend-ab-mode .end-ab-wrap,
    .chat-wrap-panel.wrap-income,
    .match-room .match-nav,
    .host-detail.J_roomHdDetail span,
    .host-detail.J_roomHdDetail .host-video,
    .room-hd-r .jump-to-phone,
    .room-hd-r #share-entrance,
    .room-hd-r #J_illegalReport,
    .room-hd-r .gamePromote.J_gamePromote,
    .main-wrap .room-mod-ggTop,
    #chatRoom .room-gg-chat,
    .room-core .room-business-game,
    .room-backToTop.j_room-backToTop,
   .room-weeklyRankList{
       display:none !important;
    }

    .ssr-wrapper .mod-sidebar, .room-core #player-gift-wrap, {
      display:none;
    }

    .hy-nav-item:nth-child(1),
    .hy-nav-item:nth-child(2),
    .hy-nav-item:nth-child(3),
    #J_duyaHeaderRight>div>div>div:nth-child(3){
      display:inline-block !important;
    }
    .mod-index-wrap .mod-index-list{
      margin-top:80px !important;
    }
    .duya-header{
      background: hsla(0,0%,100%,.95)  !important;
      border-bottom: 1px solid #e2e2e2 !important;
      box-shadow: 0 0 6px rgb(0 0 0 / 6%) !important;
    }
    .duya-header a,.duya-header i{
     color:#000 !important;
    }
    /*******直播间样式*****/
   .chat-room__list .msg-normal,.chat-room__list .msg-bubble,#J_mainRoom{
      background:none !important;
    }
    #wrap-ext,
   .chat-room__list .msg-normal-decorationPrefix,
   .chat-room__list .msg-normal-decorationSuffix,
   .chat-room__list .msg-bubble-decorationPrefix,
   .chat-room__list img,
   .chat-room__list .msg-noble,
   .chat-room__list .msg-sys,
   .chat-room__list .msg-auditorSys,
   .J_box_msgOfKing,
   .chat-room__list .msg-onTVLottery{
       display: none !important;
    }
   .chat-room__list .msg-bubble span.msg{
       color: #333 !important;
       background:none!important;
    }
   .chat-room__list .msg-bubble .colon,
   .chat-room__list .msg-bubble .msg,
   .chat-room__list .name{
       color: #3c9cfe !important;
       background:none!important;
     }

     #search-bar-input::placeholder{
        color: transparent !important;
        opacity:0 !important;
     }



     /********************************Bilibili********************************** */
     div#i_cecream .floor-single-card,
     div#i_cecream .bili-live-card.is-rcmd,
     div#i_cecream .adblock-tips,
     div.video-container-v1 div.pop-live-small-mode.part-undefined,
     .recommended-swipe.grid-anchor,
     .video-page-special-card-small
     {
        display:none !important;
     }

    /* 输入框*/
    .nav-search-content>input::placeholder {
        color: transparent;
        opacity:0 !important;
    }

    .m-bilibili-btn {
        cursor: pointer !important;
        background: #FFFFFF !important;
        background: var(--bg1_float) !important;
        border: 1px solid #E3E5E7 !important;
        border: 1px solid var(--line_regular) !important;
        border-radius: 8px !important;
        box-sizing: border-box !important;
        padding: 6px !important;
        margin-bottom: 6px !important;
        color: #18191C !important;
        color: var(--text1) !important;
        line-height: 14px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 40px;
    }

    .bili-video-card__info--bottom:hover .m-span-text,
    .video-page-card-small:hover .m-span-text,
    .up-info-container:hover .m-span-text,
    .video-page-operator-card-small:hover .m-span-text
     {
        opacity: 1;
        transform: scale(1.1);
        color:orange;
    }
`);
  (function() {
    if (typeof window === void 0) {
      log("插件不支持！", "warn");
      return;
    }
    window.onload = () => {
      try {
        let text = "%c欢迎使用直播插件,下载地址%c";
        if (!is_localhost) {
          console.clear();
        }
        console.log(
          text.concat(download_plugin_url, ""),
          "background: rgb(255, 93, 35); padding: 1px; border-radius: 3px 0 0 3px; color: #fff",
          "border-radius: 0 3px 3px 0; color: #fff"
        );
        console.log(
          "%c地址:%c ".concat(source_code_url, ""),
          "background: rgb(255, 93, 35); padding: 1px; border-radius: 3px 0 0 3px; color: #fff",
          "border-radius: 0 3px 3px 0; color: #fff"
        );
        if (is_huya) {
          new TriggerLive();
        } else if (is_douyu) {
          new FishLive();
        } else if (is_bilibili) {
          new BiliBili();
        } else if (is_localhost) {
          new LivePlugin();
        } else {
          log("插件地址不适配，请检查匹配地址！！！", "error");
        }
      } catch (e) {
        log(e, "error");
      }
    };
  })();

})();
