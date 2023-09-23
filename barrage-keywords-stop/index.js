// ==UserScript==
// @name         barrage-keywords-stop
// @namespace    https://github.com/wuxin0011/tampermonkey-script/barrage-keywords-stop
// @version      0.0.2
// @author       wuxin0011
// @description  抖音、斗鱼、虎牙、bilibili弹幕关键字屏蔽，按下 ctrl+alt+k 即可激活🧨
// @license      MIT
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABIFJREFUWEe1l11oHFUUx//nzm6tgQa/GpudrSE0YgI+VAR9EE0LftGgxA9adDNbS7UPsTuJPkSwARVaQaE2mU0jpJbUmSw+iKVIG6lGaqQPGqiCPrSR2pBmZ1ut1opWa7J7j9zZ3Xaz2c1uku3A7jzMvef/u+eec+49hAU8HfbU/RL0CIGaQGgCvN9vAC54b8aIIDm2bPryiXe3Nv5VjmkqNWj7YKJRaNwO4AkQVpUan/5OvzBkTGMx1BMOnJxvzrwApuO+CUCJr/DMEg+D6ZhkTAqfb3K5zz85jctacsbXIJgbmPlOgBsY9CgB1QCSYI5a4eDrxSCKApiOOwLggawwS22/Fa4dLscDnbFf16bkzBsEPJ6dL5OyK/rCHT/nzy8IYNrxOIhuVfsqQJEeI3CoHOH8MRE7YQrCTgb7AZwUTKH8LZkDYDruKQB1YP4Bmmi3QoETixHPnWPabgyEpxWEJpLP7gnVncl+nwVwbSAfnhGpbe+H6v6omDjjYBqCP7WM4KY5AJmAew3ghGTfw33hVROVFLfCeijixC8R6AZm3hUNB3d68aH+vFTz8dfpaKeIZQQ+qLS4p+MkWgX4I09YUGtvKHDUAzBt1wLhJQCHLEN/7nqIZ22aTvwAQJvA2GeFddMDiNjuWSKsJJbresOrv10KwNU4YhxUbs+3paopk/gKoIRlBNZQRyzxEEs+CrBrGcGG6yme44XTAOmSuYUidrybiHagCHG5QKVWXjAtmXdTTo62W4Y+WK5gYYOF3Z5v03TcLQD61aLJdNzv1KlGgh7rDQVUJizoWcjKs4az286M7xXAv5m0WDDAYsSV1rW4wyUFMAXgtoV6YLHiuQDMuLCoLViK+CwA8DEF8DmAB8G8zQoHnVIBsFTxdOGLGyAaANCnsqALhLcADFmGrqph0acS4h6A4+4D0MbgTup0ptZJiM8ATFqG3lhMvVLiGQDvyBestVDX/lMrriyr/hHg21mI5miodmxO3mbP8yUWK6/sx87dR1KOAhizDL05fRY48V0EepWZh6Ph4DNLKTIlY8hx1WnYCokua7Me9QA67USTJFYr9xFxd29bcHc6WDI3mQqsPO36xIsAR0G4mJzx39u/peb81RuRacffBtErYMxYYb260uLb7fP1gpIjAAWYMBBt0zu8Apjrso6h+CfMtEHVaO/6VKGVdw5O3JTS/ANEpHqL48ll/qf6N9b8PQcgcuDsGtK0j72Op1LisfjaVIr6iXAPgAkN/if3GDWnswufcyvOxEMs03ZNE3Goty14uFRwFfqurmAascWMlQCmoaHFel4/nju2YF/wcixRp0nuVsUi7Sb6MCnle3s3B38qB8S0z20gkdrqbScAJoxqLKI9Ru2R/Pnzt2bpkrnD6xOA38EYBXiCmc4wY3z6PxqvqrkxmbryT70mqT6VQlAI2ZwVBjAOyD7LWF30kluyOVXeECkZEUTNDNxdjgcY/A0YX1Ytr4q+s/GWP+ebUxJgVpY47l1MtB7M6wHcPGsvCReZ5UhKaF/sDQUmywFVY/4HmMRRtLE+F8gAAAAASUVORK5CYII=
// @source       https://github.com/wuxin0011/tampermonkey-script
// @supportURL   https://github.com/wuxin0011/tampermonkey-script/issues
// @match        https://www.huya.com/*
// @match        https://live.douyin.com/*
// @match        https://live.bilibili.com/*
// @match        https://www.douyu.com/*
// ==/UserScript==



(function () {
  if (typeof window === undefined) {
    return;
  }
  /********************************************************************common************************************************************************************************ */
  const selectKeywordsLocal = 'selectKeywordsLocal'                                        // 当前网站全部保存的关键词
  const isNoShowTipKey = 'tip_isNoShowTipKey'                                              // 是否不需要提示   默认是
  const isFisrtInstallKey = 'isFisrtInstallKey'                                            // 是否是第一次安装 默认是第一次
  const isFirstAlertKey = 'isFirstAlertKey'                                                // 错误内容第一次给出提示 默认是
  const selectOnlyThieRoom = 'selectOnlyThieRoom'                                          // 当前房间号的关键词
  const defaultKeywords = ['送出了', '6666', '直播间']                                      // 默认关键词
  const localLink = window.location.href
  const isDouYinLive = /https?:\/\/live\.douyin.*/.test(localLink)
  const isHyLive = /https?:\/\/www\.huya\.com.+/.test(localLink)
  const isDouyuLive = /https?:\/\/.*douyu.*(\/((.*rid=\d+)|(\d+)).*)$/.test(localLink)
  const isBiliBiliLive = /https?:\/\/live\.bilibili.*/.test(localLink)
  const isLocalHost = /127\..*/.test(localLink)
  const noop = () => { }
  const setItem = (k, v, isParse = false) => window.localStorage.setItem(k, isParse ? JSON.stringify(v) : v)
  const getItem = (k, isParse = false) => isParse ? JSON.parse(window.localStorage.getItem(k)) : window.localStorage.getItem(k)
  const isFisrtInstall = () => getItem(isFisrtInstallKey) == null || getItem(isFisrtInstallKey) !== isFisrtInstallKey
  const isNoShowTip = () => getItem(isNoShowTipKey) == null || getItem(isNoShowTipKey) !== isNoShowTipKey
  const isFirstAlert = () => getItem(isFirstAlertKey) == null || getItem(isFirstAlertKey) !== isFirstAlertKey
  const selectKeywords = () => isFisrtInstall() || getItem(selectKeywordsLocal) == null ? defaultKeywords : getItem(selectKeywordsLocal, true)
  const createRoomId = (id) => id ? `${selectOnlyThieRoom}_${id}` : `${selectOnlyThieRoom}_${localLink}`
  const getRoomId = () => {
    try {
      if (isBiliBiliLive) {
        return localLink.match(/https:\/\/live\.bilibili\..*\/(\d+).*/) ? localLink.match(/https:\/\/.*\.bilibili\..*\/(\d+).*/)[1] : localLink
      } else if (isDouYinLive) {
        return localLink.match(/https:\/\/live\.douyin\..*\/(\d+).*/) ? localLink.match(/https:\/\/.*\.douyin\..*\/(\d+).*/)[1] : localLink
      } else if (isHyLive) {
        return localLink.match(/https:\/\/www\.huya\.com\/(.*)/) ? localLink.match(/https:\/\/www\.huya\.com\/(.*)/)[1] : localLink
      } else if (isDouyuLive) {
        if (/.*rid=(\d+).*/.test(localLink)) {
          return localLink.match(/rid=(\d+)/)[1]
        }
        if (/https:\/\/www\.douyu\.com\/(\d+).*/.test(url)) {
          return localLink.match(/https:\/\/www\.douyu\.com\/(\d+)/)[1]
        }
      }
    } catch (error) {

    }

    return localLink
  }

  // 是否全屏
  const isFull = () => {
    return !!(document?.fullscreenElement || document?.webkitFullscreenElement || document?.mozFullScreenElement
      || document?.msFullscreenElement)
  }

  const roomId = () => createRoomId(getRoomId())
  const selectOnlyThisRoomsKeywords = () => getItem(roomId()) == null ? defaultKeywords : getItem(roomId(), true)
  let nodeVersion = 0
  let beforeTag = null
  const MARK = "dm-mark-version"
  const MARK_TAG = (t = 0) => `mark-version-${t}`
  let keywordsCache = []
  let isInit = false
  let isStart = false
  let tagInitSuccess = true
  let isAllRooms = false
  let isSupport = true
  const isPrintStop = true // 是否禁止控制台输出弹幕
  let currentContainer = null

  /******************************************************************************************************************************************************************** */

  //  弹幕容器
  let BARRAGE_CONTAINER = null

  const BARRAGE_TYPE = {
    ALL_BARRAGE: 'ALL_BARRAGE',
  }




  const removeDom = (dom, r = false) => {
    if (dom && dom instanceof HTMLElement) {
      window.requestAnimationFrame(() => {
        dom.style.display = 'none'
        if (r) {
          dom.remove()
        }
      })
    }
  }

  const contains = (text) => {
    if (!text) {
      return false
    }
    for (let index = 0; index < keywordsCache.length; index++) {
      if (keywordsCache[index] && (text.indexOf(keywordsCache[index]) !== -1)) {
        // if (!isPrintStop) {
        //   console.error('\n\n==============================stop=====================================')
        //   console.error(`禁止`, text, ' keywords: ', keywordsCache[index])
        // }
        return true
      }
    }
    return false
  }

  // 比较节点版本信息
  const checkVersionIsSame = (node) => node.getAttribute(MARK) == MARK_TAG(nodeVersion)



  // 弹幕处理
  let findBarrages = () => {
    const findTargetText = (container) => {
      if (!container) {
        return;
      }
      const nodes = document.querySelectorAll(container)
      for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index]
        if (node) {
          // check
          if (!checkVersionIsSame(node)) {
            if (contains(node?.textContent)) {
              removeDom(node, true)
            } else {
              // update node new  version
              node.setAttribute(MARK, MARK_TAG(nodeVersion))
            }
          }

        }

      }
    }

    // 遍历节点
    for (let i = 0; i < BARRAGE_CONTAINER.length; i++) {
      findTargetText(BARRAGE_CONTAINER[i])
    }

    window.requestAnimationFrame(findBarrages)
  }


  const SUPPORT = {
    HY: 'HY_LIVE',
    DOUYIN: 'DOUYIN_LIVE',
    DOUYU: 'DOUYU_LIVE',
    BILIBILI: 'BILIBILI_LIVE',
    LOCALHOST: 'LOCALHOST_LIVE'
  }


  const TAG_TYPE = {
    [SUPPORT.DOUYIN]: {
      [BARRAGE_TYPE.ALL_BARRAGE]: ['.xgplayer-danmu>div', '.webcast-chatroom___item.webcast-chatroom___enter-done', '.xgplayer-danmu div']
    },
    [SUPPORT.HY]: {
      [BARRAGE_TYPE.ALL_BARRAGE]: ['#player-video #danmuwrap #danmudiv .danmu-item', '#player-video #danmuwrap #danmudiv #danmudiv2', '#player-marquee-wrap .player-marquee-noble-item', '#player-marquee-wrap .player-banner-enter', '#chat-room__list>div']
    },
    [SUPPORT.BILIBILI]: {
      [BARRAGE_TYPE.ALL_BARRAGE]: ['.web-player-danmaku .danmaku-item-container .bili-dm', '#chat-items .chat-item']

    },
    [SUPPORT.DOUYU]: {
      [BARRAGE_TYPE.ALL_BARRAGE]: ['#douyu_room_normal_player_danmuDom .ani-broadcast', '#js-barrage-container #js-barrage-list li']
    },
    [SUPPORT.LOCALHOST]: {
      [BARRAGE_TYPE.ALL_BARRAGE]: ['video']
    }
  }

  const installBeforeInfo = () => {
    console.log('欢迎使用弹幕屏蔽插件...')
    console.log('是否是首次安装', isFisrtInstall() ? "是" : "否")
    console.log('是否不需要快捷键提示', isNoShowTip() ? "需要" : "不需要")
  }


  const addStyle = (str) => {
    if (isInit) {
      return;
    }
    const head = document.querySelector("head");
    const style = document.createElement("style");
    style.innerText = str;
    head.appendChild(style);
    isInit = true
  };

  const keywordsUpdate = (array) => {
    if (!Array.isArray(array)) {
      array = []
    }
    isAllRooms ? setItem(selectKeywordsLocal, array, true) : setItem(roomId(), array, true)
    // 通知改变 之前被标记标签如果没被处理将失效
    notify()
  }


  const removeKeywords = (text) => {
    if (!Array.isArray(keywordsCache)) {
      return;
    }
    const index = keywordsCache.findIndex(t => t == text)
    if (index >= 0) {
      keywordsCache.splice(index, 1)
      keywordsUpdate([...keywordsCache])
    }
  }




  const createKeywords = (text) => {
    if (!Array.isArray(keywordsCache)) {
      keywordsCache = []
    }
    const index = keywordsCache.findIndex(t => t == text)
    if (index === -1) {
      keywordsCache = [text, ...keywordsCache]
      keywordsUpdate(keywordsCache)
    }
  }

  const containerStr = ` 
    <div class="m-dm-container-header">
      <input type="text" class="m-dy-input-add-keywords" placeholder="请输入关键字">
      <div class="m-dm-add-keywords-button">确认</div>
      <div class="m-dm-all-keywords-button" title="当前弹幕仅在房间内生效,点击切换到全房间">房间</div>
      <div class="m-dm-delete-keywords-button">清空</div>
      <span title="收起 使用 ctrl+alt+k可唤醒 我哦" class="m-dm-close-btn" id="m-dm-close-btn"> &times </span>
      <a href="https://greasyfork.org/zh-CN/scripts/475878-barrage-keywords-stop"  target="_blank" title="更新" class="m-dm-install-link">反馈</a>
    </div>
    <div class="m-dm-container-body"></div>
    <div class="m-dm-container-footer">
       <p title="不再显示" >使用&nbsp;ctrl+alt+k&nbsp;可唤醒或者关闭哦！</p>
    </div>
`


  const style = `
 
  .m-dm-container {
    --dm-container-width: 450px;
    --dm-container-height: 300px;
    --dm-container-background-color: 30, 23, 37;
    --dm-font-color: #fff;
    --dm-font-color-hover: #000;
    --dm-background-color: 0, 0, 0;
    --dm-background-color-hover: #fff;
    --dm-border-color: #fff;
    --dm-border-color-hover: #000;
  }




  .m-dm-container {
    width: var(--dm-container-width) !important;
    height: var(--dm-container-height) !important;
    background-color: rgba(var(--dm-container-background-color), 1) !important;
    position: fixed !important;
    display: flex !important;
    flex-direction: column !important;
    box-sizing: border-box !important;
    box-shadow: 2px 2px 10px rgba(var(--dm-background-color), 0.7) !important;
    border-radius: 10px !important;
    position: fixed !important;
    right: 0 !important;
    top: 100px !important;
    border: none !important;
    transition: transform ease-in-out 0.5s !important;
    z-index: 999999 !important;
    box-sizing: border-box !important;
    padding: 10px !important;
  }

  .m-dy-input-add-keywords {
    width: 150px !important;
    padding: 6px 12px !important;
    border: none !important;
    outline: none !important;
    margin-left: 10px !important;
    margin-top: 10px !important;
    border-radius: 10px !important;
  }

  .m-dy-input-add-keywords:focus {
    border: none !important;
    outline: none !important;
  }

  .m-dm-install-link {
    color: var(--dm-font-color) !important;
  }



  .m-dm-container-header,
  .m-dm-container-footer {
    height: 44px !important;
    position: relative  !important;
  }

  .m-dm-container-header #m-dm-close-btn {
    float:right !important;
    right: 3px !important;
    color: var(--dm-font-color) !important;
    font-size: 30px !important;
    cursor: pointer  !important;
    position: absolute  !important;
  }


  .m-dm-container-body {
    flex: 1 !important;
    overflow: auto !important;
  }

  .m-dm-keywords-tag {
    display: inline-block !important;
    padding: 5px !important;
    background-color: var(--dm-background-color) !important;
    border: none !important;
    outline: none !important;
    margin: 5px !important;
    cursor: pointer !important;
    color: var(--dm-font-color) !important;
    font-size: 12px !important;
    border: 1px solid var(--dm-border-color) !important;
    border-radius: 10px !important;
  }

  .m-dm-keywords-tag:hover {
    background: rgba(var(--dm-background-color), 0.7) !important;
    border: 1px solid var(--dm-border-hover-color) !important;
  }


  .m-dm-all-keywords-button,
  .m-dm-delete-keywords-button,
  .m-dm-add-keywords-button {
    display: inline-block !important;
    padding: 4px 8px !important;
    text-align: center !important;
    border: none !important;
    outline: none !important;
    background-color: var(--dm-background-color-hover) !important;
    color: var(--dm-font-color-hover) !important;
    cursor: pointer !important;
    border: 1px solid var(--dm-border-color) !important;
    border-radius: 10px !important;
  }

  
  .m-dm-all-keywords-button:hover,
  .m-dm-delete-keywords-button:hover,
  .m-dm-add-keywords-button:hover {
    background-color: rgb(var(--dm-background-color)) !important;
    color: var(--dm-font-color) !important;
    border: 1px solid var(--dm-border-color) !important;

  }

  .m-dm-container-footer {
    box-sizing: border-box !important;
    padding: 10px !important;
  }

  .m-dm-container-footer p {
    color: var(--dm-font-color) !important;
    cursor: pointer !important;
  }


  .m-dm-ani-close {
    transform: translateX(var(--dm-container-width)) !important;
  }

  .m-dm-container-body {
    overflow: auto !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: thin !important;
    scrollbar-color: #888888 #f0f0f0 !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }

  .m-dm-container-body::-webkit-scrollbar {
    width: 4px !important;
  }

  .m-dm-container-body::-webkit-scrollbar-track {
    background-color: rgb(22, 24, 35) !important;
  }

  .m-dm-container-body::-webkit-scrollbar-thumb {
    background-color: #333 !important;
    border-radius: 4px !important;
  }

  
  `


  //  初始化之前将本地房间号和全网房间全部关键词收集
  const initKeywords = () => {
    keywordsCache = []
    if (Array.isArray(selectOnlyThisRoomsKeywords())) {
      keywordsCache = [...new Set(selectOnlyThisRoomsKeywords())]
    }
    if (Array.isArray(selectKeywords())) {
      keywordsCache = [...new Set(keywordsCache, selectKeywords())]
    }
    console.log('重新启动标签扫描=>', keywordsCache)
  }

  // notify ！
  const notify = () => {
    try {
      window.cancelAnimationFrame(findBarrages)
      nodeVersion = nodeVersion + 2
      initKeywords() // init keywords
      if (Array.isArray(keywordsCache) && keywordsCache.length > 0) {
        findBarrages() // run ！
      }
    } catch (error) {
      console.error('弹幕插件出现异常了 notify Error 😭 ...', error)
    }
  }


  const addOperationEvent = () => {
    let dmContainer = currentContainer
    if (!dmContainer) {
      console.error('获取不到弹幕容器')
      return;
    }
    const dmInput = dmContainer.querySelector('.m-dy-input-add-keywords')
    const dmBody = dmContainer.querySelector('.m-dm-container-body')
    const dmAddButton = dmContainer.querySelector('.m-dm-add-keywords-button')
    const dmChangeButton = dmContainer.querySelector('.m-dm-all-keywords-button')
    const dmCloseButton = dmContainer.querySelector('#m-dm-close-btn')
    const dmDeleteButton = dmContainer.querySelector('.m-dm-delete-keywords-button')
    if (!dmInput || !dmAddButton || !dmBody) {
      console.log('element has null')
      return;
    }

    const tip = dmContainer.querySelector('.m-dm-container-footer p')
    tip.addEventListener('click', () => {
      setItem(isNoShowTipKey, isNoShowTipKey)
      tip.style.display = 'none'
    })

    const find = (text) => keywordsCache.find((t) => t == text)
    const add = () => {
      if (!dmInput.value) {
        alert('请输入关键字')
        return;
      }
      if (find(dmInput.value)) {
        if (isFirstAlert()) {
          setItem(isFirstAlertKey, isFirstAlertKey)
          alert('关键字已重复')
        } else {
          dmInput.value = ''
        }
        return;
      }
      createTag(dmBody, dmInput.value)
      createKeywords(dmInput.value)
      setItem(isFisrtInstallKey, isFisrtInstallKey)
      dmInput.value = ''
    }

    // enter
    dmInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        add()
      }
    })


    // click
    dmAddButton.addEventListener('click', () => {
      add()
    })

    // click
    dmCloseButton.addEventListener('click', () => {
      if (dmContainer.classList.contains('m-dm-ani-close')) {
        dmContainer.classList.remove('m-dm-ani-close')
      } else {
        dmContainer.classList.add('m-dm-ani-close')
      }
    })

    // click
    dmChangeButton.addEventListener('click', () => {
      isAllRooms = !isAllRooms
      createTags()
      dmChangeButton.textContent = isAllRooms ? '全房间' : '房间'
      dmChangeButton.title = isAllRooms ? '当前弹幕在所有直播间生效,点击切换房间' : '当前弹幕仅在该房间生效，点击切换到全房间'
    })



    // c
    dmDeleteButton.addEventListener('click', () => {
      if (confirm('确认清空？')) {
        removeTags()
        keywordsCache = []
        setItem(isAllRooms ? selectKeywordsLocal : roomId(), keywordsCache, true)
        notify()
      }
    })

    console.log('响应事件监听完毕...')
  }


  /**
   * 对于全屏事件触发改变错处响应
   */
  const handleFullScreenChange = () => {
    removeDom(currentContainer, true)
    currentContainer = null // 
    console.log('容器重新生成中....')
    if (isFull()) {
      createContainer('video', false, true)
    } else {
      createContainer('body', false)
    }
  }



  /**
   * 监听全屏触发事件
   */
  const addFullScreenEvent = () => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);
  }



  /**
   *  ctrl + alt + k evnet
   */
  const addCtrlAltKEvent = () => {

    document.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.altKey && event.key === 'k') {
        console.log('init ...')
        const dmContainer = currentContainer
        if (!dmContainer) {
          console.log('触发失败 获取不到容器!')
          return;
        }
        if (dmContainer.classList.contains('m-dm-ani-close')) {
          dmContainer.classList.remove('m-dm-ani-close')
          setItem(isFisrtInstallKey, isFisrtInstallKey)
        } else {
          dmContainer.classList.add('m-dm-ani-close')
        }
      }
    });
  }



  /**
   * 创建单个标签
   * @param {} dmBody 
   * @param {*} text 
   * @returns 
   */
  const createTag = (dmBody, text) => {
    if (!dmBody || !currentContainer) {
      dmBody = currentContainer.querySelector('.m-dm-container-body')
    }
    if (!text) {
      console.log('关键词内容不能为空！ ')
      return;
    }
    const dmTag = document.createElement('span')
    dmTag.className = 'm-dm-keywords-tag'
    dmTag.textContent = `${text}`
    dmTag.title = `点击移除关键字: ${text}`
    dmTag.addEventListener('click', () => {
      removeKeywords(text)
      dmTag.remove()
    })
    !!beforeTag ? dmBody.appendChild(dmTag) : dmBody.insertBefore(dmTag, beforeTag);
    // update before
    beforeTag = dmTag
  }


  const removeTags = () => {
    if (!currentContainer) {
      return;
    }
    const allTags = currentContainer.querySelectorAll('.m-dm-container-body .m-dm-keywords-tag')
    if (allTags && allTags.length > 0) {
      for (let i = 0; i < allTags.length; i++) {
        removeDom(allTags[i], true)
      }
    }
  }

  const createTags = () => {
    if (!currentContainer) {
      return;
    }
    removeTags()
    const dmBody = currentContainer.querySelector('.m-dm-container .m-dm-container-body')
    const keys = isAllRooms ? selectKeywords() : [...selectOnlyThisRoomsKeywords(roomId())]
    if (!Array.isArray(keys)) {
      return;
    }
    for (let i = 0; i < keys.length; i++) {
      createTag(dmBody, keys[i])
    }
    console.log('标签创建完毕....')
  }


  const createContainer = (tagName = 'body', isShow = true, isBefore = false) => {
    const c = document.querySelector(tagName)
    if (!c) {
      isSupport = false
      console.log('当前容器不存在！请检查', tagName)
      return;
    }
    const dmContainer = document.createElement('div')
    dmContainer.className = `m-dm-container ${isFisrtInstall() || isShow ? '' : 'm-dm-ani-close'} `
    dmContainer.innerHTML = containerStr
    const tip = dmContainer.querySelector('.m-dm-container-footer p')
    tip.style.display = isNoShowTip() ? 'none' : 'block'
    if (isBefore) {
      c.parentNode.insertBefore(dmContainer, c.nextSibling);
    } else {
      c.append(dmContainer)
    }
    isSupport = true
    console.log('弹幕容器创建完毕....')
    currentContainer = dmContainer
    addOperation()
  }


  const addOperation = () => {


    if (!isSupport) {
      console.warn('不支持哦初始化失败')
      return;
    }
    if (!currentContainer) {
      console.log('未找到弹幕容器... ')
      return;
    }
    createTags()
    addOperationEvent()
    console.log('一切准备就绪！')
    notify()
  }




  const initDom = () => {

    // 监听 ctrl + alt + k 时间
    addCtrlAltKEvent()

    // 监听全屏事件是否触发
    addFullScreenEvent()

    // 首次安装 默认出现 提示用户可以关闭
    if (isFisrtInstall()) {
      setTimeout(() => {
        createContainer('body', false)
      }, 5000)
    } else {
      createContainer('body', false)
    }

  }


  const initTag = (type) => {
    if (!TAG_TYPE[type]) {
      tagInitSuccess = false
      return
    }
    BARRAGE_CONTAINER = TAG_TYPE[type][BARRAGE_TYPE.ALL_BARRAGE]
    tagInitSuccess = !!BARRAGE_CONTAINER && Array.isArray(BARRAGE_CONTAINER) && BARRAGE_CONTAINER.length > 0
  }




  /**
   * 
   * @returns 启动入口
   */
  const start = () => {
    if (isStart) {
      return;
    }
    console.log('弹幕插件执行中...')
    installBeforeInfo()
    if (isDouYinLive) {
      initTag(SUPPORT.DOUYIN)
    } else if (isHyLive) {
      initTag(SUPPORT.HY)
    } else if (isBiliBiliLive) {
      initTag(SUPPORT.BILIBILI)
    } else if (isDouyuLive) {
      initTag(SUPPORT.DOUYU)
    } else if (isLocalHost) {
      initTag(SUPPORT.LOCALHOST)
      isSupport = true
    } else {
      isSupport = false
    }
    if (!tagInitSuccess) {
      console.log('标签初始化失败！')
      return;
    }
    if (isSupport) {
      addStyle(`${style}`)
      initDom()
    } else {
      console.log('对不起不支持当前网址!', localLink)
    }
    isStart = true
  }
  start()

})()


