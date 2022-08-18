import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";
import ModalNotif from "../components/ModalNotif";
import SaveIcon from "../icons/Save";
import ChevronLeftIcon from "../icons/ChevronLeft";

const DashboardContactAdd = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/auth").then((res) => {
      if (!res.data.user) {
        navigate("/login");
      }
      setRole(res?.data?.user?.role);
    });
  }, []);
  const handleSubmit = () => {
    axios({
      method: "post",
      data: { name, email, phone },
      url: "http://localhost:4000/contacts/add/",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setResult(res.data);
      setShowModal(true);
    });
  };
  return (
    <DashboardLayout pageTitle="Add New Contact" role={role}>
      {result?.statusMsg && (
        <ModalNotif
          showModal={showModal}
          setShowModal={setShowModal}
          response={result}
          reset={() => setResult(null)}
          nextPath="/dashboard/contacts"
        />
      )}
      <div className="container mt-4 mx-auto  max-w-3xl">
        <header className="flex mb-6 justify-between px-3 items-center">
          <Link
            to="/dashboard/contacts"
            className="text-decoration-none flex items-center gap-2 text-blue-700"
          >
            <ChevronLeftIcon width={15} />
            All Contact
          </Link>
          <h2 className="text-slate-700">Add Contact</h2>
        </header>
        <form
          className="px-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="input-div mb-3">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="border block w-full"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="input-div mb-3">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border block w-full"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-div mb-3">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="border block w-full"
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <SaveIcon width={"14"} />
            Save
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default DashboardContactAdd;
