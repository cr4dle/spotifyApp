import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
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
    beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
      const params: SpotifyAuth = getHashParams();

      localStorage.remove(AUTHENTICATION_KEY);
      localStorage.set(AUTHENTICATION_KEY, params.access_token);

      next({
        name: "Dashboard",
      });
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",  // TODO convert this to enum and use it everywhere
    component: () => import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/unauthorised",
    name: "Unauthorised",
    component: () =>
      import(
        /* webpackChunkName: "unauthorised" */ "../views/Unauthorised.vue"
      ),
    beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
      console.log(localStorage.get(AUTHENTICATION_KEY));
      localStorage.clear();
      next();
    },
  },
  {
    path: "/reAuthentication",
    name: "ReAuthentication",
    component: () =>
      import(
        /* webpackChunkName: "reAuthentication" */ "../views/ReAuthentication.vue"
      ),
    beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
      console.log(localStorage.get(AUTHENTICATION_KEY));
      localStorage.clear();
      next();
    },
  },
  {
    path: "/apiLimitExceeded",
    name: "ApiLimitExceeded",
    component: () =>
      import(
        /* webpackChunkName: "apiLimitExceeded" */ "../views/ApiLimitExceeded.vue"
      ),
    beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
      console.log(localStorage.get(AUTHENTICATION_KEY));
      localStorage.clear();
      next();
    },
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

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  if (!to.meta?.middleware) {
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
