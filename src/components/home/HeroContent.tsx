export default function HeroContent(props: {
  headline: string;
  subtext: string;
}) {
  const { headline, subtext } = props;
  return (
    <>
      <div class="z-20 ml-auto text-white flex items-center h-full p-6 rounded-lg bg-gradient-to-r from-transparent to-black w-full">
        <div class="bg-yellow w-[500px] ml-auto">
          <div class="text-6xl">{headline}</div>
          <div class="text-xl mt-4 text-white/50">{subtext}</div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-black/70"></div>
    </>
  );
}
