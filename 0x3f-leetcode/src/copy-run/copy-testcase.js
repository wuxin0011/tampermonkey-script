const copyErrorFlag = "COPY_ERROR_FLAG"
function parseText(text) {
    if (!text) return
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
        for (let sel of ['.example-block', 'pre', 'blockquote']) {
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

export function copyTestCase() {
    let selectors = ['div[data-track-load="description_content"]', '.question-content.source-content', '#qd-content .FN9Jv']
    let ok = false
    for (let selector of selectors) {
        var testCases = parseExampleInputOutPut(selector)
        ok = testCases && testCases.indexOf(copyErrorFlag) == -1
        if (ok) {
            return testCases
        }
    }
    return null

}
