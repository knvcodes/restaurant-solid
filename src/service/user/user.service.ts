import api from "../../utils/axios";

const uploadAvatar = async (file: File) => {
  try {
    console.info("file:===>", file);

    const formdata = new FormData();
    formdata.append("image", file);

    const response = await api.post("/upload/upload-image", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.info("123:===>", 123);
  } catch (error) {
    console.info("error:===>", error);
  }
};

export { uploadAvatar };
