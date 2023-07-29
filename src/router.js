import { createRouter, createWebHistory } from "vue-router";
import store from "./store";
import FourOFour from "./views/FourOFour.vue";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        redirect: "/login",
      },
      {
        path: "projects",
        name: "Projects",
        meta: { requiresAuth: true },
        component: () => import("@/views/ProjectsPage.vue"),
      },
      {
        path: "calendar",
        name: "Calendar",
        meta: { requiresAuth: true },
        component: () => import("@/views/CalendarPage.vue"),
      },
      {
        path: "gear",
        name: "Gear",
        meta: { requiresAuth: true },
        component: () => import("@/views/GearPage.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        meta: { requiresAuth: true },
        component: () => import("@/views/SettingsPage.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/LogIn.vue"),
      },
      {
        path: "signup",
        name: "Signup",
        component: () => import("@/views/SignUp.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: FourOFour,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!store.state.isAuthStateReady) {
    await Promise.race([
      new Promise((resolve) => {
        setTimeout(() => {
          resolve;
        }, 5000);
      }),
      new Promise((resolve) => {
        store.watch(
          (state) => state.isAuthStateReady,
          (newValue) => {
            if (newValue) {
              resolve();
            }
          }
        );
      }),
    ]);
  }

  const isLoggedIn = store.state.user ? true : false;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // If the route requires authentication, redirect to login if not logged in
    if (!isLoggedIn) {
      next("/login");
    } else {
      next();
    }
  } else if ((to.path === "/login" || to.path === "/signup") && isLoggedIn) {
    next("/projects");
  } else {
    next();
  }
});

export default router;
