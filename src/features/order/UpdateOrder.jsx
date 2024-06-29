import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../service/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form className="text-end" method="PATCH">
      <button className="font-semibold text-base capitalize bg-yellow-400 rounded-full px-6 py-2">
        update Order
      </button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
