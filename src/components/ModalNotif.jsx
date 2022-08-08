import React from "react";
import { useNavigate } from "react-router-dom";
const ModalNotif = ({
  showModal,
  setShowModal,
  response,
  msg,
  nextPath,
  reset,
}) => {
  const navigate = useNavigate();
  const colors = {
    Success: "text-green-500",
    Error: "text-red-500",
    "Nothing changed": "text-yelow-500",
  };
  console.log(response);
  return (
    <div
      className={`layer ${
        showModal ? "fixed" : "hidden"
      } w-screen h-screen top-0 left-0 bg-transparent flex justify-center items-center z-[10]`}
    >
      <div className="modal border flex flex-col min-w-[220px] h-[250px] bg-white/40 backdrop-blur-lg rounded">
        <div className="msg flex-1 flex flex-col gap-2 items-center justify-center">
          <p className={`${colors[response.statusMsg]} text-xl`}>
            {response.statusMsg}
          </p>
          <div className="px-3 text-slate-700 text-center">
            {response.statusMsg === "Success" ? (
              <p>{msg ? msg : response?.msg}</p>
            ) : (
              <span>
                <p>Details :</p>
                {response.errors ? (
                  response.errors?.map((res, index) => {
                    return <p key={index}>{res.msg}</p>;
                  })
                ) : (
                  <span>{response?.msg}</span>
                )}
              </span>
            )}
          </div>
        </div>

        <button
          className="border py-1"
          onClick={() => {
            setShowModal(false);
            if (reset) reset();
            if (response.statusMsg === "Success") {
              if (nextPath) navigate(nextPath);
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
