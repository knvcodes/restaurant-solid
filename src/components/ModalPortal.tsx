import { createEffect, Setter, Show } from "solid-js";
import AuthModals from "./auth/AuthModals";
import { closeModal, modalStore, openModal } from "../store/modalStore";
import DishModal from "./restaurants/DishModal";
import { int } from "zod";

interface ModalPortalProps {
  setburgerMenuOpen: Setter<boolean>;
}

export default function ModalPortal(props: ModalPortalProps) {
  const { setburgerMenuOpen } = props;

  // auto open resetpassword modal on path
  createEffect(() => {
    if (location.pathname.includes("resetPassword")) {
      openModal("resetPassword");
    }
  });

  // remove overflow
  createEffect(() => {
    if (modalStore.type) {
      // document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  return (
    <Show when={modalStore.type}>
      <div class="modal-overlay" onClick={closeModal}>
        <AuthModals setburgerMenuOpen={setburgerMenuOpen} />
        <DishModal />
      </div>
    </Show>
  );
}
