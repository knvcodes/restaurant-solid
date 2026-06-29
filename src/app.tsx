import { Suspense, type ParentComponent } from "solid-js";
import Header from "./components/Header";
import { useLocation } from "@solidjs/router";
import { CustomToast } from "./components/custom/CustomToast";
import ModalPortal from "./components/ModalPortal";

const App: ParentComponent = (props) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div class="flex flex-col relative min-h-screen bg-white app-class">
      {!isAdminRoute && <Header />}
      <main class="h-full">
        <Suspense>{props.children}</Suspense>
      </main>

      {/* toast */}
      <CustomToast />
      <ModalPortal />
    </div>
  );
};

export default App;
