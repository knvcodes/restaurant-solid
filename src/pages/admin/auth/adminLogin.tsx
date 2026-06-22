import { createSignal } from "solid-js";
import { Button } from "@kobalte/core/button";

import "../../style.css";
import { CustomForm } from "../../../components/custom/CustomForm";
import { LoginForm } from "../../../types";
import { CustomField } from "../../../components/custom/CustomField";
import { loginSchema } from "../../../validations/auth/auth";
import { createForm } from "@formisch/solid";

export default function AdminLogin() {
  const loginForm = createForm({
    schema: loginSchema,
  });
  const [isPasswordVisible, setisPasswordVisible] = createSignal(false);

  const togglePassword = () => {
    setisPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (values: LoginForm) => {
    const typedValues = values as unknown as LoginForm;
    console.info("values:===>", typedValues);
  };

  return (
    <div class="p-4 w-full flex-center flex-col align-start gap-4">
      <div class="absolute top-10 left-10 heading-2">
        Welcome to Restaurant Management
      </div>

      <CustomForm of={loginForm} title="Login" onSubmit={handleSubmit}>
        <div class="my-4">
          <CustomField
            path={["email"]}
            type="email"
            label="Email"
            of={loginForm}
          />

          <CustomField
            path={["password"]}
            type={isPasswordVisible() ? "text" : "password"}
            label="Password"
            of={loginForm}
            togglePassword={togglePassword}
            showEye={true}
            isPasswordVisible={isPasswordVisible()}
          />
        </div>

        <Button class="w-full button-y" type="submit">
          Log In
        </Button>
      </CustomForm>
    </div>
  );
}
