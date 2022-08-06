import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="w-full bg-blue-600/70 backdrop-blur-md sticky top-0 z-[10] py-4 shadow">
      <div className="inner max-w-5xl mx-auto text-white px-3 flex justify-between items-center">
        <div className="title">MFContact</div>
        <ul className="flex gap-3 items-center">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/dashboard"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"/login"}>
              <button className="bg-white text-blue-800 px-3 py-2 text-sm rounded">
                Login
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
