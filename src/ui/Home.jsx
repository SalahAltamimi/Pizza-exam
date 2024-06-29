import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { Link } from "react-router-dom";

function Home() {
  const { username } = useSelector((store) => store.userSlice);

  return (
    <div className="flex items-center flex-col py-10 px-4 text-center">
      <h1 className="text-3xl leading-relaxed font-semibold mb-6">
        The best pizza.
        <br />
        <span className="text-yellow-500 capitalize">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username ? (
        <Link
          to="/menu"
          className="bg-yellow-400 px-6 py-4 mt-6 rounded-full text-base font-semibold uppercase hover:bg-yellow-300 duration-300 transition-all"
        >
          CONTINUE ORDERING {username}
        </Link>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
