import { Suspense, type ParentComponent } from "solid-js";
import Header from "./components/Header";
import bg from "./assets/foodbg.svg";

const App: ParentComponent = (props) => {
  return (
    <div class="flex flex-col relative min-h-screen bg-black">
      <div
        class="absolute h-full w-screen"
        style={{
          "background-image": `url(${bg})`,
          "background-size": "500px",
          "background-repeat": "repeat",
          opacity: 0.1,
        }}
      ></div>
      <Header />
      <main class="h-full z-10">
        <Suspense>{props.children}</Suspense>
      </main>
    </div>
  );
};

export default App;
