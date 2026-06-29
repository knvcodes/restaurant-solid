/// <reference types="google.accounts" />
import { onMount, createSignal } from "solid-js";
import { oauthLogin } from "../../service/auth/auth.service";

export default function GoogleSignIn() {
  const [buttonRef, setbuttonRef] = createSignal<HTMLDivElement>();

  onMount(() => {
    const el = buttonRef();
    if (!el) return; // guard against undefined

    // Wrap in a non-async callback that calls your async function
    const handleCredentialResponse = (
      response: google.accounts.id.CredentialResponse,
    ) => {
      // Google doesn't await this, so we handle errors internally
      oauthLogin(response).catch((err) => {
        console.error("OAuth login failed:", err);
      });
    };

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
      itp_support: true,
    });

    window.google.accounts.id.renderButton(el, {
      type: "standard",
      theme: "outline",
      size: "large",
    });
  });

  return <div ref={setbuttonRef} class="my-2 w-full" />;
}
