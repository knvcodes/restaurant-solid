import { useNavigate } from "@solidjs/router";
import { handleLogout } from "../../store/userStore";

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <div class="w-[300px] h-full gradient-glass-dark flex-col flex p-8 justify-between">
      <div class="heading-2 mb-24">Title</div>
      <div class="flex-col gap-4 flex label-container-dark">
        <div>Dashboard</div>
        <div onclick={() => navigate("/admin/restaurants")}>My restaurants</div>
        <div>Settings</div>
      </div>
      <div class="mt-auto">
        <hr class="mb-4" />
        <div
          class="heading-3 !text-yellow-300"
          onclick={() => {
            handleLogout();
            navigate("/admin/login");
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
