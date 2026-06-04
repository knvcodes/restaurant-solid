import {
  Suspense,
  type ParentComponent,
  createSignal,
  createEffect,
} from "solid-js";
import Header from "./components/Header";
import { useLocation } from "@solidjs/router";

const App: ParentComponent = (props) => {
  const location = useLocation();
  const isAdminRoute =  location.pathname.startsWith("/admin");

  return (
    <div class="flex flex-col relative min-h-screen bg-white">
      {!isAdminRoute && <Header />}
      <main class="h-full z-10">
        <Suspense>{props.children}</Suspense>
      </main>
    </div>
  );
};

export default App;
