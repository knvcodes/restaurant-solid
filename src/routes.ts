import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

import Home from "./pages/home";
import AboutData from "./pages/about.data";
import MyRestaurants from "./pages/myRestaurants";
import RestaurantDetails from "./pages/restaurantDetails";
import AdminLogin from "./pages/adminLogin";

import ProtectedRoute from "./components/ProtectedRoutes";

// Import the guard

// Lazy load your protected pages (just an example, adjust paths to your actual files)
// const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
// const OwnerDashboard = lazy(() => import("./pages/owner/Dashboard"));
// const CustomerDashboard = lazy(() => import("./pages/customer/Dashboard"));

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
    path: "/myrestaurants/:slug",
    component: lazy(() => import("./pages/restaurantDetails")),
    load: RestaurantDetails,
  },

  {
    path: "/admin/login",
    component: lazy(() => import("./pages/adminLogin")),
    load: AdminLogin,
  },

  // {
  //   path: "/admin",
  //   component: () => <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>,
  // },
  // {
  //   path: "/owner",
  //   component: () => <ProtectedRoute allowedRoles={['owner']}><OwnerDashboard /></ProtectedRoute>,
  // },
  // {
  //   path: "/customer",
  //   component: () => <ProtectedRoute allowedRoles={['customer']}><CustomerDashboard /></ProtectedRoute>,
  // },

  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];
