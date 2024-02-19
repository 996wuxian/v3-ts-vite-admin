import { ref } from 'vue'
import { Upload, AddFile, FindAll, FindOne, DeleteFile, download } from '@/api/upload'
import { ElMessage } from 'element-plus'

// table
const tableData = ref([])
const queryTableData = async () => {
  const { code, data } = await FindAll()
  if (code !== 200) return
  tableData.value = data
}

// 查看
const taskShow = async (row) => {
  const { code, data } = await FindOne(row.id)

  window.open(data[0].fileName)
  if (code !== 200) return
}

// 删除
const deleteFile = async (row) => {
  const { code, msg } = await DeleteFile(row.id)
  if (code !== 200) return
  ElMessage.success(msg)
  queryTableData()
}

const dialogVisible = ref(false)

const importTaskShow = () => {
  dialogVisible.value = true
}

const $form = ref()
const form = ref({
  fileName: '',
  desc: ''
})

// 上传pdf
const handleUpload = async (file) => {
  form.value.fileName = file.name
  const item = file.raw
  const fileForm = new FormData()
  fileForm.append('file', item)
  await Upload(fileForm)
}
// 确认
const taskConfirm = async () => {
  const { code, msg } = await AddFile(form.value)
  if (code !== 200) return
  dialogVisible.value = false
  ElMessage.success(msg)
  queryTableData()
}

// 导出
const tableRef = ref()

const exportPdf = async (row) => {
  window.open(`http://localhost:3000/api/upload/download/${row.id}`)
}

export const usePdfJsStore = () => {
  return {
    queryTableData,
    tableRef,
    tableData,
    taskShow,
    exportPdf,
    deleteFile,
    dialogVisible,
    importTaskShow,
    $form,
    form,
    handleUpload,
    taskConfirm
  }
}
