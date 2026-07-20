import { SolidApexCharts } from "solid-apexcharts";
import { createSignal, onMount } from "solid-js";
import { userStore } from "../../../store/userStore";
import { useRestaurants } from "../../../service/restaurants/owner.provider";

const AdminDashboard = () => {
  const user = userStore.name;

  const data = useRestaurants();

  console.info("data:===>", data);

  const options = {
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  };
  const [series, setSeries] = createSignal([
    {
      name: "series-1",
      data: [30, 40, 35, 50, 49, 60, 70, 91],
    },
  ]);

  onMount(() => {
    ``;
    const max = 90;
    const min = 20;
  });

  return (
    <div class="w-full h-full">
      <div class="heading-2 mb-12">Welcome, {userStore.name}</div>

      <div class="w-1/2 h-1/2">
        <div>Most visited</div>
        <hr class="mb-8" />

        <div class="p-8 bg-gray-950">
          <SolidApexCharts
            type="bar"
            options={options}
            series={series()}
            width={"100%"}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
