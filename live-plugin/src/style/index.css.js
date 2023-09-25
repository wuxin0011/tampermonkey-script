import { addStyle } from '../utils/index.js';
import fishCss from './fish.css.js'
import triggerCss from './trigger.css.js'
import douyinCss from './douyin.css.js'
import bilibiliCss from './bilibili.css.js'
import rootDark from './dark/root.dark'

// 样式部分
addStyle(
  `
${rootDark}
${fishCss}
${triggerCss}
${bilibiliCss}
${douyinCss}
`
)




