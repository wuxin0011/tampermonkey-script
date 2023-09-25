import { support } from "@/utils";
import LivePluginCss from '@/style/live.css'
import { isNeedDark, isAutoDark, themeOptions } from '@/hook/useTheme'


/**
 * 模板
 * @param {背景} isShowBg
 * @param {菜单} isShowMenu
 * @param {全屏} isShowFullScreen
 * @param {礼物} isShowGift
 * @param {logo} isShowLogo
 * @param {isMaxPro} isMaxPro
 * @returns
 */
const htmlTemplate = (isShowBg, isShowMenu, isShowFullScreen, isShowGift, isShowLogo, isMaxPro = true) => {
    return `
    <div class="m-container-box" id="m-container-box2">
        <div class="operation">
            ${support.supportSearch() ? `<input type="text" placeholder="房间号或者名称...">` : ``}
            ${support.supportAdd() ? `<button class="btn btn-primary add-room" title="复制地址栏房间号，手动添加房间,也可以通过点击房间名称添加">添加</button>` : ``}
            ${support.supportReset() ? `<button class="btn btn-success clear-room" title="重置表格数据">重置</button>` : ``}
            ${support.supportTheme() ? `<button class="btn btn-info room-theme" title="${isNeedDark() ? '点击切换到白天模式' : '点击切换到黑夜模式'}">${isNeedDark() ? '白天' : '黑夜'}</button>` : ``}
            ${support.supportBg() ? `<button class="btn btn-warning bg-btn" title="上传背景图">背景</button>` : ``}
            ${support.supportBg() ? `<input type="file" id="file">` : ``}
            ${support.supportBg() ? `<input type="checkbox" id="checkbox1" ${isShowBg ? "checked" : ""} class="checkbox" title="是否显示背景" />背景` : ``}
            ${support.supportMenu() ? `<input type="checkbox" id="checkbox2" ${isShowMenu ? "checked" : ""} class="checkbox" title="是否显示左侧菜单"/>菜单 ` : ``}
            ${support.supportAutoFullScreen() ? ` <input type="checkbox" id="checkbox3" ${isShowFullScreen ? "checked" : ""} class="checkbox" title="自动全屏"/>全屏` : ``}
            ${support.supportGift() ? `<input type="checkbox" id="checkbox4" ${isShowGift ? "checked" : ""} class="checkbox" title="显示礼物栏"/>礼物` : ``}
            <input type="checkbox" id="checkbox5" ${isShowLogo ? "checked" : ""} class="checkbox" title="关闭或者显示插件Logo. ctrl+alt+j 可唤醒"/>logo
            ${support.supportAutoViewMaxPro() ? `<input type="checkbox" id="checkbox6" ${isMaxPro ? "checked" : ""} class="checkbox" title="自动最高画质"/>画质` : ``}
            ${support.supportTheme() ? `<input type="checkbox" id="m-dark-is-auto" ${isAutoDark() ? "checked" : ""} class="checkbox" title="自动调整主题,根据时间段改变"/>自动` : ``}
            ${support.supportTheme() ? `<select class="m-dark-type-select" id="m-dark-select">
                                            ${themeOptions()}
                                        </select>` : ``}
            <a class="m-link" href="https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD" target="_blank" title="更新、反馈">更新</a>
            <button class="btn btn-info btn-close-container" title="关闭 , ctrl+alt+j 可唤醒" >关闭</button>
        </div>
        <table ${support.supportTable() ? '' : 'style="display:none !important;"'}>
            <thead>
                <th>序号</th>
                <th>名称</th>
                <th>房间号</th>
                <th>操作</th>
            </thead>
            <tbody>
            </tbody>
        </table>
        </div>
`
}



/**
 * LivePluginElement webComponent
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_custom_elements
 */
export class LivePluginElement extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.innerHTML = LivePluginCss
        // init
        const isShowBg = this.getAttribute('is-show-bg');
        const isShowMenu = this.getAttribute('is-show-menu');
        const isShowFullScreen = this.getAttribute('is-show-full-screen');
        const isShowGift = this.getAttribute('is-show-gift');
        const isShowLogo = this.getAttribute('is-show-logo');
        const isMaxPro = this.getAttribute('is-max-pro');


        // html content
        const wrapper = document.createElement('div');
        wrapper.className = `${isNeedDark()?'dark':''} m-container`
        wrapper.innerHTML = htmlTemplate(isShowBg, isShowMenu, isShowFullScreen, isShowGift, isShowLogo, isMaxPro)

        // add shadow style 
        shadow.appendChild(style);
        // add dom
        shadow.appendChild(wrapper);
    }
}


// 

export const createContainer = (isShowBg, isShowMenu, isShowFullScreen, isShowGift, isShowLogo, isMaxPro = true) => {
    const livePlugin = document.createElement('live-plugin-element');
    livePlugin.setAttribute('is-show-bg', isShowBg);
    livePlugin.setAttribute('is-show-menu', isShowMenu);
    livePlugin.setAttribute('is-show-full-screen', isShowFullScreen);
    livePlugin.setAttribute('is-show-gift', isShowGift);
    livePlugin.setAttribute('is-show-logo', isShowLogo);
    livePlugin.setAttribute('is-max-pro', isMaxPro);
    document.querySelector('body').append(livePlugin)
    return livePlugin.shadowRoot.querySelector('.m-container')
}




export default htmlTemplate
