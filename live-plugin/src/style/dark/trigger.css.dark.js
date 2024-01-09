const darkCss = `
.dark .chat-room__list .msg-bubble .colon,
.dark .chat-room__list .msg-bubble .msg,
.dark .chat-room__list .msg-bubble
{
  background:none !important;
}



/* 修改背景和字体颜色 */
.dark #J_roomWeeklyRankListRoot [class^=UserRankInfo],
.dark #J_roomWeeklyRankListRoot [class^=NobleApp],
.dark #J_roomWeeklyRankListRoot [class^=seat-item],
.dark #J_roomWeeklyRankListRoot [class^=userRank],
.dark .room-weeklyRankList-nav-item,
.dark .room-weeklyRankList-nav-item.room-weeklyRankList-nav-item-active,
.dark #J_roomWeeklyRankListRoot [class^=Item],
.dark #J_roomWeeklyRankListRoot [class^=item],
.dark [class^=room-weeklyRankList-skeleton],
.dark #J_roomWeeklyRankListRoot [class^=rank-item],
.dark #J_roomWeeklyRankListRoot [class^=SlideDownView],
.dark .room-core,
.dark input,
.dark input:focus,
.dark textarea,
.dark textarea:focus,
.dark .hy-header-style-normal .duya-header-wrap,
.dark .duya-header,
.dark .duya-header .duya-header-bd,
.dark #J_liveListNav dl dd [class^=role],
.dark #J_liveListNav dl dd [class^=role]:hover,
.dark #J_liveListNav dl dd div li,
.dark #J_liveListNav dl dd div li:hover,
.dark [class^=emoticon] [class^=emot],
.dark .program-preview-box .preview-bd,
.dark .game-live-item,
.dark .game-live-item .txt .num,
.dark .game-live-item .txt .game-type a,
.dark .game-live-item .txt .game-type,
.dark .live-box .box-hd .more-list li,
.dark #J_duyaHeaderRight ul li a,
.dark [class^=Category] [class^=SecTitle],
.dark [class^=listItem],.dark [class^=listItem] span,
.dark .nav-expand-list,
.dark .nav-expand-list-more ,
.dark #js-game-list li,
.dark .mod-list .box-hd .filter dd .tag-layer,
.dark .room-hd,.dark .room-core-r,
.dark .room-sidebar,.dark .room-player-gift-placeholder,
.dark #chat-room__wrap #chat-room__list div,.dark #chat-room__wrap #chat-room__list div a,
.dark #js-preview-box,.dark #recom-banners,.dark #tipsOrchat,
.dark .banners-box,.dark .box-recom .recom-banners,.dark .box-recom .recom-moments,
.dark .hotMoment-box .moment-item .moment-comment .comment-item,
.dark .chat-room__input,.dark .chat-room__ft,
.dark .room-panel,
.dark .subscribe-live-item,.dark .list-hd .follow-ctrl,
.dark .btn-more,.dark #js-search-main .host-item,.dark #js-search-main .host-item .desc,
.dark .search-left .superStar-item,.dark .chat-room__input .btn-sendMsg ,
.dark .nav-expand-list.nav-expand-game span a,.dark .chat-room__ft .chat-emot div,
.dark #tipsOrchat ._PortalChatPanelRoot div, .dark .ddJUGO,
.dark .laypageskin_default a,.dark .laypage_main button,.dark .laypage_main input,
.dark .player-gift-wrap,
.dark [class^=checkbox][class^=checked] i,
.dark .chat-room__bd .chat-room__scroll .clearBtn,
.dark .chat-room__bd .chat-room__scroll .lockBtn,
.dark [class^=panel],
.dark [class^=Panel],
.dark [class^=PanelHd],
.dark [class^=PanelBd],
.dark [class^=PanelFt],
.dark [class^=PopMsg],.dark [class^=PopMsg] [class^=title],.dark [class^=PopMsg] [class^=desc],
.dark [class^=PopMsg] [class^=PopMsgArr],
.dark .room-hd .host-control .subscribe-entrance .subscribe-hd.sub-off,
.dark .duya-header-search input,.dark .inpage-advice-list li:hover,
.dark #play2 .content .content-aside>div,.dark #play2 .content .content-aside>div h2,
.dark #play2 .content .content-aside>div .more,.dark .main-info,
.dark .comment-container textarea, .dark .main-vplayer .vplayer-wrap .video_embed .video_embed_flash,
.dark .loGrI3HWkrL4-I82d11qx,
.dark .loGrI3HWkrL4-I82d11qx ._5zt-PSmfE5nKpsIw9OQE,
.dark .loGrI3HWkrL4-I82d11qx ._5zt-PSmfE5nKpsIw9OQE .MuTvmvGkEFS9kogNu9hjs, 
.dark .loGrI3HWkrL4-I82d11qx ._5zt-PSmfE5nKpsIw9OQE .MuTvmvGkEFS9kogNu9hjs:focus,
.dark #play2, .dark .duya-header-bd,.dark .aside-danmulist .danmulist-header,
.dark .search-suggest, .dark .search-suggest ,
.dark .search-suggest .search-item:hover,
.dark .search-suggest .search-item.current,
.dark #J_liveListNav dl dd span,
.dark #player-gift-wrap,.dark .player-all-gift-panel,
.dark #player-box-panel,
.dark .more-attivity-panel,.dark [class^=roomBlockWords],
.dark [class*=msg-of-king],
.dark [class^=ButtonMon],
.dark #player-gift-tip .mic-name-color,
.dark #player-gift-tip .make-friend-people-switch,
.dark [class^=ucard],.dark .msg-bubble,.dark .chat-room__wrap,
.dark .game-live-item .txt .room,
.dark .huya-footer{
  background-color: var(--w-bg-darker) !important;
  color: var(--w-text-light) !important;
  outline: none !important;
}


/* 弹幕白条问题 */
.dark [class^=RoomMessageRichText],
.dark .msg-bubble {
  border:none  !important;
  margin:0 !important;
}


/* 修改字体颜色 */
.dark .hy-nav-item-on .hy-nav-link,
.dark .hy-nav-link:hover {
  background-color: none !important;
  color: #fff !important;
}


/* 修改border */

.dark .loGrI3HWkrL4-I82d11qx ._5zt-PSmfE5nKpsIw9OQE,
.dark .search-suggest .search-item:hover,
.dark .search-suggest .search-item.current {
  background-color:none !important;
  border:1px solid var(--w-text-light) !important;
  outline: none !important;
}

/* 修改字体颜色 */
.dark .duya-header a, .dark p,.dark span,
.dark h1,.dark h2, .dark h3,.dark h4,.dark h5,.dark h6
.dark .duya-header-nav .hy-nav-item a,
.dark .duya-header-right a,
.dark .liveList-title a,
.dark .game-live-item .title,
.dark .game-live-item .txt,
.dark  .duya-header i,
.dark .video-funny .title span,
.dark .live-box .box-hd .title a,
.dark .hy-header-style-skr .hy-nav-link,
.dark [class^=Category] [class^=Item] a,
.dark #js-game-list li a .g-gameCard-fullName,
.dark .box-hd .title,
.dark .mod-list .box-hd .filter dd .tag-layer,
.dark .room-hd .host-info .host-title,
.dark .room-hd .host-name,
.dark .recom-title,
.dark .page-ctrl,
.dark .page-ctrl .ctrl-left,
.dark .page-ctrl .ctrl-right,
.dark .page-ctrl .ctrl-page,
.dark #chat-room__wrap #chat-room__list div a,
.dark #chat-room__wrap #chat-room__list div a span,
.dark .program-preview-box .preview-list .preview-item .preview-link,
.dark .program-preview-box .preview-hd .title,
.dark .program-preview-box .preview-list .preview-item .preview-line,
.dark .chat-room__list .msg-bubble span.msg,
.dark .subscribe-live-item .txt .msg-row .nick,
.dark .subscribe-live-item .txt .msg-row .intro,
.dark .subscribe-live-item .txt .msg-row .num,
.dark .list-hd .title,
.dark .list-hd .follow-ctrl .icon,
.dark .search-left .superStar-item .nick,
.dark .search-left .superStar-item .recommend,
.dark .search-left .superStar-item .room,
.dark .chat-room__list .msg-bubble .colon,
.dark .chat-room__list .msg-bubble .msg,
.dark .chat-room__input .btn-sendMsg,
.dark #tipsOrchat .live-tips,
.dark #tipsOrchat ._PortalChatPanelRoot div p,
.dark #tipsOrchat ._PortalChatPanelRoot div span,
.dark #tipsOrchat ._PortalChatPanelRoot div i,
.dark [class^=checkbox] i,
.dark [class^=checkbox] span,
.dark [class^=listItem],.dark [class^=listItem] span,
.dark [class^=barrageBox] [class^=title],
.dark [class^=barrageBox] [class^=panel], 
.dark [class^=panel],
.dark .chat-room__ft span,.dark .chat-room__ft p,
.dark .duya-header-right a i,
.dark .duya-header-right a span,
.dark #player-gift-tip .super-fans-gift .super-fans-gift-content i,
.dark #player-gift-tip .motorcade-gather-gift,.dark #player-gift-tip .mic-name,
.dark .chat-room__bd .chat-room__scroll .clearBtn,
.dark .chat-room__bd .chat-room__scroll .lockBtn,
.dark .search-advice-list li a,.dark .search-header .find-result,
.dark #play2 .crumb,.dark #play2 .crumb a,.dark .live-box .box-hd .more-list li a,
.dark #player-gift-dialog gift-yellow,
.dark .aside-videolist .video-item .item-detail .detail-nick span, dark .aside-videolist .video-item .item-detail .detail-playcount span
.dark .live-box .box-hd .more-list li a{
  color: var(--w-text-light) !important;
}


/* 修改字体颜色 hover */
.dark .liveList-title a:hover,.dark .game-live-item .title:hover,.dark .game-live-item .txt:hover,.dark .live-box .box-hd .title a:hover,.dark .live-box .box-hd .more-list li a:hover,
.dark #js-game-list li a .g-gameCard-fullName:hover,.dark .box-hd .title:hover,.dark .game-live-item .txt i:hover,.dark .host-name:hover,.dark .mod-list .box-hd .filter dd .tag-layer:hover,
.dark .subscribe-live-item .txt .msg-row .nick:hover,.dark .subscribe-live-item .txt .msg-row .intro:hover,.dark .list-hd .title:hover,.dark  #js-search-main .host-item .nick,
.dark .search-main .type-keyword,.dark #tipsOrchat .live-tips i,.dark .duya-header-right a:hover,.dark .duya-header-right a i:hover,.dark .duya-header-right a span:hover,.dark .chat-room__bd .chat-room__scroll .clearBtn:hover,
.dark .chat-room__bd .chat-room__scroll .lockBtn:hover,.dark .main-info .info-video .video-detail .video-title,
.dark .main-info .info-video .video-author h3,
.dark .search-header .find-result em,.dark .aside-videolist .video-item:hover .item-detail h3,
.dark dark [class^=FavoritePresenter] [class^=subscribe],
.dark dark [class^=FavoritePresenter] [class^=subscribe] [class^=subscribe],
.dark dark [class^=Category] [class^=Item] a:hover
{

  color: var(--w-text) !important;
}



/* 修改border */
.dark .program-preview-box,.dark .recom-banners,.dark .recom-moments,.dark .game-live-item,.dark .nav-expand-list,
.dark #js-game-list li,.dark .g-gameCard-item,.dark .room-sidebar,.dark .list-hd .follow-ctrl,.dark .btn-more,.dark #js-search-main .host-item,.dark .subscribe-live-item,
.dark .chat-room__input .btn-sendMsg,.dark .laypageskin_default a,.dark .chat-room__bd .chat-room__scroll .clearBtn,.dark .chat-room__bd .chat-room__scroll .lockBtn,
.dark .main-info .info-draw,.dark .main-info .info-comment,.dark .main-info .info-comment h2,
.dark #chat-room__wrap #chat-room__list [class^=RoomMessageRichText]{
  border:1px solid var(--w-border) !important;
  outline: none !important;
}


.dark .room-hd .host-control .subscribe-entrance .subscribe-hd.sub-off:hover,
.dark .nav-expand-list.nav-expand-game span:hover {
  background-color: var(--w-bg-darker) !important;
  color: var(--w-text-light) !important;
  outline: none !important;
}


.dark [class^=roomBlockWords] li,
.dark [class^=panel] [class^=panel-hd] [class^=box] [class^=box-hd],
.dark [class^=panel] [class^=panel] [class^=lock] {
  background: var(--w-bg-darker) !important;
  color: var(--w-text-light) !important;
}


.dark .hy-header-style-normal .duya-header-wrap,.dark #player-gift-wrap,
.dark .duya-header,.dark .player-all-gift-panel,.dark .player-all-gift-panel .arrow,
.dark .chat-room__input,.dark #player-gift-tip,.dark .player-face li .player-superfans-card-count,
.dark .player-face li .player-superfans-card-count,
.dark #player-gift-tip,.dark #player-gift-tip .make-friend-people-switch,
.dark #player-gift-tip .make-friend-unsubscribe,
.dark #player-gift-tip .make-friend-line,
.dark #player-gift-tip .bottom,.dark #player-pc-watch-btn,
.dark .inpage-advice-list li,.dark #play2 .content .content-aside>div .more
{
  background-color: var(--w-bg-darker) !important;
  border-color:var(--w-border) !important;
  outline: none !important;
}


/* 只修改border-color */
.dark .chat-room__input,
.dark .chat-room__ft .chat-room__ft__chat,
.dark ._2uc0_gzwdW4cbL_UOgWDJd,
.dark #tipsOrchat{
  border-color:var(--w-border) !important;
  outline: none !important;
}

.dark #duya-header,
.dark #chat-room__wrap #chat-room__list div a,
.dark #chat-room__wrap #chat-room__list div a span {
  border:none !important;
  outline: none !important;
}

.dark .laypageskin_default a:hover,
.dark .comment-container textarea,.dark .room-hd .host-control .subscribe-entrance .subscribe-hd.sub-off .subscribe-count,
.dark .nav-expand-list.nav-expand-game span a:hover{
  border-color:var(--w-text-light) !important;
}


/* 修改border color background */
.dark .laypage_main button:hover,
.dark .laypageskin_default .laypage_curr,
.dark #J_duyaHeaderRight ul li a,
.dark .chat-room__bd .load-more-msg,
.dark .ixyGIy,.dark .room-weeklyRankList-content.room-weeklyRankList-content-loading,

.dark .laypageskin_default a:hover {
  color: var(--w-text);
  border-color:var(--w-text) !important;
  background-color: var(--w-bg-darker) !important;
}

.dark .chat-room__bd .chat-room__scroll .clearBtn,
.dark .chat-room__bd .chat-room__scroll .lockBtn,
.dark .hy-header-style-normal .duya-header-search input,
.dark .comment-container textarea:focus,.dark #pub_msg_input,
.dark .room-hd .host-control .subscribe-entrance .subscribe-hd.sub-off
{
  border:1px solid var(--w-text-light) !important;
  outline: none !important;
}


.dark [class^=ChatSpeaker] textarea:focus,
.dark [class^=roomBlockWords] li,
.dark .hy-header-style-normal .duya-header-search input:focus {
  border:1px solid var(--w-text) !important;
  outline: none !important;
}



.dark [class^=MmdPopPanel],
.dark .msg-of-king,.dark [class^=roomBlockWords] [class^=btn],
.dark [class^=SubConfirmPop],
.dark [class^=SubConfirmPop] span,
.dark [class^=SubConfirmPop] [class^=control] span,
.dark [class^=colorNormal],
.dark #player-danmu-report,
.dark #pc-watch-download-tips,.dark #pc-watch-download-tips,
.dark [class^=colorNormal][class^=lock],
.dark [class^=ucard-normal],
.dark .chat-room__list .msg-timed span,
.dark [class^=PanelGuide] [class^=ClubPrivilege] [class^=Privilege] [class^=item],
.dark [class^=panel] [class^=panel] [class^=lock] [class^=btn],
.dark .hy-nav-item-on .hy-nav-link, .dark .hy-nav-link:hover,
.dark #search-bar-input,.dark [class^=barrageBox],
.dark [class^=FanClub] [class^=tips],
.dark #player-gift-tip .list .btn,
.dark #player-gift-dialog .btn,
.dark .room-hd .host-control .subscribe-entrance .subscribe-hd.sub-on,
.dark .room-hd .host-control .subscribe-entrance .subscribe-hd.sub-off
 {
  background-color: var(--w-bg-darker) !important;
  border:1px solid var(--w-text) !important;
  color: var(--w-text-light) !important;
  outline: none !important;
}



.dark [class^=panel] [class^=panel-bd] [class^=box-hd],
.dark [class^=colorDefault],
.dark [class^=PanelFt] [class^=btn],
.dark #player-gift-dialog,
.dark [class^=PanelGuide] [class^=btn]
 {
  background: var(--w-bg-darker) !important;
  border:1px solid var(--w-text) !important;
  color: var(--w-text-light) !important;
  outline: none !important;
}



.dark #player-gift-dialog .btn:hover,
.dark [class^=SubConfirmPop] span:hover,
.dark #player-gift-tip .list .btn:hover,
.dark #player-gift-tip .list .btn.send,
.dark #J_liveListNav dl dd ul li ul li:hover,
.dark [class^=SubConfirmPop] [class^=control] span:hover,
.dark .room-hd .host-control .subscribe-entrance .subscribe-hd.sub-on:hover,
.dark .room-hd .host-control .subscribe-entrance .subscribe-hd.sub-off:hover{
  background: var(--w-bg) !important;
  border:1px solid var(--w-text-light) !important;
  color: var(--w-text) !important;
  outline: none !important;
}

.dark .host-item .avatar .avatar-mask,
.dark .superStar-item .avatar .avatar-mask {
  background:none !important;
}


.dark #J_liveListNav dl dd span:hover,
.dark #J_duyaHeaderRight ul li a:hover,
.dark .g-gameCard-link:hover{
  background: var(--w-bg) !important;
  color: var(--w-text) !important;
  outline: none !important;
}

.dark .chat-room__ft .chat-room__ft__pannel .room-chat-tool-color {
  width: 20px !important;
  height: 20px !important;
  background: var(--w-bg-darker) !important;
  border:1px solid var(--w-text) !important;
  color: var(--w-text-light) !important;
  border-radius:50%; !important;
  position:relative !important;
}

.dark #J-room-chat-color::before {
  content: '饰';
  left:50% !important;
  top:50% !important;
  position: absolute !important;
  transform: translate(-50%,-50%) !important;
}

.dark #msg_send_bt {
  border-left : 1px solid var(--w-text) !important;
}

.dark #J_user_viewer_root + div,
.dark .J_RoomFollowRoot + div,
.dark .fansBadgeAnchor-box,
.dark .J_roomWeeklyRankList,
.dark .room-sidebar-hd,
.dark #J_roomHdHostLvInfo,
.dark .room-weeklyRankList-nav,
.dark #J_roomWeeklyRankListRoot [class^=tabPane],
.dark #J_RoomChatSpeaker textarea,
.dark [class^=HonorInfo],

.dark .player-face .player-face-arrow,
.dark .player-face li .plaer-face-icon-bg,
.dark [class^=ButtonMon] [class^=sub],
.dark [class^=ButtonMon] [class^=btn]
 {
  background: var(--w-bg-darker) !important;
  border:1px solid var(--w-border) !important;
  color: var(--w-text) !important;
  outline: none !important;
}

.dark #J_roomWeeklyRankListRoot [class^=Item]:hover,
.dark #J_roomWeeklyRankListRoot [class^=item]:hover,
.dark #J_roomWeeklyRankListRoot [class^=seat-item]:hover,
.dark #J_roomWeeklyRankListRoot [class^=rank-item]:hover{
  background: var(--w-bg) !important;
}



`

export default darkCss

