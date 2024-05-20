
import { is_huya, isShowGiftRank, isShowFansIcon, isShowSysMsg } from "../utils"
import dark from './dark/trigger.css.dark'



// 系统消息
const sys_msg = isShowSysMsg() ? '' :

  `
.treasureChest-winningRecord,
.chat-room__list .msg-auditorSys,
.chat-room__list .msg-sys {
  display:none !important;
}

`



// 排行榜
const ranking = isShowGiftRank() ? ''
  :
  `
.room-weeklyRankList,
#J_roomSideHd{
   display: none !important;
 }

`

// 粉丝徽章
const fans_img = isShowFansIcon() ? ''
  :
  `

.chat-room__list .msg-bubble-decorationPrefix img,
.chat-room__list .msg-normal-decorationPrefix,
.chat-room__list .msg-normal-decorationSuffix,
.chat-room__list .msg-bubble-decorationSuffix,
.chat-room__list .msg-bubble-decorationPrefix 
{
  display:none !important;
}

.chat-room__list .msg-bubble .colon,
.chat-room__list .msg-bubble .msg,
.chat-room__list .msg-bubble
{
  background:none !important;
}
`

const css = is_huya ? `
 
.game-live-item i,.host-name {
  cursor:pointer;
}
.game-live-item .txt i:hover,.host-name:hover {
  color:rgb(255, 135, 0);
}
 
/* NONE */
.pre-ab-wrap,#pre-ab-wrap,.pre-ab-video,#pre-ab-video,
[class^=GuangG],.J_ad,#public-screen-ab, #ab-banner,.room-hd #ProfileGroup,
#player-ext-wrap,#J_noticeLive,.chat-room__list div[data-cmid="1"],
#public-screen-ab,.superFans-fansDay,
[class^=ChatPanelRoot] [class^=PanelFt] [class^=text],
.helperbar-root--12hgWk_4zOxrdJ73vtf1YI,[class^=helperbar-root],
.mod-index-wrap .mod-index-main .main-bd,
.mod-index-wrap .mod-index-main .main-hd,
.mod-index-wrap #js-main,#J_treasureChestContainer,
.mod-index-wrap #banner,.player-banner-activity,
.mod-index-wrap .mod-game-type,
.mod-index-wrap .mod-actlist,
.mod-index-wrap .mod-news-section,
.mod-index-wrap .mod-index-list .live-box #J_adBnM,
.mod-index-wrap .mod-index-recommend,
.mod-index-wrap .mod-news-section,
.mod-index-wrap .recommend-wrap,
#player-marquee-wrap,.small-handle-tip,
#player-marquee-wrap .player-marquee-noble-item,
#player-marquee-wrap .player-banner-enter,
#player-marquee-wrap [id^=player-banner-enter],
#player-marquee-wrap [id^=player-marquee],
.RoomPublicMessage--n3v61Bk0DehYuR0xEQ9S1,[class^=RoomPublicMessage],
#huya-ab-fixed,
#huya-ab,
.liveList-header-r,
.room-footer,
#J_profileNotice,
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
 #main_col #matchComponent2{
    display:none !important;
 }
 
 .ssr-wrapper .mod-sidebar, .room-core #player-gift-wrap {
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

 #main_col,
#J_mainRoom{
   background:none !important;
 }

 
 #wrap-ext,

.chat-room__list .msg-noble,
.J_box_msgOfKing,
.chat-room__list .msg-onTVLottery{
    display: none !important;
 }
.chat-room__list .msg-bubble span.msg{
    color: #333 !important;
 }

.chat-room__list .msg-bubble .colon,
.chat-room__list .msg-bubble .msg,
.chat-room__list .name{
    color: #3c9cfe !important;
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
 
[class^=NavItem] span[class^=NavText] {
  color:#555 !important;
}
.duya-header-search input {
  background-color: #e5e7eb;
}
[class^=NavItem] [class^=NavItemHd] i[class*=fav] {
  background-image:url('https://a.msstatic.com/huya/hd/h5/header/components/HeaderDynamic/NavItem/img/fav-0.15b3e0b4a39185db705b7c523cd3f17c.png') !important;
}
 
[class^=NavItem] [class^=NavItemHd] i[class*=history] {
  background-image:url('https://a.msstatic.com/huya/hd/h5/header/components/HeaderDynamic/NavItem/img/history-0.2b32fba04f79057de5abcb2b35cd8eec.png') !important;
}


/* 评论区图片显示问题 */
.chat-room__list .msg img {
  display:inline-block !important;
 }


 ${fans_img}
 ${sys_msg}
 ${ranking}

${dark}

`: ''
export default css
