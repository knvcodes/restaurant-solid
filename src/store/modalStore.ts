import { createStore } from "solid-js/store";

export type ModalType = "login" | "register" | "forgotPassword" | null;

interface ModalState {
  type: ModalType;
  props?: Record<string, any>;
}

// Initialize store
export const [modalStore, setmodalStore] = createStore<ModalState>({
  type: null,
});

export const openModal = (type: ModalType, props?: Record<string, any>) =>
  setmodalStore({ type, props });

export const closeModal = () => setmodalStore({ type: null, props: undefined });
