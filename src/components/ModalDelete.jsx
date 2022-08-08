import axios from "axios";
import React, { useState, useEffect } from "react";

const ModalResponse = ({ contact, setResponse, handleClose, setIsUpdate }) => {
  return (
    <div className="modal z-[5] relative w-[300px] h-[320px] bg-white/50 backdrop-blur-md rounded border mt-10">
      <h3 className="text-green-500 text-center mt-4">
        <i className="bi bi-check-square mr-2"></i>
        Success
      </h3>
      <p className="text-slate-700 text-center mt-6">
        Contact deleted successfully!
      </p>
      <table className="w-fit block mx-auto my-4">
        <tbody>
          <tr>
            <td className="px-2 py-1">Name</td>
            <td>{contact?.name}</td>
          </tr>
          <tr>
            <td className="px-2 py-1">Email</td>
            <td>{contact?.email}</td>
          </tr>
          <tr>
            <td className="px-2 py-1">Phone</td>
            <td>{contact?.phone}</td>
          </tr>
        </tbody>
      </table>
      <div className="buttons absolute bottom-0 left-0 w-full">
        <button
          onClick={() => {
            setResponse(null);
            setIsUpdate(true);
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
const ModalDelete = ({ handleClose, id, setIsUpdate }) => {
  const [contact, setContact] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setContact(null);
    axios.get(`http://localhost:4000/contacts/${id}`).then((res) => {
      if (res?.data?.contact) {
        setContact(res.data.contact);
      } else {
        alert(`There is no contact with id ${id}`);
        handleClose();
      }
    });
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`http://localhost:4000/contacts/delete/${id}`).then((res) => {
      if (res.data.msg === "ok") {
        setResponse(contact);
      } else if (res.data.msg === "error") {
        alert(`Error`);
        handleClose();
      }
    });
  };

  return (
    <div
      className={`layer fixed top-0 left-0 pt-10  w-screen h-screen bg-transparent flex justify-center`}
    >
      {response && (
        <ModalResponse
          contact={contact}
          setResponse={setResponse}
          handleClose={handleClose}
          setIsUpdate={setIsUpdate}
        />
      )}
      <div
        className={`modal ${
          response ? "hidden" : "block"
        }  relative w-[300px] h-[320px] bg-white/50 backdrop-blur-md rounded border mt-10`}
      >
        <h3 className="text-red-500 text-center mt-4">Delete Contact</h3>
        <p className="text-slate-700 text-center mt-6">
          Do you want to delete this contact?
        </p>
        <table className="w-fit block mx-auto my-4">
          <tbody>
            <tr>
              <td className="px-2 py-1">Name</td>
              <td>{contact?.name}</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Email</td>
              <td>{contact?.email}</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Phone</td>
              <td>{contact?.phone}</td>
            </tr>
          </tbody>
        </table>
        <div className="buttons absolute bottom-0 left-0 w-full">
          <button
            onClick={() => handleDelete(id)}
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

export default ModalDelete;
