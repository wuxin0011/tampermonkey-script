import { local_url } from "../../utils"








const index = `

/* 黑色主题模式下骨架屏 */
.dark .bili-video-card__skeleton--cover,
.dark .bili-video-card__skeleton,
.dark .bili-video-card__skeleton--right,
.dark .bili-video-card__skeleton hide,
.dark .bili-video-card__skeleton--text.short,
.dark .bili-video-card__skeleton--light,
.dark .bili-video-card__skeleton--text {
  background:var(--w-skeleton) !important;
}


/* 黑色主题模式下不显示壁纸 */
.dark #bili-header-banner-img {
  display:none !important;
}



.dark body,.dark #header-v3,.dark .app-v1,.dark .app-v2,.dark .app-v3,.dark .app-v4,.dark .app-v5,
.dark #app,
.dark .v-img,
.dark .header-channel,.dark .header-channel-fixed-right-item,
.dark .bili-video-card__wrap,.dark .bili-header .game,
.dark .large-header,
.dark .bili-header .slide-down,
.dark .bili-header .bili-header__channel .channel-entry-more__link, 
.dark .bili-header .bili-header__channel .channel-link,
.dark .bili-header .bili-header__channel .channel-items__left,
.dark .bili-header .bili-header__channel,
.dark .bili-header .manga,
.dark .bili-header .manga-right-title,
.dark .bili-header .header-fav-card__image,
.dark .bili-header .header-fav-card,
.dark .bili-header .search-panel,
.dark .bili-header .center-search-container .center-search__bar #nav-searchform.is-actived .nav-search-content, 
.dark .bili-header .center-search-container .center-search__bar #nav-searchform.is-focus .nav-search-content,
.dark .history-panel-popover,.dark .bili-header .bili-header__banner,
.dark .bili-header .center-search-container .center-search__bar #nav-searchform,
.dark .bili-header .center-search-container .center-search__bar .nav-search-content .nav-search-input:focus,
.dark .bili-header .avatar-panel-popover .level-item .level-item__bar .level-progress__inner,
.dark .bili-header .avatar-panel-popover .level-item .level-item__lv0,
.dark .bili-header .avatar-panel-popover .split-line,
.dark .bili-header .avatar-panel-popover .logout-item,
.dark .video-container-v1 .danmaku-box .danmaku-wrap,
.dark #i_cecream {
  background:var(--w-bg-darker) !important;
  color:var(--w-text) !important;
}


.dark .bili-header .header-avatar-wrap .header-avatar-wrap--container .bili-avatar,
.dark .bili-header .game-left,.dark .bili-header .game-right,
.dark .bili-header .bili-header__channel .channel-items__left {
  border-color:var(--w-border-dark) !important;
}


.dark .feed-roll-btn .primary-btn,
.dark .header-channel-fixed-right-item,
.dark .bili-header .bili-header__channel .channel-entry-more__link, 
.dark .bili-header .bili-header__channel .channel-link {
  border:1px solid var(--w-text-light) !important;
}


.dark .bili-header .search-panel {
  border-color:1px solid var(--w-border) !important;
}



.dark .header-channel-fixed-right-item:hover,
.dark .bili-header,
.dark .bili-header .live-left-list,
.dark .bili-header .bili-header__channel .channel-entry-more__link, 
.dark .history-panel-popover .header-tabs-panel__item,
.dark .bili-header .avatar-panel-popover .vip-item .senior,
.dark .bili-header .avatar-panel-popover .coins-item .coin-item__text ,
.dark .bili-header .avatar-panel-popover .coins-item .coin-item__num ,
.dark .bili-header .avatar-panel-popover .level-item .level-item__bar--tag>span,
.dark .bili-header .center-search-container .center-search__icon,
.dark .bili-header .bili-header__channel .channel-link {
  border-color: var(--w-text) !important;
}


.dark a,.dark .roll-btn,
.dark .bili-header .left-entry .download-wrapper .download-top-title .main,
.dark .bili-header .left-entry .download-wrapper .download-top-title .sub,
.dark .bili-header .left-entry .download-wrapper .download-bottom,
.dark .bili-header .right-entry__outside .right-entry-icon ,
.dark .bili-header .slide-down .left-entry .mini-header__title, 
.dark .bili-header .slide-down .left-entry .entry-title, 
.dark .bili-header .slide-down .left-entry .default-entry,
.dark .bili-header .slide-down .left-entry .default-entry span,
.dark .bili-header .slide-down .left-entry .loc-mc-box__text,
.dark .bili-header .slide-down .left-entry .download-entry,
.dark .bili-header .slide-down .left-entry .loc-entry ,
.dark .bili-video-card .bili-video-card__info--date,
.dark .bili-video-card .bili-video-card__info--author,
.dark .bili-header .bili-header__channel .channel-link__right,
.dark .bili-header .bili-header__channel .channel-link__left,
.dark .right-entry-text,.dark .channel-entry-popover .name, .dark .more-channel-popover .name ,
.dark .icon-title,.dark .bili-header .slide-down .right-entry .right-entry__outside .right-entry-icon,
.dark .bili-header .live .title,.dark .bili-header .live-left-list-item,
.dark .bili-header .live-left-list-item-text,
.dark .bili-header .game-right-title,
.dark .bili-header .game-left-panel-item-title, 
.bili-header .game-left-banner-title,
.dark .bili-header .manga-right-list-item-text,
.dark .bili-header .header-fav-card__info--name,
.dark .favorite-panel-popover__nav .tab-item,
.dark .favorite-panel-popover__nav .tab-item__num,
.dark .bili-header .header-fav-card__info--title,
.dark .dark .history-panel-popover .header-tabs-panel__content--date,
.dark .history-panel-popover .header-history-card__info--title,
.dark .header-tabs-panel,
.dark .header-tabs-panel__content--date,
.dark .bili-header .center-search-container .center-search__bar .nav-search-content .nav-search-input,
.dark .bili-header .avatar-panel-popover .links-item .single-link-item,
.dark .bili-header .avatar-panel-popover .vip-item__link,
.dark .bili-header .avatar-panel-popover .vip-item .senior,
.dark .bili-header .center-search-container .center-search__bar .nav-search-content .nav-search-clean svg,
.dark .bili-header .avatar-panel-popover .level-item .level-item__text,
.dark .bili-video-card .bili-video-card__info--tit>a {
  color:var(--w-text) !important;
}



.dark .v-inline-window__close-icon,.dark .bili-header .center-search-container .center-search__bar .nav-search-btn,
.dark .vip-entry-desc-subtitle,.dark .vip-entry-desc-title,.dark .vip-entry-desc-subtitle,
.dark .bili-header .avatar-panel-popover .coins-item .coin-item__num,
.dark .bili-header .avatar-panel-popover .counts-item .single-count-item .count-num {
  color:var(--w-text-light) !important;
}

.dark a:hover,.dark .roll-btn:hover,
.dark .vip-entry-desc-subtitle:hover,
.dark .bili-header .avatar-panel-popover .counts-item .single-count-item:hover .count-text,
.dark .bili-header .avatar-panel-popover .counts-item .single-count-item:hover .count-num ,
.dark .bili-header .avatar-panel-popover .vip-item__link:hover,
.dark .bili-header .manga-right-title:hover,
.dark .bili-header .game-right-list-item:hover,
.dark .bili-header .manga-right-list-item-text:hover,
.dark .bili-header .header-fav-card__info--name:hover,
.dark .bili-header .header-fav-card__info--title:hover,
.dark .bili-header .left-entry .download-wrapper .download-bottom:hover ,
.dark .bili-header .live-left-list-item-text:hover,
.dark .bili-header .game-right-title:hover,
.dark .bili-header .game-left-panel-item-title:hover, 
.dark .bili-header .slide-down .left-entry .default-entry span:hover,
.dark .bili-video-card .bili-video-card__info--date:hover,
.dark .bili-header .bili-header__channel .channel-link__right:hover,
.dark .bili-header .bili-header__channel .channel-link__left:hover,
.dark .bili-video-card .bili-video-card__info--author:hover,.dark .right-entry-text:hover,
.dark .icon-title:hover,.dark .bili-header .slide-down .right-entry .right-entry__outside .right-entry-icon:hover,
.dark .history-panel-popover .header-history-card__info--title:hover
.dark .bili-video-card .bili-video-card__info--tit>a:hover {
  color:var(--w-blue-link-hover) !important;
}


.dark .header-channel-fixed-right-item:hover,
.dark .channel-entry-popover .name:hover, .dark .more-channel-popover .name:hover,
.dark .bili-header .bili-header__channel .channel-entry-more__link:hover, 
.dark .bili-header .bili-header__channel .channel-link:hover,
.dark .channel-panel__item:hover,
.dark .dynamic-video-item:hover,
.dark .bili-header .header-dynamic-list-item .header-dynamic__box--right:hover,
.dark .bili-video-card .bili-video-card__info--tit>a:hover {
  color:var(--w-blue-link-hover) !important;
  border-color: var(--w-blue-link-hover) !important;
  background:var(--w-bg-darker) !important;
}



/* all */
/* background 和 白色 border 和 白色 link */
.dark .bili-header .live,
.dark .bili-header .avatar-panel-popover,
.dark .history-tip,
.dark .bili-video-card .bili-video-card__info--icon-text,
.dark .v-popover-content,.dark .wnd_bottom .r-l,
.dark .history-panel-popover .header-tabs-panel__content .view-all-history-btn,
.dark .bili-header .histories .history-item,
.dark .bili-header .left-entry .download-wrapper .download-top-content .button,
.dark .bili-header .avatar-panel-popover .links-item .link-red-tip,
.dark .bili-header .avatar-panel-popover .links-item .link-beta-tip,
.dark .vip-entry-containter,.dark vip-entry-btn,
.dark .vip-entry-btn[data-v-ae740c54],
.dark .feed-roll-btn .primary-btn{
  color:var(--w-text-light) !important;
  background:var(--w-bg-darker) !important;
  border:1px solid var(--w-text-light) !important;
}



/* background 和 蓝色 border 和 蓝色 link */
.dark .wnd_bottom .r-l:hover,
.dark .vip-entry-containter:hover,.dark vip-entry-btn:hover,
.dark .vip-entry-btn[data-v-ae740c54]:hover,
.dark .bili-video-card .bili-video-card__info--icon-text:hover,
.dark .bili-header .game-right-list-item:hover,
.dark .history-panel-popover .header-tabs-panel__content .view-all-history-btn:hover,
.dark .bili-header .message-entry-popover .message-inner-list__item:hover,
.dark .bili-header .left-entry .download-wrapper .download-top-content .button:hover,
.dark .bili-header .histories .history-item:hover,
.dark .bili-header .center-search-container .center-search__bar .nav-search-btn:hover,
.dark .feed-roll-btn .primary-btn:hover{
  color:var(--w-blue-link-hover) !important;
  border-color: var(--w-blue-link-hover) !important;
  background:var(--w-bg-darker) !important;
}
/******************************************************************/


/* background 和 蓝色 border */
.dark .trending-item:hover,
.dark .header-history-card:hover,
.dark .header-dynamic-list-item:hover,
.dark .header-history-card .header-history-video:hover,
.dark .bili-header .avatar-panel-popover .links-item .single-link-item:hover,
.dark .bili-header .header-fav-card:hover {
  border:1px solid var(--w-text-light) !important;
  background:var(--w-bg-darker) !important;
}



/* 蓝色border */
.dark .bili-header .center-search-container .center-search__bar #nav-searchform.is-focus,
.dark .suggest-item:hover {
  border:1px solid var(--w-text) !important;
  background:var(--w-bg-darker) !important;
}



/* border none */
.dark .bili-header .center-search-container .center-search__bar .nav-search-content,
.dark .bili-header .center-search-container .center-search__bar .nav-search-content .nav-search-input:focus,
.dark .bili-header .search-panel {
  border: none !important;
}


/* fill */
.dark .bili-header .avatar-panel-popover .level-item .level-item__bar--next svg .level-bg {
  fill: var(--w-text); !important;
}





`



const login = `
.dark .bili-mini-content-wp {
  background:var(--w-bg-darker) !important;
  color:var(--w-text) !important;
}

.dark .tab__form {
  border:1px solid var(--w-text) !important;
}

.dark .bili-mini-content-wp .login-scan-title,
.dark .bili-mini-content-wp .login-scan-desc p,
.dark .login-tab-item[data-v-35ff7abe],
.dark .login-tab-item, .dark .login-sns-name,
.dark .login-agreement-wp p,
.dark .tab__form .form__item .form_info {
  color:var(--w-text) !important;
}


`






const video_includes = ['https:\/\/.*\.bilibili\.com\/.*']
// const video_excludes = ['https:\/\/www\.bilibili\.com','https:\/\/www\.bilibili\.com\/','https:\/\/www\.bilibili\.com\/\?.*']
const is_video_include = video_includes.find(u => new RegExp(u).test(local_url))
// const is_video_exclude = video_excludes.find(r => new RegExp(r).test(local_url))

const video = !!is_video_include ? `
.dark .bili-header__bar,
.dark .bpx-player-sending-bar,
.dark .harmony-font,.dark #v_desc,
.dark .bili-comment.browser-pc,
.dark .comment-container, .dark .bpx-player-auxiliary .bpx-player-dm-function,
.dark .reply-header,.dark .arc_toolbar_report,.dark .video-toolbar-left,
.dark .bui-collapse .bui-collapse-header,
.dark .bpx-player-auxiliary .bpx-player-collapse .bui-collapse-body,
.dark .bpx-player-auxiliary .bpx-player-contextmenu.bpx-player-white,
.dark .bpx-player-auxiliary .bpx-player-dm-wrap,
.dark .bpx-player-dm-load-status,
.dark .base-video-sections-v1,
.dark .video-sections-v1[data-v-482ecf06],
.dark .video-sections-v1,
.dark .video-sections-head_second-line,
.dark .bili-header .header-login-entry[data-v-fc330406], .dark .bili-header .header-login-entry,
.dark .vip-login-tip[data-v-fc330406], .dark .vip-login-tip,
.dark .mini-header {
  background:var(--w-bg-darker) !important;
  color:var(--w-text) !important;
}

.dark .arc_toolbar_report,
.dark .video-toolbar-container,
.dark #v_tag {
  border-color:var(--w-border-dark) !important;
}


.dark .bpx-player-video-info-online,.dark .bpx-player-video-info-divide,.dark .bpx-player-video-info-dm,
.dark .basic-desc-info,.dark .desc-info-text,
.dark .reply-content-container .reply-content,
.dark .root-reply,.dark .play-num, .dark .abstract,
.dark .reply-item .root-reply-container .content-warp .user-info .user-name,
.dark .mini-header__title,
.dark .toggle-btn-text,.dark .video-toolbar-left-item,
.dark .video-complaint-info video-toolbar-item-text,
.dark .video-note video-toolbar-right-item toolbar-right-note,
.dark .bpx-player-sending-bar .bpx-player-video-info,
.dark .mini-header .right-entry .right-entry__outside .right-entry-icon,
.dark .bpx-player-dm-btn-time,.dark .bpx-player-dm-btn-dm,.dark.bpx-player-dm-btn-date,
.dark .bpx-player-auxiliary .bpx-player-dm-container .dm-info-row,
.dark .bpx-player-auxiliary .bpx-player-dm-container .dm-info-row .dm-info-dm,
.dark .bpx-player-auxiliary .bpx-player-contextmenu.bpx-player-white>li,
.dark .dm-info-date,.dark .first-line-title, .dark .cur-page,
.dark .bili-header .header-login-entry>img[data-v-fc330406],
.dark .bili-header .header-login-entry>img,
.dark .bili-header .login-panel-popover .register-tip[data-v-fc330406] ,
.dark .bili-header .login-panel-popover .register-tip,
.dark .bili-header .login-panel-popover .login-btn[data-v-fc330406],
.dark .bili-header .login-panel-popover .login-btn,
.dark .bili-header .login-panel-popover .register-tip[data-v-fc330406]>a,
.dark .bili-header .login-panel-popover .register-tip>a,
.dark .vip-login-countdown-row .countdown-lable[data-v-fc330406],
.dark .vip-login-countdown-row .countdown-lable,
.dark .vip-login-countdown-row .counddown-wrap[data-v-fc330406],
.dark .vip-login-countdown-row .counddown-wrap,
.dark .vip-login-countdown-row .counddown-wrap span[data-v-fc330406],
.dark .vip-login-countdown-row .counddown-wrap span,
.dark .vip-login-title[data-v-fc330406],
.dark .vip-login-title,
.dark .vip-login-subtitle[data-v-fc330406],
.dark .vip-login-subtitle,
.dark .video-page-card-small .card-box .info .title,
.dark .bili-header .upload-panel-popover .upload-item .item-title[data-v-fc330406],
.dark .bili-header .upload-panel-popover .upload-item .item-title,
.dark .video-page-card-small .card-box .info .upname,
.dark .video-page-card-small .card-box .info .playinfo,
.dark .next-button .txt,.dark .video-episode-card__info-title, .dark .video-episode-card__info-duration,
.dark .membersinfo-normal .header .staff-amt[data-v-42892ec8],
.dark .membersinfo-normal .header .staff-amt,
.dark .reply-header .reply-navigation .nav-bar .nav-title .nav-title-text[data-v-a3384d8f],
.dark .reply-header .reply-navigation .nav-bar .nav-title .nav-title-text,
.dark .bili-header .login-panel-popover .register-exper[data-v-fc330406],
.dark .bili-header .login-panel-popover .register-exper,
.dark .reply-header .reply-navigation .nav-bar .nav-sort.hot .hot-sort[data-v-a3384d8f],
.dark .reply-header .reply-navigation .nav-bar .nav-sort.time .time-sort[data-v-a3384d8f],
.dark .reply-header .reply-navigation .nav-bar .nav-sort.hot .hot-sort, 
.dark .reply-header .reply-navigation .nav-bar .nav-sort.time .time-sort,
.dark .sub-reply-item .sub-user-info .sub-user-name[data-v-26797283],
.dark .sub-reply-item .sub-user-info .sub-user-name,
.dark .video-info-container .video-title[data-v-4f1c0915],
.dark .video-info-container .video-title,
.dark .video-info-detail[data-v-3b903b56],
.dark .video-info-detail,
.dark .video-title {
  color:var(--w-text-light) !important;
}

.dark .video-page-card-small .card-box .info .title:hover,
.dark .bili-header .upload-panel-popover .upload-item .item-title[data-v-fc330406]:hover,
.dark .bili-header .upload-panel-popover .upload-item .item-title:hover,
.dark .video-page-card-small .card-box .info .upname:hover,
.dark .video-episode-card__info-title:hover, .dark .video-episode-card__info-duration:hover,
.dark .first-line-title:hover,
.dark .video-complaint-info video-toolbar-item-text:hover,
.dark .video-note video-toolbar-right-item toolbar-right-note:hover,
.dark .mini-header .right-entry .right-entry__outside .right-entry-icon:hover,
.dark .mini-header__title:hover,.dark .toggle-btn-text:hover,
.dark .bili-header .login-panel-popover .login-btn[data-v-fc330406]:before,
.dark .bili-header .login-panel-popover .login-btn:before,
.dark .bili-header .login-panel-popover .login-btn[data-v-fc330406]:hover:before,
.dark .bili-header .login-panel-popover .login-btn:hover:before,
.dark .bili-header .login-panel-popover .register-tip[data-v-fc330406]>a:hover,
.dark .bili-header .login-panel-popover .register-tip>a:hover,
.dark .reply-header .reply-navigation .nav-bar .nav-title .nav-title-text[data-v-a3384d8f]:hover,
.dark .reply-header .reply-navigation .nav-bar .nav-title .nav-title-text:hover

{
  color:var(--w-blue-link-hover) !important;
}


.dark .bpx-player-auxiliary .bpx-player-dm-btn-footer,
.dark .bpx-player-auxiliary .bpx-player-dm-btn-history.bpx-player-disable,
.dark .bpx-player-auxiliary .bpx-player-dm-btn-history,
.dark .membersinfo-normal .header[data-v-42892ec8],.membersinfo-normal .header,
.dark .reply-box .box-normal .reply-box-warp .reply-box-textarea[data-v-757acbb5],
.dark .reply-box .box-normal .reply-box-warp .reply-box-textarea,
.dark .vip-login-countdown-row .counddown-wrap span[data-v-fc330406],.dark .vip-login-countdown-row .counddown-wrap span,
.dark .reply-tag-item,
.dark .vip-login-btn, .dark .vip-login-btn[data-v-fc330406],
.dark .bili-header .header-upload-entry[data-v-fc330406],
.dark .bili-header .header-upload-entry, .dark .bili-header .header-upload-entry[data-v-fc330406],
.dark .second-line_right,.dark .base-video-sections-v1 .video-section-list .video-episode-card__info-playing,
.dark .video-tag-container .tag-panel .tag-link {
  color:var(--w-text-light) !important;
  background:var(--w-bg-darker) !important;
  border:1px solid var(--w-text-light) !important;
}

.dark .bpx-player-auxiliary .bpx-player-dm-btn-footer:hover,
.dark .bpx-player-auxiliary .bpx-player-dm-btn-history.bpx-player-disable:hover,
.dark .bpx-player-auxiliary .bpx-player-dm-btn-history:hover,
.dark .second-line_right:hover,
.dark .vip-login-btn[data-v-fc330406]:hover,
.dark .vip-login-btn:hover,
.dark .bili-header .header-upload-entry[data-v-fc330406]:hover,
.dark .bili-header .header-upload-entry:hover,
.dark .video-tag-container .tag-panel .tag-link:hover {
  color:var(--w-blue-link-hover) !important;
  border-color: var(--w-blue-link-hover) !important;
  background:var(--w-bg-darker) !important;
}

.dark .bpx-player-dm-setting-wrap,
.dark .bpx-player-dm-setting,
.dark .bui-dropdown-icon,
.dark .bui-collapse .bui-collapse-header .bui-collapse-arrow .bui-collapse-arrow-text .arrow-icon,
.dark .bui-danmaku-switch  {
  fill:var(--w-text-light) !important;
}


.dark #bilibili-player-placeholder {
  box-shadow: none !important;
}

`: ``





const user_space = `
.dark .elec .elec-status-bg-grey,
.dark .n .n-inner {
  background:var(--w-bg-darker) !important;
  color:var(--w-text) !important;
}

.dark .n .n-cursor {
  background:var(--w-text-light) !important;
}


.dark #page-index .channel.guest .channel-item .channel-title .channel-name,
.dark .user-info .user-info-title .info-title[data-v-31d5659a],
.dark .user-info .user-info-title .info-title,
.dark .user-info .info-content .info-command[data-v-31d5659a],
.dark .user-info .info-content .info-command,
.dark .user-info .info-content .info-value[data-v-31d5659a],
.dark .user-info .info-content .info-value,
.dark #page-index .col-2 .section-title,
.dark .small-item .meta,.dark .n .n-data .n-data-v, .dark .n .n-data .n-data-k,
.dark #id-card .idc-content .idc-username,.dark .m-level idc-m-level,
.dark .idc-meta-item,
.dark .section-title {
  color:var(--w-text-light) !important;
}

.dark .section {
  border-color: var(--w-border) !important;
}



/* border-color color background */
.dark .section .count,
.dark .g-search input,
.dark #id-card,
.dark #page-index .col-1,
.dark #page-index .col-2 .section  {
  border-color: var(--w-border) !important;
  color:var(--w-text-light) !important;
  background:var(--w-bg-darker) !important;
}

.dark #page-index .col-2 .section-title,
.dark #page-index .col-1 .section-title,
.dark .g-search input:focus {
  border-color: var(--w-text) !important;
}

.dark .n .n-inner {
  box-shadow:none !important;
}

.dark .btn
.dark .new-elec-trigger,
.dark .btn.idc-btn.default,
.dark .elec-status,
.dark .btn.idc-btn.primary {
  color:var(--w-text-light) !important;
  background:var(--w-bg-darker) !important;
  border:1px solid var(--w-text-light) !important;
}
.dark .btn:hover
.dark .new-elec-trigger:hover,
.dark .elec-status:hover,
.dark .btn.idc-btn.default:hover,
.dark .btn.idc-btn.primary:hover {
  color:var(--w-blue-link-hover) !important;
  border-color: var(--w-blue-link-hover) !important;
  background:var(--w-bg-darker) !important;
}

`




const search = ``






const dark = `
${index}
${video}
${login}
${search}
${user_space}
`



export default dark
