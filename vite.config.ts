import { fileURLToPath, URL } from "url"

import { defineConfig, loadEnv } from "vite"
import ViteComponents from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import AutoImport from "unplugin-auto-import/vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const { mode } = config

  // .env
  const root = process.cwd()

  const { VITE_SERVER_PORT, VITE_SERVER_PROXY, VITE_SERVER_PROXY_TARGET } =
    loadEnv(mode, root) as unknown as ImportMetaEnv
  const hasProxy = !!(VITE_SERVER_PROXY && VITE_SERVER_PROXY_TARGET)

  return {
    plugins: [
      vue(),
      ViteComponents({
        resolvers: [AntDesignVueResolver()],
        dts: "./AutoImport.d.ts",
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
      AutoImport({
        imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
        dts: "./AutoImport.d.ts",
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
    ],

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    server: {
      port: VITE_SERVER_PORT || 3000,
      proxy: hasProxy
        ? {
            [VITE_SERVER_PROXY]: {
              target: VITE_SERVER_PROXY_TARGET,
              changeOrigin: true,
              rewrite: (path) => path.replace(VITE_SERVER_PROXY, ""),
            },
          }
        : undefined,
    },
  }
})

// 环境变量
// 如果需要在 src 内使用，请同时更新 env.d.ts
// https://cn.vitejs.dev/guide/env-and-mode.html#intellisense
interface ImportMetaEnv {
  readonly VITE_SERVER_PORT: number
  readonly VITE_SERVER_PROXY: string
  readonly VITE_SERVER_PROXY_TARGET: string
}
