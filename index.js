
// ==UserScript==
// @name         虎牙直播
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  屏蔽、禁用不想看到主播直播间!
// @author       wuxin001
// @match        https://www.huya.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';
    // key
    const key = 'huyazhibo'
    // 直播源
    const baseUrl = "https://www.huya.com/"
    // 存放屏蔽主播信息
    let users = []
    // 添加
    let addRoomBtn = null
    // 刷新
    let flushRoomBtn = null
    // 搜索
    let searchRoomBtn = null
    // 清空btn
    let clearRoomBtn = null
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
            // 添加移除事件
            indexAddRemoveBtn()
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
        m_container = s2d(`
                    <div class="m-container">
                    <div class="operation">
                         <input type="text" placeholder="房间号...">
                          <button class="btn btn-success search-room">搜索</button>
                          <button class="btn btn-teal add-room">添加</button>
                          <button class="btn btn-info flush-room">刷新</button>
                          <button class="btn btn-danger clear-room">清空</button>
                          <a class="m-link" href="https://greasyfork.org/zh-CN/scripts/449261-%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD" target="_blank">更新</a>
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
        searchDOM()
        // 刷新
        flushDOM()
        // 添加
        addDOM()
        // 清除
        clearDOM()
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
            })

        })
    }


    // 生成字符串dom
    const s2d = (string) => {
        return new DOMParser().parseFromString(string, 'text/html').body.childNodes[0]
    }

    // 搜索btn
    const searchDOM = () => {
        searchRoomBtn = document.querySelector('body .m-container .operation .search-room')
        searchRoomBtn.addEventListener('click', function () {
            let arr = users.filter(item=>{
                return item.id.indexOf(inputValue.value) !=-1 || item.name.indexOf(inputValue.value)!=-1
            })
            resetTbody(arr)
        })

    }

    // 添加btn
    const addDOM = () => {
        addRoomBtn = document.querySelector('.m-container .operation  button.add-room')
        addRoomBtn.addEventListener('click', function () {
            const keywords = inputValue.value.trim()
            if (!keywords) {
                return alert('请输入房间号！')
            }
            if (!userIsExist(keywords)) {
                const hostName = document.querySelector('.host-name')
                if(!hostName){
                    const rooms = document.querySelectorAll('.game-live-item')
                    if(Array.isArray(rooms)){
                        for(let room of rooms){
                            const id = getRoomIdByUrl(room.querySelector('a').href)
                            const user = room.querySelector('.txt i')
                            if( id  ===  keywords){
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
    }

    // 刷新btn
    const flushDOM = () => {
        flushRoomBtn = document.querySelector('.m-container button.flush-room')
        flushRoomBtn.addEventListener('click', function () {
            users = getLocalStore()
            resetTbody(users)
        })
    }

    // 清空btn
    const clearDOM = () => {
        clearRoomBtn = document.querySelector('.m-container button.clear-room')
        clearRoomBtn.addEventListener('click', function () {
            if(confirm('确认清空？')){
                users = addLocalStore([])
                resetTbody(users)
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
        const ads = document.querySelector('.list-adx')
        removeDOM(ads)

        // 移除直播通知内容
        const notice = document.querySelector('.liveList-header-r')
        removeDOM(notice)

        // 屏蔽左侧导航栏
        const tabbar = document.querySelector('.helperbar-root--12hgWk_4zOxrdJ73vtf1YI')
        removeDOM(tabbar)

        // 删除主播直播间底部信息
        const footer = document.querySelector('.room-footer')
        removeDOM(footer)

        // 删除礼物 排行
        const gift_row = document.getElementById('J_roomSideHd')
        removeDOM(gift_row)

        // 删除直播间礼物窗口
        const gift = document.querySelector('#player-gift-wrap')
        removeDOM(gift)

        // 直播间左侧礼物排行1
        const matchComponent = document.querySelector('#match-cms-content')
        removeDOM(matchComponent)

        // 直播间左侧礼物排行2
        const matchComponent2 = document.querySelector('#matchComponent2')
        removeDOM(matchComponent2)

        // 删除礼物活动
        const root = document.getElementById('root')
        //removeDOM(root)

        // 导航栏 游戏广告连接
        const game = document.querySelector('.hy-nav-item.hy-nav-item-game')
        removeDOM(game)

        // 移除直播间窗口
        const lis = document.querySelectorAll('.live-list.clearfix li')
        for(const li of lis){
            const href = getRoomIdByUrl(li.querySelector('a').href)
            if (isRemove(href)) {
                removeDOM(li)
            }

            /**
            else{
                // 获取单个主播间房间地址
                const url = li.querySelector('a').href
                // 获取房间i
                const user = li.querySelector('.txt i')
                const name = user.textContent || ''
                // 添加点击事件
                li.addEventListener('click',()=>{
                    if(confirm(`确认禁用 ${name}？`)){
                        const id = getRoomIdByUrl(url);
                        addUser(id,name);
                        removeDOM(li);
                    }
                })

            }
            */
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
        // 直播房间
        const room = body.querySelector('.room-core')
        if(!room){
            return;
        }
        // 直播源
        const video = room.querySelector('video')
        if(!video){
            return;
        }
        // 点击播放按钮
        const videoBtn = room.querySelector('.player-play-btn')
        try{
            let ev = new Event("click", {"bubbles":true, "cancelable":false});
            // 自动触发点击暂停事件 停止播放
            videoBtn.dispatchEvent(ev)
        }catch(e){
            // 如果失败 操作video源
            if (video&&video.paused) {
                // 暂停播放
                video.pause()
            }
        }finally{
            // 删除直播源
            removeDOM(video)
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
            element.style.display = 'none'
            // 防止element没有remove方法
            element.remove()
        } catch (e) {}
    }

    // 添加到本地
    const addLocalStore = (obj) => {
        // 本地获取
        window.localStorage.setItem(key, JSON.stringify(obj))
        // 保存首次加载能够移除直播间
        removeRoom()
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
            alert('该房间已存在！')
            return;
        }
        const newUser = new HostUser(id,name);
        // 添加
        users.push(newUser)
        // 保存到本地
        addLocalStore(users)
        // users = getLocalStore()
        resetTbody(users)

    }


    // 从本地获取存储信息
    const getLocalStore = () => {
        const obj = JSON.parse(window.localStorage.getItem(key))
        return Array.isArray(obj) ? obj : []
    }

    // https://www.huya.com/g/xxxx
    const indexAddRemoveBtn = ()=>{
        // 获取所有主播间
        const rooms = document.querySelectorAll('.game-live-item')
        if(!rooms){
            return;
        }
        for( let li of rooms){
            try{
               // 获取单个主播间房间地址
                const url = li.querySelector('a').href
                // 获取房间i
                const user = li.querySelector('.txt i')
                const name = user.textContent || ''
                // 添加点击事件
                li.addEventListener('click',()=>{
                    if(confirm(`确认禁用 ${name}？`)){
                        const id = getRoomIdByUrl(url);
                        addUser(id,name);
                        removeDOM(li);
                    }
                })
            }catch(e){console.error(e)}

        }
    }

    const addRemoveBtn = ()=>{
        // 直播源
        const hostName = document.querySelector('.host-name')
        if(hostName){
            hostName.addEventListener('click',()=>{
                if(confirm(`确认禁用 ${hostName.textContent}？`)){
                    removeRoomClick()
                    addUser(getRoomIdByUrl(hostName.baseURI), hostName.textContent)
                }
            })

        }

    }


    const indexHome = ()=>{
        // 直播源
        const url = window.location.href
        if( url == baseUrl ){
            const bd = document.querySelector('.mod-index-main .main-bd')
            const hd = document.querySelector('.mod-index-main .main-hd')
            const video = document.querySelector('.mod-index-main video')
            try{
                if (video&&video.paused) {
                    video.pause()
                }
            }catch(e){

            }finally{
                removeDOM(video)
            }

            // huya-icon
            const huya = document.querySelector('.helperbar-root--12hgWk_4zOxrdJ73vtf1YI')
            // type
            const type = document.querySelector('.mod-game-type')
            // actlist
            const actlist = document.querySelector('.mod-actlist')
            // livebox
            const liveBox = document.querySelector('.mod-index-list .live-box')
            // news
            const news = document.querySelector('.mod-news-section')
            // recommend
            const recommend = document.querySelector('.recommend-wrap')
            // recommendbg
            const recommendBg = document.querySelector('.mod-index-recommend')

            // banner
            const banner_close = document.querySelector('.mod-index-wrap #banner i')
            if(banner_close){
                banner_close.click();
            }

            //remove
            removeDOM(hd)
            removeDOM(bd)
            removeDOM(huya)
            removeDOM(type)
            removeDOM(actlist)
            removeDOM(liveBox)
            removeDOM(news)
            removeDOM(recommend)
            removeDOM(recommendBg)
            // main
            const main = document.querySelector('.mod-index-main')
            removeDOM(main)

            // banner
            const banner = document.querySelector('#banner')
            removeDOM(banner)

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
      width: 500px;
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
    .m-container .operation input {
      width:40%;
      box-sizing: border-box;
      outline: none;
      border: 1px solid teal;
      padding: 5px;
    }
    .m-container .operation input:focus {
      border: 2px solid teal;
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
      cursor: pointer;
      padding: 5px 10px;
      border: none;
      color: #fff;
      font-size:12px;
      border-radius:20px;
      z-index:1000;
    }

    .m-container .btn-teal{
      background-color:rgba(0, 128, 64,1);
    }
   .m-container .btn-teal:hover{
      background-color:rgba(0, 128, 64,0.6);
    }
    .m-container .btn-success{
      background-color: rgba(52, 108, 233,1);
    }
     .m-container .btn-success:hover{
      background-color: rgba(52, 108, 233,0.6);
    }
    .m-container .btn-info{
      background-color:rgba(119, 119, 119,1);
    }
    .m-container .btn-info:hover{
       background-color:rgba(119, 119, 119,0.6);
    }
    .m-container .btn-danger{
      background-color:rgba(255, 0, 0,1);
    }
     .m-container .btn-danger:hover{
      background-color:rgba(255, 0, 0,0.6);
    }
    .game-live-item i,.host-name {
        cursor:pointer;
    }
    .game-live-item .txt i:hover,.host-name:hover {
        color:rgb(255, 135, 0);
    }
      `)
})();