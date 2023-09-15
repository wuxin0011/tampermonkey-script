
import { wls, warn, log, support } from '../utils'

const DARK_THEME_KEY = "DARK_THEME_KEY"

const theme = {
  dark: 'dark',
  light: 'light',
}



/**
 * 是否是黑色主题 默认为黑色主题
 * @returns boolean
 */
export const isDark = () => wls.getItem(DARK_THEME_KEY) === theme.dark || wls.getItem(DARK_THEME_KEY) === null




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


