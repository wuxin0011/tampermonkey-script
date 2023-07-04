import {
    is_bilibili,
    is_douyu,
    is_huya,
    wls,
    wd,
    is_localhost,
    local_url,
    addEventListener,
    addLocalStore,
    appendChild,
    createElement,
    getLocalStore,
    isArray,
    log,
    querySelector,
    querySelectorAll,
    removeDOM,
    HostUser,
    uploadImage, timeoutSelector, removeVideo, onload, s2d
} from '../../utils'
import getHtmlStr from "./html.js";

/**
 * 直播插件，要求所有直播插件继承该类，并实现要求重写的方法！
 */
export default class LivePlugin {
    constructor() {
        this.key = 'key'  // 存放内容信息
        this.bg_key = 'bg_key' // 存放背景图
        this.bg_show_key = 'bg_show_key'  // 是否显示背景key
        this.menu_show_key = 'menu_show_key' // 是否显示菜单
        this.full_screen_key = 'full_screen_key' // 是否剧场模式
        this.baseUrl = "http://127.0.0.1:8080"  // 直播源
        this.defaultBackgroundImage = 'https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/picgo/bg5.jpg' // 默认背景图
        this.users = [] // 存放屏蔽主播信息
        this.html = querySelector('html') // html
        this.body = querySelector('body') // body
        this.menu = null  // 菜单
        this.tbody = null // 操作数据
        this.m_container = null   // 操作容器
        this.gift_key = this.key + '_gift' // 礼物
        this.giftTool = null  // 礼物栏
        this.logo_btn = null // button
        this.logo_show_key = this.key + "_logo_show" // logo key
        this.header_logo = 'none' // logo 是否显示
        this.buttonName = '' // button name
        if (is_localhost) { // 本地测试允许加载
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
            this.create_container()
            this.isShowLeftMenu()
            this.isShowGift()
        }
        // 设置壁纸
        this.settingBackgroundImage()
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
        alert('该操作未实现！');
        return null
    }


    /**
     * 通过一个地址获取房间号
     * @param url 地址
     * @returns {null} 房间号
     */
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

        that.m_container = s2d(getHtmlStr(show1, show2, show3, show4, show5))

        appendChild(that.body, that.m_container)
        that.tbody = querySelector(that.m_container, '#m-container-box2 table tbody')
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
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.roomId}</td>
                <td><button class="btn btn-danger" room-id="${item.roomId}">删除</button></td>
                `
            appendChild(that.tbody, tr)
            addEventListener(querySelector(tr, 'button'), 'click', function (e) {
                let roomId = e.target.getAttribute('room-id');
                that.userDelete(roomId)
                // 如果是当前主播，需要刷新
                if (that.getRoomIdByUrl(local_url) === roomId) {
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
                for (let item of [that.key, that.bg_key, that.menu_show_key, that.gift_key, that.logo_show_key, that.full_screen_key]) {
                    wls.removeItem(item)
                }
                that.resetTbody(that.users)
                window.location.reload()
            }
        })
        // 文件上传
        const uploadButton = querySelector(container, '.m-container #file')
        addEventListener(uploadButton, 'change', function (e) {
            const file = uploadButton.files[0] || null
            uploadImage(file, (base64) => {
                // 保存到本地
                addLocalStore(that.bg_key, base64, String.name, false)
                that.settingBackgroundImage(e.target.result)

            })
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


        let box1 = querySelector(that.m_container, '#m-container-box1')
        let box2 = querySelector(that.m_container, '#m-container-box2')

        let change1 = querySelector(that.m_container, '#m-change-box1')
        let change2 = querySelector(that.m_container, '#m-change-box2')


        let select1 = querySelector(that.m_container,
            '.m-type-item-left .m-select-option-container #m-select-input-address')
        let select2 = querySelector(
            '.m-type-item-left .m-select-input-container #m-select-input-select')

        let select1_box1 = querySelector(that.m_container, '.m-type-item-left #m-select-option')
        let select2_box2 = querySelector(that.m_container, '.m-type-item-left #m-select-input')

        addEventListener(change1, 'click', () => {
            box1.classList.add('m-ani-left-is-close')
            box1.classList.remove('m-ani-left-is-active')
            box2.classList.add('m-ani-right-is-active')
            box2.classList.remove('m-ani-right-is-close')
        })
        addEventListener(change2, 'click', () => {
            box1.classList.add('m-ani-left-is-active')
            box1.classList.remove('m-ani-left-is-close')
            box2.classList.add('m-ani-right-is-close')
            box2.classList.remove('m-ani-right-is-active')
        })

        addEventListener(select1, 'click', () => {
            select1_box1.classList.remove('m-ani-left-is-active')
            select1_box1.classList.add('m-ani-left-is-close')
            select2_box2.classList.remove('m-ani-right-is-close')
            select2_box2.classList.add('m-ani-right-is-active')
        })
        addEventListener(select2, 'click', () => {
            select1_box1.classList.add('m-ani-left-is-active')
            select1_box1.classList.remove('m-ani-left-is-close')
            select2_box2.classList.add('m-ani-right-is-close')
            select2_box2.classList.remove('m-ani-right-is-active')
        })
    }

    /**
     * 右侧操作按钮
     * @param text 指定按钮文本，默认是小虎牙或者是小鱼丸
     */
    createButton() {
        let that = this
        if (!!that.logo_btn) {
            return;
        }

        let text = this.buttonName
        let backgroundColor = is_bilibili ? '255,102,102' : '255, 93, 35'

        const btn = createElement('button')
        btn.style.cursor = 'pointer'
        btn.style.position = 'fixed'
        btn.style.top = '300px'
        btn.style.right = '0px'
        btn.style.padding = '5px 10px'
        btn.style.backgroundColor = `rgb(${backgroundColor})`
        btn.style.border = 'none'
        btn.style.outline = 'none'
        btn.style.borderRadius = '20px'
        btn.style.fontSize = '12px'
        btn.style.color = '#fff'
        btn.style.zIndex = 999999999999
        btn.textContent = text ? text : (is_huya ? '小虎牙' : (is_douyu ? '小鱼丸' : is_bilibili ? '小B' : '默认'))
        addEventListener(btn, 'click', function () {
            that.isShowContainer()
        })
        addEventListener(btn, 'mouseenter', function () {
            btn.style.backgroundColor = `rgba(${backgroundColor},0.6)`
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
            btn.style.backgroundColor = `rgba(${backgroundColor},1)`
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

        btn.style.display = is_bilibili || getLocalStore(that.logo_show_key, Boolean.name) ? 'block' : 'none'
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
        return !!this.getUser(keywords, list)
    }


    /**
     * 通过房间名称或者id判断房间是否已经保存到本地
     * @param keywords 房间名或者id
     * @param list 本地缓存数据，默认是本地缓存用户数据
     */
    getUser(keywords, list = this.users) {
        if (!keywords) {
            return null
        }
        for (let i = 0; i < list.length; i++) {
            if ((list[i].name && list[i].name === keywords) || (list[i].roomId && list[i].roomId === keywords)) {
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
        if (id === this.getRoomIdByUrl(local_url)) {
            this.roomIsNeedRemove(local_url);
        }

    }

    /**
     * @param selector video
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
            if (this.m_container.classList.contains('m-container-is-active')) {
                this.m_container.classList.remove('m-container-is-active')
            } else {
                this.m_container.classList.add('m-container-is-active')
            }
            // this.m_container.style.display = this.m_container.style.display === 'block' ? 'none' : 'block'
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
        timeoutSelector(that.header_logo, (a) => {
            a.href = 'javascript:;void(0)';
            a.title = '点击Logo，显示插件配置'
            addEventListener(a, 'click', (e) => {
                that.isShowContainer()
            })
        }, 5000)
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
    createSpan(container, place, id, name = id, message = '确认屏蔽up主 ', remove = true) {
        if (!container || !place || !id || !name) {
            return;
        }
        const span = createElement('span')
        span.classList = 'm-span-text'
        appendChild(place, span)
        addEventListener(span, 'click', () => {
            if (confirm(message + name + ' ?')) {
                if (remove) {
                    removeDOM(container, true)
                }
                this.addUser(id, name)
                this.removeRoom(local_url)
            }
        })
    }

}






