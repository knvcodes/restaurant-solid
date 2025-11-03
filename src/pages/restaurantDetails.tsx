import { createSignal, onMount } from "solid-js";
import "./style.css";
import Card from "../components/Card";
import api from "../utils/axios";
import { IResponse, IRestaurant } from "../types";
import bg from "../assets/foodbg.svg";
import { generateAddress, generateRandomImageUrl } from "../utils/helpers";
import { randomImageUrls } from "../utils/staticData";
import { useParams } from "@solidjs/router";
import { FaSolidStar } from "solid-icons/fa";
import { FiStar } from "solid-icons/fi";

export default function RestaurantDetails() {
  const params = useParams();
  console.log(params.slug);

  const [restaurant, setrestaurant] = createSignal<IRestaurant | null>(null);

  // fetching all restaurants
  onMount(async () => {
    const response: IResponse<IRestaurant> = await api.get(
      `/restaurants/${params.slug}`
    );
    console.info("resposne", response.data.data);
    setrestaurant(response.data.data);
  });

  return (
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
              randomImageUrls[generateRandomImageUrl(randomImageUrls.length)]
            }
            alt="Avatar"
            class="h-full w-full mx-auto object-cover pointer-events-none"
          />
        </div>

        {/* header */}
        <div class="w-full mt-12 flex justify-between px-12">
          <div>
            <div class="font-semibold text-3xl text-start">
              {restaurant()?.name}
            </div>
            <div class="text-xl text-black/60 mt-2">
              {restaurant() !== null && generateAddress(restaurant()!)}
            </div>
            <div class="text-xl text-black/80">{restaurant()?.borough}</div>
          </div>
          <div class="flex gap-2 my-4">
            <FaSolidStar />
            <FaSolidStar />
            <FaSolidStar />
            <FaSolidStar />
            <FiStar />
          </div>
        </div>
      </div>
    </div>
  );
}
