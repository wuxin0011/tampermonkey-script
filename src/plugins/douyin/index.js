import {
    querySelector
} from '../../utils';

import LivePlugin from "../live/index.js";
/**
 *  douyin
 */
export default class DouYin extends LivePlugin {
    constructor() {
        super()
        this.init()
    }
    // 覆盖默认方法
    init() {
        this.common()
    }
    // 公共部分页面操作
    common() {
        this.audoFullScreen()
    }
    // 自动全屏
    audoFullScreen() {
        let fullButton = querySelector('.xgplayer-page-full-screen .xgplayer-icon')
        if (fullButton) {
            fullButton.click()
        }
    }
}
