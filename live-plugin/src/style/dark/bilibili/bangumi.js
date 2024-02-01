
const isUrl = window.location.href.indexOf('https://www.bilibili.com/bangumi/play') !== -1

const bangumiCss = isUrl ? `

.dark * {
  color:var(--w-text-light) !important;
  border-color: var(--w-border) !important;
  outline-color: var(--w-border) !important;
}


.dark .SectionSelector_SectionSelector__TZ_QZ .SectionSelector_expand__VjjPD,
.dark .home-container,.dark #__next,.dark .main-container,
.dark .plp-r *,
.dark .mediainfo_mediaInfo__Cpow4 *{
  color:var(--w-text-light) !important;
  border-color: var(--w-border) !important;
  outline-color: var(--w-border) !important;
  background-color:var(--w-bg-darker) !important;
}

.dark .SectionSelector_expand__VjjPD {
  background:var(--w-bg-darker) !important;
}

.dark .bili-avatar-icon.bili-avatar-right-icon{
  display:none !important;
}


.dark .reply-box .box-normal .reply-box-send .send-text[data-v-757acbb5],
.dark .reply-box .box-normal .reply-box-send [class^=send-text] {
  background:none !important;
}


.dark * [class^=imageListItem_title][class^=imageListItem_active]:hover,
.dark * [class^=imageListItem_title]:hover,
.dark * .ep-title:hover {
  color:var(--w-blue-link-hover) !important;
}



`: ``



export default bangumiCss
