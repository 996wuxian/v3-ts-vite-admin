<template>
  <el-dialog
    v-model="taskVisible"
    :close-on-click-modal="false"
    title="修改角色"
    width="500px"
    destroy-on-close
    align-center
  >
    <el-form ref="$form" label-width="60px" :model="form">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="角色：" prop="parentMenuId">
            <el-radio-group v-model="form.roles">
              <el-radio :value="1">管理员</el-radio>
              <el-radio :value="2">普通用户</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="info" @click="taskVisible = false">取消</el-button>
        <el-button type="primary" @click="taskVisible = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useRoleManagementStore } from '../store/index'

const { $form, form, taskVisible } = useRoleManagementStore()
</script>

<style lang="scss" scoped>
.icon:hover {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
</style>
