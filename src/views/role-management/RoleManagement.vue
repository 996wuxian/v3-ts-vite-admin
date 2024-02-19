<template>
  <div class="page-content">
    <PageHeader title="角色管理">
      <template #right>
        <el-button @click="taskOpen">新增角色</el-button>
      </template>
    </PageHeader>

    <el-row :gutter="20" class="row">
      <el-col :span="12">
        <RoleManagementTable />
      </el-col>
      <el-col :span="12"><RoleManagementTree /></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import RoleManagementTable from './components/RoleManagementTable.vue'
import RoleManagementTree from './components/RoleManagementTree.vue'

import { useRoleManagementStore } from './store'

const { queryData, taskOpen } = useRoleManagementStore()
queryData()
</script>

<style scoped lang="scss">
.row {
  height: calc($base-keep-alive-height - 50px);
}
</style>
