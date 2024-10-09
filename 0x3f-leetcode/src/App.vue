<script setup>
import { reactive, ref, watch, toRaw, computed, onMounted } from 'vue'
import Cache from './utils/cache'
import { ElMessage } from 'element-plus'
import Q1 from './components/Q1.vue'
import Q2 from './components/Q2.vue'
import { Message } from './utils/message'
import {
  handlerProblem,
  watchLinkStatusUpdate,
  initObj,
  initUrls,
  support_plugins,
  addProcess,
  getProcess,
  defaultUrls,
  queryProblem,
  __0X3F_PROBLEM_KEYS__,
  computeAcInfo,
  getAcCountKey
} from './utils/problems'


const isTest = false
const sortType = ref(0)
let tableData = reactive(initUrls())
const keywords = ref('')
const dialogTableVisible = ref(false)

let urlsData = computed(() => {
  let infos = computeAcInfo(tableData, false).filter(info=>info && (info.title && info.title.indexOf(keywords.value) != -1 || info.link && info.link.indexOf(keywords.value) != -1))
  let tot = 0, ac = 0, c = 0
  for (let i = 0, c = info.length; i < infos.length; i++) {
    let info = infos[i]
    if (info['ac'] && info['tot']) {
      tot += info['tot']
      ac += info['ac']
    }
    if (!info['id']) {
      info['id'] = c + 1
      c++
    }
  }
  let type = sortType.value
  if (type == 0) {
    // 默认排序
    infos.sort((info1, info2) => info2.id - info1.id)
  } else if (type == 1) {
    // 题目数量排序
    infos.sort((info1, info2) => info2.tot - info1.tot)
  } else if (type == 2) {
    // ac数量排序
    infos.sort((info1, info2) => info2.ac - info1.ac)
  } else if (type == 3) {
    // 完成度排序
    infos.sort((info1, info2) => computeProcess(info2.ac, info2.tot) - computeProcess(info1.ac, info1.tot))
  }
  infos.unshift({ 'title': '灵茶题单完成情况', 'link': 'https://leetcode.cn/u/endlesscheng/', 'tot': tot, 'ac': ac, 'id': c + 10 })
  return infos
})
const isDisabbled = computed(() => !!tableData.find(v => v?.link && v?.link.indexOf(window.location.href) != -1))
const dialogFormVisible = ref(false)
let totProblem = ref(0)
let finishProblem = ref(0)
const drawer = ref(false)



const viewSetting = () => {
  drawer.value = !drawer.value
  let [cur, tot] = getProcess()
  finishProblem.value = cur
  totProblem.value = tot
  computeAcInfo(tableData, false)
}


const computeProcess = (ac = 0, tot = 0) => {
  if (isNaN(ac) || isNaN(tot)) return 0
  if (tot == 0) return 0
  let p = 0
  try {
    const s = String(ac / tot)
    let x1 = s.split('.')[1].padEnd(3).substring(0, 3)
    p = Math.min(100, Number(x1) / 10)
  } catch (e) {
    p = (ac / tot).toFixed(3) * 100;
  }
  return isNaN(p) ? 0 : p
}



const finishProcess = computed(() => computeProcess(finishProblem.value, totProblem.value))
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
  let [cur, tot] = getProcess()
  tableData.unshift({ title: document.title, link: window.location.href, 'ac': cur, 'tot': tot, 'id': tableData.length + 10 })
}

const updateIndex = ref(-1)

const showProblems = () => {
  dialogTableVisible.value = true
  let o = Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_add_cur__']) == 'true' || Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_add_cur__']) == true
  if (o) {
    addlocal()
  }
  computeAcInfo(tableData, false)
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
    tableData.unshift({ title: info.title, link: info.link, 'ac': 0, 'tot': 0, 'id': tableData.length + 10 })
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
  Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_urls__'], toRaw(tableData))
}

const handlerDefault = () => {
  Message('确认使用默认题单，将会重置题单', () => {
    for (let i = 0; i < tableData.length; i++) {
      delete tableData[i]
    }
    let infos = computeAcInfo(defaultUrls)
    for (let item of infos) {
      tableData.unshift(item)
    }
    ElMessage({
      type: 'success',
      message: '重置成功',
    })
  })
}


const asyncLocalStatus = () => {
  Message('确认同步题单', () => {
    addProcess(true, undefined, true)
  })
}
const repeatProblemsStatus = () => {
  // TODO ... 
}


window.addEventListener('beforeunload', () => {
  Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_urls__'], toRaw(tableData).filter(u => u != null && u != undefined))
  Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_update__'], true)
  Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_add_cur__'], false)
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
    // 实时更新 
    window.addEventListener('storage', (e) => {
      watchLinkStatusUpdate(e)
    })
  }
})


const q1 = ref(false)
const q2 = ref(false)

</script>

<template>
  <div>
    <el-button type="primary" style="" @click="viewSetting" class="m-setting-button m-button" circle size="large">
      0X3F
    </el-button>
    <el-drawer v-model="drawer" size="30%" :with-header="false" style="position: fixed !important;" direction="rtl">
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
          <el-button @click="finishProblem += 10">add 10 </el-button>
          <el-button @click="finishProblem -= 10">del 10</el-button>
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
          <el-button plain @click="asyncLocalStatus">
            同步本页题目状态
          </el-button>
          <el-button plain @click="showProblems">
            查看收藏的题单
          </el-button>
          <el-divider />
        </template>
        <el-button plain @click="q1 = !q1">
          问题1
        </el-button>
        <el-tooltip content="此功能是为了多刷题单，重置题目状态，敬请期待!">
          <el-button plain type="warning" :disabled="true">
            题单重置
          </el-button>
        </el-tooltip>
        <el-dialog v-model="q1" title="关于查询状态会不会被封号 ？">
          <Q1 />
        </el-dialog>
        <el-dialog v-model="q2" title="相关问题 ？">
          <Q2 />
        </el-dialog>


        <el-dialog v-model="dialogTableVisible" title="题单">
          <el-row :gutter="10">
            <el-col :span="5">
              <el-input v-model="keywords" placeholder="请输入关键词过滤" clearable />
            </el-col>
            <el-col :span="19">
              <el-button plain @click="addlocal" :disabled="isDisabbled">
                添加本页
              </el-button>
              <el-button plain @click="handlerProblems('add')">
                自定义
              </el-button>
              <el-button plain @click="handlerDefault">
                默认
              </el-button>
              <el-button plain @click="q2 = !q2">
                相关问题
              </el-button>
              <el-select v-model="sortType" style="margin-left:5px;width:100px;">
                <el-option label="默认排序" :value="0">默认排序</el-option>
                <el-option label="题目数量" :value="1">题目数量</el-option>
                <el-option label="AC数量" :value="2">AC数量</el-option>
                <el-option label="完成度" :value="3">完成度</el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-table :data="urlsData" height="300" style="width: 100%;margin-top: 10px;">
            <el-table-column label="标题" width="auto" align="center">
              <template #default="scope"> <el-link :disabled="scope.row.link == 'https://leetcode.cn/u/endlesscheng/'"
                  :href="scope.row.link" target="_blank" type="default">{{
                    scope.row.title
                  }}</el-link></template>

            </el-table-column>
            <el-table-column label="AC" width="80" align="center">
              <template #default="scope">
                {{ isNaN(scope.row.ac) ? 0 : scope.row.ac }}
              </template>

            </el-table-column>
            <el-table-column label="Total" width="80" align="center">
              <template #default="scope">
                {{ isNaN(scope.row.tot) ? 0 : scope.row.tot }}
              </template>
            </el-table-column>
            <el-table-column label="process" width="80" align="center">
              <template #default="scope">
                {{ scope?.row?.tot == 0 ? 0 : `${computeProcess(scope?.row?.ac, scope?.row?.tot)}%` }}
              </template>
            </el-table-column>

            <el-table-column label="操作" width="150" align="center">
              <template #default="scope">
                <el-button type="primary" size="small"
                  :disabled="scope.row.link == 'https://leetcode.cn/u/endlesscheng/'"
                  @click="handlerProblems('update', scope.row, scope.$index)">编辑</el-button>
                <el-button :disabled="scope.row.link == 'https://leetcode.cn/u/endlesscheng/'" type="danger"
                  size="small" @click="deleteProblems(scope.$index)">删除</el-button>
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
