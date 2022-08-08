import React, { useState, useEffect } from "react";
import axios from "axios";

import DashboardLayout from "../components/DasboardLayout";
import ContactCard from "../components/ContactCard";

const DashboardContact = () => {
  const [response, setResponse] = useState(null);
  console.log(response);
  useEffect(() => {
    axios.get("http://localhost:4000/contacts").then((res) => {
      setResponse(res.data);

      return () => {
        console.log("unmounted");
      };
    });
  }, []);
  return (
    <DashboardLayout pageTitle="Dashboard Contacts">
      <div className="h-full overflow-y-auto">
        <header className="w-full mt-4 px-8 flex justify-between">
          <span></span>
          <h2 className="text-lg">Contacts</h2>
        </header>
        <main className="px-4 pt-5">
          {response &&
            response?.contacts?.map((contact, index) => {
              return <ContactCard contact={contact} key={contact._id} />;
            })}
        </main>
      </div>
    </DashboardLayout>
  );
};

export default DashboardContact;
