import "./style.css";

// images

// components
import ImageWithText from "../components/home/ImageWithText";
import HeroContent from "../components/home/HeroContent";
import { cuisines, hero, reservation } from "../assets/assets";

export default function Home() {
  return (
    <div class={`min-h-screen bg-black`}>
      <ImageWithText
        imageUrl={hero}
        headline="Great meals start with great choices..."
        subtext="Find your next favorite restaurant, explore mouthwatering menus, and
            reserve a table in seconds."
      />
      <div class="md:bg-black h-screen max-w-screen relative flex items-center text-white">
        <div class="flex-1 z-20 h-full">
          <HeroContent
            headline="Elevate Your Dining Experience"
            subtext="From street food to fine dining — discover and reserve with confidence."
          />
        </div>
        <img
          src={reservation}
          alt="Reservation"
          class="md:blur-none blur-md object-cover md:w-1/2 md:h-auto md:relative absolute inset-0 z-10 w-full h-full"
          height={626}
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
