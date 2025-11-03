import { createStore } from "solid-js/store";

// Initialize store
const [store, setStore] = createStore({
  userCount: 3,
  users: [
    {
      id: 0,
      username: "felix909",
      location: "England",
      loggedIn: false,
    },
    {
      id: 1,
      username: "tracy634",
      location: "Canada",
      loggedIn: true,
    },
    {
      id: 2,
      username: "johny123",
      location: "India",
      loggedIn: true,
    },
  ],
});
