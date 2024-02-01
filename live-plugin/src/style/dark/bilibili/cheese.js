
import { local_url } from "@/utils"

// bilibili课堂 暂时不支持！！！
const css = local_url.indexOf('https://www.bilibili.com/cheese') != -1 ?

  `

.dark .tags[data-v-db229f82] {
  color:var(--w-text-light) !important;
  background:var(--w-bg-darker) !important;
}


.dark .coming-soon-wrapper.upComming-wrapper .title,
.dark .coming-soon-wrapper.upComming-wrapper .title_txt,
.dark .coming-soon-wrapper [class^=block-title],
.dark [class^=block-list-item-title],
.dark [class^=block-list-item-desc],
.dark [class^=block-list-item-price] .origin
{
  color:var(--w-text-light) !important;
}

.dark [class^=block-list-item-title]:hover
{
  color:var(--w-blue-link-hover) !important;
}


.dark .search-container .search__bar #nav-searchform,
.dark .search-container .search__bar #nav-searchform.is-focus,
.dark .nav-left .item
{
  color:var(--w-text-light) !important;
  background:var(--w-bg-darker) !important;
  border:1px solid var(--w-border) !important;
}


.dark .nav-left .item:hover
{
  color:var(--w-blue-link-hover) !important;
  border-color: var(--w-blue-link-hover) !important;
  background:var(--w-bg-darker) !important; 
}

.dark .dark .search-container .search__bar #nav-searchform.is-focus {
  border-color: var(--w-blue-link-hover) !important;
}






` : ``



export default css
