import { Suspense, type ParentComponent } from "solid-js";
import Header from "./components/Header";

const App: ParentComponent = (props) => {
  return (
    <>
      <Header />
      <main>
        <Suspense>{props.children}</Suspense>
      </main>
    </>
  );
};

export default App;
