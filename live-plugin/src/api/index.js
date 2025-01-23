
import { GM_xmlhttpRequest,GM_info } from '$'



/** 
 * 获取版本信息 test
 */
export function getVersion() {
    console.log('GM_info',GM_info)
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://raw.githubusercontent.com/wuxin0011/tampermonkey-script/main/live-plugin/package.json',
        headers: {
            "Content-Type": "application/json"
        },
        responseType: "json",
        onload: function (findUrl, state, status, statetext, responseHeaders, response, responseText) {
            console.log(findUrl, state, status, statetext, responseHeaders, response, responseText)
        }
    })

}
