import { is_bilibili, is_localhost } from "../../utils/index.js";



const getHtmlStr = (show1, show2, show3, show4, show5) => {
  if (is_bilibili || is_localhost) {
    return `<div class="m-container">
        <div class="m-container-box  m-type-container m-ani-left-is-active" id="m-container-box1">
          <div class="m-type-operation">
            <div class="m-type-item">
              <div class="m-type-item-left">
                <div class="m-select-option-container m-ani-left-is-active" id="m-select-option">
                  <div class="m-select">
                    <div class="m-select-item">
                      <input type="text" class="" placeholder="输入关键词过滤">
                    </div>
                    <div class="m-select-item">
                      <select class="m-tag-select">
                        <option value="" class="m-option-default">选择分类</option>
                        <option value="option1">选项1</option>
                      </select>
                    </div>
                    <div class="m-select-item">
                      <button class="btn btn-primary">
                        &check;
                      </button>
                    </div>
                    <div class="m-select-item">
                      <select class="m-tag-select" id="select-video-tag">
                        <option value="" class="m-option-default">选择标签</option>
                        <option value="option1">选项1</option>
                      </select>
                    </div>
                    <div class="m-select-item">
                      <button class="btn btn-primary">
                        &check;
                      </button>
                    </div>
                    <div class="m-select-item">
                      <button class="btn btn-warning" id="m-select-input-address">
                        &rightarrow;
                      </button>
                    </div>
                  </div>
                </div>
                <div class="m-select-input-container m-ani-right-is-close" id="m-select-input">
                  <div class="m-category-input-item">
                    <input type="text" class="m-category-input" placeholder="输入视频地址或者自定义类型">
                    <button class="btn btn-success">
                      搜索
                    </button>
                    <button class="btn btn-primary"> &check;</button>
                    <button class="btn btn-warning" id="m-select-input-select"> &leftarrow;</button>
                  </div>
                </div>
              </div>
              <div class="m-type-item-right">
                <button class="btn btn-danger" id="m-change-box1">房间号操作</button>
              </div>
            </div>
            <div class="m-search-result">
              <!-- <span class="m-search-msg">分类:游戏 视频标签: 二次元 、原神</span> -->
            </div>
          </div>
          <table>
            <thead>
              <th>序号</th>
              <th>分类</th>
              <th>标签</th>
              <th>操作</th>
            </thead>
            <tbody>
  
            </tbody>
          </table>
        </div>
        <div class="m-container-box m-ani-right-is-close" id="m-container-box2">
          <div class="operation">
            <input type="text" placeholder="房间号或者名称...">
            <button class="btn btn-danger" id="m-change-box2">视频分类操作</button>
            <button class="btn btn-primary add-room" title="复制地址栏房间号，手动添加房间">添加</button>
            <button class="btn btn-success clear-room" title="重置表格数据">重置</button>
            <button class="btn btn-warning bg-btn" title="上传背景图">背景</button>
            <input type="file" id="file">
            <input type="checkbox" id="checkbox1" ${show1 ? 'checked' : ''} class="checkbox" title="是否显示背景" />背景
            <input type="checkbox" id="checkbox2" ${show2 ? 'checked' : ''} class="checkbox" title="是否显示左侧菜单" />菜单
            <input type="checkbox" id="checkbox3" ${show3 ? 'checked' : ''} class="checkbox" title="自动适应屏幕" />剧场
            <input type="checkbox" id="checkbox4" ${show4 ? 'checked' : ''} class="checkbox" title="是否开启礼物" />礼物
            <input type="checkbox" id="checkbox5" ${show5 ? 'checked' : ''} class="checkbox" title="关闭或者显示插件Logo" />logo
            <a class="m-link" href="https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD"
              target="_blank" title="更新、反馈">更新</a>
            <button class="btn btn-info btn-close-container" title="点击关闭">关闭</button>
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
  } else {
    return `<div class="m-container">
        <div class="m-container-box" id="m-container-box2">
            <div class="operation">
                <input type="text" placeholder="房间号或者名称...">
                <button class="btn btn-primary add-room" title="复制地址栏房间号，手动添加房间">添加</button>
                <button class="btn btn-success clear-room" title="重置表格数据">重置</button>
                <button class="btn btn-warning bg-btn" title="上传背景图">背景</button>
                <input type="file" id="file">
                <input type="checkbox" id="checkbox1" ${show1 ? 'checked' : ''} class="checkbox" title="是否显示背景" />背景
                <input type="checkbox" id="checkbox2" ${show2 ? 'checked' : ''} class="checkbox" title="是否显示左侧菜单"/>菜单
                <input type="checkbox" id="checkbox3" ${show3 ? 'checked' : ''} class="checkbox" title="自动适应屏幕"/>剧场
                <input type="checkbox" id="checkbox4" ${show4 ? 'checked' : ''} class="checkbox" title="是否开启礼物"/>礼物
                <input type="checkbox" id="checkbox5" ${show5 ? 'checked' : ''} class="checkbox" title="关闭或者显示插件Logo"/>logo
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
}



export default getHtmlStr
