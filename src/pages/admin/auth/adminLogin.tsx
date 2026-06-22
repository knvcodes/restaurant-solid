// images
import darkPattern from "../../../assets/dark-pattern.jpg";

// components
import CustomInput from "../../../components/custom/CustomInput";
import { createSignal } from "solid-js";
import { Button } from "@kobalte/core/button";

import "../../style.css";

export default function AdminLogin() {
  const [email, setEmail] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");

  const handleSubmit = () => {};

  return (
    <div class="p-4 w-1/4 flex-center flex-col align-start gap-4">
      <div class="absolute top-10 left-10 heading-2">
        Welcome to Restaurant Management
      </div>

      <div class="title">Login</div>
      <div class="my-4 w-full">
        <CustomInput
          title="Email"
          type="text"
          placeholder="Email"
          value={email()}
          onChange={(value: string) => setEmail(value)}
        />

        <CustomInput
          title="Password"
          type="password"
          placeholder="Password"
          value={password()}
          onChange={(value: string) => setPassword(value)}
        />
      </div>

      <Button class="w-full button-y" onclick={handleSubmit}>
        Log In
      </Button>
    </div>
  );
}
