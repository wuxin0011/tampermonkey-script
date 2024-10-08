let customHeader = `
from collections import  *
from functools import  *
from itertools import  *
from typing import *
from heapq import *
from bisect import *
# from sortedcontainers  import *
inf = float('inf')

ma = lambda x,y : x if x > y else y
mi = lambda x,y : x if x < y else y
`



class DefaultParseCode {
    constructor(code, testcase) {
        this.code = code
        this.testcase = testcase
        this.init()
    }
    init() {
        // console.log(this.code)
        this.initStr = this.parseInit(this.code)
        this.methodName = this.findMethodName(this.initStr)
        this.args = this.parseArgs(this.initStr)
        this.newObj = this.buildObj()
        this.importHeader = customHeader
        this.customMethod = ''
        this.parseResult = this.hander()
        // console.log('this.parse = ', this.parseResult)
    }
    parseInit(s) {
        if (!s) return ''
        let i = s.indexOf('Solution')
        if (i > 0) {
            s = s.substring(i)
            i = s.indexOf('def')
            if (i == -1) return ''
            let temp = ''
            for (let j = i, deep = 0; j < s.length; j++) {
                temp += s[j]
                if (s[j] == '(') {
                    deep++
                } else if (s[j] == ')') {
                    deep--
                    if (deep == 0) {
                        return temp
                    }
                }
            }
        }
        return ''
    }

    parseArgs(s) {
        if (!s) return []
        // console.log('ans:',s)
        let st = s.indexOf('(')
        if (st == -1) {
            return []
        }
        let ans = []
        // console.log('st',st)
        for (let i = st, dot = 0, variable = '', varType = '', flag = 0, d = 0; i < s.length; i++) {
            let c = s[i]
            switch (c) {
                case '(':
                    d++
                    break
                case ')':
                    d--
                    if (d == 0) {
                        if (dot > 0 && variable && varType) {
                            ans.push({ 'variable': variable.trim(), 'varType': varType.trim() })
                            variable = varType = ''
                        }
                        return ans
                    }
                    break
                case ',':
                    dot++
                    if (dot > 0 && flag > 0 && variable && varType) {
                        ans.push({ 'variable': variable.trim(), 'varType': varType.trim() })
                        variable = varType = ''
                    }
                    flag = 1
                    break
                case ':':
                    flag = 2
                    break
                case ' ':
                    break
                default:
                    if (dot == 0 || d == 0) {
                        // ignore
                    } else {
                        if (flag == 1) {
                            variable += c
                        } else if (flag == 2) {
                            varType += c
                        }
                    }
                    break
            }
        }
        return ans
    }

    findMethodName(s) {
        if (!s) return
        let st = s.indexOf('def')
        if (st == -1)
            return ''
        let t = ''
        for (let i = st + 'def'.length; i < s.length; i++) {
            if (s[i] == '(') break
            if (s[i] == '\b' || s[i] == '\f') continue
            t += s[i]
        }
        t = t.trim()
        if(!t) throw new Error('函数名解析失败！')
        return t
    }

    buildObj() {
        let callArgs = ''
        let p = this.args
        let s = this.testcase

        for (let i = 0; i < p.length; i++) {
            callArgs += p[i].variable + (i == p.length - 1 ? "" : ",")
        }
        let temp = ''
        let obj = '\nsol = Solution()'
        for (let j = 0, i = 0, val = ''; j < s.length; val = '', j++) {
            if (s[j] == '\n') continue;
            for (; j < s.length && s[j] != '\n'; j++) {
                val += s[j]
            }
            const variableName = i >= p.length ? null : p[i].variable
            // const varType = i >= p.length ? null : p[i].varType
            val = val.trim()
            // console.log('i:', i, p.length, i % p.length == 0)
            if (i >= p.length) {
                temp += `\n# expect = ${val}`
                temp += `\nprint(sol.${this.methodName}(${callArgs}))`
                i = -1
            } else {
                if (i == 0 && val) {
                    temp += obj
                }
                if (val) {
                    temp += `\n${variableName} = ${val}`
                }
            }

            i++
        }
        return temp
    }

    hander() {
        return `
        ${this.importHeader}
        ${this.customMethod}
        ${this.code}
        ${this.newObj}
        `
    }



}

export default DefaultParseCode



