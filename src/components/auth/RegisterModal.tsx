import { createSignal } from "solid-js";
import CustomInput from "../custom/CustomInput";
import { CustomModal } from "../custom/CustomModal";
import { RegisterPayload } from "../../types";
import { openModal } from "../../store/modalStore";
import { createForm, handleSubmit } from "@formisch/solid";
import { registerSchema } from "../../validations/auth/auth";
import { CustomField } from "../custom/CustomField";
import { CustomForm } from "../custom/CustomForm";

interface RegisterModalProps {
  onClose: () => void;
  onRegister: (payload: RegisterPayload) => void;
  isLoading: boolean;
}

export const RegisterModal = (props: RegisterModalProps) => {
  const { onClose, onRegister } = props;

  const regsiterForm = createForm({
    schema: registerSchema,
    validate: "input",
    revalidate: "input",
  });

  const [isPasswordVisible, setisPasswordVisible] = createSignal(false);

  const togglePassword = () => {
    setisPasswordVisible((prev) => !prev);
  };

  const onLogin = () => {
    openModal("login");
  };

  const formSubmit = handleSubmit(regsiterForm, (values) => {
    onRegister({
      ...values,
      role: "customer",
      isOAuth: false,
    });
  });

  return (
    <CustomModal
      title="Register"
      rightBtnFn={formSubmit}
      rightBtnText="Register"
      isLoading={props.isLoading}
      onClose={onClose}
    >
      <div class="py-4">
        <CustomForm of={regsiterForm} onSubmit={formSubmit}>
          <CustomField
            label="name"
            of={regsiterForm}
            path={["name"]}
            placeholder="name"
          />

          <CustomField
            type="email"
            label="email"
            of={regsiterForm}
            path={["email"]}
            placeholder="email"
          />

          <CustomField
            path={["password"]}
            of={regsiterForm}
            label="password"
            type={isPasswordVisible() ? "text" : "password"}
            showEye={true}
            togglePassword={togglePassword}
            isPasswordVisible={isPasswordVisible()}
          />
        </CustomForm>
      </div>

      <div class="mb-2 text-sm" onclick={onLogin}>
        Already have an account?{" "}
        <span class="text-blue-500 label cursor-pointer">Login</span>
      </div>
    </CustomModal>
  );
};
