import { createSignal } from "solid-js";
import { Button } from "@kobalte/core/button";

import "../../style.css";
import { CustomForm } from "../../../components/custom/CustomForm";
import { LoginForm } from "../../../types";
import { CustomField } from "../../../components/custom/CustomField";
import { loginSchema } from "../../../validations/auth/auth";
import { createForm } from "@formisch/solid";
import { login } from "../../../service/auth/auth.service";

export default function AdminLogin() {
  const loginForm = createForm({
    schema: loginSchema,
  });

  const [isLoading, setisLoading] = createSignal(false);
  const [isPasswordVisible, setisPasswordVisible] = createSignal(false);

  const togglePassword = () => {
    setisPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (values: LoginForm) => {
    await login(
      {
        ...values,
      },
      setisLoading,
    );
  };

  return (
    <div class="p-4 w-full flex-center flex-col align-start gap-4">
      <div class="absolute top-10 left-10 heading-2">
        Welcome to Restaurant Management
      </div>

      <div class="lg:w-1/3 md:w-1/2 ">
        <h2 class="heading-2">Login</h2>

        <CustomForm of={loginForm} onSubmit={handleSubmit}>
          <div class="my-4">
            <CustomField
              disabled={isLoading()}
              path={["email"]}
              type="email"
              label="Email"
              of={loginForm}
            />

            <CustomField
              disabled={isLoading()}
              path={["password"]}
              type={isPasswordVisible() ? "text" : "password"}
              label="Password"
              of={loginForm}
              togglePassword={togglePassword}
              showEye={true}
              isPasswordVisible={isPasswordVisible()}
            />
          </div>

          <Button class="w-full button-y" type="submit" disabled={isLoading()}>
            Log In
          </Button>
        </CustomForm>
      </div>
    </div>
  );
}
