


/*************************************bilibili首页样式 https://www.bilibili.com ************************ */

const home = `

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
.dark #app,.dark .v-img,
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
.dark .bili-header .center-search-container .center-search__bar #nav-searchform,
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


export default home 
