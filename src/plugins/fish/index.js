import {
    addEventListener,
    backgroundNone,
    findButton,
    findMark,
    getLocalStore,
    isArray,
    local_url,
    log,
    loopDo,
    querySelector,
    querySelectorAll,
    removeDOM,
    removeVideo,
    setTimeoutMark,
    throttle,
    timeoutSelectorAllOne,
    wls
} from '../../utils';

import {getInfo} from "../../api/fish";
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
        this.gift_tool = '.layout-Player-main #js-player-toolbar'
        this.header_logo = '#js-header .Header-left .Header-logo'
        this.auto_max_pro_class_or_id_list = '#js-player-video .room-Player-Box .rate-5c068c ul>li'
        this.init()
    }

    // 公共部分页面操作
    common() {
    }

    //首页操作
    index() {
        let that = this
        // 直播源
        if (window.location.href === that.baseUrl || new RegExp(/https:\/\/www\.douyu\.com\/\?.*/).test(local_url)) {
            window.scroll(0, 0)
            // 移除直播
            removeVideo('.layout-Slide-player video')
            // 获取暂停button
            const vbox = querySelector('#room-html5-player');
            if (vbox) {
                const divs = querySelectorAll(vbox, 'div')
                if (isArray(divs)) {
                    for (let div of divs) {
                        if (div?.title === '暂停') {
                            div.click()
                        }
                    }
                }
            }
            that.removeRoomByClickRoomName()
            window.onscroll = throttle(500, () => {
                that.removeRoomByClickRoomName()
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
        if (new RegExp(/https:\/\/www.douyu.com(\/((directory.*)|(g_.*)))$/).test(local_url)) {
            that.removeRoomByClickRoomName()
            const labels = querySelectorAll('.layout-Module-filter .layout-Module-label')
            timeoutSelectorAllOne('.layout-Module-filter .layout-Module-label', (label) => {
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
        }


    }


    // 详情页操作
    detail() {
        let that = this
        // 匹配只有在播放直播间才会生效
        if (!new RegExp(/.*douyu.*(\/((.*rid=\d+)|(\d+)).*)$/).test(local_url)) {
            return;
        }
        findMark('.Title-roomInfo h2.Title-anchorNameH2', (hostName) => {
            hostName.title = `点击屏蔽主播【${hostName?.textContent}】`
            addEventListener(hostName, 'click', () => {
                if (confirm(`确认屏蔽主播【${hostName?.textContent}】？`)) {
                    that.addUser(that.getRoomIdByUrl(local_url), hostName.textContent)
                }
            })
        })
        // 带有轮播图
        if (new RegExp(/.*douyu.*\/topic(\/(.*rid=\d+).*)/).test(local_url)) {
            let divs = querySelectorAll('#root>div')
            let backgroundNones = ['.wm-general-wrapper.bc-wrapper.bc-wrapper-player', '.wm-general-bgblur']
            if (isArray(divs)) {
                for (let element of divs) {
                    if (!!querySelector(element, '.layout-Main')) {
                        backgroundNone(element, backgroundNones)
                    } else {
                        removeDOM(element, true)
                    }

                }
            }


        }
        // 不带有轮播图
        if (new RegExp(/.*douyu.*(\/(\d+)).*/).test(local_url)) {
            findMark('.roomSmallPlayerFloatLayout-closeBtn', (closeBtn) => {
                closeBtn.click()
            })
            // 对于恶意广告要彻底清除！！！
            let ads = [
                "#player-above-controller+div"
            ]
            // intervalRemoveElement(ads, 500, 20)
            removeDOM('.layout-Main .ToTopBtn', true)

        }
        this.isFullScreen()
        this.isAutoMaxVideoPro()
    }

    // 通过点击直播间名称删除直播间
    removeRoomByClickRoomName() {
        let that = this
        // 首页
        if (this.baseUrl === local_url || new RegExp(/https:\/\/www\.douyu\.com\/\?.*/).test(local_url)) {
            timeoutSelectorAllOne('.layout-List-item', (li) => {
                setTimeoutMark(li, () => {
                    const a = querySelector(li, '.DyCover')
                    const url = a?.href || ''
                    const user = querySelector(li, '.DyCover-user')
                    const name = user?.textContent || ''
                    a.setAttribute('href', 'javascript:;void(0)');
                    addEventListener(a, 'click', (e) => {
                        e.preventDefault()
                    })
                    addEventListener(user, 'click', (e) => {
                        e.preventDefault()
                        if (confirm(`确认禁用 ${name}`)) {
                            that.addUser(that.getRoomIdByUrl(url), name);
                            removeDOM(li);
                        }
                    })
                    // 是否应该删除
                    if (that.isRemove(url) || that.userIsExist(name)) {
                        removeDOM(li)
                    }
                }, 100)
            }, 100)
        }
        if (new RegExp(/https:\/\/www.douyu.com(\/((directory)|(g_)).*)/).test(local_url)) {
            timeoutSelectorAllOne('.layout-Cover-item', (li) => {
                setTimeoutMark(li, () => {
                    const link = querySelector(li, 'a.DyListCover-wrap')
                    if (link) {
                        const url = link?.href || ''
                        link.setAttribute('href', 'javascript:;void(0)');
                        addEventListener(link, 'click', (e) => {
                            e.preventDefault()
                        })
                        const user = querySelector(link, 'div.DyListCover-userName')
                        const name = user.textContent || ''
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
                                const url = a?.href
                                a.setAttribute('href', 'javascript:;void(0)');
                                addEventListener(a, 'click', (e) => {
                                    e.preventDefault()
                                })
                                const user = querySelector(a, '.DyListCover-userName')
                                const name = user.textContent || ''
                                addEventListener(user, 'click', (e) => {
                                    e.preventDefault()
                                    if (confirm(`确认禁用 ${name}？`)) {
                                        const id = that.getRoomIdByUrl(url);
                                        that.addUser(id, name);
                                        removeDOM(li);
                                    }
                                })

                            })
                        }
                    }
                }, 100)
            }, 0)

        }
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
        let rooms = null;
        if (!hostName) {
            rooms = querySelectorAll('.layout-List-item')
            // index
            if (isArray(rooms)) {
                for (let room of rooms) {
                    const id = that.getRoomIdByUrl(querySelector(room, 'a').href)
                    const user = querySelector(room, '.DyCover-user')
                    if (id === keywords) {
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
                        if (id === keywords) {
                            hostName = user
                        }
                    }
                }
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


    // isAutoMaxVideoPro() {
    //     if (!(wls.getItem(this.is_first_auto_max_pro_key) === null ? true : getLocalStore(this.auto_max_pro_key, Boolean.name))) {
    //         return;
    //     }
    //     log('自动全屏查找中...')
    //     const parent_container = `#js-player-video .room-Player-Box`
    //     let default_class = '.rate-5c068c'
    //
    //     const check = () => {
    //         return findButton(parent_container, default_class, "清晰度", "div")
    //     }
    //     loopDo((timer) => {
    //         const nodes = querySelectorAll(`${parent_container} ${default_class} ul li`)
    //         log('查找结果',nodes)
    //         if (isArray(nodes)) {
    //             nodes[0].click()
    //             clearInterval(timer)
    //         } else {
    //             default_class = check()
    //         }
    //
    //     }, 20, 1000)
    //
    //
    // }


}
