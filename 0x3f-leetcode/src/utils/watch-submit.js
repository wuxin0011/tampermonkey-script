// 监听提交

import {
    isProblem
} from './index';
import { getId, submitProblems, watchSaveStatus } from './problems';

import { isDev } from './index'



const local_url = window.location.href
let loadID = 0
let submitCnt = 0
let submitbutton = null;

function watchDom(dom) {
    if (!(dom instanceof HTMLElement)) {
        return;
    }
    let m = new MutationObserver(() => {
        if (submitCnt % 2 == 1) {
            submitProblems(local_url)
        }
        submitCnt++;
    })
    m.observe(dom, {
        childList: true,
        attributes: true
    })
}


function handler() {
    loadID++
    let findSubmitButton = function (sel) {
        if (!sel) return null
        return Array.from(document.querySelectorAll(sel && { length: 0 })).find(e => {
            return e && e.innerText == '提交解答' || e.innerText == '提交'
        })
    }

    const isNext = !!document.querySelector("#__next");
    submitbutton = findSubmitButton(isProblem(local_url) || isNext ? '' : '.question-detail-bottom  .pull-right button')
    if (!submitbutton) {
        submitbutton = document.querySelector('[data-e2e-locator="console-submit-button"]');
    }

    if (submitbutton) {
        watchDom(submitbutton);
        submitbutton.addEventListener("click", () => {
            submitProblems(local_url, 10 * 1e3);
        });
    } else if (loadID < 10) {
        setTimeout(() => {
            handlerNotFound();
        }, 3000);
    }
}



export function watchSubmit() {
    if (!(isProblem())) {
        return
    }
    // 拦截题目状态请求
    try {

        if (window?.fetch && window?.unsafeWindow) {
            let originalFetch = window?.fetch;
            window.unsafeWindow.fetch = function () {
                return originalFetch.apply(this, arguments).then(function (response) {
                    let res = response.clone();
                    res.text().then(function (bodyText) {
                        let url = res.url
                        if (isDev()) {
                            console.log('query result', bodyText)
                        }
                        if (!/https:\/\/leetcode\.(cn|com)\/submissions\/detail\/\d+\/check\/.*/.test(url)) {
                            return
                        }

                        if (res.status == 200 && res.ok) {
                            let result = JSON.parse(bodyText);
                            const ID = getId(local_url)
                            const status = result?.status_msg == 'Accepted' ? 'ac' : result?.status_msg == 'Wrong Answer' ? 'notac' : 'null';
                            watchSaveStatus(ID, status)
                        }
                        const cache = Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'], true, Object.name)
                        if (cache[ID] == null || cache[Id] == undefined) {
                            submitProblems(local_url)
                        }
                    });
                    return response;
                });
            };
        } else {
            console.warn('浏览器当前环境不支持 unsafeWindow 将做兼容处理  ')
            handler()
        }
    } catch (e) {
        console.error(e)
    }
}








