import { is_localhost } from "../../utils/index.js";



const htmlTemplate = (show1, show2, show3, show4, show5) => {
    return `<div class="m-container">
    <div class="m-container-box" id="m-container-box2">
        <div class="operation">
            <input type="text" placeholder="房间号或者名称...">
            <button class="btn btn-primary add-room" title="复制地址栏房间号，手动添加房间">添加</button>
            <button class="btn btn-success clear-room" title="重置表格数据">重置</button>
            <button class="btn btn-warning bg-btn" title="上传背景图">背景</button>
            <input type="file" id="file">
            <input type="checkbox" id="checkbox1" ${show1 ? "checked" : ""} class="checkbox" title="是否显示背景" />背景
            <input type="checkbox" id="checkbox2" ${show2 ? "checked" : ""} class="checkbox" title="是否显示左侧菜单"/>菜单
            <input type="checkbox" id="checkbox3" ${show3 ? "checked" : ""} class="checkbox" title="自动全屏"/>全屏
            <input type="checkbox" id="checkbox4" ${show4 ? "checked" : ""} class="checkbox" title="显示礼物栏"/>礼物
            <input type="checkbox" id="checkbox5" ${show5 ? "checked" : ""} class="checkbox" title="关闭或者显示插件Logo"/>logo
            <a class="m-link" href="https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD" target="_blank" title="更新、反馈">更新</a>
            <button class="btn btn-info btn-close-container" title="关闭" >关闭</button>
        </div>
        <table>
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
 </div>`
}



export default htmlTemplate
