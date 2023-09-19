import {
    addEventListener,
    addLocalStore,
    appendChild,
    createElement,
    error,
    findButton,
    findMark,
    getLocalStore,
    handlerPromise,
    HostUser,
    is_bilibili,
    is_douyu,
    is_huya,
    is_localhost,
    isArray,
    local_url,
    support,
    log,
    loopDo,
    querySelector,
    querySelectorAll,
    removeDOM,
    removeVideo,
    s2d,
    uploadImage,
    warn,
    wd,
    wls, handlerDisplay
} from '../../utils'

import iconLogo from '@/utils/logo'
import getHtmlStr from "@/ui";
import { isBVId, isUserId, getBiliBiliInfoByVideoID, getBiliBiliInfoByUserId } from '@/api/bilibili';
import { themeUpdate, toggleColorMode, updateDarkStyleType, THEME_IS_AUTO, isNeedDark } from '@/hook/useTheme'
import { isRisk } from '../../api/bilibili';

/**
 * 直播插件，要求所有直播插件继承该类，并实现要求重写的方法！
 */
export default class LivePlugin {
    constructor() {
        this.baseUrl = "/"  // 首页
        this.key = 'key'  // 存放内容信息
        this.bg_key = 'bg_key' // 存放背景图
        this.bg_show_key = 'bg_show_key'  // 是否显示背景key
        this.bg_is_first_key = "bg_is_first_key"
        this.full_screen_key = 'full_screen_key' // 是否全屏
        this.full_screen_class_or_id = 'full_screen_button_class_or_id' // 全屏按钮的class或者id，如果提供了将直接从这里获取
        this.full_button_tag_name = 'div' // 全屏按钮默认标签命名 span div button ...
        this.full_screen_button = getLocalStore(this.full_screen_class_or_id, String.name, false) || this.full_screen_class_or_id
        this.full_screen_text = '全屏'  // 默认退出全屏文字内容 如果没有提供class获取id将从video中获取，通过文字查找
        this.full_cancel_text = '退出全屏'
        this.full_screen_is_first_key = "full_screen_is_first_key"
        this.default_background_image = 'https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/picgo/bg5.jpg' // 默认背景图
        this.users = []
        this.menu = null  // 菜单
        this.menu_show_key = 'menu_show_key' // 是否显示菜单
        this.menu_is_first_key = 'menu_is_first_key'
        this.tbody = null // 操作数据
        this.m_container = null   // 操作容器
        this.gift_key = `${this.key}_gift` // 礼物
        this.gift_tool = null  // 礼物栏
        this.gift_is_first_key = "gift_is_first_key" // 礼物是否是第一次 默认不显示
        this.logo_btn = null // button
        this.btn_logo_svg = iconLogo()
        this.logo_show_key = `${this.key}_logo_show`
        this.header_logo = 'none' // logo 是否显示
        this.button_name = '' // button name
        this.is_new = false // 容器样式面板版本
        this.btn_is_first_key = 'btn_is_first_key' // 是否是第一次操作
        this.video_player_container = '.room-player-wrap' // video container
        this.auto_max_pro_key = "auto_max_pro_key" // 自动最高画质
        this.is_first_auto_max_pro_key = "is_first_auto_max_pro_key" // 自动最高画质
        this.auto_max_pro_class_or_id_list = 'auto_max_pro_class_or_id_list'
        this.auto_max_pro_keywords = ['登录', '会员', '大会员']
        if (is_localhost) { // 本地测试允许加载
            this.init()
        }

    }

    // 初始化操作方法，子类可以继承该类，实现该类中空方法，参考此操作,初始化构造器实调用该方法就可以了。。。
    init() {
        if (!this.removeRoom()) {
            this.common()
            this.detail()
            this.index()
            this.category()
            this.create_container()
            this.isShowLeftMenu()
            this.isShowGift()
            this.clickLogoShowContainer()
        }
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
        warn('请自定义实现通过名称获取房间号方法')
        return null
    }


    /**
     * 通过一个地址获取房间号
     * @param url 地址
     * @returns {null} 房间号
     */
    getRoomIdByUrl(url) {
        warn('请自定义实现通过名称获取房间号方法')
        return null
    }

    /**
     * 自动最高画质！
     */
    isAutoMaxVideoPro() {
        let that = this
        if (!(wls.getItem(that.is_first_auto_max_pro_key) === null ? true : getLocalStore(that.auto_max_pro_key, Boolean.name))) {
            return;
        }

        const check = () => {
            // TODO 实现随着版本更新获取list
            // this.auto_max_pro_class_or_id_list = this.auto_max_pro_class_or_id_list
        }
        log('查找播放视频画质列表', that.auto_max_pro_class_or_id_list)
        loopDo((timer) => {
            let items = querySelectorAll(that.auto_max_pro_class_or_id_list);
            if (isArray(items)) {
                for (let item of items) {
                    let result = that.auto_max_pro_keywords.findIndex(key => item.innerText.indexOf(key) !== -1)
                    if (result === -1) {
                        log('当前最高画质', item.innerText)
                        if (is_huya) {
                            item = querySelector(item, "span");
                        }
                        item.click()
                        clearInterval(timer)
                        return;
                    }

                }
            } else {
                check()
            }
        }, 100, 500)
    }


    /*********************************子类继承无需修改的方法******************************/
    /**
     * 容器，所有操作容器均在此容器中，
     */
    create_container() {
        // 初始化房间号
        let that = this
        let body = querySelector('body') ?? createElement('body')
        that.users = getLocalStore(that.key, Array.name) || []
        let isShowBg = wls.getItem(this.bg_is_first_key) === null ? true : getLocalStore(that.bg_show_key, Boolean.name) // 是否显示背景 默认显示
        let isShowMenu = wls.getItem(this.menu_is_first_key) === null ? false : getLocalStore(that.menu_show_key, Boolean.name) // 左侧菜单默认不显示
        let isShowFullScreen = wls.getItem(this.full_screen_is_first_key) === null ? false : getLocalStore(that.full_screen_key, Boolean.name) // 是否自动全屏 默认不自动
        let isShowGift = wls.getItem(this.gift_is_first_key) === null ? false : getLocalStore(that.gift_key, Boolean.name) // 礼物默认不显示
        let isShowLogo = wls.getItem(this.btn_is_first_key) === null ? true : getLocalStore(that.logo_show_key, Boolean.name) // logo 默认显示
        let isAutoMaxPro = wls.getItem(this.is_first_auto_max_pro_key) === null ? true : getLocalStore(that.auto_max_pro_key, Boolean.name) // logo 默认显示
        that.m_container = s2d(getHtmlStr(isShowBg, isShowMenu, isShowFullScreen, isShowGift, isShowLogo, isAutoMaxPro))
        appendChild(body, that.m_container)

        if (querySelector(that.m_container, '#m-container-box2 table tbody')) {
            that.tbody = querySelector(that.m_container, '#m-container-box2 table tbody')
            this.is_new = true
        } else {
            that.tbody = querySelector(that.m_container, '.m-container table tbody')
            this.is_new = false
        }

        // 生成操作按钮
        that.operationDOMButton()
        // 添加直播房间号信息
        that.createRoomItem(that.users)
        // 右侧点击添加button
        that.createButton()
        log('操作面板初始化完毕！')

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
                handlerPromise(that.getRoomIdByUrl(local_url), (result) => {
                    if (result === roomId) {
                        window.location.reload()
                    }
                })
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
            error('tbody 为 null ！')
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
        const inputValue = querySelector(container, '.operation input')
        addEventListener(inputValue, 'input', () => {
            let arr = []
            try {
                arr = that.users.filter(item => (item && item?.roomId && item?.roomId?.indexOf(inputValue.value) !== -1) || (item && item?.name && item?.name?.indexOf(inputValue.value) !== -1))
            } catch (error) {
                arr = [...that.users]
            }
            that.resetTbody(arr)
        })

        // 添加
        const addRoomBtn = querySelector(container, '.operation button.add-room')
        addEventListener(addRoomBtn, 'click', function () {
            const keywords = inputValue.value.trim()
            if (!keywords) {
                return alert('请输入房间号！')
            }
            if (!that.userIsExist(keywords)) {
                if (is_bilibili) {
                    that.handlerBiliBiliKeywords(keywords, inputValue)
                } else {
                    handlerPromise(that.getNameByRoomId(keywords), (res) => {
                        that.searchUserByRoomId(res, keywords, inputValue)
                    })
                }

            } else {
                alert('该主播已添加！')
            }
        })


        // 清空
        const clearRoomBtn = querySelector(container, '.operation button.clear-room')
        addEventListener(clearRoomBtn, 'click', function () {
            if (confirm('确认重置？')) {
                that.users = []
                let deleteKeyList = [
                    that.key,
                    that.bg_key,
                    that.menu_show_key,
                    that.gift_key,
                    that.logo_show_key,
                    that.full_screen_key,
                    that.bg_is_first_key,
                    that.btn_is_first_key,
                    that.full_screen_is_first_key,
                    that.menu_is_first_key,
                    that.gift_is_first_key,
                    that.is_first_auto_max_pro_key,
                ]
                for (let item of deleteKeyList) {
                    wls.removeItem(item)
                }
                that.resetTbody(that.users)
                window.location.reload()
            }
        })
        // 文件上传
        const uploadButton = querySelector(container, '.operation #file')
        addEventListener(uploadButton, 'change', function (e) {
            const file = uploadButton.files[0] || null
            uploadImage(file, (base64) => {
                addLocalStore(that.bg_key, base64, String.name, false)
                that.settingBackgroundImage(e.target.result)
            })
            addLocalStore(that.bg_is_first_key, false, Boolean.name)
        })

        // 文件上传
        const upload = querySelector(container, '.operation .bg-btn')
        addEventListener(upload, 'click', function (e) {
            uploadButton.click()
            addLocalStore(that.bg_is_first_key, false, Boolean.name)
        })

        // 显示关闭
        const close_container = querySelector(container, '.operation .btn-close-container')
        addEventListener(close_container, 'click', function (e) {
            that.isShowContainer()
        })

        // 关闭
        const close_container2 = querySelector(container, '.operation #m-close-button1')
        addEventListener(close_container2, 'click', function (e) {
            that.isShowContainer()
        })
        // 选择背景
        const checkbox = querySelector(container, '.operation #checkbox1')
        addEventListener(checkbox, 'change', function (e) {
            log('背景是否开启', e.target.checked ? '开启' : '关闭')
            addLocalStore(that.bg_show_key, e.target.checked, Boolean.name)
            addLocalStore(that.bg_is_first_key, false, Boolean.name)
            that.settingBackgroundImage()
        })
        // 是否关闭菜单
        const menu = querySelector(container, '.operation #checkbox2')
        addEventListener(menu, 'change', function (e) {
            that.getLeftMenu(e.target.checked)
            addLocalStore(that.menu_is_first_key, false, Boolean.name)
        })

        // 剧场模式
        const full_screen_btn = querySelector(container, '.operation #checkbox3')
        addEventListener(full_screen_btn, 'change', function (e) {
            addLocalStore(that.full_screen_key, e.target.checked, Boolean.name)
            that.isFullScreen(true)
            addLocalStore(that.full_screen_is_first_key, false, Boolean.name)
        })

        // 礼物模式
        const show_gift = querySelector(container, '.operation #checkbox4')
        addEventListener(show_gift, 'change', function (e) {
            addLocalStore(that.gift_key, e.target.checked, Boolean.name)
            that.isShowGift()
            addLocalStore(that.gift_is_first_key, false, Boolean.name)
        })

        const show_logo_btn = querySelector(container, '.operation #checkbox5')
        addEventListener(show_logo_btn, 'change', function (e) {
            e.preventDefault()
            if (!that.logo_btn) {
                warn('获取不到Logo哦！')
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
            addLocalStore(that.btn_is_first_key, false, Boolean.name)
        })


        // 最高画质
        const auto_max_pro = querySelector(container, '.operation #checkbox6')
        addEventListener(auto_max_pro, 'change', function (e) {
            addLocalStore(that.auto_max_pro_key, e.target.checked, Boolean.name)
            addLocalStore(that.is_first_auto_max_pro_key, false, Boolean.name)
            that.isAutoMaxVideoPro()
        })

        // 主题切换操作
        this.themeContr(container)
        // 初始化动画效果
        this.initAnimation(container)
        log('操作按钮添加成功！')
    }


    handlerBiliBiliKeywords(keywords, inputValue) {
        let that = this
        // log('bilib keywords handlerBiliBiliKeywords', keywords)
        if (isBVId(keywords)) {
            handlerPromise(getBiliBiliInfoByVideoID(keywords), (result) => {
                // log('isBVId result', result)
                if (result && result?.code == 0) {
                    that.searchUserByRoomId(result?.data?.owner?.name, result?.data?.owner?.mid, inputValue)
                } else if (isRisk(result)) {
                    alert('服务不可用，该操作已被官方禁止，请待会再尝试吧！')
                } else {
                    alert('搜索失败！请复制 https://www.bilibili.com/video/xxxxxx 地址尝试')
                }

            })
        } else if (isUserId(keywords)) {
            handlerPromise(getBiliBiliInfoByUserId(keywords), (result) => {
                if (result && result?.code == 0) {
                    that.searchUserByRoomId(result?.data?.name, result?.data?.mid, inputValue)
                } else if (isRisk(result)) {
                    alert('服务不可用，该操作已被官方禁止，请待会再尝试吧！')
                }
                else {
                    alert('搜索失败！请复制 https://space.bilibili.com/xxxxxxxx 地址尝试')
                }
            })
        } else {
            alert('搜索失败！请复制 https://space.bilibili.com/xxxxxxxx  或者 https://www.bilibili.com/video/xxxxxx  地址尝试')
        }
    }



    themeContr(container) {
        const theme_is_auto_box = querySelector(container, '.operation #m-dark-is-auto')
        const theme_btn = querySelector(container, '.operation .room-theme')
        const theme_select = querySelector(container, '.operation #m-dark-select')


        const cancelAutoTheme = (result = false) => {
            if (theme_is_auto_box) {
                theme_is_auto_box.checked = result
                addLocalStore(THEME_IS_AUTO, result, Boolean.name, false)
            }
        }

        const updateThemeBtnContent = () => {
            if (theme_btn) {
                theme_btn.innerText = isNeedDark() ? '白天' : '黑夜'
                theme_btn.title = isNeedDark() ? '点击切换到白天模式' : '点击切换到黑夜模式'
            }
        }

        addEventListener(theme_btn, 'click', function (e) {
            toggleColorMode(e)
            cancelAutoTheme()
            updateThemeBtnContent()
        })


        addEventListener(theme_is_auto_box, 'change', function (e) {
            toggleColorMode(e)
            cancelAutoTheme(e.target.checked)
            updateThemeBtnContent()
        })

        addEventListener(theme_select, 'change', function (e) {
            cancelAutoTheme(false)
            updateThemeBtnContent()
            updateDarkStyleType(e.target.value)
        })


    }


    initAnimation(container) {
        let box1 = querySelector(container, '#m-container-box1')
        let box2 = querySelector(container, '#m-container-box2')

        let change1 = querySelector(container, '#m-change-box1')
        let change2 = querySelector(container, '#m-change-box2')


        let select1 = querySelector(container, '.m-type-item-left .m-select-option-container #m-select-input-address')
        let select2 = querySelector('.m-type-item-left .m-select-input-container #m-select-input-select')

        let select1_box1 = querySelector(container, '.m-type-item-left #m-select-option')
        let select2_box2 = querySelector(container, '.m-type-item-left #m-select-input')


        addEventListener(change1, 'click', () => {
            if (box1 && box2) {
                box1.classList.add('m-ani-left-is-close')
                box1.classList.remove('m-ani-left-is-active')
                box2.classList.add('m-ani-right-is-active')
                box2.classList.remove('m-ani-right-is-close')
            }

        })
        addEventListener(change2, 'click', () => {
            if (box1 && box2) {
                box1.classList.add('m-ani-left-is-active')
                box1.classList.remove('m-ani-left-is-close')
                box2.classList.add('m-ani-right-is-close')
                box2.classList.remove('m-ani-right-is-active')
            }

        })

        addEventListener(select1, 'click', () => {
            if (select1_box1 && select2_box2) {
                select1_box1.classList.remove('m-ani-left-is-active')
                select1_box1.classList.add('m-ani-left-is-close')
                select2_box2.classList.remove('m-ani-right-is-close')
                select2_box2.classList.add('m-ani-right-is-active')
            }

        })
        addEventListener(select2, 'click', () => {
            if (select1_box1 && select2_box2) {
                select1_box1.classList.add('m-ani-left-is-active')
                select1_box1.classList.remove('m-ani-left-is-close')
                select2_box2.classList.add('m-ani-right-is-close')
                select2_box2.classList.remove('m-ani-right-is-active')
            }
        })
        log('动画初始化完毕！')
    }


    searchUserByRoomId(name, roomId, inputValue) {
        let that = this
        if (name) {
            that.addUser(roomId, name)
            inputValue.value = ''
        } else {
            if (confirm(`房间号为${roomId}的主播不存在！确定添加？`)) {
                that.addUser(roomId, roomId)
                inputValue.value = ''
            }
        }
    }


    /**
     * 右侧操作按钮
     * @param text 指定按钮文本，默认是小虎牙或者是小鱼丸
     */
    createButton() {
        let that = this

        let body = querySelector('body')
        if (!body) {
            error('获取不到 body ')
            return;
        }
        if (!!that.logo_btn) {
            warn('button已经添加了！不能重复添加！')
            return;
        }

        let text = this.button_name

        const btn = createElement('button')
        btn.style.cursor = 'pointer'
        btn.style.position = 'fixed'
        btn.style.top = '300px'
        btn.style.right = '0px'
        btn.style.zIndex = 999999999999
        let backgroundColor = ''
        if (that.btn_logo_svg !== 'none') {
            btn.innerHTML = that.btn_logo_svg
            btn.style.backgroundColor = 'transparent'
        } else {
            backgroundColor = is_bilibili ? '255,102,102' : '255, 93, 35'
            btn.style.padding = '5px 10px'
            btn.style.backgroundColor = `rgb(${backgroundColor})`
            btn.style.borderRadius = '20px'
            btn.style.fontSize = '12px'
            btn.style.color = '#fff'
            btn.textContent = text ? text : (is_huya ? '小虎牙' : (is_douyu ? '小鱼丸' : is_bilibili ? '小B' : '默认'))
        }
        btn.style.border = 'none'
        btn.style.outline = 'none'
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

        // 获取位置信息
        let { mouse_left, mouse_top } = getLocalStore(mouse_key, Object.name)
        log(`获到Logo位置信息 ${mouse_left}px, ${mouse_top}px`)
        if (!isNaN(Number(mouse_left)) && !isNaN(Number(mouse_top))) {
            btn.style.left = mouse_left + 'px'
            btn.style.top = mouse_top + 'px'
            btn.style.right = 'auto'
        }


        addEventListener(btn, 'mousedown', (event) => {
            x = event.offsetX
            y = event.offsetY
            log('mouseDown', x, y)
            flag = true
            addEventListener(wd, 'mousemove', move)
        })

        addEventListener(btn, 'mouseup', () => {
            flag = false
            wd.removeEventListener('mousemove', move)
            wd.onmousemove = null
        })

        addEventListener(btn, 'mouseleave', () => {
            flag = false
            btn.style.backgroundColor = `rgba(${backgroundColor},1)`
            wd.removeEventListener('mousemove', move)
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

            btn.style.left = `${btn_left}px`
            btn.style.top = `${btn_top}px`
            btn.style.right = 'auto'
            addLocalStore(mouse_key, { 'mouse_left': btn_left, 'mouse_top': btn_top }, Object.name)

        }

        btn.style.display = wls.getItem(that.btn_is_first_key) == null || getLocalStore(that.logo_show_key, Boolean.name) ? 'block' : 'none'
        that.logo_btn = btn
        appendChild(body, that.logo_btn)
        log('button 添加完毕！')
    }

    /**
     * 该房间是否已改被删除
     * @param url 房间链接地址 默认 window.location.href
     */
    removeRoom(url = local_url) {
        try {
            if (!this.isRemove(url)) {
                return false
            }
            this.roomIsNeedRemove();
            return true
        } catch (error) {
            return false
        }
    }

    /**
     * 房间已被删除之后操作
     * @param url 房间链接地址 默认 window.location.href
     */
    roomAlreadyRemove() {
        let that = this
        removeDOM(querySelector('body'), true)
        const h2 = createElement('h3')
        let html = querySelector('html')
        let body = querySelector('body') ?? createElement('body')
        body.style.display = 'flex'
        body.style.flexDirection = 'column'
        body.style.justifyContent = 'center'
        body.style.alignItems = 'center'
        handlerPromise(this.getRoomIdByUrl(local_url), (roomId) => {
            // 获取主播名称
            let name = this.getUser(roomId) ? this.getUser(roomId).name : ''
            const a = createElement('a')
            a.textContent = '点击解锁'
            a.style.display = 'block'
            a.style.cursor = 'pointer'
            a.style.fontSize = '20px'
            a.onclick = (e) => {
                e.preventDefault()
                that.userDelete(roomId)
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
            // 初始化操作面板
            this.create_container()
        })

    }

    /**
     * 判断链接是否应该被删除
     * @param href 房间链接地址 默认 window.location.href
     */
    isRemove(href) {
        try {
            let res = this.getRoomIdByUrl(href)
            if (res instanceof Promise) {
                return false
            }
            return this.userIsExist(res);
        } catch (error) {
            return false
        }
    }


    /**
     * 设置背景图
     * @param url 背景图地址 默认 是默认地址
     * @param container 修改背景容器 默认是body
     */
    settingBackgroundImage(url, container) {
        if (!support.supportBg()) {
            log('当前平台不支持背景')
            return;
        }
        container = querySelector('body')
        if (!container || !(container instanceof HTMLElement)) {
            warn('壁纸设置失败 获取不到 container ！')
            return;
        }
        let isShowBg = wls.getItem(this.bg_is_first_key) === null ? true : getLocalStore(this.bg_show_key, Boolean.name) // 是否显示背景 默认显示
        log('是否添加背景=>', isShowBg ? '显示' : "关闭", wls.getItem(this.bg_is_first_key) === null ? 'null' : wls.getItem(this.bg_is_first_key))
        if (isShowBg) {
            url = !!url ? url : (wls.getItem(this.bg_key) && isShowBg ? wls.getItem(this.bg_key) : this.default_background_image)
            container.style.backgroundSize = "cover"
            container.style.backgroundRepeat = 'no-repeat '
            container.style.backgroundAttachment = 'fixed'
            container.style.backgroundImage = `url(${url})`
            log('背景图添加完毕！')
        } else {
            container.style.backgroundImage = 'none'
            log('背景图已关闭！')
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
            if (keywords === item.name || keywords === item.roomId) {
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
        this.users.unshift(newUser)
        addLocalStore(this.key, this.users)
        this.resetTbody(this.users)
        handlerPromise(this.getRoomIdByUrl(local_url), (res) => {
            if (id === res) {
                this.roomIsNeedRemove(local_url);
            }
        })


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
        let menu = querySelector(this.menu)
        if (!menu) {
            return alert('获取不到导航菜单，操作失败！')
        }
        handlerDisplay(menu, value)
        addLocalStore(this.menu_show_key, value, Boolean.name, false)
    }

    /*
     * 操作左侧导航栏，需要传入选择器，和修改值 建议放到公共方法下执行！
     */
    isShowLeftMenu() {
        let menu = this.menu ? querySelector(this.menu) : ''
        handlerDisplay(menu, wls.getItem(this.menu_is_first_key) != null && getLocalStore(this.menu_show_key, Boolean.name))
    }


    /**
     * 检查是否能找到全屏按钮
     * @returns
     */
    checkFullScreenButton() {
        this.full_screen_button = findButton(this.video_player_container, this.full_screen_class_or_id, this.full_screen_text, this.full_button_tag_name)
    }

    /**
     * 自动全屏
     * @param isClickFull 是否是通过点击方式触发
     */
    isFullScreen(isClickFull = false) {
        let full_screen_text = this.full_screen_text
        let full_cancel_text = this.full_cancel_text
        let is_should_full_screen = getLocalStore(this.full_screen_key, Boolean.name)
        let button = null
        if (isClickFull) {
            button = querySelector(this.full_screen_button)
            if (button && button instanceof HTMLElement) {
                button.click()
                this.isShowContainer()
            } else {
                this.checkFullScreenButton(button)
            }
        } else {
            loopDo((timer) => {
                button = querySelector(this.full_screen_button)
                log("fullScreen button", !!button ? '找到button了' : "未找到全屏button")
                if (button && button instanceof HTMLElement) {
                    let isClick = button?.isClick
                    if (isClick) {
                        clearInterval(timer)
                        return;
                    }
                    if (!isClick && is_should_full_screen && (button?.title === full_screen_text || button.textContent === full_screen_text)) {
                        log("全屏按钮自动触发了!")
                        button.isClick = true
                        button.click()
                    } else if (button?.title === full_cancel_text || button?.textContent === full_cancel_text) {
                        button.click()
                    }

                } else {
                    this.checkFullScreenButton(button)
                }

            }, 3, 500)

        }

    }

    /**
     * 是否显示礼物
     */
    isShowGift() {
        let gift = this.gift_tool ? querySelector(this.gift_tool) : ''
        handlerDisplay(gift, wls.getItem(this.gift_is_first_key) != null && getLocalStore(this.gift_key, Boolean.name))
    }

    /**
     * 是否显示容器
     */
    isShowContainer() {
        if (this.m_container && this.m_container instanceof HTMLElement) {
            log('container change ....')
            if (this.is_new) {
                if (this.m_container.classList.contains('m-container-is-active')) {
                    this.m_container.classList.remove('m-container-is-active')
                } else {
                    this.m_container.classList.add('m-container-is-active')
                }
            } else {
                this.m_container.style.display = this.m_container.style.display === 'block' ? 'none' : 'block'
            }

        }
    }

    /**
     *  点击 直播平台 Logo
     */
    clickLogoShowContainer() {
        if (this.header_logo === 'none' || !this.header_logo) {
            warn('Logo选择器不能为 none ！')
            return
        }
        let that = this
        findMark(that.header_logo, (a) => {
            if (!(a instanceof HTMLAnchorElement)) {
                return;
            }
            a.href = 'javascript:;void(0)';
            a.title = '点击Logo,显示插件配置'
            addEventListener(a, 'click', (e) => {
                e.preventDefault()
                log('click header logo !')
                that.isShowContainer()
            })
            loopDo(() => {
                a = querySelector(that.header_logo)
                a.href = 'javascript:;void(0)';
            }, 5, 1000)
            log('logo点击按钮装置完毕！')
        }, 5, 500)
    }


    createSpan(container, place, id, name = id, message = '确认屏蔽up主 ', remove = true) {
        if (!container || !place || !id || !name) {
            error('createSpan 参数不全！')
            return;
        }
        const span = createElement('span')
        span.classList = 'm-span-text'
        appendChild(place, span)
        addEventListener(span, 'click', () => {
            if (confirm(`${message}${name} ?`)) {
                if (remove) {
                    removeDOM(container, true)
                }
                this.addUser(id, name)
                this.removeRoom(local_url)
            }
        })
    }


}






