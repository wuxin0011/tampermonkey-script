
import {
  addLocalStore,
  isAutoPlugin,
  isAutoPluginkey,
  isMainRoom,
  isShowColorDm,
  isShowColorDmKey,
  isShowFansIcon,
  isShowFansIconKey,
  isShowGiftRank,
  isShowGiftRankKey,
  isShowHotInstContent,
  isShowHotInstKey,
  isShowHotSearch,
  isShowHotSearchInputKey,
  isShowHotSearchInputKeyword,
  isShowHotSearchKey,
  isShowMainRoom,
  isShowMatchContent,
  isShowMatchContentKey,
  isShowPk,
  isShowPkKey,
  isShowSysMsg,
  isShowSysMsgKey,
  is_bilibili,
  is_douyin,
  is_douyu,
  is_huya,
  local_url,
  log
} from "./index";

import { GM_registerMenuCommand } from '$';



const reload = () => {
  window.location.reload()
}

const changeRank = () => {
  addLocalStore(isShowGiftRankKey, !isShowGiftRank(), Boolean.name)
  reload()
}
const changeFansIcon = () => {
  addLocalStore(isShowFansIconKey, !isShowFansIcon(), Boolean.name)
  reload()
}
const changeSysMsg = () => {
  addLocalStore(isShowSysMsgKey, !isShowSysMsg(), Boolean.name)
  reload()
}

const changeColorDm = () => {
  addLocalStore(isShowColorDmKey, !isShowColorDm(), Boolean.name)
  reload()
}


const douyuCommand = () => {
  if (!is_douyu) {
    return
  }
  GM_registerMenuCommand(`${isShowPk() ? '显示' : '关闭'} pk 条📣`, () => {
    addLocalStore(isShowPkKey, !isShowPk(), Boolean.name)
  }, { title: '关闭或者显示PK条,默认关闭' })
}



const huyaCommand = () => {
  if (!is_huya) {
    return
  }
  GM_registerMenuCommand(`${isShowMatchContent() ? '关闭' : '显示'} 赛事数据🏆`, () => {
    addLocalStore(isShowMatchContentKey, !isShowMatchContent(), Boolean.name)
    reload()
  }, { title: '关闭或显示顶部大页图，默认关闭' })
  GM_registerMenuCommand(`${isShowMainRoom() ? '关闭' : '显示'}顶部其他房间⛺`, () => {
    addLocalStore(isMainRoom, !isShowMainRoom(), Boolean.name)
    reload()
  }, { title: '关闭或显示顶部连接的其他房间，默认关闭' })
  GM_registerMenuCommand(`${isShowSysMsg() ? '关闭' : '显示'}系统消息📣`, () => {
    changeSysMsg()
  }, { title: '关闭或显示房管操作或主播等操作信息,默认关闭' })
  GM_registerMenuCommand(`${isShowGiftRank() ? '关闭' : '显示'}礼物排行榜🧧`, () => {
    changeRank()
  }, { title: '关闭或显示礼物排行，默认关闭' })
  GM_registerMenuCommand(`${isShowFansIcon() ? '关闭' : '显示'}粉丝徽章🎫`, () => {
    changeFansIcon()
  }, { title: '关闭或显示粉丝徽章，默认关闭' })
  GM_registerMenuCommand(`${isShowColorDm() ? '关闭' : '显示'}彩色弹幕🎈`, () => {
    changeColorDm()
  }, { title: '关闭或显示彩色弹幕，默认关闭 仅在黑夜模式下生效' })
}


const bilibiliCommand = () => {
  if (!is_bilibili) return
  GM_registerMenuCommand(`${isShowHotSearch() ? '关闭' : '开启'}热搜🍳`, () => {
    addLocalStore(isShowHotSearchKey, !isShowHotSearch(), Boolean.name)
    reload()
  }, { title: '如果不想看到热搜请点击，默认开启' })


  if (local_url.indexOf('https://live.bilibili.com/') != -1) {




  }



}



const douyinCommand = () => {
  if (!is_douyin) return
  GM_registerMenuCommand(`${isShowHotSearch() ? '关闭' : '开启'}热搜🍳`, () => {
    addLocalStore(isShowHotSearchKey, !isShowHotSearch(), Boolean.name)
    reload()
  }, { title: '如果不想看到热搜请点击，默认开启' })
  GM_registerMenuCommand(`${isShowHotInstContent() ? '关闭' : '开启'}推荐内容❤`, () => {
    addLocalStore(isShowHotInstKey, !isShowHotInstContent(), Boolean.name)
    reload()
  }, { title: '如果不想看到推荐内容请点击，默认开启' })
  GM_registerMenuCommand(`${isShowHotSearchInputKeyword() ? '关闭' : '开启'}输入框关键词提示🎈`, () => {
    addLocalStore(isShowHotSearchInputKey, !isShowHotSearchInputKeyword(), Boolean.name)
    reload()
  }, { title: '如果不想看到输入框关键词请点击，默认开启' })
}



const installCommand = () => {
  log('install command ...')
  GM_registerMenuCommand(`${isAutoPlugin() ? '关闭😵' : '启用🤣'} 插件`, () => {
    addLocalStore(isAutoPluginkey, !isAutoPlugin(), Boolean.name)
    window.location.reload()
  }, { title: '如果不想在该网址使用插件请点击这里😀' })

  if (!isAutoPlugin()) {
    return;
  }


  //
  huyaCommand()
  bilibiliCommand()
  douyuCommand()
  // douyinCommand()
}


export default installCommand
