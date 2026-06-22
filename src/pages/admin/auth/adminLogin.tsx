import { createSignal } from "solid-js";
import { Button } from "@kobalte/core/button";

import "../../style.css";
import { CustomForm } from "../../../components/custom/CustomForm";
import { createForm } from "@modular-forms/solid";
import { LoginForm } from "../../../types";
import { CustomField } from "../../../components/custom/CustomField";

export default function AdminLogin() {
  const [loginForm] = createForm<LoginForm>();

  const [isPasswordVisible, setisPasswordVisible] = createSignal(false);

  const togglePassword = () => {
    setisPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (values: LoginForm) => {
    console.info("values:===>", values);
  };

  return (
    <div class="p-4 w-1/4 flex-center flex-col align-start gap-4">
      <div class="absolute top-10 left-10 heading-2">
        Welcome to Restaurant Management
      </div>

      <CustomForm of={loginForm} title="Login" onSubmit={handleSubmit}>
        <div class="my-4">
          <CustomField name="email" type="email" label="Email" of={loginForm} />

          <CustomField
            name="password"
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
