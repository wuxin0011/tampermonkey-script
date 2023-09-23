<script setup>
import { ref } from 'vue'
import Container from '@/components/Container.vue'
const drawer = ref(false)

</script>

<template>
  <div>
    <el-button type="primary" style="margin-left: 16px" @click=" drawer = !drawer" class="m-setting-button">
      设置
    </el-button>
  </div>
  <el-drawer v-model="drawer" :with-header="false" size="40%">

    <template #default>
      <Container />
    </template>
    <template #footer>
      <h1>欢迎使用Bilibili视频屏蔽插件</h1>
    </template>
  </el-drawer>
</template>

<style scoped>
.m-setting-button {
  position: fixed;
  top: 200px;
  right: 0;
  z-index: 10000000;
}
</style>
