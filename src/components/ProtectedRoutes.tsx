import { JSX, Show } from "solid-js";
import { Navigate } from "@solidjs/router";
import { store, UserRole } from "../store/userStore";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: UserRole[];
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
  // Find the currently logged-in user reactively
  const currentUser = () => store.users.find((u) => u.loggedIn);

  return (
    <Show
      // Check if user exists AND their role is allowed
      when={currentUser() && props.allowedRoles.includes(currentUser()!.role)}
      fallback={
        // If not allowed, check if they are logged in at all
        <Show when={currentUser()} fallback={<Navigate href="/login" />}>
          {/* Logged in but wrong role -> Unauthorized */}
          <Navigate href="/unauthorized" />
        </Show>
      }
    >
      {props.children}
    </Show>
  );
}
