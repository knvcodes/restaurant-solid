interface CustomImageProps {
  mobileSrc: string;
  desktopSrc: string;
  fallbackSrc: string;
  alt: string;
  classes: string;
  fetchpriority?: "low" | "high";
  loading?: "lazy" | "eager";
}

const CustomImage = (props: CustomImageProps) => {
  const {
    mobileSrc,
    desktopSrc,
    fallbackSrc,
    alt,
    classes,
    fetchpriority = "low",
    loading = "lazy",
  } = props;

  return (
    <picture>
      <source media="(max-width: 768px)" srcset={mobileSrc} />

      <source media="(min-width: 769px)" srcset={desktopSrc} />

      <img
        src={fallbackSrc}
        alt={alt}
        class={classes}
        fetchpriority={fetchpriority}
        loading={loading}
      />
    </picture>
  );
};

export default CustomImage;
