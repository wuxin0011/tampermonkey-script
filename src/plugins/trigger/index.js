import {
    addEventListener,
    intervalRemoveElement,
    isArray,
    local_url,
    loopDo,
    querySelector,
    querySelectorAll,
    removeDOM,
    removeVideo,
    setTimeoutMark,
    findMark,
    timeoutSelectorAllOne,
    warn
} from '../../utils';

import LivePlugin from "../live";

/**
 * 虎牙直播插件
 */
export default class TriggerLive extends LivePlugin {
    constructor() {
        super()
        this.key = 'huyazhibo'
        this.bg_key = 'huyazhibo_bg'
        this.bg_show_key = 'huyazhibo_bg_show'
        this.menu_show_key = 'huyazhibo_menu_show_key'
        this.full_screen_key = 'huyazhibo_full_screen_key'
        this.video_player_container = '.room-player-wrap'
        this.full_screen_button = '.room-player-wrap .player-fullscreen-btn'
        this.full_button_tag_name = 'span'
        this.defaultBackgroundImage = 'https://livewebbs2.msstatic.com/huya_1682329462_content.jpg'
        this.baseUrl = "https://www.huya.com/"
        this.menu = '.mod-sidebar'
        this.header_logo = '#duya-header #duya-header-logo a'
        this.giftTool = '.room-core .player-gift-wrap'
        this.tbody = null
        this.m_container = null
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
                }
            }, 10, 300)

        }

    }

    // 分类页操作
    category() {
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
        this.clickLogoShowContainer()
    }

    // 详情操作
    detail() {
        if (new RegExp(/^https:\/\/www\.huya\.com(\/\w+)$/).test(local_url)) {
            let that = this
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

            intervalRemoveElement(ads, 500, 20)
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

}
