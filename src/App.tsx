import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/home";
import MenuDetail from "./components/menuDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
      children: [
        {
          path: "/:restaurantId/:menuName",
          element: <MenuDetail />,
        },
      ],
    },
  ]);
  return (
    <div className="w-[100dvw] h-[100dvh] text-black bg-[#10C157] overflow-y-scroll">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
