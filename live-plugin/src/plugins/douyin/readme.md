## 抖音页面内容





### 视频播放容器

当前dom测试内容为 https://www.douyin.com/

单个视频播放器内容

```js

document.querySelector('.xg-video-container video')

```

获取博主`nickname`，这种方式好像只能获取到上个视频和当前播放视频up的`nickname`，无法获取到下个视频up的`nickname`,除非看过下个视频然后划上去才会获取到

```js

Array.from(document.querySelectorAll('.account-name')).forEach(node=>{
     console.log('=================')
    console.log(node.innerText)
   
})
```


上个视频和下个视频和当前视频播放内容

```js
Array.from(document.querySelectorAll('.xg-video-container')).forEach(node=>{
    console.log(node)
})
```

获取视频标题文字内容

```js
Array.from(document.querySelectorAll('.Nu66P_ba.xhDopcQ_.Jn1tVXor')).forEach(node=>{
    console.log(node.textContent)
})
```


获取视频所有关键词内容
```js
Array.from(document.querySelectorAll('.dySwiperSlide')).forEach(node=>{
     console.log('=================')
    console.log(node.textContent)
   
})
```



### 获取不了视频列表内容如何获取下一个视频？

通过dom遍历发现，无法直接通过获取dom内容直接获取下一个视频内容，能不能像个办法监听呢 ？


通过视频滑动观察控制台发现控制台输出内容

```txt
[Warning!UnredirectedLogger!!]#I[mammon]1.0.0-defaultOnline normalization
mammon-worklet-processor.min.js:1 [Warning!UnredirectedLogger!!]#I[mammon]1.0.0-defaultCLimiter/SetPreGaindB 0, 1
mammon-worklet-processor.min.js:1 [Warning!UnredirectedLogger!!]#I[mammon]1.0.0-defaultCLimiter/SetGate 0.891251
mammon-worklet-processor.min.js:1 [Warning!UnredirectedLogger!!]#I[mammon]1.0.0-defaultUse linear gain = -0.400000dB
```


嗯……,大概是这些内容吧，说明这个能监听到视频切换了

