import {
    download_plugin_url,
    error,
    is_exculues,
    is_bilibili,
    is_douyin,
    is_douyu,
    is_huya,
    is_localhost,
    source_code_url
} from './utils';


import {
    BiliBili,
    DouYin,
    FishLive,
    LivePlugin,
    TriggerLive
} from './plugins';


import { LivePluginElement } from '@/ui'



import { updateDarkClass } from './hook/useTheme';

import './style/index.css.js';


(function () {
    'use strict';

    if (typeof window == 'undefined') {
        return;
    }

    // 注册自定义组件
    customElements.define('live-plugin-element', LivePluginElement);

    if (is_exculues) {
        console.warn('当前地址不支持！')
        return;
    }


    try {
        let text = '%c欢迎使用直播插件,下载地址%c'
        if (!is_localhost) {
            console.clear()
        }
        console.log(
            text.concat(download_plugin_url, ''),
            'background: rgb(255, 93, 35); padding: 1px; border-radius: 3px 0 0 3px; color: #fff',
            'border-radius: 0 3px 3px 0; color: #fff')
        console.log(
            '%c地址:%c '.concat(source_code_url, ''),
            'background: rgb(255, 93, 35); padding: 1px; border-radius: 3px 0 0 3px; color: #fff',
            'border-radius: 0 3px 3px 0; color: #fff')
        //插件执行入口

        updateDarkClass()


        if (is_huya) {
            // 执行虎牙直播插件
            new TriggerLive()
        } else if (is_douyu) {
            // 执行斗鱼直播插件
            new FishLive()
        } else if (is_bilibili) {
            // 执行bilibili直播插件
            new BiliBili()
        } else if (is_douyin) {
            // douyin
            new DouYin()
        } else if (is_localhost) {
            // 本地测试使用
            new LivePlugin()
        } else {
            error('插件地址不适配，请检查匹配地址！！！')
        }
    } catch (e) {
        error(e)
    }

})()


