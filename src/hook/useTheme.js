
import { wls, warn, log, support, getLocalStore, addLocalStore } from '../utils'

/**
 * 主题类型
 * [白天]
 * [黑夜]
 */
const DARK_THEME_KEY = "wx_dark_theme_key"


/**
 * 是否自动
 */
export const THEME_IS_AUTO = "wx_dark_theme_is_auto"


/**
 * 保存到本地主题key
 */
export const THEME_TYPE_KEY = "wx_dark_theme_type_key"


/**
 * 背景css key variable
 */
const DARK_COLOR_VARIABLE = '--w-bg-darker'


/**
 * 
 */
const theme = {
  dark: 'dark',
  light: 'light',
}



/**
 * 枚举黑色主题类型
 */
export const DARK_THEME_TYPE = {
  'DEFAULT': 'DEFAULT',
  'ORDINARY': 'ORDINARY',
  'BLACK0': 'BLACK0',
  'BLACK1': 'BLACK1',
  'BLACK2': 'BLACK2',
  'BLACK3': 'BLACK3'
}


/**
 * 黑色主题详细信息
 */
export const DARK_TYPE = {
  [DARK_THEME_TYPE.DEFAULT]: {
    'name': '默认',
    'color': '#343b44'
  },
  [DARK_THEME_TYPE.ORDINARY]: {
    'name': '普通',
    'color': '#37404c'
  },
  [DARK_THEME_TYPE.BLACK0]: {
    'name': '深黑1',
    'color': '#22272e'
  },
  [DARK_THEME_TYPE.BLACK1]: {
    'name': '深黑2',
    'color': '#232222'
  },
  [DARK_THEME_TYPE.BLACK2]: {
    'name': '深黑2',
    'color': '#171514'
  },
  [DARK_THEME_TYPE.BLACK3]: {
    'name': '深黑3',
    'color': '#121212'
  },
}




/**
 * 是否是黑色主题 默认为黑色主题
 * @returns boolean
 */
export const isDark = () => wls.getItem(DARK_THEME_KEY) === theme.dark || wls.getItem(DARK_THEME_KEY) === null



/**
 * 是否自动 默认根据时间自动
 */
export const isAutoDark = () => getLocalStore(THEME_IS_AUTO, Boolean.name, false) || wls.getItem(THEME_IS_AUTO) === null


/**
 * 保存主题类型 默认为  DARK_THEME_TYPE.DEFAULT
 * 
 */
export const LOCAL_THEME_TYPE = wls.getItem(THEME_TYPE_KEY) === null ? DARK_THEME_TYPE.DEFAULT : wls.getItem(THEME_TYPE_KEY)


/**
 * color
 */
export const darkColor = () => {
  let type = wls.getItem(THEME_TYPE_KEY) === null ? DARK_THEME_TYPE.DEFAULT : wls.getItem(THEME_TYPE_KEY)
  let l1 = DARK_TYPE[type]
  return l1?.color ?? '#121212'
}


/**
 * 
 * @param {*} key 
 * @param {*} value 
 * @returns 
 */
export const updateStyleColor = (key, value) => document.documentElement.style.setProperty(key, value)


/**
 * 修改主题类型
 * @param {主题类型} type 
 */
export const updateDarkStyleType = (type) => {
  addLocalStore(THEME_TYPE_KEY, type, String.name, false)
  updateStyleColor(DARK_COLOR_VARIABLE, DARK_TYPE[type].color)
  log('主题切换成功！', '你选择主题是', DARK_TYPE[type].name, '颜色是', DARK_TYPE[type].color, 'darkColor', darkColor())
}


/**
 * 主题动画切换 快照版
 * @link https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
 * @param event Event
 */
export const toggleColorMode = (event) => {

  if (!event) {
    warn('event is not allow null !')
    return;
  }
  try {
    const isAppearanceTransition = document?.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isAppearanceTransition) {
      log('不支持快照切换...,将使用普通方式切换主题')
      themeUpdate()
      return
    }
  } catch (error) {
    themeUpdate()
    return;
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  const transition = document.startViewTransition(() => {
    log('支持快照切换...')
    themeUpdate()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDark()
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: isDark()
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}


const autoDarkType = () => {
  let hour = new Date().getHours()
  let type = DARK_THEME_TYPE.DEFAULT
  if (isAutoDark()) {
    if (hour >= 0 && hour <= 7) { // 黑夜0
      // default
    } else if (hour > 7 && hour <= 17) { // 白天
      // ignore ...
    } else if (hour > 17 && hour < 18) { // 黑夜1
      type = DARK_THEME_TYPE.ORDINARY
    } else if (hour > 18 && hour <= 20) {  // 黑夜2
      type = DARK_THEME_TYPE.BLACK
    } else if (hour > 20 && hour <= 23) { // 黑夜3
      type = DARK_THEME_TYPE.BLACK1
    }
  }
  return type
}

const autoDarkColor = () => {
  let color = ''
  if (isAutoDark()) {
    let type = autoDarkType()
    color = DARK_TYPE[type].color
  } else {
    color = darkColor()
  }
  return color
}


export const isNeedDark = () => ((new Date().getHours() < 7 || new Date().getHours() >= 17) && isAutoDark()) || isDark()


/**
 * update class 
 */
export const updateDarkClass = () => {
  if (!support.supportTheme()) {
    return;
  }
  if (isNeedDark()) {
    updateStyleColor(DARK_COLOR_VARIABLE, autoDarkColor())
  }
  const classList = document.documentElement.classList
  if (!classList.contains('dark') && isNeedDark()) {
    document.documentElement.classList.add('dark')
  } else if (classList.contains('dark') && !isNeedDark()) {
    document.documentElement.classList.remove('dark')
  }
}


/**
 * update theme
 */
export const themeUpdate = () => {
  log(isNeedDark() ? '切换到白天' : "切换到黑夜")
  wls.setItem(DARK_THEME_KEY, isNeedDark() ? theme.light : theme.dark)
  updateDarkClass()
}





export const themeOptions = () => {
  let str = ''
  let local_theme = isNeedDark() ? autoDarkType() : LOCAL_THEME_TYPE
  for (let [k, v] of Object.entries(DARK_TYPE)) {
    str += `<option value="${k}" ${local_theme == k ? "selected " : ""}>${v.name}</option>`
  }
  return str
}
