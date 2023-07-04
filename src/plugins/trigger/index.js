import {
    addEventListener,
    getLocalStore, intervalRemoveElement,
    isArray,
    local_url,
    querySelector,
    querySelectorAll,
    removeDOM,
    removeVideo,
    timeoutSelectorAll
} from '../../utils'

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
        this.defaultBackgroundImage = 'https://livewebbs2.msstatic.com/huya_1682329462_content.jpg'
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
        if (local_url === this.baseUrl) {
            // 操作视频
            removeVideo('.mod-index-main video')
            // 触发点击关闭广告
            const banner_close = querySelector('.mod-index-wrap #banner i')
            if (banner_close) {
                banner_close.click();
            }
            let count = 0;
            let timer1 = setInterval(() => {
                let pauseBtn = querySelector('.player-pause-btn')
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
            timeoutSelectorAll('.live-list-nav dd', (nodes) => {
                for (let node of nodes) {
                    addEventListener(node, 'click', () => {
                        setTimeout(() => {
                            that.removeRoomByClickRoomName()
                        }, 2000)
                    })

                }
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
            // 点击直播间移除直播间操作
            const hostName = querySelector('.host-name')
            hostName.title = `点击屏蔽主播【${hostName.textContent}】`
            addEventListener(hostName, 'click', () => {
                if (confirm(`确认屏蔽主播 ${hostName.textContent}？`)) {
                    that.addUser(that.getRoomIdByUrl(local_url), hostName.textContent)
                }
            })

            // 自动剧场模式
            let count = 20
            let timer = setInterval(() => {
                count = count - 1
                let clickFullButton = querySelector('#player-fullpage-btn')
                let show3 = getLocalStore(that.full_screen_key, Boolean.name)
                let isClick = clickFullButton?.getAttribute('isClick')
                if (clickFullButton && show3 && !isClick) {
                    clickFullButton.click()
                    clickFullButton.setAttribute('isClick', true)
                }
                if (count === 0) {
                    clearInterval(timer)
                }
            }, 100)

            let ads = [
                '.main-wrap .room-mod-ggTop',
                '#chatRoom .room-gg-chat',
                '#huya-ab'
            ]

            // 对于恶意广告要彻底清空
            intervalRemoveElement(ads, 500, 20)
            // TODO 特效设置暂时未开启！
        }
    }

    // 通过地址获取房间号
    getRoomIdByUrl(url = local_url) {
        return url.match(/https:\/\/www\.huya\.com\/(.*)/)[1]
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
        timeoutSelectorAll('.game-live-item', (rooms) => {
            for (let li of rooms) {
                let isMark = li.getAttribute('mark')
                if (!isMark) {
                    li.setAttribute('mark', true)
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
                }

            }

        }, 500)

    }

}
