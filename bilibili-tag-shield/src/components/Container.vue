<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import VideoTag from '@/components/VideoTag.vue';
import VideoRoom from '@/components/VideoRoom.vue';
import VideoKeywords from '@/components/VideoKeywords.vue';
import VideoRegex from '@/components/VideoRegex.vue';
import { Type } from '@/constant'


const type = ref(Type.room)

const handleSelectRoomType = (t) => type.value = t

</script>

<template>
  <div>
    <el-button-group>
      <el-button type="primary" @click="type = Type.room">房间号</el-button>
      <el-button type="primary" @click="type = Type.tag">标签</el-button>
      <el-button type="primary" @click="type = Type.keywords">关键字</el-button>
      <el-button type="primary" @click="type = Type.regex">正则</el-button>
    </el-button-group>
    <el-row gutter="20">
      <el-col v-if="type == Type.room" class="select-item">
        <VideoRoom />
      </el-col>
      <el-col v-if="type == Type.tag" class="select-item">
        <VideoTag />
      </el-col>
      <el-col v-if="type == Type.keywords" class="select-item">
        <VideoKeywords />
      </el-col>
      <el-col v-if="type == Type.regex" class="select-item">
        <VideoRegex />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.select-item {
  margin-top: 20px;
}
</style>
