// schemas/loginSchema.ts
import * as v from "valibot";
import { messages } from "../../utils/messages";

export const loginSchema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email address")),
  password: v.pipe(
    v.string(messages.login.error.passwordRequired),
    v.minLength(8, messages.login.error.passwordMin),
    v.maxLength(128, messages.login.error.passwordMax),
    v.regex(/[A-Z]/, messages.login.error.passwordUppercase),
    v.regex(/[a-z]/, messages.login.error.passwordLowercase),
    v.regex(/[0-9]/, messages.login.error.passwordNumber),
    v.regex(/[^A-Za-z0-9]/, messages.login.error.passwordSpecial),
  ),
});

export type LoginForm = v.InferOutput<typeof loginSchema>;
