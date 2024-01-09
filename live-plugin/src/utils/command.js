
import {
  is_huya,
  addLocalStore,
  isShowFansIconKey,
  isShowSysMsgKey,
  isShowGiftRankKey,
  isShowSysMsg,
  isShowGiftRank,
  isShowFansIcon
} from "./index";


const reload  = ()=>{
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


const installCommand = () => {
  if (!is_huya) {
    return
  }
  GM_registerMenuCommand(`${isShowSysMsg()?'关闭':'显示'}系统消息`, () => {
    changeSysMsg()
  }, { title: '关闭或显示房管操作或主播等操作信息,默认关闭' })
  GM_registerMenuCommand(`${isShowGiftRank()?'关闭':'显示'}礼物排行榜`, () => {
    changeRank()
  }, { title: '关闭或显示礼物排行，默认关闭' })
  GM_registerMenuCommand(`${isShowFansIcon() ? '关闭':'显示'}粉丝徽章`, () => {
    changeFansIcon()
  }, { title: '关闭或显示粉丝徽章，默认关闭' })
}


export default installCommand
