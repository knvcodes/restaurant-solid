import { Slider } from "@kobalte/core/slider";
import "../../styles/slider.css";

interface SliderProps {
  label: string;
}

export function CustomSlider(props: SliderProps) {
  const { label = "Default" } = props;
  return (
    <Slider class="SliderRoot">
      <div class="SliderLabel">
        <Slider.Label>{label}</Slider.Label>
        <Slider.ValueLabel />
      </div>
      <Slider.Track class="SliderTrack">
        <Slider.Fill class="SliderRange" />
        <Slider.Thumb class="SliderThumb">
          <Slider.Input />
        </Slider.Thumb>
      </Slider.Track>
    </Slider>
  );
}
