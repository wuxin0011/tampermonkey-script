// ==UserScript==
// @name         直播插件
// @namespace    http://tampermonkey.net/
// @version      3.8.7
// @description  虎牙，斗鱼直播 简化页面，屏蔽主播
// @author       wuxin001
// @match        https://www.huya.com/*
// @match        https://www.douyu.com/*
// @icon         https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/picgo/icon.png
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==
(function () {
    'use strict';
    if (typeof window === undefined) {
        return;
    }
    // const 
    const huya_address_pattern = /^https:\/\/.*\.huya\.((com)|(cn)).*/
    const doyu_address_pattern = /^https:\/\/.*\.douyu\.((com)|(cn)).*/
    const localhost = /^http:\/\/127.0.0.1.*|^http:\/\/localhost.*/
    const local_url = window.location.href
    const is_huya = huya_address_pattern.test(local_url) // 是否是虎牙地址
    const is_douyu = doyu_address_pattern.test(local_url) // 是否是斗鱼地址
    const is_localhost = localhost.test(local_url) // 本地环境
    const wd = window.document
    const wls = window.localStorage // 简化存储对象
    const download_plugin_url = 'https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD' // 下载地址
    const source_code_url = 'https://github.com/wuxin0011/huya-live' // 源码地址
    // common method
    const isImage = (file) => /.*(\.(png|jpg|jpeg|apng|avif|bmp|gif|ico|cur|svg|tiff|webp))$/.test(file)
    const querySelector = (el, sel) => !!el && el instanceof HTMLElement ? el.querySelector(sel) : wd.querySelector(el)
    const querySelectorAll = (el, sel) => !!el && el instanceof HTMLElement ? el.querySelectorAll(sel) : wd.querySelectorAll(el)
    const addEventListener = (el, type, callback) => el && type && callback && el.addEventListener(type, callback, false)
    const createElement = (tag) => !!tag && wd.createElement(tag)
    const appendChild = (el1, el2) => (!!el1 && !!el2 && (el1 instanceof HTMLElement) && (el2 instanceof HTMLElement)) && el1.appendChild(el2)
    const addStyle = (str) => {
        if (window?.GM_addStyle && typeof window.GM_addStyle == 'function') {
            window.GM_addStyle(str)
        } else {
            let head = querySelector('head')
            let style = createElement('style')
            style.innerText = str
            head.appendChild(style)
        }
    }
    const removeDOM = (element, realRemove = false) => {
        try {
            if (!(element instanceof HTMLElement)) {
                element = querySelector(element)
            }
            if (element instanceof HTMLElement) {
                element.style.display = 'none'
                if (realRemove) {
                    element.remove()
                }
            }
        } catch (e) { } // 防止element没有remove方法而抛出异常
    }
    const s2d = (string) => new DOMParser().parseFromString(string, 'text/html').body.childNodes[0]

    const isArray = (a) => a && a?.length > 0

    const getLocalStore = (k, type = Array.name, isParse = true) => {
        let obj = wls.getItem(k);
        if (type == Array.name) {
            if (isParse && obj) {
                obj = JSON.parse(obj);
            }
            return Array.isArray(obj) ? obj : [];
        }
        if (type == Object.name) {
            if (isParse && obj) {
                obj = JSON.parse(obj);
            }
            return obj ? obj : {};
        }
        if (type == String.name) {
            return obj ? obj : "";
        }
        if (type == Boolean.name) {
            return obj == "true" || obj == true ? true : false;
        }
        return obj;
    }

    const addLocalStore = (k, v = [], type = Array.name, isParse = true) => (type == Object.name || type == Array.name) && isParse ? wls.setItem(k, JSON.stringify(v)) : wls.setItem(k, v)
    const removeVideo = (selector, time1 = 100, maxCount = 1000) => {
        let count = 0
        let video_timer = setInterval(() => {
            try {
                const video = querySelector(selector)
                if (video && video instanceof HTMLVideoElement) {
                    video.pause()
                }
                removeDOM(video, false)
                if (count >= maxCount) {
                    clearInterval(video_timer)
                }
                count = count + 1
            } catch (e) { }
        }, time1)
    }

    const throttle = (wait, func, ...args) => {
        let pre = Date.now();
        return () => {
            if (Date.now() - pre > wait) {
                func(...args)
                pre = Date.now()
            }
        }
    }

    const intervalRemoveElement = (selectors, time = 160, maxCount = 1000) => {
        if (!isArray(selectors)) {
            return;
        }
        let count = 0
        let timer = setInterval(() => {
            selectors.forEach(sel => {
                removeDOM(sel, true)
            })
            if (count >= maxCount) {
                clearInterval(timer)
                return;
            }
            count = count + 1
        }, time)


    }

    const backgroundNone = (element, selectors = ['.layout-Main'], time = 100, maxCount = 500) => {
        if (!(element instanceof HTMLElement) || !isArray(selectors)) {
            return;
        }
        let count = 0
        let timer = setInterval(() => {
            selectors.forEach(sel => {
                let b = querySelector(element, sel)
                if (!(b instanceof HTMLElement)) {
                    return;
                }
                b.style.backgroundImage = 'none'
            })
            // 结束计时器 减少浏览器性能开销
            if (count >= maxCount) {
                clearInterval(timer)
                return;
            }
            count = count + 1
        }, time)

    }

    const hasVideo = (element, selector = '.layout-Main') => !!querySelector(element, selector)


    /**
     * 页面加载完成
     */
    window.onload = () => {
        setTimeout(() => {
            try {
                let text = is_huya ? '虎牙' : '斗鱼'
                text = '%c欢迎使用' + text + '直播插件,下载地址%c'
                if (!is_localhost) {
                    console.clear()
                }
                console.log(
                    text
                        .concat(download_plugin_url, ''),
                    'background: rgb(255, 93, 35); padding: 1px; border-radius: 3px 0 0 3px; color: #fff',
                    'border-radius: 0 3px 3px 0; color: #fff')
                console.log(
                    '%c源码地址:%c '
                        .concat(source_code_url, ''),
                    'background: rgb(255, 93, 35); padding: 1px; border-radius: 3px 0 0 3px; color: #fff',
                    'border-radius: 0 3px 3px 0; color: #fff')
                if (querySelector && querySelectorAll) {
                    //插件执行入口
                    if (is_huya) {
                        // 执行虎牙直播插件
                        new TriggerLive()
                    } else if (is_douyu) {
                        // 执行斗鱼直播插件
                        new FishLive()
                    }
                    else if (is_localhost) {
                        // 本地测试使用
                        console.log('本地环境运行中....')
                        new LivePlugin()
                    }
                    else {
                        log('插件地址不适配，请检查匹配地址！！！', 'error')
                    }
                }
                else {
                    log('请使用新版浏览器，该插件不支持！', 'error')
                }

            } catch (e) {
                log(e)
            }

        }, 0)
    }



    /**
     * 日志输出
     */
    const log = (msg, level = 'log') => {
        if (level == 'log') {
            console.log(new Date().toLocaleString(), msg);
        }
        if (level == 'info') {
            console.info(new Date().toLocaleString(), msg);
        }
        if (level == 'warn') {
            console.warn(new Date().toLocaleString(), msg);
        }
        if (level == 'error') {
            console.error(new Date().toLocaleString(), msg);
        }
    }


    /**
     * 主播类
     */
    class HostUser {
        constructor(roomId, name) {
            this.roomId = roomId;
            this.name = name;
        }
    }


    /**
     * 直播插件，要求所有直播插件继承该类，并实现要求重写的方法！
     */
    class LivePlugin {
        constructor() {
            // 存放内容信息
            this.key = 'key'
            // 存放背景图
            this.bg_key = 'bg_key'
            // 是否显示背景key
            this.bg_show_key = 'bg_show_key'
            // 是否显示菜单
            this.menu_show_key = 'menu_show_key'
            // 是否剧场模式
            this.full_screen_key = 'full_screen_key'
            // 直播源
            this.baseUrl = "http://127.0.0.1:8080"
            // 默认背景图
            this.defaultBackgroundImage = 'https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/picgo/bg5.jpg'
            // 存放屏蔽主播信息
            this.users = []
            // body
            this.html = querySelector('html')
            // body
            this.body = querySelector('body')
            // 菜单
            this.menu = null
            // 操作数据
            this.tbody = null
            // 操作容器
            this.m_container = null
            // gift
            this.gift_key = this.key + '_gift'
            this.giftTool = null
            // logo
            this.logo_btn = null
            this.logo_show_key = this.key + "_logo_show"
            this.header_logo = 'none'
            // 本地测试允许加载
            if (is_localhost) {
                this.init()
            }
        }

        // 初始化操作方法，子类可以继承该类，实现该类中空方法，参考此操作,初始化构造器实调用该方法就可以了。。。
        init() {
            if (!this.removeRoom()) {
                this.detail()
                this.common()
                this.index()
                this.category()
                // 面板
                this.create_container()
                // 设置菜单
                this.isShowLeftMenu()
                // 是否显示礼物
                this.isShowGift()
            }
            // 设置壁纸
            this.settingBackgroundImage()

        }


        /*********************************建议下面操作方法必须重写的,并且参考此步骤*****************************/

        // 公共部分页面操作
        common() { }
        //首页操作
        index() { }
        // 分类页面操作
        category() { }
        // 详情页操作
        detail() { }
        // 通过点击直播间名称删除直播间
        removeRoomByClickRoomName() { }
        // 通过房间号获取直播间name
        getNameByRoomId(roomId) {
            alert('该操作未实现！');
            return null
        }
        // 通过房间地址获取房间号
        getRoomIdByUrl(url) {
            return null
        }




        /*********************************子类继承无需修改的方法******************************/


        /**
         * 容器，所有操作容器均在此容器中，
         */
        create_container() {
            // 初始化房间号
            let that = this
            if (!that.body || !that.html) {
                that.html = querySelector('html')
                that.body = querySelector('body')
            }
            if (!that.body) {
                that.body = createElement('body')
            }
            that.users = getLocalStore(that.key, Array.name)
            let show1 = getLocalStore(that.bg_show_key, Boolean.name)
            let show2 = getLocalStore(that.menu_show_key, Boolean.name)
            let show3 = getLocalStore(that.full_screen_key, Boolean.name)
            let show4 = getLocalStore(that.gift_key, Boolean.name)
            let show5 = getLocalStore(that.logo_show_key, Boolean.name)
            that.m_container = s2d(`
		                     <div class="m-container">
                                <div class="m-container-box">
                                    <div class="operation">
                                        <input type="text" placeholder="房间号或者名称...">
                                        <button class="btn btn-primary add-room" title="复制地址栏房间号，手动添加房间">添加</button>
                                        <button class="btn btn-success clear-room" title="重置表格数据">重置</button>
                                        <button class="btn btn-warning bg-btn" title="上传背景图">背景</button>
                                        <input type="file" id="file">
                                        <input type="checkbox" id="checkbox1" ${show1 ? 'checked' : ''} class="checkbox" title="是否显示背景" />背景
                                        <input type="checkbox" id="checkbox2" ${show2 ? 'checked' : ''} class="checkbox" title="是否显示左侧菜单"/>菜单
                                        <input type="checkbox" id="checkbox3" ${show3 ? 'checked' : ''} class="checkbox" title="自动适应屏幕"/>剧场
                                        <input type="checkbox" id="checkbox4" ${show4 ? 'checked' : ''} class="checkbox" title="是否开启礼物"/>礼物
                                        <input type="checkbox" id="checkbox5" ${show5 ? 'checked' : ''} class="checkbox" title="关闭或者显示插件Logo"/>logo
                                        <a class="m-link" href="https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD" target="_blank" title="更新、反馈">更新</a>
                                        <button class="btn btn-info btn-close-container" title="关闭" style="float:right;">关闭</button>
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
		                     </div>
		 `)



            appendChild(that.body, that.m_container)
            that.tbody = querySelector(that.m_container, '.m-container table tbody')
            // 生成操作按钮
            that.operationDOMButton()
            // 添加直播房间号信息
            that.createRoomItem(that.users)
            // 右侧点击添加button
            that.createButton()

        }


        /**
         * 通过用户列表构建列表
         * @param {Object} arr  用户列表
         */
        createRoomItem(arr) {
            if (!isArray(arr)) {
                return;
            }
            let that = this
            arr.forEach((item, index) => {
                let tr = createElement('tr')
                tr.innerHTML =
                    `<td>${index + 1}</td>
		                  <td>${item.name}</td>
		                  <td>${item.roomId}</td>
		                  <td>
		                  <button class="btn btn-danger" room-id="${item.roomId}">删除</button></td>`
                that.tbody.appendChild(tr)
                // 添加删除事件
                const deleteBtn = querySelector(tr, 'button')
                addEventListener(deleteBtn, 'click', function (e) {
                    let roomId = e.target.getAttribute('room-id');
                    that.userDelete(roomId)
                    // 如果是当前主播，需要刷新
                    if (that.getRoomIdByUrl(local_url) == roomId) {
                        window.location.reload()
                    }
                    removeDOM(tr, true)
                })

            })
        }




        /**
         * 绘制表格
         * @param {Object} arr 表格数据
         */
        resetTbody(arr) {
            if (!this.tbody) {
                return;
            }
            querySelectorAll(this.tbody, 'tr').forEach(item => removeDOM(item, true))
            this.createRoomItem(arr)
        }


        /**
         * 操作框容器
         */
        operationDOMButton() {
            let that = this
            if (!that.m_container) {
                return;
            }
            const container = that.m_container
            const inputValue = querySelector(container, '.m-container .operation input')
            addEventListener(inputValue, 'input', () => {
                let arr = that.users.filter(item => (item.roomId && item.roomId.indexOf(inputValue.value) != -1) || (item.name && item.name.indexOf(inputValue.value) != -1))
                that.resetTbody(arr)
            })

            // 添加
            const addRoomBtn = querySelector(container, '.m-container .operation  button.add-room')
            addEventListener(addRoomBtn, 'click', function () {
                const keywords = inputValue.value.trim()
                if (!keywords) {
                    return alert('请输入房间号！')
                }
                if (!that.userIsExist(keywords)) {
                    const name = that.getNameByRoomId(keywords)
                    if (name) {
                        that.addUser(keywords, name)
                        inputValue.value = ''
                    } else {
                        if (confirm(`房间号为${keywords}的主播不存在！确定添加？`)) {
                            that.addUser(keywords, keywords)
                            inputValue.value = ''
                        }
                    }

                } else {
                    alert('该主播已添加！')
                }
            })



            // 清空
            const clearRoomBtn = querySelector(container, '.m-container button.clear-room')
            addEventListener(clearRoomBtn, 'click', function () {
                if (confirm('确认重置？')) {
                    that.users = []
                    [that.key, that.bg_key, that.menu_show_key, that.gift_key, that.logo_show_key, that.full_screen_key].forEach(key => wls.removeItem(key))
                    that.resetTbody(that.users)
                    window.location.reload()
                }
            })
            // 文件上传
            const uploadButton = querySelector(container, '.m-container #file')
            addEventListener(uploadButton, 'change', function (e) {
                const file = uploadButton.files[0] || null
                // 图片格式校验
                if (!isImage(file?.name)) {
                    return alert("图片格式不正确！")
                }

                try {
                    let fileReader = new FileReader()
                    // 转码
                    fileReader.readAsDataURL(file)
                    fileReader.onerror = (e) => {
                        return alert('图片解析失败！' + JSON.stringify(e))
                    }
                    fileReader.onload = (e) => {
                        let base64 = e.target.result
                        let str = base64.slice(base64.indexOf(",") + 1);
                        if (atob) {
                            str = atob(str);
                            let bytes = str.length;
                            var size = (bytes / (1024 * 1024)).toFixed(2);
                            if (size > 5) {
                                if (confirm('图片保存失败，浏览器最大只能保存5MB大小图片，确认查看原因？')) {
                                    window.location.href = 'https://developer.mozilla.org/zh-CN/docs/Web/API/File_and_Directory_Entries_API/Introduction'
                                }
                                return;
                            }
                            // 保存到本地
                            addLocalStore(that.bg_key, base64, String.name, false)
                            that.settingBackgroundImage(e.target.result)

                        } else {
                            alert('保存失败，当前浏览器不支持！')
                        }

                    }

                } catch (e) {
                    alert('图片解析失败！')
                }

            })

            // 文件上传
            const upload = querySelector(container, '.m-container .bg-btn')
            addEventListener(upload, 'click', function (e) {
                uploadButton.click()
            })

            // 显示关闭
            const close_container = querySelector(container, '.m-container .btn-close-container')
            addEventListener(close_container, 'click', function (e) {
                that.isShowContainer()
            })
            // 选择背景
            const checkbox = querySelector(container, '.m-container #checkbox1')
            addEventListener(checkbox, 'change', function (e) {
                addLocalStore(that.bg_show_key, e.target.checked, Boolean.name)
                that.settingBackgroundImage()
            })
            // 是否关闭菜单
            const menu = querySelector(container, '.m-container #checkbox2')
            addEventListener(menu, 'change', function (e) {
                that.getLeftMenu(e.target.checked)
            })

            // 剧场模式
            const full_screen_btn = querySelector(container, '.m-container #checkbox3')
            addEventListener(full_screen_btn, 'change', function (e) {
                addLocalStore(that.full_screen_key, e.target.checked, Boolean.name)
            })

            // 礼物模式
            const show_gitf = querySelector(container, '.m-container #checkbox4')
            addEventListener(show_gitf, 'change', function (e) {
                addLocalStore(that.gift_key, e.target.checked, Boolean.name)
                that.isShowGift()
            })

            const show_logo_btn = querySelector(container, '.m-container #checkbox5')
            addEventListener(show_logo_btn, 'change', function (e) {
                e.preventDefault()
                console.log('before', that.logo_btn)
                if (!that.logo_btn) {
                    return alert('获取不到logo');
                }
                if (that.logo_btn.style.display === 'block') {
                    if (confirm('确认隐藏Logo？隐藏之后不再显示哦!如需显示logo，点击直播头部Logo即可显示')) {
                        that.logo_btn.style.display = 'none'
                        addLocalStore(that.logo_show_key, false, Boolean.name)
                    }
                } else {
                    that.logo_btn.style.display = 'block'
                    addLocalStore(that.logo_show_key, true, Boolean.name)
                }

            })
        }

        /**
         * 右侧操作按钮
         * @param text 指定按钮文本，默认是小虎牙或者是小鱼丸
         */
        createButton(text) {
            let that = this
            if (!!that.logo_btn) {
                return;
            }

            const btn = createElement('button')
            btn.style.cursor = 'pointer'
            btn.style.position = 'fixed'
            btn.style.top = '300px'
            btn.style.right = '0px'
            btn.style.padding = '5px 10px'
            btn.style.backgroundColor = 'rgb(255, 93, 35)'
            btn.style.border = 'none'
            btn.style.outline = 'none'
            btn.style.borderRadius = '20px'
            btn.style.fontSize = '12px'
            btn.style.color = '#fff'
            btn.style.zIndex = 999999999999
            btn.textContent = text ? text : (is_huya ? '小虎牙' : '小鱼丸')
            addEventListener(btn, 'click', function () {
                that.isShowContainer()
            })
            addEventListener(btn, 'mouseenter', function () {
                btn.style.backgroundColor = 'rgba(255, 93, 35,0.6)'
            })
            //添加拖拽事件
            let flag = false
            let x, y
            const mouse_key = that.key + "_mouse_key"
            // 从浏览器本地中获取位置信息
            let { mouse_left, mouse_top } = getLocalStore(mouse_key, Object.name)
            if (mouse_left || mouse_top) {
                btn.style.left = mouse_left + 'px'
                btn.style.top = mouse_top + 'px'
                btn.style.right = 'auto'
            }
            addEventListener(btn, 'mousedown', (event) => {
                // 鼠标距离顶部距离
                x = event.offsetX
                y = event.offsetY
                flag = true
                addEventListener(wd, 'mousemove', move)
            })

            addEventListener(btn, 'mouseup', () => {
                flag = false
                wd.onmousemove = null
            })

            addEventListener(btn, 'mouseleave', () => {
                flag = false
                btn.style.backgroundColor = 'rgba(255, 93, 35,1)'
                wd.onmousemove = null
            })
            function move(e) {
                e.preventDefault()
                if (!flag) {
                    return
                }
                // 计算位置信息
                let btn_top = Math.min(Math.max(0, e.clientY - y), window.innerHeight - btn.offsetHeight)
                let btn_left = Math.min(Math.max(0, e.clientX - x), window.innerWidth - btn.offsetWidth)

                btn.style.left = btn_left + 'px'
                btn.style.top = btn_top + 'px'
                btn.style.right = 'auto'
                addLocalStore(mouse_key, { 'mouse_left': btn_left, 'mouse_top': btn_top }, Object.name)

            }
            btn.style.display = getLocalStore(that.logo_show_key, Boolean.name) ? 'block' : 'none'
            that.logo_btn = btn
            appendChild(that.body, that.logo_btn)
        }

        /**
         * 该房间是否已改被删除
         * @param url 房间链接地址 默认 window.location.href
         */
        removeRoom(url = local_url) {
            if (!this.isRemove(url)) {
                return false
            }
            this.roomIsNeedRemove();
            return true
        }

        /**
         * 房间已被删除之后操作
         * @param url 房间链接地址 默认 window.location.href
         */
        roomAlreadyRemove() {
            let that = this
            removeDOM(this.body, true)
            // removeDOM(this.body, true)
            this.body = null; //必须设置为空！否则无法设置新的button
            const h2 = createElement('h3')
            let html = querySelector('html')
            let body = querySelector('body')
            if (!body) { // 如果原来的删除了，从新创建一个body存放内容
                body = createElement('body')
            }
            body.style.display = 'flex'
            body.style.flexDirection = 'column'
            body.style.justifyContent = 'center'
            body.style.alignItems = 'center'
            // 获取主播名称
            let name = this.getUser(this.getRoomIdByUrl(local_url)) ? this.getUser(this.getRoomIdByUrl(
                local_url)).name : ''
            const a = createElement('a')
            a.textContent = '点击解锁'
            a.style.display = 'block'
            a.style.cursor = 'pointer'
            a.style.fontSize = '20px'
            a.onclick = (e) => {
                e.preventDefault()
                that.userDelete(that.getRoomIdByUrl(local_url))
                window.location.reload()
            }
            h2.style.fontSize = '36px'
            h2.textContent = `主播【${name}】已被你屏蔽`
            let title = querySelector('title')
            if (!title) {
                title = createElement('title')
            }
            title.textContent = `主播【${name}】已被你屏蔽`
            html.appendChild(body)
            body.appendChild(h2)
            body.appendChild(a)
            let logo_show = getLocalStore(that.logo_show_key, Boolean.name)
            if (logo_show) {
                let logo = createElement('a')
                logo.textContent = '显示logo'
                logo.style.display = 'block'
                logo.style.cursor = 'pointer'
                logo.style.fontSize = '20px'
                logo.onclick = (e) => {
                    e.preventDefault()
                    logo.style.display = 'none'
                    addLocalStore(that.logo_show_key, false, Boolean.name)
                    that.createButton()
                }
                body.appendChild(logo)
            }
            removeDOM(this.m_container, true)
            this.m_container = null
            // 创建操作面板
            this.create_container()
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
        settingBackgroundImage(url) {
            if (!this.body) {
                return;
            }
            if (getLocalStore(this.bg_show_key, Boolean.name)) {
                url = !!url ? url : (wls.getItem(this.bg_key) ? wls.getItem(this.bg_key) : this.defaultBackgroundImage)
                this.body.style.backgroundSize = "cover"
                this.body.style.backgroundRepeat = 'no-repeat '
                this.body.style.backgroundAttachment = 'fixed'
                this.body.style.backgroundImage = `url(${url})`
            } else {
                this.body.style.backgroundImage = 'none'
            }

        }


        /**
         * 通过房间名称或者id判断房间是否已经保存到本地
         * @param keywords 房间名或者id
         * @param list 本地缓存数据，默认是本地缓存用户数据
         */
        userIsExist(keywords, list = this.users) {
            return this.getUser(keywords, list) ? true : false
        }


        /**
         * 通过房间名称或者id判断房间是否已经保存到本地
         * @param keywords 房间名或者id
         * @param list 本地缓存数据，默认是本地缓存用户数据
         */
        getUser(keywords, list = this.users) {
            for (let i = 0; i < list.length; i++) {
                if ((list[i].name && list[i].name == keywords) || (list[i].roomId && list[i].roomId == keywords)) {
                    return list[i]
                }
            }
            return null
        }



        /**
         * 通过房间id或者房间名删除本地缓存的数据
         * @param keywords 房间名或者id
         */
        userDelete(keywords) {
            let that = this
            if (!isArray(that.users)) {
                return;
            }
            that.users.forEach((item, index) => {
                if (keywords == item.name || keywords == item.roomId) {
                    that.users.splice(index, 1)
                }
            })
            addLocalStore(this.key, this.users)
        }


        /**
         * 添加并保存直播间
         * @param id, 房间id
         * @param name 房间名
         */
        addUser(id, name) {
            if (this.userIsExist(id) || this.userIsExist(name)) {
                alert('该房间已存在！')
                return;
            }
            if (!isArray(this.users)) {
                this.users = []
            }
            const newUser = new HostUser(id, name);
            // 添加
            this.users.unshift(newUser)
            // 保存到本地
            addLocalStore(this.key, this.users)
            this.resetTbody(this.users)
            // 如果是当前主播需要屏蔽
            if (id == this.getRoomIdByUrl(local_url)) {
                this.roomIsNeedRemove(local_url);
            }

        }

        /**
         * @param {selector}  = [选择器]
         * @param {selector}  = [是否真的删除，默认删除而不是display = 'none']
         */
        roomIsNeedRemove(selector = querySelector('video')) {
            this.roomAlreadyRemove()
            removeVideo(selector)
            this.settingBackgroundImage()
        }

        /*
         * 操作左侧导航栏，需要传入选择器，和修改值 建议放到公共方法下执行！
         * @param {selector}  = [选择器]
         * @param {value}  = [要修改的值]
         */
        getLeftMenu(value = false) {
            if (!this.menu) {
                return alert('获取不到导航菜单，操作失败！')
            }
            addLocalStore(this.menu_show_key, value, Boolean.name, false)
            this.menu.style.display = value ? 'block' : 'none'
        }

        /*
         * 操作左侧导航栏，需要传入选择器，和修改值 建议放到公共方法下执行！
         */
        isShowLeftMenu() {
            if (this.menu) {
                this.menu.style.display = getLocalStore(this.menu_show_key, Boolean.name, false) ? 'block' : 'none'
            }
        }

        /**
         * 是否显示礼物
         */
        isShowGift() {
            if (this.giftTool) {
                this.giftTool.style.display = getLocalStore(this.gift_key, Boolean.name) ? 'inline-block' : 'none'
            }
        }

        /**
         * 是否显示容器
         */
        isShowContainer() {
            if (this.m_container) {
                this.m_container.style.display = this.m_container.style.display == 'none' ? 'block' : 'none'
            }
        }

        /**
         *  点击 直播平台 Logo 显示 操作面板
         */
        clickLogoShowContainer() {
            if (this.header_logo === 'none') {
                return
            }
            let that = this
            setTimeout(() => {
                let a = querySelector(that.header_logo)
                a.href = 'javascript:;void(0)';
                a.title = '点击Logo，显示插件配置'
                addEventListener(a, 'click', (e) => {
                    that.isShowContainer()
                    return false
                })
            }, 5000);
        }
    }

    /**
     * 虎牙直播插件
     */
    class TriggerLive extends LivePlugin {
        constructor() {
            super()
            this.key = 'huyazhibo'
            this.bg_key = 'huyazhibo_bg'
            this.bg_show_key = 'huyazhibo_bg_show'
            this.menu_show_key = 'huyazhibo_menu_show_key'
            this.full_screen_key = 'huyazhibo_full_screen_key'
            this.defaultBackgroundImage = 'https://livewebbs2.msstatic.com/huya_1664197944_content.jpg'
            this.baseUrl = "https://www.huya.com/"
            this.users = getLocalStore(this.key, Array.name, true)
            this.html = querySelector('html')
            this.body = querySelector('body')
            this.menu = querySelector('.mod-sidebar')
            this.header_logo = '#duya-header #duya-header-logo a'
            this.giftTool = querySelector('.room-core .player-gift-wrap')
            this.tbody = null
            this.m_container = null
            this.init()
        }



        // 首页操作
        index() {
            // 直播源
            const url = local_url
            if (url == this.baseUrl) {
                // 操作视频
                removeVideo('.mod-index-main video')
                // 触发点击关闭广告
                const banner_close = querySelector('.mod-index-wrap #banner i')
                if (banner_close) {
                    banner_close.click();
                }
                let count = 0;
                // 暂停播放 防止后续加载出现
                let timer1 = setInterval(() => {
                    pauseBtn = querySelector('.player-pause-btn')
                    if (pauseBtn) {
                        pauseBtn.click()
                    }
                    if (count >= 10) {
                        clearInterval(timer1)
                    }
                    count = count + 1
                }, 300)

            }

        }
        // 分类页操作
        category() {
            if (new RegExp(/^https:\/\/.*\.huya\.((com)|(cn))\/g(\/.*)$/).test(local_url)) {
                let that = this
                const dd = querySelectorAll('.live-list-nav dd')
                if (isArray(dd)) {
                    for (let d of dd) {
                        addEventListener(d, 'click', () => {
                            setTimeout(() => {
                                that.removeRoomByClickRoomName()
                            }, 2000)
                        })

                    }
                }
            }
        }
        // 公共部分操作
        common() {
            this.removeRoomByClickRoomName()
            this.clickLogoShowContainer()
        }
        // 详情操作
        detail() {
            if (new RegExp(/^https:\/\/www\.huya\.com(\/\w+)$/).test(local_url)) {
                let that = this
                // 点击直播间移除直播间操作
                const hostName = querySelector('.host-name')
                hostName.title = `点击屏蔽主播【${hostName.textContent}】`
                addEventListener(hostName, 'click', () => {
                    if (confirm(`确认屏蔽主播 ${hostName.textContent}？`)) {
                        that.addUser(that.getRoomIdByUrl(local_url), hostName.textContent)
                    }
                })

                // 自动剧场模式
                let fullpageBtn = querySelector('#player-fullpage-btn')
                let show3 = getLocalStore(that.full_screen_key, Boolean.name)
                if (fullpageBtn && show3) {
                    setTimeout(() => { fullpageBtn.click() }, 2000)
                }

                let ads = [
                    '.main-wrap .room-mod-ggTop',
                    '#chatRoom .room-gg-chat',
                    '#huya-ab'
                ]

                // 对于恶意广告要彻底清空
                intervalRemoveElement(ads, 500, 20)


                // todo 特效设置暂时未开启！

                /*
                setTimeout(()=>{
                    // 视频区特效设置
                    let lvs = querySelector('.room-core #shielding-effect')
                    console.log('div@@@@',lvs)
                    if(lvs){

                        let lis = lvs.querySelectorAll('.list li')
                        console.log('li',lis)
                        for(let li of lis){
                            if(li && li.className!=='shield-cked'){
                                console.log('divs',li)
                                li.className='shield-cked'
                            }
                        }


                    }
                },100000)
                */


            }
        }
        // 通过地址获取房间号
        getRoomIdByUrl = (url = local_url) => {
            let arr = url.split('/')
            let roomId = arr[arr.length - 1]
            return roomId
        }

        // 通过房间号查找名称
        getNameByRoomId(roomId) {
            let that = this
            let hostName = querySelector('.host-name')
            if (!hostName) {
                return ''
            }
            const rooms = querySelectorAll('.game-live-item')
            if (!isArray(rooms)) {
                return ''
            }
            for (let room of rooms) {
                const a = querySelector(room, 'a')
                if (a && a.href) {
                    const id = that.getRoomIdByUrl(a.href)
                    const user = querySelector(room, '.txt i')
                    if (id === roomId) {
                        hostName = user
                    }
                }

            }
            return hostName?.textContent || ''
        }

        // 通过点击直播间名称删除直播间
        removeRoomByClickRoomName() {
            const that = this
            const rooms = querySelectorAll('.game-live-item')
            if (!isArray(rooms)) {
                return;
            }
            for (let li of rooms) {
                const a = querySelector(li, 'a')
                // 获取单个主播间房间地址
                const url = a.href
                // 获取房间i
                const user = querySelector(li, '.txt i')
                const name = user.textContent || ''
                addEventListener(user, 'click', () => {
                    if (confirm(`确认禁用 ${name}？`)) {
                        that.addUser(that.getRoomIdByUrl(url), name);
                        removeDOM(li);
                    }
                })
                if (that.isRemove(url)) {
                    removeDOM(li)
                }
            }

        }

    }

    /**
     * 斗鱼直播插件
     */
    class FishLive extends LivePlugin {
        constructor() {
            super()
            this.key = 'douyuzhibo'
            this.bg_key = 'douyuzhibo_bg'
            this.bg_show_key = 'douyuzhibo_show'
            this.menu_show_key = 'douyuzhibo_menu_show_key'
            this.full_screen_key = 'douyuzhibo_full_screen_key'
            this.baseUrl = "https://www.douyu.com/"
            this.defaultBackgroundImage = 'https://sta-op.douyucdn.cn/dylamr/2022/11/07/1e10382d9a430b4a04245e5427e892c8.jpg'
            this.users = getLocalStore(this.key, Array.name, true)
            this.html = querySelector('html')
            this.body = querySelector('body')
            this.menu = querySelector('#js-aside')
            this.giftTool = querySelector('.layout-Player-main #js-player-toolbar')
            this.header_logo = '#js-header .Header-left .Header-logo'
            this.tbody = null
            this.m_container = null
            setTimeout(() => {
                this.init()
            }, 500)
        }
        // 公共部分页面操作
        common() {
            this.clickLogoShowContainer()
        }
        //首页操作
        index() {
            let that = this
            // 直播源
            if (window.location.href == that.baseUrl) {
                window.scroll(0, 0)
                // 移除直播
                removeVideo('.layout-Slide-player video')
                // 获取暂停button
                const vbox = querySelector('#room-html5-player');
                if (vbox) {
                    const divs = querySelectorAll(vbox, 'div')
                    if (isArray(divs)) {
                        for (let div of divs) {
                            if (div?.title == '暂停') {
                                div.click()
                            }
                        }
                    }
                }
                let init_users = []
                setTimeout(() => {
                    that.removeRoomByClickRoomName(init_users)
                }, 3000)
                // 斗鱼直播使用节流方式加载,只有鼠标下滑,下方直播间才会加载,首次加载不会加载所有页面直播间列表
                // 因此,添加滚动事件来添加
                // 另外防止二次或者多次添加点击事件,将之前保存到init_users中来记录是否该添加
                window.onscroll = throttle(1000, () => {
                    console.log('init')
                    that.removeRoomByClickRoomName(init_users)
                })


                // btn
                let topBtn = querySelector('.layout-Main .ToTopBtn')
                if (topBtn) {
                    topBtn.style.display = 'block'
                }
            }
        }
        // 分类页面操作
        category() {
            let that = this
            // 匹配分类页
            if (new RegExp(/https:\/\/www.douyu.com(\/((directory.*)|(g_.*)))$/).test(window.location.href)) {
                that.removeRoomByClickRoomName()
                const labels = querySelectorAll('.layout-Module-filter .layout-Module-label')
                if (isArray(labels)) {
                    for (let label of labels) {
                        addEventListener(label, 'click', (e) => {
                            e.preventDefault()
                            // 获取当前地址
                            let to_link = label && label.href ? label.href : null
                            if (to_link) {
                                window.location.href = to_link
                            } else {
                                // 获取全部地址
                                var result = 'https://www.douyu.com/g_' + local_url.match(RegExp(
                                    /subCate\/.*/g))[0].replace('subCate', '').match(new RegExp(
                                        /\w+/g))[0]
                                window.location.href = result
                            }

                        })

                    }
                }


            }


        }


        // 详情页操作
        detail() {
            let that = this
            // window.scroll(0, 0)
            // 匹配只有在播放直播间才会生效
            if (!new RegExp(/.*douyu.*(\/((.*rid=\d+)|(\d+)))$/).test(local_url)) {
                return;
            }
            setTimeout(() => {
                // 点击主播直播间名称进行操作
                const hostName = querySelector('.Title-roomInfo h2.Title-anchorNameH2')
                hostName.title = `点击屏蔽主播【${hostName?.textContent}】`
                addEventListener(hostName, 'click', () => {
                    if (confirm(`确认屏蔽主播【${hostName?.textContent}】？`)) {
                        that.addUser(that.getRoomIdByUrl(local_url), hostName.textContent)
                    }
                })
            }, 4000)

            // 带有轮播图
            if (new RegExp(/.*douyu.*\/topic(\/(.*rid=\d+))$/).test(local_url)) {
                let divs = querySelectorAll('#root>div')
                let backgroundNones = ['.wm-general-wrapper.bc-wrapper.bc-wrapper-player', '.wm-general-bgblur']
                if (isArray(divs)) {
                    for (let element of divs) {
                        if (hasVideo(element, '.layout-Main')) {
                            backgroundNone(element, backgroundNones)
                            // let videoContainer = querySelector(element, '.layout-Main')
                            // videoContainer.style.width = '100% !important;'
                            // videoContainer.style.maxWidth = '100vw !important;'
                        } else {
                            removeDOM(element, true)
                        }

                    }
                }


            }


            // 不带有轮播图
            if (new RegExp(/.*douyu.*(\/(\d+))$/).test(local_url)) {
                // 如果是小窗口 判断播放窗口是否存在
                let times = 20
                let count = 0
                let timer = setInterval(() => {
                    const closeBtn = querySelector('.roomSmallPlayerFloatLayout-closeBtn')
                    if (closeBtn) {
                        closeBtn.click()
                        // 如果成功点击了需要清除循环计时器，否则无法点击礼物等弹窗
                        clearInterval(timer)
                        return;
                    }
                    if (count > times) {
                        clearInterval(timer)
                        return;
                    }
                    count = count + 1
                }, 500)
            }

            // 对于恶意广告要彻底清除！！！
            let ads = [
                "#player-above-controller+div"
            ]
            //intervalRemoveElement(ads, 500, 20)
            removeDOM('.layout-Main .ToTopBtn', true)


            // 是否全屏
            // setTimeout(()=>{
            //     let tool_controller = querySelector('#player-above-controller')
            //     console.log('tool', tool_controller)
            //     if (tool_controller) {
            //         let divs = querySelectorAll(tool_controller, 'div')
            //         if (isArray(divs)) {
            //             for (let div of divs) {
            //                 console.log('div', div.title === '全屏')
            //                 if (div.title === "全屏") {
            //                     div.click()
            //                 }
            //             }
            //         }
            //     }
            // },5000)

            // TODO 新增功能，大屏小屏幕
            /*
            let vs = querySelectorAll('.wm-general')
            if(vs && vs?.length>0){
                for(let v of vs){
                    v.style.width = (window.innerWidth - 200 ) + 'px'
                    v.style.height = (window.innerHeight - 100 ) + 'px'
                    console.log('resize',v.style.width,v.style.height)
                    window.addEventListener('resize',()=>{
                        v.style.width = (window.innerWidth - 200 ) + 'px'
                        v.style.height = (window.innerHeight - 100 ) + 'px'
                        console.log('resize',v.style.width,v.style.height)
                    })

                }
            }
            */



        }
        // 通过点击直播间名称删除直播间
        removeRoomByClickRoomName(list = []) {
            let that = this
            if (this.baseUrl == local_url) {
                const rooms = querySelectorAll('.layout-List-item')
                if (isArray(rooms)) {
                    for (let li of rooms) {
                        try {
                            // 获取单个主播间房间地址
                            const a = querySelector(li, '.DyCover')
                            if (!a) {
                                return;
                            }
                            const url = a?.href || ''
                            const user = querySelector(li, '.DyCover-user')
                            const name = user?.textContent || ''
                            if (user && (!that.userIsExist(name, list) || !that.userIsExist(url, list))) {
                                setTimeout(() => {
                                    a.href = 'javascript:;void(0)'
                                    console.log('a', a.href, a.title)
                                }, 1000)
                                // 添加记录
                                list.unshift(new HostUser(url, name))
                                addEventListener(user, 'click', (e) => {
                                    e.preventDefault()
                                    if (confirm(`确认禁用 ${name}`)) {
                                        that.addUser(that.getRoomIdByUrl(url), name);
                                        removeDOM(li);
                                    }
                                })
                            }

                            if (that.isRemove(url) || that.userIsExist(name)) {
                                removeDOM(li)
                            }
                        } catch (e) { }

                    }

                }
            }

            if (new RegExp(/https:\/\/www.douyu.com(\/((directory.*)|(g_.*)))$/).test(local_url)) {
                const rooms = querySelectorAll('.layout-Cover-item')
                if (isArray(rooms)) {
                    for (let li of rooms) {
                        try {
                            if (li) {
                                const link = querySelector(li, 'a.DyListCover-wrap')
                                if (link) {
                                    // link.onclick = ()=>false
                                    const url = link?.href || ''
                                    link.href = 'javascript:;void(0)'
                                    const user = querySelector(link, 'div.DyListCover-userName')
                                    const name = user.textContent || ''
                                    // 判断该直播间列表窗口是否需要删除
                                    if (that.isRemove(url) || that.userIsExist(name)) {
                                        removeDOM(li, true)
                                    } else {
                                        addEventListener(user, 'click', (e) => {
                                            if (confirm(`确认禁用 ${name}？`)) {
                                                const id = that.getRoomIdByUrl(url);
                                                that.addUser(id, name);
                                                removeDOM(li);
                                            }
                                            e.preventDefault()
                                        })
                                        // 监听鼠标移入事件
                                        addEventListener(li, 'mouseenter', (e) => {
                                            const a = querySelector(e.target, 'a.DyListCover-wrap.is-hover')
                                            if (!a) {
                                                return;
                                            }
                                            const url = a.href
                                            a.href = 'javascript:;void(0)'
                                            const user = querySelector(a, '.DyListCover-userName')
                                            const name = user.textContent || ''
                                            addEventListener(user, 'click', (a) => {
                                                if (confirm(`确认禁用 ${name}？`)) {
                                                    const id = that.getRoomIdByUrl(url);
                                                    that.addUser(id, name);
                                                    removeDOM(li);
                                                }
                                            })

                                        })
                                    }

                                }
                            }

                        } catch (e) { }
                    }
                }

            }

        }


        // 通过房间号获取直播间name
        getNameByRoomId(keywords) {
            let that = this
            // 从详情页获取
            let hostName = querySelector('.Title-blockInline .Title-anchorName h2')
            let rooms = null;
            if (!hostName) {
                rooms = querySelectorAll('.layout-List-item')
                // index
                if (isArray(rooms)) {
                    for (let room of rooms) {
                        const id = that.getRoomIdByUrl(querySelector(room, 'a').href)
                        const user = querySelector(room, '.DyCover-user')
                        if (id == keywords) {
                            hostName = user
                        }
                    }
                }
                // 如果还是获取不到从分类页面获取
                if (!hostName) {
                    rooms = querySelectorAll('.layout-Cover-item')
                    if (isArray(rooms)) {
                        for (let room of rooms) {
                            const id = that.getRoomIdByUrl(querySelector(room, 'a').href)
                            const user = querySelector(room, '.DyListCover-userName')
                            if (id == keywords) {
                                hostName = user
                            }
                        }
                    }
                }


            }
            return hostName?.textContent || ''
        }


        // 通过房间地址获取房间号
        getRoomIdByUrl(url) {
            try {
                if (new RegExp(/https:\/\/.*(rid=.*)$/).test(local_url)) {
                    return local_url.match(new RegExp(/rid=.*/g))[0].replace('rid=', '')
                } else {
                    let arr = url.split('/')
                    let roomId = arr[arr.length - 1]
                    return roomId
                }

            } catch (e) {
                return null
            }
        }



    }


    // 样式部分
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
            box-sizing: border-box !important;
            position: fixed !important;
            display: none;
            flex-direction: column !important;
            width: 650px !important;
            height: 400px !important;
            top: 100px !important;
            left: 50% !important;
            border-radius: 10px !important;
            overflow: hidden !important;
            background-color: #fff !important;
            transform: translateX(-50%) !important;
            z-index: 1000 !important;
            padding: 15px !important;
            transition: display linear 1s !important;
            box-shadow: 20px 20px 10px rgba(0, 0, 0, 0.1),
                -1px -2px 18px rgba(0, 0, 0, 0.1) !important;
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
        }

        .m-container .operation input[type="text"] {
            width: 150px !important;
            box-sizing: border-box !important;
            outline: 1px solid rgba(8, 235, 46, 0.6) !important;
            border: none !important;
            padding: 5px 10px !important;
            border-radius: 20px !important;
        }

        .m-container .operation input[type="text"]:focus {
            outline: 1px solid rgba(8, 235, 46, 1) !important;
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
            overflow: hidden auto  !important;
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
            color: #fff !important;
            font-size: 1rem !important;
            border-radius: 20px !important;
            max-width: 50px !important;
            margin: 0 0 !important;
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
 `)

})()