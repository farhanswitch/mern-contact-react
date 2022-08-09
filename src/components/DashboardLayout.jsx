import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

import Layout from "./Layout";
import ModalConfirm from "./ModalConfirm";

axios.defaults.withCredentials = true;

const DashboardLayout = (props) => {
  // const isMenuOpen = useSelector((state) => state.menu.isOpen);
  // console.log("state is menu open", isMenuOpen);
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
    <Layout pageTitle={props?.pageTitle}>
      <div className="dashboard mt-10 flex items-stretch w-full max-w-4xl min-h-[80vh] mx-auto border border-slate-400/20 rounded shadow-xl shadow-slate-400/30 ">
        {showModal && (
          <ModalConfirm
            showModal={showModal}
            setShowModal={setShowModal}
            color="Error"
            info={{
              msg: "Do you want to log out?",
              title: "Log Out Confirmation",
              action: "Log Out",
            }}
            handleAction={handleAction}
          />
        )}
        <aside
          className={`menu ${
            isOpen ? "w-1/4 px-2" : "w-fit px-6"
          } min-h-full bg-slate-200/60  flex flex-col text-slate-600`}
        >
          <h2
            onClick={() => setIsOpen(!isOpen)}
            className="text-lg mb-8 mt-4 cursor-pointer"
          >
            <button className="flex gap-2 items-center">
              <svg
                width={18}
                fill="rgb(71,85,105)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM64 256C64 238.3 78.33 224 96 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H96C78.33 288 64 273.7 64 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
              </svg>
              <span className={`${isOpen ? "block" : "hidden"} cursor-pointer`}>
                {" "}
                Menu{" "}
              </span>
            </button>
          </h2>
          <ul
            className={`${
              isOpen ? "w-full" : "w-full"
            } flex-1 flex flex-col gap-2 text-slate-500 relative`}
          >
            <li>
              {" "}
              <Link
                to={"/dashboard"}
                className="w-full flex gap-2 items-center hover:bg-white/60 px-1 py-1 mb-3"
              >
                <svg
                  width={isOpen ? 16 : 20}
                  fill="rgb(71,85,105)"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path d="M511.8 287.6L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L416 100.7V64C416 46.33 430.3 32 448 32H480C497.7 32 512 46.33 512 64V185L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6L511.8 287.6z" />
                </svg>
                <span className={`${isOpen ? "block" : "hidden"}`}>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard/contacts"}
                className="w-full flex gap-2 items-center hover:bg-white/60 px-1 py-1 mb-3"
              >
                <svg
                  width={isOpen ? 16 : 20}
                  className="text-blue-600"
                  fill="rgb(71,85,105)"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M272 288h-64C163.8 288 128 323.8 128 368C128 376.8 135.2 384 144 384h192c8.836 0 16-7.164 16-16C352 323.8 316.2 288 272 288zM240 256c35.35 0 64-28.65 64-64s-28.65-64-64-64c-35.34 0-64 28.65-64 64S204.7 256 240 256zM496 320H480v96h16c8.836 0 16-7.164 16-16v-64C512 327.2 504.8 320 496 320zM496 64H480v96h16C504.8 160 512 152.8 512 144v-64C512 71.16 504.8 64 496 64zM496 192H480v96h16C504.8 288 512 280.8 512 272v-64C512 199.2 504.8 192 496 192zM384 0H96C60.65 0 32 28.65 32 64v384c0 35.35 28.65 64 64 64h288c35.35 0 64-28.65 64-64V64C448 28.65 419.3 0 384 0zM400 448c0 8.836-7.164 16-16 16H96c-8.836 0-16-7.164-16-16V64c0-8.838 7.164-16 16-16h288c8.836 0 16 7.162 16 16V448z" />
                </svg>

                <span className={`${isOpen ? "block" : "hidden"}`}>
                  Contacts
                </span>
              </Link>
            </li>
            <li
              className={`${response?.user?.role === 1 ? "block" : "hidden"}`}
            >
              {" "}
              <Link
                to={"/dashboard/users"}
                className="w-full flex gap-2 items-center hover:bg-white/60 px-1 py-1"
              >
                <svg
                  width={isOpen ? 16 : 20}
                  fill="rgb(71,85,105)"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M425.1 482.6c-2.303-1.25-4.572-2.559-6.809-3.93l-7.818 4.493c-6.002 3.504-12.83 5.352-19.75 5.352c-10.71 0-21.13-4.492-28.97-12.75c-18.41-20.09-32.29-44.15-40.22-69.9c-5.352-18.06 2.343-36.87 17.83-45.24l8.018-4.669c-.0664-2.621-.0664-5.242 0-7.859l-7.655-4.461c-12.3-6.953-19.4-19.66-19.64-33.38C305.6 306.3 290.4 304 274.7 304H173.3C77.61 304 0 381.7 0 477.4C0 496.5 15.52 512 34.66 512H413.3c5.727 0 10.9-1.727 15.66-4.188c-2.271-4.984-3.86-10.3-3.86-16.06V482.6zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM610.5 373.3c2.625-14 2.625-28.5 0-42.5l25.75-15c3-1.625 4.375-5.125 3.375-8.5c-6.75-21.5-18.25-41.13-33.25-57.38c-2.25-2.5-6-3.125-9-1.375l-25.75 14.88c-10.88-9.25-23.38-16.5-36.88-21.25V212.3c0-3.375-2.5-6.375-5.75-7c-22.25-5-45-4.875-66.25 0c-3.25 .625-5.625 3.625-5.625 7v29.88c-13.5 4.75-26 12-36.88 21.25L394.4 248.5c-2.875-1.75-6.625-1.125-9 1.375c-15 16.25-26.5 35.88-33.13 57.38c-1 3.375 .3751 6.875 3.25 8.5l25.75 15c-2.5 14-2.5 28.5 0 42.5l-25.75 15c-3 1.625-4.25 5.125-3.25 8.5c6.625 21.5 18.13 41 33.13 57.38c2.375 2.5 6 3.125 9 1.375l25.88-14.88c10.88 9.25 23.38 16.5 36.88 21.25v29.88c0 3.375 2.375 6.375 5.625 7c22.38 5 45 4.875 66.25 0c3.25-.625 5.75-3.625 5.75-7v-29.88c13.5-4.75 26-12 36.88-21.25l25.75 14.88c2.875 1.75 6.75 1.125 9-1.375c15-16.25 26.5-35.88 33.25-57.38c1-3.375-.3751-6.875-3.375-8.5L610.5 373.3zM496 400.5c-26.75 0-48.5-21.75-48.5-48.5s21.75-48.5 48.5-48.5c26.75 0 48.5 21.75 48.5 48.5S522.8 400.5 496 400.5z" />
                </svg>
                <span className={`${isOpen ? "block" : "hidden"}`}>Users</span>
              </Link>
            </li>
            <li className="absolute bottom-2 left-1 w-full">
              <button
                onClick={() => setShowModal(true)}
                className="py-1 text-blue-600 flex items-center gap-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={isOpen ? 16 : 20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-log-out"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span className={`${isOpen ? "block" : "hidden"}`}>
                  {" "}
                  Logout{" "}
                </span>
              </button>
            </li>
          </ul>
        </aside>
        <main className="flex-1 min-h-full max-h-[75vh] overflow-y-auto bg-white flex flex-col ">
          {props?.children}
          {/* <header className="w-full mt-4 px-8 flex justify-between">
          <span></span>
          <h2 className="text-lg">Dashboard</h2>
        </header>
        <div className="content flex-1 grid place-items-center">
          <h3 className="text-center">Hi, {response?.name}</h3>
        </div> */}
        </main>
      </div>
    </Layout>
  );
};
export default DashboardLayout;
