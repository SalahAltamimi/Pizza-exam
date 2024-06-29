import { useDispatch } from "react-redux";
import { decItem, deleteitem, incItem } from "./cartSlice";

function UpdateCart({ currentQuntity, pizzaId }) {
  const dispatch = useDispatch();
  function handeldelete(e) {
    e.preventDefault();
    dispatch(deleteitem(pizzaId));
  }
  function handelinc(e) {
    e.preventDefault();
    dispatch(incItem(pizzaId));
  }
  function handeldec(e) {
    e.preventDefault();
    dispatch(decItem(pizzaId));
  }
  const className =
    "bg-yellow-400 rounded-full px-2 font-semibold text-base hover:bg-yellow-300 transition-all duration-300";
  return (
    <div className="space-x-4">
      <button onClick={handeldec} className={className}>
        -
      </button>
      <span>{currentQuntity}</span>
      <button className={className} onClick={handelinc}>
        +
      </button>
      <button
        onClick={handeldelete}
        className="bg-yellow-400 rounded-full px-4 py-1  font-semibold text-base"
      >
        Delete
      </button>
    </div>
  );
}

export default UpdateCart;
