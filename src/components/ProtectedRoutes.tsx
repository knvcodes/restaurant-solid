// components/ProtectedRoute.tsx
import { JSX, Show } from "solid-js";
import { Navigate } from "@solidjs/router";
import { UserRole, userStore } from "../store/userStore";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: UserRole[];
}

export function ProtectedRoute(props: ProtectedRouteProps) {
  console.info("userStore.role:===>", userStore.role);

  return (
    <Show
      when={
        userStore.role !== null &&
        props.allowedRoles.includes(userStore.role as UserRole)
      }
      fallback={
        <Show when={userStore.role} fallback={<Navigate href="/" />}>
          <Navigate href="/" />
        </Show>
      }
    >
      {props.children}
    </Show>
  );
}
