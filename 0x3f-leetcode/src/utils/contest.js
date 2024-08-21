import { isContest } from './index'
import { GM_registerMenuCommand } from '$'
import Cache from './cache'
const stopRankingKey = '__is_stop_rating_ranking__'
let cnt = 1000
let conetstTimeId = null

function run() {
    cnt--;
    const container = document.querySelector('.contest-question-info .list-group');
    // console.log(container)
    if (!container) return;
    const ls = Array.from(container.querySelectorAll('.list-group-item .pull-right'))
    for (let i = 0; i < 4; i++) {
        if (i >= ls.length) {
            break;
        }
        if (ls[i] instanceof HTMLElement) {
            ls[i].textContent = '0'
        }
    }
    window.clearInterval(conetstTimeId)
}

export function startStopRanking() {
    if (!isContest(window.location.href)) {
        return;
    }
    const isNext = !!document.querySelector('#__next')
    if (isNext) {
        return
    }
    const use = Cache.get(stopRankingKey)
    if (use) {
        conetstTimeId = setInterval(() => {
            run()
        }, 10);
    }
    GM_registerMenuCommand(`${use ? '使用' : '关闭'} 排行榜`, () => {
        Cache.set(stopRankingKey, !use)
        window.location.reload()
    }, { title: '对于不想看到排行榜的可以使用此功能 默认开启' })
}


