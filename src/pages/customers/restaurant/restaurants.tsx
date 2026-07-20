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
import { Meta } from "@solidjs/meta";

export default function Restaurants() {
  const navigate = useNavigate();

  // searching states
  // infinite scroll states
  const [search, setsearch] = createSignal("");
  const [observerDiv, setobserverDiv] = createSignal<HTMLElement>();

  // listing api
  const restaurantsData = useRestaurants(search);
  const [restaurantListing, setrestaurantListing] = createSignal<IRestaurant[]>(
    [],
  );
  const [mostVisitedRestaurants, setmostVisitedRestaurants] = createSignal<
    IRestaurant[] | []
  >([]);

  createEffect(() => {
    const allList = restaurantsData.data?.pages.flatMap(
      (pageItem) => pageItem.data,
    );

    console.info("aurantsData.data?.pages:===>", restaurantsData.data?.pages);

    if (allList && allList?.length > 0) {
      setrestaurantListing(allList);
    } else {
      setrestaurantListing([]);
    }

    console.info("restaurantsData:===>", allList);
  });

  // restaurant states
  createEffect(() => {
    const sorted = [...(restaurantListing() ?? [])].sort(
      (a, b) => b.views - a.views,
    );
    setmostVisitedRestaurants(sorted.slice(0, 5));
  });

  // infinite scroll pagination increment
  createEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && restaurantsData.hasNextPage) {
          restaurantsData.fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    const observeEle = observerDiv();
    if (observeEle) {
      observer.observe(observeEle);
    }

    return () => observer.disconnect();
  });

  function gotoDetailsPage(id: string) {
    navigate(`/restaurants/${id}`);
  }

  // search on change handler
  async function onSearchChange(value: string) {
    setsearch(value);
  }

  return (
    <div class="min-h-screen">
      <Meta name="restaurant listing" content="lists all restaurants" />
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
        <div class="flex flex-col mt-2 md:px-0 px-4">
          {/* listing */}

          <Show when={restaurantsData.isPending}>
            <RestaurantListingSkeleton />
          </Show>

          <Show when={restaurantsData.data}>
            <div class="grid xl:grid-cols-2 lg:grid-cols-1 gap-4">
              <For each={restaurantListing()}>
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

              <Show when={restaurantsData.isFetchingNextPage}>
                <RestaurantListingSkeleton />
              </Show>

              <div ref={setobserverDiv} class="h-10"></div>
            </div>
          </Show>

          <Show
            when={
              restaurantsData.data?.pages &&
              restaurantsData.data?.pages.length == 0
            }
          >
            <div>No restaurants found</div>
          </Show>
        </div>
      </div>
    </div>
  );
}
