import { Session } from '@/utils/storage'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

let router

// 天气
const whetherData = ref()

const getWhether = async () => {
  const res = await fetch(
    'https://restapi.amap.com/v3/weather/weatherInfo?key=30b0fcddc1b08e275bfafd907fe8a06e&&city=440105'
  )
  whetherData.value = await res.json()
  whetherData.value = whetherData.value.lives[0]
}

// 全屏
const fullscreen = () => {
  // 获取layout的dom元素
  const parentNode: any = document.querySelector('.page-container') // 获取需要全屏的元素;
  // 进入全屏
  if (parentNode.requestFullscreen) {
    parentNode.requestFullscreen()
  } else if (parentNode.webkitRequestFullScreen) {
    parentNode.webkitRequestFullScreen()
  } else if (parentNode.mozRequestFullScreen) {
    parentNode.mozRequestFullScreen()
  } else if (parentNode.msRequestFullscreen) {
    // IE11
    parentNode.msRequestFullscreen()
  }
}

// 设置
const drawerShow = ref(false)

// 退出登录
const loginOut = () => {
  ElMessageBox.alert('是否确定退出?', '退出登录', {
    confirmButtonText: '确定'
  })
    .then(() => {
      Session.remove('token')
      localStorage.clear()
      router.push('/login')
      ElMessage({
        message: '已退出',
        type: 'success'
      })
    })
    .catch(() => {})
}

export const useHeaderStore = () => {
  router = useRouter()
  return {
    whetherData,
    getWhether,
    fullscreen,
    drawerShow,
    loginOut
  }
}
