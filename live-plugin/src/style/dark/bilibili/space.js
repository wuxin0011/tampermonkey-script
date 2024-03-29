/*************************************https://www.bilibili.com/space/* ************************ */
import { local_url } from '@/utils';


const space = /.*:\/\/space\.bilibili\.com\/\d+.*/.test(local_url) ?
  `
.dark .list-create {
  background:var(--w-bg) !important;
}

.dark input#pin-layer-search,
.dark .elec .elec-status-bg-grey,
.dark #pin-wrapper #pin-layer,
.dark #page-index #i-ann-content textarea,
.dark .bili-dyn-item,
.dark .bili-dyn-card-video__body,
.dark .bili-rich-text__content,
.dark .bili-dyn-card-video__desc,
.dark .bili-dyn-card-video__title,
.dark .series-item .item-title .qipapnum[data-v-40b5e135],
.dark .series-item .item-title .qipapnum,
.dark .contribution-sidenav .contribution-item,
.dark .album-list__tabs,
.dark #page-series-index .channel-option.no-channel[data-v-9e6dac30],
.dark #page-series-index .channel-option.no-channel,
.dark #page-series-index .channel-option,
.dark .bili-rich-textarea__inner.empty,
.dark .note-editor .rich-text-options,
.dark .note-header,
.dark .bili-header-m .header-search-suggest, 
.dark .international-header .header-search-suggest,
.dark #web-toolbar,
.dark .n .n-inner {
  background-color:var(--w-bg-darker) !important;
  color:var(--w-text) !important;
}

.dark .n .n-cursor {
  background:var(--w-text-light) !important;
}


.dark #page-series-index .channel-option.no-channel p[data-v-9e6dac30],
.dark #page-series-index .channel-option.no-channel p,
.dark .album-list__title,.dark .album-list__tab-name,
.dark .small-item .meta,.dark .n .n-data .n-data-v, .dark .n .n-data .n-data-k,
.dark #page-series-index .channel-item .channel-name,.dark #page-series-index .channel-item , .dark #page-series-index .channel-item .channel-name[data-v-9e6dac30],
.dark #page-index .channel.guest .channel-item .channel-title .channel-name, .dark #page-index .channel.guest .channel-name, .dark #page-index .channel-name,
.dark #page-index .col-2 .section-title,
.dark #page-index .col-2 .section .user-auth .auth-description,
.dark .user-info .user-info-title [class^=info-title],
.dark .user-info .info-content [class^=info-command],
.dark .user-info .info-content [class^=info-value],
.dark #id-card .idc-content .idc-username,.dark .m-level idc-m-level,
.dark .idc-meta-item,
.dark .elec .elec-count,.dark .elec,
.dark .elec .elec-setting, .elec .elec-total-c-num,
.dark .elec-total-c,
.dark .user-info .info-content .info-tags .info-tag [class^=icon-tag],
.dark .user-info .info-content .info-tags .info-tag [class^=tag-content],
.dark #page-video #submit-video-type-filter a .count,
.dark #page-series-index .channel-index .breadcrumb[data-v-9e6dac30],
.dark #page-series-index .channel-index [class^=breadcrumb], 
.dark #page-series-index .channel-index .breadcrumb .item.cur[data-v-9e6dac30],
.dark #page-series-index .channel-index .breadcrumb .item.cur,
.dark .breadcrumb, .dark .breadcrumb .item.cur, .dark .breadcrumb .item,
.dark #page-setting .setting-privacy-item .setting-privacy-name,
.dark #page-setting .setting-privacy-item,
.dark #page-fav .fav-sidenav .nav-title .text,.dark #page-fav .fav-main .filter-item .text,.dark #page-fav .fav-main .filter-item,.dark #page-fav .fav-main,
.dark #page-index .channel .empty-state p,.dark #page-index .channel,.dark #page-index p,.dark .private-hint,.dark .section-title,
.dark #page-fav .fav-main .filter-item,.dark .be-dropdown-item, .dark #page-fav .fav-main .filter-item .filter-type .be-dropdown-item i, .dark #page-fav .fav-main .filter-item .filter-type .be-dropdown-item span, .dark #page-fav .fav-main .filter-item .filter-type .be-dropdown-item p,.dark #page-fav .fav-main .filter-item .filter-type .be-dropdown-item a,
.dark .favInfo-box .favInfo-details .fav-options .meta,.dark .favInfo-box .favInfo-details .fav-options,
.dark span,.dark .sub-tabs span, .dark .sub-tabs .filter-content,.dark .sub-tabs,.dark .sub-tab,
.dark .bili-dyn-title__text,.dark .bili-rich-textarea__inner,
.dark .bili-dyn-forward-publishing__editor .bili-rich-textarea__inner,
.dark .bili-popover, .dark .bili-popover__arrow,
.dark [class^=game-card__info-title],
.dark #pin-wrapper .pin-layer-vlist .small-item .title,
.dark #pin-wrapper .pin-layer-vlist .small-item .meta .play,
.dark #pin-wrapper .pin-layer-vlist .small-item .meta .icon,
.dark #pin-wrapper .pin-layer-vlist .small-item .meta .time,
.dark .list-item .desc,
.dark .opus-list [class^=opus-item-title],
.dark .opus-list [class^=opus-item-content],
.dark .section-title {
  color:var(--w-text-light) !important;
}


.dark #page-setting .setting-tag-list a,
.dark #page-fav .fav-sidenav .nav-title .text:hover{
  color:var(--w-text-light) !important;
}


.dark .col-1, .dark .co1-2,
.dark #page-index,.dark #page-index .col-1, 
.dark #page-index .col-2,
.dark #page-dynamic .bili-dyn-item,
.dark .i-m-r2,
.dark .i-m-upload,
.dark .bili-rich-textarea__inner,
.dark .i-pin-v .be-tab,
.dark .bili-popover, .dark .bili-popover__arrow,
.dark .section {
  border-color: var(--w-border) !important;
}




/* border-color color background */
.dark .section .count,
.dark .g-search input,
.dark #id-card,
.dark #page-index .col-1,
.dark #page-fav .fav-main .search-input input,
.dark .bili-topic-search__popover,
.dark #page-video #submit-video-type-filter,
.dark #page-dynamic .col-2 .section,
.dark #page-index .col-2 .section  {
  border-color: var(--w-border) !important;
  color:var(--w-text-light) !important;
  background:var(--w-bg-darker) !important;
}


.dark #page-index .channel, .dark #page-index .channel .channel-item,
.dark #page-index .col-1 .section-title,.dark #page-index .col-2 .section-title,
.dark .series-item .split-line[data-v-40b5e135],.dark .series-item .split-line,
.dark .g-search input:focus {
  border-color: var(--w-border) !important;
}

.dark .n .n-inner {
  box-shadow:none !important;
}


.dark .col-full,
.dark .btn,
.dark .btn.btn-large, 
.dark .btn.btn-large [class^=btn-content],
.dark .new-elec-trigger,
.dark .btn.idc-btn.default,
.dark .elec-status,
.dark .bili-dyn-more__menu, .dark .be-dropdown-menu,
.dark #page-series-index .channel-option.no-channel .create-channel,
.dark .favInfo-box.favEmpty .favInfo-details .fav-options .fav-play, 
.dark .favInfo-box.invalid .favInfo-details .fav-options .fav-play,
.dark .reply-box .box-normal [class^=reply-box-send]::after,
.dark .reply-box .box-normal [class^=reply-box-send],
.dark .be-dropdown-item:hover,
.dark .resizable-component .editor-innter,
.dark .btn.idc-btn.primary {
  color:var(--w-text-light) !important;
  background-color:var(--w-bg-darker) !important;
  border-color: var(--w-text) !important;
}


.dark #pin-wrapper .pin-layer-vlist .small-item .title:hover,
.dark #pin-wrapper .pin-layer-vlist .small-item .meta .play:hover,
.dark #pin-wrapper .pin-layer-vlist .small-item .meta .icon:hover,
.dark #pin-wrapper .pin-layer-vlist .small-item .meta .time:hover,
.dark #pin-wrapper .pin-layer-vlist .small-item:hover,
.dark #page-series-index .channel-option.no-channel [class^=create-channel]:hover,
.dark .favInfo-box.favEmpty .favInfo-details .fav-options .fav-play:hover, 
.dark .favInfo-box.invalid .favInfo-details .fav-options .fav-play:hover,
.dark .btn.primary.btn-large:hover,
.dark .btn:hover,
.dark .btn.btn-large [class^=btn-content]:hover,
.dark .btn.btn-large:hover,
.dark .bili-dyn-more__menu:hover,
.dark .contribution-sidenav .contribution-item:hover,
.dark .btn:hover,
.dark .reply-box .box-normal [class^=reply-box-send]:hover::after,
.dark .reply-box .box-normal .reply-box-send,
.dark .reply-box .box-normal .reply-box-send:hover,
.dark .new-elec-trigger:hover,
.dark .elec-status:hover,
.dark .btn.idc-btn.primary:hover {
  color:var(--w-blue-link-hover) !important;
  border-color: var(--w-blue-link-hover) !important;
  background:var(--w-bg-darker) !important;
}

.dark .btn.idc-btn.default:hover {
  color:var(--w-blue-link-hover) !important;
  border:1px solid var(--w-blue-link-hover) !important;
  background:var(--w-bg-darker) !important;
}

.dark #page-setting #setting-new-tag-btn,
.dark #page-setting .setting-tag-list a,
.dark #page-setting #setting-new-tag {
  background:var(--w-bg) !important;
  border-color: var(--w-text) !important;
}

.dark #page-fav .fav-sidenav .fav-item.cur ,
.dark #page-fav .fav-sidenav .fav-item:hover  {
  background:var(--w-bg) !important;
}


.dark .h .h-v-host {
  color:  var(--w-white) !important;
  background: var(--w-blue-link-hove) !important;
}

.dark .elec .elec-status {
  background-image: none !important;
}



`
  :
  ``


export default space
