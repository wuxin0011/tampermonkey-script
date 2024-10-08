import { createApp } from 'vue';
import App from './App.vue';
import CopyTestCase from './copy-run/CopyTestCase.vue';
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import { ElMessage, ElMessageBox } from 'element-plus'
import Cache from './utils/cache'
import { GM_registerMenuCommand } from '$'
import { Message } from './utils/message';
import { submitProblems, install_pos, __0X3F_PROBLEM_KEYS__, support_plugins, initObj, initUrls, addProcess } from './utils/problems'
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

const isTest = true

function run() {
  loadID++
  if (isProblem(local_url) || isContest(local_url)) {
    // 首次加载访问
    if (isProblem(local_url) && loadID == 1) {
      submitProblems(local_url)
    }



    if (!isTest && isProblem() && !document.querySelector('.copy-run-container')) {
      // TODO 测试阶段功能暂时不发布
      let con = document.createElement('div');
      con.className = 'copy-run-container'
      const body = document.querySelector('body')
      body.append(con)
      const VueApp = createApp(CopyTestCase)
      VueApp.use(ElementPlus).mount(con)
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
        submitbutton.addEventListener('click', () => {
          // console.log('click submit button')
          submitProblems(local_url, 10 * 1000)
        })
        watchDom(submitbutton)
      } else if (loadID < 10) {
        run()
      }
    }, 3000);

  } else if (isLeetCodeCircleUrl(local_url)) {

    let Container = null
    let ok = Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_button_is_none__'], true, Boolean.name)
    const start = () => {
      Container = document.createElement('div');
      const body = document.querySelector('body')
      body.append(Container)
      // Container.style.height = '100vh'
      Container.style.display = ok && support_plugins() ? 'block' : 'none'
      return Container
    }
    let dom = start()


    const VueApp = createApp(App)

    GM_registerMenuCommand(`${ok ? '隐藏按钮' : '显示按钮'}`, () => {
      ok = !ok
      // console.log('ok????', ok)
      Container.style.display = ok ? 'block' : 'none'
      Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_button_is_none__'], ok)
    }, { title: '可以手动关闭或者显示按钮 默认显示 刷新生效' })


    GM_registerMenuCommand(`安装到${install_pos() ? '右侧' : '左侧'}`, () => {
      Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_insert_pos__'], install_pos())
      window.location.reload()
    }, { title: 'AC标记安装位置，默认左侧，刷新生效' })


    GM_registerMenuCommand(`清空题目状态缓存`, () => {
      Message('确认清空题目状态缓存', () => {
        Cache.remove(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'])
        window.location.reload()
      })
    }, { title: '如果题目状态出现问题，可以试试,一般情况下不建议使用' })
    GM_registerMenuCommand(`同步题目状态`, () => {
      Message('确认同步题目状态', () => {
        addProcess(true, undefined, true)
      })
    }, { title: '如果不在同一个浏览器答题，会出现ac题目状态没有及时同步，可以使用此功能' })
    GM_registerMenuCommand(`${initObj().onlyUrls ? '仅在收藏题单页面生效' : '所有题单生效'}`, () => {
      const u = initObj()
      u.onlyUrls = !u.onlyUrls
      Container.style.display = support_plugins() ? 'block' : 'none'
      Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_solution__'], u)
    }, { title: '插件默认会在所有讨论发布页生效，如果只想在收藏链接生效，可以使用此功能' })
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
        Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_urls__'], urls)
        Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_update__'], true);
        Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_add_cur__'], true)
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







