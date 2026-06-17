import { createStore } from "solid-js/store";

export type UserRole = "admin" | "owner" | "customer";

// Initialize store
export const [userStore, setuserStore] = createStore({
  users: [
    {
      id: 0,
      username: "felix909",
      location: "England",
      loggedIn: false,
      role: "admin" as UserRole, // Added role
    },
    {
      id: 1,
      username: "tracy634",
      location: "Canada",
      loggedIn: true,
      role: "owner" as UserRole, // Added role
    },
    {
      id: 2,
      username: "johny123",
      location: "India",
      loggedIn: true,
      role: "customer" as UserRole, // Added role
    },
  ],
});
