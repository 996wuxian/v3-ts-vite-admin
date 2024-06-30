import { defineConfig, loadEnv } from 'vite'

import viteBaseConfig from './vite.base.config'
import viteProdConfig from './vite.prod.config'
import viteDevConfig from './vite.dev.config'

const envResolver = {
  build: () => {
    console.log('生产环境')
    return Object.assign({}, viteBaseConfig, viteProdConfig)
  },
  serve: () => {
    console.log('开发环境')
    // console.log(process.env, '123')
    return Object.assign({}, viteBaseConfig, viteDevConfig)
  }
}

export default defineConfig(({ command, mode }) => {
  console.log('🚀 ~ defineConfig ~ mode:', mode)
  // mode 默认是development 当运行npm run dev时, 如果需要设置成其他的参数，则配置dev运行脚本后添加 --mode xxx
  const env = loadEnv(mode, process.cwd())
  console.log('🚀 ~ defineConfig ~ env:', env)
  return envResolver[command]()
})
