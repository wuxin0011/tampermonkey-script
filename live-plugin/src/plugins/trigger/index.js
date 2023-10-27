import {
    addEventListener,
    findMark,
    intervalRemoveElement,
    isArray,
    local_url,
    loopDo,
    querySelector,
    querySelectorAll,
    removeDOM,
    removeVideo,
    setTimeoutMark,
    timeoutSelectorAllOne,
    warn,
    wls,
    getLocalStore,
} from '../../utils';

import LivePlugin from "../live";

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
            loopDo((timer) => {
                let pauseBtn = querySelector('.player-pause-btn')
                if (pauseBtn) {
                    pauseBtn.click()
                    clearInterval(timer)
                }
            }, 10, 300)

        }

    }

    // 分类页操作
    category() {
        let that = this
        if (new RegExp(/^https:\/\/.*\.huya\.((com)|(cn))\/g(\/.*)$/).test(local_url)) {
            timeoutSelectorAllOne('.live-list-nav dd', (node) => {
                addEventListener(node, 'click', () => {
                    setTimeout(() => {
                        that.removeRoomByClickRoomName()
                    }, 2000)
                })
            })

        }
    }

    // 公共部分操作
    common() {
        this.removeRoomByClickRoomName()
        this.autoHideMenu()
        this.updateHeaderIcon()

    }

    // 头部logo显示不明显问题
    updateHeaderIcon() {
        loopDo((timer) => {
            const imgs = querySelectorAll('#duya-header-logo img')
            if (!isArray(imgs)) {
                return;
            }
            for (let img of imgs) {
                img.src = 'https://a.msstatic.com/huya/main3/static/img/logo.png'
            }
            clearInterval(timer)
        })

        loopDo((timer) => {
            const icon = querySelector('[class^=NavItem] [class^=NavItemHd] i[class*=fav]')
            if (!icon) {
                return;
            }
            icon.style.backgroundImage = 'url(https://a.msstatic.com/huya/hd/h5/header/components/HeaderDynamic/NavItem/img/fav-0.15b3e0b4a39185db705b7c523cd3f17c.png)'
            clearInterval(timer)
        })
        loopDo((timer) => {
            const icon = querySelector('[class^=NavItem] [class^=NavItemHd] i[class*=history]')
            if (!icon) {
                return;
            }
            icon.style.backgroundImage = 'url(https://a.msstatic.com/huya/hd/h5/header/components/HeaderDynamic/NavItem/img/history-0.2b32fba04f79057de5abcb2b35cd8eec.png)'
            clearInterval(timer)
        })
    }


    // 详情操作
    detail() {
        let that = this
        if (new RegExp(/^https:\/\/www\.huya\.com(\/\w+)$/).test(local_url)) {
            findMark('.host-name', (hostName) => {
                hostName.title = `点击屏蔽主播【${hostName?.textContent}】`
                addEventListener(hostName, 'click', () => {
                    if (confirm(`确认屏蔽主播【${hostName?.textContent}】？`)) {
                        that.addUser(that.getRoomIdByUrl(local_url), hostName.textContent)
                    }
                })
            })


            let ads = [
                '.main-wrap .room-mod-ggTop',
                '#chatRoom .room-gg-chat',
                '#huya-ab'
            ]
            // 移除视频播放器区域广告
            intervalRemoveElement(ads, 500, 20)
            this.isFullScreen()
            this.isAutoMaxVideoPro()
        }
    }

    // 通过地址获取房间号
    getRoomIdByUrl(url = local_url) {
        try {
            return url && url.match(/https:\/\/www\.huya\.com\/(.*)/) ? url.match(/https:\/\/www\.huya\.com\/(.*)/)[1] : ''
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
        timeoutSelectorAllOne('.game-live-item', (li) => {
            setTimeoutMark(li, () => {
                const a = querySelector(li, 'a')
                const url = a.href
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
            }, 0)
        }, 500)

    }

    autoHideMenu() {
        const isShow = wls.getItem(this.menu_is_first_key) != null && getLocalStore(this.menu_show_key, Boolean.name)
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
        }, 100, 100)

    }







}
