import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

export default defineConfig((config) => {
  const { mode } = config

  // .env
  const root = process.cwd()
  const { VITE_SERVER_PORT, VITE_SERVER_PROXY } = loadEnv(
    mode,
    root,
  ) as unknown as ImportMetaEnv

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [vue()],
    server: {
      port: VITE_SERVER_PORT || 3000,
      // 此处默认转换 /api, 未做通用处理...
      proxy: VITE_SERVER_PROXY && {
        "/api": {
          target: VITE_SERVER_PROXY ?? "",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  }
})

// 环境变量
// 如果需要在 src 内使用，请同时更新 src/env.d.ts
// https://cn.vitejs.dev/guide/env-and-mode.html#intellisense
interface ImportMetaEnv {
  readonly VITE_SERVER_PORT: number
  readonly VITE_SERVER_PROXY: string
}
