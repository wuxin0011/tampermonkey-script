
import { local_url } from "../../../utils"

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
.dark .article-read-info>span[data-v-36aefa22],.dark .article-read-info>span,
.dark .right-side-bar .to-top .iconfont[data-v-38a9fd1d],.dark .right-side-bar .to-top .iconfont,
.dark .right-side-bar .side-toolbar .toolbar-item[data-v-38a9fd1d],.dark .right-side-bar .side-toolbar .toolbar-item,
.dark .coin-dialog-wrapper .coin-title,.dark .coin-dialog-wrapper .van-icon-guanbi,
.dark .right-side-bar .side-toolbar .toolbar-item .iconfont[data-v-38a9fd1d],.dark .right-side-bar .side-toolbar .toolbar-item .iconfont
 {
  color:var(--w-text-light) !important;
}

.dark .right-side-bar .to-top[data-v-38a9fd1d],.dark .right-side-bar .to-top,
.dark .right-side-bar .side-toolbar[data-v-38a9fd1d],.dark .right-side-bar .side-toolbar,
.dark .follow-btn[data-v-2847c980],.dark .follow-btn,
.dark .coin-dialog-wrapper .confirm-btn,
.dark .van-popover.van-followed,
.dark .coin-dialog-wrapper,
.dark .article-container {
  border: 1px solid var(--w-border) !important;
  color:var(--w-text-light) !important;
  background:var(--w-bg-darker) !important;
}

.dark .article-container ,
.dark .comment-wrapper .comment-m,
.dark .followed[data-v-2847c980],.dark .followed,
.dark .article-up-info[data-v-904253a6],.dark .article-up-info,
.dark .fixed-top-header {
  color:var(--w-text-light) !important;
  background:var(--w-bg-darker) !important;
}

.dark .nav-tool-container .section:hover,
.dark .right-side-bar .to-top .iconfont[data-v-38a9fd1d]:hover,.dark .right-side-bar .to-top .iconfont:hover,
.dark .right-side-bar .to-top[data-v-38a9fd1d]:hover,.dark .right-side-bar .to-top:hover,
.dark .coin-dialog-wrapper .confirm-btn:hover,

.dark .nav-tool-container .section[data-v-3b26ecb6]:hover {
  color:var(--w-blue-link-hover) !important;
  border-color: var(--w-blue-link-hover) !important;
  background:var(--w-bg-darker) !important;
}


.dark .coin-dialog-wrapper .van-icon-guanbi:hover {
  color:var(--w-blue-link-hover) !important;
}


.dark .van-popover.van-followed .follow_dropdown li:hover {
  background:var(--w-bg) !important;
  color:var(--w-blue-link-hover) !important;
}





` : ``



export default read
