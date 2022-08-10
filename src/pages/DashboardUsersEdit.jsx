import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import ModalNotif from "../components/ModalNotif";
import ModalDeleteUser from "../components/ModalDeleteUser";
import UpdateIcon from "../icons/Update";

const DashboardUserEdit = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4000/users/${id}`).then((res) => {
      if (!res.data.userData) {
        navigate("/login");
      }
      if (res.data?.userData?.role !== 1) {
        navigate("/dashboard");
      }
      setRole(res?.data?.userData?.role);
      setUser(res.data.user);
      setIsReady(true);
    });
  }, []);
  const handleSubmit = () => {
    axios
      .patch(`http://localhost:4000/users/edit/`, { ...user })
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
      <DashboardLayout pageTitle="Edit User" role={role}>
        {toDelete && (
          <ModalDeleteUser handleClose={() => setToDelete(null)} user={user} />
        )}
        {result?.statusMsg ? (
          <ModalNotif
            showModal={showModal}
            setShowModal={setShowModal}
            response={result}
            reset={resetResult}
            nextPath="/dashboard/users"
          />
        ) : null}
        <div className="relative w-full h-full">
          <header className="w-full mt-4 mb-8 px-8 flex items-center justify-between">
            <Link className="text-blue-700" to="/dashboard/users">
              All User
            </Link>
            <h2 className="text-md">User's Details</h2>
          </header>
          {user ? (
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
                  value={user?.name}
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
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
                  value={user?.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </div>
              <div className="input-div mb-3">
                <label className="block" htmlFor="role">
                  Role Permission
                </label>
                <select
                  className="border px-2 py-1"
                  onChange={(e) =>
                    setUser({ ...user, role: parseInt(e.target.value) })
                  }
                  name="role"
                  id="role"
                  value={user.role.toString()}
                >
                  <option value="1">Administrator (1)</option>
                  <option value="2">Premium (2)</option>
                  <option value="3">Basic (3)</option>
                </select>
              </div>
              <div className="actions flex gap-2 items-center">
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <UpdateIcon width={14} color="white" />
                  Update
                </button>
              </div>
            </form>
          ) : (
            <p className="bg-pink-200 text-red-500 text-center">
              There is no user with id : {id}
            </p>
          )}
          <button
            onClick={() => {
              setToDelete(true);
            }}
            className="block absolute bottom-4 right-4 w-fit bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default DashboardUserEdit;
