import {
  is_douyu, local_url,
  isShowPk,
} from "../utils"
import dark from './dark/fish.css.dark'
// todo 暂时将header设置为黑色！
const isIndex = () => true || local_url === 'https://www.douyu.com/' || /https:\/\/www\.douyu\.com\/\?.*/.test(local_url)


const headerDarkCss = isIndex() ?

  `
.layout-Section.layout-Header {
  background-color:#000  !important;
}
`
  :
  ``


const pk = !isShowPk() ? `` : `
     

.MorePk {
  display:none !important;
}
  
  `



const css = is_douyu ? `

.layout-List-item .DyCover-content .DyCover-user,.layout-Cover-item .DyListCover-userName,.Title-blockInline .Title-anchorName h2{
  cursor:pointer !important;
}
.layout-List-item .DyCover-content .DyCover-user:hover,.layout-Cover-item .DyListCover-userName:hover,.Title-blockInline .Title-anchorName h2:hover {
  color:rgb(255, 135, 0) !important;
}

.layout-Search-btn {
  width:55px !important;
}


.DiamondsFansLanternBarrage,
.Barrage-newAuth.js-new-auth,
.Title-roomInfo .Title-followIcon,
#js-player-toolbar .RoomText-wrap,
.PkView,.SysSign-Ad,
.layout-Section.layout-Slide,
.Header-broadcast-wrap,
#lazyModule3,
#lazyModule4,
#lazyModule5,
#lazyModule6,
#lazyModule7,
#lazyModule8,
#lazyModule23,
#lazyModule24,
#js-room-activity,
#js-right-nav,
#js-bottom,
#js-header .Header .HeaderNav,
#js-header .Header .HeaderGif-left,
#js-header .Header .HeaderGif-right,
.Header-download-wrap,
.AnchorInterToolsUser,
.RechangeJulyPopups,
li.Header-menu-link,
.layout-Main .layout-Customize,
.HeaderCell-label-wrap,
.Title-AnchorLevel,.RoomVipSysTitle,
.Aside-nav .Aside-nav-item,
.Title-roomInfo .Title-row,
#player-marvel-controller+div,
.layout-Player-main .GuessGameMiniPanelB-wrapper,
#js-player-asideMain #layout-Player-aside .FirePower,
.layout-Player-video .layout-Player-videoAbove .ChargeTask-closeBg,
#bc4-bgblur,.Search-ad,
.SignBaseComponent-sign-ad, 
.SignBaseComponent-sign-ad .LazyLoad,
.list-Banner-adv,
.Baby-image.is-achievement,
.multiBitRate-da4b60{
  display:none !important;
}


li.Header-menu-link:nth-child(1),
li.Header-menu-link:nth-child(2),
li.Header-menu-link:nth-child(3),
.Aside-nav .Aside-nav-item:nth-child(1)
{
  display:inline-block !important;
}

.LiveRoomDianzan,
.SupremeRightIconJSX,.AnchorLevel,
.Barrage-main  .UserLevel,
.Barrage-main  .js-user-level,
.Barrage-main  .Barrage-icon,
.Barrage-main  .Motor,
.Barrage-main  .Motor-flag,
.Barrage-main  .Barrage-hiIcon,
.Barrage-main  .UserGameDataMedal,
.Barrage-main  .ChatAchievement,
.Barrage-main  .Barrage-notice,
.layout-Player .layout-Player-announce,
.layout-Player .layout-Player-rank,
.MatchSystemTeamMedal,
#js-player-video .ScreenBannerAd,
.layout-Main #layout-Player-aside .BarrageSuspendedBallAd,
.layout-Main #layout-Player-aside .SignBarrage,
#js-player-video-case .VRTips~div,
.layout-Main .Title-roomInfo .Title-row,
.layout-Main .ToTopBtn,
.Header-right .public-DropMenu-drop .DropPane-ad,
.Header-right .CloudGameLink,
.Header-menu-wrap .DropMenuList-ad,
.public-DropMenu-drop-main div.Header-UserPane-top~div,
#js-player-dialog .LiveRoomLoopVideo,
.Header-search-wrap .Search  label,
.RedEnvelopAd.RedEnvelopAdMouseDisable,
.Barrage .Barrage-userEnter{
display:none !important;
}

/* 一般禁用模式 */
.layout-Player-main #js-player-toolbar{
display:block;
}
#root div.layout-Main{
  margin-top:70px !important;
  display:block !important;
  width:auto !important;
  max-width:auto !important;
}
#root>div,
#root>div .wm-general-bgblur
{
background-image:none !important;
}

.Title-roomInfo .Title-row:nth-child(1),
.Title-roomInfo .Title-row:nth-child(2) {
 display:block !important;
}

 .layout-Player-main .Title-roomInfo .is-normal .Title-blockInline,
 .layout-Player-main .Title-roomInfo .is-normal:nth-child(2)

  {
  display:none !important;
}

.layout-Player-main .Title-roomInfo .is-normal .Title-blockInline:nth-child(0),
.layout-Player-main .Title-roomInfo .is-normal .Title-blockInline:nth-child(1),
.layout-Player-main .Title-roomInfo .is-normal .Title-blockInline:nth-child(2)
 {
  display:inline-block !important;
 }

.Barrage-main .Barrage-content {
color:#333 !important;
}
.Barrage-main .Barrage-nickName{
color:#2b94ff !important;
}
.Barrage-listItem{
color: #333 !important;
background-color: #f2f5f6 !important;
}

.Header-search-wrap input#header-search-input::placeholder {
   color: transparent !important;
   opacity:0 !important;
}

#js-aside,
.layout-Player-main #js-player-toolbar {
   display:none;
}
.js-noblefloating-barragecont {
  background: none !important;
  border: none !important;
}


#js-barrage-container .Barrage-main>div>div {
  margin-bottom: -20px !important;
}

.ChatSpeak .ChatBarrageCollect-tip {
  width:auto !important;
}

.Title-followBtnBox {
  white-space: inherit !important;
}

.Header-follow-tabs,
.Header-history-tabs {
  display:flex  !important;
  justify-content: center  !important;
}


${pk}
${headerDarkCss}
${dark}


` : ''
export default css
