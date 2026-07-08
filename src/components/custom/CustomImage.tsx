interface CustomImageProps {
  mobileSrc: string;
  desktopSrc: string;
  fallbackSrc: string;
  alt: string;
  classes: string;
}

const CustomImage = (props: CustomImageProps) => {
  const { mobileSrc, desktopSrc, fallbackSrc, alt, classes } = props;

  return (
    <picture>
      <source media="(max-width: 768px)" srcset={mobileSrc} />

      <source media="(min-width: 769px)" srcset={desktopSrc} />

      <img src={fallbackSrc} alt={alt} class={classes} />
    </picture>
  );
};

export default CustomImage;
