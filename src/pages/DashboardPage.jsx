import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/DasboardLayout";
import ModalConfirm from "../components/ModalConfirm";

axios.defaults.withCredentials = true;
const DashboardPage = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/auth").then((res) => {
      if (res?.data?.id) {
        console.log(res.data);
        setResponse(res.data);
      } else {
        navigate("/login");
      }
      return () => console.log("unmounted");
    });
  }, []);
  const handleAction = () => {
    axios.delete("http://localhost:4000/users/logout").then((res) => {
      if (res.data.msg === "logged-out") {
        navigate("/login");
      }
    });
  };
  return (
    <DashboardLayout pageTitle="Dashboard">
      <>
        <header className="w-full mt-4 px-8 flex justify-between">
          <span></span>
          <h2 className="text-lg">Dashboard</h2>
        </header>
        <div className="content flex-1 grid place-items-center">
          <h3 className="text-center">Hi, {response?.name}</h3>
        </div>
      </>
    </DashboardLayout>
  );
};
export default DashboardPage;
