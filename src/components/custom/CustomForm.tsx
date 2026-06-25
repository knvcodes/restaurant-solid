// components/CustomForm.tsx
import { Form } from "@formisch/solid";
import { Component, splitProps, ParentProps } from "solid-js";

type CustomFormProps = ParentProps<{
  of: any;
  onSubmit: (values: any) => void | Promise<any>;
}>;

export const CustomForm: Component<CustomFormProps> = (props) => {
  const [local, formProps] = splitProps(props, ["children"]);

  return (
    <Form {...formProps} class="w-full">
      {local.children}
    </Form>
  );
};
