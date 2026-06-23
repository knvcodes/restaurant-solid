import { createSignal } from "solid-js";
import CustomInput from "../custom/CustomInput";
import { CustomModal } from "../custom/CustomModal";
import { RegisterPayload } from "../../types";
import { openModal } from "../../store/modalStore";

interface RegisterModalProps {
  onClose: () => void;
  onRegister: (payload: RegisterPayload) => void;
}

export const RegisterModal = (props: RegisterModalProps) => {
  const { onClose, onRegister } = props;

  const [name, setname] = createSignal("");
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
    onRegister({
      name: name(),
      email: email(),
      password: password(),
      role: "customer",
      isOAuth: false,
    });
  };

  const onLogin = () => {
    openModal("login");
  };

  return (
    <CustomModal
      title="Register"
      rightBtnFn={handleSubmit}
      rightBtnText="Register"
      onClose={onClose}
    >
      <div class="py-4">
        <CustomInput title="email" value={email()} onChange={handleEmail} />

        <CustomInput
          title="password"
          type={isPasswordVisible() ? "text" : "password"}
          showEye={true}
          value={password()}
          togglePassword={togglePassword}
          onChange={handlePassword}
          isPasswordVisible={isPasswordVisible()}
        />
      </div>

      <div class="mb-2 text-sm" onclick={onLogin}>
        Already have an account?{" "}
        <span class="text-blue-500 label cursor-pointer">Login</span>
      </div>
    </CustomModal>
  );
};
