
export function isEnglishENV() {
    return window.location.href.indexOf('https://leetcode.com') != -1
}
export const isHttp = (url) => /^https?:\/\/.*$/.test(url)
export const isLeetCodeCircleUrl = (url = window.location.href) => /^https?:\/\/leetcode\.(com|cn).*\/discuss\/.*/i.test(url)
export const isProblem = (url = window.location.href) => /^https?:\/\/leetcode\.(com|cn)\/problems\/.*/i.test(url)
export const isContest = (url = window.location.href) => /^https?:\/\/leetcode\.(com|cn)\/contest\/.*\/problems\/.*/.test(url)
export const isBilibili = (url = window.location.href) => /.*bilibili.*/.test(url)
export const isHome = () => window.location.href == 'https://leetcode.cn/' || window.location.href == 'https://leetcode.com/'
export const isZH = (url = window.location.href) => /^https?:\/\/leetcode\.cn/.test(url)
export const sleep = async (time = 500) => new Promise((resolove) => setTimeout(resolove, time))
export const EN_URL = 'https://leetcode.com'
export const ZH_URL = 'https://leetcode.cn'
export const LC_COPY_HTML_PLUGIN = 'https://greasyfork.org//zh-CN/scripts/491969-lc-to-markdown-txt-html'
export const EN_SOLUTION_DEMO = 'https://leetcode.com/discuss/interview-question/6032972/leetcode'

export const CUR_URL = isEnglishENV() ? EN_URL : ZH_URL

export const isDev = () => JSON.parse(import.meta.env.VITE_CONSOLE_LOG_DEGUG)



