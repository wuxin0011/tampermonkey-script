import { local_url } from '@/utils'

const is_link = local_url.indexOf('https://message.bilibili.com/') !== -1

const link_css =  is_link ?
`
.dark #link-message-container * {
  color:var(--w-blue-link-hover) !important;
  border-color: var(--w-bg-border) !important;
  background:var(--w-bg-darker) !important;
}

`:``
export default link_css
