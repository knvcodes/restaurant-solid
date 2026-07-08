import { FaSolidStar } from "solid-icons/fa";
import { FiStar } from "solid-icons/fi";
import { generateRandomImageUrl } from "../utils/helpers";
import { randomImageUrls } from "../utils/staticData";
import { ICardProps } from "../types";
import { createMemo, createSignal, onCleanup, onMount, Show } from "solid-js";
import { restaurant_placeholder } from "../assets/assets";

export default function Card(props: ICardProps) {
  const {
    name = "Brooklynn Stake House",
    cuisine,
    onClick = () => {},
    trending = false,
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
    <div
      ref={cardRef}
      class={`${trending ? "trending-card" : "card"} relative`}
      onclick={onClick}
    >
      <div class="absolute inset-0">
        <img
          src={imageUrl()}
          loading="lazy"
          decoding="async"
          alt="restaurantImage"
          onError={() => setimageBroken(true)}
          class="h-full w-full object-cover aspect-[16/9] pointer-events-none"
        />
      </div>

      <div class="card-details gradient-glass-dark text-white">
        <h2 class="text-3xl font-semibold name">{name}</h2>
        <p class="mt-4 border-b-2 cuisine">{cuisine}</p>
        <Show when={!trending}>
          <div class="flex gap-2 my-4">
            <FaSolidStar />
            <FaSolidStar />
            <FaSolidStar />
            <FaSolidStar />
            <FiStar />
          </div>
        </Show>
      </div>
    </div>
  );
}
