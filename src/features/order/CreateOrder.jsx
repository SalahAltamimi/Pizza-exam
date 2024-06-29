import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useNavigation } from "react-router-dom";
import EmptyCart from "../cart/EmptyCart";
import { createOrder } from "../../service/apiRestaurant";
import { store } from "../../store";
import { clearitem } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [withPriority, setWithPriority] = useState(false);
  const { cart } = useSelector((store) => store.cartSlice);
  const { address, position, error, status, username } = useSelector(
    (store) => store.userSlice
  );

  const totalPrice = cart.reduce((a, b) => a + b.totalPrice, 0);
  const className = "flex flex-col space-y-4";
  const classNamela = "text-base font-semibold";
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="py-6 px-4 space-y-8">
      <h2 className="text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" className="space-y-4">
        <div className={className}>
          <label className={classNamela}>First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input"
            defaultValue={username}
          />
        </div>

        <div className="space-y-4">
          <label className={classNamela}>Phone number</label>
          <div className={className}>
            <input type="tel" name="phone" required className="input" />
          </div>
        </div>

        <div className="space-y-4 relative">
          <label className={classNamela}>Address</label>
          <div className={className}>
            <input
              type="text"
              name="address"
              required
              className="input"
              defaultValue={address}
            />
            <input
              type="hidden"
              name="cart"
              required
              value={JSON.stringify(cart)}
            />
            <input type="hidden" name="position" value={position} />
            {!position && (
              <button
                disabled={status === "loading"}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                className="px-4 py-2 bg-yellow-400 font-semibold absolute capitalize rounded-full right-[1px] top-6 focus:ring focus:ring-yellow-300"
              >
                {status === "loading" ? "Loading" : "get position"}
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 my-8">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent accent-yellow-400 focus:ring focus:ring-yellow-200 duration-300 transition-all outline-none"
          />
          <label className={classNamela} htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <button
            disabled={isLoading}
            className="bg-yellow-400 px-6 py-2 rounded-full font-semibold capitalize mt-4"
          >
            {isLoading ? "Loading" : `Order now ${formatCurrency(totalPrice)}`}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const newOrder = await createOrder(order);
  store.dispatch(clearitem());

  return redirect(`/order/${newOrder.id}`);
}
