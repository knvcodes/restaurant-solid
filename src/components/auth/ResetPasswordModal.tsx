import { createSignal } from "solid-js";
import { CustomModal } from "../custom/CustomModal";
import { ResetPasswordPayload } from "../../types";
import { openModal } from "../../store/modalStore";
import { useNavigate, useParams } from "@solidjs/router";
import { CustomButton } from "../custom/CustomButton";
import { createForm, handleSubmit } from "@formisch/solid";
import { resetPasswordSchema } from "../../validations/auth/auth";
import { CustomField } from "../custom/CustomField";
import { CustomForm } from "../custom/CustomForm";

interface ResetPasswordModalProps {
  onClose: () => void;
  isLoading: boolean;
  onResetPassword: (payload: ResetPasswordPayload) => void;
}

export const ResetPasswordModal = (props: ResetPasswordModalProps) => {
  const { onClose, onResetPassword } = props;
  const navigate = useNavigate();
  const params = useParams();

  const resetForm = createForm({
    schema: resetPasswordSchema,
    validate: "input",
    revalidate: "input",
    initialInput: {
      token: params.id,
    },
  });

  const [isNewPasswordVisible, setisNewPasswordVisible] = createSignal(false);
  const [isConfirmPasswordVisible, setisConfirmPasswordVisible] =
    createSignal(false);

  const toggleNewPassword = () => {
    setisNewPasswordVisible((prev) => !prev);
  };
  const toggleConfirmPassword = () => {
    setisConfirmPasswordVisible((prev) => !prev);
  };

  const handleGoBack = () => {
    openModal("forgotPassword");
    navigate("/", {
      replace: true,
    });
  };

  const formSubmit = handleSubmit(resetForm, (values) => {
    onResetPassword({
      ...values,
    });
  });

  return (
    <CustomModal
      title="Reset Password"
      onClose={() => {
        onClose();
        navigate("/", {
          replace: true,
        });
      }}
      customButtons={
        <div>
          <CustomButton
            label="Reset Password"
            isLoading={props.isLoading}
            disabled={!resetForm.isValid}
            onClick={formSubmit}
          />

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
        <CustomForm of={resetForm} onSubmit={formSubmit}>
          <CustomField
            label="New Password"
            of={resetForm}
            path={["newPassword"]}
            type={isNewPasswordVisible() ? "text" : "password"}
            placeholder="new password"
            togglePassword={toggleNewPassword}
            showEye={true}
            isPasswordVisible={isNewPasswordVisible()}
          />
          <CustomField
            label="Confirm Password"
            of={resetForm}
            path={["confirmPassword"]}
            type={isConfirmPasswordVisible() ? "text" : "password"}
            placeholder="confirm password"
            togglePassword={toggleConfirmPassword}
            showEye={true}
            isPasswordVisible={isConfirmPasswordVisible()}
          />
        </CustomForm>
      </div>
    </CustomModal>
  );
};
