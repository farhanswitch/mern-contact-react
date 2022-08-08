import React, { useEffect, useState } from "react";
import axios from "axios";

import Layout from "./components/Layout";

function App() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/check").then((res) => {
      if (res?.data?.msg === "ok") {
        setStatus("Running");
      } else {
        setStatus("Down");
      }
    });
  });
  return (
    <Layout>
      <div className="App">
        <h1 className="text-center">MFContact</h1>
        <p className="text-center">API Status : {status}</p>
      </div>
    </Layout>
  );
}

export default App;
