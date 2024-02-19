<script setup lang="ts">
import PageHeader from '@/components/PageHeader/index.vue'
import Table from '@/components/Table/index.vue'
import ExcelAddColumn from './components/ExcelAddColumn.vue'

import { useExcelStore } from './store'
const {
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
  exportData
} = useExcelStore()

const vFocus = {
  mounted: (el) => {
    el.children[0].children[0].focus()
  }
}

onMounted(() => {
  window.addEventListener('keydown', isKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', isKeydown)
})
</script>

<template>
  <div class="container">
    <PageHeader title="XLSX-导出excel插件">
      <template #right>
        <el-button type="primary" plain>导入</el-button>
        <el-button type="primary" plain @click="exportData">导出</el-button>
      </template>
    </PageHeader>

    <el-tabs
      v-model="editableTabsValue"
      type="card"
      editable
      class="demo-tabs"
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <template #label>
          <div v-if="!item.edit" @dblclick="dbClick(item)">
            {{ item.title }}
          </div>
          <el-input v-else v-model="item.title" v-focus clearable @blur="handleInputBlur(item)" />
        </template>
        <el-button type="primary" @click="addColumn">添加列</el-button>
        <el-button type="warning" @click="removeColumn">删除列</el-button>
        <Table
          ref="tableRef"
          class="table"
          :data="tableData"
          head-edit="true"
          height="650px"
          :table-config="tableConfig"
          :table-columns="tableColumns"
          :edit-config="{ trigger: 'click', mode: 'cell' }"
          @menu-click="menuClick"
          @menu-blur="menuBlur"
        >
          <template #operation="{ row }">
            <el-button type="warning" plain @click="deleteFile(row)">删除</el-button>
          </template>
        </Table>
      </el-tab-pane>
    </el-tabs>
  </div>

  <ExcelAddColumn />
</template>

<style scoped>
.table {
  margin-top: 20px;
}
</style>
