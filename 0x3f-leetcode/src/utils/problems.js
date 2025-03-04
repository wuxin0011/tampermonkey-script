import Cache from './cache'
import { CUR_URL, EN_URL, isBilibili, isContest, isDev, isEnglishENV, isLeetCodeCircleUrl, isProblem, sleep, ZH_URL } from './index'
import { createStatus } from './status'
import { getProblemAcInfo, getProblemsJSON, PostLeetCodeApi } from '../api/index'
import { ElMessage } from 'element-plus'
import { GM_registerMenuCommand } from '$';
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
    '__0x3f_problme_support_type__': '__0x3f_problme_support_type__', //是否替换到com 默认cn
    '__0x3f_problme_support_type_tips__': '__0x3f_problme_support_type_tips__', //是否替换到com 默认cn 不再提示key
    '__0x3f_problme_stop_discuss_': '__0x3f_problme_stop_discuss_', //屏蔽讨论区
}

export const STATUS = {
    "AC": "ac",
    "NO": "null",
    "notac": "notac",
    "Accepted": "ac",
    "Wrong Answer": "notac",
}



export const defaultObj = {
    min: mi, max: inf, visiableMember: true, onlyUrls: false, useDefaultSetting: true, hiddenAc: false, showAcConfig: true, sortedType: 0
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
// const linkCssSelector_pre = () => isEnglishENV() ? '.discuss-markdown-container' : `#lc-content [class*="CollapsibleMarkdownContent"] [class*="MarkdownContent"]`
// 2025.3.4 兼容新UI
const linkCssSelector_pre = () => isEnglishENV() ? '.discuss-markdown-container' : document.querySelector('#lc-content [class*="CollapsibleMarkdownContent"] [class*="MarkdownContent"]') ? `#lc-content [class*="CollapsibleMarkdownContent"] [class*="MarkdownContent"]` : `.break-words`
const linkCssSelector = `${linkCssSelector_pre()} li>a`
// document.querySelectorAll('#lc-content [class*="CollapsibleMarkdownContent"] [class$="MarkdownContent"]')

export const queryProblem = () => Array.from(document.querySelectorAll(linkCssSelector)).filter(item => item && item instanceof HTMLAnchorElement && (isProblem(item.href) || isContest(item.href)))

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
    let set = new Set()
    // console.log('saveUrls', saveUrls)
    for (let i = 0, u = null; Array.isArray(saveUrls) && i < saveUrls.length; i++) {
        try {
            u = saveUrls[i]
            if (!u?.link || !u?.title || !u?.id || set.has(u.link)) {
                continue
            }
            if (u['select'] == undefined) u.select = true
            if (u['loading'] == undefined || u['loading']) u['loading'] = false

            let s = Object.values(u).join('')
            if (s == 'null' || !Cache.get(u.link) || !getAcCountKey(u.link) || !Cache.get(getAcCountKey(u.link))) {
                continue
            }
            let o = Cache.get(getAcCountKey(u.link))
            u['ac'] = isNaN(o['ac']) ? 0 : parseInt(o['ac'])
            u['tot'] = isNaN(o['tot']) ? 0 : parseInt(o['tot'])
            set.add(u.link)

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
    if (obj['sortedType'] == null || obj['sortedType'] == undefined) {
        obj.sortedType = 0
    }
    let temp = {}
    for (let key of Object.keys(obj)) {
        if (!isNaN(key) || defaultObj[`${key}`] == undefined) continue
        temp[`${key}`] = obj[`${key}`]
    }
    return temp
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

export function getId(problemUrl) {
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

async function queryStatus(ID = '', cache = {}, cur = undefined, watch = false) {
    if (!ID) {
        return
    }
    if (cache[ID] == undefined || cache[ID] != STATUS['AC']) {
        const response = await getProblemAcInfo(ID)
        if (isDev()) {
            console.log('query result response:', response)
        }
        if (response?.data?.question) {
            const status = response?.data?.question?.status
            if (cache[ID] == undefined || cache[ID] != status) {
                cache[ID] = status == null ? 'null' : status
                if (watch) {
                    if (isDev()) {
                        console.log('save local status :', cache[ID], 'status = ', status, 'get local status :', Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'])[ID])
                    }
                    watchSaveStatus(ID, cache[ID])
                }
                createStatus(cache[ID], cur)
            }
        } else {
            console.warn('query result is undefined')
            createStatus(cache[ID], cur)
        }
    }
}
export async function addProcess(reload = true, doms = undefined, asyncAc = false) {
    let problems_doms = Array.isArray(doms) ? doms : loadProblems()
    const cache = getLocalProblemStatus()
    let uid = 0, query_cnt = 0
    const isReplaceEnglish = isEnglish()
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

        // 替换题目链接是国服还是美服
        if (isReplaceEnglish && problems_doms[i].href) {
            problems_doms[i].href = problems_doms[i].href.replace('leetcode.cn', 'leetcode.com')
        }


        // console.log('query ID', cache[ID])

        if (!cache[ID] || cache[ID] != STATUS['AC'] && asyncAc) {
            // 查询的两个条件
            // 1>首先检查本地是否有缓存 没用缓存查询
            // 2>如果本地有题目状态时不是AC但是需要同步也需要操作
            await sleep(50)
            await queryStatus(ID, cache, cur, false)
            query_cnt++
            if (query_cnt % 10 == 0) {
                Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'], cache)
            }
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
    Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'], cache)

    let other = Array.from(document.querySelectorAll(`${linkCssSelector_pre()} p>a`)).filter(item => item && item instanceof HTMLAnchorElement && (isBilibili(item.href)))
    for (let i = 0; i < other.length; i++) {
        createStatus("null", other[i])
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
        // if (isDev()) {
        //     console.log('ID:', ID, 'query status: ', cache[ID])
        // }
        if(isDev()) {
            console.log('ID:', ID, 'query status: ', cache[ID])
        }
        // 对于ac状态题目不必查询
        queryStatus(ID, cache, undefined, true)
    }, timeout);

}



export const watchSaveStatus = (ID, status) => {
    const cache = getLocalProblemStatus()
    // console.log('watchSaveStatus', cache[ID], status)
    if (cache[ID] != 'ac') {
        cache[ID] = status
        Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'], cache)
        window.localStorage.setItem(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_status_update__'], JSON.stringify({
            'id': ID,
            'status': status
        }))
    }
}


export const watchLinkStatusUpdate = (e) => {
    if (e.key != __0X3F_PROBLEM_KEYS__['__0x3f_problmes_status_update__']) {
        return
    }
    let { id, status } = JSON.parse(e.newValue)
    if (!id || !status) {
        return
    }
    let thisLink = `${CUR_URL}/problems/${id}`
    if (isDev()) {
        console.log('update', thisLink, 'status', status)
    }
    let link = document.querySelector(`${linkCssSelector}[href^="${CUR_URL}/problems/${id}"]`)
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
export async function getProcess() {
    loadProblems()
    const cache = getLocalProblemStatus()
    const config = initObj()

    const response = await githubProblem(true)
    const mapInfo = response[1]
    let cnt = 0
    let tot = 0
    for (let i = 0; i < A.length; i++) {
        let ID = getId(A[i].href)
        if ((!config?.visiableMember && mapInfo.get(ID)?.member)) {
            continue
        }
        if (ID && cache[ID] == STATUS['AC']) {
            cnt++
        }
        tot++
    }
    let url = window.location.href
    if (A.length > 0 && getAcCountKey(url)) {
        Cache.set(getAcCountKey(url), { "tot": tot, "ac": cnt })
    }
    return [cnt, tot]
}

function getLocalProblemStatus() {
    return Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'], true, Object.name)
}


function getRandomInfo(array) {
    if (!Array.isArray(array)) return undefined
    return array[Math.floor(Math.random() * array.length)]
}

/**
 * 链接是否替换成English
 * @returns 
 */
export function isEnglish() {
    return Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problme_support_type__'], Boolean.name) == true
}

export function changeEnglishType() {
    Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problme_support_type__'], !isEnglish())
    if (Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problme_support_type_tips__'], String.name) != 'NO') {
        Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problme_support_type_tips__'], "OK")
    }
    window.location.reload()
}

export function installEnglishLinkChangeCommand() {
    if (!isLeetCodeCircleUrl() || isEnglishENV()) {
        return;
    }
    GM_registerMenuCommand(`题目链接切换到${isEnglish() ? '国服🎈' : '美服🌎'}`, () => {
        changeEnglishType()
    }, { title: '将题单链接替换为国服或者替换为美服' })
}





/**
 * 从远程获取题目信息 返回封装好的信息 以获取信息为准 如果远程获取失败尝试从本地获取
 * 然后更新信息保存到本地
 * @param {*} filter_member 是否过滤会员题目
 * @returns 
 */
export async function githubProblem(not_filter_member = true) {
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
    // console.log(allProbmems)
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
    let acMap = Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'], true, Object.name)

    if (isDev()) {
        console.log('config and set', config, set)
        console.log('acMap', acMap)
    }
    let infos = []
    let mapInfo = new Map()
    let totInfo = []
    for (let info of allProbmems) {
        // 选择那个题单中的题目
        if (!info?.problemUrl || !set.has(info?.problemUrl) || !Array.isArray(info.problems) || info.problems.length == 0) {
            continue
        }
        let cur_infos = []
        for (let i = 0; Array.isArray(info.problems) && i < info.problems.length; i++) {
            try {
                let { title, url, member, score, titleSlug } = info.problems[i]
                if (!url || !title) continue
                if ((!config?.visiableMember && member || (!not_filter_member && member))) {
                    continue
                }
                let new_obj = { title, url, member, score, titleSlug, 'status': acMap[titleSlug] }
                infos.push(new_obj)
                cur_infos.push(new_obj)
                mapInfo.set(titleSlug, new_obj)
            } catch (e) {
                console.log('error', e)
            }
        }
        info.problems = cur_infos
        totInfo.push(info)
    }
    return [infos, mapInfo, totInfo]
}


// 随机题目
export async function randomProblem() {
    // 获取前置信息
    let responseDatas = await githubProblem()
    let acMap = Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'], true, Object.name)
    let config = initObj()
    let problems = responseDatas[0]
    let infos = []

    // 按照要求过滤题目
    for (let i = 0; Array.isArray(problems) && i < problems.length; i++) {
        try {
            let { title, url, member, score, titleSlug } = problems[i]
            if (!url || !title) continue
            if (isDev()) {
                // 过滤随机题目条件
                // 1、 如果不显示AC题目，但是该题AC了
                // 2、 如果不显示会员题目，但是该题会员
                // 3、 如果这题目有分数并且分数不在随机题目的区间
            }
            if ((!config?.showAcConfig && acMap[titleSlug] == 'ac')) {
                continue
            }
            if ((!config?.visiableMember && member)) {
                continue
            }
            if (score != 0 && (score < config?.min || score > config?.max)) {
                continue
            }
            infos.push({ title, url, member, score, titleSlug, 'status': acMap[titleSlug] })
        } catch (e) {
            console.log('error', e)
        }
    }


    // 已经过滤好的题目随机
    let data = getRandomInfo(infos)


    // 将链接替换为美服
    if (data.url && isEnglish()) {
        data.url = data.url.replace(ZH_URL, EN_URL)
    }



    // 显示题目链接
    ElMessage({
        dangerouslyUseHTMLString: !!(data && data?.url && data?.title),
        type: data?.url && data?.title ? 'success' : "error",
        message: data?.url && data?.title ? `<div>随机题目☕：&nbsp;<a href="${data.url}" target="_blank" style="color:#5d99f2;">${data.title}</a> ${data?.score && data?.score > 0 ? `&nbsp;分值${data.score}` : ''}</div>` : `没有符合条件的题目，请重新配置条件!`,
        duration: 6000,
    })


}