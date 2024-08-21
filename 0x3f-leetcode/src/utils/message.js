
import { ElMessage, ElMessageBox } from 'element-plus'
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