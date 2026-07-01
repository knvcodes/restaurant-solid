import { createSignal, For, Show } from "solid-js";
import "../../style.css";
import Card from "../../../components/Card";
import { IRestaurant } from "../../../types";
import SearchBar from "../../../components/SearchBar";
import { isEmpty } from "../../../utils/helpers";
import { useNavigate } from "@solidjs/router";
import { foodbg } from "../../../assets/assets";
import RestaurantListingSkeleton from "../../../components/restaurants/RestaurantListingSkeleton";
import { restaurantListing } from "../../../service/restaurants/customer.service";

export default function Restaurants() {
  const [restaurants, setrestaurants] = createSignal<IRestaurant[] | []>([]);
  const [trendingRestaurants, settrendingRestaurants] = createSignal<
    IRestaurant[] | []
  >([]);

  const navigate = useNavigate();

  const fetchRestauraunts = async () => {
    const restaurantsData = await restaurantListing();
    setrestaurants(restaurantsData);
    settrendingRestaurants(restaurantsData.slice(0, 5));
  };

  function gotoDetailsPage(id: string) {
    navigate(`/restaurants/${id}`);
  }

  async function onSearchChange(value: string) {
    if (isEmpty(value)) {
      fetchRestauraunts();
      return;
    }

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
        {/* trending */}
        <h1 class="text-2xl my-2 mt-27 font-bold">Trending</h1>
        <div class="mb-4 overflow-scroll">
          <Show
            when={trendingRestaurants().length > 0}
            fallback={<RestaurantListingSkeleton />}
          >
            <div class="flex gap-2">
              <For each={trendingRestaurants()}>
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
        <div class="horizontal-list justify-between pt-12 mb-4">
          <div class="font-bold text-2xl">All Restaurants</div>
          <SearchBar onChange={onSearchChange} />
        </div>
        <div class="flex flex-col mt-2">
          {/* listing */}
          <Show
            when={restaurants().length > 0}
            fallback={<RestaurantListingSkeleton />}
          >
            <div class="grid xl:grid-cols-2 lg:grid-cols-1 gap-4">
              <For each={restaurants()}>
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
        </div>
      </div>
    </div>
  );
}
