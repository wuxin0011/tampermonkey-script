<template>
  <div>
    <h2>
      1. 为什么部分题单出现统计数量为 <em> 0 </em> 情况 ?
    </h2>
    <p>防止一次性访问题单太多，对服务器产生压力，所以采用单个题单访问然后保存状态 , 这样避免访问量问题</p>
    <p>默认情况下会缓存访问的题单情况，对于没有访问的题单，可以手动在对应题单中同步</p>

    <h2>
      2、题单有时候会出现不同步
    </h2>
    <p>这个没啥问题，题目状态根据用户提交题目情况会实时更新，只会在提交访问一次</p>


    <h2>
     3、 如何使用随机题目？
    </h2>
    <p>这个可以根据自己喜好来配置，配置好之后，可以使用  <em> ctrl + alt + j </em> 触发 </p>

    <h2>
     4、反馈
    </h2>
    <p>你可以<el-link :underline="false" href="https://greasyfork.org/zh-CN/scripts/501134-0x3f-problem-solution/feedback" type="primary" target="_blank">点击</el-link>这里反馈  ，或者访问 github 提一个 <el-link target="_blank" :underline="false" href="https://github.com/wuxin0011/tampermonkey-script/issues"  type="primary">issues</el-link></p>
  </div>
</template>

<style scoped>
h2 {
  color: black;
  margin: 10px 0;
}


em {
  color: red;
}
</style>