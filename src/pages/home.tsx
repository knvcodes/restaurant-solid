import { onMount } from "solid-js";
import "./style.css";
import Card from "../components/Card";
import api from "../utils/axios";
import { IResponse } from "../types";
import SearchBar from "../components/SearchBar";

import welcome from "../assets/welcome.jpg";

export default function Home() {
  onMount(async () => {
    const response: IResponse = await api.get("/restaurants/list");
    console.info("resposne", response);
  });

  return (
    <div class="bg-white">
      <div class="relative flex justify-center items-center min-h-screen px-24 overflow-hidden">
        <div class="absolute top-0 left-0 right-0">
          <img src={welcome} alt="" class="w-full h-full object-cover" />
        </div>

        <div class="ml-auto z-10 text-white text-6xl p-6 rounded-lg w-[500px] bg-gradient-to-l from-black">
          Great meals start with great choices...
        </div>
      </div>
    </div>
  );
}
