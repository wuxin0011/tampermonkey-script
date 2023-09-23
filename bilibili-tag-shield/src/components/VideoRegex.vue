

<script setup>
import { ref, onMounted } from 'vue';
const regex = ref('')
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
</script>
<template>
  <div>
    <el-alert title="正则匹配" type="info" class="m-title-item"/>
    <el-row>
      <el-col :span="14">
        <el-input v-model="regex" style="width"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary">确认</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped >
.m-title-item {
  margin:5px !important;
}
</style>
