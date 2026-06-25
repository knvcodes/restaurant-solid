import { FaSolidStar } from "solid-icons/fa";
import { FiStar } from "solid-icons/fi";
import { generateRandomImageUrl } from "../utils/helpers";
import { randomImageUrls } from "../utils/staticData";
import { ICardProps } from "../types";
import { CustomBadge } from "./custom/CustomBadge";
import { createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { restaurant_placeholder } from "../assets/assets";

export default function Card(props: ICardProps) {
  const {
    name = "Brooklynn Stake House",
    address,
    city,
    onClick = () => {},
  } = props;

  // Only render img when card enters viewport
  const [cardRef, setCardRef] = createSignal<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = createSignal(false);

  onMount(() => {
    const el = cardRef();
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    });
    observer.observe(el);
    onCleanup(() => observer.disconnect());
  });

  // handle broken images
  const [imageBroken, setimageBroken] = createSignal(false);
  const imageUrl = createMemo(() =>
    imageBroken()
      ? restaurant_placeholder
      : randomImageUrls[generateRandomImageUrl(randomImageUrls.length)],
  );

  return (
    <div ref={cardRef} class="card relative" onclick={onClick}>
      <div class="absolute inset-0">
        <img
          src={imageUrl()}
          loading="lazy"
          decoding="async"
          alt="restaurantImage"
          onError={() => setimageBroken(true)}
          class="h-full w-full object-cover pointer-events-none"
        />
      </div>

      <div class="card-details gradient-glass">
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
  );
}
