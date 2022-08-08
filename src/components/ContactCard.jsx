import React from "react";
import { Link } from "react-router-dom";

const ContactCard = ({ contact, setToDelete }) => {
  return (
    <div className="contact-card group  w-full mb-6 rounded shadow-lg border px-4 py-2">
      <p>{contact?.name}</p>
      <div className="actions hidden duration-300 group-hover:flex flex-wrap items-center gap-4 mt-6">
        <h3 className="text-slate-600 text-sm">Actions</h3>
        <Link to={`/dashboard/contacts/${contact._id.toString()}`}>
          <button className="bg-green-400 text-white text-xs rounded border px-2 py-1">
            Details
          </button>
        </Link>
        <Link to={`/dashboard/contacts/edit/${contact._id.toString()}`}>
          <button className="bg-yellow-400 text-white text-xs rounded border px-2 py-1">
            Edit
          </button>
        </Link>
        <button
          onClick={() => setToDelete(contact?._id?.toString())}
          className="bg-red-400 text-white text-xs rounded border px-2 py-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
