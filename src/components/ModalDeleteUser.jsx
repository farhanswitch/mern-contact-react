import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ModalResponse = ({ user, setResponse, handleClose }) => {
  const navigate = useNavigate();
  return (
    <div className="modal z-[5] relative w-[300px] h-[320px] bg-white/50 backdrop-blur-md rounded border mt-10">
      <h3 className="text-green-500 text-center mt-4">
        <i className="bi bi-check-square mr-2"></i>
        Success
      </h3>
      <p className="text-slate-700 text-center mt-6">
        User deleted successfully!
      </p>
      <table className="w-fit block mx-auto my-4">
        <tbody>
          <tr>
            <td className="px-2 py-1">Name</td>
            <td>{user?.name}</td>
          </tr>
          <tr>
            <td className="px-2 py-1">Email</td>
            <td>{user?.email}</td>
          </tr>
        </tbody>
      </table>
      <div className="buttons absolute bottom-0 left-0 w-full">
        <button
          onClick={() => {
            setResponse(null);
            navigate("/dasboard/users");
            handleClose();
          }}
          className="w-full border py-2 text-green-600"
        >
          Done
        </button>
      </div>
    </div>
  );
};
const ModalDeleteUser = ({ handleClose, user }) => {
  const [response, setResponse] = useState(null);

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`http://localhost:4000/users/delete/${id}`).then((res) => {
      if (res.data.msg === "ok") {
        setResponse(user);
      } else if (res.data.msg === "error") {
        alert(`Error`);
        handleClose();
      }
    });
  };

  return (
    <div
      className={`layer fixed top-0 left-0 pt-10 z-[11]  w-screen h-screen bg-transparent flex justify-center`}
    >
      {response && (
        <ModalResponse
          user={user}
          setResponse={setResponse}
          handleClose={handleClose}
        />
      )}
      <div
        className={`modal ${
          response ? "hidden" : "block"
        }  relative w-[300px] h-[320px] bg-white/50 backdrop-blur-md rounded border mt-10`}
      >
        <h3 className="text-red-500 text-center mt-4">Delete User</h3>
        <p className="text-slate-700 text-center mt-6">
          Do you want to delete this user?
        </p>
        <table className="w-fit block mx-auto my-4">
          <tbody>
            <tr>
              <td className="px-2 py-1">Name</td>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Email</td>
              <td>{user?.email}</td>
            </tr>
          </tbody>
        </table>
        <div className="buttons absolute bottom-0 left-0 w-full">
          <button
            onClick={() => {
              console.log(response);
              handleDelete(user?._id);
            }}
            className="w-full border py-2 text-red-600"
          >
            Delete
          </button>
          <button
            onClick={() => handleClose()}
            className="w-full border py-2 text-slate-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteUser;
