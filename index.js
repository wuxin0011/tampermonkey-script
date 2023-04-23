// ==UserScript==
// @name         直播插件
// @namespace    http://tampermonkey.net/
// @version      3.8.6
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
    const huya_address_pattern = /^https:\/\/.*\.huya\.((com)|(cn)).*/
    const doyu_address_pattern = /^https:\/\/.*\.douyu\.((com)|(cn)).*/
    const bg_regx = /.*(\.(png|jpg|jpeg|apng|avif|bmp|gif|ico|cur|svg|tiff|webp))$/; // 图片格式
    const local_url = window.location.href
    const is_huya = huya_address_pattern.test(local_url) // 是否是虎牙地址
    const is_douyu = doyu_address_pattern.test(local_url) // 是否是斗鱼地址
    const wd = window.document
    const wls = window.localStorage // 简化存储对象
    const wdq = (selector) => window.document.querySelector(selector)
    const wql = (selector) => window.document.querySelectorAll(selector)
    const download_plugin_url = 'https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD' // 下载地址
    const source_code_url = 'https://github.com/wuxin0011/huya-live' // 源码地址
    const time = 2000 //延迟时间

    /**
     * 页面加载完成
     */
    window.onload = () => {
        setTimeout(() => {
            try {
                let text = is_huya ? '虎牙' : '斗鱼'
                text = '%c欢迎使用' + text + '直播插件,下载地址%c'
                console.clear()
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
                if (wdq && wql) {
                    //插件执行入口
                    if (is_huya) {
                        // 执行虎牙直播插件
                        new TriggerLive()
                    } else if (is_douyu) {
                        // 执行斗鱼直播插件
                        new FishLive()
                    } else {
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
            this.baseUrl = "baseUrl"
            // 默认背景图
            this.defaultBackgroundImage = 'defaultBackgroundImage'
            // 存放屏蔽主播信息
            this.users = []
            // body
            this.html = null
            // body
            this.body = null
            // 菜单
            this.menu = null
            // 操作数据
            this.tbody = null
            // 操作容器
            this.m_container = null
            // logo
            this.logo_btn = null
            // index video
        }

        // 初始化操作方法，子类可以继承该类，实现该类中空方法，参考此操作,初始化构造器实调用该方法就可以了。。。
        init() {
            if (!this.removeRoom()) {
                this.detail()
                this.common()
                this.index()
                this.category()
                this.create_container()
            }
            // 设置壁纸
            this.settingBackgroundImage()
            // 设置菜单
            this.loadLeftMenu()
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

        /*********************************下面方法不建议重写******************************/


        /**
         * 容器，所有操作容器均在此容器中，
         */
        create_container() {
            // 初始化房间号
            let that = this
            if (!that.body || !that.html) {
                that.html = wdq('html')
                that.body = wdq('body')
            }
            if (!that.body) {
                that.body = wd.createElement('body')
            }
            that.users = that.getLocalStore(that.key, Array.name)
            let show1 = that.getLocalStore(that.bg_show_key, Boolean.name)
            let show2 = that.getLocalStore(that.menu_show_key, Boolean.name)
            let show3 = that.getLocalStore(that.full_screen_key, Boolean.name)
            that.m_container = that.s2d(`
		                     <div class="m-container">
                              <div class="m-container-box">
		                     <div class="operation">
		                          <input type="text" placeholder="房间号或者名称...">
		                           <button class="btn btn-teal add-room" title="复制地址栏房间号，手动添加房间">添加</button>
		                           <button class="btn btn-info flush-room" title="刷新表格数据">刷新</button>
		                           <button class="btn btn-danger clear-room" title="重置表格数据">重置</button>
                                   <button class="btn btn-warning bg-btn" title="上传背景图">上传</button>
		                           <input type="file" id="file">
		                           <input type="checkbox" id="checkbox1" ${show1 ? 'checked' : ''} class="checkbox" title="是否显示背景" />背景
		                           <input type="checkbox" id="checkbox2" ${show2 ? 'checked' : ''} class="checkbox" title="是否显示左侧菜单"/>菜单
                                   <input type="checkbox" id="checkbox3" ${show3 ? 'checked' : ''} class="checkbox" title="自动适应屏幕"/>剧场
                                   <a class="m-link m-hide-btn" title="隐藏Logo，不再显示,如果需要开启，点击直播间主播名称，禁用即可出现显示" style="cursor:pointer;">隐藏</a>
                                   <a class="m-link" href="https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD" target="_blank" title="更新、反馈">更新</a>
                                   <a class="m-link close-btn" title="关闭弹窗，不再显示" style="cursor:pointer;">关闭</a>
                               </div>
		                      <table >
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



            that.body.appendChild(that.m_container)
            that.tbody = that.m_container.querySelector('.m-container table tbody')
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
            if (!Array.isArray(arr)) {
                return;
            }
            let that = this
            arr.forEach((item, index) => {
                let tr = wd.createElement('tr')
                tr.style.borderBottom = '1px solid rgba(0,0,0,0.4)'
                tr.style.margin = '10px 0'
                tr.style.padding = '20px 10px'
                tr.innerHTML =
                    `<td style="padding:10px;">${index + 1}</td>
		                  <td style="padding:10px;">${item.name}</td>
		                  <td style="padding:10px;">${item.roomId}</td>
		                  <td style="padding:10px;">
		                  <button class="btn btn-danger" room-id="${item.roomId}">删除</button></td>`
                that.tbody.appendChild(tr)
                // 添加删除事件
                const deleteBtn = tr.querySelector('button')
                deleteBtn.addEventListener('click', function (e) {
                    let roomId = e.target.getAttribute('room-id');
                    that.userDelete(roomId)
                    // 如果是当前主播，需要刷新
                    if (that.getRoomIdByUrl(local_url) == roomId) {
                        window.location.reload()
                    }
                    that.removeDOM(tr)
                })

            })
        }


        /**
         * 解析DOM字符串
         * @param {Object} string DOM文档树
         */
        s2d(string) {
            return new DOMParser().parseFromString(string, 'text/html').body.childNodes[0]
        }

        /**
         * 绘制表格
         * @param {Object} arr 表格数据
         */
        resetTbody(arr) {
            // 删除原来dom
            this.removeDOM(this.tbody, true)
            let table = this.m_container.querySelector('.m-container table')
            this.tbody = wd.createElement('tbody')
            let thead = wd.createElement('thead')
            let room_index = wd.createElement('th')
            let room_name = wd.createElement('th')
            let room_id = wd.createElement('th')
            let room_operation = wd.createElement('th')
            thead.appendChild(room_index)
            thead.appendChild(room_name)
            thead.appendChild(room_id)
            thead.appendChild(room_operation)
            table.appendChild(this.tbody)
            // 添加操作窗口
            this.createRoomItem(arr)
            //this.tbody.querySelectorAll('tr').forEach(item=>this.removeDOM(item, true))
            //this.createRoomItem(arr)

        }


        /**
         * 操作框容器
         */
        operationDOMButton() {
            let that = this
            if (!that.m_container) {
                return;
            }
            const inputValue = that.m_container.querySelector('.m-container .operation input')
            if (inputValue) {
                // 输入框
                inputValue.addEventListener('keyup', function (e) {
                    if (e.keyCode == 13) {
                        that.getInputArr(inputValue.value)
                    }
                })
                inputValue.oninput = () => {
                    that.getInputArr(inputValue.value)
                }
            }

            // 添加
            const addRoomBtn = that.m_container.querySelector('.m-container .operation  button.add-room')
            if (addRoomBtn) {
                addRoomBtn.addEventListener('click', function () {
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

            }

            // 刷新
            const flushRoomBtn = that.m_container.querySelector('.m-container button.flush-room')
            if (flushRoomBtn) {
                flushRoomBtn.addEventListener('click', function () {
                    that.users = that.getLocalStore()
                    that.resetTbody(that.users)
                })
            }

            // 清空
            const clearRoomBtn = that.m_container.querySelector('.m-container button.clear-room')
            if (clearRoomBtn) {
                clearRoomBtn.addEventListener('click', function () {
                    if (confirm('确认重置？')) {
                        that.users = []
                        wls.removeItem(that.key)
                        wls.removeItem(that.bg_key)
                        wls.removeItem(that.menu_show_key)
                        that.resetTbody(that.users)
                        window.location.reload()
                    }
                })
            }

            // 文件上传
            const uploadButton = that.m_container.querySelector('.m-container #file')
            if (uploadButton) {
                uploadButton.addEventListener('change', function (e) {
                    const file = uploadButton.files[0] || null
                    // 图片格式校验
                    if (!bg_regx.test(file?.name)) {
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
                                        // window.open('https://developer.mozilla.org/zh-CN/docs/Web/API/File_and_Directory_Entries_API/Introduction','_blank')
                                        window.location.href = 'https://developer.mozilla.org/zh-CN/docs/Web/API/File_and_Directory_Entries_API/Introduction'
                                    }
                                    return;
                                }
                                // 保存到本地
                                that.addLocalStore(that.bg_key, base64, String.name, false)
                                that.settingBackgroundImage(e.target.result)

                            } else {
                                alert('保存失败，当前浏览器不支持！')
                            }

                        }

                    } catch (e) {
                        alert('图片解析失败！')
                    }

                })
            }

            // 文件上传
            const upload = that.m_container.querySelector('.m-container .bg-btn')
            if (upload) {
                upload.addEventListener('click', function (e) {
                    uploadButton.click()
                })
            }
            // 选择背景
            const checkbox = that.m_container.querySelector('.m-container #checkbox1')
            if (checkbox) {
                checkbox.addEventListener('change', function (e) {
                    that.addLocalStore(that.bg_show_key, e.target.checked, Boolean.name)
                    that.settingBackgroundImage()
                })
            }
            // 是否关闭菜单
            const menu = that.m_container.querySelector('.m-container #checkbox2')
            if (menu) {
                menu.addEventListener('change', function (e) {
                    that.getLeftMenu(e.target.checked)
                })
            }
            // 剧场模式
            const full_screen_btn = that.m_container.querySelector('.m-container #checkbox3')
            if (full_screen_btn) {
                full_screen_btn.addEventListener('change', function (e) {
                    that.addLocalStore(that.full_screen_key, e.target.checked, Boolean.name)
                })
            }

            // 隐藏操作栏
            const hide_btn = that.m_container.querySelector('.m-container .m-hide-btn')
            if (hide_btn) {
                hide_btn.addEventListener('click', function (e) {
                    e.preventDefault()
                    if (confirm('确认隐藏Logo？隐藏之后不再显示哦!如需显示logo，点击直播间名称封禁主播之后可显示解锁按钮！')) {
                        that.addLocalStore(that.key + "_logo_show", true, Boolean.name)
                        if (that.logo_btn) {
                            that.logo_btn.click() //关闭容器
                            that.logo_btn.style.display = 'none'
                        }
                    }
                })
            }
        }

        getInputArr(inputValue) {
            let arr = this.users.filter(item => (item.roomId && item.roomId.indexOf(inputValue) != -1) || (item.name && item.name.indexOf(inputValue) != -1))
            this.resetTbody(arr)
        }

        /**
         * 右侧操作按钮
         * @param text 指定按钮文本，默认是小虎牙或者是小鱼丸
         */
        createButton(text) {
            let that = this
            let show = that.getLocalStore(that.key + "_logo_show", Boolean.name)
            // 隐藏logo
            if (show) {
                return;
            }
            const btn = wd.createElement('button')

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
            btn.addEventListener('click', function (e) {
                if (that.m_container.style.display === 'block') {
                    that.m_container.style.display = 'none'
                } else {
                    that.m_container.style.display = 'block'
                }
            })
            btn.addEventListener('mouseenter', function () {
                btn.style.backgroundColor = 'rgba(255, 93, 35,0.6)'
            })
            //添加拖拽事件
            let flag = false
            let x, y, mouseLeft, mouseTop
            const mouse_key = that.key + "_mouse_key"
            // 从浏览器本地中获取位置信息
            let { mouse_left, mouse_top } = that.getLocalStore(mouse_key, Object.name)
            if (mouse_left || mouse_top) {
                btn.style.left = mouse_left + 'px'
                btn.style.top = mouse_top + 'px'
                btn.style.right = 'auto'
            }
            btn.addEventListener('mousedown', (event) => {
                // 鼠标距离顶部距离
                x = event.offsetX
                y = event.offsetY
                flag = true
                wd.addEventListener('mousemove', move)
            })

            btn.addEventListener('mouseup', () => {
                flag = false
                //wd.removeEventListener('mousemove',move)
                wd.onmousemove = null
            })

            btn.addEventListener('mouseleave', () => {
                flag = false
                btn.style.backgroundColor = 'rgba(255, 93, 35,1)'
                // wd.removeEventListener('mousemove',move)
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
                //保持到本地
                that.addLocalStore(mouse_key, { 'mouse_left': btn_left, 'mouse_top': btn_top }, Object.name)

            }
            that.logo_btn = btn
            that.body.appendChild(btn)

            //添加弹窗点击关闭
            const closeBtn = that.m_container.querySelector('.m-container .close-btn')
            if (closeBtn) {
                closeBtn.addEventListener('click', function () {
                    if (that.m_container.style.display === 'block') {
                        that.m_container.style.display = 'none'
                    } else {
                        that.m_container.style.display = 'block'
                    }
                })
            }


        }

        /**
         * 删除DOM
         * @param element 需要删除的元素
         * @param realRemove 是否真实删除，默认不删除
         */
        removeDOM(element, realRemove = false) {
            try {
                if (element instanceof HTMLElement) {
                    element.style.display = 'none'
                    if (realRemove) {
                        element.remove()
                    }
                }
            } catch (e) { } // 防止element没有remove方法而抛出异常
        }

        /**
         * 删除DOM
         * @param selector 选择器
         * @param realRemove 是否真实删除，默认不删除
         *
         */
        removeElement(selector, realRemove = false) {
            this.removeDOM(wdq(selector), realRemove)
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
            this.removeDOM(this.body, true)
            // this.removeDOM(this.body, true)
            this.body = null; //必须设置为空！否则无法设置新的button
            const h2 = wd.createElement('h3')
            let html = wdq('html')
            let body = wdq('body')
            if (!body) { // 如果原来的删除了，从新创建一个body存放内容
                body = wd.createElement('body')
            }
            body.style.display = 'flex'
            body.style.flexDirection = 'column'
            body.style.justifyContent = 'center'
            body.style.alignItems = 'center'
            // 获取主播名称
            let name = this.getUser(this.getRoomIdByUrl(local_url)) ? this.getUser(this.getRoomIdByUrl(
                local_url)).name : ''
            const a = wd.createElement('a')
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
            let title = wdq('title')
            if (!title) {
                title = wd.createElement('title')
            }
            title.textContent = `主播【${name}】已被你屏蔽`
            html.appendChild(body)
            body.appendChild(h2)
            body.appendChild(a)
            let logo_show = that.getLocalStore(that.key + "_logo_show", Boolean.name)
            if (logo_show) {
                let logo = wd.createElement('a')
                logo.textContent = '显示logo'
                logo.style.display = 'block'
                logo.style.cursor = 'pointer'
                logo.style.fontSize = '20px'
                logo.onclick = (e) => {
                    e.preventDefault()
                    logo.style.display = 'none'
                    that.addLocalStore(that.key + "_logo_show", false, Boolean.name)
                    that.createButton()
                }
                body.appendChild(logo)
            }
            this.removeDOM(this.m_container, true)
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
            if (this.getLocalStore(this.bg_show_key, Boolean.name)) {
                url = url || this.getImageUrl(url)
                this.body.style.backgroundSize = "cover"
                this.body.style.backgroundRepeat = 'no-repeat '
                this.body.style.backgroundAttachment = 'fixed'
                this.body.style.backgroundImage = `url(${url})`
            } else {
                this.body.style.backgroundImage = 'none'
            }

        }

        /**
         * 获取本地图片地址
         * @param url 背景图地址 默认 是默认地址
         */
        getImageUrl(url) {
            url = url || wls.getItem(this.bg_key)
            return url ? url : this.defaultBackgroundImage;
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
            that.users.forEach((item, index) => {
                if (keywords == item.name || keywords == item.roomId) {
                    that.users.splice(index, 1)
                }
            })
            that.addLocalStore(this.key, this.users)
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
            if (!Array.isArray(this.users)) {
                return;
            }
            const newUser = new HostUser(id, name);
            // 添加
            this.users.unshift(newUser)
            // 保存到本地
            this.addLocalStore(this.key, this.users)
            this.resetTbody(this.users)
            // 如果是当前主播需要屏蔽
            if (id == this.getRoomIdByUrl(local_url)) {
                this.roomIsNeedRemove(local_url);
            }

        }

        /**
         *  获取本地保存的直播数据
         *  @param {defaultKey}  = [存储key]
         *  @param {obj}  = [需要存储的value]
         *  @param {type}  = [要解析参数类型]
         *  @param {isparse}  = [是否需要解析]
         */
        addLocalStore(defaultKey = this.key, obj = this.users, type = Array.name, isParse = true) {
            try {
                if (type == Object.name || type == Array.name) {
                    if (isParse) {
                        wls.setItem(defaultKey, JSON.stringify(obj))
                    } else {
                        wls.setItem(defaultKey, obj)
                    }
                }

                if (type == String.name || type == Boolean.name) {
                    wls.setItem(defaultKey, obj)
                }
            } catch (e) {
            }

        }


        /**
         * 获取本地保存的直播数据
         *  @param {key}  = [存储key]
         *  @param {type}  = [要解析参数类型]
         *  @param {isparse}  = [是否需要解析]
         */
        getLocalStore(k = this.key, type = Array.name, isParse = true) {
            let obj = window.localStorage.getItem(k);
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

        /**
         * @param {selector}  = 选择器
         * @param {selector}  = [是否真的删除，默认删除而不是display = 'none']
         * @param {time1} 循环执行时间 默认5000ms
         */
        removeVideo(selector, time1 = 100, maxCount = 1000) {
            let count = 0
            let video_timer = setInterval(() => {
                try {
                    const video = wdq(selector)
                    if (video && video instanceof HTMLVideoElement) {
                        // 禁止自动播放
                        video.autoplay = false
                        // 暂停播放
                        video.pause()
                    }
                    this.removeDOM(video, false)
                    // 结束循环器
                    if (count >= maxCount) {
                        // 最后一次删除
                        // this.removeDOM(video, true)
                        clearInterval(video_timer)
                    }
                    count = count + 1
                } catch (e) { }
            }, time1)
        }


        /**
         * @param {selector}  = [选择器]
         * @param {selector}  = [是否真的删除，默认删除而不是display = 'none']
         */
        roomIsNeedRemove(selector = wdq('video')) {
            // 添加直播间删除禁言提示
            this.roomAlreadyRemove()
            // 移除直播间视频
            this.removeVideo(selector)
            // 重新设置背景图
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
            if (value) {
                this.menu.style.display = 'block';
            } else {
                this.menu.style.display = 'none'
            }
            this.addLocalStore(this.menu_show_key, value, Boolean.name, false)

        }

        /*
         * 操作左侧导航栏，需要传入选择器，和修改值 建议放到公共方法下执行！
         * @param {selector}  = [选择器]
         */
        loadLeftMenu() {
            //首次加载是否显示
            let d_show = this.getLocalStore(this.menu_show_key, Boolean.name, false)
            if (this.menu) {
                if (d_show) {
                    this.menu.style.display = 'block';
                } else {
                    this.menu.style.display = 'none';
                }
            }
        }


        /*
         * 节流函数
         * @param wait  = 延迟执行时间
         * @param func  = 函数
         * @param args  = 参数
         */
        throttle(wait, func, ...args) {
            let pre = Date.now();
            return () => {
                if (Date.now() - pre > wait) {
                    func(...args)
                    pre = Date.now()
                }
            }
        }

        /*
         * 判断该节点是否汉含有直播间界面，
         * @params element 元素
         * @params selector 选择器 默认是斗鱼直播方式
         */

        hasVideo(element, selector = '.layout-Main') {
            if (element instanceof HTMLElement) {
                let result = element.querySelector(selector)
                return result !== null && result != undefined
            }
            return false

        }


        // 隐藏直播背景
        backgroundNone(element, selectors = ['.layout-Main'], time = 100, maxCount = 500) {
            if (!(element instanceof HTMLElement && Array.isArray(selectors) && selectors.length > 0)) {
                return;
            }
            let count = 0
            let timer = setInterval(() => {
                selectors.forEach(selector => {
                    let b = element.querySelector(selector)
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

        // 循环删除元素
        intervalRemoveElement(selectors, time = 160, maxCount = 1000) {
            if (!Array.isArray(selectors)) {
                return;
            }
            let count = 0
            let timer = setInterval(() => {
                selectors.forEach(sel => {
                    this.removeElement(sel, true)
                })
                if (count >= maxCount) {
                    clearInterval(timer)
                    return;
                }
                count = count + 1

            }, time)

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
            this.users = this.getLocalStore(this.key, Array.name, true)
            this.html = wdq('html')
            this.body = wdq('body')
            this.menu = wdq('.mod-sidebar')
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
                this.removeVideo('.mod-index-main video')
                // 触发点击关闭广告
                const banner_close = wdq('.mod-index-wrap #banner i')
                if (banner_close) {
                    banner_close.click();
                }
                // let count = 0;
                // // 暂停播放 防止后续加载出现
                // let timer1 = setInterval(() => {
                //     pauseBtn = wdq('.player-pause-btn')
                //     if (pauseBtn) {
                //         pauseBtn.click()
                //     }
                //     if (count >= 10) {
                //         clearInterval(timer1)
                //     }
                //     count = count + 1
                // }, 300)

            }

        }
        // 分类页操作
        category() {
            if (new RegExp(/^https:\/\/.*\.huya\.((com)|(cn))\/g(\/.*)$/).test(local_url)) {
                let that = this
                const dd = wql('.live-list-nav dd')
                if (dd && dd.length > 0) {
                    for (let d of dd) {
                        d.addEventListener('click', () => {
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
        }
        // 详情操作
        detail() {
            if (new RegExp(/^https:\/\/www\.huya\.com(\/\w+)$/).test(local_url)) {
                let that = this
                // 点击直播间移除直播间操作
                const hostName = wdq('.host-name')
                if (hostName) {
                    hostName.addEventListener('click', () => {
                        if (confirm(`确认禁用 ${hostName.textContent}？`)) {
                            that.addUser(that.getRoomIdByUrl(local_url), hostName.textContent)
                        }
                    })

                }

                // 自动剧场模式
                let fullpageBtn = wdq('#player-fullpage-btn')
                let show3 = that.getLocalStore(that.full_screen_key, Boolean.name)
                if (fullpageBtn && show3) {
                    setTimeout(() => { fullpageBtn.click() }, 2000)
                }

                let ads = [
                    '.main-wrap .room-mod-ggTop',
                    '#chatRoom .room-gg-chat',
                    '#huya-ab'
                ]

                // 对于恶意广告要彻底清空
                this.intervalRemoveElement(ads, 500, 20)
                
              
                // todo 特效设置暂时未开启！

                /*
                setTimeout(()=>{
                    // 视频区特效设置
                    let lvs = wdq('.room-core #shielding-effect')
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
            const hostName = wdq('.host-name')
            if (!hostName) {
                const rooms = wql('.game-live-item')
                if (rooms && rooms?.length > 0) {
                    for (let room of rooms) {
                        const a = room.querySelector('a')
                        if (a && a.href) {
                            const id = that.getRoomIdByUrl(a.href)
                            const user = room.querySelector('.txt i')
                            if (id === roomId) {
                                hostName = user
                            }
                        }

                    }
                }
            }
            return hostName?.textContent || ''
        }

        // 通过点击直播间名称删除直播间
        removeRoomByClickRoomName() {
            const that = this
            const rooms = wql('.game-live-item')
            if (rooms && rooms?.length) {
                for (let li of rooms) {
                    try {
                        const a = li.querySelector('a')
                        // 获取单个主播间房间地址
                        const url = a.href
                        // 获取房间i
                        const user = li.querySelector('.txt i')
                        const name = user.textContent || ''
                        user.addEventListener('click', () => {
                            if (confirm(`确认禁用 ${name}？`)) {
                                that.addUser(that.getRoomIdByUrl(url), name);
                                that.removeDOM(li);
                            }
                        })
                        if (that.isRemove(url)) {
                            that.removeDOM(li)
                        }
                    } catch (e) { }

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
            this.users = this.getLocalStore(this.key, Array.name, true)
            this.html = wdq('html')
            this.body = wdq('body')
            this.menu = wdq('#js-aside')
            this.tbody = null
            this.m_container = null
            setTimeout(() => {
                this.init()
            }, 500)
        }
        // 公共部分页面操作
        common() { }
        //首页操作
        index() {
            let that = this
            // 直播源
            if (window.location.href == that.baseUrl) {
                window.scroll(0, 0)
                // 移除直播
                that.removeVideo('.layout-Slide-player video')
                // 获取暂停button
                const vbox = wdq('#room-html5-player');
                if (vbox) {
                    const divs = vbox.querySelectorAll('div')
                    if (divs && divs?.length > 0) {
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
                window.onscroll = this.throttle(500, () => {
                    that.removeRoomByClickRoomName(init_users)
                })


                // btn
                let topBtn = wdq('.layout-Main .ToTopBtn')
                if(topBtn){
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
                const labels = wql('.layout-Module-filter .layout-Module-label')
                if (labels && labels?.length) {
                    for (let label of labels) {
                        if (label) {
                            label.addEventListener('click', (e) => {
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


        }


        // 详情页操作
        detail() {
            let that = this
            window.scroll(0, 0)
            // 匹配只有在播放直播间才会生效
            if (!new RegExp(/.*douyu.*(\/((.*rid=\d+)|(\d+)))$/).test(local_url)) {
                return;
            }
            setTimeout(() => {
                // 点击主播直播间名称进行操作
                const hostName = wdq('.Title-roomInfo h2.Title-anchorNameH2')
                if (hostName) {
                    hostName.addEventListener('click', () => {
                        if (confirm(`确认禁用 ${hostName.textContent}？`)) {
                            that.addUser(that.getRoomIdByUrl(local_url), hostName.textContent)
                        }
                    })
                }
            }, 4000)

            // 带有轮播图
            if (new RegExp(/.*douyu.*\/topic(\/(.*rid=\d+))$/).test(local_url)) {
                let divs = wql('#root>div')
                if ((divs && divs?.length > 0)) {
                    for (let element of divs) {
                        // 该div中是否有video
                        if (this.hasVideo(element)) {
                            this.backgroundNone(element, '.wm-general-wrapper.bc-wrapper.bc-wrapper-player')
                            this.backgroundNone(element, '.wm-general-bgblur')
                        } else {
                            // 移除出了显示直播div其他的div
                            this.removeDOM(element, true)
                        }

                    }
                }


            }


            // 不带有轮播图
            if (new RegExp(/.*douyu.*(\/(\d+))$/).test(local_url)) {
                // 如果是小窗口 判断播放窗口是否存在
                let times = 10000
                let count = 0
                let timer = setInterval(() => {
                    const closeBtn = wdq('.roomSmallPlayerFloatLayout-closeBtn')
                    if (closeBtn) {
                        closeBtn.click()
                    }
                    if (count > times) {
                        clearInterval(timer)
                    }
                    count = count + 1
                }, 16)
            }

            // 对于恶意广告要彻底清除！！！
            let ads = [
                "#player-above-controller+div"
            ]
            //this.intervalRemoveElement(ads, 500, 20)
            this.removeElement('.layout-Main .ToTopBtn',true)



            // TODO 新增功能，大屏小屏幕
            /*
            let vs = wql('.wm-general')
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
                const room = wdq('.layout-Wrapper.layout-Module.RoomList .layout-List-item')
                if (room) {
                    for (let li of room) {
                        try {
                            // 获取单个主播间房间地址
                            const a = li?.querySelector('a')
                            if (a) {
                                a.onclick = () => false
                                const url = a?.href || ''
                                const user = li.querySelector('.DyCover-user')
                                const name = user?.textContent || ''
                                if (user && (!that.userIsExist(name, list) || !that.userIsExist(url, list))) {
                                    // 添加记录
                                    list.unshift(new HostUser(url, name))
                                    user.addEventListener('click', (e) => {
                                        e.preventDefault()
                                        if (confirm(`确认禁用 ${name}`)) {
                                            that.addUser(that.getRoomIdByUrl(url), name);
                                            that.removeDOM(li);
                                        }
                                    }, false)
                                }

                                if (that.isRemove(url) || that.userIsExist(name)) {
                                    that.removeDOM(li)
                                }

                            }

                        } catch (e) { }

                    }
                }
            }

            if (new RegExp(/https:\/\/www.douyu.com(\/((directory.*)|(g_.*)))$/).test(local_url)) {
                const rooms = wql('.layout-Cover-item')
                if (rooms && rooms?.length) {
                    for (let li of rooms) {
                        try {
                            if (li) {
                                const link = li.querySelector('a.DyListCover-wrap')
                                if (link) {
                                    // link.onclick = ()=>false
                                    const url = link?.href || ''
                                    const user = link.querySelector('div.DyListCover-userName')
                                    const name = user.textContent || ''
                                    // 判断该直播间列表窗口是否需要删除
                                    if (that.isRemove(url) || that.userIsExist(name)) {
                                        that.removeDOM(li, true)
                                    } else {
                                        if (user) {
                                            user.addEventListener('click', (e) => {
                                                if (confirm(`确认禁用 ${name}？`)) {
                                                    const id = that.getRoomIdByUrl(url);
                                                    that.addUser(id, name);
                                                    that.removeDOM(li);
                                                }
                                                e.preventDefault()
                                            }, false)
                                        }
                                        // 监听鼠标移入事件
                                        li.addEventListener('mouseenter', (e) => {
                                            const a = e.target.querySelector('a.DyListCover-wrap.is-hover')
                                            if (a) {
                                                const url = a.href
                                                const user = a.querySelector('.DyListCover-userName')
                                                const name = user.textContent || ''
                                                if (user) {
                                                    user.addEventListener('click', (a) => {
                                                        //a.preventDefault()
                                                        if (confirm(`确认禁用 ${name}？`)) {
                                                            const id = that.getRoomIdByUrl(url);
                                                            that.addUser(id, name);
                                                            that.removeDOM(li);
                                                        }

                                                    }, false)
                                                }
                                            }

                                        }, false)
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
            let hostName = wdq('.Title-blockInline .Title-anchorName h2')
            let rooms = null;
            if (!hostName) {
                rooms = wql('.layout-List-item')
                // index
                if (rooms && rooms?.length) {
                    for (let room of rooms) {
                        const id = that.getRoomIdByUrl(room.querySelector('a').href)
                        const user = room.querySelector('.DyCover-user')
                        if (id == keywords) {
                            hostName = user
                        }
                    }
                }
                // 如果还是获取不到从分类页面获取
                if (!hostName) {
                    rooms = wql('.layout-Cover-item')
                    if (rooms && rooms?.length > 0) {
                        for (let room of rooms) {
                            const id = that.getRoomIdByUrl(room.querySelector('a').href)
                            const user = room.querySelector('.DyListCover-userName')
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
    GM_addStyle(`
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

        .m-container .btn-teal {
            background-color: rgba(64, 158, 255, 1) !important;
        }

        .m-container .btn-teal:hover {
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
       #js-room-activity,
       #js-right-nav,
       #js-bottom,
       li.Header-menu-link,
       .layout-Main .layout-Customize,
       .HeaderCell-label-wrap,
       .Title-AnchorLevel,.RoomVipSysTitle,
       .Aside-nav .Aside-nav-item,
       .Title-roomInfo .Title-row,
       #js-player-toolbar,
       #player-marvel-controller+div,
       .layout-Player-main .GuessGameMiniPanelB-wrapper,
       #js-player-asideMain #layout-Player-aside .FirePower,
       .layout-Player-video .layout-Player-videoAbove .ChargeTask-closeBg,
       #bc4,#bc4-bgblur,
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
        #js-player-toolbar,
       .MatchSystemTeamMedal,
       .layout-Player-main #js-player-toolbar,
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

       #root div.layout-Main{
           margin-top:70px !important;
           display:block !important;
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
        #player-gift-wrap,
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
        .main-wrap .room-mod-ggTop，
        #chatRoom .room-gg-chat,
        .room-core .room-business-game,
       .room-weeklyRankList{
           display:none !important;
        }

        .ssr-wrapper .mod-sidebar {
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
         /*****去掉直播间底部控制按钮动画样式防止来回滚动****/
         div.player-ctrl-wrap{
             bottom: 15px ;
        }

 `)

})()