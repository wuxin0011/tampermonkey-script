import Cache from './cache'
import { CUR_URL, EN_URL, isBilibili, isContest, isDev, isEnglishENV, isLeetCodeCircleUrl, isProblem, sleep, ZH_URL } from './index'
import { createStatus, resetSVG, updateSVG } from './status'
import { getProblemAcInfo, getProblemsJSON, PostLeetCodeApi,getRating } from '../api/index'
import { ElMessage } from 'element-plus'
import { GM_registerMenuCommand } from '$';
import { Message } from './message'
const inf = 5000  // 目前最大分数为3100
const mi = 800  // 目前最小分数为1100 


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
    '__0x3f_problme_stop_discuss_': '__0x3f_problme_default_stop_discuss_', //屏蔽讨论区 默认屏蔽
    '__0x3f_problme_score_': '__0x3f_problme_score_', // 显示题目分数 默认不显示
    '__0x3f_problme_score_tot_key': '__0x3f_problme_score_tot_key', // 题目分数 缓存
    '__0x3f_problme_rating': '__0x3f_problme_rating', // 0神分数rating
}

export const STATUS = {
    "AC": "ac",
    "NO": "null",
    "notac": "notac",
    "Accepted": "ac",
    "Wrong Answer": "notac",
}

export const defaultUrls = [
    { 'title': '数学算法（数论/组合/概率期望/博弈/计算几何/随机算法', 'link': 'https://leetcode.cn/discuss/post/3584388/fen-xiang-gun-ti-dan-shu-xue-suan-fa-shu-gcai/', 'tot': 0, 'ac': 0, 'id': 1, 'disabled': false, 'select': true ,'version':1},
    { 'title': '常用数据结构（前缀和/差分/栈/队列/堆/字典树/并查集/树状数组/线段树）', 'link': 'https://leetcode.cn/discuss/post/3583665/fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/', 'tot': 0, 'ac': 0, 'id': 2, 'disabled': false, 'select': true,'version':1 },
    { 'title': '动态规划（入门/背包/状态机/划分/区间/状压/数位/树形/数据结构优化）', 'link': 'https://leetcode.cn/discuss/post/3581838/fen-xiang-gun-ti-dan-dong-tai-gui-hua-ru-007o/', 'tot': 0, 'ac': 0, 'id': 3, 'disabled': false, 'select': true,'version':1 },
    { 'title': '图论算法（DFS/BFS/拓扑排序/最短路/最小生成树/二分图/基环树/欧拉路径）', 'link': 'https://leetcode.cn/discuss/post/3581143/fen-xiang-gun-ti-dan-tu-lun-suan-fa-dfsb-qyux/', 'tot': 0, 'ac': 0, 'id': 4, 'disabled': false, 'select': true ,'version':1},
    { 'title': '位运算（基础/性质/拆位/试填/恒等式/贪心/脑筋急转弯）', 'link': 'https://leetcode.cn/discuss/post/3580371/fen-xiang-gun-ti-dan-wei-yun-suan-ji-chu-nth4/', 'tot': 0, 'ac': 0, 'id': 5, 'disabled': false, 'select': true ,'version':1},
    { 'title': '网格图（DFS/BFS/综合应用)', 'link': 'https://leetcode.cn/discuss/post/3580371/fen-xiang-gun-ti-dan-wei-yun-suan-ji-chu-nth4/', 'tot': 0, 'ac': 0, 'id': 6, 'disabled': false, 'select': true ,'version':1},
    { 'title': '单调栈（矩形面积/贡献法/最小字典序', 'link': 'https://leetcode.cn/discuss/post/3579480/ti-dan-dan-diao-zhan-ju-xing-xi-lie-zi-d-u4hk/', 'tot': 0, 'ac': 0, 'id': 7, 'disabled': false, 'select': true ,'version':1},
    { 'title': '二分算法（二分答案/最小化最大值/最大化最小值/第K小', 'link': 'https://leetcode.cn/discuss/post/3579164/ti-dan-er-fen-suan-fa-er-fen-da-an-zui-x-3rqn/', 'tot': 0, 'ac': 0, 'id': 8, 'disabled': true, 'select': true ,'version':1},
    { 'title': '滑动窗口（定长/不定长/多指针', 'link': 'https://leetcode.cn/discuss/post/3578981/ti-dan-hua-dong-chuang-kou-ding-chang-bu-rzz7/', 'tot': 0, 'ac': 0, 'id': 9, 'disabled': false, 'select': true ,'version':1},
    { 'title': '贪心算法（基本贪心策略/反悔/区间/字典序/数学/思维/构造）', 'link': 'https://leetcode.cn/discuss/post/3091107/fen-xiang-gun-ti-dan-tan-xin-ji-ben-tan-k58yb/', 'tot': 0, 'ac': 0, 'id': 10, 'disabled': false, 'select': true ,'version':1},
    { 'title': '链表、二叉树与一般树（前后指针/快慢指针/DFS/BFS/直径/LCA）', 'link': 'https://leetcode.cn/discuss/post/3142882/fen-xiang-gun-ti-dan-lian-biao-er-cha-sh-6srp/', 'tot': 0, 'ac': 0, 'id': 11, 'disabled': false, 'select': true ,'version':1},
    { 'title': '字符串（KMP/Z函数/Manacher/字符串哈希/AC自动机/后缀数组/子序列自动机）', 'link': 'https://leetcode.cn/discuss/post/3144832/fen-xiang-gun-ti-dan-zi-fu-chuan-kmpzhan-ugt4/', 'tot': 0, 'ac': 0, 'id': 12, 'disabled': false, 'select': true ,'version':1},
    // { 'title': '灵茶题单完成情况', 'link': 'https://leetcode.cn/u/endlesscheng/', 'tot': 0, 'ac': 0, 'id': 0x3f3f3f3f,'disabled':true,'select':false },
]


// 旧版本题单网址需要替换
export const old_url_map = {
  'https://leetcode.cn/circle/discuss/IYT3ss/': 'https://leetcode.cn/discuss/post/3584388/fen-xiang-gun-ti-dan-shu-xue-suan-fa-shu-gcai/',
  'https://leetcode.cn/circle/discuss/mOr1u6/': 'https://leetcode.cn/discuss/post/3583665/fen-xiang-gun-ti-dan-chang-yong-shu-ju-j-bvmv/',
  'https://leetcode.cn/circle/discuss/tXLS3i/': 'https://leetcode.cn/discuss/post/3581838/fen-xiang-gun-ti-dan-dong-tai-gui-hua-ru-007o/',
  'https://leetcode.cn/circle/discuss/01LUak/': 'https://leetcode.cn/discuss/post/3581143/fen-xiang-gun-ti-dan-tu-lun-suan-fa-dfsb-qyux/',
  'https://leetcode.cn/circle/discuss/dHn9Vk/': 'https://leetcode.cn/discuss/post/3580371/fen-xiang-gun-ti-dan-wei-yun-suan-ji-chu-nth4/',
  'https://leetcode.cn/circle/discuss/YiXPXW/': 'https://leetcode.cn/discuss/post/3580195/fen-xiang-gun-ti-dan-wang-ge-tu-dfsbfszo-l3pa/',
  'https://leetcode.cn/circle/discuss/9oZFK9/': 'https://leetcode.cn/discuss/post/3579480/ti-dan-dan-diao-zhan-ju-xing-xi-lie-zi-d-u4hk/',
  'https://leetcode.cn/circle/discuss/SqopEo/': 'https://leetcode.cn/discuss/post/3579164/ti-dan-er-fen-suan-fa-er-fen-da-an-zui-x-3rqn/',
  'https://leetcode.cn/circle/discuss/0viNMK/': 'https://leetcode.cn/discuss/post/3578981/ti-dan-hua-dong-chuang-kou-ding-chang-bu-rzz7/',
  'https://leetcode.cn/circle/discuss/g6KTKL/': 'https://leetcode.cn/discuss/post/3091107/fen-xiang-gun-ti-dan-tan-xin-ji-ben-tan-k58yb/',
  'https://leetcode.cn/circle/discuss/K0n2gO/': 'https://leetcode.cn/discuss/post/3142882/fen-xiang-gun-ti-dan-lian-biao-er-cha-sh-6srp/',
  'https://leetcode.cn/circle/discuss/SJFwQI/': 'https://leetcode.cn/discuss/post/3144832/fen-xiang-gun-ti-dan-zi-fu-chuan-kmpzhan-ugt4/'
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
export const isNewUI = () => !document.querySelector(isEnglishENV() ? '.discuss-markdown-container': '#lc-content [class*="CollapsibleMarkdownContent"] [class*="MarkdownContent"]')
const linkCssSelector_pre = () => {
    if(isEnglishENV()) {
        return isNewUI() ? '.break-words':'.discuss-markdown-container'
    }
    return isNewUI() ? '.break-words' :`#lc-content [class*="CollapsibleMarkdownContent"] [class*="MarkdownContent"]` 
}
const linkCssSelector = `${linkCssSelector_pre()} li>a`

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
        const cache = getLocalProblemStatus()
        if(isDev()) {
            console.log('data',data.hiddenAc)
        }
        for (let i = 0; i < A.length; i++) {
            if (!(A[i] instanceof HTMLAnchorElement)) {
                continue;
            }
            let d = A[i]?.parentNode
            if (!d) {
                continue
            }
            let Nohidden = isShow(d.textContent, min, max)
            d.style.display = Nohidden ? '' : 'none'
            
            if (!Nohidden) {
                continue;
            }
            if (hiddenAc) {
                const a = d.querySelector('a')
                const svg = d.querySelector('svg')
                d.style.display = a && a.href && STATUS['AC'] == cache[getId(a.href)] || svg && svg.getAttribute('status') && svg.getAttribute('status') == STATUS['AC'] ? 'none' : ''
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
            u['version'] = isNaN(u['version']) ? 1 : parseInt(u['version'])
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
    if(isDev()){
        console.log('{{ scope.row }}',infos)
    }
    return infos
}

export const initUrls = () => {
    let saveUrls = Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_update__'], true, Boolean.name) ? Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_urls__'], true, Array.name) : defaultUrls
    for(let i = 0;i <  saveUrls.length;i++){
        if(saveUrls[i]?.link && old_url_map[`${saveUrls[i].link}`]) {
            saveUrls[i].link = old_url_map[saveUrls[i].link]
        }
    }
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


        if (!cache[ID] || cache[ID] != STATUS['AC'] && asyncAc) {
            // 查询的两个条件
            // 1>首先检查本地是否有缓存 没用缓存查询
            // 2>如果本地有题目状态时不是AC但是需要同步也需要操作
            await sleep(20)
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
        if (isDev()) {
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
    showProblemSolve()
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
        if(isDev()){
            console.log("response allProbmems",response,allProbmems)
        }
    } else {
        allProbmems = Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_all_problems__'], true, Array.name)
        if(isDev()){
            console.log("else allProbmems",allProbmems)
        }
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
        // if(isDev()) {
        //     console.log('url = ',info?.problemUrl,'check1',!info?.problemUrl || !set.has(info?.problemUrl) || !Array.isArray(info.problems) || info.problems.length == 0,'xxx',info.problems)
        // }
        // 选择那个题单中的题目
        if (!info?.problemUrl || !set.has(info?.problemUrl) || !Array.isArray(info.problems) || info.problems.length == 0) {
            continue
        }
        if(isDev()) {
            console.log('check2')
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
    // if(isDev()) {
    //     console.log('github api result:',infos, mapInfo, totInfo)
    // }
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


// 拿到题目标签
function getDom(){
    for(let target of ['easy','medium','hard']) {
        let t = document.querySelector(`.gap-1 .text-difficulty-${target}`)
        if(t) return t
    }
    return undefined
}


// 显示题目分数 周赛信息
// 2025/07/06
export async function handlerScore() {
    let ok = Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problme_score_'],true,String.name)
    ok = ok != 'false' && ok != false
    GM_registerMenuCommand(`${ok ? '关闭':'显示'} 题目分数 🍳`, function() {
        Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problme_score_'],!ok)
        window.location.reload()
    }, { title: '默认显示题目分数' })
    if(!ok) return
    let url = window.location.href
    if(!isProblem(url)) return;
    await sleep(1000)
    let problemDom = getDom()
    if(!problemDom)return
    let id = getId(url)
    let score = 0
    let contestUrl = isEnglishENV() ? `https://leetcode.com/contest/` :  `https://leetcode.cn/contest/`
    let contestUrlFind = false
    let curRating = null
    try{
        let problemMap = Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problme_score_tot_key'],true) ?? {}
        let problem = problemMap[id]
        if(!problem) {
            let p = await githubProblem(true)
            let new_temp = {}
            for(let obj of p[1]) {
                let k  = obj[0]
                let v  = obj[1]
                new_temp[k] = v
            }
            problemMap = Object.assign({},new_temp)
            Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problme_score_tot_key'],problemMap)
            if(isDev()) {
                console.log('save __0x3f_problme_score_tot_key : 😺')
            }
        }
        problem = problemMap[id]
        score = problem?.score


        let rating = Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problme_rating'],true) ?? {}
        if(!rating[id]) {
            let p = await getRating()
            let temp = {}
            for(let i = 0;Array.isArray(p)&& i<p.length;i++) {
                temp[p[i]['TitleSlug']] = p[i]
            }
            rating = Object.assign({},temp)
            Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problme_rating'],rating)
            if(isDev()) {
                console.log('save __0x3f_problme_rating : 😺')
            }
        }

        if(rating[id]) {
            curRating = rating[id]
            contestUrlFind = true
            contestUrl = contestUrl + rating[id]['ContestSlug']
            if(!score) {
                score = Math.floor(rating[id]['Rating'])
            }

        }
    }catch(e){
        console.error(e)
    }

    
    if(isDev()){
        console.log('problemDom',problemDom)
        console.log('score',score)
    }
    if(score != undefined && score != null && score > 0 && problemDom) {

        if(contestUrlFind) {
            problemDom.innerHTML = `<a href="${contestUrl}" target="_blank" title="${isEnglishENV() ? curRating.ContestID_en : curRating.ContestID_zh} ${curRating.ProblemIndex}">${score}</a>`
        }else{
            problemDom.textContent = score
        }
        
    }
}



// 重置题目进度
// 2025/07/09
const LANG_LIST = ['java','cpp','python','python3','go','javascript','js','c','C','C++','ts','typescript','TypeScript','Rust','rust','Go','php','PHP','C#',
    'Python3','Java','Swift','swift','Kotion','kotion','dart','Dart','Ruby','ruby','scala','Scala','Racket','racket','Erlang','erlang','Elixir','elixir','Cangjie','cangjie'
]


export function showProblemSolve() {
    let url = window.location.href
    if(!isProblem(url)) return
    let t = document.querySelector('#qd-content .text-body.flex.flex-none.items-center')
    if(!t) return
    let c = getLocalProblemStatus()
    let id = getId(url)
    if((c[id] == 'null' || c[id] == null) && t.textContent == '已解答') {
        // console.log('none')
        t.style.display = 'none'
    }else{
        t.style.display = 'inline-block'
    }
}

export async function resetProblemStatus(url,click) {



    showProblemSolve()

    

    function deleteAcLocalStorage(title) {
        try{
            let No = title.match(/\d+/)[0]
            let keys = []
            for (let lang of LANG_LIST) {
                keys.push(`${No}_0_${lang}`)
            }
            for(let key of keys) {
                window.localStorage.removeItem(key)
            }
        }catch(_){}
    }

    async function fun(discuss_url,force = false) {
        let cache = getLocalProblemStatus()
        if(isLeetCodeCircleUrl()) {
            let problems_doms = loadProblems()
            for (let i = 0; i < problems_doms.length; i++) {
                let cur = problems_doms[i].parentElement
                if (!(cur instanceof HTMLElement)) {
                    continue;
                }
                const ID = getId(problems_doms[i]?.href)
                
                if(!ID) continue;
                if(force) {
                    delete cache[ID]
                }else{
                    cache[ID] = "null"
                    deleteAcLocalStorage(problems_doms[i].textContent)
                }
            }
        }else{
            let tot = await githubProblem()
            tot = tot[0]
            for(let p of tot) {
                if(p['problemUrl'].indexOf(discuss_url) == -1) continue;
                for(let info of p['problems']) {
                    if(!info?.titleSlug) continue
                    let ID = titleSlug
                    if(force) {
                        delete cache[ID]
                    }else{
                        cache[ID] = "null"
                        deleteAcLocalStorage(info?.title)
                    }
                }
                break
            }
        }

        Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'],cache)
    }

    
    
    if(isLeetCodeCircleUrl()) {
        GM_registerMenuCommand(`重置进度 ⏱`, () => {
            Message('确认重置进度?该操作不可恢复', async () => {
              await fun(window.location.href,false);
              window.location.reload()
            })
          }, { title: '如果需要重做题单，可以执行该操作' })

        
        let tag = document.querySelector('.flex .flex-wrap.gap-1 .no-underline')
        if(!tag) {
            await sleep(3000)
            tag = document.querySelector('.flex .flex-wrap.gap-1 .no-underline')
        }
        if(tag) {
            let p = tag.parentElement
            function createTag() {
                let a = document.createElement('a')
                a.className =  `no-underline truncate bg-sd-accent text-sd-muted-foreground hover:text-sd-foreground dark:hover:text-sd-foreground items-center rounded-full px-2 py-1 text-xs`
                return a
            }
            let reset = createTag()
            reset.innerHTML = resetSVG(16)
            reset.style.cursor='pointer'
            reset.title = '重置题单进度，如果需要多刷可以试试'
            reset.addEventListener('click',async (e)=>{
                    e.preventDefault()
                    Message('确认重置进度?该操作不可恢复', async () => {
                        await fun(window.location.href,false);
                        window.location.reload()
                    })
             })
             p.appendChild(reset)

            let update = createTag()
            // update.textContent = '🚀'
            update.innerHTML = updateSVG(16)
            update.title = '强制更新题单,该操作会将历史ac记录统计其中'
            update.style.cursor='pointer'
            update.addEventListener('click',async (e)=>{
                    e.preventDefault()
                    Message('确认强制更新进度？', async () => {
                        await fun(window.location.href,true);
                        window.location.reload()
                    })
             })
             p.appendChild(update)
        }
        let dom = document.querySelector('.break-words')

        if(dom) {
            let titles = Array.from(dom.querySelectorAll('h2'))
            let uls = Array.from(dom.querySelectorAll('ul'))
            if(isDev()) {
                console.log('titles',titles.length,'uls',uls.length)
            }
            function get(index,runClear) {
                if(index + 1>=titles.length)return
                let curCache = getLocalProblemStatus()
                const currentH2 = titles[index];
                const nextH2 = titles[index + 1];
                const aLinks = [];
                let nextSibling = currentH2.nextElementSibling;
                while (nextSibling && nextSibling !== nextH2) {
                    if(nextSibling.tagName === 'A') {
                        if(isProblem(nextSibling.href)) {
                            aLinks.push(nextSibling);
                        }
                    }else{
                        for(let a of Array.from(nextSibling.querySelectorAll('a') ?? {length:0})) {
                            if(a && isProblem(a.href)) {
                                aLinks.push(a);
                            }
                        }
                    }
                    nextSibling = nextSibling.nextElementSibling;
                }
                if(aLinks.length> 0 && runClear) {
                    for (let i = 0; i < aLinks.length; i++) {
                        const ID = getId(aLinks[i]?.href)
                        if(!ID) continue;
                        curCache[ID] = 'null'
                        createStatus('null', aLinks[i],true) 
                        deleteAcLocalStorage(aLinks[i].textContent)
                    }
                    Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'],curCache)
                }
                return aLinks
                
            }
            for(let i = 0;i < titles.length - 1;i++) {
                let aLinks = get(i,false)
                if(aLinks.length != 0) {
                    const span = document.createElement('span')
                    span.style.cursor='pointer'
                    span.style.marginLeft='20px'
                    span.title = `重刷《${titles[i].textContent}》章节 `
                    span.addEventListener('click',()=>{
                        Message(`确认${span.title}进度?该操作不可恢复`,() => {
                            get(i,true)
                        })
                    })
                    span.innerHTML = resetSVG(17)
                    titles[i].appendChild(span)
                }
            }
        }
    }

    if(click) {
        await fun(url,false)
    }
}