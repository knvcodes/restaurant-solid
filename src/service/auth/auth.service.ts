import { closeModal } from "../../store/modalStore";
import { toastActions } from "../../store/toastStore";
import { setuserStore, userStore } from "../../store/userStore";
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

    if (errorMessage) {
      toastActions.show(errorMessage, "Failed");
    }
  }
};

export const oauthLogin = async (
  response: google.accounts.id.CredentialResponse,
) => {
  try {
    const responseData = await api.post(
      "/auth/oauth",
      JSON.stringify({ credential: response.credential }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    const { name, avatar } = responseData.data.data;

    setuserStore({
      name,
      avatar,
      role: "customer",
    });

    closeModal();
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage) {
      toastActions.show(errorMessage, "Failed");
    }
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

    if (errorMessage) {
      toastActions.show(errorMessage, "Failed");
    }
  }
};
