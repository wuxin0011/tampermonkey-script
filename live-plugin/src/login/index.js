
const login = () => {
  const addStyle = (str) => {
    const head = document.querySelector('head')
    const s = document.createElement('style')
    s.innerHTML = str
    head.appendChild(s)
  }

  const login_box = 'login-box'
  const login_btn = 'login-btn'
  const cancel_btn = 'cancel-btn'

  const localUrl = window.location.href
  const huyaLogin = () => /https?:\/\/.*\.huya\.com\/.*/.test(localUrl)
  const douyinLogin = () => /https?:\/\/.*\.douyin\.com\/.*/.test(localUrl)
  const bilibiliLogin = () => /https?:\/\/.*\.bilibili\.com\/.*/.test(localUrl)
  const douyuLogin = () => /https?:\/\/.*\.douyu\.com\/.*/.test(localUrl)


  const hy = [{
    [login_box]: '#HUYA-UDBSdkLgn',
    [login_btn]: '[class^=HeaderDynamic] [class^=Login] [class^=LoginHd] span',
    [cancel_btn]: '#UDBSdkLgn-box .close-layer'
  }]


  const douyin = [{
    [login_box]: '[id^=login-full-panel]',
    [login_btn]: '#_7hLtYmO>button',
    [cancel_btn]: '.dy-account-close'
  }, {
    [login_box]: '[id^=login-full-panel]',
    [login_btn]: '#tcTjz3nj',
    [cancel_btn]: '.dy-account-close'
  }]


  let LOGIN_BOX = []
  const addLoginCancel = (loginSelector, loginBtnCancel) => {

    let loginContainer = document.querySelector(loginSelector)
    if (!(loginContainer instanceof HTMLElement)) {
      return;
    }

    if (loginContainer.classList.contains('m-display-block')) {
      loginContainer.classList.remove('m-display-block')
    }

    console.log('login cancel 扫描中...')
    let timer = setInterval(() => {
      let closeBtn = loginContainer.querySelector(loginBtnCancel)
      if (closeBtn && closeBtn.mark) {
        clearInterval(timer)
        return;
      }
      if (closeBtn && !closeBtn.mark) {
        console.log('cancel button 已经找到了', closeBtn)
        closeBtn.mark = true
        closeBtn.addEventListener('click', () => {
          console.log('click me!', loginContainer)
        })
      }
    }, 1000);


  }

  const handlerLogin = (loginSelector, loginBtnSelector, loginBtnCancel) => {
    let loginContainer = null

    let timer = setInterval(() => {
      loginContainer = document.querySelector(loginSelector)
      if (!loginContainer) {
        return
      }
      if (loginContainer.mark) {
        clearInterval(timer)
        return;
      }
      loginContainer.mark = true
      if (loginContainer && !loginContainer.classList.contains('m-display-none')) {
        loginContainer.classList.add('m-display-none')
      }
    }, 100)



    let timer1 = setInterval(() => {
      const btn = document.querySelector(loginBtnSelector)
      if (btn && btn.mark) {
        clearInterval(timer1)
        return;
      }
      if (btn && !btn.mark) {
        btn.mark = true
        btn.addEventListener('click', () => {
          loginContainer = document.querySelector(loginSelector)
          if (loginContainer) {
            // open
            if (loginContainer.classList.contains('m-display-none')) {
              loginContainer.classList.remove('m-display-none')
              if (!loginContainer.classList.contains('m-display-block')) {
                loginContainer.classList.add('m-display-block')
              }
              addLoginCancel(loginSelector, loginBtnCancel)

            } else {
              // close
              if (loginContainer.classList.contains('m-display-block')) {
                loginContainer.classList.remove('m-display-block')
              }
              if (!loginContainer.classList.contains('m-display-none')) {
                loginContainer.classList.add('m-display-none')
              }

            }

          }
          console.log('click me login !', loginContainer)
        })
      }
    }, 100)



  }


  const initbox = () => {

    if (huyaLogin()) {
      LOGIN_BOX = [...hy]
    } else if (douyinLogin()) {
      LOGIN_BOX = [...douyin]
    } else if (douyuLogin()) {

    } else if (bilibiliLogin()) {

    }
    LOGIN_BOX.forEach(item => {
      handlerLogin(item[login_box], item[login_btn], item[cancel_btn])
    })
  }

  initbox()



  const loginCss = `
  .m-display-block {
      display:block !important;
  }
  .m-display-none {
      display:none !important;
  }
`
  addStyle(loginCss)
}


export default login
