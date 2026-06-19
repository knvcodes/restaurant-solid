import { createSignal } from "solid-js";
import CustomInput from "../custom/CustomInput";
import { CustomModal } from "../custom/CustomModal";
import { RegisterPayload } from "../../types";

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
    </CustomModal>
  );
};
