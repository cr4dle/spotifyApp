import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import { implicitGrant } from "@/services/spotify/implicitGrant";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: () => {
      // TODO change this to let the user the option to log in themselves
      implicitGrant();
    },
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/main", // TODO this route will be protected
    name: "Main",
    component: () => import(/* webpackChunkName: "main" */ "../views/Main.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
