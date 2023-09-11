import {
    getLocalStore, isArray,
    log, loopDo,
    querySelector, querySelectorAll, setTimeoutMark, timeoutSelectorAll, warn
} from '../../utils';

import LivePlugin from "../live";

/**
 *  douyin
 */
export default class DouYin extends LivePlugin {
    constructor() {
        super()
        this.header_logo = '#root .N_HNXA04 .HQwsRJFy a'
        this.full_screen_class_or_id = '.xgplayer-page-full-screen .xgplayer-icon'
        this.full_button_tag_name = 'div'
        this.full_screen_text = '进入全屏'
        this.full_cancel_text = '退出全屏'
        this.auto_max_pro_class_or_id_list = '#slidelist .gear .virtual>.item'
        this.init()
    }

    removeRoomByClickRoomName() {
        this.notSupport()
    }


    getNameByRoomId(roomId) {
        return this.notSupport()
    }


    getRoomIdByUrl(url) {
        return this.notSupport()
    }


    notSupport() {
        log('抖音暂时不支持该操作！')
        return null
    }


    common() {
        this.isFullScreen()
        this.isAutoMaxVideoPro()
    }


}
