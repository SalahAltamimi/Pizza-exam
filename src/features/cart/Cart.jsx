import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearitem } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const { cart } = useSelector((store) => store.cartSlice);
  const { username } = useSelector((store) => store.userSlice);

  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6 space-y-6">
      <Link
        className="text-blue-700 text-base hover:border-b-2 hover:border-blue-600 transition-all duration-300"
        to="/menu"
      >
        &larr; Back to menu
      </Link>

      <h2 className="text-base font-semibold">Your cart, {username}</h2>

      <ul className="divide-y divide-stone-300 border-b border-stone-300">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="space-x-4 flex ">
        <Link
          className="bg-yellow-400 rounded-full px-6 py-4 font-semibold text-sm uppercase hover:bg-yellow-300 transition-all duration-300"
          to="/order/new"
        >
          Order pizzas
        </Link>
        <button
          onClick={() => dispatch(clearitem())}
          className=" border border-stone-400 rounded-full px-6 py-4 font-semibold text-sm uppercase hover:bg-stone-300 transition-all duration-300"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
