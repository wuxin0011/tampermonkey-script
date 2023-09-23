<script setup>
import {ref, onMounted} from 'vue';
import {randomColor} from '@/utils'

const input1 = ref('')
const value = ref([])
const options = [
    {
        value: 'HTML',
        label: 'HTML',
    },
    {
        value: 'CSS',
        label: 'CSS',
    },
    {
        value: 'JavaScript',
        label: 'JavaScript',
    },
]
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
</script>
<template>
    <div>
        <el-alert title="视频标签屏蔽" type="info" class="m-title-item"/>

        <el-row>
            <el-col :span="24">
                <el-select style="width: 300px;" v-model="value" multiple filterable allow-create default-first-option
                           :reserve-keyword="false" placeholder="Choose tags for your article">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
                <el-button type="primary">确认</el-button>
            </el-col>
            <el-col :span="24">
                <el-input v-model="input1" style="width: 300px;" placeholder="查找已过滤标签 请输入关键字"/>
                <el-button type="primary">搜索</el-button>
            </el-col>
        </el-row>

        <div class="m-select-tags">
            <el-tag v-for="i in 100" :type="randomColor()" closable>宠物{{ i }}</el-tag>
        </div>

    </div>
</template>
<style scoped>
.m-title-item {
    margin: 5px 0 10px 0 !important;
}

.el-tag {
    margin: 5px;
}

.el-col {
    margin: 5px 0;
}

.m-select-tags {
    max-height: 60vh;
    overflow: hidden auto;
}
</style>
