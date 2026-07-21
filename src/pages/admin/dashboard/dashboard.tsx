import { SolidApexCharts } from "solid-apexcharts";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import { userStore } from "../../../store/userStore";
import { useRestaurants } from "../../../service/restaurants/owner.provider";
import { IRestaurant } from "../../../types";
import { ApexChart, ApexOptions } from "apexcharts";

const AdminDashboard = () => {
  const user = userStore.name;

  const data = useRestaurants();

  // Initialize with empty/default values
  const [options, setOptions] = createSignal<ApexOptions>({
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        // distributed: true,
        borderRadius: 4,
      },
    },
    xaxis: {
      categories: ["a"],
      title: {
        text: "Views",
      },
    },
    yaxis: {
      title: {
        text: "Restaurant",
      },
    },
    title: {
      text: "Most Visited Restaurants",
      align: "left",
      style: {
        color: "#fff",
      },
    },
    tooltip: {
      theme: "dark",
      style: {
        background: "black",
      },
      y: {
        formatter: (value: number) => `${value} views`,
      },
    },
    grid: {
      borderColor: "#333",
    },
  });

  const [series, setSeries] = createSignal([
    {
      name: "Views",
      data: [1, 2, 3],
    },
  ]);

  // Update chart when data changes
  createEffect(() => {
    if (data.data && data.data.length > 0) {
      // Sort by views descending to show most visited first
      const sortedData = [...data.data].sort((a, b) => b.views - a.views);

      setOptions((prev) => ({
        ...prev,
        xaxis: {
          categories: sortedData.map((item) => item.name),
          title: {
            text: "Views",
          },
        },
      }));

      setSeries([
        {
          name: "Views",
          data: sortedData.map((item) => item.views),
        },
      ]);
    }
  });

  return (
    <div class="w-full h-full">
      <div class="heading-2 mb-12">Welcome, {userStore.name}</div>

      <div class="w-1/2 h-1/2">
        <div>Most visited</div>
        <hr class="mb-8" />

        <div class="p-8 bg-gray-950">
          <Show when={data.data && data.data.length > 0}>
            <SolidApexCharts
              type="bar"
              options={options()}
              series={series()}
              width={"100%"}
              height={300}
            />
          </Show>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
