<template>
  <div>
    <h2>
      🎈必读内容
    </h2>
    <ul>
      <li style="color:red !important;">
        同步功能使用前请确保为登录状态
      </li>
    </ul>
    <h2>
      ❓ 题单进度不一致
    </h2>
    <ul>
      <li>
        防止一次性访问题单太多，对服务器产生压力，所以采用单个题单访问然后保存状态 , 这样避免访问量问题
      </li>
      <li>
        默认情况下会缓存访问的题单情况，对于没有访问的题单，可以手动在对应题单中同步
      </li>
      <li>
        题目状态根据用户提交题目情况会实时更新，只会在提交访问一次
      </li>
    </ul>

    <h2>
      ❓ 如何使用随机题目？
    </h2>
    <ul>
      <li>
        这个可以根据自己要求，配置好之后，可以使用 <em> ctrl + alt + j </em> 触发
      </li>
      <li>
        如果这个快捷键影响，可以在命令设置中关闭
      </li>
    </ul>


    <h2>
      ❓ 如何使用美服
    </h2>
    <ul>
      <li>
        处于网络安全策略，对于不同网站请求有
        <el-link :underline="false" href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS" type="primary"
          target="_blank">跨域机制保护</el-link>
        美服和国服是两个不同网站，因此无法实现不同网站题单同步 。
      </li>
      <li>
        如果想使用美服，请复制一份题单到美服中
        <el-link :underline="false" href="https://cn-greasyfork.org/zh-CN/scripts/491969-lc-to-markdown-txt-html"
          type="primary" target="_blank">lc-to-markdown-txt-html</el-link>
        这个插件来复制题单
      </li>
      <li>
        <el-link :underline="false" href="https://leetcode.com/discuss/interview-question/6032972/leetcode"
          type="primary" target="_blank">美服题单演示</el-link>
      </li>
    </ul>

    <h2>
      🔗 反馈更新
    </h2>

    <ul>
      <li>
        你可以在
        <el-link :underline="false" href="https://cn-greasyfork.org/zh-CN/scripts/501134-0x3f-problem-solution/feedback"
          type="success" target="_blank">油猴</el-link>
        &nbsp;
        <el-link :underline="false" href="https://scriptcat.org/zh-CN/script-show-page/1967"
          type="success" target="_blank">脚本猫</el-link>
        中更新或下载
      </li>
      <li>
        <el-link :underline="false" href="https://cn-greasyfork.org/zh-CN/scripts/501134-0x3f-problem-solution/feedback"
          type="primary" target="_blank">点击</el-link>这里反馈
        或者
        <el-link target="_blank" :underline="false" href="https://github.com/wuxin0011/tampermonkey-script/issues"
          type="primary">issues</el-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
h2 {
  color: black !important;
  margin: 10px 0 !important;
  font-size: 20px !important;
}
</style>