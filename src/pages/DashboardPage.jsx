import React, { useState, useEffect } from "react";
import axios from "axios";

import Layout from "../components/Layout";

axios.defaults.withCredentials = true;
const DashboardPage = () => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/auth").then((res) => {
      setResponse(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
    </div>
  );
};
export default DashboardPage;
