
import { wls, warn, log, support, getLocalStore } from '../utils'
// 主题key
const DARK_THEME_KEY = "DARK_THEME_KEY"
// 是否自动
export const THEME_IS_AUTO = "THEME_IS_AUTO"
// 保存主题类型
export const THEME_TYPE = "THEME_TYPE"

const theme = {
  dark: 'dark',
  light: 'light',
}

export const DARK_THEME_TYPE = {
  'DEFAULT': 'DEFAULT',
  'ORDINARY': 'ORDINARY',
  'BLACK': 'BLACK',
}

// 黑色主题类型
export const DARK_TYPE = {
  [DARK_THEME_TYPE.DEFAULT]: {
    'name': '默认',
    'color': '#343b44'
  },
  [DARK_THEME_TYPE.ORDINARY]: {
    'name': '普通',
    'color': '#37404c'
  },
  [DARK_THEME_TYPE.BLACK]: {
    'name': '深黑',
    'color': '#22272e'
  },
}




/**
 * 是否是黑色主题 默认为黑色主题
 * @returns boolean
 */
export const isDark = () => wls.getItem(THEME_TYPE) === theme.dark || wls.getItem(DARK_THEME_KEY) === null



/**
 * 是否自动 默认根据时间自动
 */
export const isAutoDark = () => getLocalStore(THEME_IS_AUTO, Boolean.name, false) || wls.getItem(THEME_IS_AUTO) === null


/**
 * 保存主题类型 默认为 DARK_THEME_TYPE.DEFAULT
 */
export const local_theme_type = wls.getItem(THEME_TYPE) === null ? DARK_THEME_TYPE.DEFAULT : wls.getItem(THEME_TYPE)


/**
 * color
 */
export const dark_color = DARK_TYPE[local_theme_type].color



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
  const transition = document.startViewTransition(async () => {
    log('支持快照切换...')
    await themeUpdate()
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


export const updateDarkClass = () => {
  if (!support.supportTheme()) {
    return;
  }
  const classList = document.documentElement.classList
  if (!classList.contains('dark') && isDark()) {
    document.documentElement.classList.add('dark')
  } else if (classList.contains('dark') && !isDark()) {
    document.documentElement.classList.remove('dark')
  }
}



const themeUpdate = async () => {
  log(isDark() ? '切换到白天' : "切换到黑夜")
  wls.setItem(DARK_THEME_KEY, isDark() ? theme.light : theme.dark)
  updateDarkClass()
}


