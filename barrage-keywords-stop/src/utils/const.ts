
export const SUPPORT = {
  HY: 'HY_LIVE',
  DOUYIN: 'DOUYIN_LIVE',
  DOUYU: 'DOUYU_LIVE',
  BILIBILI: 'BILIBILI_LIVE',
  LOCALHOST: 'LOCALHOST_LIVE'
}



export const TAG_TYPE = {
  [SUPPORT.DOUYIN]: ['.xgplayer-danmu>div', '.webcast-chatroom___item.webcast-chatroom___enter-done', '.xgplayer-danmu div'],
  [SUPPORT.HY]: ['#player-video #danmuwrap #danmudiv .danmu-item', '#player-video #danmuwrap #danmudiv #danmudiv2', '#player-marquee-wrap .player-marquee-noble-item', '#player-marquee-wrap .player-banner-enter', '#chat-room__list>div'],
  [SUPPORT.BILIBILI]: ['.web-player-danmaku .danmaku-item-container .bili-dm', '#chat-items .chat-item'],
  [SUPPORT.DOUYU]: ['#douyu_room_normal_player_danmuDom .ani-broadcast', '#js-barrage-container #js-barrage-list li'],
  [SUPPORT.LOCALHOST]: ['video']
}
