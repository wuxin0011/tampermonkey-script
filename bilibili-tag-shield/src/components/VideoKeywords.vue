

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { Type } from '@/constant'
import { GM_setValue, GM_getValue } from '$'
import { ElMessage } from 'element-plus'
import { } from 'element-plus'
import { randomColor } from '@/utils'

const inputValue = ref('')
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const InputRef = ref()



const add = () => {
  let n = v ?? []
  GM_setValue(Type.keywords, [...n, keywords.value])
  ElMessage({
    type: 'success',
    message: `关键字 【 ${keywords.value}】添加成功！`
  })
  local_keywords.value.push(keywords.value)
}

const remove = () => GM_setValue(Type.keywords, '')
const handleClose = (tag) => {
  console.log('handler close',tag);
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    console.log('InputRef.value',InputRef.value);
    // InputRef.value.input.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}



onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
</script>
<template>
  <div>
    <el-alert title="关键字屏蔽" type="info" class="m-title-item"/>
    <el-tag 
    v-for="tag in dynamicTags" 
    :key="tag" class="mx-1" 
    :disable-transitions="false"
    @close="handleClose(tag)"
    closable 
    >
      {{ tag }}
    </el-tag>
    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="m-add-keywords-tag" size="small"
      @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
    <el-button v-else  size="small" @click="showInput">
      + New Tag
    </el-button>
  </div>
</template>
<style scoped >

.m-title-item {
  margin:5px !important;
}
.el-tag {
  margin: 5px;
}

.m-add-keywords-tag {
  width: 100px;
}
</style>
