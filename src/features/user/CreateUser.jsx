import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateusername } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateusername(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-base mb-4">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="rounded-full w-2/3 h-10 px-4 py-1 focus:outline-none focus:ring focus:ring-yellow-200 duration-300 transition-all outline-none"
      />

      {username !== "" && (
        <div>
          <button className="bg-yellow-400 px-4 py-2 mt-6 rounded-full text-base font-semibold capitalize hover:bg-yellow-300 duration-300 transition-all">
            Start ordering
          </button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
