
const colors = ['warning', 'danger', 'info', 'success']
export const random = (array) => {
  if (!array || !Array.isArray(array)) {
    return;
  }
  return Math.floor(Math.random() * (array.length + 1))
}
export const randomColor = () => colors[random(colors)]


/**
 *
 * 为了同步插件内容这个一致
 * @see https://github.com/wuxin0011/huya-live/tree/main/src/util/index.js#HostUser
 */
export class Host {
  constructor(roomId, name) {
    this.roomId = roomId
    this.name = name
  }
}
