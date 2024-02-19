<template>
  <el-dialog v-model="dialogVisible" title="添加列" width="30%">
    <el-form ref="$form" :model="form" label-width="90px" label-position="right">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item
            label="列名"
            :rules="[
              {
                trigger: 'blur',
                required: true
              }
            ]"
          >
            <el-input v-model="form.label" type="text" placeholder="列名" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="绑定字段"
            :rules="[
              {
                required: true
              }
            ]"
          >
            <el-input v-model="form.prop" type="text" placeholder="列名" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="宽度">
            <el-input v-model="form.width" type="text" placeholder="列名" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否可选">
            <el-switch v-model="form.isSelect" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否可编辑">
            <el-switch v-model="form.isEdit" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="对其方式">
            <el-radio-group v-model="form.align" class="ml-4">
              <el-radio label="left">居左</el-radio>
              <el-radio label="center">居中</el-radio>
              <el-radio label="right">居右</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="taskConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useExcelStore } from '../store'
const { dialogVisible, $form, form, taskConfirm } = useExcelStore()
</script>

<style scoped></style>
