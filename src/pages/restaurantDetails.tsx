import { createSignal, onMount } from "solid-js";
import "./style.css";
import Card from "../components/Card";
import api from "../utils/axios";
import { IResponse, IRestaurant } from "../types";
import SearchBar from "../components/SearchBar";
import Filters from "../components/myRestaurants/Filters";
import bg from "../assets/foodbg.svg";
import { generateAddress } from "../utils/helpers";

export default function RestaurantDetails() {
  //   const [restaurants, setrestaurants] = createSignal<IRestaurant[] | []>([]);

  // fetching all restaurants
  onMount(async () => {
    // const response: IResponse<IRestaurant[]> = await api.get(
    //   "/restaurants/list"
    // );
    // console.info("resposne", response.data.data);
    // setrestaurants(response.data.data);
  });

  return (
    <div class="min-h-screen">
      <div
        class="absolute h-full w-full"
        style={{
          "background-image": `url(${bg})`,
          "background-size": "500px",
          "background-repeat": "repeat",
          opacity: 0.1,
        }}
      ></div>
      <div class="flex relative mt-20 px-12 w-5/6 mx-auto bg-white">123</div>
    </div>
  );
}
