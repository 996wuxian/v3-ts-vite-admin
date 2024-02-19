import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { TabPaneName } from 'element-plus'
import * as XLSX from 'xlsx'

// tabs
let tabIndex = 1
const editableTabsValue = ref('1')
const editableTabs = ref([
  {
    title: '模板tab(双击修改)',
    name: '1',
    content: 'Tab 1 content',
    edit: false
  }
])

type A<T> = T extends { a: infer U; b: infer U } ? U : any

type Foo = A<{ a: number; b: string }>

const isKeydown = (e?) => {
  return e.key === 'Backspace' || e.key === 'Delete'
}

const handleTabsEdit = async (targetName: TabPaneName | undefined, action: 'remove' | 'add') => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
      title: '模板tab(双击修改)',
      name: newTabName,
      content: 'New Tab content',
      edit: false
    })
    editableTabsValue.value = newTabName
  } else if (action === 'remove') {
    const isKey = await isKeydown(event)
    if (isKey) return
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (editableTabs.value.length === 1) {
      ElMessage.success('至少保留一个')
      return
    } else if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}

const timer = ref()

const clickData = ref()

const dbClick = (item) => {
  clickData.value = JSON.parse(JSON.stringify(item))
  if (timer.value) {
    clearTimeout(timer.value)
  }
  item.title = ''
  item.edit = true
}

const handleInputBlur = (item) => {
  if (timer.value) {
    clearTimeout(timer.value)
  }
  if (item.title === '') {
    item.title = clickData.value.title
    item.edit = false
    return
  } else {
    item.title = item.title.trim()
    item.edit = false
  }
}

// table
interface ColumnConfig {
  label: string
  prop: string
  align?: string
  width?: number
  titleEdit?: boolean
  isSelect?: boolean
  isEdit?: boolean
}

const dialogVisible = ref(false)
const $form = ref()
const form = ref<ColumnConfig>()

const taskConfirm = () => {
  dialogVisible.value = false
  tableColumns.value.push(form.value)
}

const addColumn = (data = {} as ColumnConfig) => {
  form.value = {
    ...data
  }
  dialogVisible.value = true
}

const removeColumn = () => {
  tableColumns.value = tableColumns.value.filter((item) => !item.isSelect)
}

const tableData = ref([
  {
    id: 1,
    name1: '字段名1',
    name2: '字段名2',
    name3: '字段名3'
  },
  {
    id: 2,
    name1: '字段名4',
    name2: '字段名5',
    name3: '字段名6'
  }
])

const tableConfig = {
  checkBox: true,
  operation: true,
  operationTitle: '操作',
  operationWidth: 230,
  operationAlign: 'center'
}

const tableColumns = ref<ColumnConfig[]>([
  {
    prop: 'id',
    label: 'id',
    width: 100,
    align: 'center',
    titleEdit: false,
    isSelect: false,
    isEdit: false
  },
  {
    prop: 'name1',
    label: '字段名1',
    titleEdit: false,
    isSelect: false,
    isEdit: true
  },
  {
    prop: 'name2',
    label: '字段名2',
    titleEdit: false,
    isSelect: false,
    isEdit: false
  }
])

const clickMenuData = ref()

const menuClick = (item) => {
  if (item.label === 'id') return

  clickMenuData.value = JSON.parse(JSON.stringify(item))
  item.label = ''
  item.titleEdit = true
}

const menuBlur = (item) => {
  if (item.label === '') {
    item.label = clickMenuData.value.label
  }
  item.titleEdit = false
}

// 导出excel
const exportData = () => {
  const headerData = tableColumns.value.map((item) => {
    return item.label
  })

  // 创建一个新的工作簿
  const workbook = XLSX.utils.book_new()

  // 创建一个新的工作表，proxy.tableData是你的数据
  const worksheet = XLSX.utils.json_to_sheet([])

  // 将工作表附加到工作簿，并将工作表命名为work
  XLSX.utils.book_append_sheet(workbook, worksheet, 'work')

  // 向woeksheet工作表中的A1位置添加数据的数组（这是替换原有属性名）
  XLSX.utils.sheet_add_aoa(
    worksheet,
    [
      // [
      //   '序号',
      //   '姓名/工号',
      //   '类别名称',
      //   '星期一',
      //   '',
      //   '星期二',
      //   '',
      //   '星期三',
      //   '',
      //   '星期四',
      //   '',
      //   '星期五',
      //   '',
      //   '星期六',
      //   '',
      //   '星期天',
      //   '',
      //   '岗位'
      // ]
      headerData
    ],
    { origin: 'A1' }
  )

  const sheetData = tableData.value.map((item) => {
    return [item.id, item.name1, item.name2, item.name3]
  })
  console.log('🚀 ~ sheetData ~ sheetData:', sheetData)

  XLSX.utils.sheet_add_aoa(
    worksheet,
    [
      // [
      //   // '',
      //   // '',
      //   // '',
      //   // '上午',
      //   // '下午',
      //   // '上午',
      //   // '下午',
      //   // '上午',
      //   // '下午',
      //   // '上午',
      //   // '下午',
      //   // '上午',
      //   // '下午',
      //   // '上午',
      //   '下午',
      //   '上午',
      //   '下午'
      // ],
      // ['下午', '上午', '下午']
      ...sheetData
    ],
    { origin: 'A2' }
  )

  // 设置表头合并
  worksheet['!merges'] = [
    { s: { r: 0, c: 3 }, e: { r: 0, c: 4 } }
    // { s: { r: 0, c: 5 }, e: { r: 0, c: 6 } },
    // { s: { r: 0, c: 7 }, e: { r: 0, c: 8 } },
    // { s: { r: 0, c: 9 }, e: { r: 0, c: 10 } },
    // { s: { r: 0, c: 11 }, e: { r: 0, c: 12 } },
    // { s: { r: 0, c: 13 }, e: { r: 0, c: 14 } },
    // { s: { r: 0, c: 15 }, e: { r: 0, c: 16 } },
    // { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
    // { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
    // { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } },
    // { s: { r: 0, c: 17 }, e: { r: 1, c: 17 } }
  ]

  // 导出工作簿，并命名导出文件名为Presidents.xlsx
  XLSX.writeFile(workbook, 'Presidents.xlsx')
}

export const useExcelStore = () => {
  return {
    isKeydown,
    dbClick,
    handleInputBlur,
    editableTabs,
    editableTabsValue,
    handleTabsEdit,
    addColumn,
    removeColumn,
    tableData,
    tableConfig,
    tableColumns,
    menuClick,
    menuBlur,
    exportData,

    dialogVisible,
    $form,
    form,
    taskConfirm
  }
}
