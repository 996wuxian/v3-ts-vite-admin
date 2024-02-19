<template>
  <div ref="codeEditBox" class="codeEditBox"></div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { editorProps } from './monacoEditorType'
import * as monaco from 'monaco-editor'
export default defineComponent({
  name: 'MonacoEditor',
  props: editorProps,
  emits: ['update:modelValue', 'change', 'editor-mounted'],
  setup(props, { emit }) {
    let editor: monaco.editor.IStandaloneCodeEditor
    const codeEditBox = ref()
    const init = () => {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false
      })
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true
      })
      editor = monaco.editor.create(codeEditBox.value, {
        value: props.modelValue,
        language: props.language,
        theme: props.theme,
        ...props.options
      }) // 监听值的变化
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue() //给父组件实时返回最新文本
        // console.log('🚀 ~ editor.onDidChangeModelContent ~ value:', value)
        emit('update:modelValue', value)
        emit('change', value)
      })
      emit('editor-mounted', editor)
    }
    watch(
      () => props.modelValue,
      (newValue) => {
        if (editor) {
          const value = editor.getValue()
          if (newValue !== value) {
            editor.setValue(newValue)
          }
        }
      }
    )
    watch(
      () => props.options,
      (newValue) => {
        editor.updateOptions(newValue)
      },
      { deep: true }
    )
    watch(
      () => props.language,
      (newValue) => {
        monaco.editor.setModelLanguage(editor.getModel()!, newValue)
      }
    )
    onBeforeUnmount(() => {
      editor.dispose()
    })
    onMounted(() => {
      init()
    })
    return { codeEditBox }
  }
})
</script>

<style lang="scss" scoped>
.codeEditBox {
  width: 100%;
  height: v-bind(height);
}
</style>
