import "./style.css";

// images
import welcome from "../assets/welcome.jpg";
import reservation from "../assets/reservation.jpg";

// components
import ImageWithText from "../components/home/ImageWithText";
import HeroContent from "../components/home/HeroContent";

export default function Home() {
  return (
    <div class={`h-screen `}>
      <ImageWithText
        imageUrl={welcome}
        headline="Great meals start with great choices..."
        subtext="Find your next favorite restaurant, explore mouthwatering menus, and
            reserve a table in seconds."
      />
      <div class="bg-black h-screen flex items-center gap-24 text-white">
        <HeroContent
          headline={"Elevate Your Dining Experience"}
          subtext={
            "From street food to fine dining — discover and reserve with confidence."
          }
        />
        <div
          class="w-[3200px] aspect-[16/9] bg-no-repeat bg-center"
          style={{
            "background-image": `url(${reservation})`,
            "background-size": "contain",
          }}
        ></div>
      </div>
    </div>
  );
}
