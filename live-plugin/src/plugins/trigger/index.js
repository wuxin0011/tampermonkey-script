import {
    addEventListener,
    findMark,
    getLocalStore,
    intervalRemoveElement,
    isArray,
    local_url,
    log,
    loopDo,
    querySelector,
    querySelectorAll,
    removeDOM,
    removeVideo,
    warn,
    wd,
    wls
} from '../../utils';

import LivePlugin from "../live";
import { GM_registerMenuCommand } from '$'

/**
 * 虎牙直播插件
 */
export default class TriggerLive extends LivePlugin {
    constructor() {
        super()
        this.video_player_container = '.room-player-wrap'
        this.full_screen_button = '.room-player-wrap .player-fullscreen-btn'
        this.full_button_tag_name = 'span'
        this.full_screen_is_find = false
        this.default_background_image = 'https://livewebbs2.msstatic.com/huya_1682329462_content.jpg'
        this.baseUrl = "https://www.huya.com/"
        this.menu = '.mod-sidebar'
        this.header_logo = '#duya-header #duya-header-logo a'
        this.gift_tool = '.room-core #player-gift-wrap'
        this.video_room_selector = '#J_playerMain'
        this.auto_max_pro_class_or_id_list = '.player-videoline-videotype .player-videotype-list li'
        this.init()
    }


    // 首页操作
    index() {
        // 直播源
        if (local_url === this.baseUrl || /https:\/\/.*\.huya\.*\/\?/.test(local_url)) {
            removeVideo('.mod-index-main video')
            // 触发点击关闭广告
            const banner_close = querySelector('.mod-index-wrap #banner i')
            if (banner_close) {
                banner_close.click();
            }
            this.removeRoomByClickRoomName()
            this.updateHeaderIcon()
        }

    }

    // 分类页操作
    category() {
        let that = this
        if (new RegExp(/^https:\/\/.*\.huya\.((com)|(cn))\/g(\/.*)$/).test(local_url)) {
            this.removeRoomByClickRoomName()
            Array.from(querySelectorAll('.live-list-nav dd')).forEach(node => {
                addEventListener(node, 'click', () => {
                    that.removeRoomByClickRoomName()
                })
            })
        }
    }



    // 公共部分操作
    common() {
        this.autoHideMenu()
    }

    // 头部logo显示不明显问题
    updateHeaderIcon() {
        try {
            querySelector('#duya-header-logo .hy-hd-logo-1').src = 'https://a.msstatic.com/huya/main3/static/img/logo.png'
            querySelector('class^=NavItem] [class^=NavItemHd] i[class*=fav]').style.backgroundImage = 'url(https://a.msstatic.com/huya/hd/h5/header/components/HeaderDynamic/NavItem/img/fav-0.15b3e0b4a39185db705b7c523cd3f17c.png)'
            querySelector('[class^=NavItem] [class^=NavItemHd] i[class*=history]').style.backgroundImage = 'url(https://a.msstatic.com/huya/hd/h5/header/components/HeaderDynamic/NavItem/img/history-0.2b32fba04f79057de5abcb2b35cd8eec.png)'
        } catch (error) {

        }
    }


    // 详情操作
    detail() {
        let that = this
        // .chat-room__ft .chat-room__ft__pannel .room-chat-tool-color
        if (!new RegExp(/^https:\/\/www\.huya\.com(\/\w+)$/).test(local_url)) {
            return;
        }
        findMark('.host-name', (hostName) => {
            hostName.title = `点击屏蔽主播【${hostName?.textContent}】🧹`
            addEventListener(hostName, 'click', () => {
                if (confirm(`确认屏蔽主播【${hostName?.textContent}】？`)) {
                    that.addUser(that.getRoomIdByUrl(local_url), hostName.textContent)
                }
            })
        })
        let ads = [
            // 头部区域广告
            // '.main-wrap .room-mod-ggTop',
            // 聊天室部分广告
            // '#chatRoom .room-gg-chat',
            // 虎牙广告
            // '#huya-ab',
            // 视频区域广告
            // '.ab-main',
            // 进入直播页视频广告
            // '.pre-ab-wrap',
            // '#pre-ab-wrap',
            // '#pre-ab-video',
            // '.pre-ab-video',
            // 主播屏幕广告
            // '#public-screen-ab'
        ]

        // 移除视频播放器区域广告
        // 对于直播间黑屏的可以调整下检查次数
        // intervalRemoveElement(ads, 1500, 1)
        this.isFullScreen()
        this.autoSeletMax()

        // 礼物工具
        // 默认全部选择
        findMark('#J-room-chat-shield', (item) => {
            if (item.className.indexOf("shield-on") === -1) {
                item.click()
                log('自动点击了弹幕礼物显示工具')
            }
        }, 5, 1000)
        setTimeout(() => {
            this.autoHideMenu()
        }, 10000);


        setTimeout(() => {
            // removeDOM(querySelector('.room-player-gift-placeholder'))
            log('remove dom ....')
        }, 3000);


    }

    // 通过地址获取房间号
    getRoomIdByUrl(url = local_url) {
        url = decodeURIComponent(url)
        try {
            let m = url.match(/https?:\/\/www\.huya\.com\/(\S+)\?&/)
            if (Array.isArray(m) && m.length > 1) {
                return m[1]
            }
            return url.replace('https://www.huya.com/', '')
        } catch (error) {
            warn('url 匹配失败 请检查' + url)
            return ''
        }

    }

    // 通过房间号查找名称
    getNameByRoomId(roomId) {
        let that = this
        let hostName = querySelector('.host-name')
        if (!hostName) {
            warn(`获取不到hostname`)
            return ''
        }
        const rooms = querySelectorAll('.game-live-item')
        if (!isArray(rooms)) {
            return ''
        }
        for (let room of rooms) {
            const a = querySelector(room, 'a')
            if (a && a.href) {
                const id = that.getRoomIdByUrl(a.getAttribute('data-url'))
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
        const addClick = () => {
            Array.from(querySelectorAll('.game-live-item:not([mark=true])')).forEach(li => {
                
                if (!(li instanceof HTMLElement) || li.mark) {
                    return;
                }
                const a = querySelector(li, 'a')
                if (!a) {
                    return
                }
                
                const roomId = that.getRoomIdByUrl(a.getAttribute('data-url'))
                const user = querySelector(li, '.txt .nick')
                const name = user?.textContent || ''
                // console.log(a['data-url'],a.getAttribute('data-url'))
                if (!roomId || !user || !name) return;
                user.title = `点击屏蔽主播【${name}】 🧹`
                li.mark = true
                if (that.userIsExist(roomId) || that.userIsExist(name)) {
                    removeDOM(li, true)
                    return;
                }
                user.mark = 'true'
                addEventListener(user, 'click', () => {
                    that.addUser(roomId, name);
                    removeDOM(li, true);
                })

            })
        }
        addClick()
        loopDo(() => {
            addClick()
        }, 5, 5000)
    }

    autoHideMenu() {
        const isShow = wls.getItem(this.menu_is_first_key) != null && getLocalStore(this.menu_show_key, Boolean.name)
        log('是否显示菜单', isShow ? '显示' : ' 不显示')
        if (isShow) {
            return;
        }
        loopDo((timer) => {
            const b = querySelector('body')
            const clickM = querySelector('#sidebar-hide-btn')
            if (b instanceof HTMLElement && clickM instanceof HTMLElement) {
                // 新增判断是否需要收起左侧菜单栏 如果是隐藏状态应该需要隐藏
                if (!b.classList.contains('sidebar-min')) {
                    clickM.click()
                    log('左侧侧边栏自动收起！')
                }
                clearInterval(timer)
            }
        }, 10, 2000)

    }


   

}
