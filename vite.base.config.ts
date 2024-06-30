import { defineConfig } from 'vite'

import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue' // 已经内置了所以可以直接写入
        // {
        //   // 放其他库实现自动引入
        //   loadsh: [
        //     // 设置哪些方法可以自动引入
        //     'concat'
        //   ]
        // }
      ],
      dts: 'src/auto-import.d.ts'
      // 配置哪些本地目录支持自动引入
      // dirs: ['src/utils/request.ts']
    }),
    Components({
      resolvers: [ElementPlusResolver()]
      // 配置哪些本地组件支持自动引入
      // dirs: ['src/components']
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/assets/scss/var.scss";', // 加载全局样式，使用scss特性
        // math: 'always', // 设置css 变量是否有括号才是表达式： height: 100 / 2 和 (100 / 2)
        globalVars: {
          // 可以配置一些全局Css变量
        }
      }
    }
    // devSourcemap: true 在浏览器控制台查看到源文件
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
