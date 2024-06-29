import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
import AppLayout from "./ui/AppLayout";
import Cart from "./features/cart/Cart";
import Menu, { loader as MenuLoader } from "./features/menu/Menu";
import CreateOrder, {
  action as Orderaction,
} from "./features/order/CreateOrder";
import Order, { loader as Orderloader } from "./features/order/Order";
import { action } from "./features/order/UpdateOrder";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: MenuLoader,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: Orderaction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: Orderloader,
        action: action,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
