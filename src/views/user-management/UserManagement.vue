<template>
  <div class="page-content">
    <PageHeader title="用户管理" />

    <div class="content">
      <RoleManagementTable />
    </div>
  </div>

  <RoleManagementTask />
</template>

<script setup lang="ts">
import RoleManagementTable from './components/RoleManagementTable.vue'
import RoleManagementTask from './components/RoleManagementTask.vue'

import { useUserManagementStore } from './store'

const { queryData } = useUserManagementStore()
queryData()
</script>

<style scoped lang="scss">
.content {
  height: calc($base-keep-alive-height - 50px);
}
</style>
