<template>
  <div class="container">
    <PageHeader title="CodemirrorEditor-Vue3代码编辑器" />

    <el-steps
      :active="stepActive"
      finish-status="success"
      simple
      style="margin-bottom: 20px; cursor: pointer"
    >
      <el-step title="Object.definedProperty" @click="stepChange(1)" />
      <el-step title="实现事件监听" @click="stepChange(2)" />
      <el-step title="方法重写监听数组变化" @click="stepChange(3)" />
      <el-step title="Proxy" @click="stepChange(4)" />
    </el-steps>
    <Codemirror
      v-model:value="code"
      :options="cmOptions"
      border
      placeholder="test placeholder"
      :height="700"
    />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader/index.vue'

import Codemirror from 'codemirror-editor-vue3'

// placeholder
import 'codemirror/addon/display/placeholder.js'

// language
import 'codemirror/mode/javascript/javascript.js'
// placeholder
import 'codemirror/addon/display/placeholder.js'
// theme
import 'codemirror/theme/dracula.css'

import { useCodemirrorEditorStore } from './store'

const { code, stepActive, stepChange } = useCodemirrorEditorStore()

const cmOptions = {
  mode: 'text/javascript', // Language mode
  theme: 'dracula' // Theme
}
</script>

<style scoped lang="scss"></style>
