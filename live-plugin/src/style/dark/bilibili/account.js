
import commonDark from "./common/common-dark"
const isAccaout = window.location.href.indexOf('https://www.bilibili.com/account') !== -1 || window.location.href.indexOf('https://www.bilibili.com/v/customer-service') !== -1

const dark = isAccaout ? `
${commonDark}
`
  :
  ``

export default dark


