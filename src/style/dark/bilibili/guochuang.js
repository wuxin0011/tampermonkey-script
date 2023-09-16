
import { local_url } from "../../../utils"

const guochuang = /.*:\/\/www\.bilibili\.com\/guochuang\/.*/.test(local_url) ?
  `
.dark .spread-module .t,.dark .spread-module,
.dark .pgc-rank-list .rank-item .ri-detail .ri-title,.dark .pgc-rank-list .rank-item .ri-detail .ri-point,
.dark .name, .dark .new-stat-module .zone-title .headline .name,.dark .headline .name, 
.dark .index-entry-wrapper .filter-block-title span,
.dark .block-area,.dark .block-area .timeline-title .headline .name,
.dark .block-area .block-left .block-header .block-title,
.dark .video-item-biref .biref-info .biref-title,
.dark .handpick-right-module .block-header .block-title {
  color:var(--w-text-light) !important;
}

.dark .video-item-biref .biref-info .biref-title:hover {
  color:var(--w-blue-link-hover) !important;
}

.dark .spread-module .num {
  background:var(--w-bg-darker) !important;
  color:var(--w-text-light) !important;
}

.dakr .block-area .timeline-toggle-block .timeline-toggle-btn {
  background: none !important;
}



.dark .timeline-box .timeline-item .item-right p.num a, 
.dark .timeline-box .timeline-item .item-right p.num span,
.dark .new-stat-module .zone-title .headline .new-stat-more,
.dark .back-top-tools .tool-item,.dakr .block-area .timeline-toggle-block .timeline-toggle-btn,
.dark .sec-rank .more-link,.dark .pgc-rank-dropdown,.dark .pgc-rank-dropdown .dropdown-list,
.dark .random-change {
  border: 1px solid var(--w-border) !important;
  color:var(--w-text-light) !important;
  background:var(--w-bg-darker) !important;
}

.dakr .block-area .timeline-toggle-block .timeline-toggle-btn:hover,
.dark .new-stat-module .zone-title .headline .new-stat-more:hover,
.dark .timeline-box .timeline-item .item-right p.num a:hover, 
.dark .timeline-box .timeline-item .item-right p.num span:hover,
.dark .sec-rank .more-link:hover,.dark .back-top-tools .tool-item:hover,
.dark .random-change:hover {
  color:var(--w-blue-link-hover) !important;
  border-color: var(--w-blue-link-hover) !important;
  background:var(--w-bg-darker) !important;
}







` : ``



export default guochuang
