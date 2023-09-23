

import { local_url } from "@/utils"

const app_bilibili = /https:\/\/app\.bilibili\.com\/.*/.test(local_url)
  ?
  ``
  :
  ``


export default app_bilibili
