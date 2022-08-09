import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Layout from "../components/Layout";
import ModalNotif from "../components/ModalNotif";
import { validatingUserData } from "../utilities/validation";
import { encrypt } from "../utilities/aes";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/auth").then((res) => {
      if (res?.data?.user) {
        navigate("/dashboard");
      }
    });
  }, []);
  const handleRegister = (name, email, password, password1) => {
    const errors = validatingUserData(name, email, password);
    if (password !== password1) {
      errors.push({ msg: "Password doesn't match" });
    }
    if (errors.length !== 0) {
      console.log(errors);
      setResponse({
        statusMsg: "Error",
        errors,
      });
      setShowModal(true);
      return false;
    }

    axios
      .post("http://localhost:4000/users/add/", {
        name,
        email,
        password: encrypt(password),
      })
      .then((response) => {
        setShowModal(true);
        setResponse(response.data);
        console.log(response.data);
      });
  };
  return (
    <Layout pageTitle="Register">
      {response && (
        <ModalNotif
          showModal={showModal}
          setShowModal={setShowModal}
          response={response}
          nextPath={"/login"}
        />
      )}
      <div className="register w-full mx-auto flex justify-center items-center ">
        <div className="inner min-w-[600px] flex items-stretch border border-slate-200 rounded-xl shadow-xl text-slate-700">
          <div className="left bg-sky-500/70 w-[200px]  min-h-full grid place-items-center ">
            <div className="bg-white/80 shadow-lg shadow-white/30 backdrop-blur-md border p-4 rounded-lg ">
              <img
                src="/woman2.png"
                alt="man"
                className="w-[100px] rounded-full"
              />
            </div>
          </div>
          <div className="right flex-1 h-full py-4">
            <h2 className="text-center text-blue-600 mb-4">
              Register an Account
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister(name, email, password, password1);
              }}
              className="py-5 w-full block max-w-3xl mx-auto px-6"
            >
              <div className="form-element mt-3">
                <label htmlFor="name">Full Name</label>
                <input
                  className="px-2 py-1 border block w-full mt-1 rounded"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
              <div className="form-element mt-3">
                <label htmlFor="c-password">Confirm Password</label>
                <input
                  className="px-2 py-1 border block w-full mt-1 rounded"
                  type="password"
                  name="c-password"
                  id="c-password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                />
              </div>
              <button
                className="bg-blue-600 hover:bg-sky-600 text-white text-sm rounded mt-8 px-2 py-1"
                type="submit"
              >
                Sign Up
              </button>
              <p className="text-sm mt-4 text-slate-500">
                Already have an account ?
                <Link className="text-blue-700 ml-2" to={"/login"}>
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
