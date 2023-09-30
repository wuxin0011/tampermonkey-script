import { local_url } from '@/utils'
import common from './common'

const is_account = local_url.indexOf('https://account.bilibili.com/') !== -1

const account_css =  is_account ?
`
${common}

`:``

export default account_css
