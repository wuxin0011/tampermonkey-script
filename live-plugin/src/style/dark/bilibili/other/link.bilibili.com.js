import { local_url } from '@/utils'
import common from './common'
const is_link = local_url.indexOf('https://link.bilibili.com/') !== -1

const link_css =  is_link ?
`
${common}

`:``
export default link_css
