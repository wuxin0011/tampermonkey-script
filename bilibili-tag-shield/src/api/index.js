/* bilibili接口 */


/**
 * https://www.bilibili.com/video/BVXXXXXX
 * 通过 BV号码查找username
 * @param url
 * @returns {Promise<any>}
 */
export const getBiliBiliInfoByVideoID = async (url = window.location.href) => {
    if (!url) {
        return;
    }
    let videoBVId = "BV"
    if (/.*\/BV(.*)/.test(url)) {
        videoBVId += /.*\/BV(.*)\/.*/.test(url) ?
            url.match(/.*\/BV(.*)/)[1].match(/(.*)\/{1}.*/)[1]
            : url.match(/.*\/BV(.*)/)[1]
    } else {
        videoBVId = url
    }

    return await fetch(`https://api.bilibili.com/x/web-interface/wbi/view?bvid=${videoBVId}`, {
        method: 'get',
        mode: 'cors'
    }).then(res => res.json())

}


/**
 * https://space.bilibili.com/
 * 通过 BV号码查找username
 * @returns {Promise<any>}
 * @param userId userID
 */
export const getBiliBiliInfoByUserId = async (userId) => {
    if (!userId) {
        return;
    }
    return await fetch(`https://api.bilibili.com/x/space/wbi/acc/info?mid=${userId}`, {
        method: 'get',
        mode: 'cors'
    }).then(res => res.json())

}
