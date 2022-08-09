import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../components/DashboardLayout";
import UserCard from "../components/UserCard";

const DashboardUsersPage = () => {
  const user1 = {
    name: "Muhammad Farhan",
    email: "farhan@abc.com",
    role: 1,
  };
  const user2 = {
    name: "Sheila Purnama",
    email: "sheila@abc.com",
    role: 2,
  };
  const user3 = {
    name: "Gazza Cahyadi",
    email: "gazza@abc.com",
    role: 3,
  };

  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/users").then((res) => {
      console.log(res?.data?.users);
      setListUser(res?.data?.users);
      console.log(listUser);
      //   return () => setListUser([]);
    });
  }, []);
  return (
    <DashboardLayout pageTitle="Dashboard Users">
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
