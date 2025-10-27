import { FaSolidStar } from "solid-icons/fa";
import { FiStar } from "solid-icons/fi";
import { CustomSlider } from "../custom/CustomSlider";

export default function Filters() {
  return (
    <div class="flex sticky flex-col p-12 flex-1 min-w-[400px] border-r-[1px] border-black/15 mr-24">
      <div class="text-2xl text-white mb-12">Filters</div>
      <div>
        <CustomSlider label="Price range" />
      </div>
      <div>
        <CustomSlider label="Price range" />
      </div>
      <div>
        <CustomSlider label="Price range" />
      </div>
      <div>
        <CustomSlider label="Price range" />
      </div>
      <div>
        <CustomSlider label="Price range" />
      </div>
      <div>
        <CustomSlider label="Price range" />
      </div>
      <div>
        <CustomSlider label="Price range" />
      </div>
      <div>
        <CustomSlider label="Price range" />
      </div>
      <div>
        <CustomSlider label="Price range" />
      </div>
    </div>
  );
}
