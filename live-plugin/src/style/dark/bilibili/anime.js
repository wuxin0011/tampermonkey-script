
import { local_url } from "@/utils"

const anime = /.*:\/\/www\.bilibili\.com\/anime\/.*/.test(local_url) ?

  `
.dark .home-cell-desc-title[data-v-350d21cc],
.dark [class^=home-cell-desc-title],
.dark .home-cell-desc-subtitle[data-v-350d21cc], 
.dark [class^=home-cell-desc-subtitle], 
.dark [class^=with-up-space],
.dark .with-up-space[data-v-350d21cc]
 {
  color:var(--w-text-light) !important;
}


.dark .nav-tool-container [class^=section]{
  border: 1px solid var(--w-border) !important;
  color:var(--w-text-light) !important;
  background:var(--w-bg-darker) !important;
}



.dark .nav-tool-container [class^=section]:hover {
  color:var(--w-blue-link-hover) !important;
  border-color: var(--w-blue-link-hover) !important;
  background:var(--w-bg-darker) !important;
}







` : ``



export default anime
