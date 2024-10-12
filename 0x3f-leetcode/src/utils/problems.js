import Cache from './cache'
import { isContest, isDev, isLeetCodeCircleUrl, isProblem } from './index'
import { createStatus } from './status'
import { getProblemsJSON } from '../api/index'
import { ElMessage } from 'element-plus'

const inf = 4000  // 目前最大分数为3100
const mi = 1000   // 目前最小分数为1100 


export const __0X3F_PROBLEM_KEYS__ = {
    '__0x3f_problmes_solution__': '__0x3f_problmes_solution__', // 基本信息
    '__0x3f_problmes_urls__': '__0x3f_problmes_urls__', // 题单key
    '__0x3f_problmes_update__': '__0x3f_problmes_update__', // 是否修改了默认题单key
    '__0x3f_problmes_button_is_none__': '__is_none_0x3f_problmes_button__', // 是否隐藏设置按钮
    '__0x3f_problmes_insert_pos__': '__0x3f_problmes_insert_pos__', // 安装位置
    '__0x3f_problmes_status_update__': '__0x3f_problmes_status_update__',
    '__0x3f_problmes_plugin_load_ok__': '__0x3f_problmes_plugin_load_ok__', // 是否使用插件
    '__0x3f_problmes_add_cur__': '__0x3f_problmes_add_cur__', // 添加 url
    '__0x3f_problmes_ac_key__': '__local_ok_problem_key__', // ac key
    '__0x3f_problmes_ac_version__': '__0x3f_problmes_ac_version__', // TODO ac key version
    '__0x3f_problmes_all_problems__': '__0x3f_problmes_all_problems__', // all problems
    '__0x3f_problmes_random_problems_key__': '__0x3f_problmes_random_problems_key__', //随机题目快捷键
    '__0x3f_problmes_random_problems__': '__0x3f_problmes_random_problems__', //随机题目
}

export const STATUS = {
    "AC": "ac",
    "NO": "null",
    "notac": "notac",
}



export const defaultObj = {
    min: mi, max: inf, visiableMember: true, onlyUrls: false, useDefaultSetting: true, hiddenAc: false, showAcConfig: true
}


export function install_pos() {
    // 默认安装到左边
    return !Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_insert_pos__'], false, Boolean.name)
}
function isShow(text, min, max) {
    if (!text) {
        return true
    }
    let res = text.match(/\d+/ig)
    // 没有匹配到显示
    if (!res) {
        return true
    }
    if (Array.isArray(res) && res.length < 2) {
        return true
    }
    let s = 0
    for (let i = res.length - 1; i >= 0; i--) {
        s = res[i]
        // 匹配第一个可能是分数的数字
        if (s >= mi && s <= inf) {
            return s >= min && s <= max
        }
    }
    return true

}

let A = undefined
const linkCssSelector = `#lc-content [class*="CollapsibleMarkdownContent"] [class*="MarkdownContent"] li>a`
// document.querySelectorAll('#lc-content [class*="CollapsibleMarkdownContent"] [class$="MarkdownContent"]')

export const queryProblem = () => Array.from(document.querySelectorAll(linkCssSelector)).filter(item => item && item instanceof HTMLAnchorElement && isProblem(item.href))

function loadProblems() {
    A = queryProblem()
    return A
}


export function handlerProblem(data) {

    try {
        loadProblems()
        let { min, max, visiableMember, useDefaultSetting, onlyUrls, hiddenAc } = data

        if (isNaN(min) || isNaN(max)) {
            min = mi
            max = inf
        }
        if (min < mi) {
            min = mi
        }
        if (max < min) {
            max = inf
        }
        min = Number(min)
        max = Number(max)
        data.min = min
        data.max = max
        Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_solution__'], data)
        for (let i = 0; i < A.length; i++) {
            if (!(A[i] instanceof HTMLAnchorElement)) {
                continue;
            }
            let d = A[i]?.parentNode
            if (!d) {
                continue
            }
            let none = false;
            // console.log('d', A[i], A[i]?.parentNode)
            let Nohidden = isShow(d.textContent, min, max)
            // console.log("flag", flag)
            d.style.display = Nohidden ? '' : 'none'
            if (!Nohidden) {
                continue;
            }
            if (hiddenAc) {
                const svg = d.querySelector('svg')
                if (svg && svg.getAttribute('status')) {
                    d.style.display = svg.getAttribute('status') == STATUS['AC'] ? 'none' : ''
                }
            } else {
                d.style.display = ''
            }
            //console.log('>>>>>>>>>>会员题:', d.textContent)
            let c = d.textContent && d.textContent.indexOf('会员') != -1
            if (!c) {
                continue
            }
            d.style.display = visiableMember ? '' : 'none'
        }
    } catch (e) {
        console.log('error', e)

    }


}


export function computeAcInfo(saveUrls = [], deleteOk = true) {
    let infos = []
    // console.log('saveUrls', saveUrls)
    for (let i = 0, u = null; Array.isArray(saveUrls) && i < saveUrls.length; i++) {
        try {
            u = saveUrls[i]
            if (u['select'] == undefined) u.select = true
            if (u['title'] == undefined || u['link'] == undefined) continue
            if (u['loading'] == undefined || u['loading']) u['loading'] = false
            let s = Object.values(u).join('')
            if (s == 'null' || !Cache.get(u.link) || !getAcCountKey(u.link) || !Cache.get(getAcCountKey(u.link))) {
                continue
            }
            let o = Cache.get(getAcCountKey(u.link))
            u['ac'] = isNaN(o['ac']) ? 0 : parseInt(o['ac'])
            u['tot'] = isNaN(o['tot']) ? 0 : parseInt(o['tot'])

        } catch (e) {

        }
        infos.push(Object.assign({}, u))
    }
    if (deleteOk) {
        for (let i = 0; i < saveUrls[i]; i++) {
            delete saveUrls[i]
        }
        for (let info of infos) {
            saveUrls.push(info)
        }
    }
    // console.log('a:', infos)
    return infos
}

export const initUrls = () => {
    let saveUrls = Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_update__'], true, Boolean.name) ? Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_urls__'], true, Array.name) : defaultUrls
    // console.log('infos=>', sa/veUrls)
    return computeAcInfo(saveUrls)
}
export const initObj = () => {
    let obj = Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_solution__']) ? Object.assign(defaultObj, Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_solution__'])) : defaultObj
    if (obj['showAcConfig'] == null || obj['showAcConfig'] == undefined) {
        obj.showAcConfig = true
    }
    return obj
}


// 插件是否生效
export const support_plugins = () => {
    const u = initObj()
    if (!u || !u.onlyUrls) return true
    let url = window.location.href

    // 是否是回复链接
    if (isLeetCodeCircleUrl(url) && url.indexOf('view') != -1) {
        try {
            // 获取实际链接
            url = url.split('view')[0]
        } catch (e) {
            url = window.location.href
        }
    }
    const urls = initUrls()
    for (let info of urls) {
        if (!info || !info?.link) {
            continue
        }
        // console.log('url find', info.link.indexOf(url) != -1, info.link, url)
        if (info.link.indexOf(url) != -1) {
            return true;
        }
    }
    return false
}

export const defaultUrls = [
    { 'title': '数学算法（数论/组合/概率期望/博弈/计算几何/随机算法', 'link': 'https://leetcode.cn/circle/discuss/IYT3ss/', 'tot': 0, 'ac': 0, 'id': 1, 'disabled': false, 'select': true },
    { 'title': '常用数据结构（前缀和/差分/栈/队列/堆/字典树/并查集/树状数组/线段树）', 'link': 'https://leetcode.cn/circle/discuss/mOr1u6/', 'tot': 0, 'ac': 0, 'id': 2, 'disabled': false, 'select': true },
    { 'title': '动态规划（入门/背包/状态机/划分/区间/状压/数位/树形/数据结构优化）', 'link': 'https://leetcode.cn/circle/discuss/tXLS3i/', 'tot': 0, 'ac': 0, 'id': 3, 'disabled': false, 'select': true },
    { 'title': '图论算法（DFS/BFS/拓扑排序/最短路/最小生成树/二分图/基环树/欧拉路径）', 'link': 'https://leetcode.cn/circle/discuss/01LUak/', 'tot': 0, 'ac': 0, 'id': 4, 'disabled': false, 'select': true },
    { 'title': '位运算（基础/性质/拆位/试填/恒等式/贪心/脑筋急转弯）', 'link': 'https://leetcode.cn/circle/discuss/dHn9Vk/', 'tot': 0, 'ac': 0, 'id': 5, 'disabled': false, 'select': true },
    { 'title': '网格图（DFS/BFS/综合应用)', 'link': 'https://leetcode.cn/circle/discuss/YiXPXW/', 'tot': 0, 'ac': 0, 'id': 6, 'disabled': false, 'select': true },
    { 'title': '单调栈（矩形面积/贡献法/最小字典序', 'link': 'https://leetcode.cn/circle/discuss/9oZFK9/', 'tot': 0, 'ac': 0, 'id': 7, 'disabled': false, 'select': true },
    { 'title': '二分算法（二分答案/最小化最大值/最大化最小值/第K小', 'link': 'https://leetcode.cn/circle/discuss/SqopEo/', 'tot': 0, 'ac': 0, 'id': 8, 'disabled': true, 'select': true },
    { 'title': '滑动窗口（定长/不定长/多指针', 'link': 'https://leetcode.cn/circle/discuss/0viNMK/', 'tot': 0, 'ac': 0, 'id': 9, 'disabled': false, 'select': true },
    { 'title': '贪心算法（基本贪心策略/反悔/区间/字典序/数学/思维/构造）', 'link': 'https://leetcode.cn/circle/discuss/g6KTKL/', 'tot': 0, 'ac': 0, 'id': 10, 'disabled': false, 'select': true },
    { 'title': '链表、二叉树与一般树（前后指针/快慢指针/DFS/BFS/直径/LCA）', 'link': 'https://leetcode.cn/circle/discuss/K0n2gO/', 'tot': 0, 'ac': 0, 'id': 11, 'disabled': false, 'select': true },
    { 'title': '字符串（KMP/Z函数/Manacher/字符串哈希/AC自动机/后缀数组/子序列自动机）', 'link': 'https://leetcode.cn/circle/discuss/SJFwQI/', 'tot': 0, 'ac': 0, 'id': 12, 'disabled': false, 'select': true },
    // { 'title': '灵茶题单完成情况', 'link': 'https://leetcode.cn/u/endlesscheng/', 'tot': 0, 'ac': 0, 'id': 0x3f3f3f3f,'disabled':true,'select':false },
]

function getId(problemUrl) {
    if (isContest(problemUrl) || isProblem(problemUrl)) {
        try {
            return problemUrl.split('problems')[1].split('/')[1]
        } catch (e) {
            return ''
        }
    }
    return ''
}



export function postData(ID) {
    return {
        "query": "\n    query userQuestionStatus($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    status\n  }\n}\n    ",
        "variables": {
            "titleSlug": ID
        },
        "operationName": "userQuestionStatus"
    }
}

function queryStatus(ID = '', cache = {}, cur = undefined, watch = false) {
    if (!ID) {
        return
    }
    if (cache[ID] == undefined || cache[ID] != STATUS['AC']) {
        fetch('https://leetcode.cn/graphql/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData(ID)),
        }).then(res => res.json()).then(response => {
            if (response?.data?.question) {
                const status = response?.data?.question?.status
                if (cache[ID] == undefined || cache[ID] != status) {
                    cache[ID] = status == null ? 'null' : status
                    if (watch) {
                        Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'], cache)
                        if (isDev()) {
                            console.log('save local status :', cache[ID], 'status = ', status, 'get local status :', Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'])[ID])
                        }
                        window.localStorage.setItem(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_status_update__'], JSON.stringify({
                            'id': ID,
                            'status': cache[ID]
                        }))
                    }
                    createStatus(cache[ID], cur)
                }
            } else {
                console.log('query result is undefined')
            }
        }).catch(ignore => {
            console.error('query status error : ', ignore)
        });
    }
}
export function addProcess(reload = true, doms = undefined, asyncAc = false) {
    let problems_doms = Array.isArray(doms) ? doms : loadProblems()
    const cache = getLocalProblemStatus()
    let uid = 0
    let updateCnt = 0
    for (let i = 0; i < problems_doms.length; i++) {
        let cur = problems_doms[i].parentElement
        if (!(cur instanceof HTMLElement)) {
            continue;
        }
        const ID = getId(problems_doms[i]?.href)
        if (!ID) {
            continue;
        }
        if (install_pos()) {
            cur.style.listStyleType = 'none'
        }
        // console.log('query ID', cache[ID])

        if (!cache[ID] || cache[ID] != STATUS['AC'] && asyncAc) {
            // 查询的两个条件
            // 1>首先检查本地是否有缓存 没用缓存查询
            // 2>如果本地有题目状态时不是AC但是需要同步也需要操作
            queryStatus(ID, cache, cur, false)
        } else {
            let status = cache[ID]
            uid++
            createStatus(status, cur)
        }

    }
    if (isDev()) {
        console.log('cache num :', uid, ',tot:', A.length)
    }
    getProcess()
    if (reload) {
        let cnt = 10;
        let timeId = setInterval(() => {
            Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'], cache)
            getProcess()
            cnt--
            if (cnt == 0) {
                window.clearInterval(timeId)
            }
        }, 3000);
    }

}

// 监听题目提交状态
export const submitProblems = (url = window.location.href, timeout = 500) => {
    const ID = getId(url)
    if (!ID) {
        return
    }
    setTimeout(() => {
        // console.log('watching ...', GM_getValue(local_ok_problem_key))
        const cache = getLocalProblemStatus()
        if (isDev()) {
            console.log('ID:', ID, 'query status: ', cache[ID])
        }
        // 对于ac状态题目不必查询
        queryStatus(ID, cache, undefined, true)
    }, timeout);

}


export const watchLinkStatusUpdate = (e) => {
    if (e.key != __0X3F_PROBLEM_KEYS__['__0x3f_problmes_status_update__']) {
        return
    }
    let { id, status } = JSON.parse(e.newValue)
    if (!id || !status) {
        return
    }
    let thisLink = `https://leetcode.cn/problems/${id}`
    if (isDev()) {
        console.log('update', thisLink, 'status', status)
    }
    let link = document.querySelector(`${linkCssSelector}[href^="https://leetcode.cn/problems/${id}"]`)
    if (!link || !link?.parentElement) {
        let doms = loadProblems()
        for (let i = 0; i < doms.length; i++) {
            if (!doms[i] || !doms[i]?.parentElement) {
                continue;
            }
            if (doms[i].href.indexOf(thisLink) != -1) {
                link = doms[i]
                break;
            }
        }
    }
    createStatus(status, link)
}

export function getAcCountKey(k) {
    if (!k) return ''
    return `0x3f_ac_key_${k}`
}

export function deleteAllACCountKeys() {
    let urls = initUrls()
    let keys = []
    for (let urlInfo of urls) {
        let key = getAcCountKey(urlInfo.link)
        Cache.remove(key)
        keys.push(key)
    }
    Cache.remove(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'])
    return keys
}


// 查看当前进度
export function getProcess() {
    loadProblems()
    const cache = getLocalProblemStatus()
    let cnt = 0
    for (let i = 0; i < A.length; i++) {
        let ID = getId(A[i].href)
        if (ID && cache[ID] == STATUS['AC']) {
            cnt++
        }
    }
    let url = window.location.href
    Cache.set(getAcCountKey(url), { "tot": A.length, "ac": cnt })
    return [cnt, A.length]
}

function getLocalProblemStatus() {
    return Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'], true, Object.name)
}


function getRandomInfo(array) {
    if (!Array.isArray(array)) return undefined
    return array[Math.floor(Math.random() * array.length)]
}



export async function randomProblem() {
    let allProbmems;

    if (!Array.isArray(allProbmems) || allProbmems.length == 0) {
        let response = await getProblemsJSON()
        if (Array.isArray(response)) {
            allProbmems = [...response]
            // 缓存题目信息
            Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_all_problems__'], [...response])
        }
    } else {
        allProbmems = Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_all_problems__'], true, Array.name)
    }
    if (!Array.isArray(allProbmems)) {
        ElMessage({
            type: 'error',
            message: '随机题目失败获取不到任何信息 ！请如果出现这种情况，请前往 https://github.com/wuxin0011/tampermonkey-script/issues 反馈',
            duration: 6000,
        })
        return
    }
    let config = initObj()
    let urlsData = initUrls()
    let set = new Set()
    for (let info of urlsData) {
        if (info.link && info.select) {
            set.add(info.link)
        }
    }
    let infos = []
    let acMap = Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'], true, Object.name)

    if (isDev()) {
        console.log('config and set', config, set)
    }

    for (let info of allProbmems) {
        // 选择那个题单中的题目

        if (set.has(info?.problemUrl)) {
            if (isDev()) {
                console.log("info=>", info.problemUrl, info.title)
            }
            for (let i = 0; Array.isArray(info.problems) && i < info.problems.length; i++) {
                try {
                    let { title, url, member, score, titleSlug } = info.problems[i]
                    if (isDev()) {
                        // 过滤随机题目条件
                        // 1、 如果不显示AC题目，但是该题AC了
                        // 2、 如果不显示会员题目，但是该题会员
                        // 3、 如果这题目有分数并且分数不在随机题目的区间
                    }
                    if (!config.showAcConfig && acMap[url] == 'ac' || !config.visiableMember && member || score != 0 && (score < config.min || score > config.max)) {
                        continue
                    }
                    infos.push({ title, url, member, score, titleSlug })
                } catch (e) {
                    console.log('error', e)
                }
            }
        }
    }
    if (isDev()) {
        console.log('filter infos = ', infos)
    }
    let data = getRandomInfo(infos)

    if (isDev()) {
        console.log('randomInfo : ', data)
    }
    ElMessage({
        dangerouslyUseHTMLString: !!(data && data?.url && data?.title),
        type: data?.url && data?.title ? 'success' : "error",
        message: data?.url && data?.title ? `<div>随机题目☕：&nbsp;<a href="${data.url}" target="_blank" style="color:#5d99f2;">${data.title}</a> ${data?.score && data?.score > 0 ? `&nbsp;分值${data.score}` : ''}</div>` : `没有符合条件的题目，请重新配置条件!`,
        duration: 6000,
    })


}