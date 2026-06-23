import "./style.css";

// images

// components
import ImageWithText from "../components/home/ImageWithText";
import HeroContent from "../components/home/HeroContent";
import { cuisines, hero, reservation } from "../assets/assets";

export default function Home() {
  return (
    <div class={`h-screen `}>
      <ImageWithText
        imageUrl={hero}
        headline="Great meals start with great choices..."
        subtext="Find your next favorite restaurant, explore mouthwatering menus, and
            reserve a table in seconds."
      />
      <div class="bg-black h-screen flex items-center gap-24 text-white">
        <HeroContent
          headline="Elevate Your Dining Experience"
          subtext="From street food to fine dining — discover and reserve with confidence."
        />
        <img
          src={reservation}
          alt="Reservation"
          class="w-[3200px] aspect-[16/9] object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
      <ImageWithText
        imageUrl={cuisines}
        headline="Your Gateway to Global Flavors"
        subtext="Dine in, reserve your table, or order for takeaway — all your favorite cuisines in one app."
      />
    </div>
  );
}
