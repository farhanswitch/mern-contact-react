import React, { useEffect } from "react";

import Nav from "./Nav";

const Layout = (props) => {
  useEffect(() => {
    document.title = props.pageTitle;
  }, []);
  return (
    <div className="w-screen min-h-screen">
      <Nav />
      <div className="content mt-4">{props.children}</div>
    </div>
  );
};

export default Layout;
