import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./styles/style.css";
import App from "./App";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardContact from "./pages/DashboardContact";
import DashboardContactDetail from "./pages/DashboardContactDetail";
import DashboardContactEdit from "./pages/DashboardContactEdit";
import DashboardContactAdd from "./pages/DashboardContactAdd";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />,
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/contacts" element={<DashboardContact />} />
        <Route
          path="/dashboard/contacts/add"
          element={<DashboardContactAdd />}
        />
        <Route
          path="/dashboard/contacts/:id"
          element={<DashboardContactDetail />}
        />
        <Route
          path="/dashboard/contacts/edit/:id"
          element={<DashboardContactEdit />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
