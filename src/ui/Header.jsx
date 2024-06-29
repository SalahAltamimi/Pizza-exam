import { Link, useNavigate } from "react-router-dom";
import User from "../features/user/User";
import { useState } from "react";

function Header() {
  const [query, setquery] = useState("");
  const navigate = useNavigate();
  function handelsubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
    setquery("");
  }
  return (
    <header className="bg-yellow-500 flex items-center justify-between p-4 sm:px-6 border-b-2 border-stone-300 flex-wrap">
      <Link
        className="font-semibold capitalize text-base tracking-widest"
        to="/"
      >
        FAST REACT PIZZA CO.
      </Link>
      <form onSubmit={handelsubmit}>
        <input
          value={query}
          onChange={(e) => setquery(e.target.value)}
          type="text"
          placeholder="#order"
          className="w-24 h-10 rounded-full py-1 focus:w-72 focus:ring focus:ring-yellow-300 focus:outline-none transition-all duration-300 placeholder:text-stone-600 px-4 bg-yellow-200 placeholder:text-sm"
        />
      </form>
      <User />
    </header>
  );
}

export default Header;
