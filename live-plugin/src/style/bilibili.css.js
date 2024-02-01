
import { is_bilibili, isShowHotSearch } from '../utils'
import dark from './dark/bilibili.css.dark'




const is_hot = () => isShowHotSearch() ? `` : `
.search-panel .trending {
   display:none !important;
}

`


const css = is_bilibili ? `
div#i_cecream .floor-single-card,
div#i_cecream .bili-live-card.is-rcmd,
div#i_cecream .adblock-tips,
.activity-m-v1,#right-bottom-banner,
div.video-container-v1 div.pop-live-small-mode.part-undefined,
.recommended-swipe.grid-anchor,
.desktop-download-tip,
.video-page-special-card-small
{
   display:none !important;
}

/* 输入框*/
.nav-search-content .nav-search-input::placeholder,
#nav_searchform>input::placeholder,
.nav-search-content>input::placeholder {
   color: transparent;
   opacity:0 !important;
}

.m-bilibili-btn {
   cursor: pointer !important;
   background: #FFFFFF !important;
   background: var(--bg1_float) !important;
   border: 1px solid #E3E5E7 !important;
   border: 1px solid var(--line_regular) !important;
   border-radius: 8px !important;
   box-sizing: border-box !important;
   padding: 6px !important;
   margin-bottom: 6px !important;
   color: #18191C !important;
   color: var(--text1) !important;
   line-height: 14px;
   font-size: 12px;
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 40px;
}

.m-span-text {
   transition: all 0.3s ease ;
   cursor: pointer  ;
   opacity: 0 ;
   float:right ;
   display:inline-block ;
   margin:0 10px ;
   transform: scale(0.5) ;
   font-size:20px ;
   position:relative ;
 }
 
 .m-span-text::before{
   content:"🧹" ;
   cursor: pointer ;
 }

.bili-video-card__info--bottom:hover .m-span-text,
.video-page-card-small:hover .m-span-text,
.up-info-container:hover .m-span-text,
.video-page-operator-card-small:hover .m-span-text
{
   opacity: 1;
   transform: scale(1.1);
   color:orange;
}

#reco_list,
[class^=up-info-container],
.members-info-container .container,
.left-container{
   background: #fff !important;
   padding:0 20px;
}


#reco_list {
   padding:6px;
}

${is_hot()}





${dark}
`: ''

export default css
