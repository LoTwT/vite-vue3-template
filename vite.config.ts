import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import ViteComponents from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import AutoImport from "unplugin-auto-import/vite"
import path from "path"

export default defineConfig((config) => {
  const { mode } = config

  // .env
  const root = process.cwd()
  const { VITE_SERVER_PORT, VITE_SERVER_PROXY, VITE_SERVER_PROXY_TARGET } =
    loadEnv(mode, root) as unknown as ImportMetaEnv

  const hasProxy = VITE_SERVER_PROXY && VITE_SERVER_PROXY_TARGET

  return {
    plugins: [
      vue(),
      ViteComponents({
        resolvers: [AntDesignVueResolver()],
        dts: "./src/types/global/component.d.ts",
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
      AutoImport({
        dts: "./src/types/global/auto-imports.d.ts",
        imports: ["vue", "vue-router", "pinia"],
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    server: {
      port: VITE_SERVER_PORT || 3000,
      // 此处默认转换 /api, 未做通用处理...
      proxy: hasProxy && {
        [VITE_SERVER_PROXY]: {
          target: VITE_SERVER_PROXY_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(VITE_SERVER_PROXY, ""),
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
  readonly VITE_SERVER_PROXY_TARGET: string
}
