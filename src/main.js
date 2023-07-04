import {
    is_localhost,
    is_huya,
    is_douyu,
    is_bilibili,
    log,
    querySelector,
    querySelectorAll,
    source_code_url,
    download_plugin_url
} from './utils'


import {
    LivePlugin,
    BiliBili,
    FishLive,
    TriggerLive,
} from './plugins'

import './style/index.css.js'

window.onload = ()=>{
    (function () {
        'use strict';
        if (typeof window === undefined) {
            log("插件不支持！")
            return;
        }
        try {
            let text = '%c欢迎使用直播插件,下载地址%c'
            if (!is_localhost) {
                console.clear()
            }
            console.log(
                text
                    .concat(download_plugin_url, ''),
                'background: rgb(255, 93, 35); padding: 1px; border-radius: 3px 0 0 3px; color: #fff',
                'border-radius: 0 3px 3px 0; color: #fff')
            console.log(
                '%c源码地址:%c '
                    .concat(source_code_url, ''),
                'background: rgb(255, 93, 35); padding: 1px; border-radius: 3px 0 0 3px; color: #fff',
                'border-radius: 0 3px 3px 0; color: #fff')
            if (querySelector && querySelectorAll) {
                //插件执行入口
                if (is_huya) {
                    // 执行虎牙直播插件
                    new TriggerLive()
                } else if (is_douyu) {
                    // 执行斗鱼直播插件
                    new FishLive()
                } else if (is_bilibili) {
                    // 执行bilibili直播插件
                    new BiliBili()
                } else if (is_localhost) {
                    // 本地测试使用
                    new LivePlugin()
                } else {
                    log('插件地址不适配，请检查匹配地址！！！', 'error')
                }
            } else {
                log('请使用新版浏览器，该插件不支持！', 'error')
            }

        } catch (e) {
            log(e, 'error')
        }

    })()

}

