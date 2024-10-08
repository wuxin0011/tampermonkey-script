
import { ElMessage } from 'element-plus'
import { copyTestCase } from './copy-testcase'
import { GM_setClipboard } from '$'
import Python3Parse from "./template/python3";
import JavaParse from "./template/java";
import JavaScriptParse from "./template/javascript";
import DefaultParseCode from "./template/root";
// import { supportLang, getCodeAndTestCase } from "../parse";


let text = `
    <div class="relative flex overflow-hidden rounded bg-fill-tertiary dark:bg-fill-tertiary">
        <div
            class="group flex flex-none items-center justify-center hover:bg-fill-quaternary dark:hover:bg-fill-quaternary">
            <div class="flex cursor-pointer p-2 text-gray-60 dark:text-gray-60" data-state="closed">
                <div class="relative text-[16px] leading-[normal] before:block before:h-4 before:w-4">
                    <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M4 4l1-1h5.414L14 6.586V14l-1 1H5l-1-1V4zm9 3l-3-3H5v10h8V7z" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 1L2 2v10l1 1V2h6.414l-1-1H3z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
`

export function supportLang() {
    return JSON.parse(localStorage.getItem('ugc_agitated-curranfnd_lang'))
}

function getLocalSnippet() {
    try {
        if (document.title.match(/\d+/)) {
            let NO = document.title.match(/\d+/)
            let key = `ugc_agitated-curranfnd_${NO}_${supportLang().replace('')}_code `
            let code = localStorage.getItem(key)
            if (!code) return ''
            console.log('local', JSON.parse(code)?.code, 'key', key)
            return JSON.parse(code)?.code
        }
    } catch (e) {
        console.error('error', e)
        return ''
    }
}


function wrapper(s) {
    if (!s) return ''
    let lang = supportLang()
    if (lang == 'python3') {
        // lang class Solution:
        // console.log('class Solution:', s.indexOf('class Solution'))
        for (let i = 0; i < 20; i++) {
            s = s.replace(' class Solution:', 'class Solution:')
        }
        return s.replace('        class Solution:', 'class Solution:')
    }
    return s

}




export function parse() {
    console.log('current lang->', supportLang())
    let editor = document.querySelector('#editor')
    let code = getLocalSnippet()
    if (!code) {
        code = ''
        if (editor) {
            let lines = editor.querySelectorAll('.view-line')
            for (let line of lines) {
                if (!line) continue
                let texts = line.querySelectorAll('[class^=mt]')
                let s = ''
                for (let textDom of texts) {
                    if (!textDom) continue
                    s += textDom.textContent
                }
                // console.log(s)
                code += s + "\n"
            }
            // console.log(code)
        }
    }


    let testcase = copyTestCase()

    if (code) {
        code = code.replaceAll(' ', ' ')
        code = code.replaceAll('&nbsp;', ' ')
        // code = code.replaceAll(/\r\n+/g, ' ');
    }
    const T = supportLang()
    if (T == 'python3') {
        return wrapper(new Python3Parse(code, testcase).parseResult)
    } else if (T == 'Java' || T == 'java') {
        return new JavaParse(code, testcase)?.parseResult || ''
    }
    // else if (T == 'javascript' || T == 'js') {
    //     return new JavaScriptParse(code, testcase)?.parseResult || ''
    // } 
    else {
        throw new Error(`很抱歉! 暂不支持 ${T} 😥`)
    }
}


