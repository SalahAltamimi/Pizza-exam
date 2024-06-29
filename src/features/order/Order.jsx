// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../service/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher]
  );
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="py-6 px-4 space-y-6">
      <div className="flex items-center justify-between flex-wrap">
        <h2 className="text-base font-semibold capitalize mb-2">
          Order {id} Status
        </h2>

        <div className="space-x-4 flex items-center space-y-2 flex-col sm:flex-row">
          {priority && (
            <span className="bg-red-600 px-6 py-1 rounded-full uppercase font-semibold tracking-widest text-stone-200">
              Priority
            </span>
          )}
          <span className="bg-green-600 px-6 py-1 rounded-full font-semibold tracking-widest text-stone-200 uppercase">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex bg-stone-300 px-4 py-6 items-center justify-between flex-wrap">
        <p className="text-sm font-semibold mb-2">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="divide-y divide-stone-300 border-b border-t border-stone-300">
        {cart.map((item) => (
          <OrderItem
            isLoadingIngredients={fetcher.state === "loading"}
            item={item}
            key={item.pizzaId}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId)?.ingredients
            }
          />
        ))}
      </ul>

      <div className="bg-stone-300 px-4 py-6 space-y-2">
        <p className="text-sm font-semibold capitalize">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-semibold capitalize">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-sm font-semibold capitalize">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}

export default Order;

export async function loader({ params }) {
  const data = await getOrder(params.orderId);
  return data;
}
