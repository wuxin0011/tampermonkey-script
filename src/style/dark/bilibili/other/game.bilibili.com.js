

import { local_url } from "../../../../utils"

const game_bilibili = /https:\/\/game\.bilibili\.com\/.*/.test(local_url)
  ?
  `
.dark span,.dark a,.dark p,.dark h1,.dark h2,.dark h3,.dark h4,.dark h5,
.dark .aside-wrap_2TTgM .anchor_wrapper_2leFH .anchor_item_3DKWq .text_H0qLc,
.dark .gameSns-content-account-text_2kf1l .title_3cbN0,.dark .gameSns-content-account-text_2kf1l .subtitle_3xtPu,
.dark .contactUs-content-info-item_3hznU .text_NvNTR,.dark .mine-header-userInfo_2PEyA .user-basic-nav_3ydDD .user-statistics-type_2qxNK,
.dark .mine-header-userInfo_2PEyA .user-basic-nav_3ydDD .user-statistics-num_13v1B,
.dark .gameSns-content-other-account_9YJ6O .wechat-text_2GmEa, .dark .gameSns-content-other-account_9YJ6O .weibo-text_35duF,
.dark .Card-header_1d4vx .card-title_2RmHu .title_SE4va,.dark .game-item-footer-score_2F75T .gameScoreNum_EuGJV,
.dark .Card-header_1BQ_x .card-title_HKAAg,.dark .collection-wrap_19zMo .collection-item_1UBgM .collection-item-game-name_c4Qj2,
.dark .collection-wrap_19zMo .collection-item_1UBgM .collection-item-game-count_SEbUq,
.dark .game-item-footer-name_2wzwp,.dark .game-item-footer-type_wMU_g,.dark .game-item-footer-no_269PI,
.dark .list-item-cont_27du8 .testGameItem_1xvId .gameDes_1vyj7 .gameScore-no_UmJz1,
.dark .bili-game-footer .bili-game-footer-content .bili-game-footer-content-record,
.dark .bili-game-footer .bili-game-footer-content .bili-game-footer-content-record p,
.dark .list-item-cont_27du8 .testGameItem_1xvId .gameDes_1vyj7 .gameScore_OHEKi .gameScoreNum_2smPo,
.dark .list-item-cont_27du8 .testGameItem_1xvId .gameDes_1vyj7 .gameName_OGhFc,
.dark .Card-header_3tA8E .card-title_3s7_S, .dark .hotActivity-item-time_h-F8o,
.dark .list-item-title_IY-UG .date_cylZ8, .dark .list-item-title_IY-UG .games-num_2LlQZ,
.dark .list-item-cont_1zPV3 .hotGameItem_EJS60 .gameDes_2fvpP .gameName_2u5sS,
.dark .loadComplete-txt_2z5n_,.dark .Card-header_1d4vx .card-title_2RmHu .title_SE4va,
.dark .Card-recomend-item_1FSJD .card-content_1oudE .card-content-title_370f1>div,
.dark .feed-wrap_3BqTh .card-game-common_2b0P9 .card-content-info-text_1DwU6 .card-content-info-name_2y0cn,
.dark .feed-wrap_3BqTh .card-game-common_2b0P9 .card-content-info-text_1DwU6 .card-content-info-des_27h0g,
.dark .Bookswiper_3q1oK .gallery-thumbs_2oCbc .swiper-thumb-slide .gallery-thumbs-item_3mq8s .game-info_2X55m .game-info-tag_3lnOf,
.dark .Bookswiper_3q1oK .gallery-thumbs_2oCbc .swiper-thumb-slide .gallery-thumbs-item_3mq8s .game-info_2X55m .game-info-name_1X85G,
.dark .Card-recomend-item_1FSJD .card-content_1oudE .card-content-footer_2WHGE .score-degree_DnAAx,
.dark .Card-recomend-item_1FSJD .card-content_1oudE .card-content-footer_2WHGE .score-comment_3P3Er,
.dark .Card-recomend-item_1FSJD .card-content_1oudE .card-content-des_1sNxd{
  color:var(--w-text-light) !important;
}


.dark .game-item-footer-name_2wzwp:hover,
.dark .game-item-footer-type_wMU_g:hover,
.dark .list-item-cont_27du8 .testGameItem_1xvId .gameDes_1vyj7 .gameName_OGhFc:hover,
.dark .video-item-biref .biref-info .biref-title:hover {
  color:var(--w-blue-link-hover) !important;
}


.dark .bili-game-footer,.dark .list_item_1gw1l,.dark .scroll-wrap_1vXo6 ,
.dark .Card-header_1d4vx .card-title_2RmHu .title_SE4va,
.dark .bili-game-header-nav .bili-game-header-nav-bar {
  background:var(--w-bg-darker) !important;
  color:var(--w-text-light) !important;
}


.dark .Home_1ebVE,
.dakr .block-area .timeline-toggle-block .timeline-toggle-btn {
  background: none !important;
}


.dark .loadingTip-loadMore_1ydD3 .load_btn_2aV1A,.dark .body_RAI9S .aside_17bL3,
.dark .category-item_3tacB,.dark .collection-wrap_19zMo .collection-item_1UBgM,
.dark .tag_2uAvO{
  border: 1px solid var(--w-border) !important;
  color:var(--w-text-light) !important;
  background:var(--w-bg-darker) !important;
}

.dark .category-item_3tacB:hover,.dark .Card-header_1BQ_x .btn-more_1RGB7 a:hover,
.dark .loadingTip-loadMore_1ydD3 .load_btn_2aV1A:hover,
.dark .tag_2uAvO:hover {
  color:var(--w-blue-link-hover) !important;
  border-color: var(--w-blue-link-hover) !important;
  background:var(--w-bg-darker) !important;
}

`
  :
  ``


export default game_bilibili
