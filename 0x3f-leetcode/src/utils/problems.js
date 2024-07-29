import { isProblem, isContest, isLeetCodeCircleUrl } from './index'
import { problemsNo, problemFinsh, problemsTry } from './status'
import Cache from './cache'

const inf = 4000  // 目前最大分数为3100
const mi = 1000   // 目前最小分数为1100 



// 基本信息
export const __0x3f_problmes_solution__ = '__0x3f_problmes_solution__'

// 题单key
export const __0x3f_problmes_urls__ = '__0x3f_problmes_urls__'

// 是否修改了默认题单key
export const __0x3f_problmes_update__ = '__0x3f_problmes_update__'

// 是否隐藏设置按钮
export const __is_none_0x3f_problmes_button__ = '__is_none_0x3f_problmes_button__'


// load ok ？ 
export const __0x3f_problmes_plugin_load_ok__ = '__0x3f_problmes_plugin_load_ok__'

// insert left or right ?
export const __0x3f_problmes_ok_insert_pos__ = '__0x3f_problmes_insert_pos__'



export const __add_cur__ = '__add_cur__'


export const defaultObj = {
    min: mi, max: inf, visiableMember: true, onlyUrls: false, useDefaultSetting: true, hiddenAc: false
}


export function install_pos() {
    // 默认安装到左边
    return !Cache.get(__0x3f_problmes_ok_insert_pos__, false, Boolean.name)
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

export const queryProblem = () => Array.from(document.querySelectorAll('.css-1ayia3m-MarkdownContent li>a')).filter(item => item && item instanceof HTMLAnchorElement && isProblem(item.href))

function loadProblems() {
    A = queryProblem()
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
        Cache.set(__0x3f_problmes_solution__, data)
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

export const initUrls = () => Cache.get(__0x3f_problmes_update__, true, Boolean.name) ? Cache.get(__0x3f_problmes_urls__, true, Array.name) : defaultUrls
export const initObj = () => Cache.get(__0x3f_problmes_solution__) ? Object.assign(defaultObj, Cache.get(__0x3f_problmes_solution__)) : defaultObj



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


// 默认题单url
export const defaultUrls = [
    {
        title: '贪心算法（基本贪心策略/反悔/区间/字典序/数学/思维/构造）',
        link: 'https://leetcode.cn/circle/discuss/g6KTKL/',
    }, {
        title: '滑动窗口（定长/不定长/多指针）',
        link: 'https://leetcode.cn/circle/discuss/0viNMK/',
    },
    {
        title: '二分算法（二分答案/最小化最大值/最大化最小值/第K小）',
        link: 'https://leetcode.cn/circle/discuss/SqopEo/',
    },
    {
        title: '单调栈（矩形面积/贡献法/最小字典序）',
        link: 'https://leetcode.cn/circle/discuss/9oZFK9/',
    },
    {
        title: '网格图（DFS/BFS/综合应用）',
        link: 'https://leetcode.cn/circle/discuss/YiXPXW/',
    },
    {
        title: '位运算（基础/性质/拆位/试填/恒等式/贪心/脑筋急转弯）',
        link: 'https://leetcode.cn/circle/discuss/dHn9Vk/',
    },
    {
        title: '图论算法（DFS/BFS/拓扑排序/最短路/最小生成树/二分图/基环树/欧拉路径）',
        link: 'https://leetcode.cn/circle/discuss/01LUak/',
    },
    {
        title: '动态规划（入门/背包/状态机/划分/区间/状压/数位/树形/数据结构优化）',
        link: 'https://leetcode.cn/circle/discuss/tXLS3i/',
    },
    {
        title: '常用数据结构（前缀和/差分/栈/队列/堆/字典树/并查集/树状数组/线段树）',
        link: 'https://leetcode.cn/circle/discuss/mOr1u6/',
    },
    {
        title: '数学算法（数论/组合/概率期望/博弈/计算几何/随机算法）',
        link: 'https://leetcode.cn/circle/discuss/IYT3ss/',
    }
]


// 本地已经解决的题目

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

const local_ok_problem_key = '__local_ok_problem_key__'
const STATUS = {
    "AC": "ac",
    "NO": "null",
    "notac": "notac",
}


function postData(ID) {
    return {
        "query": "\n    query userQuestionStatus($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    status\n  }\n}\n    ",
        "variables": {
            "titleSlug": ID
        },
        "operationName": "userQuestionStatus"
    }
}

export function addProcess(reload = true) {
    loadProblems()
    let problems_doms = A
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
        // 本地是否有缓存
        if (cache[ID]) {
            let status = cache[ID]
            uid++
            const svg = cur.querySelector('svg')
            if (svg) {
                if (svg.getAttribute('status') == status) {
                    continue;
                }
                svg.remove()
                updateCnt++
            }
            if (install_pos()) {
                cur.innerHTML = (status == STATUS['AC'] ? problemFinsh() : status == STATUS['notac'] ? problemsTry() : problemsNo()) + cur.innerHTML
            } else {
                cur.innerHTML = cur.innerHTML + (status == STATUS['AC'] ? problemFinsh() : status == STATUS['notac'] ? problemsTry() : problemsNo())
            }

        } else {
            // console.log('access : ', ID)
            fetch('https://leetcode.cn/graphql/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData(ID)),
            }).then(res => res.json()).then(response => {
                const status = response?.data?.question?.status
                // console.log(ID, status == null ? "没错过" : status == 'ac' ? "AC" : "尝试过")
                if (status == STATUS['AC']) {
                    cur.innerHTML = install_pos() ? (problemFinsh() + cur.innerHTML) : (cur.innerHTML + problemFinsh())
                } else if (status == STATUS['notac']) {
                    cur.innerHTML = install_pos() ? (problemsTry() + cur.innerHTML) : (cur.innerHTML + problemsTry())
                } else {
                    if (problemsNo()) {
                        cur.innerHTML = install_pos() ? (problemsNo() + cur.innerHTML) : (cur.innerHTML + problemsNo())
                    }
                }
                cache[ID] = status == null ? 'null' : status
                if (cur.parentElement) {
                    cur.parentElement.status = cache[ID]
                }
            }).catch(ignore => {
                // console.log('error', error)
            });
        }

    }
    console.log('cache num :', uid, ',update cnt', updateCnt, ',tot:', A.length)


    if (reload) {
        let cnt = 10;
        let timeId = setInterval(() => {
            Cache.set(local_ok_problem_key, cache)
            cnt--
            if (cnt == 0) {
                window.clearInterval(timeId)
            }
        }, 3000);
    }

}

// 监听题目提交状态
export const submitProblems = (url = window.location.href) => {
    const ID = getId(url)
    if (!ID) {
        return
    }
    setTimeout(() => {
        // console.log('watching ...', GM_getValue(local_ok_problem_key))
        const cache = getLocalProblemStatus()
        console.log('ID:', ID, 'query status: ', cache[ID])
        // 对于ac状态题目不必查询
        if (cache[ID] == undefined || cache[ID] != STATUS['AC']) {
            fetch('https://leetcode.cn/graphql/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData(ID)),
            }).then(res => res.json()).then(response => {
                const status = response?.data?.question?.status
                if (cache[ID] != status) {
                    cache[ID] = status == null ? 'null' : status
                    console.log('save local status :', cache[ID])
                    Cache.set(local_ok_problem_key, cache)
                }
            }).catch(ignore => {
                // console.log('error', error)
            });
        }
    }, 500);

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
    return [cnt, A.length]
}


function getLocalProblemStatus() {
    return Cache.get(local_ok_problem_key, true, Object.name)
}

