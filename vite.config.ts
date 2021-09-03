import { ConfigEnv, UserConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

export default ({ command, mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
}
