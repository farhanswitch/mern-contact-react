import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const roles = {
    1: "Admin",
    2: "Premium",
    3: "Basic",
  };

  const colors = {
    1: "from-green-400 to-teal-400",
    2: "from-blue-400 to-sky-400",
    3: "from-stone-400 to-zinc-600",
  };
  return (
    <div
      onClick={() => {
        navigate(`/dashboard/users/${user?._id}`);
      }}
      className="user-card relative flex flex-col items-center justify-center min-w-[8em] min-h-[200px] px-2 pb-10 border rounded shadow"
    >
      <span
        className={`absolute bottom-2 right-2 badge border p-1 rounded bg-gradient-to-r ${
          colors[user?.role]
        }`}
      >
        <p className="text-xs text-white">{roles[user?.role]}</p>
      </span>
      <p className=" text-center">{user?.name}</p>
      <p className="text-xs text-center text-slate-400">{user?.email}</p>
    </div>
  );
};

export default UserCard;
