import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

import Home from "./pages/home";
import AboutData from "./pages/about.data";
import MyRestaurants from "./pages/myRestaurants";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: lazy(() => import("./pages/about")),
    load: AboutData,
  },
  {
    path: "/myrestaurants",
    component: lazy(() => import("./pages/myRestaurants")),
    load: MyRestaurants,
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];
