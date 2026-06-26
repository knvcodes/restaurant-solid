import { createStore } from "solid-js/store";
import { IDish } from "../types";
import { addObjToArray, removeObjFromArray } from "../utils/helpers";

interface RestaurantState {
  dishes: IDish[];
  selectedDish: IDish | null;
}

// Initialize store
export const [restaurantStore, setrestaurantStore] =
  createStore<RestaurantState>({
    dishes: [],
    selectedDish: null,
  });

export const addDish = (dish: IDish) =>
  setrestaurantStore({
    dishes: addObjToArray(restaurantStore.dishes, dish, "id"),
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
