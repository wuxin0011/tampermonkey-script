export const isHttp = (url) => /^https?:\/\/.*$/.test(url)
export const isLeetCodeCircleUrl = (url = window.location.href) => /^https?:\/\/leetcode\.cn\/circle\/discuss\/.*/i.test(url)
export const isProblem = (url = window.location.href) => /^https?:\/\/leetcode\.cn\/problems\/.*/i.test(url)
export const isContest = (url = window.location.href) => /^https?:\/\/leetcode\.cn\/contest\/.*\/problems\/.*/.test(url)
export const isBilibili = (url = window.location.href) => /.*bilibili.*/.test(url)
export const sleep = async (time = 500) => new Promise((resolove) => setTimeout(resolove, time))

export const isDev = () => false



