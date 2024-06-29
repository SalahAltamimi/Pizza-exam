import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../service/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="py-6 px-4 divide-y divide-stone-300">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Menu;
export async function loader() {
  const data = await getMenu();
  return data;
}
