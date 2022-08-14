import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import ModalNotif from "../components/ModalNotif";
import UpdateIcon from "../icons/Update";

const DashboardContactEdit = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [contact, setContact] = useState(null);
  const [result, setResult] = useState(null);
  const [role, setRole] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/contacts/${id}`)
      .then((res) => {
        if (!res.data.role) {
          navigate("/login");
        }
        if (res.data?.role !== 1 && res.data?.role !== 2) {
          navigate("/dashboard/contacts");
        }
        setRole(res.data?.role);
        setContact(res.data.contact);
        setIsReady(true);
      })
      .catch((error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          navigate("/login");
        }
      });
  }, []);
  const handleSubmit = () => {
    axios
      .patch(`http://localhost:4000/contacts/edit`, { ...contact })
      .then((res) => {
        setResult(res.data);
        setShowModal(true);
        console.log(res.data);
      });
  };
  const resetResult = () => {
    setResult(null);
  };
  return (
    <div className={`${isReady ? "block" : "hidden"}`}>
      <DashboardLayout pageTitle="Edit Contact" role={role}>
        {result?.msg ? (
          <ModalNotif
            showModal={showModal}
            setShowModal={setShowModal}
            response={result}
            reset={resetResult}
            nextPath="/dashboard/contacts"
          />
        ) : null}
        <header className="w-full mt-4 mb-8 px-8 flex items-center justify-between">
          <Link className="text-blue-700" to="/dashboard/contacts">
            All Contact
          </Link>
          <h2 className="text-md">Contact Details</h2>
        </header>
        {contact ? (
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
                className="border block w-full px-2 py-1 text-slate-600"
                required
                value={contact?.name}
                onChange={(e) => {
                  setContact({ ...contact, name: e.target.value });
                }}
              />
            </div>
            <div className="input-div mb-3">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                className="border block w-full px-2 py-1 text-slate-600"
                required
                value={contact?.email}
                onChange={(e) => {
                  setContact({ ...contact, email: e.target.value });
                }}
              />
            </div>
            <div className="input-div mb-3">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="border block w-full px-2 py-1 text-slate-600"
                required
                value={contact?.phone}
                onChange={(e) => {
                  setContact({ ...contact, phone: e.target.value });
                }}
              />
            </div>
            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <UpdateIcon width={14} color="white" />
              Update
            </button>
          </form>
        ) : (
          <p className="bg-pink-200 text-red-500 text-center">
            There is no contact with id : {id}
          </p>
        )}
      </DashboardLayout>
    </div>
  );
};

export default DashboardContactEdit;
