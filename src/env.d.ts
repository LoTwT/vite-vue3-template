/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 环境变量
interface ImportMetaEnv {
  readonly VITE_SERVER_PORT: number
  readonly VITE_SERVER_PROXY: string
  readonly VITE_SERVER_PROXY_TARGET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
