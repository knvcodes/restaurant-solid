import { createStore } from "solid-js/store";
import { IDish, IServing } from "../types";
import { addObjToArray, removeObjFromArray } from "../utils/helpers";

interface OrderDish extends Omit<IDish, "serving"> {
  serving_id: string;
  serving_quantity: number;
  serving: IServing;
}

interface RestaurantState {
  dishes: OrderDish[];
  selectedDish: IDish | null;
}

// Initialize store
export const [restaurantStore, setrestaurantStore] =
  createStore<RestaurantState>({
    dishes: [],
    selectedDish: null,
  });

const handleAddingDish = (dish: OrderDish, arr: OrderDish[]) => {
  const findDish = arr.find(
    (dishItem) => dishItem.serving_id == dish.serving_id,
  );

  if (findDish) {
    return arr.map((dishItem) => {
      if (dishItem.id == findDish.id) {
        return { ...dishItem, serving_quantity: dishItem.serving_quantity + 1 };
      } else {
        return dishItem;
      }
    });
  } else {
    return [...arr, dish];
  }
};

export const addDish = (dish: OrderDish) =>
  setrestaurantStore({
    dishes: handleAddingDish(dish, restaurantStore.dishes),
  });

export const selectDish = (dish: IDish) =>
  setrestaurantStore({
    selectedDish: dish,
  });

export const removeSelectedDish = () =>
  setrestaurantStore({
    selectedDish: null,
  });

export const deleteDish = (id: string) =>
  setrestaurantStore({
    dishes: removeObjFromArray(restaurantStore.dishes, id, "id"),
  });
