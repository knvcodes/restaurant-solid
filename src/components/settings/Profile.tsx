import { FiEdit } from "solid-icons/fi";
import { avatar } from "../../assets/assets";
import { createSignal, JSX } from "solid-js";
import { CustomButton } from "../custom/CustomButton";
import { processImage } from "../../utils/imageProcessor";
import { uploadAvatar } from "../../service/user/user.service";

const Profile = () => {
  const [preview, setpreview] = createSignal<string | null>(null);
  const [processedImage, setprocessedImage] = createSignal<File | null>(null);

  const handlePhotoUpload: JSX.EventHandler<HTMLInputElement, Event> = async (
    e,
  ) => {
    const file = e.currentTarget.files?.[0];

    if (file) {
      try {
        const processed = await processImage(file, {
          maxWidth: 200,
          maxHeight: 200,
          quality: 0.85,
          type: "image/jpeg",
        });

        // Create preview
        setpreview(URL.createObjectURL(processed));
        setprocessedImage(processed);
      } catch (err) {
        console.error("Processing failed:", err);
      }
    }
  };

  const handleSubmit = async () => {
    const uploadFile = processedImage();

    console.info("processImage():===>", processedImage());

    if (uploadFile) {
      await uploadAvatar(uploadFile);
    }
  };

  return (
    <div class="profile verticle-list gap-4">
      <div class="relative flex-center mb-4">
        <img
          src={preview() || avatar}
          alt="uploadedAvatar"
          width={200}
          height={200}
          class="rounded-full aspect-[4/4]"
        />
        <FiEdit class="absolute right-0 bottom-0" font-size="20" />
        <input
          type="file"
          accept="jpeg/png"
          name="avatar"
          id="avatar"
          onchange={handlePhotoUpload}
          class="check w-full h-full absolute right-0 left-0 top-0 bottom-0 rounded-full opacity-0"
        />
      </div>
      <div>
        <div class="description">Email</div>
        <div>James@gmail.com</div>
      </div>
      <div>
        <div class="description">Name</div>
        <div>James buo</div>
      </div>

      <CustomButton
        label="Save changes"
        onClick={handleSubmit}
        disabled={preview() == null}
      />
    </div>
  );
};

export default Profile;
