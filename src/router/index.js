import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import forgot_password from "../views/forgot_password.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register },
    { path: "/profile", name: "profile", component: Profile, meta: { requiresAuth: true } },
    { path: "/forgot_password", name: "forgot_password", component: forgot_password},
  ],
});

// Route Guard：沒 token 就導去 /login
router.beforeEach((to) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    return { name: "login" };
  }
  // 已登入就別再回登入頁（可選）
  if ((to.name === "login" || to.name === "register") && token) {
    return { name: "profile" };
  }
});

export default router;
