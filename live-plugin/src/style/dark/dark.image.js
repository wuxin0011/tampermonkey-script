/* 背景图色 */
import { isNeedDark } from '@/hook/useTheme'
import { isShowBg, querySelector } from '@/utils/index'
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


const darkImageCss = [...new Set([...douyu, ...huya])]
const cssUpdate = () => {
  darkImageCss.forEach(selector => {
    const ele = querySelector(selector)
    if (ele) {
      ele.style.backgroundColor = isShowBg() ? '' : (isNeedDark() ? 'var(--w-bg-darker)' : '')
    }
  })
}


export default cssUpdate
