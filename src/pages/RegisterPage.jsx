import React from "react";

const RegisterPage = () => {
  return (
    <div className="register max-w-5xl mx-auto flex ">
      <div className="left bg-blue-500 w-[200px] min-h-[400px] h-full"> </div>
      <div className="right flex-1 h-full">
        <h2 className="text-center text-blue-600">Register an Account</h2>
        <form className=" border py-4 w-full block max-w-xl mx-auto px-6">
          <div className="form-element mt-3">
            <label htmlFor="name">Full Name</label>
            <input
              className="px-2 py-1 border block w-full mt-2"
              type="text"
              name="name"
              id="name"
              required
            />
          </div>
          <div className="form-element mt-3">
            <label htmlFor="email">Email Address</label>
            <input
              className="px-2 py-1 border block w-full mt-2"
              type="email"
              name="email"
              id="email"
              required
            />
          </div>
          <div className="form-element mt-3">
            <label htmlFor="password">Password</label>
            <input
              className="px-2 py-1 border block w-full mt-2"
              type="password"
              name="password"
              id="password"
              required
            />
          </div>
          <button
            className="bg-blue-600 hover:bg-sky-600 text-white text-sm rounded mt-8 px-2 py-1"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
