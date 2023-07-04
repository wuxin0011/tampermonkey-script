
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
