import { Show } from "solid-js";
import { EyeIcon, EyeOffIcon } from "../icons/EyeIcons";

type FieldType = "text" | "number" | "password";
type valueType = string | number | string[] | undefined;

export default function CustomInput(props: {
  title?: string;
  value: valueType;
  type?: FieldType;
  placeholder?: string;
  onChange: (value: string) => void;
  togglePassword?: () => void;
  isPasswordVisible?: boolean;
  showEye?: boolean;
  disabled?: boolean;
}) {
  const {
    placeholder = "",
    onChange = () => {},
    togglePassword = () => {},
    value = "",
    showEye = false,
    title,
    disabled = false,
  } = props;

  return (
    <div class="w-full">
      {title && <div>{title}</div>}
      <div class="relative">
        <input
          disabled={disabled}
          type={props.type || "text"}
          value={value}
          placeholder={placeholder || ""}
          class="inputField"
          onInput={(e) => {
            const newValue = e.currentTarget.value;
            onChange(newValue);
          }}
        />
        <Show when={showEye && props.isPasswordVisible}>
          <EyeIcon
            class="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={togglePassword}
          />
        </Show>

        <Show when={showEye && !props.isPasswordVisible}>
          <EyeOffIcon
            class="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={togglePassword}
          />
        </Show>
      </div>
    </div>
  );
}
