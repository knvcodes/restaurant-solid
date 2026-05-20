type FieldType = "text" | "number" | "password";
type valueType = string | number | string[] | undefined;

export default function CustomInput(props: {
  title?: string;
  value: valueType;
  type?: FieldType;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  const {
    placeholder = "",
    type,
    onChange = () => {},
    value = "",
    title,
  } = props;

  return (
    <div class="w-full">
      {title && <div>{title}</div>}
      <input
        type={type || "text"}
        value={value}
        placeholder={placeholder || ""}
        class="inputField"
        onInput={(e) => {
          const newValue = e.currentTarget.value;
          onChange(newValue);
        }}
      />
    </div>
  );
}
