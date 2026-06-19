import { createStore } from "solid-js/store";

// Initialize store
export const [toastStore, settoastStore] = createStore({
  isOpen: false,
  message: "",
  title: "",
  duration: 5000,
});

export const toastActions = {
  show: (message: string, title: string = "", duration = 5000) => {
    settoastStore({ isOpen: true, message, title, duration });

    // Auto-hide after duration
    setTimeout(() => {
      toastActions.hide();
    }, duration);
  },

  hide: () => {
    settoastStore({ isOpen: false, message: "", title: "" });
  },
};
