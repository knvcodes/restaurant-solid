import { IRestaurant } from "../types";

export const generateRandomImageUrl = (length: number) => {
  return Math.floor(Math.random() * length);
};

export function generateAddress(item: IRestaurant) {
  const {
    address: { building, street, zipcode },
  } = item;
  return building + ", " + street + ", " + zipcode;
}
