import { IResponse, IRestaurant } from "../../types";
import api from "../../utils/axios";
import { getErrorMessage, isEmpty, showToastErrors } from "../../utils/helpers";

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

export const restaurantDetails = async (id: string) => {
  try {
    const response: IResponse<IRestaurant> = await api.get(
      `/restaurants/${id}`,
    );
    return response.data.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage) {
      showToastErrors(errorMessage);
    }

    // if error send empty list
    return null;
  }
};
