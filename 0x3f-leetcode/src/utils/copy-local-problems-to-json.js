// https://raw.githubusercontent.com/${owner}/${repo}/${Branch}/${path}
// https://raw.githubusercontent.com//${repo}/${Branch}/${path}
// https://raw.githubusercontent.com/wuxin0011/tampermonkey-script/main/0x3f-leetcode/0x3f.json

async function totJson(){
	return fetch('https://zerotrac.github.io/leetcode_problem_rating/data.json',{
    method:'get',
    mode:"cors"
 }).then(res=>res.json())
}
let json = await totJson()
// console.log(json)
const key = 'zerotrac_JSON'
if(json) {
	// localStorage.setItem('zerotrac_JSON',)
}
let map = new Map()
for(let info of json) {
	// console.log(info)
	map.set(info.TitleSlug,parseInt(info.Rating))
}


const all = Array.from(document.querySelector('.e2v1tt3.css-1ayia3m-MarkdownContent').querySelectorAll('a'))
const isProblems = (url)=>url && url.startsWith('https://leetcode.cn/problems/')
const isMember = (txt)=>txt && txt.indexOf('会员题') != -1
const getTitleSlug = (url)=>{
	try{
		url = url.replace('https://leetcode.cn/problems/','')
		let ss = url.split('/')
		return ss[0]
	}catch(e){
		return ''
	}
}

let ans = []
for(let i = 0;i < all.length;i++) {
	if(all[i].href && isProblems(all[i].href)) {
		let a = all[i]
		let titleSlug = getTitleSlug(a.href)
		if(!titleSlug) continue
		ans.push({
			title : a.textContent,
			url:a.href,
			member:isMember(a?.parentNode?.textContent),
			score:map.get(titleSlug) || 0,
			'titleSlug':titleSlug
		})
	}
}
// console.log('json',ans)
// for(let x of ans) {
// 	console.log(x)
// }
let obj = {
	"title":document.title,
	"problemUrl":window.location.href,
	"problems": ans
}
console.log(obj)