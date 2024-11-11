<script setup>
import { reactive, ref, watch, toRaw, computed, onMounted } from 'vue'
import Cache from './utils/cache'
import { getProblemsJSON, getProblemAcInfo } from './api/index'
import { ElMessage } from 'element-plus'
import Q1 from './components/Q1.vue'
import { Message } from './utils/message'
import { GM_registerMenuCommand } from '$'
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
  getAcCountKey,
  randomProblem,
  githubProblem
} from './utils/problems'
import { isHttp, isLeetCodeCircleUrl, isDev, sleep } from './utils'

const TARGET_URL = 'https://leetcode.cn/u/endlesscheng/'

const fromData = reactive(initObj())
const isTest = false
const tableButtonSize = ref('default')
let tableData = reactive(initUrls())
const keywords = ref('')
const dialogTableVisible = ref(false)
const showAddLocalButton = computed(() => isLeetCodeCircleUrl())

let urlsData = computed(() => {
  // let infos = computeAcInfo(tableData, false).filter(info => info && (info.title && info.title.indexOf(keywords.value) != -1 || info.link && info.link.indexOf(keywords.value) != -1))
  let map = new Map()
  let infos = tableData.filter(info => {
    if (info?.title && info?.link && !map.has(info.link)) {
      map.set(info.link, info)
      return info && (info.title && info.title.indexOf(keywords.value) != -1 || info.link && info.link.indexOf(keywords.value) != -1)
    } else {
      return false
    }
  })
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
  let type = isNaN(fromData.sortType) ? 0 : fromData.sortType
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
  infos.unshift({ 'title': '灵茶题单完成情况', 'link': TARGET_URL, 'tot': tot, 'ac': ac, 'id': 0x3ffffff })
  return infos
})

const rowIsDisabled = computed(() => (info) => asyncButtonLoad.value || info && info.link == TARGET_URL)
const isDisabbled = computed(() => !!tableData.find(v => v?.link && v?.link.indexOf(window.location.href) != -1))


const dialogFormVisible = ref(false)
const computeProcess = (ac = 0, tot = 0) => {
  if (isNaN(ac) || isNaN(tot) || tot === 0) return 0;
  let p = 0;
  if (tot == ac) {
    return 100
  }
  const s = String(ac / tot);
  try {
    let x1 = s.split('.')[1] || ''
    x1 = x1.padEnd(3, '0').substring(0, 3);
    p = Math.min(100, Number(x1) / 10);
  } catch (e) {
    console.log('calc error', e.message, s == undefined, ac, tot);
    p = (ac / tot).toFixed(3) * 100;
  }

  return isNaN(p) ? 0 : p
}

const processColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#1989fa', percentage: 40 },
  { color: '#e6a23c', percentage: 60 },
  { color: '#6f7ad3', percentage: 80 },
  { color: '#67c23a', percentage: 100 },
]

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


const addlocal = async () => {
  if (!isDisabbled) {
    return
  }
  let [cur, tot] = await getProcess()
  tableData.unshift({ title: document.title, link: window.location.href, 'ac': cur, 'tot': tot, 'id': tableData.length + 10 })
}

const updateIndex = ref(-1)



const handlerProblems = (status, updateInfo = { title: '', link: '', id: 0 }, index = -1) => {
  dialogFormVisible.value = true
  info.status = status
  updateIndex.value = updateInfo.id
  Object.assign(info, updateInfo)
}


const handlerMessage = (u, title, link) => {
  const a = u ? '添加' : '修改'
  const error = !(!!title && isHttp(link))
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
    let id = updateIndex.value
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i] && tableData[i].id && tableData[i]['id'] == id) {
        tableData[i]['title'] = info.title
        tableData[i]['link'] = info.link
        break
      }
    }
  }
  // Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_urls__'], toRaw(tableData).filter(u => u != null && u != undefined))
  dialogFormVisible.value = false
}

const deleteProblems = (id) => {
  for (let i = 0; i < tableData.length; i++) {
    if (tableData[i] && tableData[i].id && tableData[i]['id'] == id) {
      delete tableData[i]
      break
    }
  }
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



window.addEventListener('beforeunload', () => {
  Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_urls__'], toRaw(tableData).filter(u => u != null && u != undefined))
  Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_update__'], true)
  Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_add_cur__'], false)
})



onMounted(async () => {
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

  }

  window.addEventListener('storage', (e) => {
    watchLinkStatusUpdate(e)
  })


})


GM_registerMenuCommand(`题单配置信息🛠`, () => {
  dialogTableVisible.value = !dialogTableVisible.value
}, { title: 'AC标记安装位置，默认左侧，刷新生效' })

const selectHandlerChange = (row) => {
  // console.log(':disabled="rowIsDisabled(scope.row)"', row, urlsData.value)
  let infos = []
  for (let i = 0; i < urlsData.value.length; i++) {
    if (urlsData.value[i]['link'] == TARGET_URL) continue
    infos.push(toRaw(Object.assign({}, urlsData.value[i])))
  }
  for (let i = 0; i < tableData.length; i++) {
    if (row.id == tableData[i].id) {
      tableData[i].select = row.select
      break
    }
  }
  Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_urls__'], infos)
}

// 同步所有题单
const asyncButtonLoad = ref(false)
const asyncButtonLoadBreak = ref(false)
const showProcess = ref(false)
const allProblemNum = ref(0)
const asyncProblemNum = ref(0)

// 显示刷题信息
const asyncVisableDialog = ref(false)
const showProblemsProcessInfo = reactive({
  title: '', link: '', cnt: '', ac: '', id: '', select: true
})
const showProblemsInfo = (info = {}) => {
  asyncVisableDialog.value = !asyncVisableDialog.value
  Object.assign(showProblemsProcessInfo, info)
}

const loadProcess = computed(() => computeProcess(asyncProblemNum.value, allProblemNum.value))
const asyncProblemStatus = async (row = {}) => {
  if (!row?.link) return

  let callback = async () => {
    let rowData = undefined
    let asyncAll = row?.link == TARGET_URL
    let cache = Cache.get(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'], true, Object.name)
    if (isDev()) {
      console.log('async ac cache:', cache)
    }
    let map = new Map()
    try {

      for (let info of tableData) {
        if (info?.link && info?.title && info?.id) {
          if (rowData == undefined && info?.id == row.id) {
            rowData = info
          }
          if (!map.has(info.link)) {
            map.set(info.link, info)
          }

        }

      }

      if (rowData) {
        rowData.loading = true
      }


      // 设置按钮状态
      asyncButtonLoad.value = true
      asyncButtonLoadBreak.value = false
      allProblemNum.value = 0
      asyncProblemNum.value = 0
      showProcess.value = true



      // 请求远程信息
      await sleep(500)
      let githubInfo = await githubProblem(fromData.visiableMember)
      let jsonInfo = githubInfo[2]



      let datas = []
      for (let i = 0; Array.isArray(jsonInfo) && i < jsonInfo.length; i++) {
        let key = `${jsonInfo[i]?.problemUrl}`
        let origin = map.get(key)
        // console.log('key', key, origin)
        if (!origin) {
          continue
        }
        if (asyncAll) {
          for (let p of jsonInfo[i].problems) {
            datas.push(Object.assign({ 'origin': jsonInfo[i].problemUrl }, p))
          }
          origin.tot = Math.max(jsonInfo[i].problems.length, 0)
          origin.ac = 0

        } else if (jsonInfo[i].problemUrl == row.link) {
          for (let p of jsonInfo[i].problems) {
            datas.push(Object.assign({ 'origin': jsonInfo[i].problemUrl }, p))
          }
          origin.tot = Math.max(jsonInfo[i].problems.length, 0)
          origin.ac = 0
          break
        }
      }


      if (Array.isArray(datas) && datas.length > 0) {
        allProblemNum.value = datas.length
        asyncProblemNum.value = 0

        let pre = 0
        for (let i = 0; i < datas.length; i++) {
          let info = datas[i]
          try {
            if (asyncButtonLoadBreak.value) {
              break
            }
            await sleep(80)
            let ID = info.titleSlug
            let key = `${info.origin}`
            let origin = map.get(key)

            // console.log('origin', origin)
            if (cache[ID] != 'ac') {
              let response = await getProblemAcInfo(ID)
              const status = response?.data?.question?.status
              cache[ID] = status == null ? 'null' : status
            }

            if (origin) {
              if (cache[ID] == 'ac') {
                origin.ac = origin.ac + 1
              }
            }

            asyncProblemNum.value += 1
            if (loadProcess.value < pre && isDev()) {
              console.warn('calc result is error')
            }
            pre = loadProcess.value
          } catch (e) {
            if (isDev()) {
              console.log('process error', e.message, 'asyncProblemNum.value', asyncProblemNum.value, 'all', allProblemNum.value)
            }
          }

          if (i % 100 == 0) {
            Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'], Object.assign({}, cache))
          }
        }
      }

    } catch (e) {
      console.log('error', e)
    } finally {
      if (rowData) {
        rowData.loading = false
      }
      asyncButtonLoad.value = false


      Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_urls__'], toRaw(tableData))
      Cache.set(__0X3F_PROBLEM_KEYS__['__0x3f_problmes_ac_key__'], Object.assign({}, cache))
      if (isDev()) {
        console.log('同步完成🥰', asyncProblemNum.value, allProblemNum.value, loadProcess.value)
      }

      await sleep(500)
      ElMessage({
        type: allProblemNum.value == asyncProblemNum.value ? 'success' : asyncButtonLoadBreak.value ? 'error' : 'warning',
        message: allProblemNum.value == asyncProblemNum.value ? `同步完成🥰` : asyncButtonLoadBreak.value ? `同步中断 ${loadProcess.value}% ` : `同步率 ${loadProcess.value}% `,
        duration: 3000,
      })
      await sleep(6000)
      allProblemNum.value = 0
      asyncProblemNum.value = 0
      showProcess.value = false
      asyncButtonLoadBreak.value = false


      for (let i = 0; i < tableData.length; i++) {
        if (getAcCountKey(tableData[i]?.link)) {
          Cache.set(getAcCountKey(tableData[i].link), { "tot": tableData[i].tot, "ac": tableData[i].ac })
        }
        if (tableData[i]?.loading) {
          tableData[i].loading = false
        }

      }
    }
  }
  if (row.link == TARGET_URL) {
    Message('该操作将同步所有题单，耗时可能较长 确认操作?', callback)
  } else {
    callback()
  }


}

const q1 = ref(false)
const q2 = ref(false)

</script>

<template>
  <div>
    <el-dialog v-model="q1">
      <Q1></Q1>
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
          <el-button @click="addOrUpdate">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogTableVisible"
      :title="asyncButtonLoadBreak ? `同步已中断 ${asyncProblemNum}/${allProblemNum}` : showProcess ? loadProcess < 100 ? `同步中...${asyncProblemNum}/${allProblemNum}` : '统计完成' : '题单信息'"
      width="60%">
      <el-progress v-if="showProcess" :color="processColors" :percentage="loadProcess" :stroke-width="15" striped
        striped-flow style="margin-bottom: 20px;" :status="`${loadProcess == 100 ? 'success' : ''}`" />
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input v-model="keywords" placeholder="请输入关键词过滤" clearable />
        </el-col>
        <el-col :span="20">
          <el-button plain @click="addlocal" :disabled="isDisabbled" :size="tableButtonSize" v-if="showAddLocalButton">
            添加本页
          </el-button>
          <el-button plain @click="handlerProblems('add')" :size="tableButtonSize" v-if="showAddLocalButton">
            自定义
          </el-button>


          <el-select v-model="fromData.sortType" style="margin:0 5px;width:100px;" :disabled="asyncButtonLoad">
            <el-option label="默认排序" :value="0">默认排序</el-option>
            <el-option label="题目数量" :value="1">题目数量</el-option>
            <el-option label="AC数量" :value="2">AC数量</el-option>
            <el-option label="完成度" :value="3">完成度</el-option>
          </el-select>
          <el-tooltip content="同步所有题单">
            <el-button :type="asyncButtonLoad ? 'success' : 'danger'"
              @click="asyncProblemStatus({ 'link': 'https://leetcode.cn/u/endlesscheng/' })" :size="tableButtonSize"
              :loading="asyncButtonLoad">
              {{ asyncButtonLoad ? '同步中' : '同步题单' }}
            </el-button>
          </el-tooltip>
          <el-tooltip content="点击中断同步" v-if="asyncButtonLoad">
            <el-button v-if="asyncButtonLoad" type="warning" text @click="asyncButtonLoadBreak = !asyncButtonLoadBreak"
              :size="tableButtonSize">
              中断同步
            </el-button>
          </el-tooltip>

          <el-tooltip content="随机一道灵茶题单中题目,快捷键 Ctrl + Alt + J 可以触发">
            <el-button type="primary" text @click="randomProblem" :size="tableButtonSize">
              随机题目
            </el-button>
          </el-tooltip>


        </el-col>
      </el-row>



      <!--显示信息 -->
      <el-table :data="urlsData" height="300" style="width: 100%;margin-top: 10px;">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="标题" width="auto" align="center">
          <template show-overflow-tooltip #default="scope"> <el-link :href="scope.row.link" target="_blank"
              type="default">{{
                scope.row.title
              }}</el-link></template>

        </el-table-column>
        <el-table-column label="随机" width="70" align="center">
          <template #default="scope">
            <el-switch v-model="scope.row.select" @change="selectHandlerChange(scope.row)"
              :disabled="rowIsDisabled(scope.row)" size="small"></el-switch>

          </template>

        </el-table-column>
        <el-table-column label="AC" width="70" align="center">
          <template #default="scope">

            <el-link type="success" :underline="false" @click="showProblemsInfo(scope.row)"> {{ isNaN(scope.row.ac) ? 0
              : scope.row.ac }}</el-link>

          </template>

        </el-table-column>
        <el-table-column label="Total" width="70" align="center">
          <template #default="scope">

            <el-link type="primary" :underline="false" @click="showProblemsInfo(scope.row)"> {{ isNaN(scope.row.tot) ? 0
              : scope.row.tot }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="进度" width="70" align="center">
          <template #default="scope">
            <el-link @click="showProblemsInfo(scope.row)" type="warning" :underline="false"> {{ scope?.row?.tot == 0 ? 0
              :
              `${computeProcess(scope?.row?.ac, scope?.row?.tot)}%` }}</el-link>

          </template>
        </el-table-column>

        <el-table-column label="操作" width="200px" align="center">
          <template #default="scope">
            <el-button :loading="scope.row.loading" @click="asyncProblemStatus(scope.row)" size="small" type="success"
              :disabled="rowIsDisabled(scope.row)" link>{{ scope.row.loading ? '' : "同步" }}</el-button>
            <el-button @click="handlerProblems('update', scope.row, scope.$index)" size="small" type="primary"
              :disabled="rowIsDisabled(scope.row)" link>编辑</el-button>

            <el-button @click="deleteProblems(scope.row.id)" size="small" type="danger" link
              :disabled="rowIsDisabled(scope.row)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>


      <!-- 随机配置信息 -->
      <el-row :gutter="10" style="margin:10px 0;">
        <el-col :span="10">
          会员&nbsp;&nbsp;<el-tooltip content="过滤会员题目，会员题不会出现在随机题目中和讨论区显示。另外会员题目将不参与进度统计，默认显示"><el-switch
              v-model="fromData.visiableMember" /></el-tooltip>
          <template v-if="showAddLocalButton">
            隐藏AC&nbsp;&nbsp;<el-tooltip content="是否在讨论区显示AC题目，默认显示 "><el-switch
                v-model="fromData.hiddenAc" /></el-tooltip>
          </template>

          随机ac&nbsp;&nbsp;<el-tooltip content="随机题目配置: 过滤AC的题目,AC题目出现在随机题目中，默认不过滤"><el-switch
              v-model="fromData.showAcConfig" /></el-tooltip>

        </el-col>
        <el-col :span="8">
          &nbsp;&nbsp;<el-tooltip content="随机题目和讨论区题目将会在这个区间（没有分数题目无法操作）">
            <el-link :underline="false" type="primary">分数区间</el-link></el-tooltip>&nbsp;&nbsp;
          <el-input v-model="fromData.min" aria-placeholder="" placeholder=" min  " style="width:60px;" />-
          <el-input v-model="fromData.max" aria-placeholder="" placeholder=" max" style="width:60px;" />
        </el-col>


        <el-col :span="6">
          <el-tooltip content="重置题单">
            <el-button plain @click="handlerDefault" :size="tableButtonSize" :disabled="showProcess">
              默认
            </el-button>
          </el-tooltip>
          <el-button plain @click="q1 = !q1" :size="tableButtonSize">
            使用说明
          </el-button>
        </el-col>



      </el-row>
    </el-dialog>


    <el-dialog v-model="asyncVisableDialog" width="35%">
      <p>
        <el-link :href="showProblemsProcessInfo.link" type="info" :underline="false"> {{
          showProblemsProcessInfo.title }}</el-link>
      </p>
      <div class="processs-flex">

        <el-progress type="circle" :percentage="computeProcess(showProblemsProcessInfo.ac, showProblemsProcessInfo.tot)"
          :color="processColors">
          <template #default="{ percentage }">
            <p>{{ percentage }}%</p>
          </template>
        </el-progress>
      </div>

      <p style="text-align: center;color:#121212;"> {{ showProblemsProcessInfo.ac }} / {{ showProblemsProcessInfo.tot }}
      </p>
    </el-dialog>

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
