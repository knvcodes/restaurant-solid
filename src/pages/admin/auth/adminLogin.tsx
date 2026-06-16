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
    <div class={`h-screen relative`}>
      <div
        class="h-full absolute w-full"
        style={{
          "background-image": `url(${darkPattern})`,
          "background-size": "cover",
          "background-position": "center",
          "background-blend-mode": "overlay",
        }}
      >
        <div class="absolute inset-0 bg-black/20" />

        <div class="w-full h-screen bottom-0 top-0 flex-center text-white fullpage">
          <div class="p-4 w-1/4 flex-center flex-col align-start gap-4">
            <div class="absolute top-10 left-10 title">
              Welcome to Restaurant Management
            </div>

            <div class="title mb-4">Login</div>
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

            <Button class="w-full button-y" onclick={handleSubmit}>
              Log In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
