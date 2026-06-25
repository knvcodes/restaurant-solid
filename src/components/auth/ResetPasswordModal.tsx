import { createSignal } from "solid-js";
import CustomInput from "../custom/CustomInput";
import { CustomModal } from "../custom/CustomModal";
import { ResetPasswordPayload } from "../../types";
import { Button } from "@kobalte/core/button";
import { openModal } from "../../store/modalStore";
import { useNavigate, useParams } from "@solidjs/router";

interface ResetPasswordModalProps {
  onClose: () => void;
  onResetPassword: (payload: ResetPasswordPayload) => void;
}

export const ResetPasswordModal = (props: ResetPasswordModalProps) => {
  const { onClose, onResetPassword } = props;
  const navigate = useNavigate();
  const params = useParams();

  const [newPassword, setnewPassword] = createSignal("");
  const [confirmPassword, setconfirmPassword] = createSignal("");
  const [isNewPasswordVisible, setisNewPasswordVisible] = createSignal(false);
  const [isConfirmPasswordVisible, setisConfirmPasswordVisible] =
    createSignal(false);

  const handleNewPassword = (value: string) => {
    setnewPassword(value);
  };
  const handleConfirmPassword = (value: string) => {
    setconfirmPassword(value);
  };

  const toggleNewPassword = () => {
    setisNewPasswordVisible((prev) => !prev);
  };
  const toggleConfirmPassword = () => {
    setisConfirmPasswordVisible((prev) => !prev);
  };

  const handleSubmit = () => {
    onResetPassword({
      token: params.id,
      newPassword: newPassword(),
      confirmPassword: confirmPassword(),
    });
  };

  const handleGoBack = () => {
    openModal("forgotPassword");
    navigate("/", {
      replace: true,
    });
  };

  return (
    <CustomModal
      title="Reset Password"
      rightBtnFn={handleSubmit}
      rightBtnText="ResetPassword"
      onClose={() => {
        onClose();
        navigate("/", {
          replace: true,
        });
      }}
      customButtons={
        <div>
          <Button class="w-full button-y" onclick={handleSubmit}>
            Reset Password
          </Button>

          <div
            onclick={handleGoBack}
            class="mt-4 text-sm text-center text-blue-500 label cursor-pointer"
          >
            Go Back
          </div>
        </div>
      }
    >
      <div class="py-4">
        <CustomInput
          title="New Password"
          type={isNewPasswordVisible() ? "text" : "password"}
          value={newPassword()}
          onChange={handleNewPassword}
          placeholder="new password"
          togglePassword={toggleNewPassword}
          showEye={true}
          isPasswordVisible={isNewPasswordVisible()}
        />
        <CustomInput
          title="Confirm Password"
          type={isConfirmPasswordVisible() ? "text" : "password"}
          value={confirmPassword()}
          onChange={handleConfirmPassword}
          placeholder="confirm password"
          togglePassword={toggleConfirmPassword}
          showEye={true}
          isPasswordVisible={isConfirmPasswordVisible()}
        />
      </div>
    </CustomModal>
  );
};
