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
import Login from './login'

import './style/index.css.js';


(function () {
    'use strict';

    if (typeof window == 'undefined') {
        return;
    }
    if (is_exculues) {
        return;
    }

    if (window?.LivePluginLoadingComplate) {
        return;
    }

    if (!is_localhost) {
        // console.clear()
    }

    // 注册自定义组件
    customElements.define('live-plugin-element', LivePluginElement);

    try {
        Login()
        updateDarkClass()
    } catch (error) {
        console.error('live-plugin:', error)
    }

    try {
        let pluginSupport = true
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
        } else if (is_douyin) {
            // douyin
            new DouYin()
        } else if (is_localhost) {
            // 本地测试使用
            new LivePlugin()
        } else {
            pluginSupport = false
            error('插件地址不适配，请检查匹配地址！！！')
        }
        if (pluginSupport) {
            console.log(
                '%c%s%c%s',
                'background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%); padding: 2px;  border-radius: 20px 0 0 20px; color: #fff;font-size:12px;',
                `欢迎使用live-plugin 下载地址:`,
                'background-image: linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%); padding: 2px; border-radius: 0 20px 20px 0; color: #fff;font-size:12px;',
                download_plugin_url,
            )
            console.log(
                '%c%s%c%s',
                ' background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%);padding: 2px; border-radius: 20px 0 0 20px; color: #fff;font-size:16px;',
                `源码地址:`,
                'background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%); padding: 2px; border-radius: 0 20px 20px 0; color: #fff;font-size:16px;',
                source_code_url,
            )

        }

    } catch (e) {
        error(e)
    }
    window.LivePluginLoadingComplate = true
})()

// NoLogin
import './login/index'

