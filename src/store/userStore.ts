import { createStore } from "solid-js/store";

export type UserRole = "admin" | "owner" | "customer";

type User = {
  name: string | null;
  role: UserRole | null;
  avatar?: string | null;
};

// Initialize store
export const [userStore, setuserStore] = createStore<User>({
  name: null,
  role: null,
  avatar: null,
});

export const handleLogout = () => {
  setuserStore({
    name: null,
    role: null,
    avatar: null,
  });
};
