import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "youtube",
    redirect: "youtube",
    component: () =>
    import("../views/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../views/About.vue")
  },
  {
    path: "/youtube",
    name: "Youtube",
    component: () =>
      import("../views/Youtube.vue")
  },
  {
    path: "/spotify",
    name: "Spotify",
    component: () =>
      import("../views/Spotify.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
