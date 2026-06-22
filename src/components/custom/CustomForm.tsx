// components/CustomForm.tsx
import { Component, JSX, splitProps, ParentProps } from "solid-js";
import { Form } from "@modular-forms/solid";

type CustomFormProps = ParentProps<{
  of: any;
  onSubmit?: (values: any) => void | Promise<any>;
  title?: string;
  class?: string;
}>;

export const CustomForm: Component<CustomFormProps> = (props) => {
  const [local, formProps] = splitProps(props, ["title", "children", "class"]);

  return (
    <div class={local.class}>
      {local.title && <h2 class="heading-2">{local.title}</h2>}
      <Form {...formProps} class="my-4">
        {local.children}
      </Form>
    </div>
  );
};
