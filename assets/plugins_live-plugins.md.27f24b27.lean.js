import{_ as l,o as i,c as a,e as r}from"./app.3efee678.js";const t="/tampermonkey-script/live-plugin/huya-demo-0.gif",s="/tampermonkey-script/live-plugin/huya-demo-1.gif",n="/tampermonkey-script/live-plugin/bilibili-demo-1.gif",d="/tampermonkey-script/live-plugin/bilibili-demo-2.gif",h="/tampermonkey-script/live-plugin/huya-live-0.png",c="/tampermonkey-script/live-plugin/huya-live-1.png",o="/tampermonkey-script/live-plugin/huya-live-2.png",p="/tampermonkey-script/live-plugin/huya-live-3.png",u="/tampermonkey-script/live-plugin/huya-dark-1.png",m="/tampermonkey-script/live-plugin/huya-dark-2.png",g="/tampermonkey-script/live-plugin/bilibili-dark-1.png",k="/tampermonkey-script/live-plugin/bilibili-dark-2.png",B=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"关于广告","slug":"关于广告","link":"#关于广告","children":[]},{"level":2,"title":"详情","slug":"详情","link":"#详情","children":[{"level":3,"title":"屏蔽直播间","slug":"屏蔽直播间","link":"#屏蔽直播间","children":[]},{"level":3,"title":"🎦自定义直播背景 图片","slug":"🎦自定义直播背景-图片","link":"#🎦自定义直播背景-图片","children":[]},{"level":3,"title":"📺画面精简","slug":"📺画面精简","link":"#📺画面精简","children":[]},{"level":3,"title":"🧱黑夜主题模式","slug":"🧱黑夜主题模式","link":"#🧱黑夜主题模式","children":[]},{"level":3,"title":"😁其他","slug":"😁其他","link":"#😁其他","children":[]}]},{"level":2,"title":"效果预览","slug":"效果预览","link":"#效果预览","children":[{"level":3,"title":"动态演示","slug":"动态演示","link":"#动态演示","children":[]},{"level":3,"title":"普通展示","slug":"普通展示","link":"#普通展示","children":[]},{"level":3,"title":"暗黑主题","slug":"暗黑主题","link":"#暗黑主题","children":[]}]},{"level":2,"title":"相关问题","slug":"相关问题","link":"#相关问题","children":[{"level":3,"title":"👴屏蔽直播间为什么还有声音？","slug":"👴屏蔽直播间为什么还有声音","link":"#👴屏蔽直播间为什么还有声音","children":[]},{"level":3,"title":"💔为什么不支持网络图片作为背景图","slug":"💔为什么不支持网络图片作为背景图","link":"#💔为什么不支持网络图片作为背景图","children":[]},{"level":3,"title":"🐟为什么斗鱼一些直播间刚进入时候，会出现小窗口？","slug":"🐟为什么斗鱼一些直播间刚进入时候-会出现小窗口","link":"#🐟为什么斗鱼一些直播间刚进入时候-会出现小窗口","children":[]},{"level":3,"title":"为什么会有广告？","slug":"为什么会有广告","link":"#为什么会有广告","children":[]},{"level":3,"title":"😙更多","slug":"😙更多","link":"#😙更多","children":[]}]},{"level":2,"title":"安装地址","slug":"安装地址","link":"#安装地址","children":[]},{"level":2,"title":"建议反馈","slug":"建议反馈","link":"#建议反馈","children":[]}],"relativePath":"plugins/live-plugins.md","lastUpdated":1728466729000}'),b={name:"plugins/live-plugins.md"};function f(v,e,_,y,x,E){return i(),a("div",null,e[0]||(e[0]=[r('<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-hidden="true">#</a></h2><p>最近无聊看直播，虎牙广告是真多，<s><strong>ghs直播间更是泛滥</strong></s>，不想看到这些直播间,于是想屏蔽，<a href="https://greasyfork.org/" target="_blank" rel="noreferrer">greasyfork</a>倒是找到许多直播间简化的插件，不过好像没有屏蔽直播间功能。于是自己弄了一个。</p><h2 id="关于广告" tabindex="-1">关于广告 <a class="header-anchor" href="#关于广告" aria-hidden="true">#</a></h2><p>本人使用了edge浏览器的广告插件,这个插件非常好用，点击前往安装 <a href="https://microsoftedge.microsoft.com/addons/detail/adguard-%E5%B9%BF%E5%91%8A%E6%8B%A6%E6%88%AA%E5%99%A8/pdffkfellgipmhklpdmokmckkkfcopbh?hl=zh-CN" target="_blank" rel="noreferrer">adguard</a>，所以可能和大家直播界面有些不一样，如果暂时还是有广告欢迎反馈，有时间第一时间更新!</p><h2 id="详情" tabindex="-1">详情 <a class="header-anchor" href="#详情" aria-hidden="true">#</a></h2><p><strong>目前支持操作:</strong></p><h3 id="屏蔽直播间" tabindex="-1">屏蔽直播间 <a class="header-anchor" href="#屏蔽直播间" aria-hidden="true">#</a></h3><ul><li>通过手动添加房间号</li><li>通过点击直播间名称</li><li>输入框支持模糊搜索，输入<strong>关键词</strong>，删除想解禁的直播间</li></ul><h3 id="🎦自定义直播背景-图片" tabindex="-1">🎦自定义直播背景 图片 <a class="header-anchor" href="#🎦自定义直播背景-图片" aria-hidden="true">#</a></h3><ul><li>勾选开启直播背景，点击上传按钮，选择你喜欢的一张背景图，作为直播界面背景图</li><li>取消勾选，可以关闭背景</li></ul><h3 id="📺画面精简" tabindex="-1">📺画面精简 <a class="header-anchor" href="#📺画面精简" aria-hidden="true">#</a></h3><ul><li>目前删除大部分等级，礼物，聊天等，不过随着直播软件更新，可能会导致一些样式失效</li><li>删除了画面中其他无关紧要的链接等，让用户只关心主播直播内容</li></ul><h3 id="🧱黑夜主题模式" tabindex="-1">🧱黑夜主题模式 <a class="header-anchor" href="#🧱黑夜主题模式" aria-hidden="true">#</a></h3><ul><li>目前增加了护眼模式（黑色主题），目前适配平台为虎牙，斗鱼，bilibili ！</li></ul><h3 id="😁其他" tabindex="-1">😁其他 <a class="header-anchor" href="#😁其他" aria-hidden="true">#</a></h3><ul><li>logo按钮支持拖拽，隐藏</li></ul><h2 id="效果预览" tabindex="-1">效果预览 <a class="header-anchor" href="#效果预览" aria-hidden="true">#</a></h2><h3 id="动态演示" tabindex="-1">动态演示 <a class="header-anchor" href="#动态演示" aria-hidden="true">#</a></h3><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>虎牙直播演示</p></div><p><img src="'+t+'" alt="虎牙直播动态演示1"></p><p><img src="'+s+'" alt="虎牙直播动态演示2"></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>b站演示</p></div><p><img src="'+n+'" alt="bilibili动态演示1"></p><p><img src="'+d+'" alt="bilibili动态演示2"></p><h3 id="普通展示" tabindex="-1">普通展示 <a class="header-anchor" href="#普通展示" aria-hidden="true">#</a></h3><details class="details custom-block"><summary>点击查看演示</summary><p><img src="'+h+'" alt="页面演示"></p></details><details class="details custom-block"><summary>点击查看演示</summary><p><img src="'+c+'" alt="点击主播名称可屏蔽"></p></details><details class="details custom-block"><summary>点击查看演示</summary><p><img src="'+o+'" alt="显示Logo面板"></p></details><details class="details custom-block"><summary>点击查看演示</summary><p><img src="'+p+'" alt="直播界面演示"></p></details><h3 id="暗黑主题" tabindex="-1">暗黑主题 <a class="header-anchor" href="#暗黑主题" aria-hidden="true">#</a></h3><div class="info custom-block"><p class="custom-block-title">虎牙暗黑主题演示</p></div><p><img src="'+u+'" alt="虎牙暗黑主题演示1"></p><p><img src="'+m+'" alt="虎牙暗黑主题演示2"></p><div class="info custom-block"><p class="custom-block-title">B站暗黑主题演示</p></div><p><img src="'+g+'" alt="b站暗黑主题演示1"></p><p><img src="'+k+'" alt="b站暗黑主题演示2"></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>斗鱼平台差不多也是这样，就不展示了</p></div><h2 id="相关问题" tabindex="-1">相关问题 <a class="header-anchor" href="#相关问题" aria-hidden="true">#</a></h2><h3 id="👴屏蔽直播间为什么还有声音" tabindex="-1">👴屏蔽直播间为什么还有声音？ <a class="header-anchor" href="#👴屏蔽直播间为什么还有声音" aria-hidden="true">#</a></h3><ul><li>这个不是我的问题，是因为直播间会不断自动刷新，导致之前屏蔽元素失效</li></ul><h3 id="💔为什么不支持网络图片作为背景图" tabindex="-1">💔为什么不支持网络图片作为背景图 <a class="header-anchor" href="#💔为什么不支持网络图片作为背景图" aria-hidden="true">#</a></h3><ul><li>目前该插件支持虎牙、斗鱼直播，但是通过引用网络图片作为背景图，会产生<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS" target="_blank" rel="noreferrer">跨域</a>问题， 试过很多方式，没有解决，目前只支持本地图片转换到浏览器中</li></ul><h3 id="🐟为什么斗鱼一些直播间刚进入时候-会出现小窗口" tabindex="-1">🐟为什么斗鱼一些直播间刚进入时候，会出现小窗口？ <a class="header-anchor" href="#🐟为什么斗鱼一些直播间刚进入时候-会出现小窗口" aria-hidden="true">#</a></h3><ul><li>由于删除了直播间一些元素，导致自动出现小窗口，不过目前是采用延迟自动点击关闭，这个不是最佳方案，后续会找时间处理这个问题（希望是我能够想起来🚹）。</li></ul><h3 id="为什么会有广告" tabindex="-1">为什么会有广告？ <a class="header-anchor" href="#为什么会有广告" aria-hidden="true">#</a></h3><ul><li>第一个是本人安装了浏览器的去除广告插件，看到和用户不一样，如果你想你的浏览器十分干净，点击安装 <a href="https://microsoftedge.microsoft.com/addons/detail/adguard-%E5%B9%BF%E5%91%8A%E6%8B%A6%E6%88%AA%E5%99%A8/pdffkfellgipmhklpdmokmckkkfcopbh?hl=zh-CN" target="_blank" rel="noreferrer">adguard</a></li><li>第二个是直播平台广告实在是太多了，更新很频繁，导致之前代码失效</li></ul><h3 id="😙更多" tabindex="-1">😙更多 <a class="header-anchor" href="#😙更多" aria-hidden="true">#</a></h3><ul><li>目前只能想起这么多了，其他问题还是有的，所以需要用户的建议！如果您有更多建议，请点击插件，<strong>更新链接</strong>，留言您的问题！</li></ul><h2 id="安装地址" tabindex="-1">安装地址 <a class="header-anchor" href="#安装地址" aria-hidden="true">#</a></h2><ul><li><a href="https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD" target="_blank" rel="noreferrer">油猴地址</a></li><li><a href="https://scriptcat.org/zh-CN/script-show-page/1679" target="_blank" rel="noreferrer">脚本猫地址</a></li></ul><h2 id="建议反馈" tabindex="-1">建议反馈 <a class="header-anchor" href="#建议反馈" aria-hidden="true">#</a></h2><ul><li><a href="https://github.com/wuxin0011/tampermonkey-script/issues" target="_blank" rel="noreferrer">更多建议</a></li></ul>',52)]))}const N=l(b,[["render",f]]);export{B as __pageData,N as default};