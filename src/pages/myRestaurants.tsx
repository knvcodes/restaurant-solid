import { onMount } from "solid-js";
import "./style.css";
import Card from "../components/Card";
import api from "../utils/axios";
import { IResponse } from "../types";
import SearchBar from "../components/SearchBar";
import Filters from "../components/myRestaurants/Filters";
import bg from "../assets/foodbg.svg";

export default function MyRestaurants() {
  // fetching all restaurants
  onMount(async () => {
    const response: IResponse = await api.get("/restaurants/list");
    console.info("resposne", response);
  });

  return (
    <div>
      <div
        class="absolute h-full w-full"
        style={{
          "background-image": `url(${bg})`,
          "background-size": "500px",
          "background-repeat": "repeat",
          opacity: 0.1,
        }}
      ></div>
      <div class="flex relative mt-20 w-5/6 mx-auto bg-white">
        <Filters />
        <div class="flex flex-col pt-12 px-12">
          <SearchBar />
          <div class="flex mx-auto flex-wrap gap-8 items-center">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}
