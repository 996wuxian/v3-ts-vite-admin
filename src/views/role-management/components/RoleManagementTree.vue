<template>
  <el-tree
    ref="$tree"
    :data="menuFilter"
    show-checkbox
    node-key="menuId"
    :props="defaultProps"
    default-expand-all
    :default-checked-keys="checkedMenus"
    :check-strictly="true"
    @check-change="handleCheckChange"
  />
</template>

<script setup lang="ts">
import { useRoleManagementStore } from '../store/index'

const { $tree, menuFilter, checkedMenus, handleCheckChange } = useRoleManagementStore()
// console.log('🚀 ~ menuFilter:', menuFilter)

const defaultProps = {
  children: 'childWebMenu',
  label: 'title'
}
</script>

<style scoped></style>
