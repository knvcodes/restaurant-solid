import { onMount } from "solid-js";
import "./style.css";
import Card from "../components/Card";
import api from "../utils/axios";
import { IResponse } from "../types";
import SearchBar from "../components/SearchBar";
import Filters from "../components/myRestaurants/Filters";

export default function MyRestaurants() {
  // fetching all restaurants
  onMount(async () => {
    const response: IResponse = await api.get("/restaurants/list");
    console.info("resposne", response);
  });

  return (
    <div class="flex bg-black rounded-3xl mt-48 w-5/6 mx-auto">
      <Filters />
      <div class="bg-black flex flex-col pt-12 px-12">
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
  );
}
