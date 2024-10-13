export const isHttp = (url) => /^https?:\/\/.*$/.test(url)
export const isLeetCodeCircleUrl = (url = window.location.href) => url && url.indexOf('https://leetcode.cn/circle') != -1
export const isProblem = (url = window.location.href) => /^https?:\/\/leetcode.cn\/problems\/.*/i.test(url)
export const isContest = (url = window.location.href) => url.indexOf('https://leetcode.cn/contest/weekly-contest') != -1 || url.indexOf('https://leetcode.cn/contest/biweekly-contest') != -1
export const sleep =  async (time = 500)=>new Promise((resolove)=>setTimeout(resolove,time))

export const isDev = () => true

