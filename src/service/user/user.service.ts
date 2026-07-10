import { toastActions } from "../../store/toastStore";
import { setuserStore } from "../../store/userStore";
import api from "../../utils/axios";
import { getErrorMessage, showToastErrors } from "../../utils/helpers";

const uploadAvatar = async (file: File) => {
  try {
    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("thumbnail", "true");

    const response = await api.post("/upload/upload-image", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // if key comes call avatar api

    if (response.data.data.key) {
      const updateAvatar = await api.put("/user/avatar", {
        key: response.data.data.key,
      });

      toastActions.pushToast(updateAvatar.data.message, "Success");
    } else {
      toastActions.pushToast(response.data.message, "Failed");
    }
  } catch (error) {
    console.info("error:===>", error);
  }
};

const fetchUserData = async () => {
  try {
    const response = await api.get("/user/profile");

    console.info("response.data:===>", response.data);

    const { name, avatar, role } = response.data.data;

    setuserStore({
      name,
      avatar,
      role,
    });

    toastActions.pushToast(response.data.message, "Failed");
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage) {
      showToastErrors(errorMessage);
    }
  }
};

export { uploadAvatar, fetchUserData };
