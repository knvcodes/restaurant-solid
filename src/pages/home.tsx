import { createSignal } from "solid-js";
import { Popover } from "@kobalte/core/popover";
import "./style.css";
import Card from "../components/Card";

export default function Home() {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <Card />
    </div>
  );
}
