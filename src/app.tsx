import { Suspense, type ParentComponent } from "solid-js";
import Header from "./components/Header";

const App: ParentComponent = (props) => {
  return (
    <div class="flex flex-col border-8 border-black h-screen max-h-screen">
      <Header />
      <main class="h-full m-24">
        <Suspense>{props.children}</Suspense>
      </main>
    </div>
  );
};

export default App;
