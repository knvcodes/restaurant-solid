import { createSignal, onMount } from "solid-js";
import "./style.css";
import Card from "../components/Card";
import api from "../utils/axios";
import { IResponse, IRestaurant } from "../types";
import SearchBar from "../components/SearchBar";
import Filters from "../components/myRestaurants/Filters";
import bg from "../assets/foodbg.svg";
import { generateAddress } from "../utils/helpers";
import { useNavigate } from "@solidjs/router";

export default function MyRestaurants() {
  const [restaurants, setrestaurants] = createSignal<IRestaurant[] | []>([]);

  const navigate = useNavigate();

  // fetching all restaurants
  onMount(async () => {
    const response: IResponse<IRestaurant[]> =
      await api.get("/restaurants/list");
    console.info("resposne", response.data.data);
    setrestaurants(response.data.data);
  });

  function gotoDetailsPage(id: string) {
    navigate(`/myRestaurants/${id}`);
  }

  async function onSearchChange(value: string) {
    const response: IResponse<IRestaurant[]> = await api.get(
      `/restaurants/list?search=${value}`,
    );
    console.info("onSearchChange response", response.data.data);
    setrestaurants(response.data.data);
  }

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
      <div class="relative mt-20 lg:px-12 md:px-0 lg:w-5/6 sm:w-full mx-auto bg-white">
        {/* <Filters /> */}
        <div class="flex flex-col pt-12">
          <SearchBar onChange={onSearchChange} />
          <div class="grid xl:grid-cols-2 lg:grid-cols-1 gap-4">
            {restaurants().length > 0 &&
              restaurants().map((restaurantItem: IRestaurant) => (
                <Card
                  onClick={() => {
                    gotoDetailsPage(restaurantItem.restaurant_id);
                  }}
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
