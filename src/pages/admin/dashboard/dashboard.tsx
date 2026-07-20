import { SolidApexCharts } from "solid-apexcharts";
import { createSignal, onMount } from "solid-js";
import { userStore } from "../../../store/userStore";

const AdminDashboard = () => {
  const user = userStore.name;

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
      <div class="heading-2">Welcome, {userStore.name}</div>
      {/* <div class="w-1/2 h-1/2">
        <SolidApexCharts type="bar" options={options} series={series()} />
      </div> */}
    </div>
  );
};

export default AdminDashboard;
