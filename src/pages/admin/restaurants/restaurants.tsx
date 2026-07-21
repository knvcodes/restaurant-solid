import { For, Show } from "solid-js";
import { userStore } from "../../../store/userStore";
import { useRestaurants } from "../../../service/restaurants/owner.provider";
import { CustomButton } from "../../../components/custom/CustomButton";

const AdminRestaurants = () => {
  const user = userStore.name;

  const data = useRestaurants();

  return (
    <div class="w-full h-full">
      <div class="flex justify-between items-center mb-4">
        <div class="heading-2">My Restaurants</div>
        <CustomButton label="Add Restaurant" classes="w-48 button-y" />
      </div>
      <hr class="mb-12" />
      <Show when={data.data && data.data.length > 0}>
        <div class="verticle-list gap-4 overflow-scroll h-9/12">
          <For each={data.data}>
            {(restaurantItem) => (
              <div class="flex justify-between border-b-1 bg-black h-24  px-4 py-2">
                <div>{restaurantItem.name}</div>
                <div class="text-yellow-400">Online</div>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default AdminRestaurants;
