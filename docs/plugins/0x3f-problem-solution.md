---
title: 灵茶题单插件
description: 自动标记题目AC，根据分数、会员等信息显示题目等功能
---



### 前言

**0x3f-problem-solution** 是根据[灵茶山艾府](https://space.bilibili.com/206214) 的 题单而写 ，题单总结很好，可以根据自己目前水准刷题，但是有时候题目过多，或者不想刷某些区间题目，这个时候就可以考虑这个插件了，


[点击讨论发布获取题单吧](https://leetcode.cn/u/endlesscheng/)



###  基本功能

-  自定义分数区间后可以显示这个区间的题目 (没有分数的题目无法操作)
-  可根据自己需求显示或者隐藏会员题目
-  可以根据自己需要是否在收藏题单链接中显示插件
-  标记题目状态 （显示题目是否做过，实时刷新）
-  隐藏周赛排行榜
-  随机一道灵茶题单中题目（ctrl + alt + j 可以触发也可以在配置中关闭）


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





:::tip 题目ac记录标记
![image.png](https://scriptcat.org/api/v2/resource/image/ce3YGVmO085A6oHp)
:::




### 安装地址


- [油猴](https://cn-greasyfork.org/zh-CN/scripts/501134-0x3f-problem-solution)
- [脚本猫](https://scriptcat.org/zh-CN/script-show-page/1967)

### 其他

- [反馈](https://wuxin0011.github.io/tampermonkey-script/plugins/0x3f-problem-solution.html)
- [github](https://github.com/wuxin0011/tampermonkey-script/tree/main/0x3f-leetcode)



### 注意

如果使用了[LeetCodeRating](https://cn-greasyfork.org/zh-CN/scripts/450890-leetcoderating-%E6%98%BE%E7%A4%BA%E5%8A%9B%E6%89%A3%E5%91%A8%E8%B5%9B%E9%9A%BE%E5%BA%A6%E5%88%86)这个插件，可能会与本插件冲突，但是本插件功能更全面，可以再`LeetCodeRating`这个插件的设置**不开启**题目AC功能，这样既能使用 `0x3f-problem-solution` 的题单完整功能，又能看到题目分数