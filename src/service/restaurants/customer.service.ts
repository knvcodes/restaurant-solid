import { toastActions } from "../../store/toastStore";
import { IResponse, IRestaurant } from "../../types";
import api from "../../utils/axios";
import { getErrorMessage, isEmpty } from "../../utils/helpers";

export const restaurantListing = async (search?: string) => {
  try {
    let url = "/restaurants/list";

    if (!isEmpty(search)) {
      url += `?search=${search}`;
    }

    const response: IResponse<IRestaurant[]> = await api.get(url);

    return response.data.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage) {
      toastActions.show(errorMessage, "Failed");
    }

    return [];
  }
};
