
import { is_douyin } from "../utils"
const css = is_douyin ? `
    #related-video-card-login-guide,
    #captcha_container,
    .JsAsIOEV,
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
      
  
`: ''
export default css
