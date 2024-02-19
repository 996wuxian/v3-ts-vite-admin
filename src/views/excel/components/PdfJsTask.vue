<template>
  <el-dialog v-model="dialogVisible" title="导入" width="30%">
    <el-form ref="$form" :model="form" label-width="70px" label-position="right">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-upload
            class="upload-demo"
            drag
            multiple
            :on-change="handleUpload"
            :auto-upload="false"
            limit="1"
            accept=".pdf"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">拖拽文件至此 或<em> 点击上传</em></div>
            <template #tip>
              <div class="el-upload__tip">pdf files with a size less than 20M</div>
            </template>
          </el-upload>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="文件名"
            :rules="[
              {
                required: true
              }
            ]"
          >
            <el-input v-model="form.fileName" placeholder="文件名" disabled>文件名</el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述">
            <el-input v-model="form.desc" placeholder="描述">文件名</el-input>
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
import { usePdfJsStore } from '../store'
const { dialogVisible, handleUpload, $form, form, taskConfirm } = usePdfJsStore()
</script>

<style scoped></style>
