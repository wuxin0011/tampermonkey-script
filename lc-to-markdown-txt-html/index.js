// ==UserScript==
// @name         lc-to-markdown-txt-html
// @author       wuxin0011
// @version      0.0.1
// @namespace    https://github.com/wuxin0011/tampermonkey-script/tree/main/lc-to-markdown-txt-html
// @description  力扣题目描述,讨论发布内容复制 复制为 markdown、txt、html 等格式
// @icon         data:image/png;base64,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
// @match        https://leetcode.cn/circle/discuss/*
// @match        https://leetcode.cn/problems/*
// @require      https://cdn.bootcdn.net/ajax/libs/clipboard.js/2.0.11/clipboard.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/turndown/7.1.2/turndown.min.js
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @license      MIT
// ==/UserScript==





(function () {
    'use strict';
    const url = window.location.href
    const HTML_CONVERT = '__HTML_CONVERT__'
    const TXT_CONVERT = '__TXT_CONVERT__'
    const MARKDOWN_CONVERT = '__MARKDOWN_CONVERT__'
    const markdownURL = "https://stonehank.github.io/html-to-md/"

    const isDiscuss = () => url.indexOf('https://leetcode.cn/circle/discuss') != -1
    const isProblem = () => url.indexOf('https://leetcode.cn/problems') != -1



    // 
    const use = (key) => typeof GM_getValue(key) == 'undefined' ? true : GM_getValue(key)
    const isUseMarkDown = () => use(MARKDOWN_CONVERT)
    const isUseTxt = () => use(TXT_CONVERT)
    const isUseHTML = () => use(HTML_CONVERT)
    console.log('markdown', isUseMarkDown(), 'txt', isUseTxt(), 'html', isUseHTML())


    const SUPPORT_TYPE = {
        'md': 'md',
        'txt': 'txt',
        'html': 'html'
    }

    const buttons = []
    const targetClass = 'my-button-target'
    const BUTTON_ID = `#${targetClass}`
    for (let i = 0; i < 3; i++) {
        const temp = document.createElement('button')
        temp.style.marginLeft = '10px'
        const type = i == 0 ? SUPPORT_TYPE['md'] : i == 1 ? SUPPORT_TYPE['txt'] : SUPPORT_TYPE['html']
        temp.title = `复制为 ${type == 'md' ? 'markdown' : type} 格式`
        temp.textContent = type
        buttons.push(temp)
    }

    // markdown button
    const markdownButton = buttons[0]
    markdownButton.id = targetClass
    markdownButton.style.display = isUseMarkDown() ? 'inline-block' : 'none'

    // txt button
    const txtButton = buttons[1]
    txtButton.style.display = isUseTxt() ? 'inline-block' : 'none'

    // html button
    const htmlButton = buttons[2]
    htmlButton.style.display = isUseHTML() ? 'inline-block' : 'none'

    function getHtmlContent(className) {
        const htmlContent = document.querySelector(className)
        return htmlContent ? htmlContent.innerHTML : ''
    }

    function updateElementShow(element) {
        if (!element instanceof HTMLElement) {
            return
        }
        element.style.display = element.style.display == 'none' ? 'inline-block' : 'none'
    }


    function runQuestionActionsContainer() {
        const className = '[class$=MarkdownContent]';
        const questionActionsContainer = document.querySelector('[class*=QuestionActionsContainer]')
        markdownButton.className = 'e11vgnte0 css-yf7o-BaseButtonComponent-ThemedButton ery7n2v0'
        htmlButton.className = 'e11vgnte0 css-yf7o-BaseButtonComponent-ThemedButton ery7n2v0'
        txtButton.className = 'e11vgnte0 css-yf7o-BaseButtonComponent-ThemedButton ery7n2v0'
        const htmlContent = getHtmlContent(className)
        runCopy(questionActionsContainer, markdownButton, htmlContent, SUPPORT_TYPE['md'])
        runCopy(questionActionsContainer, htmlButton, htmlContent, SUPPORT_TYPE['html'])
    }



    const toMarkdown = (htmlContent) => {
        try {
            var turndownService = new TurndownService()
            var markdown = turndownService.turndown(htmlContent)
            return markdown
        } catch (e) {
            if (confirm('markdown转换失败,跳转到网站转换?')) {
                if (window?.navigator?.clipboard?.writeText) {
                    window.navigator.clipboard.writeText(htmlContent).then(() => {
                        window.open(markdownURL, '_blank')
                    }, () => {

                    })
                }
            } else {
                console.error('convert markdown error default convert txt !', e)
                const d = document.createElement('div')
                d.innerHTML = content
                const txt = handlerText(d.textContent)
                return txt
            }
        }
    }



    function runProblems() {
        const buttonClassName = 'relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary text-difficulty-easy dark:text-difficulty-easy'
        const className = "[data-track-load=description_content]"
        let title = document.querySelector('#qd-content [class*=text-title]')
        const titleTxt = title.textContent
        title = title ? '<h2>' + (title?.textContent) + '</h2>' : ''
        let htmlContent = title + getHtmlContent(className)
        let container = document.querySelector(className)
        container = container.previousElementSibling
        markdownButton.className = buttonClassName
        txtButton.className = buttonClassName
        htmlButton.className = buttonClassName
        runCopy(container, markdownButton, htmlContent, SUPPORT_TYPE['md'])
        runCopy(container, txtButton, htmlContent, SUPPORT_TYPE['txt'], titleTxt)
        runCopy(container, htmlButton, htmlContent, SUPPORT_TYPE['html'])
    }


    function copy(w, element) {
        if (!element || !(element instanceof HTMLElement)) {
            return
        }
        try {
            const clipboard = new ClipboardJS(element, {
                text: function () {
                    return w;
                }
            })
            clipboard.on('success', function (e) {
                updateButtonStatus(element)
            })
            clipboard.on('error', function (e) {
                updateButtonStatus(element, 'copy error!')
            })
        } catch (error) {
            // 如果 clipboardjs 引入失败 使用原生的
            // use  navigator writeText
            element.onclick = () => {
                navigator.clipboard.writeText(w).then(() => {
                    updateButtonStatus(element)
                }, () => {
                    updateButtonStatus(element, 'copy error!')
                })
            }

        }

    }

    function runCopy(container, ele, htmlContent, type = SUPPORT_TYPE['md'], title = '') {

        if (!ele || !container || !htmlContent || !type) {
            return
        }
        if (!(container instanceof HTMLElement && ele instanceof HTMLElement)) {
            return;
        }



        // append 
        container.appendChild(ele)



        if (type == SUPPORT_TYPE['md']) {
            const markdown = toMarkdown(htmlContent)
            copy(markdown, ele)
        } else if (type == SUPPORT_TYPE['txt']) {
            const d = document.createElement('div')
            d.innerHTML = htmlContent
            const txt = handlerText(d.textContent, title)
            copy(txt, ele)
        } else if (type == SUPPORT_TYPE['html']) {
            // html
            copy(htmlContent, ele)
        } else {
            console.warn('no support format ' + type)
        }

    }

    const handlerText = (str, title = '') => {
        if (!str) return str
        function isIgnore(c) {
            return c == '\t' || c == '\b' || c == '\n' || c == '\f'
        }
        let newstr = ''
        let find = str.indexOf('提示')
        let tipPos = find == -1 ? str.length : find
        for (let i = 0; i < tipPos; i++) {
            if (isIgnore(str.charAt(i))) {
                continue;
            }
            newstr = newstr + str.charAt(i)
        }
        newstr = newstr.replaceAll('示例', '\n\n示例')

        if (tipPos != str.length) {
            newstr = newstr + str.substring(find)
            newstr = newstr.replace('提示', '\n\n提示')
        }

        if (title) {
            newstr = newstr.replace(title, `${title}\n\n`)
        }

        let i = newstr.length
        for (; i >= 0; i--) {
            let c = newstr.charAt(i)
            if (!(isIgnore(c) || c == ' ')) {
                break
            }
        }
        return newstr.substring(0, i)
    }


    const updateButtonStatus = (element, newText = 'copy success !', newClass = '', timeout = 1500) => {
        if (!element) {
            return;
        }
        const origin = element.textContent
        const originClass = element.className
        element.textContent = newText
        if (newClass) {
            element.className = newClass
        }
        setTimeout(() => {
            element.textContent = origin
            element.className = originClass
        }, timeout)
    }




    const initConmand = () => {
        try {

            // const message = (u, type) => u ? '关闭' : '启用' + (type == 'md' ? ' markdown ' : ` ${type} `)

            const html_to_markdown = GM_registerMenuCommand(`${isUseMarkDown() ? '关闭' : '启用'} markdown `, () => {
                GM_setValue(MARKDOWN_CONVERT, !isUseMarkDown())
                updateElementShow(markdownButton)
            }, { title: `点击 ${isUseMarkDown() ? '关闭' : '启用'} markdown ` })


            const html_to_txt = GM_registerMenuCommand(`${isUseTxt() ? '关闭' : '启用'} txt `, () => {
                GM_setValue(TXT_CONVERT, !isUseTxt())
                updateElementShow(txtButton)
            }, { title: `点击 ${isUseTxt() ? '关闭' : '启用'} txt ` })

            const html_to_html = GM_registerMenuCommand(`${isUseHTML() ? '关闭' : '启用'} html  `, () => {
                GM_setValue(HTML_CONVERT, !isUseHTML())
                updateElementShow(htmlButton)
            }, { title: `点击 ${isUseHTML() ? '关闭' : '启用'} html ` })




            const html_to_markdown_web = GM_registerMenuCommand('html转换markdown网站', () => {
                window.open(markdownURL, '_blank')
            }, { title: '如果格式转换有问题，请复制为 html 然后用这个网站转换' })



        } catch (e) {
            console.log('init command error', e)
        }

    }



    window.onload = () => {
        let support = true
        let timer = setInterval(() => {

            if (isDiscuss()) {
                runQuestionActionsContainer()
            } else if (isProblem()) {
                runProblems()
            } else {
                support = false
            }

            if (support) {
                initConmand()
                const my_button = document.querySelector(BUTTON_ID)
                if (my_button) {
                    window.clearInterval(timer)
                }
            } else {
                console.warn('No support address ! ', url)
                window.clearInterval(timer)
            }
        }, 3000);
    }
})();