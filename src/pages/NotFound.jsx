import React from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import ArrowLeftIcon from "../icons/ArrowLeft";

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="notfound">
        <img src="/404.png" alt="404" className="w-96 block mx-auto" />
        <p className="text-center mt-10">Oops! Page not Found</p>
        <Link
          to="/"
          className="px-2 py-1 bg-blue-600 hover:bg-sky-600 text-white rounded w-fit  mx-auto mt-6 flex items-center justify-center gap-2"
        >
          <ArrowLeftIcon width={16} />
          <span>Back to Home</span>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
