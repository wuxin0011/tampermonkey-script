# 本地使用


## 克隆仓库

```shell
git clone https://github.com/wuxin0011/huya-live

```

## 下载依赖


```shell
pnpm i
```


## 打包


```shell
pnpm build
```



## 安装脚本执行插件

在浏览器商店中搜索下面任意一个即可，点击链接前往

edge
- [暴力猴](https://microsoftedge.microsoft.com/addons/detail/%E6%9A%B4%E5%8A%9B%E7%8C%B4/eeagobfjdenkkddmbclomhiblgggliao?hl=zh-CN)
- [油猴](https://microsoftedge.microsoft.com/addons/detail/tampermonkey-beta/fcmfnpggmnlmfebfghbfnillijihnkoh?hl=zh-CN)



其他浏览器点击这里
- [暴力猴](https://violentmonkey.github.io/)




## 添加脚本

下面以为`edge`浏览器和`油猴`为例

### 打开管理面板

进入管理面板

![新建脚本](./local/create-js-file.png)



### 新建脚本

将下面内容复制
![复制](./local/copy-js-file.png)



```javascript
// ==UserScript==
// @name         live-plugin-dev
// @namespace    https://github.com/wuxin0011/huya-live
// @version      0.0.1
// @author       wuxin0011
// @description  虎牙、斗鱼，哔哩哔哩 页面简化，屏蔽主播,关闭抖音提示登录
// @license      MIT
// @icon         https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/picgo/icon.png
// @source       https://github.com/wuxin0011/huya-live
// @supportURL   https://github.com/wuxin0011/huya-live/issues
// @match        https://www.douyu.com/*
// @match        https://www.huya.com/*
// @match        https://www.bilibili.com/*
// @match        https://www.douyin.com/*
// @match        https://*.douyin.com/*
// @match        https://*.douyu.com/*
// @match        https://*.huya.com/*
// @match        https://*.bilibili.com/*
// @require      file:///D://desktop//github//huya-live/dist/live-plugin.js
// @grant        GM_addStyle
// ==/UserScript==
(function(){
  console.log('将这个文件复制到浏览器油猴脚本中，修改路径 file:///D://desktop//github//huya-live/dist/live-plugin.js 为你本地指向dist/live-plugin.js 这个文件')
  console.log('使用之前打开浏览器本地支持读取磁盘文件 如 edge 浏览器 edge://extensions/?id=fcmfnpggmnlmfebfghbfnillijihnkoh，其他浏览器同理')
  console.log('选择 \"允许访问文件 URL\" 这个选项 ')
})()

```

注意 `@require ` 指向本地`dist/live-plugin.js` 文件，所以路径自己改成自己本地对应就行

想了解更多api ? 点击这里[了解更多相关api](https://violentmonkey.github.io/api/gm/)

ps: `油猴api`基本上和暴力猴差不多，就不重复贴链接了。



### 打开浏览器拓展支持读取本地文件

- [edge://extensions/](edge://extensions/)
- [chrome://extensions/](chrome://extensions/)

![编辑](./local/open-local-url-support.png)
![编辑](./local/open-local-url-support1.png)




后面差不多就是自己爱怎么改就怎么改了，不要忘了`build`才能生效    



# 相关链接

- [vite](https://vitejs.dev/)
- [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey)
