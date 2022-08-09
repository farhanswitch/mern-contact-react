import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import ContactCard from "../components/ContactCard";
import ModalDelete from "../components/ModalDelete";
import PlusIcon from "../icons/Plus";

const DashboardContact = () => {
  const [response, setResponse] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [auth, setAuth] = useState(null);

  console.log(response);
  useEffect(() => {
    axios.get("http://localhost:4000/contacts").then((res) => {
      setResponse(res.data);
      setAuth({ user: res.data.user });

      return () => {
        console.log("unmounted");
      };
    });
    // axios.get("http://localhost:4000/auth").then((res) => {
    //   if (res?.data?.id) {
    //     console.log(res.data);
    //     setAuth(res.data);
    //   }
  }, [isUpdate]);
  return (
    <DashboardLayout pageTitle="Dashboard Contacts">
      <div className="h-full relative overflow-y-auto">
        <Link
          className={`${
            auth?.user?.role === 3 ? "hidden" : "grid"
          } w-8 h-8  place-items-center rounded-full bg-stone-600/20 absolute bottom-4 right-4 text-xl text-blue-700 font-bold`}
          to="/dashboard/contacts/add"
        >
          <PlusIcon width={10} color="#0c4a6e" />
        </Link>
        <header className="w-full mt-4 px-8 flex justify-between">
          <span></span>
          <h2 className="text-lg">Contacts</h2>
        </header>
        <main className="px-4 pt-5">
          {toDelete && (
            <ModalDelete
              id={toDelete}
              handleClose={() => setToDelete(null)}
              setIsUpdate={setIsUpdate}
            />
          )}
          {response &&
            auth &&
            response?.contacts?.map((contact, index) => {
              return (
                <ContactCard
                  setToDelete={setToDelete}
                  contact={contact}
                  key={contact._id}
                  authRole={auth.user.role}
                />
              );
            })}
        </main>
      </div>
    </DashboardLayout>
  );
};

export default DashboardContact;
