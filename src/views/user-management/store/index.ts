import { ref } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { QueryUsers } from '@/api/user'
import { ElLoading } from 'element-plus'

const queryForm = ref({
  Page: 1,
  PageSize: 10,
  keyWord: ''
})

const iconsData = ref([])
for (const item in ElementPlusIconsVue) {
  iconsData.value.push(item)
}

const tableData = ref([])

const queryData = async () => {
  const loading = ElLoading.service({ fullscreen: true, text: '加载中...' })
  const { code, data } = await QueryUsers(queryForm.value)

  if (code !== 200) return
  loading.close()
  tableData.value = data
}

const taskVisible = ref(false)
const $form = ref<any>([])
const form = ref<any>([])

const taskOpen = (row) => {
  console.log(row, 'row')
  form.value = {
    ...row
  }
  console.log(form.value, '123123')
  taskVisible.value = true
}

export const useUserManagementStore = () => {
  return {
    queryData,
    taskOpen,
    $form,
    form,
    taskVisible,
    iconsData,
    tableData
  }
}
