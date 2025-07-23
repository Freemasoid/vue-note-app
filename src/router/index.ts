import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "notes",
      component: () => import("../views/NotesView.vue"),
    },
  ],
});

export default router;
