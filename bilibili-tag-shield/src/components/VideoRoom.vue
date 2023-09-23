<script setup>
import {GM_setValue} from '$'
import { getBiliBiliInfoByVideoID } from '@/api'
import {ref} from 'vue'

const input1 = ref('')
const isLoading = ref(false)
console.log('GM_setValue', GM_setValue);


const tableData = [
    {
        name: 'username1',
        roomId: 'roomId1',
    },
    {
        name: 'username2',
        roomId: 'roomId2',
    },
    {
        name: 'username2',
        roomId: 'roomId2',
    }
]


</script>

<template>
    <div>
        <el-alert title="房间号屏蔽" type="info " class="m-title-item"/>
        <div>
            <el-input v-model="input1" style="width: 50%;" placeholder="请输入房间号或者视频地址"/>
            <el-button type="primary">搜索</el-button>
        </div>
        <el-table :data="tableData" height="250" style="width:auto;">
            <el-table-column label="序号" width="120" type="index"/>
            <el-table-column prop="name" label="名称" width="120"/>
            <el-table-column prop="roomId" label="房间号" width="320"/>
            <el-table-column label="操作">
                <el-button type="danger">删除</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<style scoped>

.m-title-item {
    margin: 5px !important;
}

.select-item {
    margin-top: 20px;
}
</style>
