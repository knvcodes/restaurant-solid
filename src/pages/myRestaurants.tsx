import { onMount } from "solid-js";
import "./style.css";
import Card from "../components/Card";
import api from "../utils/axios";
import { IResponse } from "../types";
import SearchBar from "../components/SearchBar";

export default function MyRestaurants() {
  onMount(async () => {
    const response: IResponse = await api.get("/restaurants/list");
    console.info("resposne", response);
  });

  return (
    <div>
      <SearchBar />
      <div class="flex mx-auto flex-wrap gap-24 items-center">
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
  );
}
