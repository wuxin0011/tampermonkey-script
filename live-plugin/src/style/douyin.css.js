
import { is_douyin, isShowHotSearchInputKeyword } from "../utils"



const inputKeywords = () => isShowHotSearchInputKeyword() ? `` : `
#douyin-header>input,
.QSoEc32i>input,
.st2xnJtZ.YIde9aUh {
  color: transparent;
  opacity:0 !important;
}

`




const css = is_douyin ? `
    #related-video-card-login-guide,
    #captcha_container,
    .video-info-detail,
    .JsAsIOEV,
    .wwNZW6za,
    #login-full-panel{
       display:none !important;
    }

    .login-mask-enter-done,
    .box-align-center, {
      display:none ;
    }

    .m-douyin-login{
        display:block !important;
    }

    ::-webkit-scrollbar {
        width: 6px !important;
        background-color: teal !important;
      }
      
      ::-webkit-scrollbar-track {
        background-color: var(--w-bg) !important;
      }
      
      ::-webkit-scrollbar-thumb {
        background-color: var(--w-bg-light) !important;
        border-radius: 6px !important;
      }


      ${inputKeywords()}
      
  
`: ''
export default css
