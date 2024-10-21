import { getBiliBiliInfoByUserId, getBiliBiliInfoByVideoID, isBVId, isUserId } from "@/api/bilibili";
import {
    addEventListener,
    appendChild,
    createElement,
    findMark,
    getLocalStore,
    insertChild,
    local_url,
    loopDo,
    querySelector,
    removeDOM,
    wls,
    isShowBg
} from '@/utils';
import Logo from '@/utils/logo';
import { handlerDisplay, isShowHotSearch, log, querySelectorAll, throttle, warn } from "../../utils";
import LivePlugin from '../live';
import cssUpdate from '../../style/dark/dark.image';



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
        // https://i2.hdslb.com/bfs/static/stone-free/dyn-home/assets/bg.png@1c.webp
        this.default_background_image = 'https://s1.hdslb.com/bfs/static/blive/blfe-message-web/static/img/infocenterbg.a1a0d152.jpg'
        this.auto_max_pro_class_or_id_list = '.bpx-player-ctrl-btn.bpx-player-ctrl-quality .bpx-player-ctrl-quality-menu>.bpx-player-ctrl-quality-menu-item'
        this.init()
    }




    /**
     * 重写 button
     * @returns
     */
    createButton() {
        let that = this
        let isShowLogo = () => wls.getItem(that.btn_is_first_key) === null ? true : getLocalStore(that.logo_show_key, Boolean.name) // logo 默认显示

        loopDo(() => {
            if (!!that.logo_btn) {
                return;
            }
            let buttonBoxs = querySelector('.palette-button-wrap .storage-box .storable-items')
            let btn = createElement('div')
            btn.className = 'm-bilibili-btn'
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
                btn.style.display = 'none'
                btn.style.zIndex = 9999999
                window.onscroll = () => {
                    if (window.scrollY >= 530 && isShowLogo()) {
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
        let that = this


        const scan = () => {
            const scanVideo = (sc = true) => {
                Array.from(querySelectorAll('.feed-card')).forEach(feed => {
                    const isMark = !!querySelector(feed, '.m-span-text')
                    if (feed.querySelector('.bili-video-card__info--ad')) {
                        removeDOM(feed)// 广告
                        return
                    }
                    if (feed.ok && isMark && sc) {
                        return;
                    }
                    let item = querySelector(feed, 'div.bili-video-card__info--bottom')
                    const name = querySelector(item, 'span.bili-video-card__info--author')?.textContent
                    const href = querySelector(item, '.bili-video-card__info--owner')?.href
                    const id = that.getBilibiliRoomId(href)
                    if (!name || !id) return;
                    if (!isMark) {
                        createSpan(feed, item, id, name)
                    }
                    if (this.userIsExist(id) || this.userIsExist(name)) {
                        removeDOM(feed, true)
                        return;
                    }

                    feed.ok = true
                })

                Array.from(querySelectorAll('.bili-video-card')).forEach(feed => {
                    const isMark = !!querySelector(feed, '.m-span-text')
                    if (feed.querySelector('.bili-video-card__info--ad')) {
                        removeDOM(feed)// 广告
                        return
                    }
                    if (feed.ok && isMark && sc) {
                        return;
                    }
                    let item = querySelector(feed, '.bili-video-card__info--bottom')
                    let isLive = false;
                    if (!item) {
                        isLive = true;
                        item = querySelector(feed, '.bili-live-card__info--text')
                    }
                    const name = !isLive ? querySelector(item, 'span.bili-video-card__info--author')?.textContent : querySelector(item, 'a.bili-live-card__info--uname span')?.textContent
                    const href = !isLive ? querySelector(item, '.bili-video-card__info--owner')?.href : querySelector(item, 'a.bili-live-card__info--uname')?.href
                    const id = this.getBilibiliRoomId(href)
                    if (!name || !id) return;
                    if (!isMark) {
                        createSpan(feed, item, id, name)
                    }
                    if (this.userIsExist(name) || this.userIsExist(id)) {
                        removeDOM(feed, true)
                    }
                    feed.ok = true
                })

            }

            const createSpan = (container, place, id, name = id, message = '确认屏蔽up主 ', remove = true) => {
                if (!container || !place || !id || !name) {
                    return;
                }
                if (!!container.querySelector('.m-span-text')) {
                    return;
                }
                const span = createElement('span')
                span.classList = 'm-span-text'
                addEventListener(span, 'click', (e) => {
                    e.preventDefault()
                    if (remove) {
                        removeDOM(container, true)
                    }
                    that.addUser(id, name)
                    scanVideo(false)
                })
                appendChild(place, span)
            }
            loopDo(() => {
                scanVideo()
            }, 10, 500)



        }

        scan()


        window.addEventListener('scroll', throttle(500, scan))
        findMark('.feed-roll-btn .roll-btn', (btn) => {
            addEventListener(btn, 'click', () => {
                scan()
            })
        })
    }


    clickLogoShowContainer() {
        let that = this
        super.clickLogoShowContainer();
        window.addEventListener('scroll', () => {
            if (parseInt(window.scrollY) > 90) {
                operationLogo()
            } else {
                super.clickLogoShowContainer()
            }
        })
        const operationLogo = () => {
            if (!(wls.getItem(that.btn_is_first_key) == null || getLocalStore(that.logo_show_key, Boolean.name))) {
                return;
            }

            // 移除B站头部问题，
            // findMark(that?.header_logo, (logo) => {
            //     logo.setAttribute('href', "javascript:;void(0)")
            //     logo.setAttribute('title', '点击Logo，显示插件配置')
            //     addEventListener(logo, 'click', (e) => {
            //         e.preventDefault()
            //         that.isShowContainer()
            //     })
            // })
        }

    }


    common() {
        this.addDeleteRoomButton()
    }


    index() {
        // TODO index
    }

    detailLeftVideoList(sel = '.card-box') {
        console.log("querySelectorAll('.video-page-card-small')>>>>>>>")
        const scanVideoList = (sc) => {
            console.log("querySelectorAll('.video-page-card-small')")
            // Array.from(querySelectorAll('.video-page-card-small')).forEach(feed => {

            //     console.log('feed.ok && isMark && !sc', feed.ok && isMark && !sc)
            //     const isMark = !!querySelector(feed, '.m-span-text')
            //     if (feed.querySelector('.bili-video-card__info--ad')) {
            //         removeDOM(feed)// 广告
            //         return
            //     }
            //     if (feed.ok && isMark && !sc) {
            //         return;
            //     }
            //     feed.setAttribute('mark', true)
            //     // console.log('feed', feed)
            //     let item = querySelector(feed, '[class^=card-box]')
            //     let playinfo = querySelector(feed, '.playinfo')
            //     const name = querySelector(item, '.upname .name')?.textContent
            //     const href = querySelector(item, '.upname a')?.href
            //     const id = this.getBilibiliRoomId(href)
            //     if (this.userIsExist(id) || this.userIsExist(name)) {
            //         removeDOM(feed, true)
            //         log('up主', name, '已经被移除！UUID=>', id)
            //     } else if (!isMark) {
            //         const span = createElement('span')
            //         span.classList = 'm-span-text'
            //         addEventListener(span, 'click', () => {
            //             this.addUser(id, name)
            //             // 遍历一遍 删除所有相关视频
            //             scanVideoList(true)
            //         })
            //         appendChild(playinfo, span)
            //     }
            // })
            Array.from(querySelectorAll(sel)).forEach(videoDom => {

                // 广告部分
                if (videoDom.querySelector('.bili-video-card__info--ad')) {
                    removeDOM(videoDom)
                    return
                }
                const isMark = !!videoDom.getAttribute('mark')
                const isAdd = !!videoDom.querySelector('.m-span-text')
                // .feed-card .bili-video-card__info--ad,

                if (isMark && isAdd && !sc) {
                    return;
                }
                // 添加标记 下次不用添加了
                videoDom.setAttribute('mark', true)
                const playinfo = querySelector(videoDom, '.playinfo')
                const link = querySelector(videoDom, '.upname a')
                const id = !!link && link?.href && this.getBilibiliRoomId(link.href)
                const name = querySelector(videoDom, '.upname .name')?.textContent
                if (this.userIsExist(id) || this.userIsExist(name)) {
                    removeDOM(videoDom, true)
                    log('up主', name, '已经被移除！UUID=>', id)
                } else if (!isMark) {
                    const span = createElement('span')
                    span.classList = 'm-span-text'
                    addEventListener(span, 'click', () => {
                        this.addUser(id, name)
                        // 遍历一遍 删除所有相关视频
                        scanVideoList(true)
                    })
                    appendChild(playinfo, span)
                }
            })



        }
        setTimeout(() => {
            scanVideoList(false)
            let button = querySelector('.rec-footer')
            addEventListener(button, 'click', () => {
                scanVideoList(false)
            })
        }, 5000);

    }

    async detail() {
        const that = this
        if (!/https:\/\/www\.bilibili\.com\/video\/(.*)/.test(local_url)) {
            return;
        }

        /* ****************************************************************** */

        this.rightMenuVideoOperation()
        this.isFullScreen()
        this.isAutoMaxVideoPro()



        /* 视频推荐不显示暂时关闭 */
        // const result = await getBiliBiliInfoByVideoID(local_url)
        // if (result && result?.code === 0 && this.userIsExist(result?.owner?.mid) || this.userIsExist(result?.owner?.name)) {
        //     this.roomIsNeedRemove()
        // }

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



    settingBackgroundImage(url, container) {
        // HOME
        if (local_url.indexOf('https://www.bilibili.com/?') != -1 || local_url === 'https://www.bilibili.com/' || local_url === 'https://www.bilibili.com') {
            container = querySelector('#i_cecream')
        }

        // VIDEO
        if (local_url.indexOf('https://www.bilibili.com/video') != -1) {
            container = querySelector('#app')
        }
        super.settingBackgroundImage(url, container)
    }


    rightMenuVideoOperation() {
        let that = this
        const right_container_key = '__right_container_key__'
        const right_video_list_reco_list_key = '__right_video_list_reco_list_key__'
        let right_video_list_container = querySelector('.right-container')
        let show = wls.getItem(right_container_key) != 'false'
        right_video_list_container.style.display = show ? "" : 'none'
        let show_video = false
        function scanVideoList() {
            that.detailLeftVideoList()
            that.detailLeftVideoList('.video-page-operator-card-small')
        }


        // id = reco_list
        let addCommand = false

        findMark(['#reco_list', '[class^=recommend-list]'], (element) => {
            let right_video_list_reco_list = element
            if (addCommand) return

            // console.log('right_video_list_reco_list',right_video_list_reco_list)
            if (right_video_list_reco_list) {
                show_video = wls.getItem(right_video_list_reco_list_key) != 'false'
                log('默认是否显示video ？ ', show_video, '默认是否显示right menu ？ ', show)
                right_video_list_reco_list.style.display = show_video ? "" : 'none'

                GM_registerMenuCommand(`右侧面板👔`, () => {
                    show = !show
                    wls.setItem(right_container_key, show)
                    scanVideoList()
                    right_video_list_container.style.display = show ? "" : 'none'
                }, { title: '如果你认为右侧视频推荐不想看，点我关闭,默认开启' })


                GM_registerMenuCommand(`视频推荐🎬`, () => {
                    log('click 视频推荐🎬')
                    if (!show && !show_video) {
                        show = !show
                        wls.setItem(right_container_key, show)
                        right_video_list_container.style.display = show ? "" : 'none'
                    }
                    show_video = !show_video
                    scanVideoList()
                    wls.setItem(right_video_list_reco_list_key, show_video)
                    right_video_list_reco_list.style.display = show_video ? "" : 'none'
                }, { title: '如果你认为右侧视频推荐不想看，点我关闭,默认开启' })


                addCommand = true
            }
        }, 20);
        scanVideoList()
    }

}
