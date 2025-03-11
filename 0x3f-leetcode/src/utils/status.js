
import { isBilibili, isContest, isLeetCodeCircleUrl,isEnglishENV } from '.'
import { install_pos, STATUS,isNewUI } from './problems'
const width = 14
const height = 14

// svg css
const svg_css_style = ()=> isNewUI() ?  "display:inline;margin-bottom:3px;" : ''

// svg: https://www.svgviewer.dev/

export const bilibiliSVG = () => {
    return `<svg width="${width}px" height="${height}px" style="${svg_css_style()}" status="bilibili" title="bilibili" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#00a3d9">
  <path fill="none" d="M0 0h24v24H0z"></path>
  <path d="M18.223 3.086a1.25 1.25 0 0 1 0 1.768L17.08 5.996h1.17A3.75 3.75 0 0 1 22 9.747v7.5a3.75 3.75 0 0 1-3.75 3.75H5.75A3.75 3.75 0 0 1 2 17.247v-7.5a3.75 3.75 0 0 1 3.75-3.75h1.166L5.775 4.855a1.25 1.25 0 1 1 1.767-1.768l2.652 2.652q.119.119.198.257h3.213q.08-.14.199-.258l2.651-2.652a1.25 1.25 0 0 1 1.768 0m.027 5.42H5.75a1.25 1.25 0 0 0-1.247 1.157l-.003.094v7.5c0 .659.51 1.199 1.157 1.246l.093.004h12.5a1.25 1.25 0 0 0 1.247-1.157l.003-.093v-7.5c0-.69-.56-1.25-1.25-1.25zm-10 2.5c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25m7.5 0c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25"></path>
</svg>
`
}



export const problemContenst = () =>
    `
<svg width="${width}px" height="${height}px" style="${svg_css_style()}" status="contest" title="竞赛题目专属图标" viewBox="-3.5 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.73795 18.8436L12.9511 20.6987L6.42625 32L4.55349 27.8233L9.73795 18.8436Z" fill="#CE4444"/>
<path d="M9.73795 18.8436L6.52483 16.9885L0 28.2898L4.55349 27.8233L9.73795 18.8436Z" fill="#983535"/>
<path d="M14.322 18.8436L11.1088 20.6987L17.6337 32L19.5064 27.8233L14.322 18.8436Z" fill="#983535"/>
<path d="M14.322 18.8436L17.5351 16.9885L24.0599 28.2898L19.5064 27.8233L14.322 18.8436Z" fill="#CE4444"/>
<path d="M22.9936 11.0622C22.9936 17.1716 18.0409 22.1243 11.9314 22.1243C5.82194 22.1243 0.869249 17.1716 0.869249 11.0622C0.869249 4.9527 5.82194 0 11.9314 0C18.0409 0 22.9936 4.9527 22.9936 11.0622Z" fill="url(#paint0_linear_103_1801)"/>
<path d="M20.5665 11.0621C20.5665 15.8311 16.7004 19.6972 11.9315 19.6972C7.16247 19.6972 3.29645 15.8311 3.29645 11.0621C3.29645 6.29315 7.16247 2.42713 11.9315 2.42713C16.7004 2.42713 20.5665 6.29315 20.5665 11.0621Z" fill="#A88300"/>
<path d="M21.0477 11.984C21.0477 16.7641 17.1727 20.6391 12.3926 20.6391C7.61251 20.6391 3.73748 16.7641 3.73748 11.984C3.73748 7.20389 7.61251 3.32887 12.3926 3.32887C17.1727 3.32887 21.0477 7.20389 21.0477 11.984Z" fill="#C28B37"/>
<path d="M20.5868 11.0621C20.5868 15.8422 16.7118 19.7172 11.9317 19.7172C7.15159 19.7172 3.27656 15.8422 3.27656 11.0621C3.27656 6.28205 7.15159 2.40702 11.9317 2.40702C16.7118 2.40702 20.5868 6.28205 20.5868 11.0621Z" fill="#C09525"/>
<path d="M11.9781 5.04096L13.8451 8.77502L17.5792 9.24178L15.0151 12.117L15.7122 16.2431L11.9781 14.3761L8.24404 16.2431L8.94729 12.117L6.37701 9.24178L10.1111 8.77502L11.9781 5.04096Z" fill="url(#paint1_linear_103_1801)"/>
<defs>
<linearGradient id="paint0_linear_103_1801" x1="11.1804" y1="4.03192" x2="12.6813" y2="31.965" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFC600"/>
<stop offset="1" stop-color="#FFDE69"/>
</linearGradient>
<linearGradient id="paint1_linear_103_1801" x1="11.9783" y1="5.04096" x2="11.9783" y2="16.2431" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFFCDD"/>
<stop offset="1" stop-color="#FFE896"/>
</linearGradient>
</defs>
</svg>

`

export const problemFinsh = () => `

<svg width="${width}px" height="${height}px" style="${svg_css_style()}" status="ac" title="AC专属图标" viewBox="0 0 1024 1024"  version="1.1"
xmlns="http://www.w3.org/2000/svg">
<path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#4CAF50" />
<path
    d="M738.133333 311.466667L448 601.6l-119.466667-119.466667-59.733333 59.733334 179.2 179.2 349.866667-349.866667z"
    fill="#CCFF90" />
</svg>

`

export const problemsTry = () => `
<svg width="${width}px" height="${height}px"  style="${svg_css_style()}" status="notac" title="尝试过" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
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

export const problemsNo = () => install_pos() ? `
<svg width="${width}px" height="${height}px" style="${svg_css_style()}" status="null" title="未尝试" viewBox="0 0 24 24" id="meteor-icon-kit__regular-circle" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z" fill="#758CA3"/></svg>
`
    :
    ``






export const createStatus = (status, link) => {
    let node;
    status == null ? 'null' : status
    if (!link) {
        return;
    }
    const curUrl = link?.href ?? (link.querySelector('a')?.href)
    node = link instanceof HTMLAnchorElement ? link.parentElement : link
    if (node) {
        node.status = status
    }
    let installSVG = ''
    // add v.0.5.2 竞赛
    if (isContest(curUrl)) {
        installSVG = problemContenst()
    }
    else if (isLeetCodeCircleUrl(curUrl)) {
        // installSVG = discussSVG()
    }
    else if (isBilibili(curUrl)) {
        installSVG = bilibiliSVG()
    } else {
        if (status == STATUS['AC']) {
            installSVG = problemFinsh()
        } else if (status == STATUS['notac']) {
            installSVG = problemsTry()
        } else if (status == STATUS['NO']) {
            installSVG = problemsNo()
        }

    }



    let svg = node.querySelector('svg')
    if (svg) {
        if (svg.getAttribute('status') == status || svg.getAttribute('status') == STATUS['AC']) {
            return false;
        }
        svg.remove()
    }

    if (isBilibili(curUrl)) {
        node.innerHTML = (node.innerHTML + "&nbsp;" +  installSVG)
    } else {
        node.innerHTML = install_pos() ? (installSVG + node.innerHTML) : (node.innerHTML + installSVG)
    }


    return true
}