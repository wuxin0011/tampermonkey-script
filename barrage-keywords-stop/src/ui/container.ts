const containerDOMStr = ` 
    <div class="m-dm-container-header">
      <input type="text" class="m-dy-input-add-keywords" placeholder="请输入关键字">
      <div class="m-dm-add-keywords-button">确认</div>
      <div class="m-dm-all-keywords-button" title="当前弹幕仅在房间内生效,点击切换到全房间">房间</div>
      <div class="m-dm-delete-keywords-button">清空</div>
      <input type="checkbox" class="m-dm-animation-checkbox" id="m-dm-animation-checkbox" title="如果弹幕区出现抖动，添加一个过渡可能好点">
      <input type="text"  class="m-dm-input-animation-time" id="m-dm-input-animation-time" title="自定义输出一个过渡时间,默认为0.5s,建议数字大小在0-1之间" placeholder="请输入弹幕过渡时间">
      <div class="m-dm-time-button">确认</div>
      <span title="收起 使用 ctrl+alt+k可唤醒 我哦" class="m-dm-close-btn" id="m-dm-close-btn"> &times </span>
    </div>
    <div class="m-dm-container-body"></div>
    <div class="m-dm-container-footer">
       <p class="message-tip"></p>
      <a href="https://greasyfork.org//zh-CN/scripts/475878-barrage-keywords-stop"  target="_blank" title="更新" class="m-dm-install-link">反馈</a>
    </div>
`
export default containerDOMStr
