import { local_url } from '@/utils'
import common from './common'
const is_link = local_url.indexOf('https://live.bilibili.com/') !== -1



const isShowTop =()=>true ? '': `
.plat-section-outter-box.container-wrapper{
  display:none !important;
}
`

const link_css =  is_link ?


`


${isShowTop()}

.dark * {
  color:var(--w-text-light) !important;
  border-color: var(--w-border) !important;
}

.dark {
  color:var(--w-text-light) !important;
  border-color: var(--w-border) !important;
  background-color:var(--w-bg-darker) !important;
}

.dark .durSwN, 
.dark .durSwN.active, 
.dark .durSwN:hover, 
.dark #webShare .bili-share-pc,
.dark .gift-panel-container-root [class^=gift-panel-background],
.dark .live-non-revenue-player .sc-gsnTZi div {
  color:var(--w-text-light) !important;
  border-color: var(--w-border) !important;
  background-color:var(--w-bg-darker) !important;
}

.dark .gift-control-panel .right-part [class*=recharge]:hover
{
  color:var(--w-blue-link-hover) !important;
  border:1px soild var(--w-text-light) !important;
  background-color:var(--w-bg-darker) !important;
}


.dark iframe .live-title .title-length-limit,
.dark iframe .live-title .title-length-limit[data-v-0207e7e4] {
  color:var(--w-text-light) !important;
}

`:``
export default link_css
