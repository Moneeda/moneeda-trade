import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";
import { useAuth0 } from "../core/useAuth";

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

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/', '/auth/signed-in'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuth0();

  if (authRequired && !auth.user) {
    console.log("entrada");
      auth.returnUrl = to.fullPath;
      return '/';
  }
});

export default router;
