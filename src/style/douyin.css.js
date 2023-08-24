
import { is_douyin } from "../utils"
const css = is_douyin ? `
#related-video-card-login-guide,
#captcha_container,
#login-full-panel{
display:none !important;
}
`: ''
export default css
