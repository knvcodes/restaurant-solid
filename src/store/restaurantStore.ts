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

const handleRemoveDish = (serving_id: string, arr: OrderDish[]) => {
  const findDish = arr.find((dishItem) => dishItem.serving_id == serving_id);

  // if serving quantity 1. remove the dish, else reduce quantity
  if (findDish && findDish.serving_quantity == 1) {
    return arr.filter((dishItem) => dishItem.serving_id !== serving_id);
  } else if (findDish && findDish.serving_quantity > 1) {
    return arr.map((dishItem) =>
      dishItem.serving_id == serving_id
        ? { ...dishItem, serving_quantity: dishItem.serving_quantity - 1 }
        : dishItem,
    );
  } else {
    return arr;
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
    dishes: handleRemoveDish(id, restaurantStore.dishes),
  });

export const removeRestaurantDishes = (restaurant_id: string) => {
  setrestaurantStore({
    dishes: restaurantStore.dishes.filter(
      (restItem) => restItem.restaurantId !== restaurant_id,
    ),
  });
};
