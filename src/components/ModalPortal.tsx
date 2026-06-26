import { createEffect, Show } from "solid-js";
import AuthModals from "./auth/AuthModals";
import { closeModal, modalStore, openModal } from "../store/modalStore";
import DishModal from "./restaurants/DishModal";

export default function ModalPortal() {
  // auto open resetpassword modal on path
  createEffect(() => {
    if (location.pathname.includes("resetPassword")) {
      openModal("resetPassword");
    }
  });

  // remove overflow
  createEffect(() => {
    if (modalStore.type) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  return (
    <Show when={modalStore.type}>
      <div class="modal-overlay" onClick={closeModal}>
        <AuthModals />
        <DishModal />
      </div>
    </Show>
  );
}
