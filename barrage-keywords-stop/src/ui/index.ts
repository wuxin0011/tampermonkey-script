import { isNoShowTip, isFisrtInstall } from './../utils/index';

import style from './css'
import containerDOMStr from './container';


/**
* webComponent
*/
export default class BarrageKeywordsStop extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" });
    const css = document.createElement("style");
    css.innerHTML = style;
    this!.shadowRoot!.appendChild(css);
  }
  createContainer(tagName?: string, isShow?: boolean, isBefore = false) {

    if (!tagName) {
      return null
    }
    const c = document.querySelector(tagName) as HTMLElement
    if (!c) {
      console.log('当前容器不存在！请检查', tagName)
      return null;
    }

    const plugin = document.createElement('barrage-keywords-stop')
    const shadowRoot = plugin.shadowRoot
    const dmContainer = document.createElement('div')
    dmContainer.className = `m-dm-container ${isFisrtInstall() || isShow ? '' : 'm-dm-ani-close'} `
    dmContainer.innerHTML = containerDOMStr
    const tip = dmContainer.querySelector('.m-dm-container-footer .message-tip') as HTMLElement
    tip.textContent = isNoShowTip() ? '使用ctrl+alt+k可唤醒或者关闭哦！' : ''
    shadowRoot!.appendChild(dmContainer)
    if (isBefore) {
      c?.parentNode?.insertBefore(plugin, c.nextSibling);
    } else {
      c.append(plugin)
    }
    return dmContainer
  }
}
