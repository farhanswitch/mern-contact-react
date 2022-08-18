import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";
import UpdateIcon from "../icons/Update";
import ChevronLeftIcon from "../icons/ChevronLeft";
import { validatingUserData } from "../utilities/validation";
import ModalNotif from "../components/ModalNotif";

const DashboardGeneralEditProfile = () => {
  const [id, setId] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = () => {
    const errors = validatingUserData(user.name, user.email, "skip");
    if (errors.length !== 0) {
      setResponse({ statusMsg: "Error", errors });
      setShowModal(true);
    } else {
      axios
        .patch(`http://localhost:4000/users/edit/${id.id}`, {
          ...user,
        })
        .then((res) => {
          setResponse(res.data);
          setShowModal(true);
        });
    }
    console.log(errors);
  };
  useEffect(() => {
    // const getData = async () => {
    //   const userId = await (
    //     await axios.get("http://localhost:4000/auth")
    //   ).data.user;
    //   if (userId !== undefined) {
    //     setId({ id: userId?.id, role: userId?.role });
    //     const userData = await (
    //       await axios.get(`http://localhost:4000/users/${id.id}`)
    //     )?.data?.user;
    //     setUser(userData);
    //     console.log(userData);
    //   }
    // };
    // getData();

    axios.get("http://localhost:4000/auth").then((res) => {
      setId({ id: res.data.user.id, role: res.data.user.role });
      axios
        .get(`http://localhost:4000/users/${res.data.user.id}`)
        .then((response) => {
          setUser(response.data.user);
        });
    });
  }, []);
  return (
    <div className="edituser">
      {id && (
        <DashboardLayout pageTitle="Edit Profile" role={id?.role}>
          {response && (
            <ModalNotif
              showModal={showModal}
              setShowModal={setShowModal}
              response={response}
              nextPath="/dashboard"
            />
          )}
          <header className="w-full mt-4 mb-8 px-3 flex items-center justify-between">
            <Link className="text-blue-700 flex gap-2" to="/dashboard/setting">
              <ChevronLeftIcon width={15} />
              All Setting
            </Link>
            <h2 className="text-md">Edit Profile</h2>
          </header>
          <main>
            <form
              className="px-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="input-div mb-3">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border block w-full px-2 py-1 text-slate-600"
                  required
                  value={user?.name}
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                />
              </div>
              <div className="input-div mb-3">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border block w-full px-2 py-1 text-slate-600"
                  required
                  value={user?.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </div>

              <div className="actions flex gap-2 items-center">
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                  <UpdateIcon width={14} color="white" />
                  Update
                </button>
              </div>
            </form>
          </main>
        </DashboardLayout>
      )}
    </div>
  );
};

export default DashboardGeneralEditProfile;
