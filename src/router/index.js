import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingView,
    },
    {
      path: "/auth/signed-in",
      name: "signed-in",
      component: () => import("../views/auth/SignedIn.vue"),
    },
    {
      path: "/app",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      children: [
        {
          path: "strategies",
          name: "strategies",
          component: () => import("../views/admin/AdminStrategiesView.vue"),
        },
        {
          path: "playground",
          name: "playground",
          component: () => import("../views/admin/AdminPlaygroundView.vue"),
        },
      ],
    },
  ],
});

export default router;
