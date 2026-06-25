// components/ModalPortal.tsx
import { createEffect, createSignal, Show } from "solid-js";
import { closeModal, modalStore, openModal } from "../store/modalStore";
import { LoginModal } from "./auth/LoginModal";
import { RegisterModal } from "./auth/RegisterModal";
import {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "../types";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../service/auth/auth.service";
import { useLocation, useNavigate, useParams } from "@solidjs/router";
import { ForgotPasswordModal } from "./auth/ForgotPasswordModal";
import { ResetPasswordModal } from "./auth/ResetPasswordModal";

export default function ModalPortal() {
  const location = useLocation();
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const [isLoading, setisLoading] = createSignal(false);

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

  // service logic
  const onRegister = () => {
    openModal("register");
  };

  const handleLogin = async (payload: LoginPayload) => {
    await login(payload, setisLoading);
  };

  const handleRegistration = async (payload: RegisterPayload) => {
    await register(
      {
        ...payload,
      },
      setisLoading,
    );
  };

  const handleForgotPassword = async (payload: ForgotPasswordPayload) => {
    await forgotPassword(
      {
        ...payload,
      },
      setisLoading,
    );
  };

  const handleResetPassword = async (payload: ResetPasswordPayload) => {
    await resetPassword({ ...payload }, setisLoading);
    navigate("/", { replace: true });
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
              isLoading={isLoading()}
            />
          </Show>
          <Show when={modalStore.type === "register"}>
            <RegisterModal
              onClose={closeModal}
              onRegister={handleRegistration}
              isLoading={isLoading()}
            />
          </Show>
          <Show when={modalStore.type === "forgotPassword"}>
            <ForgotPasswordModal
              onClose={closeModal}
              onForgotPassword={handleForgotPassword}
              isLoading={isLoading()}
            />
          </Show>
          <Show when={modalStore.type === "resetPassword"}>
            <ResetPasswordModal
              onClose={closeModal}
              onResetPassword={handleResetPassword}
              isLoading={isLoading()}
            />
          </Show>
        </div>
      </div>
    </Show>
  );
}
