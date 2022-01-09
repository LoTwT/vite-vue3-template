/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 环境变量
interface ImportMetaEnv {
  readonly VITE_SERVER_PORT: number
  readonly VITE_SERVER_PROXY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
