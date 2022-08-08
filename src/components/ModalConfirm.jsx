import React from "react";

const ModalConfirm = ({
  showModal,
  setShowModal,
  info,
  color,
  handleAction,
}) => {
  const colors = {
    Success: "text-green-500",
    Error: "text-red-500",
    Warning: "text-yellow-400",
  };
  const handleClose = () => {};
  return (
    <div
      className={`layer ${
        showModal ? "fixed" : "hidden"
      } w-screen h-screen bg-transparent top-0 left-0 flex justify-center pt-6 z-[10]`}
    >
      <div className="modal border flex flex-col min-w-[220px] h-[250px] bg-white/40 backdrop-blur-lg rounded">
        <div className="msg flex-1 flex flex-col gap-2 items-center justify-center">
          <p className={`${colors[color]} text-xl`}>{info?.title}</p>
          <div className="px-3 text-slate-700 text-center">
            <p className="text-center">{info?.msg}</p>
          </div>
        </div>

        <button
          className={`border py-1 ${colors[color]}`}
          onClick={() => {
            handleAction();
          }}
        >
          {info?.action}
        </button>
        <button
          className="border py-1 text-slate-500"
          onClick={() => {
            setShowModal(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalConfirm;
