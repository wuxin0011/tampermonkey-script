// ==UserScript==
// @name         copy-testcase
// @namespace    https://leetcode.cn/
// @version      0.0.1
// @description  一键复制所有样例输入
// @author       wuxin0011
// @match        https://leetcode.cn/problems/*
// @match        https://leetcode.cn/contest/weekly-contest-*/problems/*
// @match        https://leetcode.cn/contest/biweekly-contest-*/problems/*
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @resource     notycss https://cdn.jsdelivr.net/npm/noty@3.1.4/lib/noty.min.css
// @require      https://cdn.jsdelivr.net/npm/noty@3.1.4/lib/noty.min.js
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    GM_addStyle(GM_getResourceText('notycss'));
    const copyErrorFlag = 'Input or Output Error'
    const localUrl = window.location.href
    function isContest() {
        return localUrl.indexOf('https://leetcode.cn/contest/biweekly-contest') != -1 || localUrl.indexOf('https://leetcode.cn/contest/weekly-contest') != -1
    }
    function isProblem() {
        return localUrl.indexOf('https://leetcode.cn/problems/') != -1
    }

    function parseText(text) {
        if (!text) return
        // console.log('text:', text)
        let ans = []
        let isEngLish = false
        let inputRegexZh = /输入:?\s?(.*)输出/s
        let outputRegexZh = /输出:?\s?(\S+)/s
        let inputRegexEn = /Input:?\s+?(.*)Output/s
        let outputRegexEn = /Output:?\s+?(\S+)/s
        let input = text.match(inputRegexZh)
        if (!input) {
            input = text.match(inputRegexEn)
            if (!input) {
                return ans
            }
            isEngLish = true
        }
        let arg = null
        if (input && Array.isArray(input)) {
            let temp = input[1], deep = 0
            // console.log(temp)
            for (let c of temp) {
                if (c == ' ' || c == '\n' || c == '\b' || c == '\t' || c == '\f' || c == '\'' || c == '\"') {
                    continue
                }
                switch (c) {
                    case '[':
                        deep++
                        if (arg == null) arg = ''
                        arg += c
                        break
                    case ']':
                        deep--
                        if (arg == null) {
                            ans.push(copyErrorFlag)
                        }
                        arg += c
                        if (deep == 0 && arg != null) {
                            ans.push(arg)
                            arg = null
                        }
                        break
                    case ',':
                        if (arg != null) {
                            if (deep == 0) {
                                ans.push(arg)
                                arg = null
                            } else {
                                arg += c
                            }
                        }
                        break
                    case '=':
                        arg = ''
                        break
                    default:
                        if (arg == null) arg = ''
                        arg += c
                        break

                }
            }

            if (arg != null) {
                ans.push(arg)
            }
        }

        let result = isEngLish ? outputRegexEn.exec(text) : outputRegexZh.exec(text)
        // console.log(isEngLish, result)
        ans.push(Array.isArray(result) && result.length > 1 ? result[1].replace(':').replace('：', "") : copyErrorFlag)
        return ans
    }


    function parseExampleInputOutPut(selector) {
        let dom = document.querySelector(selector)
        function getTestCase(sel) {
            let testCases = []
            const nodes = document.querySelectorAll(sel)
            for (let node of nodes) {
                let ans = parseText(node?.textContent)
                testCases.push(...ans)
                if (ans.length > 0) testCases.push('\n')
            }
            return testCases
        }

        let str = ''
        if (!dom) {
            console.error("NOT Find dom selector ", selector)
        } else {
            let result;
            for (let sel of ['.example-block', 'pre','blockquote']) {
                result = getTestCase(sel)
                let temp = result.join('\n').replace('\n', '')
                if (temp && temp.indexOf(copyErrorFlag) == -1) {
                    break
                }
            }
            str = result.join('\n')
        }
        return str.replace(/\\n\\n\\n/g, '\n\n').replace(/\\n\\n$/g, '')
    }

    function copyAllTestCase() {
        let selectors = ['div[data-track-load="description_content"]','.question-content.source-content','#qd-content .FN9Jv']
        let ok = false
        for(let selector of selectors ) {
            var testCases = parseExampleInputOutPut(selector)
            ok = testCases && testCases.indexOf(copyErrorFlag) == -1
            if (ok) {
                GM_setClipboard(testCases);
                break
            }
        }
        new Noty({
            type: `${ok ? 'success' : 'error'}`,
            layout: "topRight",
            text: `复制${ok ? '成功🥰' : '失败😥'}`,
            timeout: 2000
        }).show();
        return ok

    }





    function findCase() {
        let set = new Set()
        let tempcase = ""
        for(let  button of document.querySelectorAll('button')) {
            if(button.textContent.indexOf('Case') != -1) {
                let con = button.parentElement.parentElement.parentElement
                let dom = con.querySelector('div.space-y-4')
                let pre = ''
                let size = 0
                let doms = []
                for(let div of dom.querySelectorAll('div')) {
                    if(!div.getAttribute('spellcheck')) {
                        continue;
                    }
                    doms.push(div)
                    size++
                }
                for(let div of doms) {
                    if(!div.getAttribute('spellcheck')) {
                        continue;
                    }
                    pre += div.textContent
                    pre += '\n'
                }
                if(!set.has(pre)) {
                    tempcase += pre
                }
                set.add(pre)
            }
        }
        return tempcase
    }



    function findErrorCase() {
        let t = null;
        for(let dom of Array.from(document.querySelectorAll('h3') || {length : 0})) {
            if(dom.textContent.indexOf('解答错误') != -1 && dom.textContent.indexOf('测试用例') != -1) {
                t = dom;
                break;
            }
        }

        // console.log('t',t)


        let text = ''
        if(t) {
            let container = t.parentElement.parentElement.parentElement
            let d = container.querySelector('div.flex.w-full.flex-col.gap-4 .space-y-4 .relative')

            for(let dom of d.querySelectorAll('div.space-y-2 div.align-middle')) {
                text += dom.textContent
                text += '\n'
            }

            let ds = Array.from(container.querySelectorAll('div.flex.w-full.flex-col.gap-4 .space-y-4 .flex') || {length:0})
            for(let dom of ds){
                if(dom.querySelector('span.text-green-s')){
                    text += dom.querySelector('span.text-green-s').textContent
                    text += '\n'
                    break;
                }
            }

        }
        return text
    }




    function copyTestCase(cur_case) {
        if(cur_case) {
            GM_setClipboard(cur_case);
        }
        new Noty({
            type: `${cur_case ? 'success' : 'error'}`,
            layout: "topRight",
            text: `复制${cur_case ? '成功🥰' : '失败😥'}`,
            timeout: 2000
        }).show();
        if(cur_case){
            new Noty({
                type: `info`,
                layout: "topRight",
                text: `${cur_case}`,
                timeout: 2000
            }).show();
        }
        return cur_case
    }


    function copycurCase() {
        let case0 = findCase()
        copyTestCase(case0)
    }
    function copycurErrorCase() {
        let case0 = findErrorCase()
        copyTestCase(case0)
    }
     GM_registerMenuCommand("复制当前样例😜", copycurCase);
     GM_registerMenuCommand("复制错误样例😭", copycurErrorCase);
     GM_registerMenuCommand("复制全部样例😍", copyAllTestCase);
})();