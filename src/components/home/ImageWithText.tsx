import HeroContent from "./HeroContent";

export default function ImageWithText(props: {
  headline: string;
  subtext: string;
  imageUrl: string;
}) {
  const { headline, subtext, imageUrl } = props;
  return (
    <div
      class="h-screen"
      style={{
        "background-image": `url(${imageUrl})`,
        "background-size": "cover",
        "background-position": "center",
      }}
    >
      <HeroContent headline={headline} subtext={subtext} />
      <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-black/70"></div>
    </div>
  );
}
