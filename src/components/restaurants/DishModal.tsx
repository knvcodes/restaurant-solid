import { Show } from "solid-js";
import { CustomModal } from "../custom/CustomModal";
import { closeModal, modalStore } from "../../store/modalStore";
import {
  removeSelectedDish,
  restaurantStore,
} from "../../store/restaurantStore";

export default function DishModal() {
  console.info(
    "restaurantStore.selectedDish:===>",
    restaurantStore.selectedDish,
  );

  return (
    <Show
      when={modalStore.type == "dish" && restaurantStore.selectedDish !== null}
    >
      <CustomModal
        title={restaurantStore.selectedDish?.name || "Dish"}
        onClose={() => {
          closeModal();
          removeSelectedDish();
        }}
        rightBtnText="Add"
        description={restaurantStore.selectedDish?.description}
      ></CustomModal>
    </Show>
  );
}
