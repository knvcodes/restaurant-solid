import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import "../../style.css";
import Card from "../../../components/Card";
import api from "../../../utils/axios";
import { IResponse, IRestaurant } from "../../../types";
import SearchBar from "../../../components/SearchBar";
import { generateAddress, isEmpty } from "../../../utils/helpers";
import { useNavigate } from "@solidjs/router";
import { foodbg } from "../../../assets/assets";
import RestaurantListingSkeleton from "../../../components/restaurants/RestaurantListingSkeleton";
import { restaurantListing } from "../../../service/restaurants/customer.service";

export default function Restaurants() {
  const [restaurants, setrestaurants] = createSignal<IRestaurant[] | []>([]);

  const navigate = useNavigate();

  const fetchRestauraunts = async () => {
    const restaurantsData = await restaurantListing();
    setrestaurants(restaurantsData);
  };

  // fetching all restaurants
  onMount(async () => {
    fetchRestauraunts();
  });

  function gotoDetailsPage(id: string) {
    navigate(`/restaurants/${id}`);
  }

  async function onSearchChange(value: string) {
    if (isEmpty(value)) fetchRestauraunts();

    const restaurantsData = await restaurantListing(value);
    setrestaurants(restaurantsData);
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
