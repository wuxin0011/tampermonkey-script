
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


  const LOGIN_BOX = {
    'huya': {
      [login_box]: '#UDBSdkLgn',
      [login_btn]: '[class^=HeaderDynamic] [class^=Login] [class^=LoginHd] span',
      [cancel_btn]: '#close-udbLogin'
    },
    'douyin-lg': {
      [login_box]: '[class^=login-full-panel]',
      [login_btn]: '#_7hLtYmO>button',
      [cancel_btn]: '.dy-account-close'
    },
    'douyin-sm': {
      [login_box]: '[class^=login-full-panel]',
      [login_btn]: '#tcTjz3nj',
      [cancel_btn]: '.dy-account-close'

    }
  }

  const addLoginCancel = (loginSelector, loginBtnCancel) => {

    let loginContainer = document.querySelector(loginSelector)
    if (!(loginContainer instanceof HTMLElement)) {
      return;
    }

    console.log('login cancel 扫描中...')
    let timer = setInterval(() => {
      let closeBtn = loginContainer.querySelector(loginBtnCancel)
      if (closeBtn) {
        clearInterval(timer)
        console.log('cancel button 已经找到了', closeBtn)
        closeBtn.addEventListener('click', () => {
          console.log('click me!', loginContainer)
        })
      }
    }, 1000);


  }

  const handlerLogin = (loginSelector, loginBtnSelector, loginBtnCancel) => {


    let timer = setInterval(() => {
      let loginContainer = document.querySelector(loginSelector)
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

      
      const btn = document.querySelector(loginBtnSelector)
      if (btn) {
        btn.onclick = () => {
          console.log('click me login !')
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
        }


      }
    }, 100)






  }




  const addEventLoginContainer = () => {
    Object.values(LOGIN_BOX).forEach(item => {
      console.log('item', item)
      handlerLogin(item[login_box], item[login_btn], item[cancel_btn])

    })
  }


  addEventLoginContainer()



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
