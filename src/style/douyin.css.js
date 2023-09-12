
import { is_douyin } from "../utils"
const css = is_douyin ? `
    #related-video-card-login-guide,
    #captcha_container,
    .JsAsIOEV,
    #login-full-panel{
       display:none !important;
    }
  .m-container {
    --m-container-height: 56px;
    z-index: 10 !important;
  }

  .m-container table {
    display: none !important;
  }
  
`: ''
export default css
