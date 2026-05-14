import { createSignal, For, onMount, Show } from "solid-js";
import "./style.css";
import Card from "../components/Card";
import api from "../utils/axios";
import { IResponse, IRestaurant } from "../types";
import bg from "../assets/foodbg.svg";
import {
  formatDateTime,
  generateAddress,
  generateOpenHours,
  generateRandomImageUrl,
} from "../utils/helpers";
import { randomImageUrls } from "../utils/staticData";
import { useParams } from "@solidjs/router";
import { FaSolidStar } from "solid-icons/fa";
import { FiStar } from "solid-icons/fi";

export default function RestaurantDetails() {
  const params = useParams();
  console.log(params.slug);

  const [restaurant, setrestaurant] = createSignal<IRestaurant | null>(null);

  console.log("restaurant()===>", restaurant());

  // fetching all restaurants
  onMount(async () => {
    const response: IResponse<IRestaurant> = await api.get(
      `/restaurants/${params.slug}`,
    );
    console.info("RestaurantDetails", response.data.data);
    setrestaurant(response.data.data);
  });

  return (
    <Show when={restaurant()} fallback={<>loading....</>}>
      {(restaurantObj) => (
        <div class="min-h-screen relative">
          <div
            class="absolute h-full w-full"
            style={{
              "background-image": `url(${bg})`,
              "background-size": "500px",
              "background-repeat": "repeat",
              opacity: 0.1,
            }}
          ></div>
          <div class="flex flex-col w-[1200px] items-center flex-1 relative mt-16 h-full mx-auto bg-white">
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
            <div class="w-full mt-12 flex justify-between px-12">
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

            <div class="openFrom flex items-center gap-2 mr-auto px-12 mt-12">
              <div class="subTitle">Open Hours:</div>
              <For each={generateOpenHours(restaurantObj().openDays)}>
                {(day) => <div class="days">{day}</div>}
              </For>
            </div>

            <div class="openFrom flex items-center gap-2 mr-auto px-12 mt-2">
              <div class="subTitle">Delivery Hours:</div>
              <div>{`${formatDateTime(restaurantObj().deliveryHours.from)} - ${formatDateTime(restaurantObj().deliveryHours.to)}`}</div>
            </div>

            <div class="openFrom flex items-center gap-2 mr-auto px-12 mt-2">
              <div class="subTitle">Delivery Fees:</div>
              <div>
                {restaurantObj().deliveryFee.amount}
                {restaurantObj().deliveryFee.currency}
              </div>
            </div>

            <div class="openFrom flex items-center gap-2 mr-auto px-12 mt-2">
              <div class="subTitle">Cancellation Fees:</div>
              <div>
                {restaurantObj().cancellationFee.amount}
                {restaurantObj().cancellationFee.currency}
              </div>
            </div>

            <div class="openFrom flex items-center gap-2 mr-auto px-12 mt-2">
              <div class="subTitle">Minimum Order:</div>
              <div>
                {restaurantObj().minimumDelivery.amount}
                {restaurantObj().minimumDelivery.currency}
              </div>
            </div>
          </div>
        </div>
      )}
    </Show>
  );
}
