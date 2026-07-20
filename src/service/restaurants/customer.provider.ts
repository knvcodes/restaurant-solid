import { createInfiniteQuery, createQuery } from "@tanstack/solid-query";
import { restaurantDetails, restaurantListing } from "./customer.service";
import { TIME_10_MIN, TIME_5_MIN } from "../../utils/service.config";
import { Accessor } from "solid-js";
import { IRestaurantResponse } from "../../types";

const default_timer = {
  staleTime: TIME_5_MIN,
  gcTime: TIME_10_MIN,
};

export const useRestaurants = (search: Accessor<string>) =>
  createInfiniteQuery(() => ({
    initialPageParam: 1,
    getNextPageParam: (lastPage: IRestaurantResponse, allPages) => {
      // If there's a next page, return the next page number
      // allPages.length gives us how many pages we've fetched so far
      return lastPage?.hasNextPage ? allPages.length + 1 : undefined;
    },
    queryKey: ["restaurants", "list", search()],
    queryFn: ({ pageParam }) => restaurantListing(search(), pageParam),
    ...default_timer,
  }));

export const useRestaurantsDetails = (id: Accessor<string>) =>
  createQuery(() => ({
    queryKey: ["restaurants", "details", id()],
    queryFn: () => restaurantDetails(id()),
  }));
