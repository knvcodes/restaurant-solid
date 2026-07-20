// images
import { JSX } from "solid-js";
import darkPattern from "../assets/dark-pattern.webp";

const AdminAuthLayout = (props: { children?: JSX.Element }) => {
  return (
    <div class={`h-screen relative`}>
      <div
        class="h-full absolute w-full"
        style={{
          "background-image": `url(${darkPattern})`,
          "background-size": "cover",
          "background-position": "center",
          "background-blend-mode": "overlay",
        }}
      >
        <div class="w-full h-screen bottom-0 top-0 flex-center text-white fullpage">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AdminAuthLayout;
