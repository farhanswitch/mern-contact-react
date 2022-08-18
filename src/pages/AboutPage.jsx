import React from "react";

import Layout from "../components/Layout";
const AboutPage = () => {
  return (
    <Layout pageTitle="About">
      <div className="pt-10">
        <h2 className="text-center">MFContact</h2>
        <blockquote className="text-center text-slate-600 text-sm">
          We help you to manage important contacts
        </blockquote>
      </div>
    </Layout>
  );
};

export default AboutPage;
