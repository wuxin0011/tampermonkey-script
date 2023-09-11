import {
    querySelector,
    querySelectorAll,
    createElement,
    throttle,
    addEventListener,
    insertChild,
    timeoutSelectorAll, removeDOM, appendChild, local_url, log, findMark, loopDo, isArray
} from '../../utils'
import LivePlugin from '../live'
import {getBiliBiliInfoByVideoID} from "../../api/bilibili";
import Logo from '../../utils/logo'


/**
 * bilibili
 */
export default class BiliBili extends LivePlugin {

    constructor() {
        super()
        this.header_logo = '.bili-header .bili-header__bar ul>li>a'
        this.video_player_container = '#bilibili-player'
        this.fullScreenText = '进入全屏 (f)'
        this.auto_max_pro_class_or_id_list = '.bpx-player-ctrl-btn.bpx-player-ctrl-quality .bpx-player-ctrl-quality-menu>.bpx-player-ctrl-quality-menu-item'
        this.init()
    }

    /**
     * 重写 button
     * @returns
     */
    createButton() {
        let that = this
        if (!!that.logo_btn) {
            return;
        }
        let buttonBoxs = querySelector('.palette-button-wrap .storage-box .storable-items')
        let btn = createElement('button')
        btn.className = 'primary-btn'
        btn.style.fontSize = '16px'

        if (!buttonBoxs) {
            buttonBoxs = querySelector('div.fixed-sidenav-storage')
            if (!buttonBoxs) {
                console.log('暂不支持...');
                return;
            }
            btn = createElement('div')
            btn.style.display = 'none'
            btn.className = 'm-bilibili-btn'
            window.onscroll = () => {
                if (window.scrollY >= 500) {
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
    }


    async getRoomIdByUrl(href) {
        try {
            if (/https:\/\/www.bilibili.com\/video\/.*/.test(local_url)) {
                let result = await getBiliBiliInfoByVideoID(local_url)
                if (result.code === 0 && result?.owner?.mid) {
                    return result?.owner?.mid
                }
            }
            if (/https:\/\/space\.bilibili\.com\/(\d+).*/.test(href)) {
                return href.match(/https:\/\/space\.bilibili\.com\/(\d+)/)[1]
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

        window.onscroll = throttle(500, () => {
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

            }, time)
        })

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
                        if (confirm('确认删除up主 ' + name + ' ?')) {
                            removeDOM(videoDom, true)
                            this.addUser(id, name)
                            // 遍历一遍 删除所有相关视频
                            this.detailLeftVideoList(0)
                        }
                    })
                    appendChild(playinfo, span)
                }
            }
        }, time)
    }

    async detail() {
        // 播放详情页
        if (new RegExp(/https:\/\/www\.bilibili\.com\/video\/(.*)/).test(local_url)) {
            this.detailLeftVideoList(100, '.video-page-operator-card-small')
            this.detailLeftVideoList()
            const nextBtn = querySelector('.rec-footer')
            addEventListener(nextBtn, 'click', () => {
                this.detailLeftVideoList(0)
            })
        }

        // TODO MORE
        if (/https:\/\/www.bilibili.com\/video\/.*/.test(local_url)) {
            this.isFullScreen()
            this.isAutoMaxVideoPro()
            let result = await getBiliBiliInfoByVideoID(local_url)
            console.log('视频查询结果详情:', result)
            if (result.code === 0 && this.userIsExist(result?.owner?.mid) || this.userIsExist(result?.owner?.name)) {
                this.roomIsNeedRemove()
            }

        }

    }


    async getNameByRoomId(bvId) {
        let result = await getBiliBiliInfoByVideoID(bvId)
        if (result.code === 0) {
            return result?.data?.owner?.name
        }
    }


}
