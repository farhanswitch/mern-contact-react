import React, { useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";

const DashboardSecurityEditPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(oldPassword, newPassword, confirmNewPassword);
  };
  return (
    <DashboardLayout pageTitle="Change Password">
      <header className="w-full mt-4 mb-8 px-8 flex items-center justify-between">
        <Link className="text-blue-700" to="/dashboard/contacts">
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
              className="border block mt-2"
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
              className="border block mt-2"
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
              className="border block mt-2"
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
