---
title: 灵茶题单插件
description: 自动标记题目AC，根据分数、会员等信息显示题目等功能
---



### 前言

**0x3f-problem-solution** 是根据[灵茶山艾府](https://space.bilibili.com/206214) 的 题单而写 ，题单总结很好，可以根据自己目前水准刷题，但是有时候题目过多，或者不想刷某些区间题目，这个时候就可以考虑这个插件了，


[点击讨论发布获取题单吧](https://leetcode.cn/u/endlesscheng/)



### 版本更新
-  隐藏周赛排行榜 (v >= 0.0.1.0)
-  自定义分数区间后可以显示这个区间的题目 (没有分数的题目无法操作) (v >= 0.0.1.0)
-  可根据自己需求显示或者隐藏会员题目 (v >= 0.0.1.0)
-  可以根据自己需要是否在收藏题单链接中显示插件 (v >= 0.0.2.0)
-  标记题目状态 （显示题目是否做过，实时刷新）(v >= 0.0.2.0)
-  题目进度统计 (v >= 0.0.5.0)
-  随机一道灵茶题单中题目 (v >= 0.0.5.2)
-  支持题目链接替换美服以及支持美服题单 (v >= 0.0.5.3)
-  支持屏蔽新UI右侧讨论排行 (v >= 0.0.5.5)
-  支持题目分数显示以及改题目周赛信息 (v >= 0.0.5.8)
-  支持题单重刷和章节部分重刷 (v >= 0.0.5.9)



### 演示

:::danger 请确保使用该插件之前为登录状态 ！
:::

:::tip 同步效果展示 (version >= 0.0.5)
![/0x3f-problem-solution/demo.gif](/0x3f-problem-solution/demo.gif)
:::


::: details 打开面板信息配置
![image.png](https://scriptcat.org/api/v2/resource/image/ZQkTcnkpAMShGlGD)
:::

::: details `ctrl + alt + j` 随机一道题目展示
![/0x3f-problem-solution/demo.gif](/0x3f-problem-solution/random-tea.png)
:::



:::details 题目ac记录标记
![image.png](https://scriptcat.org/api/v2/resource/image/ce3YGVmO085A6oHp)
:::




> 题单重刷


:::tip 章节重刷，截图部分只会删除入门DP部分题目记录
![image.png](https://scriptcat.org/api/v2/resource/image/TJQ7H6dg8Q4aiB1C)
:::

:::tip 全部重刷，最上面tag会有箭头指的两个按钮
![image.png](https://scriptcat.org/api/v2/resource/image/k0L1fY7xZUEBeRq0)
:::


### 安装地址


- [油猴](https://greasyfork.org//zh-CN/scripts/501134-0x3f-problem-solution)
- [油猴镜像](https://gfork.dahi.icu/zh-CN/scripts/501134/)
- [脚本猫](https://scriptcat.org/zh-CN/script-show-page/1967)

### 其他

- [反馈](https://wuxin0011.github.io/tampermonkey-script/plugins/0x3f-problem-solution.html)
- [github](https://github.com/wuxin0011/tampermonkey-script/tree/main/0x3f-leetcode)

### 注意

如果使用了[LeetCodeRating](https://greasyfork.org//zh-CN/scripts/450890-leetcoderating-%E6%98%BE%E7%A4%BA%E5%8A%9B%E6%89%A3%E5%91%A8%E8%B5%9B%E9%9A%BE%E5%BA%A6%E5%88%86)这个插件，可能会与本插件冲突，但是本插件功能更全面，可以再`LeetCodeRating`这个插件的设置**不开启**题目AC功能，这样既能使用 `0x3f-problem-solution` 的题单完整功能，又能看到题目分数