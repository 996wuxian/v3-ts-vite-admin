<template>
  <div class="container">
    <PageHeader title="PdfJs-查看pdf插件">
      <template #right>
        <el-button type="primary" plain @click="importTaskShow">导入</el-button>
      </template>
    </PageHeader>

    <div style="height: calc(100% - 100px)">
      <Table
        ref="tableRef"
        :data="tableData"
        :table-config="tableConfig"
        :table-columns="tableColumns"
        height="760px"
      >
        <template #operation="{ row }">
          <el-button type="primary" plain @click="taskShow(row)">查看</el-button>
          <el-button type="warning" plain @click="deleteFile(row)">删除</el-button>
          <el-button type="primary" plain @click="exportPdf(row)">导出</el-button>
        </template>
      </Table>
    </div>
  </div>

  <PdfJsTask />
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader/index.vue'
import Table from '@/components/Table/index.vue'
import PdfJsTask from './components/PdfJsTask.vue'

import { usePdfJsStore } from './store'
const { queryTableData, tableRef, tableData, taskShow, deleteFile, importTaskShow, exportPdf } =
  usePdfJsStore()

queryTableData()

const tableColumns = [
  {
    prop: 'id',
    label: 'id',
    width: 80,
    align: 'center'
  },
  {
    prop: 'fileName',
    label: '文件名'
  },
  {
    prop: 'desc',
    label: '简介'
  }
]

const tableConfig = {
  checkBox: true,
  operation: true,
  operationTitle: '操作',
  operationWidth: 230,
  operationAlign: 'center'
}
</script>

<style scoped lang="scss"></style>
