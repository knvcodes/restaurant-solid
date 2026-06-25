import { createSignal, Show } from "solid-js";
import { CustomModal } from "../custom/CustomModal";
import { LoginPayload } from "../../types";
import GoogleSignIn from "./GoogleOauthButton";
import { Button } from "@kobalte/core/button";
import { openModal } from "../../store/modalStore";
import Spinner from "../loaders/Spinner";
import { CustomField } from "../custom/CustomField";
import { CustomForm } from "../custom/CustomForm";
import { createForm, handleSubmit as formSubmit } from "@formisch/solid";
import { loginSchema } from "../../validations/auth/auth";
import { CustomButton } from "../custom/CustomButton";

interface LoginModalProps {
  onClose: () => void;
  onLogin: (payload: LoginPayload) => void;
  onRegister: () => void;
  isLoading: boolean;
}

export const LoginModal = (props: LoginModalProps) => {
  const { onClose, onLogin, onRegister } = props;

  const loginForm = createForm({
    schema: loginSchema,
    validate: "input",
    revalidate: "input",
  });

  const [isPasswordVisible, setisPasswordVisible] = createSignal(false);

  const togglePassword = () => {
    if (props.isLoading) return;
    setisPasswordVisible((prev) => !prev);
  };

  const loginSubmit = formSubmit(loginForm, (values) => {
    onLogin({
      ...values,
    });
  });

  const handleSubmit = (values: LoginPayload) => {
    onLogin({
      ...values,
    });
  };

  const handleForgotPassword = () => {
    if (props.isLoading) return;
    openModal("forgotPassword");
  };

  return (
    <CustomModal
      title="Login"
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

          <CustomButton
            label="Login"
            isLoading={props.isLoading}
            disabled={!loginForm.isValid}
            onClick={loginSubmit}
          />

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
        <CustomForm of={loginForm} onSubmit={handleSubmit}>
          <CustomField
            path={["email"]}
            of={loginForm}
            disabled={props.isLoading}
            label="email"
            placeholder="john@example.com"
          />

          <CustomField
            path={["password"]}
            of={loginForm}
            disabled={props.isLoading}
            label="password"
            type={isPasswordVisible() ? "text" : "password"}
            placeholder="password"
            togglePassword={togglePassword}
            showEye={true}
            isPasswordVisible={isPasswordVisible()}
          />
          <button type="submit" style="display: none;" aria-hidden="true" />
        </CustomForm>
      </div>
    </CustomModal>
  );
};
