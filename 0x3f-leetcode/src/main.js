import ElementPlus from 'element-plus';
import { createApp } from 'vue';
import App from './App.vue';
import CopyTestCase from './copy-run/CopyTestCase.vue';

import { GM_registerMenuCommand } from '$';
import { ElMessage } from 'element-plus';
import 'element-plus/dist/index.css';
import Cache from './utils/cache';
import {
  isLeetCodeCircleUrl,
  isProblem,
  sleep,
  isZH,
  isHome,
  isDev
} from './utils/index';
import { Message, tips_message, update_version,stop_disscuss_command } from './utils/message';
import { __0X3F_PROBLEM_KEYS__, isEnglish, installEnglishLinkChangeCommand, addProcess, resetProblemStatus, initObj, initUrls, install_pos, randomProblem, showProblemSolve,handlerScore } from './utils/problems';

import {
  startStopRanking
} from './utils/contest';
import { watchSubmit } from './utils/watch-submit';

const local_url = window.location.href
const isTest = true

const randomProblemKey = () => Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_random_problems_key__']) == undefined ? true : Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_random_problems_key__'])


let Container = null

// 安装操作容器
// 题目页
// 讨论发布页
// 主页
if (isProblem() || isLeetCodeCircleUrl() || isHome() ) {
  if(isDev()) {
    console.log('isHome================>')
  }
  const start = () => {
    Container = document.createElement('div');
    const body = document.querySelector('body')
    body.append(Container)
    // Container.style.height = '100vh'
    // Container.style.display = ok && support_plugins() ? 'block' : 'none'
    Container.style.display = 'block'
    return Container
  }
  let dom = start()
  const VueApp = createApp(App)
  VueApp.use(ElementPlus).mount(dom)
}



// 安装命令
if ((isProblem()) || isLeetCodeCircleUrl() || isHome()) {

  GM_registerMenuCommand(`随机一道题 ☕`, randomProblem, { title: '随机一道题目，你可以通过ctrl+atl+j显示一道题目' })

  GM_registerMenuCommand(`${randomProblemKey() ? '关闭' : '启用'} 随机题目快捷键 ☕`, () => {
    Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_random_problems_key__'], !randomProblemKey())
    window.location.reload()
  }, { title: '该功能是随机一道题的快捷键，你可以通过ctrl+atl+j显示一道题目' })

  if (isLeetCodeCircleUrl()) {
    installEnglishLinkChangeCommand()
  }
  if (randomProblemKey()) {
    document.addEventListener('keydown', async function (event) {
      // 在MacOS里Alt+J是一个特殊字符 ∆，所以需要使用code来判断
      const isJ = event.code === 'KeyJ' || event.key === 'j'
      if (event.ctrlKey && event.altKey && isJ) {
        // that.isShowContainer()
        randomProblem()
      }
    });
  }

}

let loadID = 0
async function run() {
  loadID++
  if (isProblem(local_url)) {
    // 首次加载访问
    await sleep(3000)
    if (isProblem(local_url) && loadID == 1) {
      // submitProblems(local_url)
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




  } else if (isLeetCodeCircleUrl(local_url)) {
    


    // GM_registerMenuCommand(`${ok ? '隐藏按钮' : '显示按钮'}`, () => {
    //   ok = !ok
    //   // console.log('ok????', ok)
    //   Container.style.display = ok ? 'block' : 'none'
    //   Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_button_is_none__'], ok)
    // }, { title: '可以手动关闭或者显示按钮 默认显示 刷新生效' })

    stop_disscuss_command()


    GM_registerMenuCommand(`安装到${install_pos() ? '右侧' : '左侧'} 🎁`, () => {
      Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_insert_pos__'], install_pos())
      window.location.reload()
    }, { title: 'AC标记安装位置，默认左侧，刷新生效' })




    GM_registerMenuCommand(`同步题目状态 🚀`, () => {
      Message('确认同步题目状态', async () => {
        await addProcess(true, undefined, true)
      })
    }, { title: '如果不在同一个浏览器答题，会出现ac题目状态没有及时同步，可以使用此功能' })

    GM_registerMenuCommand(`${initObj().onlyUrls ? '仅在收藏题单页面生效' : '所有题单生效'}`, () => {
      const u = initObj()
      u.onlyUrls = !u.onlyUrls
      // Container.style.display = support_plugins() ? 'block' : 'none'
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


  }

}

async function startMain() {
  for(let callback of [showProblemSolve,tips_message,update_version,watchSubmit,run,startStopRanking,handlerScore,resetProblemStatus]) {
    try{callback()}catch(_){
      if(isDev()) {
        console.error(_)
      }
    }
  }
}

startMain()






