<template>
  <div class="page-container">
    <div class="login-container">
      <div class="login-container-logo">
        <img style="width: 350px" src="@/assets/login1.png" alt="" />
      </div>
      <div class="login-container-form">
        <img src="../../assets/images/home-logo1.png" alt="" />
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="用户名登录" name="userName">
            <el-form
              :model="form"
              label-position="right"
              label-width="80px"
              @keyup.enter="onSubmit"
            >
              <el-row :gutter="20" style="width: 100%">
                <el-col :span="24">
                  <el-form-item
                    label="用户名："
                    prop="userName"
                    :rules="[
                      {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                      }
                    ]"
                  >
                    <el-input v-model="form.userName" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="密码："
                    prop="password"
                    :rules="[
                      {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                      }
                    ]"
                  >
                    <el-input v-model="form.password" type="password" show-password clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="验证码："
                    prop="code"
                    :rules="[
                      {
                        required: true,
                        message: '请输入验证码',
                        trigger: 'blur'
                      }
                    ]"
                  >
                    <el-input v-model="form.code" style="flex: 1" clearable />
                    <div
                      id="code"
                      style="line-height: 100%; margin-left: 10px; cursor: pointer"
                      @click="resetCode"
                    ></div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="邮箱登录" name="email"
            ><el-form :model="form" label-position="right" label-width="80px">
              <el-row :gutter="20" style="width: 100%">
                <el-col :span="24">
                  <el-form-item
                    label="邮箱："
                    prop="email"
                    :rules="[
                      {
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur'
                      }
                    ]"
                  >
                    <el-input v-model="form.email" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="验证码："
                    prop="code"
                    :rules="[
                      {
                        required: true,
                        message: '请输入验证码',
                        trigger: 'blur'
                      }
                    ]"
                  >
                    <el-input v-model="form.code" style="flex: 1" clearable />
                    <el-button
                      type="primary"
                      style="margin-left: 10px"
                      :loading="time > 0"
                      :disabled="time > 0"
                      @click="sendEmail"
                      >发送&nbsp;<span v-if="time">{{ time }}</span></el-button
                    >
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form></el-tab-pane
          >
          <div style="display: flex; justify-content: center">
            <el-button style="width: 100px" type="primary" @click="onSubmit">登录</el-button>
          </div>
        </el-tabs>
        <div
          style="
            position: absolute;
            font-size: 14px;
            bottom: 20px;
            display: flex;
            align-items: center;
            z-index: 900;
          "
        >
          <span>其他登录方式：</span>
          <!-- <div class="wechart">
            <img
              src=" //lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e0ff12435b30910520c9a3aac9b90487.svg"
              alt=""
              @click="queryQrCode"
            />
          </div>
          <div id="wxqr" class="wxqr"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'

import { QueryEmailCode, QueryQrCode } from '@/api/login'
import { Login, QueryCode } from '@/api/auth'

import { Session } from '@/utils/storage.ts'

import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

import useUserStore from '@/stores/modules/user'
const useUser = useUserStore()

const router = useRouter()

const activeName = ref('userName')

const time = ref(0)

interface Form {
  userName?: string
  email?: string
  password?: string
  code?: string
}

const form = ref<Form>({
  userName: '',
  email: '',
  password: '',
  code: ''
})

const onSubmit = async () => {
  for (const key in form.value) {
    if (form.value[key] === '') {
      delete form.value[key]
    }
  }
  const { code, data, msg } = await Login(form.value)
  if (code !== 200) return
  Session.set('token', data.token)
  if (!Session.get('token')) return
  useUser.setUserInfo({ userInfo: data.userInfo })
  console.log('🚀 ~ onSubmit ~ data.userInfo:', data.userInfo)
  router.push('/')
  ElMessage({
    message: msg,
    type: 'success'
  })
}

const queryCode = async () => {
  const data = await QueryCode()
  if (data) {
    const res = new DOMParser().parseFromString(data.data as string, 'image/svg+xml')
    document.querySelector('#code')!.appendChild(res.documentElement)
  }
}

const resetCode = () => {
  const testNode = document.querySelector('#code')
  while (testNode?.firstChild) {
    testNode.firstChild.remove()
  }
  queryCode()
}

const handleClick = () => {}

const sendEmail = async () => {
  if (form.value.email) {
    const { code, msg } = await QueryEmailCode({ email: form.value.email })
    if (code !== 200) return
    ElMessage({
      message: msg,
      type: 'success'
    })
    let num = 15
    const timer = setInterval(() => {
      num--
      if (num < 0) {
        clearInterval(timer)
        return
      }
      time.value = num
    }, 1000)
  } else {
    ElMessage({
      message: '请输入邮箱',
      type: 'info'
    })
  }
}

const queryQrCode = async () => {
  const { code, data } = await QueryQrCode()
  if (code !== 200) return
  // wechartCode.value = data
  ElMessageBox.alert(`<img src=${data}>`, '扫码登录', {
    dangerouslyUseHTMLString: true,
    center: true
  })
}

onBeforeMount(async () => {
  await queryCode()
})
</script>

<style lang="scss">
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f5ff;
  .login-container {
    width: 800px;
    position: relative;
    border-radius: 10px;
    display: flex;
    align-items: center;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
    &-logo {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
    }
    &-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 305px;
      height: 400px;
      background-color: #fff;
      border-radius: 10px;
      font-size: 30px;
      color: #333;
      padding: 10px;
    }
  }
}

.wechart {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: #f2f3f5;
  border-radius: 50%;
  width: fit-content;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
  }
}
</style>
