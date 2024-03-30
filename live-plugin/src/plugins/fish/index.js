import {
    addEventListener,
    backgroundNone,
    findMark,
    getLocalStore,
    local_url,
    log,
    loopDo,
    querySelector,
    querySelectorAll,
    removeDOM,
    removeVideo,
    throttle,
    wls
} from '../../utils';

import { getInfo } from "../../api/fish";
import LivePlugin from "../live";

/**
 * 斗鱼直播插件
 */
export default class FishLive extends LivePlugin {
    constructor() {
        super()
        this.video_player_container = '#room-html5-player'
        this.baseUrl = "https://www.douyu.com/"
        this.default_background_image = 'https://sta-op.douyucdn.cn/dylamr/2022/11/07/1e10382d9a430b4a04245e5427e892c8.jpg'
        this.menu = '#js-aside'
        this.full_screen_button = "[class^=controlbar] [class^=fs]"
        this.gift_tool = '.layout-Player-main #js-player-toolbar'
        this.header_logo = '#js-header .Header-left .Header-logo'
        this.auto_max_pro_class_or_id_list = '#js-player-video .room-Player-Box [class^=rate] ul>li'
        this.init()
    }

    // 公共部分页面操作
    common() {
        this.autoHideMenu()
    }

    //首页操作
    index() {
        let that = this
        // 直播源
        if (local_url.indexOf('https://www.douyu.com/home/beta') != -1 && !(local_url=== that.baseUrl || new RegExp(/https:\/\/www\.douyu\.com\/\?.*/).test(local_url))) {
            return;
        }
        window.scroll(0, 0)

        // 屏蔽游戏广告链接
        findMark('.layout-Section.layout-Slide-banner', (a) => {
            a.href = 'javascript:;void(0)'
            addEventListener(a, 'click', (e) => e.preventDefault())
        }, 10, 100)
        // 移除直播
        // removeVideo('.layout-Slide-player video')
        // 获取暂停button

        // 暂停默认播放
        loopDo((timer) => {
            const pause = querySelector('#room-html5-player #__controlbar [class^=pause]')
            if (pause) {
                pause.click()
                clearInterval(timer)
            }
        }, 50, 500)


        let topBtn = querySelector('.layout-Main .ToTopBtn')
        if (topBtn) {
            topBtn.style.display = 'block'
        }
        function runIndex() {
            console.log('window index run ...')
            Array.from(querySelectorAll('li.layout-List-item')).forEach(li => {
                const user = querySelector(li, '.DyCover-user')
                const a = querySelector(li, '.DyCover')
                if (!a) {
                    return;
                }
                const name = user?.textContent || ''
                if (that.isRemove(a?.href) || that.userIsExist(name)) {
                    removeDOM(li)
                    return
                }
                if (li.mark) {
                    return;
                }
                // a.setAttribute('href', 'javascript:;void(0)');
                addEventListener(user, 'click', (e) => {
                    e.preventDefault()
                    that.addUser(that.getRoomIdByUrl(a?.href), name);
                    removeDOM(li);
                })
                li.mark = true
            })
        }
        runIndex()
        window.onscroll = throttle(500, runIndex)


        // TODO 斗鱼广告加载广告处理
        // querySelectorAll('[class^=layoutMain] div[class^=cover]')
        
    }

    // 分类页面操作
    category() {
        let that = this
        // 匹配分类页
        if (!(new RegExp(/https:\/\/www.douyu.com(\/((directory.*)|(g_.*)))$/).test(local_url))) {
            return;
        }
        Array.from(querySelectorAll('.layout-Module-filter .layout-Module-label')).forEach(label => {
            addEventListener(label, 'click', (e) => {
                e.preventDefault()
                // 获取当前地址
                let to_link = label && label.href ? label.href : null
                if (to_link) {
                    window.location.href = to_link
                } else {
                    // 获取全部地址
                    window.location.href = 'https://www.douyu.com/g_' + local_url.match(RegExp(
                        /subCate\/.*/g))[0].replace('subCate', '').match(new RegExp(
                            /\w+/g))[0]
                }

            })
        })
        function runCategory() {
            Array.from(querySelectorAll('.layout-Cover-item')).forEach(li => {
                if (li.mark) {
                    return;
                }
                const link = querySelector(li, '.DyListCover-wrap')
                if (!link) {
                    return;
                }
                link.setAttribute('href', 'javascript:;void(0)');
                const user = querySelector(link, '.DyListCover-userName')
                const name = user?.textContent || ''
                if (!name) return;
                const roomId = that.getRoomIdByUrl(link?.href);
                if (that.isRemove(roomId) || that.userIsExist(name)) {
                    removeDOM(li, true)
                } else {
                    if (!user.mark && roomId && name) {
                        user.mark = 'mark'
                        link.title = `点击移除主播:${name}`
                        addEventListener(user, 'click', (e) => {
                            e.preventDefault()
                            that.addUser(roomId, name);
                            removeDOM(li);
                        })
                    }

                }
                addEventListener(li, 'mouseenter', () => {
                    const a = querySelector(li, '.DyListCover-wrap.is-hover')
                    if (!a) {
                        return;
                    }
                    const user = querySelector(a, '.DyListCover-userName')
                    if (!user?.textContent) return;
                    const id = that.getRoomIdByUrl(a.href);
                    if (!user || !roomId || user.mark) {
                        return;
                    }
                    a.title = `点击移除主播:${user.textContent}`
                    // a.setAttribute('href', 'javascript:;void(0)');
                    addEventListener(a, 'click', (e) => {
                        e.preventDefault()
                    })
                    addEventListener(user, 'click', (e) => {
                        e.preventDefault()
                        if (id && user?.textContent) {
                            removeDOM(li);
                            that.addUser(id, user.textContent);
                        }

                    })
                    user.mark = 'is-mark'
                })
                li.mark = 'mark'
            })
        }
        runCategory()
        window.addEventListener('scroll', throttle(1000, runCategory))
    }


    // 详情页操作
    detail() {
        let that = this
        if (!new RegExp(/.*douyu.*(\/((.*rid=\d+)|(\d+)).*)$/).test(local_url)) {
            return;
        }
        findMark('.Title-roomInfo h2.Title-anchorNameH2', (hostName) => {
            hostName.title = `点击屏蔽主播【${hostName?.textContent}】`
            addEventListener(hostName, 'click', () => {
                that.addUser(that.getRoomIdByUrl(local_url), hostName.textContent)
            })
        })
        loopDo(() => {
            let closeBtn = querySelector('.roomSmallPlayerFloatLayout-closeBtn')
            if (closeBtn) {
                closeBtn.click()
            }
        }, 10, 1000)
        // 带有轮播图
        if (new RegExp(/.*douyu.*\/topic(\/(.*rid=\d+).*)/).test(local_url)) {
            let backgroundNones = ['.wm-general-wrapper.bc-wrapper.bc-wrapper-player', '.wm-general-bgblur']
            Array.from(querySelectorAll('#root>div')).forEach(element => {
                if (!!querySelector(element, '.layout-Main')) {
                    backgroundNone(element, backgroundNones)
                } else {
                    removeDOM(element, true)
                }

            })
        }
        // 不带有轮播图
        if (new RegExp(/.*douyu.*(\/(\d+)).*/).test(local_url)) {
            // 对于恶意广告要彻底清除！！！
            let ads = [
                "#player-above-controller+div"
            ]
            // intervalRemoveElement(ads, 500, 20)
            removeDOM('.layout-Main .ToTopBtn', true)

        }

        this.isFullScreen()
        this.isAutoMaxVideoPro()

        // 默认全部选择
        findMark('.ChatToolBar .ShieldTool-enter .ShieldTool-listItem', (item) => {
            if (item.className.indexOf('is-noChecked') !== -1) {
                item.click()
                log('自动点击了弹幕礼物显示工具')
            }
        }, 100, 1000)
    }

    // 通过房间号获取直播间name
    async getNameByRoomId(keywords) {
        let that = this
        // 从 接口中获取
        let searchResult = await getInfo(keywords);
        if (searchResult?.room && searchResult?.room?.nickname) {
            log(`搜索到主播 ${searchResult.room.nickname}`)
            return searchResult.room.nickname
        }
        // 从详情页获取
        let hostName = querySelector('.Title-blockInline .Title-anchorName h2')
        if (!hostName) {
            // index
            Array.from(querySelectorAll('.layout-List-item')).forEach(room => {
                const id = that.getRoomIdByUrl(querySelector(room, 'a').href)
                const user = querySelector(room, '.DyCover-user')
                if (id === keywords) {
                    hostName = user
                }
            })
            // 如果还是获取不到从分类页面获取
            if (!hostName) {
                Array.from(querySelectorAll('.layout-Cover-item')).forEach(room => {
                    const id = that.getRoomIdByUrl(querySelector(room, 'a').href)
                    const user = querySelector(room, '.DyListCover-userName')
                    if (id === keywords) {
                        hostName = user
                    }
                })
            }
        }
        return hostName?.textContent || ''
    }


    // 通过房间地址获取房间号
    getRoomIdByUrl(url = local_url) {
        try {
            if (new RegExp(/.*rid=(\d+).*/).test(url)) {
                return url.match(new RegExp(/rid=(\d+)/))[1]
            }
            if (/https:\/\/www\.douyu\.com\/(\d+).*/.test(url)) {
                return url.match(new RegExp(/https:\/\/www\.douyu\.com\/(\d+)/))[1]
            }
            return null

        } catch (e) {
            return null
        }
    }

    isFullScreen() {

    }

    autoHideMenu() {
        const isShow = wls.getItem(this.menu_is_first_key) != null && getLocalStore(this.menu_show_key, Boolean.name)
        if (isShow) {
            return;
        }
        loopDo((timer) => {
            const clickM = querySelector('.Aside-toggle')
            const leftSider = querySelector('#js-aside')
            if (leftSider instanceof HTMLElement && clickM instanceof HTMLElement) {
                const leftSiderWidth = Number(window.getComputedStyle(leftSider).width.split('px')[0])
                if ((leftSiderWidth > 80)) {
                    clickM.click()
                    log('左侧侧边栏自动收起！')
                }
                clearInterval(timer)
            }
        }, 100, 100)
    }


}
