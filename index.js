
// ==UserScript==
// @name         虎牙直播
// @namespace    http://tampermonkey.net/
// @version      0.3
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
    // 存放屏蔽主播房间号
    let ids = []
    // 是否屏蔽录播广告
    const isRemoveWall = true
    // 是否屏蔽录左侧tabbar
    const isRemoveTabbar = true
    // 是否删除底部直播信息
    const isRemoveRoomFooter = true
    // 是否创建添加按钮
    const isCreateBtn = true
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

    //=========容器========
    let html = null
    let body = null
    let tbody = null
    let m_container = null
    window.onload = () => {
        html = document.querySelector('html')
        body = document.querySelector('body')
        // 初始化房间号
        ids = getLocalStore()
        // 直播将没有移除，移除直播连接
        if (!removeRoom()) {
            // 添加容器
            create_container()
            // 移除 其他轮播图，导航栏等
            removeWall()
        }

        indexAddRemoveBtn()


    }


    const create_container = () => {
        // 初始化房间号
        ids = getLocalStore()
        m_container = s2d(`
                    <div class="m-container">
                    <div class="operation">
                         <input type="text" placeholder="房间号...">
                          <button class="btn btn-success search-room">搜索</button>
                          <button class="btn btn-teal add-room">添加</button>
                          <button class="btn btn-info flush-room">刷新</button>
                          <button class="btn btn-danger clear-room">清空</button>
                      </div>
                     <table >
                          <thead>
                            <th>序号</th>
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
        body.appendChild(m_container)
        tbody = document.querySelector('.m-container table tbody')

        inputValue = m_container.querySelector('.m-container .operation input')

        // 搜索、刷新、添加
        searchDOM()
        flushDOM()
        addDOM()
        clearDOM()
        // 添加直播房间号信息
        createRoomItem(ids)
        // 添加操作button
        createButton()
    }


    // 生成房间号item
    const createRoomItem = (arr) => {
        try {
            arr.forEach((id, index) => {
                let tr = document.createElement('tr')
                tr.style.borderBottom = '1px solid rgba(0,0,0,0.4)'
                tr.style.margin = '10px 0'
                tr.style.padding = '20px 10px'
                tr.innerHTML = `<td style="padding:10px;">${index+1}</td><td style="padding:10px;">${id}</td> <td style="padding:10px;"><button class="btn btn-danger" room-id="${id}">删除</button></td>`
                tbody.appendChild(tr)

                // 添加删除事件
                const deleteBtn = tr.querySelector('button')
                deleteBtn.addEventListener('click', function (e) {
                    let t = e.target
                    const id = t.getAttribute('room-id')
                    if (id) {
                        removeDOM(tr)
                        ids.splice(ids.indexOf(id), 1)
                        addLocalStore(ids)
                    }
                })

            })
        } catch (e) {

        }

    }


    // 生成字符串dom
    const s2d = (string) => {
        return new DOMParser().parseFromString(string, 'text/html').body.childNodes[0]
    }

    // 搜索btn
    const searchDOM = () => {
        try {
            searchRoomBtn = document.querySelector('body .m-container .operation .search-room')
            searchRoomBtn.addEventListener('click', function () {
                var keywords = inputValue.value
                let arr = ids.filter(item => item.indexOf(keywords) !== -1)
                resetTbody(arr)

            })

        } catch (e) {}

    }

    // 添加btn
    const addDOM = () => {
        try {
            addRoomBtn = document.querySelector('.m-container .operation  button.add-room')
            addRoomBtn.addEventListener('click', function () {
                const c = inputValue.value
                if (!c) {
                    return alert('请输入房间号！')
                }
                if (ids.indexOf(c) === -1) {
                    ids.push(c)
                    addLocalStore(ids)
                    inputValue.value = ''
                    ids = getLocalStore()
                    resetTbody(ids)
                } else {
                    alert('该房间已存在！！！')
                }

            })

        } catch (e) {}

    }

    // 刷新btn
    const flushDOM = () => {
        try {
            flushRoomBtn = document.querySelector('.m-container button.flush-room')
            flushRoomBtn.addEventListener('click', function () {
                ids = getLocalStore()
                resetTbody(ids)
            })
        } catch (e) {}

    }

    // 清空btn
    const clearDOM = () => {
        try {
            clearRoomBtn = document.querySelector('.m-container button.clear-room')
            clearRoomBtn.addEventListener('click', function () {
                if(confirm('确认清空？')){
                    ids = addLocalStore([])
                    resetTbody(ids)
                }


            })
        } catch (e) {}

    }

    const resetTbody = (arr) => {
        try {
            // 删除原来dom
            let table = document.querySelector('body .m-container table')
            removeDOM(tbody)
            tbody = document.createElement('tbody')
            let thead = document.createElement('thead')
            let room_index = document.createElement('th')
            let room_id = document.createElement('th')
            let room_operation = document.createElement('th')
            thead.appendChild(room_index)
            thead.appendChild(room_id)
            thead.appendChild(room_operation)
            table.appendChild(tbody)
            // 添加操作窗口
            createRoomItem(arr)
        } catch (e) {}

    }


    const removeWall = () => {
        // 屏蔽轮播图
        if (isRemoveWall) {
            const ads = document.querySelector('.list-adx')
            removeDOM(ads)
        }


        const matchComponent = document.querySelector('#match-cms-content')
        removeDOM(matchComponent)
        const matchComponent2 = document.querySelector('#matchComponent2')
        removeDOM(matchComponent2)


        // 移除直播通知内容
        const notice = document.querySelector('.liveList-header-r')
        removeDOM(notice)

        // 屏蔽左侧导航栏
        if (isRemoveTabbar) {
            const tabbar = document.querySelector('.helperbar-root--12hgWk_4zOxrdJ73vtf1YI')
            removeDOM(tabbar)
        }

        // 删除主播直播间底部信息
        if (isRemoveRoomFooter) {
            const tabbar = document.querySelector('.room-footer')
            removeDOM(tabbar)
        }

        // 删除礼物 排行
        const gift_row = document.getElementById('J_roomSideHd')
        removeDOM(gift_row)

        // 删除直播间礼物窗口
        const gift = document.querySelector('#player-gift-wrap')
        removeDOM(gift)

        // 删除礼物活动
        const root = document.getElementById('root')
        //removeDOM(root)

        // 移除直播间窗口
        try {
            const lis = document.querySelectorAll('.live-list.clearfix li')
            for (let i = 0; i < lis.length; i++) {
                if (isRemove(lis[i].querySelector('a').href)) {
                    // 屏蔽直播间
                    removeDOM(lis[i])

                }
            }
        } catch (e) {}

    }


    const removeRoom = () => {
        const href = window.location.href
        if (!isRemove(href)) {
            return false
        }
        // 直播房间
        const room = body.querySelector('.room-core')
        // 直播源
        const video = room.querySelector('video')
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
        }


        // 删除直播间内容
        // 删除直播源
        removeDOM(video)
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

        const c = document.querySelector('.m-container')
        removeDOM(c)

        // 创建操作面板
        create_container()
        return true
    }


    // 该链接是否应该被移除
    const isRemove = (href) => {
        return ids.indexOf(getRoomIdByUrl(href)) !== -1
    }

    // 通过房间地址获取房间号
    const getRoomIdByUrl = (url) => {
        let arr = url.split('/')
        let roomId = arr[arr.length - 1]
        return roomId
    }


    // 添加右侧按钮
    const createButton = () => {
        if (!isCreateBtn) {
            return
        }
        const btn = document.createElement('button')
        btn.classList = 'btn btn-warning'
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
        body.appendChild(btn)

    }


    const removeDOM = (d) => {
        try {
            d.style.display = 'none'
            d.remove()
        } catch (e) {}
    }



    // 添加到本地
    const addLocalStore = (obj) => {
        window.localStorage.setItem(key, JSON.stringify(obj))
        // alert('添加成功')
        removeRoom()
    }

    // 从本地获取存储信息
    const getLocalStore = () => {
        const obj = JSON.parse(window.localStorage.getItem(key))
        return Array.isArray(obj) ? obj : []
    }

    // https://www.huya.com/g/xxxx
    const indexAddRemoveBtn = ()=>{

        try
        {
            // 获取所有主播间
            const rooms = document.querySelectorAll('.game-live-item')
            for( let room of rooms){
                // 获取单个主播间房间地址
                const url = room.querySelector('a').href
                // 获取房间i
                const user = room.querySelector('.txt i')
                const name = user.textContent || ''
                // 添加点击事件
                user.addEventListener('click',()=>{
                    if(confirm(`确认禁用 ${name}？`)){
                        const roomId = getRoomIdByUrl(url);
                        if (ids.indexOf(roomId) === -1) {
                            ids.push(roomId)
                            addLocalStore(ids)
                            ids = getLocalStore()
                            resetTbody(ids)
                            // 移除直播间
                            removeDOM(room);
                        }
                        else {
                            alert('该房间已存在！！！')
                        }

                    }
                })

            }

        }catch(e){console.error(e)}

    }




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
    .m-container .btn {
      cursor: pointer;
      padding: 5px 10px;
      border: none;
      color: #fff;
      font-size:12px;
      border-radius:20px;
      z-index:1000;
    }
    .m-container .btn-warning{
      position:fixed;
      top:300px;
      right:0;
      background-color:rgb(255, 135, 0);
    }
    .m-container .btn-teal{
      background-color:teal;
    }
    .m-container .btn-success{
      background-color: #008040;
    }
    .m-container .btn-info{
      background-color:#777777;
    }
    .m-container .btn-danger{
      background-color:red;
    }

    .game-live-item i {
        cursor:pointer;
    }

    .game-live-item .txt i:hover {
        color:rgb(255, 135, 0);
    }

      `)
})();