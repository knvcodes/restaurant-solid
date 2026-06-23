// components/ModalPortal.tsx
import { createEffect, Show } from "solid-js";
import { closeModal, modalStore, openModal } from "../store/modalStore";
import { LoginModal } from "./auth/LoginModal";
import { RegisterModal } from "./auth/RegisterModal";
import { LoginPayload, RegisterPayload } from "../types";
import { login, register } from "../service/auth/auth.service";

export default function ModalPortal() {
  createEffect(() => {
    if (modalStore.type) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // service logic
  const onRegister = () => {
    openModal("register");
  };

  const handleLogin = async (payload: LoginPayload) => {
    await login(payload);
  };

  const handleRegistration = async (payload: RegisterPayload) => {
    await register({
      ...payload,
      name: "john",
      role: "customer",
      isOAuth: false,
    });
  };

  return (
    <Show when={modalStore.type}>
      <div class="modal-overlay" onClick={closeModal}>
        <div onClick={(e) => e.stopPropagation()}>
          <Show when={modalStore.type === "login"}>
            <LoginModal
              onClose={closeModal}
              onLogin={handleLogin}
              onRegister={onRegister}
            />
          </Show>
          <Show when={modalStore.type === "register"}>
            <RegisterModal
              onClose={closeModal}
              onRegister={handleRegistration}
            />
          </Show>
        </div>
      </div>
    </Show>
  );
}
