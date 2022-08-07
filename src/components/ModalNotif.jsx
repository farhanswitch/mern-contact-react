import React from "react";
import { useNavigate } from "react-router-dom";
const ModalNotif = ({ showModal, setShowModal, response, msg, nextPath }) => {
  const navigate = useNavigate();
  const colors = {
    Success: "text-green-500",
    Error: "text-red-500",
  };
  return (
    <div
      className={`layer ${
        showModal ? "fixed" : "hidden"
      } w-screen h-screen bg-transparent flex justify-center pt-6 z-[10]`}
    >
      <div className="modal border flex flex-col min-w-[220px] h-[250px] bg-white/40 backdrop-blur-lg rounded">
        <div className="msg flex-1 flex flex-col gap-2 items-center justify-center">
          <p className={`${colors[response.statusMsg]} text-xl`}>
            {response.statusMsg}
          </p>
          <div className="px-3 text-slate-700 text-center">
            {response.statusMsg === "Success" ? (
              <p>{msg}</p>
            ) : (
              <span>
                <p>Details :</p>
                {response.errors?.map((res, index) => {
                  return <p key={index}>{res.msg}</p>;
                })}
              </span>
            )}
          </div>
        </div>

        <button
          className="border py-1"
          onClick={() => {
            setShowModal(false);
            if (response.statusMsg === "Success") {
              navigate(nextPath);
            }
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalNotif;
