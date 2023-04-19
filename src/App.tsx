import { RouterProvider } from "react-router-dom";

import { router } from "./components/Router/Router";
import { MainLayout } from "./components/MainLayout/MainLayout";

function App() {
  return (
    <MainLayout>
      <RouterProvider router={router} />
    </MainLayout>
  );
}

export default App;
