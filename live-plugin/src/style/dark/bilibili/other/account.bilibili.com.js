import { local_url } from '@/utils'

const is_account = local_url.indexOf('https://account.bilibili.com/') !== -1

const account_css =  is_account ?
`


`:``

export default account_css
