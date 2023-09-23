
// douyin
for(let div of document.querySelectorAll('.xgplayer-danmu>div')){
  console.log(div.textContent)
    if(div.textContent.indexOf('哈哈') !==-1){
        div.remove()
        console.error('remove',div.textContent)
    }
}

for(let div of document.querySelectorAll('.xgplayer-danmu>div')){
  console.log(div.getAttribute('dm-mark-version'))
}


// hy
for(let div of document.querySelectorAll('#player-video #danmuwrap #danmudiv .danmu-item')){
  console.log(div.textContent)
    if(div.textContent.indexOf('哈哈') !==-1){
        div.remove()
        console.error('remove',div.textContent)
    }
}

for(let div of document.querySelectorAll('#player-video #danmuwrap #danmudiv .danmu-item')){
  console.log(div.getAttribute('dm-mark-version'))
}
