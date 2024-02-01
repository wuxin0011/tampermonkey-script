/* 背景图色 */
import { isNeedDark } from '@/hook/useTheme'
import { isShowBg, querySelector, is_bilibili, is_douyu, is_huya } from '@/utils/index'

const douyu = [
  'body',
  '.wm-general-bgblur',
  '.layout-Module-container',
  '.layout-Cover-list',
]

const huya = [
  'body',
  '.js-responded-list',
  ' #J_mainWrap',
  '#main_col',
  '.layout-Module-container',
]


const bilibili = [
  'body',
  '#app',
  '#bili-header-banner-img'
]






const darkImageCss = () => {
  let st = null
  if (is_huya) {
    st = huya
  } else if (is_douyu) {
    st = douyu
  } else if (is_bilibili) {
    st = bilibili
  } else {
    return []
  }

  return [...new Set([...st])]
}
const cssUpdate = () => {
  // 
  if (is_bilibili) {
    const imgElement = querySelector('.bili-header__banner .v-img img')
    if (imgElement) {
      console.log('run update')
      imgElement.style.display = isShowBg() ? '' : (isNeedDark() ? 'none' : 'block')
    }
  }
  darkImageCss().forEach(selector => {
    const ele = querySelector(selector)
    if (ele) {
      ele.style.backgroundColor = isShowBg() ? '' : (isNeedDark() ? 'var(--w-bg-darker)' : '')
    }
  })
}


export default cssUpdate
