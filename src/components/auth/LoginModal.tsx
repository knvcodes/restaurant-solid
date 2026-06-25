import { createEffect, createSignal, Show } from "solid-js";
import CustomInput from "../custom/CustomInput";
import { CustomModal } from "../custom/CustomModal";
import { LoginPayload } from "../../types";
import GoogleSignIn from "./GoogleOauthButton";
import { Button } from "@kobalte/core/button";
import { openModal } from "../../store/modalStore";
import Spinner from "../loaders/Spinner";

interface LoginModalProps {
  onClose: () => void;
  onLogin: (payload: LoginPayload) => void;
  onRegister: () => void;
  isLoading: boolean;
}

export const LoginModal = (props: LoginModalProps) => {
  const { onClose, onLogin, onRegister } = props;

  const [email, setemail] = createSignal("");
  const [password, setpassword] = createSignal("");
  const [isPasswordVisible, setisPasswordVisible] = createSignal(false);

  const handleEmail = (value: string) => {
    if (props.isLoading) return;
    setemail(value);
  };

  const handlePassword = (value: string) => {
    if (props.isLoading) return;
    setpassword(value);
  };

  const togglePassword = () => {
    if (props.isLoading) return;
    setisPasswordVisible((prev) => !prev);
  };

  const handleSubmit = () => {
    onLogin({
      email: email(),
      password: password(),
    });
  };

  const handleForgotPassword = () => {
    if (props.isLoading) return;
    openModal("forgotPassword");
  };

  return (
    <CustomModal
      title="Login"
      rightBtnFn={handleSubmit}
      rightBtnText="Login"
      onClose={onClose}
      customButtons={
        <div>
          <div
            onclick={handleForgotPassword}
            class="mb-2 text-sm text-blue-500 label cursor-pointer"
          >
            Forgot Password
          </div>
          <Button class="w-full button-y" onclick={handleSubmit}>
            <Show when={!props.isLoading} fallback={<Spinner />}>
              Login
            </Show>
          </Button>
          <GoogleSignIn />

          <div
            onclick={onRegister}
            class="mt-4 text-sm text-center text-blue-500 label cursor-pointer"
          >
            Register
          </div>
        </div>
      }
    >
      <div class="py-4">
        <CustomInput
          disabled={props.isLoading}
          title="email"
          value={email()}
          onChange={handleEmail}
          placeholder="john@example.com"
        />

        <CustomInput
          disabled={props.isLoading}
          title="password"
          type={isPasswordVisible() ? "text" : "password"}
          value={password()}
          onChange={handlePassword}
          placeholder="password"
          togglePassword={togglePassword}
          showEye={true}
          isPasswordVisible={isPasswordVisible()}
        />
      </div>
    </CustomModal>
  );
};
