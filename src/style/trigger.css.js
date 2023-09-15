
import { is_huya } from "../utils"
import dark from './dark/trigger.css.dark'
const css = is_huya ? `

.game-live-item i,.host-name {
  cursor:pointer;
}
.game-live-item .txt i:hover,.host-name:hover {
  color:rgb(255, 135, 0);
}
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
.RoomPublicMessage--n3v61Bk0DehYuR0xEQ9S1,
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
 .end-ab-banner,
 .player-app-qrcode,
 .player-play-big, .chat-room__list .msg-nobleSpeak-decorationPrefix,
 #main_col #matchComponent2,
.room-weeklyRankList{
    display:none !important;
 }

 .ssr-wrapper .mod-sidebar, .room-core #player-gift-wrap, {
   display:none;
 }

 .hy-nav-item:nth-child(1),
 .hy-nav-item:nth-child(2),
 .hy-nav-item:nth-child(3),
 #J_duyaHeaderRight>div>div>div:nth-child(3),
 #J_duyaHeaderRight>div>div>div:nth-child(4)
 {
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
  
 .mod-sidebar,
.room-core #player-gift-wrap{
  display:none ;
}

 #player-ctrl-wrap {
  opacity: 0;
  transition: all 500ms ease-in 0s !important;
  bottom: 16px;
 }
#J_playerMain:hover #player-ctrl-wrap{
   opacity: 1;
}

${dark}

`: ''
export default css
