
// ==UserScript==
// @name         直播插件
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  虎牙直播、斗鱼直播 页面简化，屏蔽主播直播间
// @author       wuxin001
// @match        https://www.huya.com/*
// @match        https://www.douyu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==


const huya_address_pattern=/https:\/\/www.huya.com\/*/
const doyu_address_pattern=/https:\/\/www.douyu.com\/*/
const bg_regx = /^http[s](.*)(\.(png|jpg|jpeg).*)$/;
const local_url = window.location.href

// 虎牙直播插件
function huyaPlugin()
{
    (
        function () {
            'use strict';
            // key
            const key = 'huyazhibo'
            // 背景地址key
            const bg_key = 'huyazhibo_bg'
            // 是否显示背景key
            const bg_show_key = 'huyazhibo_bg_show'
            // 是否显示菜单
            const menu_show_key= 'huyazhibo_menu_show_key'
            const defaultBackgroundImage='https://a.msstatic.com/huya/main3/assets/img/index-bg_59f9c.jpg'
            // 直播源
            const baseUrl = "https://www.huya.com/"
            // 存放屏蔽主播信息
            let users = []
            // 输入框
            let inputValue = null

            /*************容器*********/
            let html = null
            let body = null
            let tbody = null
            let m_container = null
            window.onload = () => {

                try{
                    console.log(
                        ' %c  欢迎使用虎牙直播插件,下载地址： %c '
                        .concat('https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD', ''), 'background: rgb(255, 135, 0); padding: 1px; border-radius: 3px 0 0 3px; color: #fff', 'border-radius: 0 3px 3px 0; color: #fff')
                    console.log(
                        '%c 源码地址: %c '
                        .concat('https://github.com/wuxin0011/huya-live', ''), 'background: rgb(255, 135, 0); padding: 1px; border-radius: 3px 0 0 3px; color: #fff', 'border-radius: 0 3px 3px 0; color: #fff')
                    html = document.querySelector('html')
                    body = document.querySelector('body')
                    // 初始化房间号
                    users = getLocalStore()
                    // 是否屏蔽直播间
                    if (!removeRoom()) {
                        // 添加容器
                        create_container()
                        // 移除 其他轮播图，导航栏等
                        removeWall()
                    }
                    // 给直播间添加删除按钮
                    addRemoveBtn();
                    // home
                    indexHome();
                }catch(e){
                    console.error(e)
                }


            }

            // 定义主播类
            class HostUser{
                constructor(id,name){
                    this.id = id;
                    this.name = name;
                }
            }

            const create_container = () => {
                // 初始化房间号
                users = getLocalStore()
                let show1 = isSelect(bg_show_key)
                let show2 = isSelect(menu_show_key)
                m_container = s2d(`
                    <div class="m-container">
                    <div class="operation">
                          <input type="text" placeholder="房间号..."/>
                          <button class="btn btn-success search-room">搜索</button>
                          <button class="btn btn-teal add-room">添加</button>
                          <button class="btn btn-info flush-room">刷新</button>
                          <button class="btn btn-danger clear-room">清空</button>
                          <button class="btn btn-success bg-btn">背景</button>
                          <input type="checkbox" id="checkbox1" checked=${show1} class="checkbox"/>背景
                          <input type="checkbox" id="checkbox2" checked=${show2} class="checkbox"/>菜单
                          <a class="m-link" href="https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD" target="_blank" title="更新、反馈">更新</a>
                      </div>
                     <table >
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
`)

                if (!body) {
                    body = document.querySelector('body')
                }
                // 如果还是获取不到插件加载失败
                if(!body){
                    return;
                }
                body.appendChild(m_container)
                tbody = document.querySelector('.m-container table tbody')
                inputValue = m_container.querySelector('.m-container .operation input')

                // 搜索、刷新、添加
                operationDOMButton()

                // 添加直播房间号信息
                createRoomItem(users)
                // 右侧点击添加button
                createButton()
                if(inputValue){
                    inputValue.addEventListener('keyup', function (e) {
                        if(e.key=='Enter'){
                            let arr = users.filter(item=>{
                                return item.id.indexOf(inputValue.value) !=-1 || item.name.indexOf(inputValue.value)!=-1
                            })
                            resetTbody(arr)
                        }
                    })
                }
            }


            // 生成房间号item
            const createRoomItem = (arr) => {
                if(!Array.isArray(arr)){
                    return;
                }
                arr.forEach((item, index) => {
                    let tr = document.createElement('tr')
                    tr.style.borderBottom = '1px solid rgba(0,0,0,0.4)'
                    tr.style.margin = '10px 0'
                    tr.style.padding = '20px 10px'
                    tr.innerHTML =
                        `<td style="padding:10px;">${index+1}</td>
                    <td style="padding:10px;">${item.name}</td>
                    <td style="padding:10px;">${item.id}</td>
                    <td style="padding:10px;">
                    <button class="btn btn-danger" room-id="${item.id}">删除</button></td>`
                tbody.appendChild(tr)
                    // 添加删除事件
                    const deleteBtn = tr.querySelector('button')
                    deleteBtn.addEventListener('click', function (e) {
                        const id = e.target.getAttribute('room-id')
                        removeDOM(tr)
                        userDelete(id)
                        // 如果是当前主播，需要刷新
                        if(getRoomIdByUrl(window.location.href) == id){
                            window.location.reload()
                        }
                    })

                })
            }


            // 生成字符串dom
            const s2d = (string) => {
                return new DOMParser().parseFromString(string, 'text/html').body.childNodes[0]
            }

            const operationDOMButton = () =>{


                const searchRoomBtn = document.querySelector('body .m-container .operation .search-room')
                searchRoomBtn.addEventListener('click', function () {
                    let arr = users.filter(item=>{
                        return item.id.indexOf(inputValue.value) !=-1 || item.name.indexOf(inputValue.value)!=-1
                    })
                    resetTbody(arr)
                })


                const addRoomBtn = document.querySelector('.m-container .operation  button.add-room')
                addRoomBtn.addEventListener('click', function () {
                    const keywords = inputValue.value.trim()
                    if (!keywords) {
                        return alert('请输入房间号！')
                    }
                    if (!userIsExist(keywords)) {
                        const hostName = document.querySelector('.host-name')
                        if(!hostName){
                            const rooms = document.querySelectorAll('.game-live-item')
                            if(rooms && rooms.length>0){
                                for(let room of rooms){
                                    const id = getRoomIdByUrl(room.querySelector('a').href)
                                    const user = room.querySelector('.txt i')
                                    if( id === keywords){
                                        hostName = user
                                    }
                                }
                            }
                        }
                        const name = hostName && hostName.textContent?hostName.textContent:''
                        if(name){
                            addUser(hostName.textContent,keywords)
                            inputValue.value = ''
                        }else{
                            if(confirm(`房间号为${inputValue.value}的主播不存在！确定添加？`)){
                                addUser(keywords,keywords)
                                inputValue.value = ''
                            }
                        }

                    } else {
                        alert('该主播已添加！')
                    }
                })

                const flushRoomBtn = document.querySelector('.m-container button.flush-room')
                flushRoomBtn.addEventListener('click', function () {
                    users = getLocalStore()
                    resetTbody(users)
                })


                const clearRoomBtn = document.querySelector('.m-container button.clear-room')
                clearRoomBtn.addEventListener('click', function () {
                    if(confirm('确认清空？')){
                        users = addLocalStore([])
                        resetTbody(users)
                        if(userIsExist(window.location.href)){
                            window.location.reload();
                        }
                    }
                })


                // 设置背景
                const bgBtn = document.querySelector('.m-container button.bg-btn')
                bgBtn.addEventListener('click', function () {
                    let result = prompt('请输入背景图地址')
                    if(!result){
                        return;
                    }
                    if(!isImageUrl(result)){
                        return alert('请输入一个图片地址');
                    }
                    fetch(result).then(res=>{
                        if( res && res.status == 200 ){
                            window.localStorage.setItem(bg_key,result)
                            settingBackgroundImage(result)
                        }else{
                            alert('图片资源访问失败，可能存在跨域问题，请更换一张地址')
                        }

                    }).catch(e=>{
                        alert('图片资源访问失败，可能存在跨域问题，请更换一张地址')
                    })


                })

                // 是否开启背景
                const checkbox = document.querySelector('.m-container #checkbox1')
                checkbox.addEventListener('change', function (e) {
                    window.localStorage.setItem(bg_show_key,e.target.checked)
                    settingBackgroundImage(window.localStorage.getItem(bg_key))
                })

                // 是否关闭菜单
                const menu = document.querySelector('.m-container #checkbox2')
                menu.addEventListener('change', function (e) {
                    const d = document.querySelector('.mod-sidebar')
                    if(d){
                        if(e.target.checked){
                            d.style.display = 'block';
                        }else{
                            d.style.display = 'none'
                        }
                        window.localStorage.setItem(menu_show_key,e.target.checked)
                    }

                })

            }



            const resetTbody = (arr) => {
                // 删除原来dom
                let table = document.querySelector('body .m-container table')
                removeDOM(tbody)
                tbody = document.createElement('tbody')
                let thead = document.createElement('thead')
                let room_index = document.createElement('th')
                let room_name = document.createElement('th')
                let room_id = document.createElement('th')
                let room_operation = document.createElement('th')
                thead.appendChild(room_index)
                thead.appendChild(room_name)
                thead.appendChild(room_id)
                thead.appendChild(room_operation)
                table.appendChild(tbody)
                // 添加操作窗口
                createRoomItem(arr)

            }


            const removeWall = () => {
                // 屏蔽轮播图
                removeElement('.list-adx')
                // 移除直播通知内容
                removeElement('.liveList-header-r')
                // 屏蔽左侧导航栏
                removeElement('.helperbar-root--12hgWk_4zOxrdJ73vtf1YI')
                // 删除主播直播间底部信息
                removeElement('.room-footer')
                // 删除礼物 排行
                removeElement('J_roomSideHd')
                // 删除直播间礼物窗口
                removeElement('#player-gift-wrap')
                // 直播间左侧礼物排行1
                removeElement('#match-cms-content')
                // 直播间左侧礼物排行2
                removeElement('#matchComponent2')
                // 删除礼物活动
                if(new RegExp(/https:\/\/.*(\d+)$/).test(window.location.href)){
                    //const root = document.querySelector('#root')
                    //removeDOM(root)
                }


                // 导航栏 游戏广告连接
                removeElement('.hy-nav-item.hy-nav-item-game')
                removeElement('.hy-nav-item.hy-nav-link-ext')
                removeElement('.hy-nav-item.hy-nav-item-match')
                removeElement('.hy-nav-item.hy-nav-item-video')

                //分类页面菜单信息
                const d = document.querySelector('.mod-sidebar')
                let d_show = isSelect(menu_show_key)
                if(d){
                    if(d_show){
                        d.style.display = 'block';
                    }else{
                        d.style.display = 'none';
                    }
                }

                settingBackgroundImage(window.localStorage.getItem(bg_key))

                addRemoveButton()
                const dd = document.querySelectorAll('.live-list-nav dd')
                if(dd){
                    for(let d of dd){
                        d.addEventListener('click',()=>{
                            // 方案一
                            //window.location.reload()

                            // 方案二
                            setTimeout(()=>{
                                addRemoveButton()
                            },2000)

                        })

                    }
                }


            }



            const addRemoveButton = () => {
                const rooms = document.querySelectorAll('.game-live-item')
                if(rooms){
                    for( let li of rooms){
                        try{
                            const a = li.querySelector('a')
                            // 获取单个主播间房间地址
                            const url = a.href
                            // 获取房间i
                            const user = li.querySelector('.txt i')
                            const name = user.textContent || ''
                            if(user){
                                user.addEventListener('click',()=>{
                                    if(confirm(`确认禁用 ${name}？`)){
                                        addUser(getRoomIdByUrl(url),name);
                                        removeDOM(li);
                                    }
                                })
                            }

                            if (isRemove(url)) {
                                removeDOM(li)
                            }

                        }catch(e){}

                    }
                }
            }


            const removeRoom = () => {
                const href = window.location.href
                if (!isRemove(href)) {
                    return false
                }
                removeRoomClick();
                return true
            }

            const removeRoomClick = () => {
                if(!removeRoom){
                    return;
                }
                try{
                    const body1 = document.querySelector('body')
                    const room = document.querySelector('.room-core')
                    if(room){
                        const video = room.querySelector('video')
                        // 点击播放按钮
                        // const videoBtn = room.querySelector('.player-play-btn')
                        // 如果失败 操作video源
                        // 暂停播放
                        if(video){
                            video.pause()
                        }
                        // 删除直播源
                        removeDOM(video)
                    }

                    // 删除直播源和直播间
                    removeDOM(room)
                    removeDOM(body1)
                }catch(e){}
                setInterval(()=>{
                    try{
                        const room = document.querySelector('.room-core')
                        if(room){
                            const video = room.querySelector('video')
                            // 点击播放按钮
                            // const videoBtn = room.querySelector('.player-play-btn')
                            // 如果失败 操作video源
                            // 暂停播放
                            if(video){
                                video.pause()
                            }
                            // 删除直播源
                            removeDOM(video)
                        }

                        // 删除直播源和直播间
                        removeDOM(room)
                    }catch(_){}
                },5000)


                const h2 = document.createElement('h2')
                body = document.createElement('body')

                body.style.display = 'flex'
                body.style.justifyContent = 'center'
                body.style.alignItems = 'center'

                h2.textContent = '该主播已被你屏蔽！'
                h2.style.fontSize = '50px'

                document.querySelector('title').textContent = '该主播已被你屏蔽';


                html.appendChild(body)
                body.appendChild(h2)

                const core_container = document.querySelector('.m-container')
                removeDOM(core_container)

                // 创建操作面板
                create_container()
            }


            // 该链接是否应该被移除
            const isRemove = (href) => {
                return userIsExist(getRoomIdByUrl(href));
            }

            // 通过房间地址获取房间号
            const getRoomIdByUrl = (url) => {
                let arr = url.split('/')
                let roomId = arr[arr.length - 1]
                return roomId
            }


            // 添加右侧按钮
            const createButton = () => {
                if(!body){
                    return;
                }
                const btn = document.createElement('button')
                // btn.classList = 'btn'
                btn.style.cursor = 'pointer'
                btn.style.position = 'fixed'
                btn.style.top = '300px'
                btn.style.right = '0px'
                btn.style.padding = '5px 10px'
                btn.style.backgroundColor = 'rgb(255, 135, 0)'
                btn.style.border = 'none'
                btn.style.borderRadius = '20px'
                btn.style.fontSize = '12px'
                btn.style.color = '#fff'
                btn.style.zIndex = 100000
                btn.textContent = '小虎牙'
                btn.addEventListener('click', function (e) {
                    if (m_container.style.display === 'block') {
                        m_container.style.display = 'none'
                    } else {
                        m_container.style.display = 'block'
                    }
                })
                btn.addEventListener('mouseenter', function () {
                    btn.style.backgroundColor = 'rgba(255, 135, 0,0.6)'
                })
                btn.addEventListener('mouseleave', function () {
                    btn.style.backgroundColor = 'rgba(255, 135, 0,1)'
                })
                body.appendChild(btn)

            }

            // 删除元素
            const removeDOM = (element) => {
                try {
                    if(element){
                        element.style.display = 'none'
                        element.remove()
                    }
                } catch (e) {} // 防止element没有remove方法
            }

            const removeElement = (selector) => {
                removeDOM(window.document.querySelector(selector))
            }


            const userIsExist = (keywords)=>{
                keywords = keywords.trim()
                for(let i = 0; i < users.length; i++){
                    if( users[i].name === keywords || users[i].id === keywords){
                        return true
                    }
                }
                return false
            }


            const userDelete = (keywords)=>{
                users.forEach((item,index)=>{
                    if( keywords == item.name || keywords == item.id){
                        users.splice(index,1)
                    }
                })
                addLocalStore(users)
            }

            const addUser = (id,name)=>{
                if (userIsExist(id)||userIsExist(name)) {
                    return alert('该房间已存在！');
                }
                const newUser = new HostUser(id,name);
                users.unshift(newUser)
                addLocalStore(users)
                resetTbody(users)
                if(id == getRoomIdByUrl(window.location.href)){
                    removeRoomClick();
                }

            }

            const settingBackgroundImage = (url) => {
                const body1 = document.querySelector('body')
                if(isSelect(bg_show_key)){
                    body1.style.backgroundSize="cover"
                    body1.style.backgroundRepeat='no-repeat'
                    body1.style.backgroundAttachment='fixed'
                    body1.style.backgroundImage=`url(${url})`
             }else{
                 body1.style.backgroundImage='none'
             }

            }

            const getImageUrl = (url) => {
                return isImageUrl(url)?url:(isImageUrl(window.localStorage.getItem(bg_key))?window.localStorage.getItem(bg_key):defaultBackgroundImage);
            }

            // 是否是一张图片地址
            const isImageUrl = (url) => {
                return bg_regx.test(url)
            }

            // 添加到本地
            const addLocalStore = (obj) => {
                // 本地获取
                window.localStorage.setItem(key, JSON.stringify(obj))
                // 保存首次加载能够移除直播间
                removeRoom()
            }

            // 从本地获取存储信息
            const getLocalStore = () => {
                const obj = JSON.parse(window.localStorage.getItem(key))
                return Array.isArray(obj) ? obj : []
            }

            // 从本地获取缓存key 是否选择
            const isSelect = (k)=>{
                let show = window.localStorage.getItem(k)
                return (show == 'true' || show == true )?true:false;
            }



            const addRemoveBtn = ()=>{
                // 直播源
                const hostName = document.querySelector('.host-name')
                if(hostName){
                    hostName.addEventListener('click',()=>{
                        if(confirm(`确认禁用 ${hostName.textContent}？`)){
                            addUser(getRoomIdByUrl(window.location.href), hostName.textContent)
                        }
                    })

                }

            }


            const indexHome = ()=>{
                // 直播源
                const url = window.location.href
                if( url == baseUrl ){

                    try{
                        const video = document.querySelector('.mod-index-main video')
                        if (video&&video.paused) {
                            video.pause()
                        }
                        removeDOM(video)
                    }catch(e){

                    }
                    // 循环删除播放
                    setInterval(()=>{

                        try{
                            const video = document.querySelector('.mod-index-main video')
                            if (video&&video.paused) {
                                video.pause()
                            }
                            removeDOM(video)
                        }catch(e){

                        }
                    },10000)

                    removeElement('.mod-index-main .main-bd')
                    removeElement('.mod-index-main .main-hd')
                    // huya-icon
                    removeElement('.helperbar-root--12hgWk_4zOxrdJ73vtf1YI')
                    // type
                    removeElement('.mod-game-type')
                    // actlist
                    removeElement('.mod-actlist')
                    // livebox
                    removeElement('.mod-index-list .live-box')
                    // news
                    removeElement('.mod-news-section')
                    // recommend
                    removeElement('.recommend-wrap')
                    // recommendbg
                    removeElement('.mod-index-recommend')

                    // banner
                    const banner_close = document.querySelector('.mod-index-wrap #banner i')
                    if(banner_close){
                        banner_close.click();
                    }
                    // main
                    removeElement('.mod-index-main')
                    // banner
                    removeElement('#banner')

                    // list
                    const l = document.querySelector('.mod-index-list')
                    l.style.marginTop = '100px';

                    //顶部
                    const header = document.querySelector('#duya-header')
                    header.style.backgroundColor = '#f4f5f8';
                    header.style.color = 'rgb(79, 79, 79) !important';
                    const headerLink = header.querySelectorAll('.hy-nav-item a')
                    for(let a of headerLink){
                        a.style.color = 'black'
                    }

                }
            }

            // 样式部分
            GM_addStyle(`
   .m-container {
      box-sizing: border-box;
      position: fixed;
      display: none;
      width: 550px;
      height: 400px;
      top: 100px;
      left: 50%;
      border-radius: 0;
      overflow: hidden scroll;
      background-color: white;
      transform: translateX(-50%);
      z-index:1000;
      transition: display linear 1s;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2),
      -2px -2px 2px rgba(0, 0, 0, 0.2);
    }
    .m-container .operation {
      box-sizing: border-box;
      height: 80px;
      padding: 20px 0 0 0;
      text-align: center;
    }
     .m-container .operation input[type="text"] {
      width:120px;
      box-sizing: border-box;
      outline: none;
      border: 1px solid teal;
      padding: 5px;
    }
    .m-container .operation input[type="text"]:focus {
      border: 2px solid teal;
    }

    .m-container .operation input[type="checkbox"] {
      display:inline;
    }

    .m-container table {
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      padding: 10px;
      text-align: left !important;
      margin: 0 auto;
      max-height:200px;
      width: 90%;
    }
    .m-container  table tbody {
      max-height: 250px;
      text-align: left !important;
    }
    .m-container table thead{
      border-top: 1px solid rgba(0,0,0,0.4);
      border-bottom: 1px solid rgba(0,0,0,0.4);
      text-align: left !important;
      padding: 10px;
    }
    .m-container table th, m-container table td {
      padding: 10px;
    }
    .m-container table tr {
      border-bottom: 1px solid rgba(0,0,0,0.4);
      margin:5px 0;
    }
    .m-container .m-link,.m-container .m-link:visited{
       color:blnk !important;
    }

    .m-container .m-link:hover{
       color:blue !important;
       text-decoration:underline !important;
    }
    .m-container .btn {
      cursor: pointer !important;
      padding: 5px 8px !important;
      border: none !important;
      color: #fff !important;
      font-size:10px !important;
      border-radius:20px !important;
      max-width:50px  !important;;
      z-index:1000 !important;
    }

    .m-container .btn-teal{
      background-color:rgba(0, 128, 64,1)  !important;
    }
   .m-container .btn-teal:hover{
      background-color:rgba(0, 128, 64,0.6) !important;
    }
    .m-container .btn-success{
      background-color: rgba(52, 108, 233,1) !important;
    }
     .m-container .btn-success:hover{
      background-color: rgba(52, 108, 233,0.6) !important;
    }
    .m-container .btn-info{
      background-color:rgba(119, 119, 119,1) !important;
    }
    .m-container .btn-info:hover{
       background-color:rgba(119, 119, 119,0.6) !important;
    }
    .m-container .btn-danger{
      background-color:rgba(255, 0, 0,1) !important;
    }
     .m-container .btn-danger:hover{
      background-color:rgba(255, 0, 0,0.6) !important;
    }
    .game-live-item i,.host-name {
        cursor:pointer;
    }
    .game-live-item .txt i:hover,.host-name:hover {
        color:rgb(255, 135, 0);
    }
      `)
        }
    )();
}

// 斗鱼直播插件
function douyuPlugin()
{
    (function () 
     {
        'use strict';
        // key
        const key = 'douyuzhibo'
        const bg_key = 'douyuzhibo_bg'
        // 是否显示背景key
        const bg_show_key = 'douyuzhibo_show'
        // 是否显示菜单
        const menu_show_key= 'douyuzhibo_menu_show_key'

        //延迟时间
        const time = 2000
        // 匹配地址

        // 直播源
        const baseUrl = "https://www.douyu.com/"
        // 默认背景图
        const defaultBackgroundImage='https://sta-op.douyucdn.cn/dylamr/2022/11/07/1e10382d9a430b4a04245e5427e892c8.jpg'
        // 存放屏蔽主播信息
        let users = []
        let inputValue = null

        /*************容器*********/
        let html = null
        let body = null
        let tbody = null
        let m_container = null
        window.onload = () => {
            // 加载之前判断直播间是需要否删除
            removeRoom()
            // 斗鱼直播存在第一时间页面内容DOM结构更新延迟
            setTimeout(()=>{
                try{
                    console.log(
                        ' %c 欢迎使用斗鱼直播插件,下载地址 %c '
                        .concat('https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD', ''), 'background: rgb(255, 93, 35); padding: 1px; border-radius: 3px 0 0 3px; color: #fff', 'border-radius: 0 3px 3px 0; color: #fff')
                    console.log(
                        '%c源码地址:%c '
                        .concat('https://github.com/wuxin0011/huya-live', ''), 'background: rgb(255, 93, 35); padding: 1px; border-radius: 3px 0 0 3px; color: #fff', 'border-radius: 0 3px 3px 0; color: #fff')
                    html = document.querySelector('html')
                    body = document.querySelector('body')
                    // 初始化房间号
                    users = getLocalStore()
                    // 是否屏蔽直播间
                    if (!removeRoom()) {
                        // 添加容器
                        create_container()
                        // 移除 其他轮播图，导航栏等
                        removeWall()
                    }
                    indexHome();
                }catch(e){
                    console.error(e)
                }

            },time)
        }

        // 定义主播类
        class HostUser{
            constructor(id,name){
                this.id = id;
                this.name = name;
            }
        }

        const create_container = () => {
            // 初始化房间号
            users = getLocalStore()
            let show1 = isSelect(bg_show_key)
            let show2 = isSelect(menu_show_key)
            m_container = s2d(`
                    <div class="m-container">
                    <div class="operation">
                         <input type="text" placeholder="房间号...">
                          <button class="btn btn-success search-room">搜索</button>
                          <button class="btn btn-teal add-room">添加</button>
                          <button class="btn btn-info flush-room">刷新</button>
                          <button class="btn btn-danger clear-room">清空</button>
                          <button class="btn btn-success bg-btn">上传</button>
                          <input type="checkbox" id="checkbox1" checked=${show1} class="checkbox"/>背景
                          <input type="checkbox" id="checkbox2" checked=${show2} class="checkbox"/>菜单
                          <a class="m-link" href="https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD" target="_blank" title="更新、反馈">更新</a>
                      </div>
                     <table >
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
`)

            if (!body) {
                body = document.querySelector('body')
            }

            if(!body){
                return;
            }
            body.appendChild(m_container)
            tbody = document.querySelector('.m-container table tbody')
            inputValue = m_container.querySelector('.m-container .operation input')

            // 生成操作按钮
            operationDOMButton()
            // 添加直播房间号信息
            createRoomItem(users)
            // 右侧点击添加button
            createButton()
            if(inputValue){
                inputValue.addEventListener('keyup', function (e) {
                    if(e.key=='Enter'){
                        let arr = users.filter(item=>{
                            return item.id.indexOf(inputValue.value) !=-1 || item.name.indexOf(inputValue.value)!=-1
                        })
                        resetTbody(arr)
                    }
                })
            }
        }


        // 生成房间号item
        const createRoomItem = (arr) => {
            if(!Array.isArray(arr)){
                return;
            }
            arr.forEach((item, index) => {
                let tr = document.createElement('tr')
                tr.style.borderBottom = '1px solid rgba(0,0,0,0.4)'
                tr.style.margin = '10px 0'
                tr.style.padding = '20px 10px'
                tr.innerHTML =
                    `<td style="padding:10px;">${index+1}</td>
                 <td style="padding:10px;">${item.name}</td>
                 <td style="padding:10px;">${item.id}</td>
                 <td style="padding:10px;">
                 <button class="btn btn-danger" room-id="${item.id}">删除</button></td>`
                tbody.appendChild(tr)
                // 添加删除事件
                const deleteBtn = tr.querySelector('button')
                deleteBtn.addEventListener('click', function (e) {
                    const id = e.target.getAttribute('room-id')
                    removeDOM(tr)
                    userDelete(id)
                    // 如果是当前主播，需要刷新
                    if(getRoomIdByUrl(window.location.href) == id){
                        window.location.reload()
                    }
                })

            })
        }


        // 生成字符串dom
        const s2d = (string) => {
            return new DOMParser().parseFromString(string, 'text/html').body.childNodes[0]
        }


        const resetTbody = (arr) => {
            // 删除原来dom
            let table = document.querySelector('body .m-container table')
            removeDOM(tbody)
            tbody = document.createElement('tbody')
            let thead = document.createElement('thead')
            let room_index = document.createElement('th')
            let room_name = document.createElement('th')
            let room_id = document.createElement('th')
            let room_operation = document.createElement('th')
            thead.appendChild(room_index)
            thead.appendChild(room_name)
            thead.appendChild(room_id)
            thead.appendChild(room_operation)
            table.appendChild(tbody)
            // 添加操作窗口
            createRoomItem(arr)

        }

        const operationDOMButton = ()=>{

            // 添加
            const addRoomBtn = document.querySelector('.m-container .operation  button.add-room')
            addRoomBtn.addEventListener('click', function () {
                const keywords = inputValue.value.trim()
                if (!keywords) {
                    return alert('请输入房间号！')
                }
                if (!userIsExist(keywords)) {
                    const hostName = document.querySelector('.Title-blockInline .Title-anchorName h2')
                    if(!hostName){
                        // index
                        let rooms = document.querySelectorAll('.layout-List-item')
                        if(rooms && rooms.length>0){
                            for(let room of rooms){
                                const id = getRoomIdByUrl(room.querySelector('a').href)
                                const user = room.querySelector('.DyCover-user')
                                if( id==keywords){
                                    hostName = user
                                }
                            }
                        }
                        // other
                        if(!hostName){
                            rooms = document.querySelectorAll('.layout-Cover-item')
                            if(rooms && rooms.length>0){
                                for(let room of rooms){
                                    const id = getRoomIdByUrl(room.querySelector('a').href)
                                    const user = room.querySelector('.DyListCover-userName')
                                    if( id == keywords){
                                        hostName = user
                                    }
                                }
                            }
                        }


                    }
                    const name = hostName && hostName.textContent?hostName.textContent:''
                    if(name){
                        addUser(keywords,hostName.textContent)

                        inputValue.value = ''
                    }else{
                        if(confirm(`房间号为${keywords}的主播不存在！确定添加？`)){
                            addUser(keywords,keywords)
                            inputValue.value = ''
                        }
                    }

                } else {
                    alert('该主播已添加！')
                }
            })


            // 刷新
            const flushRoomBtn = document.querySelector('.m-container button.flush-room')
            flushRoomBtn.addEventListener('click', function () {
                users = getLocalStore()
                resetTbody(users)
            })

            // 搜索
            const searchRoomBtn = document.querySelector('body .m-container .operation .search-room')
            searchRoomBtn.addEventListener('click', function () {
                let arr = users.filter(item=>{
                    return item.id.indexOf(inputValue.value) !=-1 || item.name.indexOf(inputValue.value)!=-1
                })
                resetTbody(arr)
            })

            // 清空
            const clearRoomBtn = document.querySelector('.m-container button.clear-room')
            clearRoomBtn.addEventListener('click', function () {
                if(confirm('确认清空？')){
                    users = addLocalStore([])
                    resetTbody(users)
                }
            })

            // 设置背景
            const bgBtn = document.querySelector('.m-container button.bg-btn')
            bgBtn.addEventListener('click', function () {
                let result = prompt('请输入背景图地址')
                if(!result){
                    return;
                }
                if(!isImageUrl(result)){
                    return alert('请输入一个图片地址');
                }

                fetch(result)
                    .then(res=>{
                    if(res && res.status && res.status == 200 ){
                        window.localStorage.setItem(bg_key,result)
                        settingBackgroundImage(result)
                    }else{
                        alert('图片资源访问失败，可能存在跨域问题，请更换一张地址!')
                    }})
                    .catch(e=>{
                    alert('图片资源访问失败，可能存在跨域问题，请更换一张地址!')
                })

            })

            // 选择背景
            const checkbox = document.querySelector('.m-container #checkbox1')
            checkbox.addEventListener('change', function (e) {
                window.localStorage.setItem(bg_show_key,e.target.checked)
                settingBackgroundImage()
            })

            // 是否关闭菜单
            const menu = document.querySelector('.m-container #checkbox2')
            menu.addEventListener('change', function (e) {
                const d = document.querySelector('#js-aside')
                if(d){
                    if(e.target.checked){
                        d.style.display = 'block';
                    }else{
                        d.style.display = 'none'
                    }
                    window.localStorage.setItem(menu_show_key,e.target.checked)
                }
                // console.log(isSelect(menu_show_key))

            })


        }

        const removeWall = () => {

            // 移除导航栏中游戏，视频等菜单链接
            const headerLink = document.querySelectorAll('.Header-menu-link')
            if(headerLink && headerLink.length>3){
                removeDOM(headerLink[headerLink.length-1])
                removeDOM(headerLink[headerLink.length-2])
                removeDOM(headerLink[headerLink.length-3])
            }

            // 屏蔽轮播图
            removeElement('.layout-Customize')
            //右侧广告
            removeElement('#js-room-activity')
            // 右侧导航指南
            removeElement('#js-right-nav')
            //底部信息
            removeElement('#js-bottom')
            //分类页面菜单信息
            const d = document.querySelector('#js-aside')
            let d_show = isSelect(menu_show_key)
            if(d){
                if(d_show){
                    d.style.display = 'block';
                }else{
                    d.style.display = 'none';
                }
            }

            // 左侧游戏链接
            const navs = document.querySelectorAll('.Aside-container .Aside-nav .Aside-nav-item')
            if(navs){
                for(let nav of navs){
                    let nav_href = nav.href
                    if( nav_href == 'https://wan.douyu.com/' || nav_href == 'https://cloudgame.douyu.com/'){
                        removeDOM(nav)
                    }
                }
            }

            // 匹配只有在播放直播间才会生效
            if(new RegExp(/^https:.*.douyu\.com(\/((.*rid=\d+)|(\d+)))$/).test(window.location.href)){

                addRemoveBtn(window.document)

                // 删除直播间背景图
                const divs = document.querySelectorAll('#root div')
                if(divs){
                    for(let d of divs){
                        // 正则查找所有不包含video的背景 div标签
                        if(d && d.id && new RegExp(/^bc.*$/g).test(d.id)){
                            console.log('element',d)
                            if(d.querySelector('video')){
                                //to do
                            }else{
                                removeDOM(d)

                            }
                        }
                    }
                }

                // 删除根标签下非video的标签
                const divs2 = document.querySelectorAll('#root div.wm-general')
                if(divs2){
                    for(let d of divs2){
                        if(d.querySelector('video')){
                            //to do
                        }else{
                            removeDOM(d)

                        }

                    }
                }

                const player = document.querySelector('#root div.layout-Main')
                player.style.marginTop='70px';
                // 移除直播间提示登录
                removeElement('.multiBitRate-da4b60')
                //礼物
                removeElement('#js-player-toolbar')

            }
            // 设置背景图
            settingBackgroundImage()

            // 分类页面 https://www.douyu.com/directory
            if(new RegExp(/https:\/\/www.douyu.com(\/((directory.*)|(g_.*)))$/).test(window.location.href)){
                // 直播间列表
                addRoomClick()
                const labels = document.querySelectorAll('.layout-Module-filter .layout-Module-label')
                if(labels){
                    for(let label of labels){
                        if(label){
                            label.addEventListener('click',(e)=>{
                                e.preventDefault()
                                // 获取当前地址
                                let to_link = label && label.href? label.href:null
                                if(to_link){
                                    window.location.href = to_link
                                }else{
                                    // 获取全部地址
                                    var result = 'https://www.douyu.com/g_'+window.location.href.match(RegExp(/subCate\/.*/g))[0].replace('subCate','').match(new RegExp(/\w+/g))[0]
                                    window.location.href = result
                                }

                            })

                        }

                    }
                }
            }


        }

        const addRoomClick = ()=>{
            const rooms = document.querySelectorAll('.layout-Cover-item')
            if(rooms){
                for( let li of rooms){
                    try{
                        if(li){
                            const link = li.querySelector('a.DyListCover-wrap')
                            if(link){
                                link.addEventListener('click',(e)=>{
                                    e.preventDefault()
                                })
                                const url =link.href
                                const user = link.querySelector('div.DyListCover-userName')
                                const name = user.textContent || ''

                                // 判断该直播间列表窗口是否需要删除
                                if(isRemove(url) || userIsExist(name)){
                                    removeDOM(li)
                                }else{

                                    // 删除直播间多余标签
                                    removeDOM(link.querySelector('.HeaderCell-label-wrap.is-od'))
                                    removeDOM(link.querySelector('.HeaderCell-label-wrap.is-live-empty'))
                                    removeDOM(link.querySelector('.HeaderCell-label-wrap'))
                                    user.addEventListener('click',(e)=>{
                                        if(confirm(`确认禁用 ${name}？`)){
                                            const id = getRoomIdByUrl(url);
                                            addUser(id,name);
                                            removeDOM(li);
                                        }
                                        e.preventDefault()
                                    })

                                    // 监听鼠标移入事件
                                    li.addEventListener('mouseenter',(e)=>{
                                        e.preventDefault()
                                        const a = e.target.querySelector('a.DyListCover-wrap.is-hover')
                                        if(a){

                                            const url =a.href
                                            const user = a.querySelector('.DyListCover-userName')
                                            const name = user.textContent || ''
                                            // 删除直播间多余标签
                                            removeDOM(a.querySelector('.HeaderCell-label-wrap.is-od'))
                                            removeDOM(a.querySelector('.HeaderCell-label-wrap.is-live-empty'))
                                            removeDOM(a.querySelector('.HeaderCell-label-wrap'))
                                            // 添加点击事件
                                            user.addEventListener('click',(a)=>{
                                                a.preventDefault()
                                                if(confirm(`确认禁用 ${name}？`)){
                                                    const id = getRoomIdByUrl(url);
                                                    addUser(id,name);
                                                    removeDOM(li);
                                                }

                                            })
                                            a.addEventListener('click',(t)=>{
                                                t.preventDefault()
                                            })

                                        }


                                    })
                                }

                            }
                        }

                    }catch(e){}
                }
            }
        }


        const removeRoom = () => {
            if (!isRemove( window.location.href)) {
                return false
            }
            removeRoomClick();
            return true
        }

        const removeRoomClick = () => {

            // 直播房间
            const room = document.querySelector('.layout-Player-main')
            if(!room){
                return;
            }

            // 直播源
            var videos = null
            // 循环处理直播源,防止直播源更新！
            if(isRemove(window.location.href)){
                videos = document.querySelectorAll('video')
                if(videos){
                    for(let v of videos){
                        if(v && v.paused){
                            v.pause()
                        }
                        removeDOM(v)
                    }

                }
                setInterval(()=>{
                    videos = document.querySelectorAll('video')
                    if(videos){

                        try{
                            for(let v of videos){
                                if(v && v.paused){
                                    v.pause()
                                }
                                removeDOM(v)
                            }
                        }catch(e){ }

                    }
                },3000);
            }


            // 删除直播源和直播间
            removeDOM(room)
            // 删除页面内容
            removeDOM(body)

            const h2 = document.createElement('h2')
            body = document.createElement('body')

            body.style.display = 'flex'
            body.style.justifyContent = 'center'
            body.style.alignItems = 'center'

            h2.textContent = '该主播已被你屏蔽！'
            h2.style.fontSize = '50px'

            document.querySelector('title').textContent = '该主播已被你屏蔽！'


            html.appendChild(body)
            body.appendChild(h2)

            const core_container = document.querySelector('.m-container')
            removeDOM(core_container)

            // 创建操作面板
            create_container()
        }


        // 该链接是否应该被移除
        const isRemove = (href) => {
            return userIsExist(getRoomIdByUrl(href));
        }

        // 通过房间地址获取房间号
        const getRoomIdByUrl = (url) => {
            try{
                if(new RegExp(/https:\/\/.*(rid=.*)$/).test(window.location.href)){
                    return window.location.href.match(new RegExp(/rid=.*/g))[0].replace('rid=','')
                }
                let arr = url.split('/')
                let roomId = arr[arr.length - 1]
                return roomId
            }catch(e){
                return null
            }

        }


        // 添加右侧按钮
        const createButton = () => {
            if(!body){
                return;
            }
            const btn = document.createElement('button')
            btn.style.cursor = 'pointer'
            btn.style.position = 'fixed'
            btn.style.top = '300px'
            btn.style.right = '0px'
            btn.style.padding = '5px 10px'
            btn.style.backgroundColor = 'rgb(255, 93, 35)'
            btn.style.border = 'none'
            btn.style.borderRadius = '20px'
            btn.style.fontSize = '12px'
            btn.style.color = '#fff'
            btn.style.zIndex = 100000
            btn.textContent = '小鱼丸'
            btn.addEventListener('click', function (e) {
                if (m_container.style.display === 'block') {
                    m_container.style.display = 'none'
                } else {
                    m_container.style.display = 'block'
                }
            })
            btn.addEventListener('mouseenter', function () {
                btn.style.backgroundColor = 'rgba(255, 93, 35,0.6)'
            })
            btn.addEventListener('mouseleave', function () {
                btn.style.backgroundColor = 'rgba(255, 93, 35,1)'
            })
            body.appendChild(btn)

        }

        // 删除元素
        const removeDOM = (element) => {
            try {
                if(element){
                    element.style.display = 'none'
                    element.remove()
                }

            } catch (e) {}// 防止element没有remove方法而抛出异常
        }
        const removeElement = (selector) => {
            removeDOM(window.document.querySelector(selector))
        }

        // 添加到本地
        const addLocalStore = (obj) => {
            // 本地获取
            window.localStorage.setItem(key, JSON.stringify(obj))
            // 保存首次加载能够移除直播间
            //removeRoom()
        }


        // 设置背景图
        const settingBackgroundImage = (url) => {
            url = getImageUrl(url)
            const body1 = document.querySelector('body')
            if(isSelect(bg_show_key)){
                body1.style.backgroundSize="cover"
                body1.style.backgroundRepeat='no-repeat'
                body1.style.backgroundAttachment='fixed'
                body1.style.backgroundImage=`url(${url})`
             }else{
                 body1.style.backgroundImage='none'
             }

        }

        // 获取图片地址
        const getImageUrl = (url) => {
            return isImageUrl(url)?url:(isImageUrl(window.localStorage.getItem(bg_key))?window.localStorage.getItem(bg_key):defaultBackgroundImage);
        }

        // 是否是一张图片地址
        const isImageUrl = (url) => {
            return bg_regx.test(url)
        }

        const userIsExist = (keywords,list = users)=>{
            keywords = keywords.trim()
            for(let i = 0; i < list.length; i++){
                if( (list[i].name &&list[i].name == keywords) || (list[i].id &&list[i].id == keywords)){
                    return true
                }
            }
            return false
        }


        const userDelete = (keywords)=>{
            users.forEach((item,index)=>{
                if( keywords == item.name || keywords == item.id){
                    users.splice(index,1)
                }
            })
            addLocalStore(users)
        }

        const addUser = (id,name)=>{
            if (userIsExist(id)||userIsExist(name)) {
                alert('该房间已存在！')
                return;
            }
            const newUser = new HostUser(id,name);
            // 添加
            users.unshift(newUser)
            // 保存到本地
            addLocalStore(users)
            // users = getLocalStore()
            resetTbody(users)
            // 如果是当前主播需要屏蔽
            if(id == getRoomIdByUrl(window.location.href)){
                removeRoomClick();
            }

        }


        // 从本地获取存储信息
        const getLocalStore = () => {
            const obj = JSON.parse(window.localStorage.getItem(key))
            return Array.isArray(obj) ? obj : []
        }

        // 从本地获取缓存key 是否选择
        const isSelect = (k)=>{
            let show = window.localStorage.getItem(k)
            return (show == 'true' || show == true )?true:false;
        }


        const addRemoveBtn = ( element = window.document)=>{
            // 直播源
            if(element){
                const hostName = element.querySelector('.Title-roomInfo h2.Title-anchorNameH2')
                if(hostName){
                    hostName.onclick = ()=>{
                        if(confirm(`确认禁用 ${hostName.textContent}？`)){
                            addUser(getRoomIdByUrl(window.location.href), hostName.textContent)
                        }

                    }
                }
            }


        }


        const indexAddClick = (list)=>{
            const rooms = document.querySelectorAll('.layout-Wrapper.layout-Module.RoomList .layout-List-item')
            if(rooms){
                for( let li of rooms){
                    try{
                        // 获取单个主播间房间地址
                        const a = li.querySelector('a')
                        if(a){
                            a.onclick = (e)=>{e.preventDefault()}
                            const url = a.href
                            const user = li.querySelector('.DyCover-user')
                            const name = user.textContent || ''
                            if(user && (!userIsExist(name,list) || !userIsExist(url,list))){
                                // 添加记录,下次不再添加！！！
                                list.unshift(new HostUser(url,name))
                                user.addEventListener('click',()=>{
                                    if(confirm(`确认禁用 ${name}`)){
                                        addUser(getRoomIdByUrl(url),name);
                                        removeDOM(li);
                                    }
                                },true)
                                //console.log(new HostUser(url,name))
                            }

                            if( isRemove(url) || userIsExist(name)){
                                removeDOM(li)
                            }

                        }

                    }catch(e){}

                }
            }
        }


        const indexHome = ()=>{
            // 直播源
            if( window.location.href == baseUrl ){
                window.scroll(0,0)
                // 移除首页直播间
                try{
                    const videoBox = document.querySelector('.layout-Slide-player')
                    const video = videoBox.querySelector('video')
                    if (video&&video.paused) {
                        video.pause()
                    }
                    removeDOM(video)
                    removeDOM(videoBox)
                }catch(e){

                }
   
                setInterval(()=>{
                    // 移除首页直播间
                    try{
                        const videoBox = document.querySelector('.layout-Slide-player')
                        const video = videoBox.querySelector('video')
                        if (video&&video.paused) {
                            video.pause()
                        }
                        removeDOM(video)
                        removeDOM(videoBox)
                    }catch(e){

                    }

                },10000)


                removeElement('.layout-Slide-bannerInner')
                // 分类
                removeElement('#lazyModule3')
                // 推荐活动
                removeElement('#lazyModule4')
                // 精彩推荐
                removeElement('#lazyModule5')
                // 热门分类
                removeElement('#lazyModule6')
                // 精彩活动
                removeElement('#lazyModule7')
                // 官方活动
                removeElement('#lazyModule23')
                removeElement('#lazyModule24')

                // 初始化默认高度，默认浏览器可视化高度
                let init = window.innerHeight;
                // 初始化容器存放用户
                let init_users = []
                // 页面加载完毕
                setTimeout(()=>{ indexAddClick(init_users)},time)
                window.addEventListener('scroll',(e)=>{
                    // 超过可视化高度，需要重新加载
                    if(window.pageYOffset>init){
                        init = init + 300;
                        // 重新扫描点击事件
                        indexAddClick(init_users)
                    }

                })

            }

        }

        // 样式部分
        GM_addStyle(`
 .m-container {
      box-sizing: border-box;
      position: fixed;
      display: none;
      width: 550px;
      height: 400px;
      top: 100px;
      left: 50%;
      border-radius: 0;
      overflow: hidden scroll;
      background-color: white;
      transform: translateX(-50%);
      z-index:1000;
      transition: display linear 1s;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2),
      -2px -2px 2px rgba(0, 0, 0, 0.2);
    }
    .m-container .operation {
      box-sizing: border-box;
      height: 80px;
      padding: 20px 0 0 0;
      text-align: center;
    }
     .m-container .operation input[type="text"] {
      width:100px;
      box-sizing: border-box;
      outline: none;
      border: 1px solid teal;
      padding: 5px;
    }
    .m-container .operation input[type="text"]:focus {
      border: 2px solid teal;
    }

    .m-container .operation input[type="checkbox"] {
      display:inline;
    }

    .m-container table {
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      padding: 10px;
      text-align: left !important;
      margin: 0 auto;
      max-height:200px;
      width: 90%;
    }
    .m-container  table tbody {
      max-height: 250px;
      text-align: left !important;
    }
    .m-container table thead{
      border-top: 1px solid rgba(0,0,0,0.4);
      border-bottom: 1px solid rgba(0,0,0,0.4);
      text-align: left !important;
      padding: 10px;
    }
    .m-container table th, m-container table td {
      padding: 10px;
    }
    .m-container table tr {
      border-bottom: 1px solid rgba(0,0,0,0.4);
      margin:5px 0;
    }
    .m-container .m-link,.m-container .m-link:visited{
       color:blnk !important;
    }

    .m-container .m-link:hover{
       color:blue !important;
       text-decoration:underline !important;
    }
    .m-container .btn {
      cursor: pointer !important;
      padding: 5px 7px !important;
      border: none !important;
      color: #fff !important;
      font-size:10px !important;
      border-radius:20px !important;
      max-width:50px  !important;
      margin:0 0 !important;;
      z-index:1000 !important;
    }

    .m-container .btn-teal{
      background-color:rgba(0, 128, 64,1)  !important;
    }
   .m-container .btn-teal:hover{
      background-color:rgba(0, 128, 64,0.6) !important;
    }
    .m-container .btn-success{
      background-color: rgba(52, 108, 233,1) !important;
    }
     .m-container .btn-success:hover{
      background-color: rgba(52, 108, 233,0.6) !important;
    }
    .m-container .btn-info{
      background-color:rgba(119, 119, 119,1) !important;
    }
    .m-container .btn-info:hover{
       background-color:rgba(119, 119, 119,0.6) !important;
    }
    .m-container .btn-danger{
      background-color:rgba(255, 0, 0,1) !important;
    }
     .m-container .btn-danger:hover{
      background-color:rgba(255, 0, 0,0.6) !important;
    }
    .layout-List-item .DyCover-content .DyCover-user,.layout-Cover-item .DyListCover-userName,.Title-blockInline .Title-anchorName h2{
        cursor:pointer !important;
    }
    .layout-List-item .DyCover-content .DyCover-user:hover,.layout-Cover-item .DyListCover-userName:hover,.Title-blockInline .Title-anchorName h2:hover {
        color:rgb(255, 135, 0) !important;
      `)
    })();
}



if(huya_address_pattern.test(local_url) || local_url == 'https://www.huya.com'){// 虎牙直播
    huyaPlugin()
}else if(doyu_address_pattern.test(local_url) || local_url == 'https://www.douyu.com'){ // 斗鱼直播
    douyuPlugin()
}else{

}

