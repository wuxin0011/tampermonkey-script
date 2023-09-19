import { warn } from '@/utils'
import { log } from '../../utils'




export const isRisk = (obj) => obj ? JSON.stringify(obj).indexOf('非法访问') : false




/**
 * 
 * @param {判断是否是视频号} keywords 
 * @returns 
 */
export const isBVId = (keywords) => /.*\/BV(.*)/.test(keywords)




/**
 * 
 * 调用该函数前提必须是BVID
 * @param {通过视频地址获取BVID} url 
 * return BVID
 */
export const getBVId = (url) => {
    try {
        let videoBVId = "BV"
        if (/.*\/BV(.*)/.test(url)) {
            videoBVId += /.*\/BV(.*)\/.*/.test(url) ?
                url.match(/.*\/BV(.*)/)[1].match(/(.*)\/{1}.*/)[1]
                : url.match(/.*\/BV(.*)/)[1]
        }
        return videoBVId
    } catch (error) {
        warn('通过房间号获取up信息失败！，请检查是否 https://www.bilibili.com/video/xxxxxxx 空间地址...')

        return null
    }
}




/**
 * 
 * @param {判断是否是user ID} keywords 
 * @returns 
 */
export const isUserId = (keywords) => /https:\/\/space\.bilibili\.com\/\d+.*/.test(keywords) || /\d+/.test(keywords)


/**
 * https://space.bilibili.com/xxxx
 * 调用该函数前提必须是userID空间地址
 * @param {*} keywords 
 */
export const getUserId = (keywords) => {
    // 如果不是存数字
    let isMatch = keywords.match(/https:\/\/space\.bilibili\.com.*\/(\d+).*/)
    if (isMatch) {
        try {
            return isMatch[1]
        } catch (error) {
            warn('通过房间号获取up信息失败！，请检查是否 https://space.bilibili.com 空间地址...')
            return null
        }
    }
    return keywords
}



/**
 * 
 * @link https://www.bilibili.com/video/xxxxxxx
 * @param {通过视频地址} url 
 * @returns 
 */
export const getBiliBiliInfoByVideoID = async (url = window.location.href) => {
    if (!url) {
        return null;
    }
    let videoBVId = null
    if (isBVId(url)) {
        videoBVId = getBVId(url)
    } else {
        videoBVId = url
    }
    if (!videoBVId) {
        return null;
    }
    return await fetch(`https://api.bilibili.com/x/web-interface/wbi/view?bvid=${videoBVId}`, {
        method: 'get',
        mode: 'cors'
    }).then(res => res.json())

}


/**
 * 通过空间地址 https://space.bilibili.com/xxxx
 * 通过 BV号码查找username
 * @returns {Promise<any>}
 * @param userId userID
 */
export const getBiliBiliInfoByUserId = async (userId) => {
    if (!isUserId(userId)) {
        return null;
    }
    userId = getUserId(userId)
    if (!userId) {
        return null;
    }
    log('user Id', userId)
    return await fetch(`https://api.bilibili.com/x/space/wbi/acc/info?mid=${userId}`, {
        method: 'get',
        mode: 'cors'
    }).then(res => res.json())

}

