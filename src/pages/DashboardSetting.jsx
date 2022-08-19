import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";
import IDCardIcon from "../icons/IDCard";
import ChevronRightIcon from "../icons/ChevronRight";
import KeyIcon from "../icons/Key";

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
      <div className="bg-neutral-50 flex-1">
        <header className="w-full  mb-8 px-8 bg-white shadow-md shadow-slate-300/30 py-4">
          <h2 className="text-md text-right ">Account Setting</h2>
        </header>
        <main className="mt-4 px-4 bg-neutral-50 flex-1">
          <h3 className="text-slate-800">General</h3>
          <div className="menu-setting bg-white rounded-lg pb-1 pl-4 mb-6">
            <Link
              className=" mt-2 text-sm w-full flex gap-4 rounded-lg items-center group"
              to="/dashboard/setting/general/editprofile"
            >
              <div className="text-[rgb(255,45,85)]">
                <IDCardIcon width={24} />
              </div>

              <p className="flex-1 flex items-center justify-between  py-4 pr-8 group-hover:pr-4 duration-500 ">
                <span className="text-slate-600">Edit profile</span>
                <span className="text-slate-400">
                  <ChevronRightIcon width={10} />
                </span>
              </p>
            </Link>
          </div>
          <h3 className="text-slate-800">Security</h3>
          <div className="menu-setting bg-white rounded-lg pb-1 pl-4 mb-6">
            <Link
              className=" mt-2 text-sm w-full flex gap-4 rounded-lg items-center group"
              to="/dashboard/setting/security/editpassword"
            >
              <div className="text-[rgb(255,204,0)]">
                <KeyIcon width={24} />
              </div>

              <p className="flex-1 flex items-center justify-between  py-4 pr-8 group-hover:pr-4 duration-500 ">
                <span className="text-slate-600">Edit Password</span>
                <span className="text-slate-400">
                  <ChevronRightIcon width={10} />
                </span>
              </p>
            </Link>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSettingPage;
