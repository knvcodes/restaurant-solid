import { FaSolidStar } from "solid-icons/fa";
import { FiStar } from "solid-icons/fi";
import { generateRandomImageUrl } from "../utils/helpers";
import { randomImageUrls } from "../utils/staticData";

export default function Card() {
  return (
    <div class="card relative">
      <div class="absolute inset-0">
        <img
          src={randomImageUrls[generateRandomImageUrl(randomImageUrls.length)]}
          alt="Avatar"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="card-details">
        <h2 class="text-3xl font-semibold">Brooklyn Chop House</h2>
        <p class="text-sm  mt-2">150 Chop House Street</p>
        <p class="text-sm text-gray-800 underline mt-4">London</p>
        <div class="flex gap-2 my-4">
          <FaSolidStar />
          <FaSolidStar />
          <FaSolidStar />
          <FaSolidStar />
          <FiStar />
        </div>
      </div>
    </div>
  );
}
