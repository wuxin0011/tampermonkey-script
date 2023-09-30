
import common from './common'
import { local_url } from "@/utils"

const app_bilibili = /https:\/\/app\.bilibili\.com\/.*/.test(local_url)
  ?
  `

${common}

  .dark .head-img,
  .dark .header-wrap {
    background:var(--w-bg-darker) !important;
  }
  
  `
  :
  ``


export default app_bilibili
