import { closeModal, openModal } from "../../store/modalStore";
import { toastActions } from "../../store/toastStore";
import { setuserStore } from "../../store/userStore";
import {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "../../types";
import api from "../../utils/axios";
import { getErrorMessage, showToastErrors } from "../../utils/helpers";

export const login = async (payload: LoginPayload) => {
  try {
    const { email, password } = payload;

    const responseData = await api.post(`/auth/login`, {
      email,
      password,
    });

    closeModal();

    const { name, role } = responseData.data.data;

    setuserStore({
      name,
      role,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage) {
      showToastErrors(errorMessage);
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

    const { name, avatar, role } = responseData.data.data;

    setuserStore({
      name,
      avatar,
      role,
    });

    closeModal();
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage) {
      showToastErrors(errorMessage);
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

    await api.post(`/auth/register`, {
      name,
      email,
      password,
      role,
      isOAuth,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage) {
      showToastErrors(errorMessage);
    }
  }
};
export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  try {
    const { email } = payload;

    const response = await api.post(`/auth/forgotPassword`, {
      email,
    });

    toastActions.show(response.data.message, "Success");
    closeModal();
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage) {
      showToastErrors(errorMessage);
    }
  }
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  try {
    const { newPassword, confirmPassword, token } = payload;

    const response = await api.post(`/auth/resetPassword`, {
      newPassword,
      token,
      confirmPassword,
    });

    toastActions.show(response.data.message, "Success");
    openModal("login");
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage) {
      showToastErrors(errorMessage);
    }
  }
};
