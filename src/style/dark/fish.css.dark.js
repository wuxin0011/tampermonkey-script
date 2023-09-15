

const darkCss = `

.dark .layout-Module-head.is-fixed
 {
  background: var(--w-bg) !important;
}

.dark  .Horn4Category-popWrap 
 {
  background: var(--w-bg) !important;
  background-image:none !important;
  border:1px solid var(--w-text-light) !important;
}

.dark  body,
.dark .layout-List-item,.dark .layout-List-item .DyCover,
.dark .Header-wrap,.dark .layout-Module-container,.dark .AnchorRank-more,
.dark .Elevator,.dark .Elevator-item,.dark .Elevator-item.is-active>span::before,.dark .public-DropMenu-drop,
.dark .Category-item,.dark .DropMenuList-linkAll,
.dark .Header-menu-wrap,.dark .DyListCover-wrap,
.dark .layout-Module-label--hasList.is-active, .dark .layout-Module-label,
.dark .ListFooter .dy-Pagination-next, .dark .ListFooter .dy-Pagination-prev,
.dark .ListFooter .dy-Pagination .dy-Pagination-item,.dark .ListFooter .dy-Pagination .dy-Pagination-item-active,.dark .ListFooter .ListFooter-btn-wrap,
.dark .layout-Player-title,.dark .layout-Player-aside,
.dark .layout-Player-asideMain,.dark .layout-Player-barrage,.dark .layout-Player-toolbar,
.dark .Barrage-listItem,.dark .Barrage-EntranceIntroduce, .dark .Barrage-roomVip--super,
.dark .DiamondsFansBarrage, .dark #js-floatingbarrage-container li, .dark #js-fansflating-barrage,
.dark .Barrage-EntranceIntroduce-Anchor, .dark .Barrage-EntranceIntroduce-Goodgame, .dark .FollowGuide,
.dark .ChatSend-button,.dark .BarrageBuffer,
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
.dark #js-footer
{
  background: var(--w-bg-darker) !important;
  color: var(--w-text-light) !important;
}




.dark .Elevator-item.is-active>span,
.dark .Elevator-item:nth-child(odd)
 {
  background-color: rgba(var(--w-bg-darker),0.7) !important;
}

.dark .dy-ModalRadius-header, .dark .addedCategory-count,
.dark .RoomList .layout-Module-title, .dark .RoomList .layout-Module-title a,.dark layout-Module-title span,
.dark .AnchorRank .layout-Module-title,.dark  .AnchorRank .layout-Module-title a,
.dark .DyCover-intro,.dark .DyCover-user,.dark .DyCover-zone,.dark a, .dark .layout-Module-title a,
.dark .DyRecCover-zone,.dark .DyRecCover-intro,.dark .DyRecCover-userName,.dark .DyRecCover-tag,
.dark .Category-item,.dark .DropMenuList-name, .dark .DropMenuList-linkAll,.dark .ListHeader-title,
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
.dark .PlayerToolbar-signCont .RoomText-list .SignBaseComponent-text-link,.dark .customizeModal-title>h3,.dark .Search-label, .dark .Search-historyList>li,
.dakr .Search-hotList li,.dark .Search-linkIcon svg,.dark .categoryTab-tab,.dark .ListHeader-hero-content-tag,
.dark .Barrage-toolbarClear, .dark .Barrage-toolbarLock,.dark .Barrage-toolbarText,.dark .ShieldTool-listItem,.dark .BarrageTips,.dark .ChatBarrageCollectPop-title,
.dark .FansBarrageColor-item-txt,.dark .ChatFansBarragePop-txt,
.dark .PopularBarrage .PopularBarragePanel-descFansPrivilege,
.dark .PopularBarrage .PopularBarragePanel-descFansRenew,
.dark .PopularBarrage .PopularBarragePanel-descLock,.dark .dy-Modal-close,
.dark .ChatFansBarragePop-diamondsTxt,.dark .BarrageWordPanel-example,.dark .BarrageWordPanel-feedbackTips,
.dark .BarrageWordPanel-block h3,.dark .BarrageWordPanel-reward,.dark .BarrageWordPanel-tips,
.dark .CustomGroupManager-title strong,.dark .CustomGroupManager-groupItem,.dark .CustomGroupManager-checkItem>span,
.dark .CustomGroupManager,.dark .LevelFilKeyTab .tab,
.dark .FKNokeywords-title,
.dark .FilterKeywords-allText, .dark .FilterKeywords-intelligentText
{
  color: var(--w-text-light) !important;
}

.dark .Header-menu-link.active a:hover,
.dark .RoomList .layout-Module-title:hover,
.dark .RoomList .layout-Module-title a:hover,
.dark .DyCover-intro:hover,
.dark .DyCover-user:hover,
.dark .DyCover-zone:hover,
.dark a:hover,.dark .FilterSwitchStatus h3,.dark .FilterSwitchStatus-status,
.dark .layout-Module-title a:hover,
.dark .Category-item:hover,
.dark .DropMenuList-name:hover,
.dark .DropMenuList-linkAll:hover,
.dark .ListHeader-title,
.dark .layout-Module-label--hasList.is-active:hover, 
.dark .layout-Module-label.is-active:hover,
.dark .ListFooter .dy-Pagination .dy-Pagination-item-active a:hover,
.dark .ListFooter .dy-Pagination .dy-Pagination-item:hover,
.dark .ListFooter .dy-Pagination .dy-Pagination-item-active:hover,
.dark .Title-anchorName:hover,.dark .Title-row-text,
.dark .SwipeTabsContent .tabItem:hover,.dark .SwipeTabsContent .tabItem.active,
.dark .layout-Classify-card>strong:hover,.dark .secondCateCard-hot:hover,
.dark .Barrage-toolbarClear:hover, .dark .Barrage-toolbarLock:hover,
.dark .ShieldTool-listItem.is-checked .ShieldTool-checkText,.dark .BarrageTips .BarrageTips--active,
.dark .ChatFansBarragePop-txt span,.dark .dark .ChatFansBarragePop-diamondsTxt span,.dark .ChatFansBarragePop-diamondsTxt span,
.dark .PopularBarrage .PopularBarragePanel-descFansPrivilege:hover,
.dark .PopularBarrage .PopularBarragePanel-descFansRenew:hover,
.dark .PopularBarrage .PopularBarragePanel-descLock:hover,
.dark .FilKeyTab .tab.active
{
  color: var(--w-text) !important;
}




.dark .dark .CustomGroupManager-saveBtn,.dark .CustomGroupCommon .dy-Modal-header,
.dark .Search-historyList>li,.dark .layout-List-item,.dark .DyListCover-wrap,.dark .layout-Module-container,
.dark .ListFooter .dy-Pagination-item,.dark .ListFooter .dy-Pagination-next,.dark .ListFooter .dy-Pagination-prev,
.dark .ListFooter .dy-Pagination .dy-Pagination-item,.dark .ListFooter .dy-Pagination .dy-Pagination-item-active,
.dark .layout-Player-aside,.dark .layout-Player-asideMain, .dark .layout-Player-barrage,
.dark .PopularBarrage .PopularBarragePanel-foot,.dark .BarrageWordPanel-card,.dark .BarrageWordPanel-btn,
.dark .dy-Modal-footer button,.dark .LevelFilterLimit-input,
.dark .layout-Classify-card, .dark customizeModal-submit,
.dark .customizeModal-cancel,.dark .ChatBarrageCollect .ChatBarrageCollect-tip
{
  border: 1px solid var(--w-border) !important;
}




.dark .Header-wrap,.dark .layout-Player-title,
.dark .public-DropMenu-drop-main:before,
.dark .categoryTab-head,.dark .ListHeader-hero-header,.dark .ListHeader-hero-content-icon,
.dark .EmotionTab,.dark .ChatFansBarragePop-describe,.dark .FansMedalPanel-container,
.dark .LevelFilterLimit,.dark .FKNokeywords-title
{
  border-color:var(--w-border) !important;
}



.dark .Category-item,
.dark .layout-Module-label--hasList.is-active, 
.dark .layout-Module-label,
.dark .DropMenuList-linkAll,
.dark .ListFooter .ListFooter-btn-wrap,
.dark .cate2TagB-item,
.dark .ChatSend-button,.dark .ChatSend-txt,
.dark .PlayerToolbar-signCont .RoomText-list .SignBaseComponent-text-link,
.dark .categoryTab-item,.dark .Header-wrap.is-start .Search ,.dark .addedCategory-item .dark .search-ipt,
.dark .layout-Module-filter-more,.dark .Barrage-toolbarClear, .dark .Barrage-toolbarLock,
.dark .ShieldTool-list,.dark .BarrageTips,.dark .ChatBarrageCollect .ChatBarrageCollect-tip:hover,
.dark .AssembleExpressHeader,.dark .TagItem,
.dark .dy-Modal-footer button:hover,.dark .FilterSwitchStatus-switch,
.dark .BarrageWordPanel-btn,.dark .LevelFilterLimit-input:focus,
.dark .BarrageFilter-fkbutton, .dark .FilterKeywords-edit-input, .dark .LevelFilterLimit-input,
.dark .FilterKeywords-edit-input:focus, .dark .LevelFilterLimit-input:focus
{
  border: 1px solid var(--w-text-light) !important;
}


.dark .Category-item:hover,
.dark .layout-Module-label--hasList.is-active:hover, 
.dark .layout-Module-label:hover,
.dark .DropMenuList-linkAll:hover,
.dark .categoryTab-item:hover,
.dark .addedCategory-item:hover,
.dark .Barrage-toolbarClear:hover, .dark .Barrage-toolbarLock:hover,
.dark .ChatBarrageCollect .ChatBarrageCollect-tip:hover,.dark .TagItem:hover,
.dark .BarrageWordPanel-btn:hover
{
  border: 1px solid var(--w-text) !important;
}


.dark .Barrage-roomVip--super,
.dark .Barrage {
  border: none !important;
}


`


export default darkCss
