import { useSelector } from "react-redux";

function User() {
  const { username } = useSelector((store) => store.userSlice);
  if (!username) return;
  return <div className="text-base uppercase font-semibold">{username}</div>;
}

export default User;
