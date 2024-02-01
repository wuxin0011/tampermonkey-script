
import {
  is_huya,
  addLocalStore,
  isShowFansIconKey,
  isShowSysMsgKey,
  isShowGiftRankKey,
  isShowColorDmKey,
  isShowSysMsg,
  isShowGiftRank,
  isShowFansIcon,
  isShowColorDm,
  is_bilibili,
  isShowHotSearchKey,
  isShowHotSearch,
  is_douyin,
  isShowHotInstContent,
  isShowHotInstKey,
  isShowHotSearchInputKey,
  isShowHotSearchInputKeyword,
} from "./index";




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






const huyaCommand = () => {
  if (!is_huya) {
    return
  }
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
  huyaCommand()
  bilibiliCommand()
  // douyinCommand()
}


export default installCommand
