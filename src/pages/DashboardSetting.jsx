import React from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";

const DashboardSettingPage = () => {
  return (
    <DashboardLayout pageTitle="Dashboard Settings">
      <header className="w-full mt-4 mb-8 px-8">
        <h2 className="text-md text-right ">Account Setting</h2>
      </header>
      <main className="mt-6 px-4">
        <h3 className="text-slate-800">Security</h3>
        <Link
          className="text-blue-700 mt-2 text-sm"
          to="/dashboard/setting/security/editpassword"
        >
          Change password
        </Link>
      </main>
    </DashboardLayout>
  );
};

export default DashboardSettingPage;
