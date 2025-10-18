import { Suspense, type ParentComponent } from "solid-js";
import Header from "./components/Header";
import bg from "./assets/foodbg.svg";

const App: ParentComponent = (props) => {
  return (
    <div class="flex flex-col   h-screen max-h-screen">
      <div
        class="absolute h-screen  w-screen"
        style={{
          "background-image": `url(${bg})`,
          "background-size": "auto 500px",
          filter: "blur(2px)", // blur here
          opacity: 0.1, // dull/faded here
          "background-blend-mode": "color-burn",
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
