import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";
import ModalNotif from "../components/ModalNotif";
import { validatingEditPassword } from "../utilities/validation";
import { encrypt } from "../utilities/aes";
import ChevronLeftIcon from "../icons/ChevronLeft";

const DashboardSecurityEditPassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validatingEditPassword(
      oldPassword,
      newPassword,
      confirmNewPassword
    );
    if (errors.length !== 0) {
      setResponse({
        statusMsg: "Error",
        errors,
      });
      setShowModal(true);
      console.log(errors);
    } else {
      axios
        .patch("http://localhost:4000/users/edit/password", {
          id: user?.id,
          password: encrypt(oldPassword),
          newPassword: encrypt(newPassword),
        })
        .then((res) => {
          setResponse(res?.data);
          console.log(res.data);
          setShowModal(true);
          if (res?.data?.statusMsg === "Success") {
            axios
              .delete("http://localhost:4000/users/logout")
              .then((res) => {});
          }
        });
    }
    console.log(oldPassword, newPassword, confirmNewPassword);
  };

  useEffect(() => {
    axios.get("http://localhost:4000/auth").then((res) => {
      if (!res?.data?.user) {
        navigate("/login");
      } else {
        setUser({ id: res?.data?.user?.id, role: res?.data?.user?.role });
      }
    });
  }, []);
  return (
    <DashboardLayout role={user?.role} pageTitle="Change Password">
      {response && (
        <ModalNotif
          showModal={showModal}
          setShowModal={setShowModal}
          response={response}
          nextPath="/dashboard"
        />
      )}
      <header className="w-full mt-4 mb-8 px-3 flex items-center justify-between">
        <Link className="text-blue-700 flex gap-2" to="/dashboard/contacts">
          <ChevronLeftIcon width={15} />
          All Settings
        </Link>
        <h2 className="text-md">Change Password</h2>
      </header>
      <main className="px-4 mt-4">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-element mb-4">
            <label htmlFor="curr-pass">Current Password</label>
            <input
              type="password"
              name="curr-pass"
              id="curr-pass"
              className="border block mt-2 w-[250px]"
              required
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />
          </div>
          <div className="form-element mb-4">
            <label htmlFor="new-pass">New Password</label>
            <input
              type="password"
              name="new-pass"
              id="new-pass"
              className="border block mt-2 w-[250px]"
              required
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
          <div className="form-element mb-4">
            <label htmlFor="conf-new-pass">Confirm New Password</label>
            <input
              type="password"
              name="conf-new-pass"
              id="conf-new-pass"
              className="border block mt-2 w-[250px]"
              required
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded mt-6"
          >
            Change
          </button>
        </form>
      </main>
    </DashboardLayout>
  );
};

export default DashboardSecurityEditPassword;
