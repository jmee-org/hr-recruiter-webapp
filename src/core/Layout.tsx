import React from "react";
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <LeftMenu />
        <div style={{ flex: 1, padding: `20px 20px 20px 70px` }}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
