# 前言

最近无聊看直播，虎牙广告是真多，~~**ghs直播间更是泛滥**~~，不想看到这些直播间,于是想屏蔽，[greasyfork](https://greasyfork.org/)倒是找到许多直播间简化的插件，不过好像没有屏蔽直播间功能。于是自己弄了一个。

# 关于直播间广告

本人使用了edge浏览器的广告插件,这个插件非常好用，点击前往安装 [adguard](https://microsoftedge.microsoft.com/addons/detail/adguard-%E5%B9%BF%E5%91%8A%E6%8B%A6%E6%88%AA%E5%99%A8/pdffkfellgipmhklpdmokmckkkfcopbh?hl=zh-CN)，所以可能和大家直播界面有些不一样，如果暂时还是有广告欢迎反馈，有时间第一时间更新!

# 内容

**目前支持操作:**

1. 🏠屏蔽或者删除已屏蔽直播间 

     - 通过手动添加房间号

     - 通过点击直播间名称 

     - 输入框支持模糊搜索，输入**关键词**，删除想解禁的直播间

2. 🎦自定义直播背景 图片

     - 勾选开启直播背景，点击上传按钮，选择你喜欢的一张背景图，作为直播界面背景图 

     - 取消勾选，可以关闭背景

3. 📺画面精简

     - 目前删除大部分等级，礼物，聊天等，不过随着直播软件更新，可能会导致一些样式失效

     - 删除了画面中其他无关紧要的链接等，让用户只关心主播直播内容

4. 😁其他
     - logo按钮支持拖拽，隐藏


**目前问题:**

1. 👴屏蔽直播间为什么还有声音？
     - 这个不是我的问题，是因为直播间会不断自动刷新，导致之前屏蔽元素失效

2. 💔为什么不支持网络图片作为背景图
     - 目前该插件支持虎牙、斗鱼直播，但是通过引用网络图片作为背景图，会产生**[跨域](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)**，
       试过很多方式，没有解决，目前只支持本地图片转换到浏览器中

3. 🐟为什么斗鱼一些直播间刚进入时候，会出现小窗口？
     - 由于删除了直播间一些元素，导致自动出现小窗口，不过目前是采用延迟自动点击关闭，这个不是最佳方案，后续会找时间处理这个问题（希望是我能够想起来🚹）。

4. 为什么会有广告？

     - 第一个是本人安装了浏览器的去除广告插件，看到和用户不一样，如果你想你的浏览器十分干净，点击安装 [adguard](https://microsoftedge.microsoft.com/addons/detail/adguard-%E5%B9%BF%E5%91%8A%E6%8B%A6%E6%88%AA%E5%99%A8/pdffkfellgipmhklpdmokmckkkfcopbh?hl=zh-CN)

     - 第二个是直播平台广告实在是太多了，更新很频繁，导致之前代码失效

5. 😙更多
     - 目前只能想起这么多了，其他问题还是有的，所以需要用户的建议！如果您有更多建议，请点击插件，**更新链接**，留言您的问题！
       


# ❤地址:

- [插件地址](https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD)
- [源码地址](https://github.com/wuxin0011/huya-live)


# 效果预览

## 虎牙直播

![虎牙直播屏蔽1](https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/live-plugin/1.png)

![虎牙直播屏蔽2](https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/live-plugin/2.png)

![虎牙直播效果1](https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/live-plugin/3.png)

![虎牙直播效果2](https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/live-plugin/4.png)

![虎牙直播屏蔽](https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/live-plugin/5.png)

![点击logo可以显示操作框](https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/bem/huya-logo-click.png)

## 斗鱼直播

![斗鱼直播分类页](https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/live-plugin/6.png)

![斗鱼直播播放页](https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/live-plugin/7.png)

![斗鱼直播屏蔽效果](https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/live-plugin/8.png)

![斗鱼直播自定义背景](https://cdn.staticaly.com/gh/wuxin0011/blog-resource@main/live-plugin/9.png)
