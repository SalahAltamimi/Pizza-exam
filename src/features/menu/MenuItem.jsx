import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import UpdateCart from "../cart/UpdateCart";
import { additem, decItem, deleteitem, incItem } from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuntity = useSelector((store) =>
    store.cartSlice.cart.find((item) => item.pizzaId === id)
  )?.quantity;

  const dispatch = useDispatch();
  function handelAdd(e) {
    e.preventDefault();
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(additem(newItem));
  }

  return (
    <li className="flex py-4 space-x-6">
      <img
        className={`h-24 ${soldOut ? "grayscale opacity-1" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex flex-col space-y-2 flex-grow">
        <p className="font-semibold capitalize">{name}</p>
        <p className="text-stone-400 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="flex items-center justify-between flex-wrap">
          {!soldOut ? (
            <>
              <p>{formatCurrency(unitPrice)}</p>
              {currentQuntity ? (
                <UpdateCart pizzaId={id} currentQuntity={currentQuntity} />
              ) : (
                <button
                  onClick={handelAdd}
                  className="bg-yellow-400 px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-300 duration-300 transition-all"
                >
                  Add to Cart
                </button>
              )}{" "}
            </>
          ) : (
            <p className="text-stone-400">Sold out</p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
