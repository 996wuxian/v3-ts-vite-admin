<template>
  <div class="table">
    <vxe-table
      ref="$table"
      :data="tableData"
      show-overflow
      :row-config="{ isHover: true, isCurrent: true }"
      height="auto"
    >
      <vxe-column field="id" title="序号" min-width="50" />
      <vxe-column field="userName" title="名称" min-width="100" />
      <vxe-column field="phone" title="手机号" min-width="100" />
      <vxe-column field="email" title="邮箱" min-width="140" />
      <vxe-column field="address" title="地址" min-width="240" />
      <vxe-column field="state" title="状态" min-width="140" />
      <vxe-column field="roles" title="角色" min-width="140">
        <template #default="{ row }">
          {{ row.roles[0].name }}
        </template>
      </vxe-column>
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
import { useUserManagementStore } from '../store/index'

const { tableData, taskOpen } = useUserManagementStore()
</script>

<style scoped lang="scss">
.table {
  height: 100%;
}
</style>
