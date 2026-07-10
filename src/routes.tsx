import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

import Home from "./pages/home";
import Restaurants from "./pages/customers/restaurant/restaurants";
import RestaurantDetails from "./pages/customers/restaurant/restaurantDetails";
import AdminLogin from "./pages/admin/auth/adminLogin";

import AdminAuthLayout from "./layouts/AdminLayout";
import Settings from "./pages/settings";

import { ProtectedRoute } from "./components/ProtectedRoutes";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/resetPassword/:id",
    component: Home,
  },

  // profile
  {
    path: "/settings",
    component: () => {
      const Settings = lazy(() => import("./pages/settings"));
      return (
        <ProtectedRoute allowedRoles={["customer", "owner"]}>
          <Settings />
        </ProtectedRoute>
      );
    },
  },

  // customer routes
  {
    path: "/restaurants",
    component: lazy(() => import("./pages/customers/restaurant/restaurants")),
    load: Restaurants,
  },
  {
    path: "/restaurants/:slug",
    component: lazy(
      () => import("./pages/customers/restaurant/restaurantDetails"),
    ),
    load: RestaurantDetails,
  },

  // admin auth routes
  {
    path: "/admin",
    component: AdminAuthLayout,
    children: [
      {
        path: "/login",
        component: lazy(() => import("./pages/admin/auth/adminLogin")),
        load: AdminLogin,
      },
    ],
  },

  // Admin layout wrapper

  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];
