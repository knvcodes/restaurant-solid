import { FaSolidStar } from "solid-icons/fa";
import { FiStar } from "solid-icons/fi";
import { CustomSlider } from "../custom/CustomSlider";

export default function Filters() {
  return (
    <div class="flex fixed flex-col py-12 flex-1 pr-12 w-[400px] border-r-[1px] gap-4 border-black/15">
      <div class="text-2xl mb-12">Filters</div>
      <div>
        <CustomSlider label="Price range" />
      </div>
      <div>
        <CustomSlider label="Slot size" />
      </div>
    </div>
  );
}
