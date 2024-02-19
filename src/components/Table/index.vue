<template>
  <div class="container">
    <vxe-table
      ref="tableRef"
      border
      :data="data"
      v-bind="attrs"
      style="height: calc(100% - 45px)"
      @checkbox-change="selectChangeEvent"
    >
      <!-- @checkbox-all="selectAllChangeEvent" -->
      <!-- <template v-if="tableConfig.checkBox">
        <vxe-column :align="attrs['header-align']" type="checkbox" width="60" />
      </template> -->

      <template v-for="(item, index) in tableColumns" :key="index">
        <vxe-column
          v-if="item.isEdit"
          :field="item.prop"
          :title="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :edit-render="{}"
        >
          <!-- 表头 -->
          <template v-if="attrs['head-edit']" #header="{ column }">
            <div v-if="!item.titleEdit" style="display: flex; align-items: center">
              <div @click="menuClick(item)">{{ item.label }}</div>
              <el-checkbox
                v-if="column.title !== 'id'"
                v-model="item.isSelect"
                style="margin-left: 20px"
                size="large"
              />
            </div>
            <el-input v-else v-model="item.label" v-focus clearable @blur="menuBlur(item)" />
          </template>
          <!-- 列单元格 -->
          <template #edit="{ row, column }">
            <el-input
              v-if="column.title !== 'id'"
              v-model="row[column.property]"
              v-focus
              type="text"
              placeholder="请输入"
              clearable
            />
            <div v-else>{{ row[column.property] }}</div>
          </template>
        </vxe-column>
        <vxe-column
          v-else
          :field="item.prop"
          :title="item.label"
          :width="item.width"
          :min-width="item.minWidth"
        />
      </template>
      <template v-if="tableConfig.operation">
        <vxe-column
          :title="tableConfig.operationTitle"
          :width="tableConfig.operationWidth"
          :align="tableConfig.operationAlign"
          fixed="right"
        >
          <template #default="{ row }">
            <slot name="operation" :row="row"></slot>
          </template>
        </vxe-column>
      </template>
    </vxe-table>

    <el-pagination
      style="margin-top: 20px"
      small
      background
      layout="prev, pager, next"
      :total="50"
      class="mt-4"
    />
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, useAttrs, ref } from 'vue'
import { VXETable, VxeTableInstance, VxeTableEvents } from 'vxe-table'

const attrs = useAttrs()

const menuClick = attrs.onMenuClick as any
const menuBlur = attrs.onMenuBlur as any

const tableRef = ref<VxeTableInstance>()
const selectData = ref([])

// const selectAllChangeEvent: VxeTableEvents.CheckboxAll = ({ checked }) => {
//   const $table = tableRef.value
//   if ($table) {
//     selectData.value = $table.getCheckboxRecords()
//     console.log(checked ? '所有勾选事件' : '所有取消事件', selectData.value)
//   }
// }

const selectChangeEvent: VxeTableEvents.CheckboxChange = ({ checked }) => {
  const $table = tableRef.value
  if ($table) {
    selectData.value = $table.getCheckboxRecords()
    console.log(checked ? '勾选事件' : '取消事件', selectData.value)
  }
}

withDefaults(
  defineProps<{
    data: any
    tableColumns: any
    tableConfig: any
    height: any
  }>(),
  {
    data: [],
    tableColumns: [],
    tableConfig: {
      checkBox: false
    }
  }
)

const vFocus = {
  mounted: (el) => {
    el.children[0].children[0].focus()
  }
}

defineExpose({
  selectData
})
</script>

<style scoped lang="scss">
.container {
  height: v-bind(height);
}

:deep .vxe-cell {
  display: flex;
  align-items: center;
}
</style>
