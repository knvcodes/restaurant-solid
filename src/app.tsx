import { createSignal, Suspense, type ParentComponent } from "solid-js";
import Header from "./components/Header";
import { useLocation } from "@solidjs/router";
import { CustomToast } from "./components/custom/CustomToast";
import ModalPortal from "./components/ModalPortal";
import { SideMenu } from "./components/Header/SideMenu";

const App: ParentComponent = (props) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [burgerMenuOpen, setburgerMenuOpen] = createSignal(false);

  return (
    <div class="flex flex-col relative min-h-screen bg-white app-class">
      <SideMenu open={burgerMenuOpen()} setburgerMenuOpen={setburgerMenuOpen} />

      {!isAdminRoute && (
        <Header
          burgerMenuOpen={burgerMenuOpen()}
          setburgerMenuOpen={setburgerMenuOpen}
        />
      )}
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
