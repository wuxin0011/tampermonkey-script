
import { install_pos } from './problems'
const width = 14
const height = 14



export const problemFinsh = () => `

<svg width="${width}px" height="${height}px" status="ac" viewBox="0 0 1024 1024"  version="1.1"
xmlns="http://www.w3.org/2000/svg">
<path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#4CAF50" />
<path
    d="M738.133333 311.466667L448 601.6l-119.466667-119.466667-59.733333 59.733334 179.2 179.2 349.866667-349.866667z"
    fill="#CCFF90" />
</svg>

`

export const problemsTry = () => `
<svg width="${width}px" height="${height}px" status="notac" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#FEDEA1;" d="M256,12.8C121.899,12.8,12.8,121.899,12.8,256S121.899,499.2,256,499.2S499.2,390.101,499.2,256
S390.101,12.8,256,12.8z" />
<g>
    <path style="fill:#573A32;" d="M256,115.2c-49.271,0-92.561,25.353-117.726,63.676l18.859,18.859
C177.178,163.806,213.734,140.8,256,140.8c63.625,0,115.2,51.567,115.2,115.2h-38.4l51.2,51.2l51.2-51.2h-38.4
C396.8,178.244,333.764,115.2,256,115.2z" />
    <path style="fill:#573A32;" d="M256,0C114.62,0,0,114.62,0,256s114.62,256,256,256s256-114.62,256-256S397.38,0,256,0z M256,486.4
C128.956,486.4,25.6,383.044,25.6,256S128.956,25.6,256,25.6S486.4,128.956,486.4,256S383.044,486.4,256,486.4z" />
    <path style="fill:#573A32;" d="M256,371.2c-63.625,0-115.2-51.567-115.2-115.2h38.4L128,204.8L76.8,256h38.4
c0,77.756,63.036,140.8,140.8,140.8c49.272,0,92.561-25.353,117.726-63.676l-18.859-18.859
C334.822,348.194,298.266,371.2,256,371.2z" />
</g>
</svg>

`

// 暂时移出没有做个题目状态
export const problemsNo = () => install_pos() ? `
<svg width="${width}px" height="${height}px" status="null" viewBox="0 0 24 24" id="meteor-icon-kit__regular-circle" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z" fill="#758CA3"/></svg>
`
    :
    ``