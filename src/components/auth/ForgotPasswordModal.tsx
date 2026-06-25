import { CustomModal } from "../custom/CustomModal";
import { ForgotPasswordPayload } from "../../types";
import { openModal } from "../../store/modalStore";
import { CustomForm } from "../custom/CustomForm";
import { CustomField } from "../custom/CustomField";
import { createForm, handleSubmit } from "@formisch/solid";
import { forgotPasswordSchema } from "../../validations/auth/auth";

interface ForgotPasswordModalProps {
  onClose: () => void;
  onForgotPassword: (payload: ForgotPasswordPayload) => void;
  isLoading: boolean;
}

export const ForgotPasswordModal = (props: ForgotPasswordModalProps) => {
  const { onClose, onForgotPassword } = props;

  const forgotPasswordForm = createForm({
    schema: forgotPasswordSchema,
    validate: "input",
    revalidate: "input",
  });

  const onClickSubmit = handleSubmit(forgotPasswordForm, (values) => {
    onForgotPassword({
      ...values,
    });
  });

  const onLogin = () => {
    openModal("login");
  };

  return (
    <CustomModal
      title="Forgot Password"
      rightBtnText="Submit"
      isLoading={props.isLoading}
      onClose={onClose}
      invalid={!forgotPasswordForm.isValid}
      rightBtnFn={onClickSubmit}
    >
      <div class="py-4">
        <CustomForm of={forgotPasswordForm} onSubmit={onClickSubmit}>
          <CustomField
            path={["email"]}
            of={forgotPasswordForm}
            disabled={props.isLoading}
            label="email"
            placeholder="john@example.com"
          />
        </CustomForm>
      </div>

      <div class="mb-2 text-sm" onclick={onLogin}>
        Go back to <span class="text-blue-500 label cursor-pointer">Login</span>
      </div>
    </CustomModal>
  );
};
