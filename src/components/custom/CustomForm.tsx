// components/CustomForm.tsx
import { Form } from "@formisch/solid";
import { Component, splitProps, ParentProps } from "solid-js";

type CustomFormProps = ParentProps<{
  of: any;
  onSubmit: (values: any) => void | Promise<any>;
  title?: string;
}>;

export const CustomForm: Component<CustomFormProps> = (props) => {
  const [local, formProps] = splitProps(props, ["title", "children"]);

  return (
    <div class="lg:w-1/3 md:w-1/2 w-full">
      {local.title && <h2 class="heading-2">{local.title}</h2>}
      <Form {...formProps} class="my-4">
        {local.children}
      </Form>
    </div>
  );
};
