// images
import { JSX } from "solid-js";
import darkPattern from "../assets/dark-pattern.webp";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = (props: { children?: JSX.Element }) => {
  return (
    <div class={`h-screen relative`}>
      <div class="h-full absolute w-full bg-black/95">
        <div class="w-full h-screen bottom-0 top-0 flex-center text-white fullpage">
          <AdminSidebar />
          <div class="w-full h-full p-8">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
