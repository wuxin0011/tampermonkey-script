import { getBiliBiliInfoByUserId, getBiliBiliInfoByVideoID, isBVId, isUserId } from "@/api/bilibili";
import {
    addEventListener,
    appendChild,
    createElement,
    findMark,
    insertChild,
    local_url,
    loopDo,
    querySelector,
    removeDOM,
    timeoutSelectorAll
} from '@/utils';
import Logo from '@/utils/logo';
import { log, warn } from "../../utils";
import LivePlugin from '../live';


/**
 * bilibili
 */
export default class BiliBili extends LivePlugin {

    constructor() {
        super()
        this.header_logo = '.bili-header .bili-header__bar ul>li>a'
        this.video_player_container = '#bilibili-player'
        this.fullScreenText = '进入全屏 (f)'
        this.full_screen_is_find = false
        this.full_screen_button = '.bpx-player-ctrl-btn.bpx-player-ctrl-full'
        this.auto_max_pro_class_or_id_list = '.bpx-player-ctrl-btn.bpx-player-ctrl-quality .bpx-player-ctrl-quality-menu>.bpx-player-ctrl-quality-menu-item'
        this.init()
    }

    /**
     * 重写 button
     * @returns
     */
    createButton() {
        let that = this
        loopDo(() => {
            if (!!that.logo_btn) {
                return;
            }
            let buttonBoxs = querySelector('.palette-button-wrap .storage-box .storable-items')
            let btn = createElement('button')
            btn.className = 'primary-btn'
            btn.style.fontSize = '16px'
            if (!buttonBoxs) {
                buttonBoxs = document.querySelector('body')
                btn = createElement('div')
                btn.style.display = 'none'
                btn.className = 'm-bilibili-btn'
                btn.style.cursor = 'pointer'
                btn.style.position = 'fixed'
                btn.style.bottom = '220px'
                btn.style.right = '6px'
                btn.style.display = 'block'
                btn.style.zIndex = 9999999
                window.onscroll = () => {
                    if (window.scrollY >= 530) {
                        btn.style.display = 'block'
                    } else {
                        btn.style.display = 'none'
                    }
                }
            }

            btn.title = '点击显示'
            btn.innerHTML = Logo()
            that.logo_btn = btn
            addEventListener(btn, 'click', function () {
                that.isShowContainer()
            })

            insertChild(buttonBoxs, that.logo_btn)
        }, 20, 500)



    }


    async getRoomIdByUrl(href) {
        try {
            if (isBVId(href)) {
                let result = await getBiliBiliInfoByVideoID(local_url)
                if (result.code === 0 && result?.owner?.mid) {
                    return result?.owner?.mid
                }
            }
            if (isUserId(href)) {
                return href.match(/https:\/\/space\.bilibili\.com\/(\d+).*/)[1]
            }
        } catch (error) {
            
        }
        return this.getBilibiliRoomId(href)
    }

    getBilibiliRoomId(href) {
        return !!href && href.replace(/https:\/\/.*\.bilibili.com\/(.*?)/, '$1').replace(/\//ig, '')
    }


    // 添加删除按钮
    addDeleteRoomButton(time = 1000) {
        loopDo(() => {
            timeoutSelectorAll('.feed-card', (divs) => {
                for (let feed of divs) {
                    const isMark = !!querySelector(feed, '.m-span-text')
                    if (!isMark) {
                        let item = querySelector(feed, 'div.bili-video-card__info--bottom')
                        const name = querySelector(item, 'span.bili-video-card__info--author')?.textContent
                        const href = querySelector(item, '.bili-video-card__info--owner')?.href
                        const id = this.getBilibiliRoomId(href)
                        if (this.userIsExist(id) || this.userIsExist(name)) {
                            removeDOM(feed, true)
                        } else if (id && name) {
                            this.createSpan(feed, item, id, name)
                        }
                    }

                }

            }, time)
        }, 10, 500)



        loopDo(() => {
            timeoutSelectorAll('.bili-video-card', (divs) => {
                for (let feed of divs) {
                    const isMark = !!querySelector(feed, '.m-span-text')
                    if (!isMark) {
                        let item = querySelector(feed, 'div.bili-video-card__info--bottom')
                        let isLive = false;
                        if (!item) {
                            isLive = true;
                            item = querySelector(feed, '.bili-live-card__info--text')
                        }

                        const name = !isLive ? querySelector(item, 'span.bili-video-card__info--author')?.textContent : querySelector(item, 'a.bili-live-card__info--uname span')?.textContent
                        const href = !isLive ? querySelector(item, '.bili-video-card__info--owner')?.href : querySelector(item, 'a.bili-live-card__info--uname')?.href
                        const id = this.getBilibiliRoomId(href)

                        if (this.userIsExist(name) || this.userIsExist(id)) {
                            removeDOM(feed, true)
                        } else if (id && name) {
                            this.createSpan(feed, item, id, name)
                        }
                    }

                }

            }, 0)
        }, 100000, 500);


    }


    clickLogoShowContainer() {
        let that = this
        super.clickLogoShowContainer();
        // left-entry__title
        window.onscroll = () => {
            if (parseInt(window.scrollY) > 90) {
                operationLogo()
            } else {
                super.clickLogoShowContainer()
            }
        }

        const operationLogo = () => {
            findMark(that?.header_logo, (logo) => {
                logo.setAttribute('href', "javascript:;void(0)")
                logo.setAttribute('title', '点击Logo，显示插件配置')
                addEventListener(logo, 'click', (e) => {
                    e.preventDefault()
                    that.isShowContainer()
                })
            })
        }

    }


    common() {
        let that = this
        that.addDeleteRoomButton(1000)
        // 切换时候需要重新执行
        setTimeout(() => {
            const refreshButton = querySelector('.feed-roll-btn .primary-btn')
            addEventListener(refreshButton, 'click', () => {
                that.addDeleteRoomButton(200)
            })
        }, 3000)




    }

    index() {
        // TODO index
    }

    detailLeftVideoList(time = 1000, sel = '.video-page-card-small') {
        timeoutSelectorAll(sel, (videoList) => {
            for (let videoDom of videoList) {
                const isMark = !!videoDom.getAttribute('mark')
                // 添加标记 下次不用添加了
                videoDom.setAttribute('mark', true)
                const playinfo = querySelector(videoDom, '.playinfo')
                const link = querySelector(videoDom, '.upname a')
                const id = !!link && link?.href && this.getBilibiliRoomId(link.href)
                const name = querySelector(videoDom, '.upname .name')?.textContent
                if (this.userIsExist(id) || this.userIsExist(name)) {
                    removeDOM(videoDom, true)
                } else if (!isMark && id && name) {
                    const span = createElement('span')
                    span.classList = 'm-span-text'
                    addEventListener(span, 'click', () => {
                        removeDOM(videoDom, true)
                        this.addUser(id, name)
                        // 遍历一遍 删除所有相关视频
                        this.detailLeftVideoList(0)
                    })
                    appendChild(playinfo, span)
                }
            }
        }, time)
    }

    async detail() {
        if (new RegExp(/https:\/\/www\.bilibili\.com\/video\/(.*)/).test(local_url)) {
            loopDo(() => {
                this.detailLeftVideoList(100, '.video-page-operator-card-small')
                this.detailLeftVideoList()
            }, 100, 1000)


            const nextBtn = querySelector('.rec-footer')
            addEventListener(nextBtn, 'click', () => {
                loopDo(() => {
                    this.detailLeftVideoList(0)
                }, 100, 1000)

            })
        }

        // TODO MORE
        if (/https:\/\/www.bilibili.com\/video\/.*/.test(local_url)) {
            this.isFullScreen()
            this.isAutoMaxVideoPro()
            let result = await getBiliBiliInfoByVideoID(local_url)
            if (result && result?.code === 0 && this.userIsExist(result?.owner?.mid) || this.userIsExist(result?.owner?.name)) {
                this.roomIsNeedRemove()
            }
        }

    }


    async getNameByRoomId(keywords) {
        if (isBVId(keywords)) {
            let result = await getBiliBiliInfoByVideoID(keywords)
            if (result && result?.code === 0) {
                return result?.data?.owner?.name
            }
        } else if (isUserId(keywords)) {
            let result = await getBiliBiliInfoByUserId(keywords)
            if (result && result?.code === 0) {
                return result?.data?.name
            }
        } else {
            warn(' getNameByRoomId can not find result ！')
            return null
        }

    }


}
