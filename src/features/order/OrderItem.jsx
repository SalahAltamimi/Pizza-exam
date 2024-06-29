import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold italic">
          <span>{quantity}&times;</span> {name}
          <p className="text-sm text-stone-400 capitalize mt-2">
            {isLoadingIngredients ? "Loading" : `${ingredients?.join(", ")}`}
          </p>
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
