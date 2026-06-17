import { LoginPayload, RegisterPayload } from "../../types";
import api from "../../utils/axios";
import { getErrorMessage } from "../../utils/helpers";

export const login = async (payload: LoginPayload) => {
  try {
    const { email, password } = payload;

    const response = await api.post(`/auth/login`, {
      email,
      password,
    });

    return response;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.info("errorMessage:===>", errorMessage);
  }
};

export const register = async (payload: RegisterPayload) => {
  try {
    const {
      email,
      password,
      name,
      role = "customer",
      isOAuth = false,
    } = payload;

    const response = await api.post(`/auth/register`, {
      name,
      email,
      password,
      role,
      isOAuth,
    });

    return response;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.info("errorMessage:===>", errorMessage);
  }
};
