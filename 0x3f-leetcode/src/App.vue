<script setup>
import { reactive, ref, watch, toRaw, computed, onMounted } from 'vue'
import Cache from './utils/cache'
import { ElMessage, ElMessageBox } from 'element-plus'
import Q1 from './components/Q1.vue'
import { isProblem } from './utils/index'
import {
  handlerProblem,
  __0x3f_problmes_solution__,
  __add_cur__,
  __0x3f_problmes_urls__,
  __0x3f_problmes_update__,
  initObj,
  initUrls,
  support_plugins,
  addProcess,
  getProcess,
  defaultUrls,
  queryProblem
} from './utils/problems'


const isTest = false

let totProblem = ref(0)
let finishProblem = ref(0)
const drawer = ref(false)
const viewSetting = () => {
  drawer.value = !drawer.value
  let [cur, tot] = getProcess()
  finishProblem.value = cur
  totProblem.value = tot
}

const finishProcess = computed(() => {
  try {
    const s = String(finishProblem.value / totProblem.value)
    let x1 = s.split('.')[1].padEnd(3).substring(0, 3)
    return Math.min(100, Number(x1) / 10)
  } catch (e) {
    return (finishProblem.value / totProblem.value).toFixed(3) * 100
  }
})
const processColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#1989fa', percentage: 40 },
  { color: '#e6a23c', percentage: 60 },
  { color: '#6f7ad3', percentage: 80 },
  { color: '#5cb87a', percentage: 100 },
]
const fromData = reactive(initObj())
// 处理分数显示逻辑
watch(fromData, () => {
  handlerProblem(toRaw(Object.assign({}, fromData)))
})

let tableData = reactive(initUrls())
const keywords = ref('')
const dialogTableVisible = ref(false)
const urlsData = computed(() => tableData.filter(v => v && v.title && v.title.indexOf(keywords.value) != -1))
const isDisabbled = computed(() => !!tableData.find(v => v?.link && v?.link.indexOf(window.location.href) != -1))
const dialogFormVisible = ref(false)
const formLabelWidth = '44px'
const info = reactive({
  title: '',
  link: '',
  status: 'add'
})


const addlocal = () => {
  if (!isDisabbled) {
    return
  }
  tableData.unshift({ title: document.title, link: window.location.href })
}

const updateIndex = ref(-1)

const showProblems = () => {
  dialogTableVisible.value = true
  let o = Cache.get(__add_cur__) == 'true' || Cache.get(__add_cur__) == true
  if (o) {
    addlocal()
  }
}

const handlerProblems = (status, updateInfo = { title: '', link: '' }, index = -1) => {
  dialogFormVisible.value = true
  info.status = status
  updateIndex.value = index
  Object.assign(info, updateInfo)
}
const handlerMessage = (u, title, link) => {
  const a = u ? '添加' : '修改'
  const error = !title || !/https?:\/\/.*/.test(link)
  if (error) {
    ElMessage.error(`${a} 失败 请保证标题或者链接有效 `)
  } else {
    ElMessage.success(`${a} 成功 `)
  }
  return !error
}
const addOrUpdate = () => {

  if (!handlerMessage(info.status == 'add', info.title, info.link)) {
    return
  }
  if (info.status == 'add') {
    tableData.unshift({ title: info.title, link: info.link })
  } else {
    let index = updateIndex.value
    if (index != -1 && index < tableData.length) {
      tableData[index].link = info.link
      tableData[index].title = info.title
    }
  }
  dialogFormVisible.value = false
}

const deleteProblems = (index) => {
  tableData.splice(index, 1)
  Cache.set(__0x3f_problmes_urls__, toRaw(tableData))
}

const handlerDefault = () => {
  ElMessageBox.confirm(
    '确认使用默认题单，将会重置题单?',
    '警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      for (let i = 0; i < tableData.length; i++) {
        delete tableData[i]
      }
      for (let item of defaultUrls) {
        tableData.unshift(item)
      }
      ElMessage({
        type: 'success',
        message: '重置成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消重置',
      })
    })
}


window.addEventListener('beforeunload', () => {
  Cache.set(__0x3f_problmes_urls__, toRaw(tableData).filter(u => u != null && u != undefined))
  Cache.set(__0x3f_problmes_update__, true)
  Cache.set(__add_cur__, false)
})

onMounted(() => {
  if (support_plugins()) {
    let times = 30
    let loadTimeId = setInterval(() => {
      let a = queryProblem()
      times--
      if (Array.isArray(a) && a.length > 0) {
        handlerProblem(toRaw(Object.assign({}, fromData)))
        addProcess()
        window.clearInterval(loadTimeId)
      }
      if (times == 0) {
        window.clearInterval(loadTimeId)
      }
    }, 200);

    setInterval(() => {
      addProcess(false)
    }, 1000 * 30)
  }
})


const q1 = ref(false)

</script>

<template>
  <div>
    <el-button type="primary" style="" @click="viewSetting" class="m-setting-button m-button" circle size="large">
      0X3F
    </el-button>
  </div>
  <el-drawer v-model="drawer" :with-header="false" size="30%">
    <template #default>
      <div class="processs-flex">
        <el-progress type="circle" :percentage="finishProcess" :color="processColors">
          <template #default="{ percentage }">
            <p>{{ percentage }}%</p>
          </template>
        </el-progress>
      </div>
      <p style="text-align: center;color:#121212;"> {{ finishProblem }} / {{ totProblem }}</p>
      <template v-if="isTest">
        <el-button @click="finishProblem += 10">add {{ finishProblem }}</el-button>
        <el-button @click="finishProblem -= 10">add {{ finishProblem }}</el-button>
      </template>
      <el-divider />
      <el-form label-position="left" label-width="auto" :model="fromData" style="max-width: 600px">
        <el-form-item label="分数区间">
          <el-col :span="10">
            <el-input v-model="fromData.min" aria-placeholder="" placeholder=" min  " />
          </el-col>
          <el-col class="text-center" :span="1" style="margin: 0 0.5rem">-</el-col>
          <el-col :span="10">
            <el-input v-model="fromData.max" aria-placeholder="" placeholder=" max" />
          </el-col>
        </el-form-item>
        <el-form-item label="显示会员题">
          <el-switch v-model="fromData.visiableMember" />
        </el-form-item>
        <el-form-item label="隐藏AC题目">
          <el-switch v-model="fromData.hiddenAc" />
        </el-form-item>
        <el-form-item label="收藏题单中生效">
          <el-tooltip content="插件只在收藏题单中生效，刷新生效 " placement="bottom-end">
            <el-switch v-model="fromData.onlyUrls" />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="使用题单">
          <el-switch v-model="fromData.useDefaultSetting" />
        </el-form-item>
      </el-form>
      <template v-if="fromData.useDefaultSetting">
        <el-divider />
        <el-button plain @click="showProblems">
          查看收藏的题单
        </el-button>
        <el-divider />
      </template>
      <el-button plain @click="q1 = !q1">
        问题1
      </el-button>
      <el-divider />
      <el-dialog v-model="q1" title="关于查询状态会不会被封号 ？">
        <Q1 />
      </el-dialog>

      <el-dialog v-model="dialogTableVisible" title="题单">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-input v-model="keywords" placeholder="请输入关键词过滤" clearable />
          </el-col>
          <el-col :span="16">
            <el-button plain @click="addlocal" :disabled="isDisabbled">
              添加本页
            </el-button>
            <el-button plain @click="handlerProblems('add')">
              自定义
            </el-button>
            <el-button plain @click="handlerDefault">
              默认
            </el-button>
          </el-col>
        </el-row>
        <el-table :data="urlsData" height="300" style="width: 100%;margin-top: 10px;">
          <el-table-column label="标题" width="auto" align="center">
            <template #default="scope"> <el-link :href="scope.row.link" target="_blank" type="default">{{
              scope.row.title
            }}</el-link></template>

          </el-table-column>
          <el-table-column label="操作" width="auto" align="center">
            <template #default="scope">

              <el-button type="primary" size="small"
                @click="handlerProblems('update', scope.row, scope.$index)">编辑</el-button>
              <el-button type="danger" size="small" @click="deleteProblems(scope.$index)">删除</el-button>
            </template>

          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog v-model="dialogFormVisible" :title="`${info.status == 'add' ? '添加' : '编辑'}`" width="400">
        <el-form>
          <el-form-item label="标题" :label-width="formLabelWidth">
            <el-input v-model="info.title" autocomplete="off" />
          </el-form-item>
          <el-form-item label="链接" :label-width="formLabelWidth">
            <el-input v-model="info.link" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="addOrUpdate">
              确认
            </el-button>
          </div>
        </template>
      </el-dialog>
    </template>
  </el-drawer>



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
