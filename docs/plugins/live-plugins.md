## 前言

最近无聊看直播，虎牙广告是真多，~~**ghs直播间更是泛滥**~~，不想看到这些直播间,于是想屏蔽，[greasyfork](https://greasyfork.org/)倒是找到许多直播间简化的插件，不过好像没有屏蔽直播间功能。于是自己弄了一个。

## 关于广告

本人使用了edge浏览器的广告插件,这个插件非常好用，点击前往安装 [adguard](https://microsoftedge.microsoft.com/addons/detail/adguard-%E5%B9%BF%E5%91%8A%E6%8B%A6%E6%88%AA%E5%99%A8/pdffkfellgipmhklpdmokmckkkfcopbh?hl=zh-CN)，所以可能和大家直播界面有些不一样，如果暂时还是有广告欢迎反馈，有时间第一时间更新!







## 详情

**目前支持操作:**

### 屏蔽直播间

  - 通过手动添加房间号
  - 通过点击直播间名称 
  - 输入框支持模糊搜索，输入**关键词**，删除想解禁的直播间

### 🎦自定义直播背景 图片
  - 勾选开启直播背景，点击上传按钮，选择你喜欢的一张背景图，作为直播界面背景图 
  - 取消勾选，可以关闭背景

### 📺画面精简
  - 目前删除大部分等级，礼物，聊天等，不过随着直播软件更新，可能会导致一些样式失效
  - 删除了画面中其他无关紧要的链接等，让用户只关心主播直播内容

###  🧱黑夜主题模式
  - 目前增加了护眼模式（黑色主题），目前适配平台为虎牙，斗鱼，bilibili ！

### 😁其他
   - logo按钮支持拖拽，隐藏










## 效果预览





### 动态演示

::: tip 

虎牙直播演示

:::



![虎牙直播动态演示1](/live-plugin/huya-demo-0.gif)


![虎牙直播动态演示2](/live-plugin/huya-demo-1.gif)



::: tip 

b站演示

:::


![bilibili动态演示1](/live-plugin/bilibili-demo-1.gif)


![bilibili动态演示2](/live-plugin/bilibili-demo-2.gif)





### 普通展示


::: details 点击查看演示
![页面演示](/live-plugin/huya-live-0.png)
:::

::: details 点击查看演示
![点击主播名称可屏蔽](/live-plugin/huya-live-1.png)
:::


::: details 点击查看演示
![显示Logo面板](/live-plugin/huya-live-2.png)
:::


::: details 点击查看演示
![直播界面演示](/live-plugin/huya-live-3.png)
:::







### 暗黑主题



::: info 虎牙暗黑主题演示

:::


![虎牙暗黑主题演示1](/live-plugin/huya-dark-1.png)

![虎牙暗黑主题演示2](/live-plugin/huya-dark-2.png)


::: info B站暗黑主题演示

:::

![b站暗黑主题演示1](/live-plugin/bilibili-dark-1.png)

![b站暗黑主题演示2](/live-plugin/bilibili-dark-2.png)



::: tip 

斗鱼平台差不多也是这样，就不展示了

:::



## 相关问题

###  👴屏蔽直播间为什么还有声音？
  - 这个不是我的问题，是因为直播间会不断自动刷新，导致之前屏蔽元素失效

### 💔为什么不支持网络图片作为背景图
  - 目前该插件支持虎牙、斗鱼直播，但是通过引用网络图片作为背景图，会产生[跨域](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)问题，
    试过很多方式，没有解决，目前只支持本地图片转换到浏览器中

### 🐟为什么斗鱼一些直播间刚进入时候，会出现小窗口？
  - 由于删除了直播间一些元素，导致自动出现小窗口，不过目前是采用延迟自动点击关闭，这个不是最佳方案，后续会找时间处理这个问题（希望是我能够想起来🚹）。

###  为什么会有广告？
  - 第一个是本人安装了浏览器的去除广告插件，看到和用户不一样，如果你想你的浏览器十分干净，点击安装 [adguard](https://microsoftedge.microsoft.com/addons/detail/adguard-%E5%B9%BF%E5%91%8A%E6%8B%A6%E6%88%AA%E5%99%A8/pdffkfellgipmhklpdmokmckkkfcopbh?hl=zh-CN)
  - 第二个是直播平台广告实在是太多了，更新很频繁，导致之前代码失效

### 😙更多
  - 目前只能想起这么多了，其他问题还是有的，所以需要用户的建议！如果您有更多建议，请点击插件，**更新链接**，留言您的问题！
    


## 安装地址


- [油猴地址](https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD)
- [脚本猫地址](https://scriptcat.org/zh-CN/script-show-page/1679)


## 建议反馈

- [更多建议](https://github.com/wuxin0011/tampermonkey-script/issues)