import { createSignal } from "solid-js";
import CustomInput from "../custom/CustomInput";
import { CustomModal } from "../custom/CustomModal";
import { LoginPayload } from "../../types";

interface LoginModalProps {
  onClose: () => void;
  onLogin: (payload: LoginPayload) => void;
  onRegister: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
  const { onClose, onLogin, onRegister } = props;

  const [email, setemail] = createSignal("");
  const [password, setpassword] = createSignal("");
  const [isPasswordVisible, setisPasswordVisible] = createSignal(false);

  const handleEmail = (value: string) => {
    setemail(value);
  };

  const handlePassword = (value: string) => {
    setpassword(value);
  };

  const togglePassword = () => {
    setisPasswordVisible((prev) => !prev);
  };

  const handleSubmit = () => {
    onLogin({
      email: email(),
      password: password(),
    });
  };

  return (
    <CustomModal
      title="Login"
      rightBtnFn={handleSubmit}
      rightBtnText="Login"
      onClose={onClose}
    >
      <div class="py-4">
        <CustomInput title="email" value={email()} onChange={handleEmail} />

        <CustomInput
          title="password"
          type={isPasswordVisible() ? "text" : "password"}
          value={password()}
          onChange={handlePassword}
          togglePassword={togglePassword}
          showEye={true}
          isPasswordVisible={isPasswordVisible()}
        />
      </div>

      <div class="mb-2 text-sm" onclick={onRegister}>
        Need Account?{" "}
        <span class="text-blue-500 label cursor-pointer">Register here</span>
      </div>
    </CustomModal>
  );
};
