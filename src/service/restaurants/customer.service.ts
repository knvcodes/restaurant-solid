import { createQuery } from "@tanstack/solid-query";
import { IResponse, IRestaurant } from "../../types";
import api from "../../utils/axios";
import { getErrorMessage, isEmpty, showToastErrors } from "../../utils/helpers";
import { Accessor } from "solid-js";
import { TIME_10_MIN, TIME_5_MIN } from "../../utils/service.config";

export const restaurantListing = async (search?: string) => {
  try {
    let url = "/restaurants/list";

    // add search params if present
    if (!isEmpty(search)) {
      url += `?search=${search}`;
    }

    const response: IResponse<IRestaurant[]> = await api.get(url);
    return response.data.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage) {
      showToastErrors(errorMessage);
    }

    // if error send empty list
    return [];
  }
};

// service.ts
export const useRestaurants = (search: Accessor<string>) =>
  createQuery(() => ({
    queryKey: ["restaurants", "list", search()],
    queryFn: () => restaurantListing(search()),
    staleTime: TIME_5_MIN,
    gcTime: TIME_10_MIN,
  }));
