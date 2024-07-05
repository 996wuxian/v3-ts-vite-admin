import { type ConfigEnv, type UserConfigExport, loadEnv } from 'vite'

import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(mode, process.cwd()) as ImportMetaEnv
  const { VITE_PUBLIC_PATH } = viteEnv
  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true, // host: "0.0.0.0"
      /** 端口号 */
      port: 5555,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      proxy: {
        '/api': {
          target: 'https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212',
          ws: true,
          /** 是否允许跨域 */
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue'],
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
    }
  }
}
