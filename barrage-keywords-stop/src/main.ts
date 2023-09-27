
import {
	AnimationTimeKey,
	DEFAULT_ANIMATION_TIME,
	MARK,
	MARK_TAG,
	MAX_ANIMATION_TIME,
	getAnimationTime,
	getItem,
	isAnimationKey,
	isBiliBiliLive,
	isDouYinLive,
	isDouyuLive,
	isFirstAlert,
	isFirstAlertKey,
	isFisrtInstall,
	isFisrtInstallKey,
	isFull,
	isHyLive,
	isLocalHost,
	isNoShowTip,
	isNoShowTipKey,
	localLink,
	removeDom,
	roomId,
	selectKeywords,
	selectKeywordsLocal,
	selectOnlyThisRoomsKeywords,
	setItem
} from './utils/index';


import {
	SUPPORT, TAG_TYPE
} from './utils/const'


import BarrageKeywordsStop from './ui/index';



(function () {
	if (typeof window === undefined) {
		return;
	}

	let isAnimation = getItem(isAnimationKey) == null || getItem(isAnimationKey) === isAnimationKey
	let animationTime = DEFAULT_ANIMATION_TIME

	let nodeVersion = 0
	let beforeTag: HTMLSpanElement | null = null

	let keywordsCache: string[] = []



	let isInit = false
	let isStart = false
	let tagInitSuccess = true
	let isAllRooms = false
	let isSupport = true
	const isPrintStop = true
	let currentContainer: HTMLElement | null = null
	let requestAnimationFrameTimer: number = 0


	/******************************************************************************************************************************************************************** */

	//  弹幕容器 实际上是选择器
	let BARRAGE_CONTAINER: string[] = []

	const contains = (text: string | null | undefined) => {
		if (!text) {
			return false
		}
		for (let index = 0; index < keywordsCache.length; index++) {
			if (keywordsCache[index] && (text.indexOf(keywordsCache[index]) !== -1)) {
				if (!isPrintStop) {
					console.error('\n\n==============================stop=====================================')
					console.error(`禁止`, text, ' keywords: ', keywordsCache[index])
				}
				return true
			}
		}
		return false
	}




	// 弹幕处理
	let findBarrages = () => {
		const findTargetText = (selector: string) => {
			if (!selector) {
				return;
			}
			const nodes = document.querySelectorAll(`${selector} :not([${MARK}="${MARK_TAG(nodeVersion)}"])`)
			for (let index = 0; index < nodes.length; index++) {
				const node = nodes[index]
				if (node instanceof HTMLElement) {
					if (contains(node?.textContent)) {
						if (isAnimation) {
							node.style.transition = `opacity ${animationTime}s ease-out`
							node.style.opacity = '0'
							// 监听过渡结束事件，在过渡结束后删除节点
							node.addEventListener('transitionend', () => {
								removeDom(node, true)
							});
						} else {
							removeDom(node, true)
						}
					}
					node.setAttribute(MARK, MARK_TAG(nodeVersion))
				}

			}
		}

		// 遍历节点
		if (Array.isArray(BARRAGE_CONTAINER)) {

		}
		for (let i = 0; i < BARRAGE_CONTAINER.length; i++) {
			findTargetText(BARRAGE_CONTAINER[i] as unknown as string)
		}

		requestAnimationFrameTimer = window.requestAnimationFrame(findBarrages)
	}


	// const SUPPORT = {
	// 	HY: 'HY_LIVE',
	// 	DOUYIN: 'DOUYIN_LIVE',
	// 	DOUYU: 'DOUYU_LIVE',
	// 	BILIBILI: 'BILIBILI_LIVE',
	// 	LOCALHOST: 'LOCALHOST_LIVE'
	// }


	// const TAG_TYPE = {
	// 	[SUPPORT.DOUYIN]: {
	// 		[BARRAGE_TYPE.ALL_BARRAGE]: ['.xgplayer-danmu>div', '.webcast-chatroom___item.webcast-chatroom___enter-done', '.xgplayer-danmu div']
	// 	},
	// 	[SUPPORT.HY]: {
	// 		[BARRAGE_TYPE.ALL_BARRAGE]: ['#player-video #danmuwrap #danmudiv .danmu-item', '#player-video #danmuwrap #danmudiv #danmudiv2', '#player-marquee-wrap .player-marquee-noble-item', '#player-marquee-wrap .player-banner-enter', '#chat-room__list>div']
	// 	},
	// 	[SUPPORT.BILIBILI]: {
	// 		[BARRAGE_TYPE.ALL_BARRAGE]: ['.web-player-danmaku .danmaku-item-container .bili-dm', '#chat-items .chat-item']

	// 	},
	// 	[SUPPORT.DOUYU]: {
	// 		[BARRAGE_TYPE.ALL_BARRAGE]: ['#douyu_room_normal_player_danmuDom .ani-broadcast', '#js-barrage-container #js-barrage-list li']
	// 	},
	// 	[SUPPORT.LOCALHOST]: {
	// 		[BARRAGE_TYPE.ALL_BARRAGE]: ['video']
	// 	}
	// }

	const installBeforeInfo = () => {
		console.log('欢迎使用弹幕屏蔽插件...')
		console.log('是否是首次安装', isFisrtInstall() ? "是" : "否")
		console.log('是否不需要快捷键提示', isNoShowTip() ? "需要" : "不需要")
	}


	const addStyle = (str: string) => {
		if (isInit) {
			return;
		}
		const head = document.querySelector("head");
		const style = document.createElement("style");
		style.innerText = str;
		head!.appendChild(style);
		isInit = true
	};

	const keywordsUpdate = (array: string[]) => {
		if (!Array.isArray(array)) {
			array = [] as string[]
		}
		isAllRooms ? setItem(selectKeywordsLocal, array, true) : setItem(roomId(), array, true)
		// 通知改变 之前被标记标签如果没被处理将失效
		notify()
	}


	const removeKeywords = (text: string) => {
		if (!Array.isArray(keywordsCache)) {
			return;
		}
		const index = keywordsCache.findIndex(t => t == text)
		if (index >= 0) {
			keywordsCache.splice(index, 1)
			keywordsUpdate([...keywordsCache])
		}
	}




	const createKeywords = (text: string) => {
		if (!Array.isArray(keywordsCache)) {
			keywordsCache = []
		}
		const index = keywordsCache.findIndex(t => t == text)
		if (index === -1) {
			keywordsCache = [text, ...keywordsCache]
			keywordsUpdate(keywordsCache)
		}
	}




	customElements.define('barrage-keywords-stop', BarrageKeywordsStop)


	//  初始化之前将本地房间号和全网房间全部关键词收集
	const initInfo = () => {
		keywordsCache = [] as string[]
		if (Array.isArray(selectOnlyThisRoomsKeywords())) {
			keywordsCache = [...new Set(selectOnlyThisRoomsKeywords())] as string[]
		}
		if (Array.isArray(selectKeywords())) {
			keywordsCache = [...new Set([...keywordsCache, ...selectKeywords()])] as string[]
		}


		isAnimation = getItem(isAnimationKey) == null
		animationTime = getAnimationTime()

		console.log('重新扫描中...当前关键词☠:', keywordsCache)
	}

	// notify ！
	const notify = () => {
		try {
			// clear before event!
			window.cancelAnimationFrame(requestAnimationFrameTimer)
			initInfo() // init info
			if (Array.isArray(keywordsCache) && keywordsCache.length > 0) {
				nodeVersion = nodeVersion + 2
				findBarrages() // run ！
			} else {
				console.log('当前标签为空！停止扫描！🚀')
			}
		} catch (error) {
			console.error('弹幕插件出现异常了😭 ...', error)
		}
	}


	const addOperationEvent = () => {
		let dmContainer = currentContainer
		if (!dmContainer) {
			console.error('获取不到弹幕容器')
			return;
		}
		dmContainer = dmContainer as HTMLElement
		// keywords
		const dmInput = dmContainer.querySelector('.m-dy-input-add-keywords') as HTMLInputElement

		// checkbox animation
		const dmAnimationCheckbox = dmContainer.querySelector('#m-dm-animation-checkbox') as HTMLInputElement
		// time
		const dmAniTimeInput = dmContainer.querySelector('#m-dm-input-animation-time') as HTMLInputElement
		const dmTimeButton = dmContainer.querySelector('.m-dm-time-button') as HTMLDivElement

		// ohter
		const dmBody = dmContainer.querySelector('.m-dm-container-body') as HTMLDivElement
		const dmAddButton = dmContainer.querySelector('.m-dm-add-keywords-button') as HTMLDivElement
		const dmChangeButton = dmContainer.querySelector('.m-dm-all-keywords-button') as HTMLDivElement
		const dmCloseButton = dmContainer.querySelector('#m-dm-close-btn') as HTMLDivElement
		const dmDeleteButton = dmContainer.querySelector('.m-dm-delete-keywords-button') as HTMLDivElement

		if (!dmInput || !dmAddButton || !dmBody) {
			console.log('element has null')
			return;
		}

		const tip = dmContainer.querySelector('.m-dm-container-footer p') as HTMLElement
		tip!.addEventListener('click', () => {
			setItem(isNoShowTipKey, isNoShowTipKey)
			tip!.style.display = 'none'
		})

		const find = (text: string) => keywordsCache.find((t) => t == text)
		const add = () => {
			if (!dmInput.value) {
				alert('请输入关键字')
				return;
			}
			if (find(dmInput.value)) {
				if (isFirstAlert()) {
					setItem(isFirstAlertKey, isFirstAlertKey)
					alert('关键字已重复')
				} else {
					dmInput.value = ''
				}
				return;
			}
			createTag(dmBody, dmInput.value)
			createKeywords(dmInput.value)
			setItem(isFisrtInstallKey, isFisrtInstallKey)
			dmInput.value = ''
		}

		// enter
		dmInput.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				add()
			}
		})


		// click
		dmAddButton.addEventListener('click', () => {
			add()
		})

		// click
		dmCloseButton.addEventListener('click', () => {
			if (dmContainer!.classList.contains('m-dm-ani-close')) {
				dmContainer!.classList.remove('m-dm-ani-close')
			} else {
				dmContainer!.classList.add('m-dm-ani-close')
			}
		})

		// click
		dmChangeButton.addEventListener('click', () => {
			isAllRooms = !isAllRooms
			createTags()
			dmChangeButton.textContent = isAllRooms ? '全房间' : '房间'
			dmChangeButton.title = isAllRooms ? '当前弹幕在所有直播间生效,点击切换房间' : '当前弹幕仅在该房间生效，点击切换到全房间'
		})


		// animation
		dmAnimationCheckbox.checked = isAnimation ? true : false
		dmAnimationCheckbox.addEventListener('change', (e: Event) => {
			setItem(isAnimationKey, dmAnimationCheckbox.checked ? isAnimationKey : `NO_${isAnimationKey}`)
			notify()
		})


		/* 添加动画过度时间 */
		dmAniTimeInput.value = getAnimationTime() as string
		const addTime = () => {
			if (isNaN(Number(dmAniTimeInput.value)) || (Number(dmAniTimeInput.value) < 0 || Number(dmAniTimeInput.value) > MAX_ANIMATION_TIME)) {
				alert(`请输入0-${MAX_ANIMATION_TIME}的数字`)
				dmAniTimeInput.value = String(animationTime)
				return;
			}
			setItem(AnimationTimeKey, dmAniTimeInput.value)
			notify()
		}
		dmAniTimeInput.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				addTime()
			}
		})

		dmTimeButton.addEventListener('click', (event) => {
			addTime()
		})
		// c
		dmDeleteButton.addEventListener('click', () => {
			if (confirm('确认清空？')) {
				removeTags()
				keywordsCache = []
				setItem(isAllRooms ? selectKeywordsLocal : roomId(), keywordsCache, true)
				notify()
			}
		})

		console.log('响应事件监听完毕...')
	}


	/**
	 * 对于全屏事件触发改变错处响应
	 */
	const handleFullScreenChange = () => {
		removeDom(currentContainer, true)
		currentContainer = null // 
		console.log('容器重新生成中....')
		if (isFull()) {
			createContainer('video', false, true)
		} else {
			createContainer('body', false)
		}
	}



	/**
	 * 监听全屏触发事件
	 */
	const addFullScreenEvent = () => {
		document.addEventListener('fullscreenchange', handleFullScreenChange);
		document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
		document.addEventListener('mozfullscreenchange', handleFullScreenChange);
		document.addEventListener('MSFullscreenChange', handleFullScreenChange);
	}



	/**
	 *  ctrl + alt + k evnet
	 */
	const addCtrlAltKEvent = () => {

		document.addEventListener('keydown', function (event) {
			if (event.ctrlKey && event.altKey && event.key === 'k') {
				console.log('init ...')
				const dmContainer = currentContainer
				if (!dmContainer) {
					console.log('触发失败 获取不到容器!')
					return;
				}
				if (dmContainer.classList.contains('m-dm-ani-close')) {
					dmContainer.classList.remove('m-dm-ani-close')
					setItem(isFisrtInstallKey, isFisrtInstallKey)
				} else {
					dmContainer.classList.add('m-dm-ani-close')
				}
			}
		});
	}



	/**
	 * 创建单个标签
	 * @param {} dmBody 
	 * @param {*} text 
	 * @returns 
	 */
	const createTag = (dmBody: HTMLElement | null, text: string) => {
		if (!currentContainer) {
			return;
		}
		if (!dmBody) {
			dmBody = currentContainer.querySelector('.m-dm-container-body')
		}
		if (!dmBody) {
			return;
		}
		if (!text) {
			console.log('关键词内容不能为空！ ')
			return;
		}
		const dmTag = document.createElement('span')
		dmTag.className = 'm-dm-keywords-tag'
		dmTag.textContent = `${text}`
		dmTag.title = `点击移除关键字: ${text}`
		dmTag.addEventListener('click', () => {
			removeKeywords(text)
			dmTag.remove()
		})
		!!beforeTag ? dmBody.appendChild(dmTag) : dmBody.insertBefore(dmTag, beforeTag);
		// update before
		beforeTag = dmTag
	}


	const removeTags = () => {
		if (!currentContainer) {
			return;
		}
		console.log('标签删除中...')
		const allTags = currentContainer.querySelectorAll('.m-dm-container-body .m-dm-keywords-tag') as unknown as HTMLElement[]
		if (allTags && allTags.length > 0) {
			for (let i = 0; i < allTags.length; i++) {
				removeDom(allTags[i], true)
			}
		}
	}

	const createTags = () => {
		if (!currentContainer) {
			return;
		}
		removeTags()
		const dmBody = currentContainer.querySelector('.m-dm-container .m-dm-container-body')
		if (!dmBody) {
			return;
		}
		const keys = isAllRooms ? selectKeywords() : [...selectOnlyThisRoomsKeywords()]
		if (!Array.isArray(keys)) {
			return;
		}
		for (let i = 0; i < keys.length; i++) {
			createTag(dmBody as HTMLElement, keys[i])
		}
		console.log('标签创建完毕....')
	}


	const createContainer = (tagName = 'body', isShow = true, isBefore = false) => {
		currentContainer = new BarrageKeywordsStop().createContainer(tagName, isShow, isBefore)
		if (!currentContainer) {
			isSupport = false
			console.log('当前容器不存在！请检查', tagName)
			return;
		}
		console.log('弹幕容器创建完毕....')
		addOperation()
	}


	const addOperation = () => {
		if (!isSupport) {
			console.warn('不支持哦初始化失败')
			return;
		}
		if (!currentContainer) {
			console.log('未找到弹幕容器... ')
			return;
		}
		createTags()
		addOperationEvent()
		console.log('一切准备就绪！')
		notify()
	}




	const initDom = () => {

		// 监听 ctrl + alt + k 时间
		addCtrlAltKEvent()

		// 监听全屏事件是否触发
		addFullScreenEvent()

		// 首次安装 默认出现 提示用户可以关闭
		if (isFisrtInstall()) {
			setTimeout(() => {
				createContainer('body', false)
			}, 5000)
		} else {
			createContainer('body', false)
		}

	}


	const initTag = (type: string) => {
		if (!TAG_TYPE[type]) {
			tagInitSuccess = false
			return
		}
		BARRAGE_CONTAINER = TAG_TYPE[type]
		tagInitSuccess = !!BARRAGE_CONTAINER && Array.isArray(BARRAGE_CONTAINER) && BARRAGE_CONTAINER.length > 0
	}




	/**
	 * 
	 * @returns 启动入口
	 */
	const start = () => {
		if (isStart) {
			return;
		}
		console.log('弹幕插件执行中...')
		installBeforeInfo()
		if (isDouYinLive) {
			initTag(SUPPORT.DOUYIN)
		} else if (isHyLive) {
			initTag(SUPPORT.HY)
		} else if (isBiliBiliLive) {
			initTag(SUPPORT.BILIBILI)
		} else if (isDouyuLive) {
			initTag(SUPPORT.DOUYU)
		} else if (isLocalHost) {
			initTag(SUPPORT.LOCALHOST)
			isSupport = true
		} else {
			isSupport = false
		}
		if (!tagInitSuccess) {
			console.log('标签初始化失败！')
			return;
		}
		if (isSupport) {
			initDom()
		} else {
			console.log('对不起不支持当前网址!', localLink)
		}
		isStart = true
	}
	start()

})()


