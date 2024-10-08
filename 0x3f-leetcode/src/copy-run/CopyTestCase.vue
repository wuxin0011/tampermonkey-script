<script setup>
import { reactive, ref, watch, toRaw, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { parse } from './parse.js'
import { GM_setClipboard } from '$'

const drawer = ref(false)

const copy = () => {
    try {
        let t = parse()
        // console.log(!!t)
        if (t) {
            GM_setClipboard(t);
            console.log('复制成功🥰！')
            ElMessage.success('复制成功🥰！')
        } else {
            console.log('info = ', t)
            ElMessage.error('复制失败😅！')
            console.log('复制失败😅！')
        }
    } catch (e) {
        console.log(e)
        ElMessage.error(e.message)
    }

}

const viewSetting = () => {
    // drawer.value = !drawer.value
    copy()
}


</script>

<template>
    <div>
        <el-button type="success" style="" @click="viewSetting" class="m-setting-button m-button" circle size="large">
            CP
        </el-button>
        <!-- <el-drawer v-model="drawer" size="30%" :with-header="false" style="position: fixed !important;" direction="rtl">
            <template #default>
                <el-button type="primary" @click="copy">
                    copy
                </el-button>

            </template>
</el-drawer> -->
    </div>


</template>

<style scoped>
.m-setting-button {
    position: fixed;
    top: 200px;
    right: 0;
    z-index: 100000;
}

.m-button {
    margin-left: 16px !important;
    padding: 5px !important;
    font-size: 14px !important;
}

.processs-flex {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
