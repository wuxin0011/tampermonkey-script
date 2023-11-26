
import { local_url } from "@/utils"

const read = /.*:\/\/.*\.bilibili\.com\/read\/.*/.test(local_url) ?

  `
.dark p,.dark a,.dark span,
.dark  h1,.dark  h2,.dark  h3,.dark  h4,.dark  h5,.dark  h6,
.dark .iconfont,
.dark #article-content,.dark .interaction-info,.dark .interaction-info .toolbar .share-box,
.dark .normal-article-holder,
.dark .normal-article-holder h1,
.dark .normal-article-holder h2,
.dark .normal-article-holder h3,
.dark .normal-article-holder h4,
.dark .normal-article-holder h5,
.dark .normal-article-holder h6,
.dark .article-container .title-container .title,
.dark .article-breadcrumb .breadcrumb-title,
.dark [class^=article-read-info]>span,
.dark .right-side-bar .to-top [class^=iconfont],
.dark .right-side-bar .side-toolbar [class^=toolbar-item],
.dark .coin-dialog-wrapper .coin-title,.dark .coin-dialog-wrapper .van-icon-guanbi,
.dark .right-side-bar .side-toolbar .toolbar-item [class^=iconfont]

{
  color:var(--w-text-light) !important;
}

.dark .right-side-bar [class^=to-top],
.dark .right-side-bar [class^=side-toolbar],
.dark [class^=follow-btn],
.dark .coin-dialog-wrapper .confirm-btn,
.dark .van-popover.van-followed,
.dark .right-side-bar [class^=catalog],
.dark .coin-dialog-wrapper,
.dark .article-read-info .spoiler[data-v-36aefa22],
.dark .article-read-info .spoiler,
.dark .article-container {
  border: 1px solid var(--w-border) !important;
  color:var(--w-text-light) !important;
  background-color:var(--w-bg-darker) !important;
}

.dark .article-container ,
.dark .comment-wrapper .comment-m,
.dark [class^=followed],
.dark [class^=article-up-info],
.dark .right-side-bar [class^=catalog]::after,
.dark .fixed-top-header {
  color:var(--w-text-light) !important;
  background-color:var(--w-bg-darker) !important;
}



.dark .nav-tool-container .section:hover,
.dark .right-side-bar .to-top [class^=iconfont]:hover,
.dark .right-side-bar [class^=to-top]:hover,
.dark .coin-dialog-wrapper .confirm-btn:hover,
.dark .nav-tool-container [class^=section]:hover {
  color:var(--w-blue-link-hover) !important;
  border-color: var(--w-blue-link-hover) !important;
  background-color:var(--w-bg-darker) !important;
}


.dark .coin-dialog-wrapper .van-icon-guanbi:hover {
  color:var(--w-blue-link-hover) !important;
}


.dark .van-popover.van-followed .follow_dropdown li:hover {
  background-color:var(--w-bg) !important;
  color:var(--w-blue-link-hover) !important;
}





` : ``



export default read
