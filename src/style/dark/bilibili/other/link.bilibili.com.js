import { local_url } from '../../../../utils'

const is_link = local_url.indexOf('https://link.bilibili.com/') !== -1

const link_css =  is_link ?
`


`:``
export default link_css
