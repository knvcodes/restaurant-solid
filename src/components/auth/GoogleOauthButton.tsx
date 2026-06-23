/// <reference types="google.accounts" />
import { onMount, createSignal } from "solid-js";
import api from "../../utils/axios";

export default function GoogleSignIn() {
  const [buttonRef, setbuttonRef] = createSignal<HTMLDivElement>();

  onMount(() => {
    const el = buttonRef();
    if (!el) return; // guard against undefined

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    window.google.accounts.id.renderButton(el, {
      type: "standard",
      theme: "outline",
      size: "large",
    });
  });

  const handleCredentialResponse = (
    response: google.accounts.id.CredentialResponse,
  ) => {
    api.post(
      "/auth/oauth",
      JSON.stringify({ credential: response.credential }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  };

  return <div ref={setbuttonRef} class="my-2 w-full" />;
}
