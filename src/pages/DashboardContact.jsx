import React, { useState, useEffect } from "react";
import axios from "axios";

import DashboardLayout from "../components/DasboardLayout";
import ContactCard from "../components/ContactCard";
import ModalDelete from "../components/ModalDelete";

const DashboardContact = () => {
  const [response, setResponse] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  console.log(response);
  useEffect(() => {
    axios.get("http://localhost:4000/contacts").then((res) => {
      setResponse(res.data);

      return () => {
        console.log("unmounted");
      };
    });
  }, [isUpdate]);
  return (
    <DashboardLayout pageTitle="Dashboard Contacts">
      <div className="h-full overflow-y-auto">
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
            response?.contacts?.map((contact, index) => {
              return (
                <ContactCard
                  setToDelete={setToDelete}
                  contact={contact}
                  key={contact._id}
                />
              );
            })}
        </main>
      </div>
    </DashboardLayout>
  );
};

export default DashboardContact;
