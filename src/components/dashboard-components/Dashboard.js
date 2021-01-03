import React from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Footer from "./Footer";

import "../../styles/dashboard.scss";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="content-sidebar-div">
        <Sidebar />
        <Content />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
