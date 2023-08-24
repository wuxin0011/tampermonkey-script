// const
const prefix = '[live-plugin]:'
const msg = (...args) => `${prefix} ${args}`
const emptyMehtod = (...args) => { }
// export methods
export const log = (...args) => console.log(msg(args))
export const warn = (...args) => console.warn(msg(args))
export const error = (...args) => console.error(msg(args))
export const info = (...args) => console.info(msg(args))
export const douyu_address_pattern = /^https:\/\/.*\.douyu\.((com)|(cn)).*/
export const bilibili_address_pattern = /^https:\/\/.*\.bilibili\..*/
export const huya_address_pattern = /^https:\/\/.*\.huya\.((com)|(cn)).*/
export const douyin_address_pattern = /^https:\/\/.*\.huya\.((com)|(cn)).*/
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
export const source_code_url = 'https://github.com/wuxin0011/huya-live' // 源码地址
export const isImage = (file) => /.*(\.(png|jpg|jpeg|apng|avif|bmp|gif|ico|cur|svg|tiff|webp))$/.test(file)
export const querySelector = (el, sel) => !!el && !!sel && el instanceof HTMLElement ? el.querySelector(sel) : (el ? wd.querySelector(el) : emptyMehtod)
export const querySelectorAll = (el, sel) => !!el && !!sel && el instanceof HTMLElement ? el.querySelectorAll(sel) : (el ? wd.querySelectorAll(el) : emptyMehtod)
export const addEventListener = (el, type, callback) => !!el && type && typeof callback === 'function' ? el === wd || el instanceof HTMLElement ? el.addEventListener(type, callback, false) : false : false
export const createElement = (tag) => !!tag && wd.createElement(tag)
export const appendChild = (el1, el2) => (!!el1 && !!el2 && (el1 instanceof HTMLElement) && (el2 instanceof HTMLElement)) && el1.appendChild(el2)
export const insertChild = (el1, el2) => (!!el1 && !!el2 && (el1 instanceof HTMLElement) && (el2 instanceof HTMLElement)) && el1.insertBefore(el2, el1.firstChild)
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

export const addLocalStore = (k, v = [], type = Array.name, isParse = true) => (type == Object.name || type == Array.name) && isParse ? wls.setItem(k, JSON.stringify(v)) : wls.setItem(k, v)
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
            if (element) {
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
        if (element) {
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
            if (element) {
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


export const findFullSreenButton = (sel = 'body', key = 'full_screen_button_class_or_id', text = '全屏', tagName = 'div') => {
    const container = querySelector(sel)
    if (container) {
        const nodes = querySelectorAll(container, tagName)
        if (isArray(nodes)) {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i]?.title === text || nodes[i]?.textContent === text) {
                    let classId = `${sel} ${nodes[i].id ? nodes[i].id : nodes[i].class}`
                    addLocalStore(key, classId, String.name, false)
                    return classId

                }
            }
        }
    }
    return null
}





export class HostUser {
    constructor(roomId, name) {
        this.roomId = roomId;
        this.name = name;
    }
}



