import { createStore } from "solid-js/store";
import { generateRandomId } from "../utils/helpers";

interface Toast {
  id: string;
  title: string;
  message: string;
  duration: number;
}

interface ToastStore {
  toasts: Toast[];
}

// Initialize store
export const [toastStore, settoastStore] = createStore<ToastStore>({
  toasts: [],
});

export const toastActions = {
  show: (message: string, title: string = "", duration = 5000) => {
    // trying new feature
    toastActions.pushToast(message, title, duration);
  },

  pushToast: (message: string, title: string = "", duration = 5000) => {
    const id = generateRandomId();

    settoastStore({
      ...toastStore,
      toasts: [
        ...toastStore.toasts,
        {
          id,
          title,
          message,
          duration,
        },
      ],
    });

    setTimeout(() => {
      toastActions.removeToast(id);
    }, 5000);
  },

  removeToast: (id: string) => {
    settoastStore({
      ...toastStore,
      toasts: toastStore.toasts.filter((toastItem) => toastItem.id !== id),
    });
  },
};
