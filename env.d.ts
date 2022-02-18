/// <reference types="vite/client" />

// 环境变量
interface ImportMetaEnv {
  readonly VITE_SERVER_PORT: number
  readonly VITE_SERVER_PROXY: string
  readonly VITE_SERVER_PROXY_TARGET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
