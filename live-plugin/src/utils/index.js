const exculues = [
    'https://i.huya.com/',
    'https://www.douyu.com/member/',
    'https://yuba.douyu.com/',
    'https://manga.bilibili.com/',
    'https://account.bilibili.com/',
    'https://member.bilibili.com/',
    'https://show.bilibili.com/',
    'https://www.bilibili.com/cheese',
    'https://pay.bilibili.com/',
    'https://show.bilibili.com/',
    'https://link.bilibili.com/'
]
const prefix = '[live-plugin]:'
const msg = (...args) => `${prefix} ${args}`
const emptyMethod = (...args) => { console.warn(`${prefix} run empty method...`) }
export const log = (...args) => console.log(msg(args))
export const warn = (...args) => console.warn(msg(args))
export const error = (...args) => console.error(msg(args))
export const info = (...args) => console.info(msg(args))
export const douyu_address_pattern = /^https:\/\/www\.douyu\.((com)|(cn)).*/
export const bilibili_address_pattern = /^https:\/\/.*\.bilibili\..*/
export const huya_address_pattern = /^https:\/\/www\.huya\.((com)|(cn)).*/
export const douyin_address_pattern = /^https:\/\/.*\.douyin\.((com)|(cn)).*/
export const localhost = /^http:\/\/127\.0\.0\.1\.*|^http:\/\/localhost.*/
export const local_url = window.location.href
export const is_huya = huya_address_pattern.test(local_url) // 是否是虎牙地址
export const is_douyu = douyu_address_pattern.test(local_url) // 是否是斗鱼地址
export const is_bilibili = bilibili_address_pattern.test(local_url) // bilibili
export const is_douyin = douyin_address_pattern.test(local_url) // douyin
export const is_localhost = localhost.test(local_url) // 本地环境
export const wd = window.document
export const wls = window.localStorage
export const download_plugin_url = 'https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD' // 下载地址
export const source_code_url = 'https://github.com/wuxin0011/tampermonkey-script/live-plugin' // 源码地址
export const isImage = (file) => /.*(\.(png|jpg|jpeg|apng|avif|bmp|gif|ico|cur|svg|tiff|webp))$/.test(file)
export const querySelector = (el, sel) => !!el && !!sel && el instanceof HTMLElement ? el.querySelector(sel) : (el ? wd.querySelector(el) : emptyMethod)
export const querySelectorAll = (el, sel) => !!el && !!sel && el instanceof HTMLElement ? el.querySelectorAll(sel) : (el ? wd.querySelectorAll(el) : emptyMethod)
export const addEventListener = (el, type, callback) => !!el && type && typeof callback === 'function' ? el === wd || el instanceof HTMLElement ? el.addEventListener(type, callback, false) : false : false
export const createElement = (tag) => !!tag && wd.createElement(tag)
export const appendChild = (el1, el2) => (!!el1 && !!el2 && (el1 instanceof HTMLElement) && (el2 instanceof HTMLElement)) && el1.appendChild(el2)
export const insertChild = (el1, el2) => (!!el1 && !!el2 && (el1 instanceof HTMLElement) && (el2 instanceof HTMLElement)) && el1.insertBefore(el2, el1.firstChild)
export const is_exculues = exculues.filter(url => local_url.indexOf(url) !== -1).length !== 0

export const addStyle = (str) => {
    if (window?.GM_addStyle && typeof window.GM_addStyle == 'function') {
        window.GM_addStyle(str)
    } else {
        let head = querySelector('head')
        let style = createElement('style')
        style.innerText = str
        head.appendChild(style)
    }
}







export const removeDOM = (element, realRemove = false) => {
    try {
        if (!(element instanceof HTMLElement)) {
            element = querySelector(element)
        }
        if (element instanceof HTMLElement) {
            element.style.display = 'none'
            if (realRemove) {
                element.remove()
            }
        }
    } catch (e) {
        error(e)
    }
}
export const s2d = (string) => new DOMParser().parseFromString(string, 'text/html').body.childNodes[0]

export const isArray = (a) => a && a?.length > 0


export const timeoutSelectorAll = (selector, callback, time = 0) => {
    if (typeof callback != 'function') {
        warn('callback should is a function!')
        return;
    }
    setTimeout(() => {
        const nodes = querySelectorAll(selector)
        if (isArray(nodes)) {
            callback(nodes)
        }
    }, time)
}

export const timeoutSelectorAllOne = (selector, callback, time = 0) => {
    if (typeof callback != 'function') {
        warn('callback should is a function!')
        return;
    }
    setTimeout(() => {
        const nodes = querySelectorAll(selector)
        if (isArray(nodes)) {
            for (let node of nodes) {
                callback(node)
            }
        }
    }, time)
}

export const timeoutSelector = (selector, callback, time = 0) => {
    if (typeof callback != 'function') {
        warn('callback should is a function!')
        return;
    }
    setTimeout(() => {
        const logoNode = querySelector(selector)
        if (logoNode) {
            callback(logoNode)
        }
    }, time)
}

export const onload = (callback) => window.onload = callback


export const getLocalStore = (k, type = Array.name, isParse = true) => {
    let obj = wls.getItem(k);
    if (type === Array.name) {
        if (isParse && obj) {
            obj = JSON.parse(obj);
        }
        return Array.isArray(obj) ? obj : [];
    }
    if (type === Object.name) {
        if (isParse && obj) {
            obj = JSON.parse(obj);
        }
        return obj ? obj : {};
    }
    if (type === String.name) {
        return obj ? obj : "";
    }
    if (type === Boolean.name) {
        return obj === "true" || obj === true;
    }
    return obj;
}

export const addLocalStore = (k, v = [], type = Array.name, isParse = true) => (type === Object.name || type === Array.name) && isParse ? wls.setItem(k, JSON.stringify(v)) : wls.setItem(k, v)
export const removeVideo = (selector, time1 = 100, maxCount = 1000) => {
    let count = 0
    let video_timer = setInterval(() => {
        try {
            const video = querySelector(selector)
            if (video && video instanceof HTMLVideoElement) {
                video.pause()
            }
            removeDOM(video, false)
            if (count >= maxCount) {
                clearInterval(video_timer)
            }
            count = count + 1
        } catch (e) {
        }
    }, time1)
}

export const throttle = (wait, func, ...args) => {
    let pre = Date.now();
    return () => {
        if (Date.now() - pre > wait) {
            func(...args)
            pre = Date.now()
        }
    }
}

export const intervalRemoveElement = (selectors, time = 160, maxCount = 1000) => {
    if (!isArray(selectors)) {
        warn(`selectors 必须是数组 : ${selectors}`)
        return;
    }
    let count = 0
    let timer = setInterval(() => {
        selectors.forEach(sel => {
            removeDOM(sel, true)
        })
        if (count >= maxCount) {
            clearInterval(timer)
            return;
        }
        count = count + 1
    }, time)
}

export const loopDo = (callback, count = 100, wait = 100) => {
    if (typeof callback != 'function') {
        warn('callback is a function!')
        return;
    }
    let timer = setInterval(() => {
        count--
        if (count === 0) {
            clearInterval(timer)
        } else {
            callback(timer)
        }
    }, wait)
}


export const findMark = (selector, callback, count = 100, wait = 100) => {
    if (!selector) {
        warn('selector not allow  or null !')
        return;
    }
    if (typeof callback != 'function') {
        warn('callback is a function!')
        return;
    }
    loopDo((timer) => {
        try {
            let element = selector instanceof HTMLElement ? selector : querySelector(selector)
            if (element && element instanceof HTMLElement) {
                let isMark = element.getAttribute('mark')
                if (!isMark) {
                    element.setAttribute('mark', true)
                    callback(element)
                } else {
                    clearInterval(timer)
                }
            }
        } catch (e) {
            clearInterval(timer)
            error(e)
        }

    }, 100, 100)

    setTimeout(() => {
        let element = selector instanceof HTMLElement ? selector : querySelector(selector)
        if (element && element instanceof HTMLElement) {
            let isMark = element.getAttribute('mark')
            if (!isMark) {
                element.setAttribute('mark', true)
                callback(element)
            }
        }
    }, 5000);
}


export const setTimeoutMark = (selector, callback, wait = 0) => {
    if (!selector) {
        warn('selector not allow  or null !')
        return;
    }
    if (typeof callback != 'function') {
        warn('callback is a function!')
        return;
    }
    let timer = setTimeout(() => {
        try {
            let element = selector instanceof HTMLElement ? selector : querySelector(selector)
            if (element && element instanceof HTMLElement) {
                let isMark = element.getAttribute('mark')
                if (!isMark) {
                    element.setAttribute('mark', true)
                    callback(element)
                } else {
                    clearInterval(timer)
                }
            }
        } catch (e) {
            clearInterval(timer)
            error(e)
        }
    }, wait);

}


export const backgroundNone = (element, selectors = ['.layout-Main'], time = 100, maxCount = 500) => {
    if (!(element instanceof HTMLElement) || !isArray(selectors)) {
        warn(`element 参数应是 元素， selector 应该是元素选择器集合`)
        return;
    }
    let count = 0
    let timer = setInterval(() => {
        selectors.forEach(sel => {
            let b = querySelector(element, sel)
            if (!(b instanceof HTMLElement)) {
                return;
            }
            b.style.backgroundImage = 'none'
        })
        // 结束计时器 减少浏览器性能开销
        if (count >= maxCount) {
            clearInterval(timer)
            return;
        }
        count = count + 1
    }, time)

}


export const uploadImage = (file, callback) => {
    try {
        // 图片格式校验
        if (!isImage(file?.name)) {
            return alert("图片格式不正确！")
        }
        let fileReader = new FileReader()
        // 转码
        fileReader.readAsDataURL(file)
        fileReader.onerror = (e) => {
            return alert('图片解析失败！' + JSON.stringify(e))
        }
        fileReader.onload = (e) => {
            let base64 = e.target.result
            let str = base64.slice(base64.indexOf(",") + 1);
            if (atob) {
                str = atob(str);
                let bytes = str.length;
                const size = (bytes / (1024 * 1024)).toFixed(2);
                if (size > 5) {
                    if (confirm('图片保存失败，浏览器最大只能保存5MB大小图片，确认查看原因？')) {
                        window.location.href = 'https://developer.mozilla.org/zh-CN/docs/Web/API/File_and_Directory_Entries_API/Introduction'
                    }
                    return;
                }
                callback(base64)
            } else {
                alert('保存失败，当前浏览器不支持！')
            }

        }

    } catch (e) {
        alert('图片解析失败！')
    }
}

/**
 *
 * @param {容器} sel
 * @param {类名或者ID} key
 * @param {全屏按钮文字内容} text
 * @param {全屏文字标签类型名} tagName
 * @returns
 */
export const findButton = (sel = 'body', key = 'full_screen_button_class_or_id', text = '全屏', tagName = 'div') => {
    const container = querySelector(sel)
    let classId = ''
    if (container) {
        // 先根据className 或者 id查找
        const fullButton = querySelector(container, key)
        if (fullButton && fullButton instanceof HTMLElement && (fullButton?.textContent === text || fullButton?.title === text)) {
            classId = `${sel} ${fullButton.id ? fullButton.id : fullButton.className}`
        }
        if (!classId) {
            // 没找到
            // 从 video中遍历更加tagName查找
            const nodes = querySelectorAll(container, tagName)
            if (isArray(nodes)) {
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i] && nodes[i] instanceof HTMLElement && (nodes[i]?.title === text || nodes[i]?.textContent === text)) {
                        // 保存本次id
                        classId = `${sel} ${nodes[i].id ? nodes[i].id : nodes[i].className}`
                    }
                }
            }
        }
    }
    if (key && classId) {
        addLocalStore(key, classId, String.name, false)
    }
    return classId || key
}


// 是否全屏
export const isFull = () => {
    return !!(document?.fullscreenElement || document?.webkitFullscreenElement || document?.mozFullScreenElement
        || document?.msFullscreenElement)
}

/**
* 监听全屏触发事件
*/
export const addFullScreenEvent = (callback) => {
    if (typeof callback != 'function') {
        returnn;
    }
    document.addEventListener('fullscreenchange', callback);
    document.addEventListener('webkitfullscreenchange', callback);
    document.addEventListener('mozfullscreenchange', callback);
    document.addEventListener('MSFullscreenChange', callback);
}


export const handlerPromise = (result, callback) => {

    if (typeof callback !== 'function') {
        warn('回调函数不能为空！')
        return
    }

    if (!result) {
        warn('请求结果为空！')
        callback(result)
        return;
    }

    // 处理 promise 逻辑
    if (result instanceof Promise) {
        result.then(res => {
            callback(res)
        }).catch(e => {
            error(e)
        })
    } else {
        callback(result)
    }
}

export const handlerDisplay = (element, isBlock) => {
    if (!(element && element instanceof HTMLElement)) {
        return;
    }
    if (isBlock) {
        if (!element.classList.contains('m-container-display-block')) {
            element.classList.add('m-container-display-block')
        }
        if (element.classList.contains('m-container-display-none')) {
            element.classList.remove('m-container-display-none')
        }
    } else {
        if (element.classList.contains('m-container-display-block')) {
            element.classList.remove('m-container-display-block')
        }
        if (!element.classList.contains('m-container-display-none')) {
            element.classList.add('m-container-display-none')
        }
    }
}



export const support = {
    supportSearch() {
        return !is_douyin
    },
    supportAdd() {
        return !is_douyin
    },
    supportReset() {
        return !is_douyin
    },
    supportBg() {
        return !is_douyin && !is_bilibili
    },
    supportMenu() {
        return !is_douyin && !is_bilibili
    },
    supportGift() {
        return !is_douyin && !is_bilibili
    },
    supportAutoFullScreen() {
        return true
    },
    supportAutoViewMaxPro() {
        return true
    },
    supportTable() {
        return !is_douyin
    },
    supportTheme() {
        return !is_douyin
    }
}


export class HostUser {
    constructor(roomId, name) {
        this.roomId = roomId;
        this.name = name;
    }
}





