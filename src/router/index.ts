import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import { getHashParams } from "@/utils";
import guest from "./middleware/guest";
import auth from "./middleware/auth";
import middlewarePipeline from "./middleware/middlewarePipeline";
import { localStorage } from "@/utils";
import { AUTHENTICATION_KEY } from "@/constants";
import { SpotifyAuth } from "@/types/SpotifyAuth";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/spotifyCallback",
    name: "SpotifyCallback",
    beforeEnter: (to, from, next) => {
      const params: SpotifyAuth = getHashParams();

      localStorage.remove(AUTHENTICATION_KEY);
      localStorage.set(AUTHENTICATION_KEY, params.access_token);

      next({
        name: "Main"
      });
    }
  },
  {
    path: "/main", // TODO this route will be protected
    name: "Main",
    component: () => import(/* webpackChunkName: "main" */ "../views/Main.vue"),
    meta: {
      middleware: [auth],
    }
  },
  {
    path: "*",
    name: "NotFound",
    meta: {
      middleware: [guest],
    },
    component: () =>
      import(/* webpackChunkName: "not-found" */ "../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
  };
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
