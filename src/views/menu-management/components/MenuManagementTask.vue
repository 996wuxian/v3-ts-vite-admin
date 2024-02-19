<template>
  <el-dialog
    v-model="taskVisible"
    :close-on-click-modal="false"
    title="新增菜单"
    width="900px"
    destroy-on-close
    align-center
  >
    <el-form ref="$form" label-width="100px" :model="form">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="父级菜单" prop="parentMenuId">
            <el-cascader
              v-model="form.parentMenuId"
              clearable
              filterable
              :options="menuFilter"
              :props="{
                value: 'menuId',
                label: 'title',
                checkStrictly: true,
                children: 'childWebMenu',
                multiple: false
              }"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="菜单名称"
            prop="name"
            :rules="[
              {
                required: true,
                message: '请输入菜单名称',
                trigger: 'change'
              }
            ]"
          >
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="URL路径"
            prop="path"
            :rules="[
              {
                required: true,
                message: '请输入URL路径',
                trigger: 'change'
              }
            ]"
          >
            <el-input v-model="form.path" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="组件路径"
            prop="component"
            :rules="[
              {
                required: true,
                message: '请输入组件路径',
                trigger: 'change'
              }
            ]"
          >
            <el-input v-model="form.component" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重定向" prop="redirect">
            <el-input v-model="form.redirect" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="标题"
            prop="title"
            :rules="[
              {
                required: true,
                message: '请输入标题',
                trigger: 'change'
              }
            ]"
          >
            <el-input v-model="form.title" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="图标" prop="icon">
            <el-popover trigger="click" :width="400">
              <template #reference>
                <el-input v-model="form.icon" />
              </template>
              <div class="fl-js" style="flex-direction: column; height: 220px; overflow: auto">
                <div style="display: flex; flex-wrap: wrap">
                  <div
                    v-for="(item, index) in iconsData.slice(
                      (currentPage - 1) * pageSize,
                      currentPage * pageSize
                    )"
                    :key="index"
                    class="icon"
                    @click="iconChoose(item)"
                  >
                    <el-icon style="font-size: 20px; padding: 5px">
                      <component :is="item" :key="index" :index="index" />
                    </el-icon>
                  </div>
                </div>
                <div class="fl-a" style="margin-left: auto">
                  共{{ iconsData.length }}
                  <el-pagination
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    :total="iconsData.length"
                    @current-change="currentChange"
                  />
                </div>
              </div>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="是否隐藏"
            prop="hidden"
            :rules="[
              {
                required: true,
                message: '请选择',
                trigger: 'blur'
              }
            ]"
          >
            <el-switch v-model="form.hidden" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="info" @click="taskVisible = false">取消</el-button>
        <el-button type="primary" @click="createMenu">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useMenuManagementStore } from '../store/index'

const {
  iconsData,
  currentPage,
  pageSize,
  currentChange,
  $form,
  form,
  taskVisible,
  menuFilter,
  iconChoose,
  createMenu
} = useMenuManagementStore()
</script>

<style lang="scss" scoped>
.icon:hover {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
</style>
