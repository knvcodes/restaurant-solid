import { IResponse, IRestaurant, IRestaurantResponse } from "../../types";
import api from "../../utils/axios";
import { getErrorMessage, isEmpty, showToastErrors } from "../../utils/helpers";

export const restaurantListing = async (
  search?: string,
  page?: number,
): Promise<IRestaurant[] | []> => {
  try {
    let url = "/owner/dashboard";

    let params: Record<string, string | number> = {};

    // add search params if present
    if (!isEmpty(search) && search) {
      params["search"] = search;
    }
    if (!isEmpty(page) && page) {
      params["page"] = page;
    }

    const response: IResponse<IRestaurant[]> = await api.get(url, {
      params: {
        ...params,
        limit: 10,
      },
    });

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
