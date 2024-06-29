import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
function CartOverview() {
  const totalPrice = useSelector((store) =>
    store.cartSlice.cart.reduce((a, b) => a + b.totalPrice, 0)
  );
  const totalQuantity = useSelector((store) =>
    store.cartSlice.cart.reduce((a, b) => a + b.quantity, 0)
  );
  if (totalQuantity === 0) return;
  return (
    <div className="bg-stone-800 text-stone-200 px-4 py-4 flex items-center justify-between flex-wrap">
      <p className="space-x-4 text-sm font-semibold">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="cart" className="space-x-4 text-sm font-semibold">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
