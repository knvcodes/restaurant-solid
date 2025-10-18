import { FaSolidStar } from "solid-icons/fa";
import { FiStar } from "solid-icons/fi";
import { generateRandomImageUrl } from "../utils/helpers";
import { randomImageUrls } from "../utils/staticData";

export default function Card() {
  return (
    <div class="card ">
      <div class="flex-shrink-0 h-full w-1/3">
        <img
          src={randomImageUrls[generateRandomImageUrl(randomImageUrls.length)]}
          alt="Avatar"
          class="h-full w-full object-fill rounded-xl"
        />
      </div>

      <div class="flex-1 p-4 ml-12 flex flex-col justify-center">
        <h2 class="text-lg font-semibold">Brooklyn Chop House</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          150 Chop House Street
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400">London</p>
        <div class="flex gap-2 my-2">
          <FaSolidStar />
          <FaSolidStar />
          <FaSolidStar />
          <FaSolidStar />
          <FiStar />
        </div>

        <button class="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}
