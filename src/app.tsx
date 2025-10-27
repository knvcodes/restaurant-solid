import { Suspense, type ParentComponent } from "solid-js";
import Header from "./components/Header";
import bg from "./assets/foodbg.svg";

const App: ParentComponent = (props) => {
  return (
    <div class="flex flex-col relative min-h-screen bg-teal-100">
      <div
        class="absolute h-full w-screen border border-black"
        style={{
          "background-color": "black",
          "background-image": `url(${bg})`,
          "background-size": "1000px",
          "background-repeat": "repeat",
          filter:
            "invert(80%) sepia(100%) hue-rotate(200deg) saturate(200%) blur(2px)",
          opacity: 0.1,
          "background-blend-mode": "screen",
        }}
      ></div>
      <Header />
      <main class="h-full m-24 mx-48 z-10">
        <Suspense>{props.children}</Suspense>
      </main>
    </div>
  );
};

export default App;
