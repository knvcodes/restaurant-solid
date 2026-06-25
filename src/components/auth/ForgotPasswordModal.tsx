import { createSignal } from "solid-js";
import CustomInput from "../custom/CustomInput";
import { CustomModal } from "../custom/CustomModal";
import { ForgotPasswordPayload } from "../../types";
import { openModal } from "../../store/modalStore";

interface ForgotPasswordModalProps {
  onClose: () => void;
  onForgotPassword: (payload: ForgotPasswordPayload) => void;
}

export const ForgotPasswordModal = (props: ForgotPasswordModalProps) => {
  const { onClose, onForgotPassword } = props;

  const [email, setemail] = createSignal("");

  const handleEmail = (value: string) => {
    setemail(value);
  };

  const handleSubmit = () => {
    onForgotPassword({
      email: email(),
    });
  };

  const onLogin = () => {
    openModal("login");
  };

  return (
    <CustomModal
      title="Forgot Password"
      rightBtnFn={handleSubmit}
      rightBtnText="Submit"
      onClose={onClose}
    >
      <div class="py-4">
        <CustomInput title="email" value={email()} onChange={handleEmail} />
      </div>

      <div class="mb-2 text-sm" onclick={onLogin}>
        Go back to <span class="text-blue-500 label cursor-pointer">Login</span>
      </div>
    </CustomModal>
  );
};
