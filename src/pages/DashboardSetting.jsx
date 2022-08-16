import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";

const DashboardSettingPage = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:4000/auth").then((res) => {
      setUser({ id: res?.data?.user?.id, role: res?.data?.user?.role });
      console.log(res.data);
    });
  }, []);
  return (
    <DashboardLayout role={user?.role} pageTitle="Dashboard Settings">
      <header className="w-full mt-4 mb-8 px-8">
        <h2 className="text-md text-right ">Account Setting</h2>
      </header>
      <main className="mt-6 px-4">
        <h3 className="text-slate-800">General</h3>
        <div className="menu-setting pl-4 mb-6">
          <Link
            className="text-blue-700 mt-2 text-sm"
            to="/dashboard/setting/general/editprofile"
          >
            Edit profile
          </Link>
        </div>
        <h3 className="text-slate-800">Security</h3>
        <div className="menu-setting pl-4">
          <Link
            className="text-blue-700 mt-2 text-sm"
            to="/dashboard/setting/security/editpassword"
          >
            Change password
          </Link>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default DashboardSettingPage;
