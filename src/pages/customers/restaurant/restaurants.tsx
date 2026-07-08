import { createEffect, createSignal, For, Show } from "solid-js";
import "../../style.css";
import Card from "../../../components/Card";
import SearchBar from "../../../components/SearchBar";
import { useNavigate } from "@solidjs/router";
import { foodbg } from "../../../assets/assets";
import RestaurantListingSkeleton from "../../../components/restaurants/RestaurantListingSkeleton";
import {} from "../../../service/restaurants/customer.service";
import { useRestaurants } from "../../../service/restaurants/customer.provider";
import { IRestaurant } from "../../../types";

export default function Restaurants() {
  const navigate = useNavigate();

  const [search, setsearch] = createSignal("&limit=50");

  // listing api
  const restaurantsData = useRestaurants(search);
  const [mostVisitedRestaurants, setmostVisitedRestaurants] = createSignal<
    IRestaurant[] | []
  >([]);

  // restaurant states

  createEffect(() => {
    const sorted = [...(restaurantsData.data ?? [])].sort(
      (a, b) => b.views - a.views,
    );

    setmostVisitedRestaurants(sorted.slice(0, 5));
  });

  function gotoDetailsPage(id: string) {
    navigate(`/restaurants/${id}`);
  }

  // search on change handler
  async function onSearchChange(value: string) {
    setsearch(value + "&limit=50");
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
        {/* mostVisited */}
        <h1 class="text-2xl my-4 mt-27 font-bold lg:px-0 px-6">Most visited</h1>
        <div class="mb-4 overflow-scroll">
          <Show when={restaurantsData.isPending}>
            <RestaurantListingSkeleton />
          </Show>
          <Show
            when={
              !restaurantsData.isPending && mostVisitedRestaurants().length > 0
            }
            fallback={<>No Restaurants found</>}
          >
            <div class="flex gap-2">
              <For each={mostVisitedRestaurants()}>
                {(restaurantItem) => (
                  <Card
                    trending={true}
                    onClick={() => {
                      gotoDetailsPage(restaurantItem.id);
                    }}
                    cuisine={restaurantItem.cuisine}
                    name={restaurantItem.name}
                  />
                )}
              </For>
            </div>
          </Show>
        </div>

        {/* <Filters /> */}
        <div class="flex md:flex-row flex-col justify-between pt-12 mb-4 gap-4 lg:px-0 px-6">
          <div class="font-bold text-2xl">All Restaurants</div>
          <SearchBar onChange={onSearchChange} />
        </div>
        <div class="flex flex-col mt-2">
          {/* listing */}

          <Show when={restaurantsData.isPending}>
            <RestaurantListingSkeleton />
          </Show>

          <Show when={restaurantsData.data && restaurantsData.data.length > 0}>
            <div class="grid xl:grid-cols-2 lg:grid-cols-1 gap-4">
              <For each={restaurantsData.data}>
                {(restaurantItem) => (
                  <Card
                    onClick={() => {
                      gotoDetailsPage(restaurantItem.id);
                    }}
                    cuisine={restaurantItem.cuisine}
                    name={restaurantItem.name}
                  />
                )}
              </For>
            </div>
          </Show>

          <Show when={restaurantsData.data && restaurantsData.data.length == 0}>
            <div>No restaurants found</div>
          </Show>
        </div>
      </div>
    </div>
  );
}
