import { createSignal, For, onMount, Show } from "solid-js";
import "../../style.css";
import api from "../../../utils/axios";
import { IResponse, IRestaurant } from "../../../types";
import {
  formatDateTime,
  generateAddress,
  generateOpenHours,
  generateRandomImageUrl,
} from "../../../utils/helpers";
import { randomImageUrls } from "../../../utils/staticData";
import { useParams } from "@solidjs/router";
import { FaSolidStar } from "solid-icons/fa";
import { FiStar } from "solid-icons/fi";
import { foodbg } from "../../../assets/assets";
import DishCard from "../../../components/restaurants/DishCard";

export default function RestaurantDetails() {
  const params = useParams();

  const [restaurant, setrestaurant] = createSignal<IRestaurant | null>(null);

  // fetching all restaurants
  onMount(async () => {
    const response: IResponse<IRestaurant> = await api.get(
      `/restaurants/${params.slug}`,
    );

    setrestaurant(response.data.data);
  });

  return (
    <Show when={restaurant()} fallback={<>loading....</>}>
      {(restaurantObj) => (
        <div class="min-h-screen relative">
          <div
            class="absolute h-full w-full"
            style={{
              "background-image": `url(${foodbg})`,
              "background-size": "500px",
              "background-repeat": "repeat",
              opacity: 0.1,
            }}
          ></div>
          <div class="flex flex-col px-12 w-[1200px] flex-1 relative mt-16 h-full mx-auto bg-white">
            <div class="h-[500px] aspect-[16/9] w-full">
              <img
                src={
                  randomImageUrls[
                    generateRandomImageUrl(randomImageUrls.length)
                  ]
                }
                alt="Avatar"
                class="h-full w-full mx-auto object-cover pointer-events-none"
              />
            </div>
            {/* header */}
            <div class="w-full mt-12 flex justify-between">
              <div>
                <div class="font-semibold text-3xl text-start">
                  {restaurantObj().name}
                </div>
                <div class="cuisine">{restaurantObj().cuisine}</div>
                <div class="description mt-4">
                  <div>{restaurantObj().description}</div>
                </div>
              </div>

              <div>
                <div class="flex gap-2 my-4">
                  <FaSolidStar />
                  <FaSolidStar />
                  <FaSolidStar />
                  <FaSolidStar />
                  <FiStar />
                </div>

                <div class="description">
                  <div>{generateAddress(restaurantObj()!)}</div>
                </div>
                <div class="subTitle">{restaurantObj().borough}</div>
              </div>
            </div>

            {/* other details */}
            <dl class="table-styled mt-12">
              <dt class="subTitle">Open Hours:</dt>
              <dd class="text-gray-900 horizontal-list gap-4">
                <For each={generateOpenHours(restaurantObj().openDays)}>
                  {(day) => <div class="label">{day}</div>}
                </For>
              </dd>

              <dt class="subTitle">Delivery Hours:</dt>
              <dd class="text-gray-900 horizontal-list gap-4">
                {`${formatDateTime(restaurantObj().deliveryHours.from)} - ${formatDateTime(restaurantObj().deliveryHours.to)}`}
              </dd>

              <dt class="subTitle">Delivery Fees:</dt>
              <dd class="text-gray-900 horizontal-list gap-4">
                {restaurantObj().deliveryFee.amount}
                {restaurantObj().deliveryFee.currency}
              </dd>

              <dt class="subTitle">Cancellation Fees:</dt>
              <dd class="text-gray-900 horizontal-list gap-4">
                {restaurantObj().cancellationFee.amount}
                {restaurantObj().cancellationFee.currency}
              </dd>

              <dt class="subTitle">Minimum Order:</dt>
              <dd class="text-gray-900 horizontal-list gap-4">
                {restaurantObj().minimumDelivery.amount}
                {restaurantObj().minimumDelivery.currency}
              </dd>
            </dl>

            {/* dishes */}
            <div class="heading-2 mt-12 mb-4">Dishes</div>
            <Show
              when={restaurantObj().dishes.length > 0}
              fallback={<div>No dishes found</div>}
            >
              <div class="verticle-list">
                <For each={restaurantObj().dishes ?? []}>
                  {(dish) => <DishCard dish={dish} />}
                </For>
              </div>
            </Show>
          </div>
        </div>
      )}
    </Show>
  );
}
