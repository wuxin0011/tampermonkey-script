
import { ElMessage, ElMessageBox } from 'element-plus'
import Cache from './cache'
import { __0X3F_PROBLEM_KEYS__, isEnglish } from './problems'
import { LC_COPY_HTML_PLUGIN, EN_SOLUTION_DEMO, isZH } from './index.js'
export function Message(title = '确认操作', callback = () => { }, canlcelCallback = () => { }) {
    ElMessageBox.confirm(
        `${title} ?`,
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            callback()
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消',
            })
            canlcelCallback()
        })
}


export function tips_message() {
    if (isEnglish() && isZH() && Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problme_support_type_tips__']) == 'OK') {
        ElMessageBox.alert(
            `<div>
              <p>检查到当前环境为国服,如果需要同步功能需要切换到美服，或者复制一份题单到美服自己使用 否则仅保留替换链接功能，没有同步功能 </p>
              <ul>
                <li>你可以使用<a style="color:blue;" target="_blank" href="${LC_COPY_HTML_PLUGIN}">lc-to-markdown-txt-html</a> 来复制题单 </li>
                <li><a style="color:red;" target="_blank" href="${EN_SOLUTION_DEMO}">查看美服题单示例</a> </li>
              <ul>
             <div>`,
            '提示',
            {
                dangerouslyUseHTMLString: true,
                showCancelButton: true,
                cancelButtonText: '下次再说',
                confirmButtonText: '不再提示'
            }
        ).then((e) => {
            Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problme_support_type_tips__'], 'NO')
        }).catch(e => {
            if (e == 'cancel') {
                Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problme_support_type_tips__']) == 'OK_1'
                ElMessage.warning({
                    message: '下次切换到美服环境提示'
                })
            }
        })
    }


}