import { RouterProvider } from "react-router-dom";

import { ToastProvider } from "./components/toast-provider";
import router from "./navigation/route.config";

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;
