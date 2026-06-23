import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import "../../style.css";
import Card from "../../../components/Card";
import api from "../../../utils/axios";
import { IResponse, IRestaurant } from "../../../types";
import SearchBar from "../../../components/SearchBar";
import { generateAddress } from "../../../utils/helpers";
import { useNavigate } from "@solidjs/router";
import { foodbg } from "../../../assets/assets";
import RestaurantListingSkeleton from "../../../components/restaurants/RestaurantListingSkeleton";

export default function Restaurants() {
  const [restaurants, setrestaurants] = createSignal<IRestaurant[] | []>([]);

  const navigate = useNavigate();

  // fetching all restaurants
  onMount(async () => {
    const response: IResponse<IRestaurant[]> =
      await api.get("/restaurants/list");

    setrestaurants(response.data.data);
  });

  function gotoDetailsPage(id: string) {
    navigate(`/restaurants/${id}`);
  }

  async function onSearchChange(value: string) {
    const response: IResponse<IRestaurant[]> = await api.get(
      `/restaurants/list?search=${value}`,
    );
    // setrestaurants(response.data.data);
  }

  return (
    <div class="min-h-screen">
      <div
        class="absolute h-full w-full"
        style={{
          "background-image": `url(${foodbg})`,
          "background-size": "500px",
          "background-repeat": "repeat",
          opacity: 0.1,
        }}
      ></div>
      <div class="relative mt-20 lg:px-12 md:px-0 lg:w-5/6 sm:w-full mx-auto bg-white">
        {/* <Filters /> */}
        <div class="flex flex-col pt-12">
          <SearchBar onChange={onSearchChange} />

          {/* listing */}
          <div class="grid xl:grid-cols-2 lg:grid-cols-1 gap-4">
            <Show
              when={restaurants().length > 0}
              fallback={<RestaurantListingSkeleton />}
            >
              <For each={restaurants()}>
                {(restaurantItem) => (
                  <Card
                    onClick={() => {
                      gotoDetailsPage(restaurantItem.id);
                    }}
                    name={restaurantItem.name}
                    city={restaurantItem.borough}
                    address={generateAddress(restaurantItem)}
                  />
                )}
              </For>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
}
