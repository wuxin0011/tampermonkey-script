import { local_url } from '@/utils'
import common from './common'
const is_link = local_url.indexOf('https://live.bilibili.com/') !== -1

const link_css =  is_link ?
`

.dark * {
  color:var(--w-text-light) !important;
  border-color: var(--w-border) !important;
}

.dark {
  color:var(--w-text-light) !important;
  border-color: var(--w-border) !important;
  background-color:var(--w-bg-darker) !important;
}

.dark #webShare .bili-share-pc,
.dark .live-non-revenue-player .sc-gsnTZi div {
  color:var(--w-text-light) !important;
  border-color: var(--w-border) !important;
  background-color:var(--w-bg-darker) !important;
}

`:``
export default link_css
