// ==UserScript==
// @name         leetcode-discuss-docs
// @namespace    leetcode-discuss-docs
// @version      0.0.1-test6
// @author       wuxin0011
// @description  讨论区添加目录导航
// @license      MIT
// @supportURL   https://scriptcat.org/zh-CN/script-show-page/4374
// @icon         https://pic.leetcode.cn/1760157013-KiWvys-book-bookmark-icon_34486.png
// @match        https://leetcode.cn/circle/discuss/*
// @match        https://leetcode.cn/discuss/*
// @match        https://leetcode.com/circle/discuss/*
// @match        https://leetcode.com/discuss/*
// @resource     tobotcss https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.32.2/tocbot.css
// @require      https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.32.2/tocbot.min.js
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';
    if(window.location.href == 'https://leetcode.cn/discuss/' || window.location.href == 'https://leetcode.com/discuss/') {
        return
    }

    // 添加 Tocbot CSS
    GM_addStyle(GM_getResourceText('tobotcss'));
    const key = 'leetcode_doc_title_install_left'
    let install_left = GM_getValue(key)
    // console.log(install_left,typeof install_left)

    install_left = install_left == undefined ||install_left == 'undefined' || install_left == 'null' || install_left == false ? false : true

    GM_registerMenuCommand(`目录安装到${install_left ? '右侧':'左侧'}`,()=>{
        GM_setValue(key,!install_left)
        window.location.reload()
    })


    GM_registerMenuCommand('更新',()=>{
        window.open('https://scriptcat.org/zh-CN/script-show-page/4374','_blank')
    })

    // 自定义样式 - 修复空白、固定位置和暗色模式
    GM_addStyle(`
        /* 屏蔽讨论区目录 */
         /* .t6Fde{ display:none !important;}*/
        /* 屏蔽讨论区目录 */
        ${install_left ?
        ` .t6Fde{
            display:none !important;
        }`:
        ` .t6Fde{
            visibility: hidden !important;
            display:inline-block !important;
        }`}
        .tocbot-sidebar {
            position: fixed;
            top: 0;
            ${install_left ? "left : 0px;": "right: 0px;"}
            width:auto;
            max-width:300px;
            min-width:230px;
            max-height: calc(100vh - 20px);
            background: white;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            /*overflow-y: auto;*/
            /* 移除底部空白 */
            display: flex;
            flex-direction: column;
        }

        /* 暗色模式适配 */
        @media (prefers-color-scheme: dark) {
            .tocbot-sidebar {
                background: #1e1e1e;
                border: 1px solid #333;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            }
        }

        /* 力扣暗色模式 */
        .dark .tocbot-sidebar,
        [data-theme="dark"] .tocbot-sidebar,
        body.dark .tocbot-sidebar {
            background: #1e1e1e !important;
            border: 1px solid #333 !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3) !important;
        }

        .tocbot-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e0e0e0;
            flex-shrink: 0; /* 防止头部被压缩 */
        }

        /* 暗色模式头部 */
        @media (prefers-color-scheme: dark) {
            .tocbot-header {
                border-bottom-color: #333;
            }
        }
        .dark .tocbot-header,
        [data-theme="dark"] .tocbot-header,
        body.dark .tocbot-header {
            border-bottom-color: #333 !important;
        }

        .tocbot-title {
            font-size: 16px;
            font-weight: 600;
            color: #0d47a1;
            margin: 0;
        }

        /* 暗色模式标题 */
        @media (prefers-color-scheme: dark) {
            .tocbot-title {
                color: #90caf9;
            }
        }
        .dark .tocbot-title,
        [data-theme="dark"] .tocbot-title,
        body.dark .tocbot-title {
            color: #90caf9 !important;
        }

        .tocbot-toggle {
            background: none;
            border: none;
            color: #1976d2;
            cursor: pointer;
            font-size: 12px;
            padding: 4px 8px;
            border-radius: 4px;
        }
        .tocbot-toggle:hover {
            background-color: #e3f2fd;
        }

        /* 暗色模式按钮 */
        @media (prefers-color-scheme: dark) {
            .tocbot-toggle {
                color: #90caf9;
            }
            .tocbot-toggle:hover {
                background-color: #2d3748;
            }
        }
        .dark .tocbot-toggle,
        [data-theme="dark"] .tocbot-toggle,
        body.dark .tocbot-toggle {
            color: #90caf9 !important;
        }
        .dark .tocbot-toggle:hover,
        [data-theme="dark"] .tocbot-toggle:hover,
        body.dark .tocbot-toggle:hover {
            background-color: #2d3748 !important;
        }

        /* 目录内容区域 - 自动填充剩余空间 */
        .toc-content {
            flex: 1;
            min-height: 0; /* 重要：允许内容区域收缩 */
            overflow-y: auto;
        }

        /* 修复 Tocbot 默认样式 */
        .js-toc {
            padding-left: 0 !important;
            margin: 0 !important;
        }
        .toc-list {
            padding-left: 0 !important;
            margin: 0 !important;
        }
        .toc-list-item {
            margin-bottom: 4px !important;
        }
        .toc-link {
            display: block !important;
            padding: 6px 10px !important;
            border-radius: 4px !important;
            color: #546e7a !important;
            text-decoration: none !important;
            font-size: 13px !important;
            line-height: 1.4 !important;
            transition: all 0.2s !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
        }
        .toc-link:hover {
            background-color: #e3f2fd !important;
            color: #1976d2 !important;
        }
        .is-active-link {
            background-color: #bbdefb !important;
            color: #0d47a1 !important;
            font-weight: 500 !important;
        }

        /* 暗色模式链接 */
        @media (prefers-color-scheme: dark) {
            .toc-link {
                color: #b0bec5 !important;
            }
            .toc-link::before {
                background-color: #1e1e1e !important;
            }
            .toc-link:hover {
                background-color: #2d3748 !important;
                color: #90caf9 !important;
            }
            .is-active-link {
                background-color: #1e3a5f !important;
                color: #90caf9 !important;
            }
        }
        .dark .toc-link,
        [data-theme="dark"] .toc-link,
        body.dark .toc-link {
            color: #b0bec5 !important;
        }
        .dark .toc-link::before,
        [data-theme="dark"] .toc-link::before,
        body.dark .toc-link::before {
            background-color: #1e1e1e !important;
        }
        .dark .toc-link:hover,
        [data-theme="dark"] .toc-link:hover,
        body.dark .toc-link:hover {
            background-color: #2d3748 !important;
            color: #90caf9 !important;
        }
        .dark .is-active-link,
        [data-theme="dark"] .is-active-link,
        body.dark .is-active-link {
            background-color: #1e3a5f !important;
            color: #90caf9 !important;
        }

        /* 子列表样式 - 默认隐藏 */
        .toc-sublist {
            display: none !important;
            padding-left: 12px !important;
            margin-top: 4px !important;
        }

        /* 展开状态的子列表 */
        .toc-sublist.expanded {
            display: block !important;
        }

        /* 可点击的父级项目 */
        .toc-list-item.has-children > .toc-link {
            position: relative;
            padding-right: 25px !important;
        }
        .toc-list-item.has-children > .toc-link::after {
            content: '▶';
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 10px;
            color: #999;
            transition: transform 0.2s;
        }
        .toc-list-item.has-children.expanded > .toc-link::after {
            transform: translateY(-50%) rotate(90deg);
        }

        /* 暗色模式箭头 */
        @media (prefers-color-scheme: dark) {
            .toc-list-item.has-children > .toc-link::after {
                color: #666;
            }
        }
        .dark .toc-list-item.has-children > .toc-link::after,
        [data-theme="dark"] .toc-list-item.has-children > .toc-link::after,
        body.dark .toc-list-item.has-children > .toc-link::after {
            color: #666 !important;
        }

        .tocbot-back-to-top {
            display: block;
            width: 100%;
            padding: 8px;
            margin-top: 12px;
            background-color: #e3f2fd;
            color: #1976d2;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-align: center;
            font-size: 12px;
            transition: background-color 0.2s;
            flex-shrink: 0; /* 防止按钮被压缩 */
        }
        .tocbot-back-to-top:hover {
            background-color: #bbdefb;
        }

        /* 暗色模式返回顶部按钮 */
        @media (prefers-color-scheme: dark) {
            .tocbot-back-to-top {
                background-color: #2d3748;
                color: #90caf9;
            }
            .tocbot-back-to-top:hover {
                background-color: #4a5568;
            }
        }
        .dark .tocbot-back-to-top,
        [data-theme="dark"] .tocbot-back-to-top,
        body.dark .tocbot-back-to-top {
            background-color: #2d3748 !important;
            color: #90caf9 !important;
        }
        .dark .tocbot-back-to-top:hover,
        [data-theme="dark"] .tocbot-back-to-top:hover,
        body.dark .tocbot-back-to-top:hover {
            background-color: #4a5568 !important;
        }

        .toc-empty {
            color: #999;
            font-style: italic;
            text-align: center;
            padding: 20px;
        }

        /* 暗色模式空状态 */
        @media (prefers-color-scheme: dark) {
            .toc-empty {
                color: #666;
            }
        }
        .dark .toc-empty,
        [data-theme="dark"] .toc-empty,
        body.dark .toc-empty {
            color: #666 !important;
        }

        /* 美化滚动条 */
        .tocbot-sidebar::-webkit-scrollbar {
            width: 6px;
        }
        .tocbot-sidebar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
        }
        .tocbot-sidebar::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
        }
        .tocbot-sidebar::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
        }

        /* 暗色模式滚动条 */
        @media (prefers-color-scheme: dark) {
            .tocbot-sidebar::-webkit-scrollbar-track {
                background: #2d3748;
            }
            .tocbot-sidebar::-webkit-scrollbar-thumb {
                background: #4a5568;
            }
            .tocbot-sidebar::-webkit-scrollbar-thumb:hover {
                background: #718096;
            }
        }
        .dark .tocbot-sidebar::-webkit-scrollbar-track,
        [data-theme="dark"] .tocbot-sidebar::-webkit-scrollbar-track,
        body.dark .tocbot-sidebar::-webkit-scrollbar-track {
            background: #2d3748 !important;
        }
        .dark .tocbot-sidebar::-webkit-scrollbar-thumb,
        [data-theme="dark"] .tocbot-sidebar::-webkit-scrollbar-thumb,
        body.dark .tocbot-sidebar::-webkit-scrollbar-thumb {
            background: #4a5568 !important;
        }
        .dark .tocbot-sidebar::-webkit-scrollbar-thumb:hover,
        [data-theme="dark"] .tocbot-sidebar::-webkit-scrollbar-thumb:hover,
        body.dark .tocbot-sidebar::-webkit-scrollbar-thumb:hover {
            background: #718096 !important;
        }

        .toc-link::before {
           width:0px !important;
        }
    `);

    function f0() {
        if(!install_left) return;
        let dom = document.querySelector('.t6Fde').previousElementSibling
        dom.className = "relative flex flex-1 justify-end mr-10"
    }
    setTimeout(() => {
        f0()
    }, 1000);

    function initTocbot() {
        // 移除已存在的目录
        const existingToc = document.querySelector('.tocbot-sidebar');
        if (existingToc) {
            existingToc.remove();
        }

        // 检查是否有内容
        const contentElements = document.querySelectorAll('.break-words');
        if (contentElements.length === 0) {
            console.log('未找到 .break-words 元素');
            return;
        }

        // 检查标题数量
        let totalHeadings = 0;
        contentElements.forEach(el => {
            totalHeadings += el.querySelectorAll('h1, h2, h3, h4').length;
        });

        if (totalHeadings === 0) {
            console.log('在 .break-words 元素中未找到任何标题');
            return;
        }

        console.log(`找到 ${totalHeadings} 个标题，开始初始化 Tocbot`);

        // 创建目录容器 - 使用 Flex 布局避免底部空白
        const tocSidebar = document.createElement('div');
        tocSidebar.className = 'tocbot-sidebar';
        tocSidebar.innerHTML = `
            <div class="tocbot-header">
                <h4 class="tocbot-title">目录</h4>
                <button class="tocbot-toggle">收起</button>
            </div>
            <div class="toc-content">
                <div class="js-toc"></div>
            </div>
            <button class="tocbot-back-to-top">返回顶部</button>
        `;
        document.body.appendChild(tocSidebar);

        try {
            // 初始化 Tocbot
            tocbot.init({
                tocSelector: '.js-toc',
                contentSelector: '.break-words',
                headingSelector: 'h1, h2, h3, h4',
                hasInnerContainers: true,
                scrollSmoothOffset: -80,
                headingsOffset: 80,
                disableTocScrollSync: false,
                collapseDepth: 1,
                orderedList: false,

                onSuccess: function() {
                    console.log('Tocbot 初始化成功');
                    setupExpandableToc();
                    removeEmptySpace(); // 移除空白
                    observeDarkMode(); // 监听暗色模式变化

                    const tocLinks = document.querySelectorAll('.js-toc .toc-link');
                    if (tocLinks.length === 0) {
                        const tocContainer = document.querySelector('.js-toc');
                        tocContainer.innerHTML = '<div class="toc-empty">未找到可用的标题</div>';
                    }
                },

                onError: function(error) {
                    console.error('Tocbot 初始化失败:', error);
                    const tocContainer = document.querySelector('.js-toc');
                    if (tocContainer) {
                        tocContainer.innerHTML = '<div class="toc-empty">目录生成失败</div>';
                    }
                }
            });

            // 设置可展开的目录功能
            function setupExpandableToc() {
                const listItems = document.querySelectorAll('.js-toc .toc-list-item');
                listItems.forEach(item => {
                    const sublist = item.querySelector('.toc-sublist');
                    if (sublist) {
                        item.classList.add('has-children');

                        const link = item.querySelector('.toc-link');
                        if (link) {
                            link.addEventListener('click', function(e) {
                                if (!item.classList.contains('is-active-li') && e.target === link) {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    const isExpanded = item.classList.contains('expanded');
                                    if (isExpanded) {
                                        item.classList.remove('expanded');
                                        sublist.classList.remove('expanded');
                                    } else {
                                        item.classList.add('expanded');
                                        sublist.classList.add('expanded');
                                    }
                                }
                            });
                        }
                    }
                });

                cleanupEmptyTocItems();
            }

            // 清理空白的目录项
            function cleanupEmptyTocItems() {
                const tocLinks = document.querySelectorAll('.js-toc .toc-link');
                tocLinks.forEach(link => {
                    if (!link.textContent || link.textContent.trim() === '') {
                        const listItem = link.closest('.toc-list-item');
                        if (listItem) {
                            listItem.remove();
                        }
                    }
                });

                const lists = document.querySelectorAll('.js-toc .toc-list');
                lists.forEach(list => {
                    if (list.children.length === 0) {
                        list.remove();
                    }
                });
            }

            // 移除底部空白
            function removeEmptySpace() {
                setTimeout(() => {
                    const tocContainer = document.querySelector('.js-toc');
                    if (tocContainer) {
                        // 移除空的文本节点
                        const walker = document.createTreeWalker(
                            tocContainer,
                            NodeFilter.SHOW_TEXT,
                            null,
                            false
                        );

                        let node;
                        const nodesToRemove = [];
                        while (node = walker.nextNode()) {
                            if (node.textContent.trim() === '') {
                                nodesToRemove.push(node);
                            }
                        }

                        nodesToRemove.forEach(node => node.parentNode.removeChild(node));

                        // 确保最后一个元素没有底部边距
                        const lastItem = tocContainer.querySelector('.toc-list-item:last-child');
                        if (lastItem) {
                            lastItem.style.marginBottom = '0';
                        }
                    }
                }, 100);
            }

            // 监听暗色模式变化
            function observeDarkMode() {
                // 检测当前主题
                updateDarkMode();

                // 监听主题变化
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.attributeName === 'class' || mutation.attributeName === 'data-theme') {
                            updateDarkMode();
                        }
                    });
                });

                observer.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['class', 'data-theme']
                });

                observer.observe(document.body, {
                    attributes: true,
                    attributeFilter: ['class', 'data-theme']
                });
            }

            function updateDarkMode() {
                const isDark = document.documentElement.classList.contains('dark') ||
                             document.body.classList.contains('dark') ||
                             document.documentElement.getAttribute('data-theme') === 'dark' ||
                             window.matchMedia('(prefers-color-scheme: dark)').matches;

                const tocSidebar = document.querySelector('.tocbot-sidebar');
                if (tocSidebar) {
                    if (isDark) {
                        tocSidebar.classList.add('dark');
                    } else {
                        tocSidebar.classList.remove('dark');
                    }
                }
            }

            // 返回顶部功能
            const backToTopBtn = tocSidebar.querySelector('.tocbot-back-to-top');
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // 目录整体收起功能
            const tocToggle = tocSidebar.querySelector('.tocbot-toggle');
            const tocContent = tocSidebar.querySelector('.toc-content');
            let isCollapsed = false;

            tocToggle.addEventListener('click', function() {
                if (isCollapsed) {
                    tocContent.style.display = 'block';
                    backToTopBtn.style.display = 'block';
                    tocToggle.textContent = '收起';
                } else {
                    tocContent.style.display = 'none';
                    backToTopBtn.style.display = 'none';
                    tocToggle.textContent = '展开';
                }
                isCollapsed = !isCollapsed;
            });

        } catch (error) {
            console.error('初始化 Tocbot 时出错:', error);
        }
    }

    // 等待页面加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTocbot);
    } else {
        initTocbot();
    }

    // 对于单页应用，监听路由变化
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            setTimeout(initTocbot, 1000);
        }
    }).observe(document, { subtree: true, childList: true });

})();