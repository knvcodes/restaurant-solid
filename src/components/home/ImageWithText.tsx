import HeroContent from "./HeroContent";

export default function ImageWithText(props: {
  headline: string;
  subtext: string;
  imageUrl: string;
  srcSet?: string; // optional responsive srcset
  priority?: boolean; // for first hero
}) {
  const { headline, subtext, imageUrl, srcSet, priority = false } = props;

  return (
    <div class="relative h-screen w-full overflow-hidden">
      {/* Optimized image layer */}
      <picture>
        {srcSet && <source srcset={srcSet} sizes="100vw" type="image/webp" />}
        <img
          src={imageUrl}
          alt={headline}
          class="absolute inset-0 h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchpriority={priority ? "high" : "auto"}
        />
      </picture>

      {/* Content overlay */}
      <div class="relative h-full">
        <HeroContent headline={headline} subtext={subtext} />
      </div>

      {/* Bottom gradient */}
      <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-black/70 pointer-events-none" />
    </div>
  );
}
