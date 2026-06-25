import { For } from "solid-js";
import Skeleton from "../loaders/Skeleton";

const RestaurantListingSkeleton = () => {
  const arr = Array.from({ length: 12 });

  return <For each={arr}>{() => <Skeleton />}</For>;
};

export default RestaurantListingSkeleton;
