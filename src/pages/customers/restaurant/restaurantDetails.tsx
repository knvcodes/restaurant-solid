import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import "../../style.css";
import { IResponse, IRestaurant, Path } from "../../../types";
import {
  extractBreadCrumbs,
  formatDateTime,
  generateAddress,
  generateOpenHours,
  generateRandomImageUrl,
} from "../../../utils/helpers";
import {
  randomImageUrls,
  randomImageUrlsMobile,
} from "../../../utils/staticData";
import { useLocation, useParams } from "@solidjs/router";
import { FaSolidStar } from "solid-icons/fa";
import { FiStar } from "solid-icons/fi";
import { foodbg } from "../../../assets/assets";
import DishCard from "../../../components/restaurants/DishCard";
import CustomBreadCrumbs from "../../../components/custom/CustomBreadCrumbs";
import { useRestaurantsDetails } from "../../../service/restaurants/customer.provider";
import CustomImage from "../../../components/custom/CustomImage";

export default function RestaurantDetails() {
  const params = useParams();
  const location = useLocation();

  const [restaurantId, setrestaurantId] = createSignal(params.slug);

  // api provider
  const restaurantDetailData = useRestaurantsDetails(restaurantId);

  // set params id to signal
  onMount(async () => {
    setrestaurantId(params.slug);
  });

  // breadcrumbs
  const [pathArr, setpathArr] = createSignal<Path[]>([]);

  createEffect(() => {
    const paths = extractBreadCrumbs(location.pathname);
    setpathArr(
      paths
        .filter((item) => item !== "")
        .map((pathItem, index) => ({
          pathName:
            index == paths.length - 2
              ? restaurantDetailData.data?.name.toLowerCase() || ""
              : pathItem,
          path: index == paths.length - 2 ? location.pathname : "/" + pathItem,
        })),
    );
  });

  return (
    <Show when={restaurantDetailData.data} fallback={<>loading....</>}>
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

          {/* main page */}
          <div class="flex flex-col lg:px-12 px-0 xl:w-[1200px] w-full flex-1 relative mt-16 h-full mx-auto bg-white">
            <CustomBreadCrumbs paths={pathArr()} />

            <div class="h-[500px] aspect-[16/9] lg:w-full w-auto">
              <CustomImage
                loading="eager"
                fetchpriority="high"
                alt="restaurantImage"
                desktopSrc={
                  randomImageUrls[
                    generateRandomImageUrl(randomImageUrls.length)
                  ]
                }
                fallbackSrc={
                  randomImageUrls[
                    generateRandomImageUrl(randomImageUrls.length)
                  ]
                }
                classes="h-full w-full mx-auto object-cover pointer-events-none"
                mobileSrc={
                  randomImageUrlsMobile[
                    generateRandomImageUrl(randomImageUrls.length)
                  ]
                }
              />
            </div>
            {/* header */}
            <div class="w-full mt-12 md:w-auto xl:px-0 px-6 lg:!flex-row flex flex-col justify-between">
              <div>
                <div class="font-semibold text-3xl text-start">
                  {restaurantObj().name}
                </div>
                <div class="cuisine-label">{restaurantObj().cuisine}</div>
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

                <div class="text-blue-500 label font-semibold mb-4 cursor-pointer">
                  View all reviews
                </div>

                <div class="description">
                  <div>{generateAddress(restaurantObj()!)}</div>
                </div>
                <div class="subTitle">{restaurantObj().borough}</div>
              </div>
            </div>

            {/* other details */}
            <dl class="table-styled mt-12 xl:px-0 px-6">
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
            <div class="heading-2 mt-12 mb-4 xl:px-0 px-6">Dishes</div>
            <hr class="mb-6" />
            <Show
              when={restaurantObj().dishes.length > 0}
              fallback={<div class="xl:px-0 px-6">No dishes found</div>}
            >
              <div class="verticle-list md:px-0 px-4 gap-4">
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
