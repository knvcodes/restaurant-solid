import { createEffect, createSignal, Show } from "solid-js";
import { foodbg } from "../assets/assets";
import { extractBreadCrumbs } from "../utils/helpers";
import { Path } from "../types";
import CustomBreadCrumbs from "../components/custom/CustomBreadCrumbs";
import Profile from "../components/settings/Profile";

type settingsEnum = "profile" | "orders";

export default function Settings() {
  const [category, setcategory] = createSignal<settingsEnum>("profile");

  const handleCategoryChange = (value: settingsEnum) => {
    setcategory(value);
  };

  // breadcrumbs
  const [pathArr, setpathArr] = createSignal<Path[]>([]);

  createEffect(() => {
    const paths = extractBreadCrumbs(location.pathname);
    setpathArr(
      paths
        .filter((item) => item !== "")
        .map((pathItem, index) => ({
          pathName: pathItem,
          path: "/" + pathItem,
        })),
    );
  });

  return (
    <div class="min-h-[calc(100vh-64px)] flex flex-col">
      <div
        class="absolute h-full w-full"
        style={{
          "background-image": `url(${foodbg})`,
          "background-size": "500px",
          "background-repeat": "repeat",
          opacity: 0.1,
        }}
      ></div>
      <div class="relative pt-28 lg:px-12 md:px-0 lg:w-5/6 px-4 w-full mx-auto bg-white md:flex-1 gap-12 flex md:flex-row flex-col">
        {/* sidebar */}
        <div class="profile-menu verticle-list gap-4 md:border-r-2 md:max-w-60 md:min-w-60 w-full cursor-pointer flex-1 h-min">
          <div
            onclick={() => handleCategoryChange("profile")}
            class={`${category() == "profile" ? "opacity-100" : "opacity-50"} w-min`}
          >
            Profile
          </div>
          <div
            onclick={() => handleCategoryChange("orders")}
            class={`${category() == "orders" ? "opacity-100" : "opacity-50"} w-min`}
          >
            Orders
          </div>
        </div>

        <hr />
        {/* main section */}
        <div class="md:mx-28 md:w-full">
          <Show when={category() == "profile"}>
            <Profile />
          </Show>
        </div>
      </div>
    </div>
  );
}
3;
