import { FaSolidStar } from "solid-icons/fa";
import { FiStar } from "solid-icons/fi";
import { generateRandomImageUrl } from "../utils/helpers";
import { randomImageUrls } from "../utils/staticData";
import { ICardProps } from "../types";
import { Separator } from "@kobalte/core/separator";
import { CustomBadge } from "./custom/CustomBadge";

export default function Card(props: ICardProps) {
  const {
    name = "Brooklynn Stake House",
    address,
    city,
    onClick = () => {},
  } = props;
  return (
    <>
      <div class="card relative" onclick={onClick}>
        <div class="absolute inset-0">
          <img
            src={
              randomImageUrls[generateRandomImageUrl(randomImageUrls.length)]
            }
            alt="Avatar"
            class="h-full w-full object-cover pointer-events-none"
          />
        </div>

        <div class="card-details">
          <h2 class="text-3xl font-semibold">{name}</h2>
          <p class="text-sm mt-2 text-black/80">{address}</p>
          <p class="mt-4">
            <CustomBadge label={city} />
          </p>
          <div class="flex gap-2 my-4">
            <FaSolidStar />
            <FaSolidStar />
            <FaSolidStar />
            <FaSolidStar />
            <FiStar />
          </div>
        </div>
      </div>
      <Separator class="separator" />
    </>
  );
}
