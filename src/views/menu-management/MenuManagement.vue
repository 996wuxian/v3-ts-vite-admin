<template>
  <div class="page-content">
    <PageHeader title="角色管理">
      <template #right>
        <el-button @click="taskOpen()">新增菜单</el-button>
      </template>
    </PageHeader>

    <MenuManagementTable />
    <MenuManagementTask />
  </div>
</template>

<script setup lang="ts">
import MenuManagementTable from './components/MenuManagementTable.vue'
import MenuManagementTask from './components/MenuManagementTask.vue'

import { useMenuManagementStore } from './store'

const { queryMenu, taskOpen } = useMenuManagementStore()
queryMenu()
</script>

<style scoped lang="scss"></style>
