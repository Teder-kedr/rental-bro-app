import { createRouter, createWebHistory } from "vue-router";
import store from "./store";
import LogIn from "@/views/LogIn.vue";
import ProjectsPage from "@/views/ProjectsPage.vue";
import ProjectDetailsPage from "@/views/ProjectDetailsPage.vue";
import NewProjectPage from "@/views/NewProjectPage.vue";
import EditProjectPage from "@/views/EditProjectPage.vue";
import SettingsPage from "@/views/SettingsPage.vue";
import FourOFour from "@/views/FourOFour.vue";

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
        component: ProjectsPage,
      },
      {
        path: "project/:id",
        name: "ProjectDetails",
        meta: { requiresAuth: true },
        component: ProjectDetailsPage,
      },
      {
        path: "edit-project/:id",
        name: "EditProject",
        meta: { requiresAuth: true },
        component: EditProjectPage,
      },
      {
        path: "new-project/:id?",
        name: "NewProject",
        meta: { requiresAuth: true },
        component: NewProjectPage,
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
        component: SettingsPage,
      },
      {
        path: "login",
        name: "Login",
        meta: { requiresNoUser: true },
        component: LogIn,
      },
      {
        path: "signup",
        name: "Signup",
        meta: { requiresNoUser: true },
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
  // 1. Check if auth state is known
  if (!store.state.isAuthStateReady) {
    await Promise.race([
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject("couldn't get auth state :(");
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

  // 2. Check if user is logged in
  const isLoggedIn = store.state.user ? true : false;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // If the route requires authentication, redirect to login if not logged in
    if (!isLoggedIn) {
      next("/login");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresNoUser)) {
    // If the route requires user to be null, redirect to projects if there is a user
    if (isLoggedIn) {
      next("/projects");
    } else {
      next();
    }
  } else {
    // If route protection is not specified, proceed
    next();
  }
});

export default router;
