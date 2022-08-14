import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";

const DashboardContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [contact, setContact] = useState({});
  const [role, setRole] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/contacts/${id}`)
      .then((res) => {
        if (!res.data.role) {
          navigate("/login");
        }
        if (res?.data?.contact) {
          setContact(res?.data?.contact);
        }

        setRole(res?.data?.role);
        setIsReady(true);
      })
      .catch((error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          navigate("/login");
        }
      });
  }, []);
  //   const contact = {
  //     _id: 123,
  //     name: "Farhan",
  //     email: "abc@abc.com",
  //     phone: "0811234",
  //   };
  return (
    <div className={`${isReady ? "block" : "hidden"}`}>
      <DashboardLayout pageTitle="Contact Detail" role={role}>
        <header className="w-full mt-4 mb-8 px-8 flex items-center justify-between">
          <Link className="text-blue-700" to="/dashboard/contacts">
            All Contact
          </Link>
          <h2 className="text-md">Contact Details</h2>
        </header>
        <div className="px-6">
          {contact?._id ? (
            <div className="card mx-auto min-w-96 border shadow rounded px-4 py-2">
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td className="pl-10">{contact?.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td className="pl-10">{contact?.email}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td className="pl-10">{contact?.phone}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-red-500 bg-pink-100 py-4">
              There is no contact with id : {id}
            </p>
          )}
        </div>
      </DashboardLayout>
    </div>
  );
};

export default DashboardContactDetail;
