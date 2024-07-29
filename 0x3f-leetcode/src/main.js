import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ElMessage } from 'element-plus'
import Cache from './utils/cache'
import { GM_registerMenuCommand } from '$'
import { submitProblems, install_pos,addProcess, __0x3f_problmes_update__, __0x3f_problmes_ok_insert_pos__, __is_none_0x3f_problmes_button__, __0x3f_problmes_solution__, __add_cur__, __0x3f_problmes_urls__, support_plugins, initObj, initUrls } from './utils/problems'
import {
  isContest,
  isProblem,
  isLeetCodeCircleUrl,
} from './utils/index'

import {
  startStopRanking
} from './utils/contest'
const local_url = window.location.href
let loadID = 0
let submitCnt = 0

function watchDom(dom) {
  if (!(dom instanceof HTMLElement)) {
    return;
  }

  let m = new MutationObserver(() => {
    if (submitCnt % 2 == 1) {
      submitProblems(local_url)
    }
    submitCnt++;
  })
  m.observe(dom, {
    childList: true,
    attributes: true
  })
}

function run() {
  loadID++
  if (isProblem(local_url) || isContest(local_url)) {
    // 首次加载访问
    if (isProblem(local_url) && loadID == 1) {
      submitProblems(local_url)
    }

    setTimeout(() => {
      let submitbutton = null
      const isNext = !!document.querySelector('#__next')
      if (isProblem(local_url) || isNext) {
        submitbutton = document.querySelector('div [data-e2e-locator=console-submit-button]')
      } else {
        let buttons = Array.from(document.querySelectorAll('.question-detail-bottom  .pull-right button'))
        for (let i = buttons.length - 1; i >= 0; i--) {
          if (buttons[i].textContent.indexOf('提交解答') != -1) {
            submitbutton = buttons[i]
            break
          }
        }
      }
      // console.log('submitbutton', submitbutton)
      if (submitbutton) {
        // 网络延迟问题
        // submitbutton.addEventListener('click', () => {
        //   submitProblems(local_url)
        // })
        watchDom(submitbutton)
      } else if (loadID < 10) {
        run()
      }
    }, 3000);

  } else if (isLeetCodeCircleUrl(local_url)) {

    let Container = null
    let ok = Cache.get(__is_none_0x3f_problmes_button__, true, Boolean.name)
    const start = () => {
      Container = document.createElement('div');
      const body = document.querySelector('body')
      body.append(Container)
      Container.style.display = ok && support_plugins() ? 'block' : 'none'
      return Container
    }
    let dom = start()


    const VueApp = createApp(App)

    GM_registerMenuCommand(`${ok ? '隐藏按钮' : '显示按钮'}`, () => {
      ok = !ok
      // console.log('ok????', ok)
      Container.style.display = ok ? 'block' : 'none'
      Cache.set(__is_none_0x3f_problmes_button__, ok)
    }, { title: '可以手动关闭或者显示按钮 默认显示 刷新生效' })


    GM_registerMenuCommand(`安装到${install_pos() ? '右侧' : '左侧'}`, () => {
      Cache.set(__0x3f_problmes_ok_insert_pos__, install_pos())
      window.location.reload()
    }, { title: 'AC标记安装位置，默认左侧，刷新生效' })


    GM_registerMenuCommand(`${initObj().onlyUrls ? '仅在收藏题单页面生效' : '所有题单生效'}`, () => {
      const u = initObj()
      u.onlyUrls = !u.onlyUrls
      Container.style.display = support_plugins() ? 'block' : 'none'
      Cache.set(__0x3f_problmes_solution__, u)
    })

    GM_registerMenuCommand(`添加本页`, () => {
      const urls = initUrls()
      let ok = false
      let url = window.location.href
      for (let info of urls) {
        if (!info || !info?.link) {
          continue
        }
        if (info.link.indexOf(url) != -1) {
          ok = true
          break
        }

      }
      if (ok) {
        ElMessage({
          message: '收藏失败,链接已经存在！',
          type: 'error',
        })
      } else {

        if (isLeetCodeCircleUrl(url) && url.indexOf('view') != -1) {
          try {
            // 获取实际链接
            url = url.split('view')[0]
          } catch (e) {
            url = window.location.href
          }
        }

        urls.unshift({
          title: document.title,
          link: url,
        })
        Container.style.display = 'block'
        Cache.set(__0x3f_problmes_urls__, urls)
        Cache.set(__0x3f_problmes_update__, true);
        Cache.set(__add_cur__, true)
        ElMessage({
          message: '收藏成功！刷新生效',
          type: 'success',
        })
      }


    })


    VueApp.use(ElementPlus).mount(dom)
  }

}
run()



startStopRanking()








