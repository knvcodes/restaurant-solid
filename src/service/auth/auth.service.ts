import { Setter } from "solid-js";
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
import { NavigateOptions } from "@solidjs/router";

export const login = async (
  payload: LoginPayload,
  setLoading: Setter<boolean>,
  navigate: (arg1: string, arg2: { replace: boolean }) => void,
  callback?: () => void,
) => {
  try {
    const { email, password } = payload;

    setLoading(true);

    const responseData = await api.post(`/auth/login`, {
      email,
      password,
    });

    closeModal();

    const { name, role, avatar } = responseData.data.data;

    console.info("role:===>", role);

    setuserStore({
      name,
      role,
      avatar,
    });

    if (role == "customer") {
      navigate("/restaurants", { replace: true });
    } else if (role == "owner") {
      navigate("/admin/dashboard", { replace: true });
    }

    callback?.();
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage) {
      showToastErrors(errorMessage);
    }
  } finally {
    setLoading(false);
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

export const register = async (
  payload: RegisterPayload,
  setLoading: Setter<boolean>,
) => {
  try {
    setLoading(true);

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

    toastActions.pushToast(response.data.message, "Success");

    openModal("login");
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage) {
      showToastErrors(errorMessage);
    }
  } finally {
    setLoading(false);
  }
};
export const forgotPassword = async (
  payload: ForgotPasswordPayload,
  setLoading: Setter<boolean>,
) => {
  try {
    setLoading(true);

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
  } finally {
    setLoading(false);
  }
};

export const resetPassword = async (
  payload: ResetPasswordPayload,
  setLoading: Setter<boolean>,
  navigate: (arg0: string, arg1: { replace: boolean }) => void,
) => {
  try {
    setLoading(true);

    const { newPassword, confirmPassword, token } = payload;

    const response = await api.post(`/auth/resetPassword`, {
      newPassword,
      token,
      confirmPassword,
    });

    toastActions.show(response.data.message, "Success");
    openModal("login");
    navigate("/", { replace: true });
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage) {
      showToastErrors(errorMessage);
    }
  } finally {
    setLoading(false);
  }
};
