

import { is_douyu } from "../utils"
const css = is_douyu ? `

.layout-List-item .DyCover-content .DyCover-user,.layout-Cover-item .DyListCover-userName,.Title-blockInline .Title-anchorName h2{
  cursor:pointer !important;
}
.layout-List-item .DyCover-content .DyCover-user:hover,.layout-Cover-item .DyListCover-userName:hover,.Title-blockInline .Title-anchorName h2:hover {
  color:rgb(255, 135, 0) !important;
}

.layout-Section.layout-Slide .layout-Slide-player,
.layout-Slide-bannerInner,
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
#bc4-bgblur,
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

.layout-Player-aside .layout-Player-chat,.layout-Player-aside .layout-Player-chat .ChatToolBar {
display:block !important;
}


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
.layout-Main .Title-roomInfo .Title-row:nth-child(2) .Title-col.is-normal:last-child,
.layout-Main .ToTopBtn,
.Header-right .public-DropMenu-drop .DropPane-ad,
.Header-right .CloudGameLink,
.Header-menu-wrap .DropMenuList-ad,
.public-DropMenu-drop-main div.Header-UserPane-top~div,
#js-player-dialog .LiveRoomLoopVideo,
.Header-search-wrap .Search  label,
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
`: ''
export default css
