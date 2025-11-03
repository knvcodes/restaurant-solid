import { createSignal, onMount } from "solid-js";
import "./style.css";
import Card from "../components/Card";
import api from "../utils/axios";
import { IResponse, IRestaurant } from "../types";
import SearchBar from "../components/SearchBar";
import Filters from "../components/myRestaurants/Filters";
import bg from "../assets/foodbg.svg";
import { generateAddress } from "../utils/helpers";

export default function MyRestaurants() {
  const [restaurants, setrestaurants] = createSignal<IRestaurant[] | []>([]);

  // fetching all restaurants
  onMount(async () => {
    const response: IResponse<IRestaurant[]> = await api.get(
      "/restaurants/list"
    );
    console.info("resposne", response.data.data);
    setrestaurants(response.data.data);
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
      <div class="flex relative mt-20 px-12 w-5/6 mx-auto bg-white">
        <Filters />
        <div class="flex flex-col pt-12 w-[1000px] ml-[450px]">
          <SearchBar />
          <div class="flex mx-auto flex-wrap gap-4 items-center">
            {restaurants().length > 0 &&
              restaurants().map((restaurantItem: IRestaurant) => (
                <Card
                  name={restaurantItem.name}
                  city={restaurantItem.borough}
                  address={generateAddress(restaurantItem)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
