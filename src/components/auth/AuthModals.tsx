// components/ModalPortal.tsx
import { createSignal, Setter, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { closeModal, modalStore, openModal } from "../../store/modalStore";
import {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "../../types";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../../service/auth/auth.service";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { ResetPasswordModal } from "./ResetPasswordModal";

interface AuthModalsProps {
  setburgerMenuOpen: Setter<boolean>;
}

export default function AuthModals(props: AuthModalsProps) {
  const { setburgerMenuOpen } = props;
  const navigate = useNavigate();

  const [isLoading, setisLoading] = createSignal(false);

  const onRegister = () => {
    openModal("register");
  };

  //   service calls
  const handleLogin = async (payload: LoginPayload) => {
    try {
      await login(payload, setisLoading, navigate, () => {
        setburgerMenuOpen(false);
      });
    } catch (error) {
      console.info("error:===>", error);
    }
  };

  const handleRegistration = async (payload: RegisterPayload) => {
    await register(payload, setisLoading);
  };

  const handleForgotPassword = async (payload: ForgotPasswordPayload) => {
    await forgotPassword(payload, setisLoading);
  };

  const handleResetPassword = async (payload: ResetPasswordPayload) => {
    await resetPassword({ ...payload }, setisLoading, navigate);
  };

  return (
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
  );
}
