import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";
import UserCard from "../components/UserCard";

const DashboardUsersPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/users").then((res) => {
      console.log(res.data);
      if (res.data?.user?.role !== 1) {
        navigate("/dashboard");
      }
      setRole(res?.data?.user?.role);
      setListUser(res?.data?.users);

      //   return () => setListUser([]);
    });
  }, []);
  return (
    <DashboardLayout pageTitle="Dashboard Users" role={role}>
      <header className="w-full mt-4 px-8 flex justify-between">
        <span></span>
        <h2 className="text-lg">Users</h2>
      </header>
      <main className="pt-5 px-4 overflow-y-auto ">
        <section className="admin my-6 ">
          <h3 className="text-slate-700 pl-10 mb-8">Administrator</h3>
          <div className="users flex flex-wrap gap-6 justify-center ">
            {listUser.length !== 0 &&
              listUser
                .filter((user) => user.role === 1)
                .map((user) => {
                  return <UserCard key={user?._id} user={user} />;
                })}
            {listUser.filter((user) => user.role === 1).length === 0 && (
              <p className="text-center">
                There is no user with role Administrator
              </p>
            )}
          </div>
        </section>
        <section className="premium  my-6">
          <h3 className="text-slate-700 pl-10 mb-8">Premium</h3>
          <div className="users flex flex-wrap gap-6 justify-center ">
            {listUser.length !== 0 &&
              listUser
                .filter((user) => user.role === 2)
                .map((user) => {
                  return <UserCard key={user?._id} user={user} />;
                })}
            {listUser.filter((user) => user.role === 2).length === 0 && (
              <p className="text-center">There is no user with role Premium</p>
            )}
          </div>
        </section>

        <section className="basic  my-6">
          <h3 className="text-slate-700 pl-10 mb-8">Basic</h3>
          <div className="users flex flex-wrap gap-6 justify-center ">
            {listUser.length !== 0 &&
              listUser
                .filter((user) => user.role === 3)
                .map((user) => {
                  return <UserCard key={user?._id} user={user} />;
                })}
            {listUser.filter((user) => user.role === 3).length === 0 && (
              <p className="text-center">There is no user with role Basic</p>
            )}
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default DashboardUsersPage;
