<template>
  <div class="table">
    <vxe-table
      ref="$table"
      :data="treeData"
      show-overflow
      :row-config="{ isHover: true, isCurrent: true }"
      height="auto"
      :tree-config="{
        transform: true,
        expandAll: true,
        rowField: 'menuId',
        parentField: 'parentMenuId'
      }"
    >
      <vxe-column field="title" title="标题" min-width="140" tree-node />
      <vxe-column field="name" title="名称" min-width="140" />
      <vxe-column field="path" title="路径" min-width="140" />
      <vxe-column field="component" title="组件路径" min-width="140" />
      <vxe-column field="redirect" title="重定向" min-width="140" />
      <vxe-column field="icon" title="图标" min-width="140">
        <template #default="{ row }">
          <el-icon>
            <component :is="row.icon" />
          </el-icon>
        </template>
      </vxe-column>
      <vxe-column field="hidden" title="是否隐藏" min-width="140" />

      <vxe-column title="操作" fixed="right" width="140">
        <template #default="{ row }">
          <el-button type="primary" plain size="small" @click="taskOpen(row)"> 修改 </el-button>
          <el-button type="danger" plain size="small" disabled>删除</el-button>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script setup lang="ts">
import { useMenuManagementStore } from '../store/index'

const { treeData, taskOpen } = useMenuManagementStore()
</script>

<style scoped lang="scss">
.table {
  height: calc($base-keep-alive-height - 50px);
}
</style>
