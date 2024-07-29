
## 前言 

为什么写这个插件 ？

1. 在一次周赛结束看[灵佬](https://leetcode.cn/u/endlesscheng/)直播，说过希望力扣出个题单题目是否`AC` 功能 ，等到力扣出估计要到猴年马月🤣(开玩笑的，希望力扣别打我)

2. 在力扣刷题小伙伴或多或少使用过以下`插件`或`网站`
   - [LeetCodeRating](https://github.com/zhang-wangz/LeetCodeRating)
   - [refined-leetcode](https://github.com/XYShaoKang/refined-leetcode)
   - [leetcode_problem_rating](https://zerotrac.github.io/leetcode_problem_rating/#/)  
   - [lc-rating](https://huxulm.github.io/lc-rating/)  
   - [lccn.lbao.site](https://lccn.lbao.site/)
     第三方插件这么多, 社区也蛮活跃的，感谢大佬们的贡献，但目前没有灵佬说的这个需求插件，这个功能实现起来也简单，我也尽一点微薄之力,上周其实就发布了，但是测试阶段有些bug😥
   
3. 最后为了感谢灵佬，插件命名为 [0x3f-problem-solution](https://greasyfork.org/zh-CN/scripts/501134-0x3f-problem-solution) 
   
## 功能介绍


> 主要功能:标记题目是否AC


![image.png](https://pic.leetcode.cn/1722003843-HDQbur-image.png){:width=400}

ps : 绿色表示AC题目，黄色表示尝试过

### 其他功能

上面单个功能可能太单一，因此补充了其他功能

![image.png](https://pic.leetcode.cn/1722003936-MFQfbt-image.png){:width=400}

截图就见名之意文字就不用描述了……

效果预览

![image.png](https://pic.leetcode.cn/1722004004-esAAox-image.png){:width=400}


如果不想显示按钮可以在这里关闭哦


![image.png](https://pic.leetcode.cn/1722004120-LrwLne-image.png){:width=400}



## 问题

> 1、 查询题目状态过多是否会被力扣封号 ？ 

对于首次访问题单中题目，所有状态只会查询一次，然后缓存在本地。其次是在提交时候重新查询一次 ，这个并发量并不高 ，不会有什么问题


## 更多插件

- [lc-to-markdown-txt-html](https://greasyfork.org/zh-CN/scripts/491969-lc-to-markdown-txt-html)