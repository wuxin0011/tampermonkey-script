import {
    querySelector,
    querySelectorAll,
    createElement,
    throttle,
    addEventListener,
    insertChild,
    timeoutSelectorAll, removeDOM, appendChild, local_url, log
} from '../../utils'
import LivePlugin from '../live'
import {getBiliBiliInfoByVideoID} from "../../api/bilibili/index.js";


/**
 * bilibili
 */
export default class BiliBili extends LivePlugin {

    constructor() {
        super()
        this.header_logo = '.bili-header .bili-header__bar ul>li>a'
        this.video_player_container = '#bilibili-player'
        this.fullScreenText = '进入全屏 (f)'
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
        btn.innerHTML = `<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2753" width="24" height="24"><path d="M306.005333 117.632L444.330667 256h135.296l138.368-138.325333a42.666667 42.666667 0 0 1 60.373333 60.373333L700.330667 256H789.333333A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334a149.333333 149.333333 0 0 1-149.333334 149.333333h-554.666666A149.333333 149.333333 0 0 1 85.333333 746.666667v-341.333334A149.333333 149.333333 0 0 1 234.666667 256h88.96L245.632 177.962667a42.666667 42.666667 0 0 1 60.373333-60.373334zM789.333333 341.333333h-554.666666a64 64 0 0 0-63.701334 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.701333L234.666667 810.666667h554.666666a64 64 0 0 0 63.701334-57.856L853.333333 746.666667v-341.333334A64 64 0 0 0 789.333333 341.333333zM341.333333 469.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666666-42.666667z m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z" p-id="2754" fill="currentColor"></path></svg>`


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

        function operationLogo() {
            log('logo')
            that = this
            let logo = querySelector(that.header_logo)
            let isMark = logo.getAttribute('isMark')
            if (!isMark) {
                logo.setAttribute('isMark', 'true')
                logo.setAttribute('href', "javascript:;void(0)")
                logo.setAttribute('title', '点击Logo，显示插件配置')
                addEventListener(logo, 'click', (e) => {
                    that.isShowContainer()
                })
            }
        }

    }


    common() {
        this.clickLogoShowContainer()
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

        if (/https:\/\/www.bilibili.com\/video\/.*/.test(local_url) && false) { // 该功能暂时有bug 不需要 直接 false吧
            const userContainer = querySelector('.right-container-inner .up-info-container')
            const place = querySelector(userContainer, '.up-detail-top')
            const link = querySelector(userContainer, '.up-detail-top>a')
            const name = link.textContent
            const id = this.getRoomIdByUrl(link.href)
            const span = createElement('span')
            span.classList = 'm-span-text'
            appendChild(place, span)
            addEventListener(span, 'click', () => {
                if (confirm('确认屏蔽up主' + name + ' ?')) {
                    this.addUser(id, name)
                }
            })
        }
        // TODO MORE
        if (/https:\/\/www.bilibili.com\/video\/.*/.test(local_url)) {
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
