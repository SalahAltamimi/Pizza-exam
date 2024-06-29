import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="py-6 px-4 space-y-4">
      <Link
        className="text-blue-700 text-base hover:border-b-2 hover:border-blue-600 transition-all duration-300"
        to="/menu"
      >
        &larr; Back to menu
      </Link>

      <p>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
