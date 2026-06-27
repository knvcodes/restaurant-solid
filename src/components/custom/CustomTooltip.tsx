import { Tooltip } from "@kobalte/core/tooltip";
import { AiOutlineInfoCircle } from "solid-icons/ai";
import { JSX } from "solid-js";

const CustomTooltip = (props: { children?: JSX.Element }) => {
  return (
    <>
      <Tooltip placement="right">
        <Tooltip.Trigger class="tooltip__trigger">
          <AiOutlineInfoCircle class="opacity-50" font-size="20" />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content class="tooltip__content">
            <Tooltip.Arrow />
            {props.children}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip>
    </>
  );
};

export default CustomTooltip;
