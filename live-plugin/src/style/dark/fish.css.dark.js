import { local_url } from '@/utils'


const isDouyuDetail = () => /.*douyu.*(\/((.*rid=\d+)|(\d+)).*)$/.test(local_url)


const isCreate = () => local_url.indexOf('https://www.douyu.com/creator') !== -1



const dataLayoutItmeDarkCss = local_url.indexOf('https://www.douyu.com/g_wzry') !=-1?
``
:
`.dark .layout-Cover-item{
  background-color: var(--w-bg-darker) !important;
  border:1px solid var(--w-text) !important;
  color: var(--w-text-light) !important;
}
`

const createDark =
  isCreate() ?
    `
  .dark * {
    background-color: var(--w-bg-darker) !important;
    border-color: var(--w-text) !important;
    color: var(--w-text-light) !important;
  }
  
  ` :
    ``

// 斗鱼直播黑屏问题
const loadingLazy = isDouyuDetail() ? `` : `
.dark .LazyLoad{
  background: var(--w-bg-dark) !important;
}
`
const darkCss = `
${createDark}
${loadingLazy}
${dataLayoutItmeDarkCss}
.dark .DyCover-pic,
.dark .Search-backTop {
  background: var(--w-bg-dark) !important;
}


.dark  .Horn4Category-popWrap 
 {
  background: var(--w-bg) !important;
  background-image:none !important;
  border:1px solid var(--w-text-light) !important;
}


.dark .header__PRovh .Header-wrap.is-darkMode,
.dark [class^=header] .Header-wrap.is-darkMode,
.dark .Barrage-FansHome-letter,
.dark .DyLiveCover-wrap,.dark .DyLiveRecord-wrap,
.dark .DyHistoryCover-wrap,
.dark .layout-Module--aside.AnchorRank .layout-Module-container,
.dark .layout-Section.layout-Header,
.dark .layout-Slide-bannerInner,.dark .FKLiWrap,
.dark .layout-Module-head.is-fixed,
.dark .layout-List-item,.dark .layout-List-item .DyCover,
.dark .Header-wrap,.dark .AnchorRank-more,
.dark .Elevator,.dark .Elevator-item,.dark .Elevator-item.is-active>span::before,.dark .public-DropMenu-drop,
.dark .GiftInfoPanel-brief,
.dark .Header-menu-wrap,.dark .DyListCover-wrap,
.dark .layout-Module-label--hasList.is-active, .dark .layout-Module-label,
.dark .ListFooter .dy-Pagination-next, .dark .ListFooter .dy-Pagination-prev,
.dark .ListFooter .dy-Pagination .dy-Pagination-item,.dark .ListFooter .dy-Pagination .dy-Pagination-item-active,.dark .ListFooter .ListFooter-btn-wrap,
.dark .layout-Player-title,.dark .layout-Player-aside,
.dark .layout-Player-asideMain,.dark .layout-Player-barrage,.dark .layout-Player-toolbar,
.dark .Barrage-listItem,.dark .Barrage-EntranceIntroduce, .dark .Barrage-roomVip--super,
.dark .DiamondsFansBarrage, .dark #js-floatingbarrage-container li, .dark #js-fansflating-barrage,
.dark .Barrage-EntranceIntroduce-Anchor, .dark .Barrage-EntranceIntroduce-Goodgame, .dark .FollowGuide,
.dark .BarrageBuffer,.dark .Title-anchorName-HC,
.dark .Barrage-FansHome-content,.dark .Barrage-FansHome,
.dark .ChatSend-txt,.dark .layout-Classify-card,.dark .cate2TagB-item,
.dark .PlayerToolbar-signCont,.dark .dy-Modal-content,.dark .CustomGroupCommon .dy-Modal-title,
.dark .CustomGroupManager-title,.dark .FilterKeywords,
.dark .Barrage-toolbarClear .Barrage-toolbarText,.dark .Barrage-toolbarLock:hover .Barrage-toolbarText,
.dark .dy-ModalRadius-content, .dark .categoryTab-item, .dark customizeModal-submit, .dark .customizeModal-cancel, .dark .search-ipt,
.dark .addedCategory-item, .dark .Search, .dark .Header-wrap.is-start .Search, .dark .Search-historyList>li, .dark .Search-text,
.dark .ListHeader-hero-header,.dark .layout-Module-label--hasList,.dark .ListHeader-pop,.dark .layout-Module-filter-more,
.dark .Barrage-toolbarClear, .dark .Barrage-toolbarLock,.dark .AssembleExpressHeader-head, .dark .Emotion, .dark .ShieldTool-list,.dark .BarrageTips,
.dark .BarrageTips .BarrageTips--active,.dark .FansMedalDialog-normal, .dark .ChatBarrageCollect .ChatBarrageCollect-tip,.dark .AssembleExpressHeader,
.dark .TagItem,.dark .ChatBarrageCollectPop , .dark .Horn4Category-popWrap,.dark .Horn4Category-inputor,.dark .ChatFansBarragePop,
.dark .PopularBarrage .PopularBarragePanel-foot, .dark .PopularBarrage .PopularBarragePanelStyle, .dark .BarrageWordPanel-card,
.dark .BarrageWordPanel-btn,.dark .BarrageWordPanel-header h2,.dark .BarrageWordPanel-header,.dark .CustomGroupManager-saveBtn,
.dark .DyRecCover-wrap,.dark .CustomGroupCommon .dy-Modal-header,.dark .CustomGroupCommon .dy-Modal-close-x,
.dark .CustomGroupCommon .dy-Modal-close,.dark .CustomGroupCommon,.dark .dy-Modal-close,.dark .dy-Modal-header,
.dark .dy-Modal-footer button,.dark .FilterSwitchStatus-switch,.dark .LevelFilKeyTab .tab.active,.dark .LevelFilterLimit,
.dark .BarrageFilter-fkbutton, .dark .FilterKeywords-edit-input, .dark .LevelFilterLimit-input,.dark .LevelFilKeyTab,
.dark .Search-recommend:hover,.dark [class^=index-listWrap],
.dark .layout-Card-horizon,.dark .layout-Tab-container .layout-Tab-item.is-active,.dark .layout-Tab-container .layout-Tab-item,
.dark .SearchChannel-item,.dark SearchChannel-item-detail,.dark .layout-Tab-container.is-fixed,
.dark .layout-Player-chat,.dark .AnchorRank-item,
.dark .layout-Player-chat *,.dark .EmotionList.EmotionDiamondsPanel .EmotionList-con,
.dark #js-EmotionDiamondsPanel,
.dark #js-footer
{
  background-color: var(--w-bg-darker) !important;
  color: var(--w-text-light) !important;
}




.dark .Elevator-item.is-active>span,
.dark .Elevator-item:nth-child(odd)
 {
  background-color: rgba(var(--w-bg-darker),0.7) !important;
}

.dark [class^=favoriteTitle],
.dark .DyHistoryCover,
.dark .DyHistoryCover-intro,
.dark .DyHistoryCover-user,
.dark .SearchAnchorVideo-title,
.dark .dy-ModalRadius-header, .dark .addedCategory-count,
.dark .RoomList .layout-Module-title, .dark .RoomList .layout-Module-title a,.dark layout-Module-title span,
.dark .AnchorRank .layout-Module-title,.dark  .AnchorRank .layout-Module-title a,
.dark .DyCover-intro,.dark .DyCover-user,.dark .DyCover-zone,.dark a, .dark .layout-Module-title a,
.dark .DyRecCover-zone,.dark .DyRecCover-intro,.dark .DyRecCover-userName,.dark .DyRecCover-tag,
.dark .DropMenuList-name, .dark .ListHeader-title,
.dark .layout-Module-label--hasList.is-active, .dark .layout-Module-label.is-active,
.dark .DyListCover-intro,.dark .DyListCover-zone,.dark .DyListCover-hot,.dark .DyListCover-userName,
.dark .ListFooter .dy-Pagination .dy-Pagination-item-active a,
.dark .ListFooter .dy-Pagination .dy-Pagination-item,
.dark .ListFooter .dy-Pagination .dy-Pagination-item-active,
.dark .ListFooter .ListFooter-btn-input,.dark .ListFooter-btn,.dark .ListFooter-btn-label,
.dark .Title-header,.dark .Title-report,.dark .Title-anchorName,
.dark .Barrage-main .Barrage-content,.dark .Barrage-roomVip--super,
.dark .PlayerToolbar span,.dark .Title-followNum, .dark .PlayerToolbar-signCont,
.dark .Barrage-EntranceIntroduce-Anchor, .dark .Barrage-EntranceIntroduce-Goodgame ,.dark .Barrage-EntranceIntroduce-Content,
.dark .SwipeTabsContent .tabItem ,.dark .layout-Classify-card>strong ,.dark .secondCateCard-hot,
.dark .layout-Classify-card.secondCateCard,.dark .layout-Classify-card.secondCateCard.secondCateCark-hoverCard,.dark .HoverCark-wrap,
.dark .PlayerToolbar-signCont .RoomText-list .SignBaseComponent-text-link,.dark .customizeModal-title>h3,.dark .Search-label, .dark .Search-historyList>li,
.dark .Search-hotList li,.dark .Search-linkIcon svg,.dark .categoryTab-tab,.dark .ListHeader-hero-content-tag,
.dark .Barrage-toolbarClear, .dark .Barrage-toolbarLock,.dark .Barrage-toolbarText,.dark .ShieldTool-listItem,.dark .BarrageTips,.dark .ChatBarrageCollectPop-title,
.dark .FansBarrageColor-item-txt,.dark .ChatFansBarragePop-txt,
.dark .PopularBarrage .PopularBarragePanel-descFansPrivilege,
.dark .PopularBarrage .PopularBarragePanel-descFansRenew,
.dark .PopularBarrage .PopularBarragePanel-descLock,.dark .dy-Modal-close,
.dark .ChatFansBarragePop-diamondsTxt,.dark .BarrageWordPanel-example,.dark .BarrageWordPanel-feedbackTips,
.dark .BarrageWordPanel-block h3,.dark .BarrageWordPanel-reward,.dark .BarrageWordPanel-tips,
.dark .CustomGroupManager-title strong,.dark .CustomGroupManager-groupItem,.dark .CustomGroupManager-checkItem>span,
.dark .CustomGroupManager,.dark .LevelFilKeyTab .tab, .dark .layout-Result,
.dark .FKNokeywords-title, .dark .Search-recommend-info p,.dark .layout-Module-title,
.dark .Search-keyword, .dark .Search-anchor.is-horizon .Search-anchor-info .Search-anchor-recommendTitle,
.dark .Search-anchor .Search-anchor-info .Search-anchor-recommendTitle,.dark SearchAnchorVideo-title,
.dark .Search-anchor-info h1,.dark .Search-anchor-info h2,.dark .Search-anchor-info h3,.dark .Search-anchor-info h4,.dark .Search-anchor-info h5,.dark .Search-anchor-info h6,
.dark .DropPaneList-live.is-live,.dark .Search-category h3,.dark .Search-category p,.dark .Search-category p span,
.dark .FilterKeywords-allText, .dark .FilterKeywords-intelligentText,
.dark .SearchChannel-item-detail-name,.dark .SearchChannel-item-detail-name span,
.dark .SearchChannel-item-detail-desc.SearchChannel-item-detail-isCate,.dark .SearchChannel-item-detail-desc.SearchChannel-item-detail-isCate span,
.dark .Search-yuba .des .name,.dark .layout-Search-input>input,.dark .FKLiWrap:hover,
.dark .TreasureInfo-desc
{
  color: var(--w-text-light) !important;
}


.dark .Search-recommend-info h3,.dark .Search-feedback-section,.dark .Search-feedback-section,
.dark .Header-menu-link.active a:hover,
.dark .RoomList .layout-Module-title:hover,
.dark .RoomList .layout-Module-title a:hover,
.dark .DyCover-intro:hover,
.dark .DyCover-user:hover,
.dark .DyCover-zone:hover,
.dark a:hover,
.dark .FilterSwitchStatus h3,
.dark .FilterSwitchStatus-status,
.dark .layout-Module-title a:hover,
.dark .DropMenuList-name:hover,
.dark .ListHeader-title,
.dark .layout-Module-label--hasList.is-active:hover, 
.dark .layout-Module-label.is-active:hover,
.dark .ListFooter .dy-Pagination .dy-Pagination-item-active a:hover,
.dark .ListFooter .dy-Pagination .dy-Pagination-item:hover,
.dark .ListFooter .dy-Pagination .dy-Pagination-item-active:hover,
.dark .Title-anchorName:hover,.dark .Title-row-icon,.dark .Title-row-text,
.dark .SwipeTabsContent .tabItem:hover,.dark .SwipeTabsContent .tabItem.active,
.dark .layout-Classify-card>strong:hover,.dark .secondCateCard-hot:hover,
.dark .Barrage-toolbarClear:hover, .dark .Barrage-toolbarLock:hover,
.dark .ShieldTool-listItem.is-checked .ShieldTool-checkText,.dark .BarrageTips .BarrageTips--active,
.dark .ChatFansBarragePop-txt span,.dark .dark .ChatFansBarragePop-diamondsTxt span,.dark .ChatFansBarragePop-diamondsTxt span,
.dark .PopularBarrage .PopularBarragePanel-descFansPrivilege:hover,
.dark .PopularBarrage .PopularBarragePanel-descFansRenew:hover,.dark .DropPaneList-name,.dark .DropPaneList-title,
.dark .PopularBarrage .PopularBarragePanel-descLock:hover,.dark .DropPaneList span,
.dark .Search-content-title, .dark .Search-default-title, .dark .Search-history-title, .dark .Search-hot-title,
.dark .FilKeyTab .tab.active,.dark Search-anchor-data,.dark .Search-anchor.is-horizon .Search-anchor-info p,
.dark .Search-anchor .Search-anchor-info,.dark Search-anchor-cate,.dark .Search-anchor-info,
.dark .Search-anchor-info h4.is-official,.dark .Search-anchor-info h3.is-official,.dark .Search-anchor-info h2.is-official,.dark .Search-anchor-info .is-official
{
  color: var(--w-text) !important;
}



.dark .Title-followBtnBox,
.dark .dark .CustomGroupManager-saveBtn,.dark .CustomGroupCommon .dy-Modal-header,
.dark .Search-historyList>li,.dark .layout-List-item,.dark .DyListCover-wrap,
.dark .ListFooter .dy-Pagination-item,.dark .ListFooter .dy-Pagination-next,.dark .ListFooter .dy-Pagination-prev,
.dark .ListFooter .dy-Pagination .dy-Pagination-item,.dark .ListFooter .dy-Pagination .dy-Pagination-item-active,
.dark .layout-Player-aside,.dark .layout-Player-asideMain, .dark .layout-Player-barrage,
.dark .PopularBarrage .PopularBarragePanel-foot,.dark .BarrageWordPanel-card,.dark .BarrageWordPanel-btn,
.dark .dy-Modal-footer button,.dark .LevelFilterLimit-input,
.dark .layout-Classify-card, .dark customizeModal-submit,.dark .layout-Menu, 
.dark .layout-Player-asideMain, .layout-Player-toolbar,
.dark .customizeModal-cancel,.dark .ChatBarrageCollect .ChatBarrageCollect-tip
{
  border: 1px solid var(--w-border) !important;
}




.dark .Header-wrap,.dark .layout-Player-title,
.dark .ChatSend-txt,
.dark .public-DropMenu-drop-main:before,.dark .Search-anchor-avatar,
.dark .categoryTab-head,.dark .ListHeader-hero-header,.dark .ListHeader-hero-content-icon,
.dark .EmotionTab,.dark .ChatFansBarragePop-describe,.dark .FansMedalPanel-container,
.dark .LevelFilterLimit,.dark .FKNokeywords-title
{
  border-color:var(--w-border) !important;
}




.dark .layout-Module-label--hasList.is-active, 
.dark .layout-Module-label,

.dark .ListFooter .ListFooter-btn-wrap,
.dark .cate2TagB-item,
.dark .PlayerToolbar-signCont .RoomText-list .SignBaseComponent-text-link,
.dark .categoryTab-item,.dark .Header-wrap.is-start .Search ,.dark .addedCategory-item .dark .search-ipt,
.dark .layout-Module-filter-more,.dark .Barrage-toolbarClear, .dark .Barrage-toolbarLock,
.dark .ShieldTool-list,.dark .BarrageTips,.dark .ChatBarrageCollect .ChatBarrageCollect-tip:hover,
.dark .AssembleExpressHeader,.dark .TagItem,
.dark .dy-Modal-footer button:hover,.dark .FilterSwitchStatus-switch,
.dark .BarrageWordPanel-btn,.dark .LevelFilterLimit-input:focus,
.dark .BarrageFilter-fkbutton, .dark .FilterKeywords-edit-input, .dark .LevelFilterLimit-input,
.dark .FilterKeywords-edit-input:focus, .dark .LevelFilterLimit-input:focus,
.dark .MatchSystemChatFansBarragePop-describe
{
  border: 1px solid var(--w-text-light) !important;
}


.dark .layout-Module-label--hasList.is-active:hover, 
.dark .layout-Module-label:hover,
.dark .categoryTab-item:hover,
.dark .addedCategory-item:hover,
.dark .Barrage-toolbarClear:hover, .dark .Barrage-toolbarLock:hover,
.dark .ChatBarrageCollect .ChatBarrageCollect-tip:hover,
.dark .BarrageWordPanel-btn:hover
{
  border: 1px solid var(--w-text) !important;
}


.dark .Barrage-roomVip--super,
.dark .Barrage {
  border: none !important;
}


.dark [class^=cardTagContainer],
.dark .Search-direct,.dark .DropMenuList-linkAll,
.dark .DyCover,.dark .Search-yuba,
.dark .layout-Card-history, .dark .layout-Card-rank,
.dark .Search-input-pane,.dark .DyListCover.HeaderCell,
.dark .ListRecommend-refresh,.dark .ListHeader-pop-label,
.dark layout-Module-label,.dark .Search-default-item,
.dark .Search-recommend .Search-direct,.dark Search-category,
.dark .layout-Search-input,.dark .layout-Search-btn,
.dark .Search-feedback-textarea,.dark .VideoCollectionMix .layout-videoCollection-item,
.dark .categoryBoxB-editB .edit,.dark .layout-Nav-backTop,.dark .ChatSend-button,
.dark .MuteStatus.is-noLogin,.dark .FansMedalEnter-enterName,
.dark .FansBarrageSwitcher[class*=color],.dark .BarrageWord-fkbutton .fkbutton-icon,
.dark .PopularBarrage .PopularBarrageBtn,.dark .EnergyBarrageIcon,
.dark .ActiviesExpandPanel,.dark .GiftExpandPanel,.dark .GiftInfoPanel-cont,
.dark .BatchGiveForm-num,.dark .TreasureTips,.dark .FKLiWra,
.dark .MatchSystemChatFansBarragePop,.dark .TagItem,.dark .Category-item,
.dark .Header-search-wrap .Search,
.dark .Search-direct {
  background-color: var(--w-bg-darker) !important;
  border:1px solid var(--w-text) !important;
  color: var(--w-text-light) !important;
}




.dark .Title-anchorName-HC .Title-anchorName-block:hover,
.dark .DyCover:hover,.dark .layout-Search-btn:hover,
.dark .ChatSend-button:hover,.dark .DropMenuList-linkAll:hover,
.dark .dark Search-category:hover,.dark .categoryBoxB-editB .edit:hover,
.dark .Search-default-item:hover,.dark .Search-recommend .Search-direct:hover,
.dark .Category-item:hover,.dark .ListRecommend-refresh:hover,
.dark .Search-direct:hover,.dark .ListHeader-pop-label:hover,
.dark .Search-topicRecommend:hover,.dark layout-Module-label:hover,
.dark .Search-direct:hover,.dark .TagItem:hover,
.dark .Search-recommend:hover {
  background-color: var(--w-bg) !important;
  border:1px solid var(--w-text-light) !important;
  color: var(--w-text) !important;
}


.dark .dy-ModalRadius-footer button,
.dark .layout-Tab-item,.dark .dy-ModalRadius-close,
.dark .DropPaneList>a{
  background-color: var(--w-bg-darker) !important;
  border: none !important;
  color: var(--w-text-light) !important;
}


.dark .dy-ModalRadius-close:hover,.dy-ModalRadius-footer button:hover,
.dark .layout-Tab-item.is-active,.dark .layout-Tab-item:hover,
.dark .Search-rank-wrapper:hover .Search-rank,
.dark .YubaMessage-link:hover,
.dark .layout-Tab-item:hover,
.dark .Search-hotList li:hover,
.dark .DropPaneList>a:hover {
  background-color: var(--w-bg) !important;
  color: var(--w-text) !important;
}


.dark .HoverCard-wrap,
.dark .DropPaneList .HistoryList,
.dark .Header-history-tab.is-active,
.dark .Header-history-tab,
.dark .Header-follow-tab.is-active,
.dark .Header-follow-tab,
.dark .DropPane-linkAll,
.dark .CustomGroupMenu-wrapper,
.dark .Title-followBtn {
  background: var(--w-bg-darker) !important;
  border:1px solid var(--w-border) !important;
  color: var(--w-text-light) !important;
}

.dark .Header-history-tab.is-active,
.dark .Header-history-tab:hover,
.dark .Header-follow-tab.is-active,
.dark .Header-follow-tab:hover,
.dark .Title-followBtn:hover {
  background: var(--w-bg) !important;
}



/* new home */
.dark .header__PRovh .Header-wrap.is-darkMode,
.dark [class^=desc],
.dark [class^=cateHead],
.dark [class^=elevatorItem],
.dark [class^=layoutMain] [class^=block],
.dark [class^=elevatorHolder] {
  background: var(--w-bg-darker) !important;
  color: var(--w-text) !important;
}


.dark [class^=goTop]  {
  background-color: var(--w-bg-darker) !important;
  background-image: url('https://shark2.douyucdn.cn/front-publish/douyu-web-master/_next/static/media/goTop_hover.1133fe37.png') !important;
}

.dark #header-search-input {
     background: transparent !important;
}




`


export default darkCss
