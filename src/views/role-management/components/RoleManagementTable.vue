<template>
  <div class="table">
    <vxe-table
      ref="$table"
      :data="tableData"
      show-overflow
      :row-config="{ isHover: true, isCurrent: true }"
      height="auto"
      @cell-click="queryUserMenu"
    >
      <vxe-column field="name" title="名称" min-width="140" />
      <vxe-column title="操作" fixed="right" width="140">
        <template #default="{ row }">
          <el-button type="primary" plain size="small" @click.stop="taskOpen(row)">
            修改
          </el-button>
          <el-button type="danger" plain size="small" disabled>删除</el-button>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script setup lang="ts">
import { useRoleManagementStore } from '../store/index'

const { tableData, taskOpen, queryUserMenu } = useRoleManagementStore()
</script>

<style scoped lang="scss">
.table {
  height: 100%;
}
</style>
