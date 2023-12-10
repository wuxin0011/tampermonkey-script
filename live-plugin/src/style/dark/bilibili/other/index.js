import { default as account } from './account.bilibili.com'
import { default as app } from './app.bilibili.com'
import { default as game } from './game.bilibili.com'
import { default as link } from './link.bilibili.com'
import { default as message } from './message.bilibili.com'
import { default as Live } from './live.bilibili.com'

//  TODO Live 暂时移除b站直播样式
const other = `
${account}
${app}
${game}
${link}
${message}
`

export default other

