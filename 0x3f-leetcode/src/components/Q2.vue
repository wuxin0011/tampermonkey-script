<template>
    <div>
        <h2>
            1. 为什么部分题单出现统计数量为 <em> 0 </em> 情况 ?
        </h2>
        <p>防止一次性访问题单太多，对服务器产生压力，所以采用单个题单访问然后保存状态 , 这样避免访问量问题</p>
    </div>
</template>
<style scoped>
h2 {
    color: black;
    margin: 10px 0;
}

p {
    text-decoration: underline;
    font-size: 14px;
    
}

em {
    color: red;
}
</style>