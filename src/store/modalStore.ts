import { createStore } from "solid-js/store";

export type ModalType =
  | "login"
  | "register"
  | "forgotPassword"
  | "resetPassword"
  | "dish"
  | null;

interface ModalState {
  type: ModalType;
}

// Initialize store
export const [modalStore, setmodalStore] = createStore<ModalState>({
  type: null,
});

export const openModal = (type: ModalType) => setmodalStore({ type });

export const closeModal = () => setmodalStore({ type: null });
