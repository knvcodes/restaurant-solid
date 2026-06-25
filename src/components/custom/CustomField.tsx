// components/CustomField.tsx
import { Component, JSX, mergeProps, Show, splitProps } from "solid-js";
import { useField, type FormStore, type FormSchema } from "@formisch/solid";
import { EyeIcon, EyeOffIcon } from "../icons/EyeIcons";
import type * as v from "valibot";

type CustomFieldProps<TSchema extends FormSchema = FormSchema> = {
  of: FormStore<TSchema>;
  path: readonly [string]; // or use ValidPath type if available
  type?: string;
  label: string;
  placeholder?: string;
  class?: string;
  togglePassword?: () => void;
  isPasswordVisible?: boolean;
  showEye?: boolean;
  disabled?: boolean;
};

export const CustomField: Component<CustomFieldProps> = (props) => {
  const merged = mergeProps(
    {
      type: "text",
      class: "inputField w-full",
      togglePassword: () => {},
      disabled: false,
    },
    props,
  );

  const [fieldProps, local] = splitProps(merged, ["of", "path"]);

  const field = useField(fieldProps.of, { path: fieldProps.path });

  return (
    <div>
      <label for={merged.path[0]}>{local.label}</label>

      <div class="relative">
        <input
          disabled={merged.disabled}
          {...field.props}
          class="inputField"
          type={local.type}
          id={merged.path[0]}
          placeholder={local.placeholder}
          value={(field.input as string | undefined) ?? ""}
          aria-invalid={!!field.errors}
          aria-describedby={
            field.errors ? `${merged.path[0]}-error` : undefined
          }
        />

        <Show when={local.showEye && local.isPasswordVisible}>
          <EyeIcon
            class="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={local.togglePassword}
          />
        </Show>

        <Show when={local.showEye && !local.isPasswordVisible}>
          <EyeOffIcon
            class="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={local.togglePassword}
          />
        </Show>
      </div>

      {field.errors && field.isTouched && (
        <div id={`${merged.path[0]}-error`} class="error-text">
          {field.errors[0]}
        </div>
      )}
    </div>
  );
};
