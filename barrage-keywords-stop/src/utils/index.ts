
// ==UserScript==
// @name         barrage-keywords-stop
// @namespace    {{repository}}
// @version      {{version}}
// @author       {{author}}
// @description  {{description}}
// @license      {{license}}
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABIFJREFUWEe1l11oHFUUx//nzm6tgQa/GpudrSE0YgI+VAR9EE0LftGgxA9adDNbS7UPsTuJPkSwARVaQaE2mU0jpJbUmSw+iKVIG6lGaqQPGqiCPrSR2pBmZ1ut1opWa7J7j9zZ3Xaz2c1uku3A7jzMvef/u+eec+49hAU8HfbU/RL0CIGaQGgCvN9vAC54b8aIIDm2bPryiXe3Nv5VjmkqNWj7YKJRaNwO4AkQVpUan/5OvzBkTGMx1BMOnJxvzrwApuO+CUCJr/DMEg+D6ZhkTAqfb3K5zz85jctacsbXIJgbmPlOgBsY9CgB1QCSYI5a4eDrxSCKApiOOwLggawwS22/Fa4dLscDnbFf16bkzBsEPJ6dL5OyK/rCHT/nzy8IYNrxOIhuVfsqQJEeI3CoHOH8MRE7YQrCTgb7AZwUTKH8LZkDYDruKQB1YP4Bmmi3QoETixHPnWPabgyEpxWEJpLP7gnVncl+nwVwbSAfnhGpbe+H6v6omDjjYBqCP7WM4KY5AJmAew3ghGTfw33hVROVFLfCeijixC8R6AZm3hUNB3d68aH+vFTz8dfpaKeIZQQ+qLS4p+MkWgX4I09YUGtvKHDUAzBt1wLhJQCHLEN/7nqIZ22aTvwAQJvA2GeFddMDiNjuWSKsJJbresOrv10KwNU4YhxUbs+3paopk/gKoIRlBNZQRyzxEEs+CrBrGcGG6yme44XTAOmSuYUidrybiHagCHG5QKVWXjAtmXdTTo62W4Y+WK5gYYOF3Z5v03TcLQD61aLJdNzv1KlGgh7rDQVUJizoWcjKs4az286M7xXAv5m0WDDAYsSV1rW4wyUFMAXgtoV6YLHiuQDMuLCoLViK+CwA8DEF8DmAB8G8zQoHnVIBsFTxdOGLGyAaANCnsqALhLcADFmGrqph0acS4h6A4+4D0MbgTup0ptZJiM8ATFqG3lhMvVLiGQDvyBestVDX/lMrriyr/hHg21mI5miodmxO3mbP8yUWK6/sx87dR1KOAhizDL05fRY48V0EepWZh6Ph4DNLKTIlY8hx1WnYCokua7Me9QA67USTJFYr9xFxd29bcHc6WDI3mQqsPO36xIsAR0G4mJzx39u/peb81RuRacffBtErYMxYYb260uLb7fP1gpIjAAWYMBBt0zu8Apjrso6h+CfMtEHVaO/6VKGVdw5O3JTS/ANEpHqL48ll/qf6N9b8PQcgcuDsGtK0j72Op1LisfjaVIr6iXAPgAkN/if3GDWnswufcyvOxEMs03ZNE3Goty14uFRwFfqurmAascWMlQCmoaHFel4/nju2YF/wcixRp0nuVsUi7Sb6MCnle3s3B38qB8S0z20gkdrqbScAJoxqLKI9Ru2R/Pnzt2bpkrnD6xOA38EYBXiCmc4wY3z6PxqvqrkxmbryT70mqT6VQlAI2ZwVBjAOyD7LWF30kluyOVXeECkZEUTNDNxdjgcY/A0YX1Ytr4q+s/GWP+ebUxJgVpY47l1MtB7M6wHcPGsvCReZ5UhKaF/sDQUmywFVY/4HmMRRtLE+F8gAAAAASUVORK5CYII=
// @source       {{repository}}
// @supportURL   {{bug}}
// @match        https://www.huya.com/*
// @match        https://live.douyin.com/*
// @match        https://live.bilibili.com/*
// @match        https://www.douyu.com/*
// ==/UserScript==


/**
 * 全局房间关键词 key
 */
export const selectKeywordsLocal = 'selectKeywordsLocal'


/**
 * 是否不需要提示 key
 */
export const isNoShowTipKey = 'tip_isNoShowTipKey'


/**
 * 是否是第一次安装
 */
export const isFisrtInstallKey = 'isFisrtInstallKey'



/**
 * 该房间关键词 key
 */
export const selectOnlyThieRoom = 'selectOnlyThieRoom'


/**
 * 是否附带动画效果
 */
export const isAnimationKey = "m_isAnimationKey"

/**
 * 动画时长
 */
export const AnimationTimeKey = "m_time_isAnimationKey"

/**
 * 默认关键词
 */
export const defaultKeywords = ['送出', '6666', '直播间']

/**
 * 当前url
 */
export const localLink = window.location.href


/**
 * 抖音
 */
export const isDouYinLive = /https?:\/\/live\.douyin.*/.test(localLink)

/**
 * 虎牙
 */
export const isHyLive = /https?:\/\/www\.huya\.com.+/.test(localLink)

/**
 * 斗鱼
 */
export const isDouyuLive = /https?:\/\/.*douyu.*(\/((.*rid=\d+)|(\d+)).*)$/.test(localLink)

/**
 * b站
 */
export const isBiliBiliLive = /https?:\/\/live\.bilibili.*/.test(localLink)

/**
 * 本地
 */
export const isLocalHost = /127\..*/.test(localLink)

/**
 * noop
 */
export const noop = () => { }

/**
 * 最大动画时长
 */
export const MAX_ANIMATION_TIME = 2


/**
 * 默认时长
 */
export const DEFAULT_ANIMATION_TIME = 0.5



/**
 * 
 * @param k key
 * @param v v
 * @param isParse 是否需要序列化 
 * @returns 
 */
export const setItem = (k: string, v: any, isParse: boolean = false) => window.localStorage.setItem(k, isParse ? JSON.stringify(v) : v)


/**
 * 
 * @param k key
 * @param isParse 是否需要序列化
 * @returns 
 */
export const getItem = (k: string, isParse: boolean = false) => isParse ? JSON.parse(window.localStorage.getItem(k) as string) : window.localStorage.getItem(k)



/**
 * 第一次安装 默认true
 * @returns boolean true
 */
export const isFisrtInstall = () => getItem(isFisrtInstallKey) == null || getItem(isFisrtInstallKey) !== isFisrtInstallKey


/**
 * 提示
 * @returns boolean true
 */
export const isNoShowTip = () => getItem(isNoShowTipKey) == null || getItem(isNoShowTipKey) !== isNoShowTipKey



/**
 * 获取动画时长
 * @returns timer
 */
export const getAnimationTime = () => getItem(AnimationTimeKey) == null ? DEFAULT_ANIMATION_TIME : (isNaN(getItem(AnimationTimeKey)) ? DEFAULT_ANIMATION_TIME : getItem(AnimationTimeKey) > MAX_ANIMATION_TIME ? DEFAULT_ANIMATION_TIME : getItem(AnimationTimeKey))


/**
 * 是否开启过渡
 */
export const isOpenTranisition = () => getItem(isAnimationKey) == null || getItem(isAnimationKey) === isAnimationKey

/**
 * 全网关键词
 * @returns []
 */
export const selectKeywords = () => isFisrtInstall() || getItem(selectKeywordsLocal) == null ? defaultKeywords : getItem(selectKeywordsLocal, true)



/**
 * 生成ID
 * @param id id
 * @returns roomID
 */
export const createRoomId = (id: string | null | undefined) => id ? `${selectOnlyThieRoom}_${id}` : `${selectOnlyThieRoom}_${localLink}`



/**
 * 获取ID
 * @returns ID
 */
export const getRoomId = (): string | null => {
  let match = null
  try {
    if (!localLink) {
      return ''
    }
    if (isBiliBiliLive) {
      match = localLink.match(/https:\/\/live\.bilibili\..*\/(\d+).*/)
    } else if (isDouYinLive) {
      match = localLink.match(/https:\/\/live\.douyin\..*\/(\d+).*/)
    } else if (isHyLive) {
      match = localLink.match(/https:\/\/www\.huya\.com\/(.*)/)
    } else if (isDouyuLive) {
      if (/.*rid=(\d+).*/.test(localLink)) {
        match = localLink.match(/rid=(\d+)/)
      } else if (localLink.match(/https:\/\/www\.douyu\.com\/(\d+).*/)) {
        match = localLink.match(/https:\/\/www\.douyu\.com\/(\d+).*/)
      }
    }
  } catch (error) {

  }
  if (match !== null && match.length >= 1) {
    return match[1]
  }
  return localLink
}


/**
 * 是否全屏
 * @returns  boolean
 */
export const isFull = () => {
  if ('fullscreenElement' in document) {
    return !!document['fullscreenElement']
  }
  if ('webkitFullscreenElement' in document) {
    return !!document['webkitFullscreenElement']
  }
  if ('mozFullScreenElement' in document) {
    return !!document['mozFullScreenElement']
  }
  if ('msFullscreenElement' in document) {
    return !!document['msFullscreenElement']
  }
}



/**
 * id
 * @returns ID
 */
export const roomId = () => createRoomId(getRoomId())


/**
 * 
 * @returns 当前房间关键词内容
 */
export const selectOnlyThisRoomsKeywords = () => getItem(roomId()) == null ? defaultKeywords : getItem(roomId(), true)


/**
 * 版本
 */
export const MARK = "dm-mark-version"


/**
 * 
 * @param t 版本号
 * @returns 版本
 */
export const MARK_TAG = (t = 0) => `mark-version-${t}`



/**
 * 
 * @param dom 移除dom
 * @param r 是否真实移除
 */
export const removeDom = (dom: HTMLElement | null, r = false) => {
  try {
    dom!.style.display = 'none'
    if (r) {
      dom!.remove()
    }
  } catch (ignore) {
    // ignore
  }
}



/**
 * 
 * @param node dom
 * @param currentVersion version 
 * @returns Boolean
 */
export const checkVersionIsSame = (node: HTMLElement, currentVersion: number) => node.getAttribute(MARK) == MARK_TAG(currentVersion)


