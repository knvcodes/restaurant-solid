// images
import darkPattern from "../assets/dark-pattern.jpg";

// components
import CustomInput from "../components/custom/CustomInput";
import { createEffect, createSignal } from "solid-js";
import { Button } from "@kobalte/core/button";

import "./style.css";

export default function AdminLogin() {
  const [email, setEmail] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");

  return (
    <div class={`h-screen relative`}>
      <div
        class="h-full absolute w-full"
        style={{
          "background-image": `url(${darkPattern})`,
          "background-size": "cover",
          "background-position": "center",
        }}
      >
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

            <Button class="w-full">Log In</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
