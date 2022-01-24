import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/about",
    component: () => import("@/pages/About.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
