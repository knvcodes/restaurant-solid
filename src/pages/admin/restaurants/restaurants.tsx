import { For, Show } from "solid-js";
import { userStore } from "../../../store/userStore";
import { useRestaurants } from "../../../service/restaurants/owner.provider";

const AdminRestaurants = () => {
  const user = userStore.name;

  const data = useRestaurants();

  return (
    <div class="w-full h-full">
      <div class="heading-2">My Restaurants</div>
      <hr class="mb-12" />
      <Show when={data.data && data.data.length > 0}>
        <div class="verticle-list gap-4">
          <For each={data.data}>
            {(restaurantItem) => (
              <div class="flex justify-between border-1 rounded-md px-4 py-2">
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
