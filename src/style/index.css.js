import { addStyle } from '../utils/index.js';


// 样式部分
addStyle(`
.m-container,
.m-container .btn,
.m-container table,
.m-container table tbody,
.m-container table thead,
.m-container table tr {
  margin: 0 !important;
  padding: 0 !important;
  border: none;
  outline: none;
}

.m-container {
  --m-font-color: #fff;
  --m-container-backgournd-color: #fff;
  --m-container-width: 700px;
  --m-container-height: 400px;
  --m-container-operation-right-width: 150px;
  --m-container-input-width: 150px;
  --m-container-box-transition: all 0.4s ease-in-out;
  --m-container-select-width: var(--m-container-input-width);
  --m-container-input-outline: 1px solid rgba(8, 125, 235, 0.6) !important;
}

.m-container {
  box-sizing: border-box !important;
  position: fixed !important;
  flex-direction: column !important;
  width: var(--m-container-width) !important;
  height: var(--m-container-height) !important;
  top: 100px !important;
  left: 50% !important;
  border-radius: 10px !important;
  overflow: hidden !important;
  background-color: var(--m-container-backgournd-color) !important;
  z-index: 999999999 !important;
  padding: 15px !important;
  transition: var(--m-container-box-transition) !important;
  box-shadow: 20px 20px 10px rgba(0, 0, 0, 0.1),
    -1px -2px 18px rgba(0, 0, 0, 0.1) !important;

  opacity: 0;
  transform: translate(-50%, -100%);
}

.m-container-is-active {
  opacity: 1;
  transform: translate(-50%, 0%);
}

.m-container-box {
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  height: 100% !important;
}

.m-container .operation {
  box-sizing: border-box !important;
  height: auto !important;
  justify-content: start !important;
}


.m-container input[type="text"] {
  width: var(--m-container-input-width) !important;
  box-sizing: border-box !important;
  border: 1px solid rgba(8, 125, 235, 0.6) !important;
  outline: none !important;
  padding: 5px 10px !important;
  border-radius: 20px !important;
  transition: var(--m-container-box-transition);
}

.m-container input:focus {
  border: 1px solid rgba(8, 125, 235, 1) !important;
}

.m-container .operation input[type="checkbox"] {
  display: inline !important;
}

.m-container .operation input[type="file"] {
  display: none !important;
}

.m-container table {
  position: relative !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  text-align: left !important;
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
}

.m-container table tr {
  margin: 5px 0 !important;
  display: flex !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4) !important;
  justify-content: space-between;
}

.m-container table tr td:nth-child(1),
.m-container table thead th:nth-child(1) {
  width: 50px;
  text-align: center !important;
}

.m-container table tr td:nth-child(2),
.m-container table tr td:nth-child(3),
.m-container table tr td:nth-child(4),
.m-container table thead th:nth-child(2),
.m-container table thead th:nth-child(3),
.m-container table thead th:nth-child(4) {
  flex: 1 !important;
  text-align: center !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.m-container table tbody {
  flex: 1 !important;
  overflow: auto !important;
}

.m-container table th,
.m-container table td {
  padding: 10px !important;
}

.m-container table tbody tr:nth-child(1) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.4) !important;
}

.m-container .m-link,
.m-container .m-link:visited {
  color: blnk !important;
}

.m-container .m-link:hover {
  color: blue !important;
  text-decoration: underline !important;
}

.m-container .btn {
  cursor: pointer !important;
  padding: 5px 8px !important;
  border: none !important;
  color: var(--m-font-color) !important;
  font-size: 1rem !important;
  border-radius: 20px !important;
  margin: 0 !important;
  background-color: rgba(166, 169, 173, 1) !important;
  z-index: 1000 !important;
  outline: none !important;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4), 0px 0px 1px rgba(0, 0, 0, 0.4) !important;
}

.m-container .btn:hover {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1) !important;
}

.m-container .btn:hover {
  background-color: rgba(166, 169, 173, 0.6) !important;
}

.m-container .btn-primary {
  background-color: rgba(64, 158, 255, 1) !important;
}

.m-container .btn-primary:hover {
  background-color: rgba(64, 158, 255, 0.6) !important;
}

.m-container .btn-success {
  background-color: rgba(103, 194, 58, 1) !important;
}

.m-container .btn-success:hover {
  background-color: rgba(103, 194, 58, 0.6) !important;
}

.m-container .btn-info {
  background-color: rgba(119, 119, 119, 1) !important;
}

.m-container .btn-info:hover {
  background-color: rgba(119, 119, 119, 0.6) !important;
}

.m-container .btn-warning {
  background-color: rgba(230, 162, 60, 1) !important;
}

.m-container .btn-warning:hover {
  background-color: rgba(230, 162, 60, 0.6) !important;
}

.m-container .btn-danger {
  background-color: rgba(245, 108, 108, 1) !important;
}

.m-container .btn-danger:hover {
  background-color: rgba(245, 108, 108, 0.6) !important;
}

#m-container-box1 {
  position: absolute !important;
  z-index: 10000000 !important;
  transition: var(--m-container-box-transition) !important;
  width: 100% !important;
  height: 100% !important;
}

#m-container-box2 {
  position: absolute !important;
  z-index: 9999 !important;
  transition: var(--m-container-box-transition) !important;
  ;
  width: 100% !important;
  height: 100% !important;
}

.m-ani-left-is-active {
  transform: translateX(0) !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.m-ani-left-is-close {
  transform: translateX(-100%) !important;
  visibility: hidden !important;
  opacity: 0 !important;
}

.m-ani-right-is-active {
  transform: translateX(0) !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.m-ani-right-is-close {
  transform: translateX(100%) !important;
  visibility: hidden !important;
  opacity: 0 !important;
}

.m-type-container .m-type-item {
  display: flex !important;
  height: 30px !important;
}

.m-type-container .m-type-item .m-type-item-left {
  flex: 1 !important;
  position: relative !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
}

.m-type-container .m-type-item .m-type-item-right {
  width: var(--m-container-operation-right-width);
  text-align: center !important;
}

.m-type-container .m-type-item .m-type-item-left .m-select-option-container,
.m-type-container .m-type-item .m-type-item-left .m-select-input-container {
  transition: var(--m-container-box-transition) !important;
  position: absolute !important;
  width: 100% !important;
}

.m-type-container .m-select {
  display: flex !important;
}

.m-type-container .m-select .m-select-item {
  margin-right: 10px !important;
}

.m-type-container .m-select .m-select-item:last-child {
  margin-right: 0 !important;
}

.m-type-container .m-select select {
  width: 100px !important;
  color: rgba(119, 119, 119, 0.9) !important;
}

.m-type-container .m-select select::placeholder {
  color: rgba(119, 119, 119, 0.9) !important;
}

.m-type-container .m-tag-select {
  width: calc(var(--m-container-select-width)/2) !important;
  ;
  outline: none !important;
  border: 1px solid rgba(8, 125, 235, 0.6) !important;
  padding: 5px 8px !important;
  padding: 5px 10px !important;
}

.m-container select {
  border: 1px solid rgba(8, 125, 235, 1) !important;
}


.m-type-container .m-select .m-option-default {
  color: rgba(119, 119, 119, 0.6) !important;
}

.m-type-container input[type="text"] {
  width: 350px !important;
}

.m-type-container .m-select input {
  width: var(--m-container-input-width) !important;
}

.m-type-container .m-search-msg {
  color: red !important;
}

    .m-span-text {
        transition: all 0.3s ease;
        cursor: pointer !important;
        opacity: 0;
        float:right;
        display:inline-block;
        margin:0 10px;
        transform: scale(0.5);
        font-size:20px;
        position:relative;
    }

    .m-span-text::before{
        content:"🧹";
        cursor: pointer !important;
    }


   /***************************************************斗鱼直播***************************************************************************/
   .game-live-item i,.host-name {
       cursor:pointer;
   }
   .game-live-item .txt i:hover,.host-name:hover {
       color:rgb(255, 135, 0);
   }
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
   #js-room-activity,
   #js-right-nav,
   #js-bottom,
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
   .layout-Player-barrage{
       position: absolute !important;
       top: 0 !important;
    }

    .Header-search-wrap input#header-search-input::placeholder {
        color: transparent !important;
        opacity:0 !important;
    }


 /***************************************************虎牙直播***************************************************************************/
   .helperbar-root--12hgWk_4zOxrdJ73vtf1YI,
   .mod-index-wrap .mod-index-main .main-bd,
   .mod-index-wrap .mod-index-main .main-hd,
   .mod-index-wrap #js-main,
   .mod-index-wrap #banner,
   .mod-index-wrap .mod-game-type,
   .mod-index-wrap .mod-actlist,
   .mod-index-wrap .mod-news-section,
   .mod-index-wrap .mod-index-list .live-box #J_adBnM,
   .mod-index-wrap .mod-index-recommend,
   .mod-index-wrap .mod-news-section,
   .mod-index-wrap .recommend-wrap,
   #huya-ab-fixed,
   #huya-ab,
   .liveList-header-r,
   .room-footer,
   .J_roomSideHd,
    #J_roomSideHd,
    #match-cms-content,
    #matchComponent2,
   .hy-nav-item,
   .list-adx,
   .layout-Banner,
    #J_duyaHeaderRight>div>div>div,
    .nav-expand-list .third-clickstat,
    #main_col .special-bg,
    .player-recommend.recommend-ab-mode .end-ab-wrap,
    .chat-wrap-panel.wrap-income,
    .match-room .match-nav,
    .host-detail.J_roomHdDetail span,
    .host-detail.J_roomHdDetail .host-video,
    .room-hd-r .jump-to-phone,
    .room-hd-r #share-entrance,
    .room-hd-r #J_illegalReport,
    .room-hd-r .gamePromote.J_gamePromote,
    .main-wrap .room-mod-ggTop,
    #chatRoom .room-gg-chat,
    .room-core .room-business-game,
    .room-backToTop.j_room-backToTop,
   .room-weeklyRankList{
       display:none !important;
    }

    .ssr-wrapper .mod-sidebar, .room-core #player-gift-wrap, {
      display:none;
    }

    .hy-nav-item:nth-child(1),
    .hy-nav-item:nth-child(2),
    .hy-nav-item:nth-child(3),
    #J_duyaHeaderRight>div>div>div:nth-child(3){
      display:inline-block !important;
    }
    .mod-index-wrap .mod-index-list{
      margin-top:80px !important;
    }
    .duya-header{
      background: hsla(0,0%,100%,.95)  !important;
      border-bottom: 1px solid #e2e2e2 !important;
      box-shadow: 0 0 6px rgb(0 0 0 / 6%) !important;
    }
    .duya-header a,.duya-header i{
     color:#000 !important;
    }
    /*******直播间样式*****/
   .chat-room__list .msg-normal,.chat-room__list .msg-bubble,#J_mainRoom{
      background:none !important;
    }
    #wrap-ext,
   .chat-room__list .msg-normal-decorationPrefix,
   .chat-room__list .msg-normal-decorationSuffix,
   .chat-room__list .msg-bubble-decorationPrefix,
   .chat-room__list img,
   .chat-room__list .msg-noble,
   .chat-room__list .msg-sys,
   .chat-room__list .msg-auditorSys,
   .J_box_msgOfKing,
   .chat-room__list .msg-onTVLottery{
       display: none !important;
    }
   .chat-room__list .msg-bubble span.msg{
       color: #333 !important;
       background:none!important;
    }
   .chat-room__list .msg-bubble .colon,
   .chat-room__list .msg-bubble .msg,
   .chat-room__list .name{
       color: #3c9cfe !important;
       background:none!important;
     }

     #search-bar-input::placeholder{
        color: transparent !important;
        opacity:0 !important;
     }



     /********************************Bilibili********************************** */
     div#i_cecream .floor-single-card,
     div#i_cecream .bili-live-card.is-rcmd,
     div#i_cecream .adblock-tips,
     div.video-container-v1 div.pop-live-small-mode.part-undefined,
     .recommended-swipe.grid-anchor,
     .video-page-special-card-small
     {
        display:none !important;
     }

    /* 输入框*/
    .nav-search-content>input::placeholder {
        color: transparent;
        opacity:0 !important;
    }

    .m-bilibili-btn {
        cursor: pointer !important;
        background: #FFFFFF !important;
        background: var(--bg1_float) !important;
        border: 1px solid #E3E5E7 !important;
        border: 1px solid var(--line_regular) !important;
        border-radius: 8px !important;
        box-sizing: border-box !important;
        padding: 6px !important;
        margin-bottom: 6px !important;
        color: #18191C !important;
        color: var(--text1) !important;
        line-height: 14px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 40px;
    }

    .bili-video-card__info--bottom:hover .m-span-text,
    .video-page-card-small:hover .m-span-text,
    .up-info-container:hover .m-span-text,
    .video-page-operator-card-small:hover .m-span-text
     {
        opacity: 1;
        transform: scale(1.1);
        color:orange;
    }
`)
