<template>
  <el-drawer v-model="drawerShow" title="设置" direction="rtl" size="300px">
    <el-row :gutter="20" align="middle">
      <el-col :span="6">主题</el-col>
      <el-col :span="18">
        <el-select v-model="theme" size="small" @change="changeTheme">
          <el-option label="夜间" value="black" />
          <el-option label="白昼" value="white" />
        </el-select>
      </el-col>
    </el-row>
    <div style="margin-top: 20px">正在建设中...</div>
    <div class="changebox"></div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import useThemeStore from '@/stores/modules/theme'
const useTheme = useThemeStore()

import { useHeaderStore } from '../store/index'
const { drawerShow } = useHeaderStore()

const theme = ref()
theme.value = useTheme.themeType

const changeTheme = () => {
  document.documentElement.setAttribute('data-theme', theme.value)
  useTheme.setState({ themeType: theme.value })
}
</script>

<style scoped lang="scss"></style>
