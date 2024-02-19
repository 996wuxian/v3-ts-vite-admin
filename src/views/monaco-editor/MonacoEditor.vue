<script lang="ts" setup>
import PageHeader from '@/components/PageHeader/index.vue'
import MonacoEditor from '@/components/MonacoEditor/index.vue'
import * as monaco from 'monaco-editor'
const content = ref('')
const language = ref('javascript') // 设置语言
const editorMounted = (editor: monaco.editor.IStandaloneCodeEditor) => {
  console.log('editor实例加载完成', editor)
}

const result = ref('')

const runCode = () => {
  const code = content.value

  if (code) {
    result.value = eval(code)
  }
}
</script>
<template>
  <PageHeader title="MonacoEditor-Vue3代码在线编辑器">
    <template #right>
      <el-select v-model="language">
        <el-option label="javascript" value="javascript" />
        <el-option label="typescript" value="typescript" />
      </el-select>
    </template>
  </PageHeader>

  <MonacoEditor
    v-model="content"
    :language="language"
    height="450px"
    @editor-mounted="editorMounted"
  />

  <div class="result">
    <el-button type="primary" class="result-btn" @click="runCode">运行</el-button>
    <div class="result-content">{{ result }}</div>
  </div>
</template>

<style lang="scss" scoped>
.result {
  margin-top: 20px;
  height: calc(100% - 500px - 100px);
  &-btn {
    padding: 10px 20px;
  }
  &-content {
    margin-top: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    height: 100%;
    padding: 10px;
    font-size: 20px;
  }
}
</style>
