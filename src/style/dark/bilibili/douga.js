
import { local_url } from "@/utils"

const douga = /.*:\/\/www\.bilibili\.com\/v\/douga\/.*/.test(local_url) ?

  `


.dark .home-cell-desc-title[data-v-350d21cc],.dark .home-cell-desc-title,
.dark .home-cell-desc-subtitle[data-v-350d21cc], .with-up-space,.dark .home-cell-desc-subtitle[data-v-350d21cc], .with-up-space[data-v-350d21cc]
 {
  color:var(--w-text-light) !important;
}


.dark .channel-layout,
.dark channel-nav{
  border: 1px solid var(--w-border) !important;
  color:var(--w-text-light) !important;
  background:var(--w-bg-darker) !important;
}



.dark .nav-tool-container .section:hover,
.dark .nav-tool-container .section[data-v-3b26ecb6]:hover {
  color:var(--w-blue-link-hover) !important;
  border-color: var(--w-blue-link-hover) !important;
  background:var(--w-bg-darker) !important;
}

.dark .channel-layout,
.dark channel-nav,
.dark .bili-rank-list-video .bili-rank-list-video__item:nth-of-type(2n) {
   background:var(--w-bg-darker) !important;
}


.dark .bili-rank-list-video .bili-rank-list-video__item:nth-of-type(2n + 1) {
  background-color:var(--w-bg) !important;
}





` : ``



export default douga
