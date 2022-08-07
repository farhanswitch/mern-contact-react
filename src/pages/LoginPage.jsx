import React, { useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import ModalNotif from "../components/ModalNotif";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (email, password) => {
    setResponse({
      statusMsg: "Error",
      errors: [
        {
          msg: "Invalid password",
        },
      ],
    });
    setShowModal(true);
  };
  return (
    <Layout pageTitle="Login">
      {response && (
        <ModalNotif
          showModal={showModal}
          setShowModal={setShowModal}
          response={response}
        />
      )}
      <div className="login w-full mx-auto flex justify-center items-center ">
        <div className="inner min-w-[600px] flex items-stretch border border-slate-200 rounded-xl shadow-xl text-slate-700">
          <div className="left bg-green-500/70 w-[200px]  min-h-full grid place-items-center  ">
            <div className="bg-white/80 shadow-lg shadow-white/30 backdrop-blur-md border p-4 rounded-lg ">
              <img
                src="/man2.png"
                alt="man"
                className="w-[100px] rounded-full"
              />
            </div>
          </div>
          <div className="right flex-1 h-full py-4">
            <h2 className="text-center text-blue-600 mb-4">Login</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(email, password);
              }}
              className="py-5 w-full block max-w-3xl mx-auto px-6"
            >
              <div className="form-element mt-3">
                <label htmlFor="email">Email Address</label>
                <input
                  className="px-2 py-1 border block w-full mt-1 rounded"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-element mt-3">
                <label htmlFor="password">Password</label>
                <input
                  className="px-2 py-1 border block w-full mt-1 rounded"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                className="bg-blue-600 hover:bg-sky-600 text-white text-sm rounded mt-8 px-2 py-1"
                type="submit"
              >
                Sign In
              </button>
              <p className="text-sm mt-4 text-slate-500">
                Do not have an account yet ?
                <Link className="text-blue-700 ml-2" to={"/register"}>
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
