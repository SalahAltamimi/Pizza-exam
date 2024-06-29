import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import UpdateCart from "./UpdateCart";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuntity = useSelector((store) =>
    store.cartSlice.cart.find((el) => el.pizzaId === pizzaId)
  )?.quantity;
  return (
    <li className="flex py-6 items-center justify-between flex-wrap">
      <p className="text-base font-semibold">
        {quantity}&times; {name}
      </p>
      <div className="flex space-x-4 items-center justify-center">
        <p className="text-base font-semibold">{formatCurrency(totalPrice)}</p>
        <UpdateCart pizzaId={pizzaId} currentQuntity={currentQuntity} />
      </div>
    </li>
  );
}

export default CartItem;
