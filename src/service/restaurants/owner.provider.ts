import { createQuery } from "@tanstack/solid-query";
import { TIME_10_MIN, TIME_5_MIN } from "../../utils/service.config";
import { Accessor } from "solid-js";
import { restaurantDetails, restaurantListing } from "./owner.service";

const default_timer = {
  staleTime: TIME_5_MIN,
  gcTime: TIME_10_MIN,
};

export const useRestaurants = (search?: Accessor<string>) =>
  createQuery(() => ({
    queryKey: ["restaurants", "list", search?.()],
    queryFn: () => restaurantListing(search?.()),
  }));

export const useRestaurantsDetails = (id: Accessor<string>) =>
  createQuery(() => ({
    queryKey: ["restaurants", "details", id()],
    queryFn: () => restaurantDetails(id()),
  }));
