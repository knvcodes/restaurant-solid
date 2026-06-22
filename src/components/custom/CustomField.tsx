// components/CustomField.tsx
import {
  Component,
  createEffect,
  JSX,
  mergeProps,
  Show,
  splitProps,
} from "solid-js";
import { Field, FieldStore } from "@modular-forms/solid";
import { EyeIcon, EyeOffIcon } from "../icons/EyeIcons";

// The actual field render props type from Modular Forms

type CustomFieldProps = {
  of: any; // Form store returned by createForm
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  class?: string;
  validate?: any;
  transform?: any;
  togglePassword?: () => void;
  isPasswordVisible?: boolean;
  showEye?: boolean;
};

export const CustomField: Component<CustomFieldProps> = (props) => {
  const merged = mergeProps(
    { type: "text", class: "inputField w-full", togglePassword: () => {} },
    props,
  );

  const [fieldProps, local] = splitProps(merged, [
    "of",
    "name",
    "validate",
    "transform",
  ]);

  createEffect(() => {
    console.info("local:===>", local);
  });

  return (
    <Field {...fieldProps}>
      {(field: FieldStore<any, any>, fieldProps: any) => (
        <div class="relative">
          <label for={props.name}>{props.label}</label>
          <input
            {...fieldProps}
            class="inputField"
            type={local.type ?? "text"}
            id={merged.name}
            placeholder={props.placeholder}
            value={field.value ?? ""}
            aria-invalid={!!field.error}
            aria-describedby={field.error ? `${props.name}-error` : undefined}
          />

          <Show when={local.showEye && local.isPasswordVisible}>
            <EyeIcon
              class="absolute right-3 top-1/2"
              onClick={local.togglePassword}
            />
          </Show>

          <Show when={local.showEye && !local.isPasswordVisible}>
            <EyeOffIcon
              class="absolute right-3 top-1/2"
              onClick={local.togglePassword}
            />
          </Show>

          {field.error && (
            <span id={`${props.name}-error`} class="error">
              {field.error}
            </span>
          )}
        </div>
      )}
    </Field>
  );
};
