import { makePersisted } from "@solid-primitives/storage";
import { createStore } from "solid-js/store";

export type UserRole = "admin" | "owner" | "customer";

type User = {
  name: string | null;
  role: UserRole | null;
  avatar?: string | null;
};

// Initialize store
const [userStore, setuserStore] = createStore<User>({
  name: null,
  role: null,
  avatar: null,
});

// Make the store persistent - pass [store, setStore] as array
const [persistedUserStore, persistedSetUserStore] = makePersisted(
  [userStore, setuserStore],
  {
    name: "userStore",
    storage: sessionStorage,
  },
);

export {
  persistedUserStore as userStore,
  persistedSetUserStore as setuserStore,
};

export const handleLogout = () => {
  persistedSetUserStore({
    name: null,
    role: null,
    avatar: null,
  });
};
