import React from "react";
import { Link } from "react-router-dom";

const ContactCard = ({ contact, setToDelete, authRole }) => {
  return (
    <div className="contact-card group  w-full mb-6 rounded shadow-lg border px-4 py-2 flex flex-wrap justify-between items-center">
      <p className="max-w-1/2">{contact?.name}</p>
      <div className="actions max-w-1/2 hidden duration-300 group-hover:flex flex-wrap items-center gap-4">
        <h3 className="text-slate-600 text-sm">Actions</h3>
        <Link to={`/dashboard/contacts/${contact._id.toString()}`}>
          <button className="bg-green-400 text-white text-xs rounded border px-2 py-1">
            Details
          </button>
        </Link>
        <Link
          className={`${authRole === 2 || authRole === 1 ? "block" : "hidden"}`}
          to={`/dashboard/contacts/edit/${contact._id.toString()}`}
        >
          <button className="bg-yellow-500/80 text-white text-xs rounded border px-2 py-1">
            Edit
          </button>
        </Link>
        <button
          onClick={() => setToDelete(contact?._id?.toString())}
          className={`${
            authRole === 1 ? "block" : "hidden"
          } bg-red-400 text-white text-xs rounded border px-2 py-1`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
