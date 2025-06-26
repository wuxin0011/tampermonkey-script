import { CUR_URL } from '../utils'
import { postData } from '../utils/problems'
export async function GetHubJSONInfo(url) {
    return fetch(url, {
        method: 'get',
        mode: "cors"
    }).then(res => res.json())
}


export async function getProblemsJSON() {
    return GetHubJSONInfo('https://raw.githubusercontent.com/wuxin0011/tampermonkey-script/0x3f-problem-datasources/new_0x3f.json')
}

export async function getVersion() {
    return GetHubJSONInfo('https://raw.githubusercontent.com/wuxin0011/tampermonkey-script/main/0x3f-leetcode/package.json')
}

const LEETCODE_PROBLEM_API = `${CUR_URL}/graphql/`

export async function PostLeetCodeApi(data) {
    return fetch(LEETCODE_PROBLEM_API, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(res => res.json())

}

export async function getProblemAcInfo(titleSlug) {
    return PostLeetCodeApi(postData(titleSlug))
}